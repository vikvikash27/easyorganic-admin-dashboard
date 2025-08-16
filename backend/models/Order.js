const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true }, // Storing as string to match frontend cart item ID
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { _id: false });

const statusEventSchema = new mongoose.Schema({
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
}, { _id: false });

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
        lat: { type: Number },
        lng: { type: Number },
    },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true, index: true },
    orderTimestamp: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    items: [orderItemSchema],
    paymentMethod: { type: String, enum: ['Card', 'COD'], required: true },
    transactionId: { type: String, required: true },
    address: addressSchema,
    statusHistory: [statusEventSchema],
}, { timestamps: true });

orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Order', orderSchema);
