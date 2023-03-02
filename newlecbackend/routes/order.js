const express = require("express");

const router = express.Router();

const {
  newOrder,

  getSingleOrder,

  myOrders,

  allOrders,

  updateOrder,

  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
