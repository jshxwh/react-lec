const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler");

//create new product

exports.newProduct = async (req, res, next) => {
  console.log(req.user);

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,

    product,
  });
};

exports.getProducts = async (req, res, next) => {
  const resPerPage = 4;

  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  //   const products = await Product.find();

  // const products = await Product.find();

  apiFeatures.pagination(resPerPage);

  const products = await apiFeatures.query;

  // console.log(products)

  setTimeout(() => {
    res.status(200).json({
      success: true,
      // count: products.length,
      productsCount,
      products,
    });
  }, 2000);
  return next(new ErrorHandler("my error", 400));
};

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  console.log(product);

  // if(!product) {

  // 		return res.status(404).json({

  // 			success: false,

  // 			message: 'Product not found'

  // 		});

  // }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,

    product,
  });
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,

      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.param.id, req.body, {
    new: true,

    runValidators: true,

    useFindandModify: false,
  });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,

    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,

      message: "Product not found",
    });
  }

  await product.remove();

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,

    product,
  });
};
