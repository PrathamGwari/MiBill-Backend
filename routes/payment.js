require('dotenv').config()
const express = require('express')
const router = require('express').Router()
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = "whsec_336a348646599ae237d6efff0ea428e4e957f035913042a139216ee21f8b652a";

router.post('/', async (req, res) => {
    try {
        const {price} = req.body
        if(!price) return res.status(400).json({message: "price not specified!"})

        const paymentIntent =  await stripe.paymentIntents.create({
            amount: parseInt(price) * 100,
            currency: "INR",
            payment_method_types: ["card"],
            metadata: { totalPrice: price }
        })

        const clientSecret = paymentIntent.client_secret
        res.json({
            message: "Payment initiated!", 
            clientSecret
        })
    } catch(err) {
        res.status(500).json({err})
    }
})


router.post('/stripe', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});


module.exports = router