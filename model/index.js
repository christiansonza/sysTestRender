import AccountTitle from '../model/accountTitleModel.js'
import SubAccountTitle from '../model/subAccountTitleModel.js'

import Department from '../model/departmentModel.js'
import Vendor from '../model/vendorModel.js'
import PaymentRequest from '../model/paymentRequestModel.js'

import Booking from '../model/bookingModel.js'
import Charge from '../model/chargeModel.js'
import PaymentRequestDetail from '../model/paymentRequestDetailModel.js'

// SubAccount belongs to bAccountTitle -------------------------------------------
SubAccountTitle.belongsTo(AccountTitle, { foreignKey: 'accountId', as: 'account' });
AccountTitle.hasMany(SubAccountTitle, { foreignKey: 'accountId', as: 'subAccounts' });

// PaymentRequest relations ------------------------------------------------------
PaymentRequest.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' });
Vendor.hasMany(PaymentRequest, { foreignKey: 'vendorId', as: 'paymentRequests' });

PaymentRequest.belongsTo(Department, { foreignKey: 'costCenterId', as: 'department' });
Department.hasMany(PaymentRequest, { foreignKey: 'costCenterId', as: 'paymentRequests' });

//PaymentRequestDetail relations -------------------------------------------------
PaymentRequestDetail.belongsTo(PaymentRequest, {foreignKey: 'paymentRequestId', as: 'paymentRequest'})
PaymentRequest.hasMany(PaymentRequestDetail, {foreignKey: 'paymentRequestId', as: 'paymentRequestDetails'})

PaymentRequestDetail.belongsTo(Booking, {foreignKey: 'bookingId', as: 'booking'})
Booking.hasMany(PaymentRequestDetail, {foreignKey: 'bookingId', as:'paymentRequestDetails'})

PaymentRequestDetail.belongsTo(Charge, {foreignKey: 'chargeId', as: 'charge'})
Charge.hasMany(PaymentRequestDetail, {foreignKey: 'chargeId', as: 'paymentRequestDetails'})