const Razorpay = require('razorpay');
const shortid = require('shortid');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;  // amount in rupees

        const payment_capture = 1;
        const currency = "INR";

        const options = {
            amount: amount * 100,  // Razorpay accepts paise, so *100
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({ orderId: order.id });
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        res.status(500).json({ message: "Failed to create Razorpay order" });
    }
};
