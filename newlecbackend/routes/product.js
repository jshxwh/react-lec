const express = require("express");

const router = express.Router();

const {
  isAuthenticatedUser,

  authorizeRoles,
} = require("../middlewares/auth");

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// router.get("/products", isAuthenticatedUser, getProducts);

router.route("/products").get(getProducts);
router.route("/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

// router.get(
//   "/products",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   getProducts
// );

// router.post(
//   "/admin/product/new",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   newProduct
// );

// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
