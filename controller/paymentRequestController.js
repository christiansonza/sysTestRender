import PaymentRequest from '../model/paymentRequestModel.js'
import Vendor from '../model/vendorModel.js'
import Department from '../model/departmentModel.js'
import { Op } from "sequelize";

export const getPaymentRequest = async(req,res)=>{
    try {
        const result = await PaymentRequest.findAll({
            include: [
                {model:Vendor, as:'vendor'},
                {model:Department, as:'department'}
            ]
        })
        res.status(200).json(result)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export const getPaymentRequestById = async(req,res)=>{
   try {
    const {id} = req.params
        const result = await PaymentRequest.findByPk(id,{
            include:[
                {model:Vendor, as:'vendor'},
                {model: Department, as:'department'}
            ]}
        )
        res.status(200).json(result)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
export const postPaymentRequest = async (req, res) => {
  try {
    const { vendorId, dateNeeded, costCenterId, chargeTo, remarks, requestType } = req.body;

  
    let prefix = "";
    if (requestType === "Check") prefix = "CR";
    else if (requestType === "Manager's Check") prefix = "MCR";
    else if (requestType === "Petty Cash") prefix = "PCR";

 
    const year = new Date().getFullYear();


    const lastRequest = await PaymentRequest.findOne({
      where: {
        requestType,
        requestNumber: {
          [Op.like]: `${prefix}${year}%` 
        }
      },
      order: [["createdAt", "DESC"]],
    });

    let nextNumber = 1;
    if (lastRequest && lastRequest.requestNumber) {
     
      const lastNumber = parseInt(lastRequest.requestNumber.slice(-5), 10);
      if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
    }

   
    const requestNumber = `${prefix}${year}${String(nextNumber).padStart(5, "0")}`;

   
    const result = await PaymentRequest.create({
      vendorId,
      dateNeeded,
      costCenterId,
      chargeTo,
      requestType,
      requestNumber,
      remarks,
    });

    res.status(201).json({
      message: "Created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



export const updatePaymentRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { vendorId, departmentId, dateNeeded, chargeTo, remarks, requestType } = req.body || {};

    const paymentRequest = await PaymentRequest.findByPk(id);
    if (!paymentRequest) return res.status(404).json({ message: "Payment Request not found." });

    if (vendorId !== undefined) paymentRequest.vendorId = parseInt(vendorId, 10);
    if (departmentId !== undefined) paymentRequest.costCenterId = parseInt(departmentId, 10);
    if (dateNeeded !== undefined) paymentRequest.dateNeeded = dateNeeded;
    if (chargeTo !== undefined) paymentRequest.chargeTo = chargeTo;
    if (remarks !== undefined) paymentRequest.remarks = remarks;
    if (requestType !== undefined && requestType !== paymentRequest.requestType) {
  paymentRequest.requestType = requestType;

      let prefix = "";
      if (requestType === "Check") prefix = "CR";
      else if (requestType === "Manager's Check") prefix = "MCR";
      else if (requestType === "Petty Cash") prefix = "PCR";

      const year = new Date().getFullYear();

      const lastRequest = await PaymentRequest.findAll({
        where: {
          requestNumber: { [Op.like]: `${prefix}${year}%` },
        },
        order: [["requestNumber", "DESC"]],
        limit: 1,
      });

      let nextNumber = 1;
      if (lastRequest.length > 0 && lastRequest[0].requestNumber) {
        const lastNum = parseInt(lastRequest[0].requestNumber.slice(-5), 10);
        if (!isNaN(lastNum)) nextNumber = lastNum + 1;
      }
      paymentRequest.requestNumber = `${prefix}${year}${String(nextNumber).padStart(5, "0")}`;
    }

    await paymentRequest.save();

    const updatedRequest = await PaymentRequest.findByPk(id, {
      include: [
        { model: Vendor, as: "vendor" },
        { model: Department, as: "department" },
      ],
    });

    return res.status(200).json({
      message: "Updated successfully.",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating Payment Request:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
