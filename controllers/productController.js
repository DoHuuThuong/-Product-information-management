const Product = require('../models/Product');

// Thêm sản phẩm
exports.addProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({
            $or: [
                { maSanPham: req.body.maSanPham }
            ]
        });

        if (existingProduct) {
            return res.status(400).send({ message: 'Mã sản phẩm đã tồn tại' });
        }

        const newProduct = new Product({
            maSanPham: req.body.maSanPham,
            tenSanPham: req.body.tenSanPham,
            loaiSanPham: req.body.loaiSanPham,
            ngaySanXuat: req.body.ngaySanXuat,
            ngayHetHan: req.body.ngayHetHan
        });

        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(500).send({ message: 'Lỗi khi thêm sản phẩm' });
    }
};

// Lấy thông tin sản phẩm
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ maSanPham: req.params.maSanPham });
        if (!product) {
            return res.status(404).send({ message: 'Mã sản phẩm không tồn tại' });
        }
        res.send(product);
    } catch (err) {
        res.status(500).send({ message: 'Lỗi khi tìm kiếm sản phẩm' });
    }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    const maSanPham = req.params.maSanPham;
    const updateData = req.body;

    try {
        const product = await Product.findOne({ maSanPham: maSanPham });
        if (!product) {
            return res.status(404).send({ message: 'Mã sản phẩm không tồn tại' });
        }

        // Cập nhật chỉ những trường được cung cấp
        if (updateData.tenSanPham) product.tenSanPham = updateData.tenSanPham;
        if (updateData.loaiSanPham) product.loaiSanPham = updateData.loaiSanPham;
        if (updateData.ngaySanXuat) product.ngaySanXuat = updateData.ngaySanXuat;
        if (updateData.ngayHetHan) product.ngayHetHan = updateData.ngayHetHan;

        await product.save();
        res.send(product);
    } catch (err) {
        res.status(500).send({ message: 'Lỗi khi cập nhật sản phẩm' });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    const maSanPham = req.params.maSanPham;

    try {
        const product = await Product.findOne({ maSanPham: maSanPham });
        if (!product) {
            return res.status(404).send({ message: 'Mã sản phẩm không tồn tại' });
        }

        await Product.deleteOne({ maSanPham: maSanPham });
        res.send({ message: 'Sản phẩm đã được xóa' });
    } catch (err) {
        res.status(500).send({ message: 'Lỗi khi xóa sản phẩm' });
    }
};

// Tìm kiếm sản phẩm
exports.searchProduct = async (req, res) => {
    try {
        const maSanPham = req.params.maSanPham;
        const products = await Product.find({ maSanPham: maSanPham });

        if (!products.length) {
            return res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
        }

        res.send(products);
    } catch (err) {
        res.status(500).send({ message: 'Lỗi khi tìm kiếm sản phẩm' });
    }
};
