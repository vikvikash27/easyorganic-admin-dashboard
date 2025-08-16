const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    fssai: { type: String },
}, { timestamps: true });

// Add a pre-validate hook to automatically set the status based on stock.
// This runs before validation, ensuring the 'status' field is populated when required.
productSchema.pre('validate', function(next) {
    // Set status on new documents or when stock is modified on existing documents.
    if (this.isNew || this.isModified('stock')) {
        if (this.stock > 10) {
            this.status = 'In Stock';
        } else if (this.stock > 0) {
            this.status = 'Low Stock';
        } else {
            this.status = 'Out of Stock';
        }
    }
    next();
});

// Configure the 'toJSON' transform to use 'id' instead of '_id'
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


module.exports = mongoose.model('Product', productSchema);