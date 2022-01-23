import Order from '../models/orderModel.js';

const addOrderItems = async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body; 

    if(orderItems && orderItems.length === 0) {
        res.status(4004).json({
            message:  'No order items'

        })
        return 
    } else {
        const order = new Order({
            orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, user: req.user._id
        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
}

const getAllOrders = async (req, res) => {
    const products = await Order.find({}).populate('user', 'name email')
    res.json(products)
}
const getOrderDetail = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
}
const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404).json({
          message: "Order Not Found !!!"
      })
    }
  }

//update order to paid 

const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time, 
            email_address: req.body.payer.email_address
        }
        const updateOrder = await order.save()
        res.json({updateOrder})
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

}

//get logged in user orders
const getMyOrders = async (req, res) => {
    const orders = await Order.find({user: req.user._id}).populate('user', 'name email')
    res.json(orders)

}






export {addOrderItems, getAllOrders, getOrderDetail, updateOrderToPaid, updateOrderToDelivered, getMyOrders}