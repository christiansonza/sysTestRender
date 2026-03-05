import Vendor from '../model/vendorModel.js'
import { sequelize } from '../config/conn.js';


export const getVendor = async(req,res)=>{
    try {
        const fetchVendor = await Vendor.findAll({raw:true})
        res.status(200).json(fetchVendor)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error.'})
    }
}

export const createVendor = async (req, res) => {
  try {
    const { name, address, tin, isActive } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    const currentYear = new Date().getFullYear(); 

    const lastVendor = await Vendor.findOne({
      where: sequelize.where(
        sequelize.literal(`"code" LIKE '${currentYear}V%'`),
        true
      ),
      order: [
        [
          sequelize.literal(`CAST(SUBSTRING("code", 6) AS INTEGER)`),
          "DESC",
        ],
      ],
    });

    let nextNumber = 1;

    if (lastVendor && lastVendor.code) {
      const numberPart = parseInt(lastVendor.code.slice(5), 10);
      if (!isNaN(numberPart)) {
        nextNumber = numberPart + 1;
      }
    }

    const code = `${currentYear}V${String(nextNumber).padStart(5, "0")}`;

    const result = await Vendor.create({
      code,
      name,
      address,
      tin,
      isActive,
      updatedById: req.user?.id || null,
    });

    res.status(201).json({
      message: "Created successfully",
      data: result.toJSON(),
    });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
      details: error.errors?.map((e) => e.message) || [],
    });
  }
};


export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByPk(id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, tin, isActive } = req.body;

    const vendor = await Vendor.findByPk(id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }

    vendor.name = name ?? vendor.name;
    vendor.address = address ?? vendor.address;
    vendor.tin = tin ?? vendor.tin;
    vendor.isActive = isActive ?? vendor.isActive;
    vendor.updatedById = req.user?.id || null;

    await vendor.save();

    res.status(200).json({ message: 'Updated successfully', data: vendor });
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
