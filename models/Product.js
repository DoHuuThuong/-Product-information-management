const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    maSanPham: String,
    tenSanPham: String,
    loaiSanPham: String,
    ngaySanXuat: Date,
    ngayHetHan: Date
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
