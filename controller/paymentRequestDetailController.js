import PaymentRequestDetail from '../model/paymentRequestDetailModel.js'
import PaymentRequest from '../model/paymentRequestModel.js';
import Booking from '../model/bookingModel.js'
import Charge from '../model/chargeModel.js';
import Customer from "../model/customerModel.js";

export const getPaymentRequestDetail = async(req,res)=>{
    try {
        const result = await PaymentRequestDetail.findAll({
            include:[
                {model: PaymentRequest, as:'paymentRequest'},
                {model: Booking, as:'booking'},
                {model: Charge, as:'charge'}
            ]
        })
        res.status(200).json(result)
    }  catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export const getPaymentRequestDetailById = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await PaymentRequestDetail.findByPk(id,{
            include:[
                {model: PaymentRequest, as: 'paymentRequest'},
                {model: Booking, as: 'booking'},
                {model: Charge, as: 'charge'}
            ]
        })
        res.status(200).json(result)
    } catch (error) {
        
    }
}

export const postPaymentRequestDetail = async(req,res)=>{
    try {
        const {paymentRequestId, bookingId, chargeId, chargeDesc, quantity, amount} = req.body
        const result = await PaymentRequestDetail.create({
            paymentRequestId, 
            bookingId, 
            chargeId, 
            chargeDesc, 
            quantity,
            amount
        })
        res.status(201).json({
            message:'Created successfully',
            data:result
        })
    } catch (error) {
         console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const updatePaymentRequestDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentRequestId, bookingId, chargeId, chargeDesc, quantity, amount } = req.body || {};

    const detail = await PaymentRequestDetail.findByPk(id);
    if (!detail) {
      return res.status(404).json({ message: "Payment Request Detail not found." });
    }

    if (paymentRequestId !== undefined) detail.paymentRequestId = parseInt(paymentRequestId, 10);
    if (bookingId !== undefined) detail.bookingId = parseInt(bookingId, 10);
    if (chargeId !== undefined) detail.chargeId = parseInt(chargeId, 10);
    if (chargeDesc !== undefined) detail.chargeDesc = chargeDesc;
    if (quantity !== undefined) detail.quantity = parseFloat(quantity);
    if (amount !== undefined) detail.amount = parseFloat(amount);

    await detail.save();

    const updatedDetail = await PaymentRequestDetail.findByPk(id, {
      include: [
        { model: PaymentRequest, as: "paymentRequest" },
        { model: Booking, as: "booking" },
        { model: Charge, as: "charge" },
      ],
    });

    res.status(200).json({ message: "Updated successfully.", data: updatedDetail });
  } catch (error) {
    console.error("Error updating Payment Request Detail:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};