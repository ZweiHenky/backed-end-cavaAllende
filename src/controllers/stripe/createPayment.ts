import { stripe } from "#config/stripe.js"
import { ok } from "#utils/returnSucces.js"
import { NextFunction, Request, Response } from "express"

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, currency } = req.body

        console.log(typeof amount, typeof currency);
        

        const customer = await stripe.customers.create()

        if (!customer) {
            throw new Error("Customer not created")
        }

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id }, 
            { apiVersion: "2026-01-28.clover" }
        )
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency:currency,
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: "1"
            }
        })

        if (!paymentIntent) {
            throw new Error("Payment intent not created")
        }

        const data = {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
        }

        ok(res, data, 200, "Payment created successfully")
    } catch (error) {
        next(error)
    }
}