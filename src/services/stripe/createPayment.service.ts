import { stripe } from "#config/stripe/stripe.js";
import { CreatePaymentDto } from "#domain/dtos/stripe/createPayment.dto.js";
import { PurchaseInsert } from "#domain/interfaces/purchases.interface.js";
import { createLocation } from "#models/locations/createLocation.js";
import { getLocationByField } from "#models/locations/getLocationByField.js";
import { processPurchaseTransaction } from "#models/purchases/processPurchaseTransaction.model.js";
import { addPurchase } from "#utils/purchases/purchasesInProccess.js";

export const createPaymentService = async (dto: CreatePaymentDto) => {

    const { location } = dto.metadata;

    const locationFound = await getLocationByField(location.text_address, location.latitude, location.longitude);

    let newLocation = null;
    if (!locationFound) {
        newLocation = await createLocation(location);
    }

    let customer = await stripe.customers.list({
        email: dto.metadata.email,
        limit: 1,
    });

    if (customer.data.length === 0) {
        customer.data[0] = await stripe.customers.create({
            email: dto.metadata.email,
        });
    }

    if (!customer.data[0]) {
        throw new Error("Customer not created");
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.data[0].id }, 
        { apiVersion: "2026-01-28.clover" as any }
    );

    const secureCode =  Math.floor(100000 + Math.random() * 900000);

    const purchaseData: PurchaseInsert = {
        user_id: dto.metadata.userId,
        subtotal: dto.amount,
        total: dto.amount + dto.shippingCost,
        payment_method: "stripe",
        payment_reference: "",
        status: "pending",
        secure_code: secureCode.toString(),
        shipping_cost: dto.shippingCost,
    };

    const purchase = await processPurchaseTransaction(purchaseData, dto.metadata.order.order_items, locationFound ? locationFound.location_id! : newLocation?.location_id!);

    if (!purchase.purchase_id) {
        throw new Error("Purchase not created");
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.floor((dto.amount + dto.shippingCost) * 100),
        currency: dto.currency,
        customer: customer.data[0].id,
        // automatic_payment_methods: {
        //     enabled: true,
        // },
        payment_method_types:["card"],
        metadata: {
            userId: dto.metadata.userId,
            order_id: purchase.purchase_id,
        }
    });

    if (!paymentIntent) {
        throw new Error("Payment intent not created");
    }

    addPurchase(purchase.purchase_id.toString());

    return {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.data[0].id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    };
};
