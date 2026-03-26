import { stripe } from "#config/stripe.js";
import { CreatePaymentDto } from "#domain/dtos/stripe/createPayment.dto.js";
import { createLocation } from "#models/locations/createLocation.js";
import { getLocationByField } from "#models/locations/getLocationByField.js";

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

    const paymentIntent = await stripe.paymentIntents.create({
        amount: dto.amount * 100,
        currency: dto.currency,
        customer: customer.data[0].id,
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            userId: dto.metadata.userId,
            order: JSON.stringify(dto.metadata.order),
            location: locationFound ? JSON.stringify(locationFound) : JSON.stringify(newLocation)
        }
    });

    if (!paymentIntent) {
        throw new Error("Payment intent not created");
    }

    return {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.data[0].id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    };
};
