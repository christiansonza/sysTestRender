import Booking from '../model/bookingModel.js'
import { sequelize } from '../config/conn.js';

export const getBooking = async(req,res)=>{
    try {
        const newBooking = await Booking.findAll()
        res.status(200).json(newBooking)
    }  catch (error) {
        console.error(' Error cfetching booking:', error);
        res.status(500).json({ message: error.message });
      }
}

export const createBooking = async (req, res) => {
  try {
    const { customerId, remarks } = req.body;

    const currentYear = new Date().getFullYear(); 

    const lastBooking = await Booking.findOne({
      where: sequelize.where(
        sequelize.literal(`"bookingNumber" LIKE '${currentYear}B%'`),
        true
      ),
      order: [
        [
          sequelize.literal(`CAST(SUBSTRING("bookingNumber", 6) AS INTEGER)`),
          "DESC",
        ],
      ],
    });

    let nextNumber = 1;

    if (lastBooking && lastBooking.bookingNumber) {
      const numberPart = parseInt(lastBooking.bookingNumber.slice(5), 10);
      if (!isNaN(numberPart)) {
        nextNumber = numberPart + 1;
      }
    }

    const bookingNumber = `${currentYear}B${String(nextNumber).padStart(5, "0")}`;

    const newBooking = await Booking.create({
      bookingNumber,
      customerId,
      remarks,
      updatedById: req.user?.id || null,
    });

    res.status(201).json({
      message: "Booking created.",
      data: newBooking.toJSON(),
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
      details: error.errors?.map((e) => e.message) || [],
    });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  }  catch (error) {
      console.error(' Error fetching booking:', error);
      res.status(500).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, remarks} = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.customerId = customerId ?? booking.customerId;
    booking.remarks = remarks ?? booking.remarks;
    booking.updatedById = req.user?.id ?? booking.updatedById;

    await booking.save();

    res.status(200).json({
      message: 'Updated successfully!',
      data: booking,
    });
  }  catch (error) {
  console.error(' Error updating booking:', error);
  res.status(500).json({ message: error.message });
}
};
