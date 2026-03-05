import Customer from '../model/customerModel.js';
import { sequelize } from '../config/conn.js';

export const getCustomer = async (req, res) => {
  try {
    const fetchCustomer = await Customer.findAll();
    res.status(200).json(fetchCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, { raw: true });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { name, address, tin, isActive } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    const currentYear = new Date().getFullYear(); 

    const lastCustomer = await Customer.findOne({
      where: sequelize.where(
        sequelize.literal(`"code" LIKE '${currentYear}C%'`),
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

    if (lastCustomer && lastCustomer.code) {
      // Extract everything AFTER the 'C'
      const numberPart = parseInt(lastCustomer.code.slice(5), 10);
      if (!isNaN(numberPart)) {
        nextNumber = numberPart + 1;
      }
    }

    const code = `${currentYear}C${String(nextNumber).padStart(5, "0")}`;

    const result = await Customer.create({
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
    console.error("Error creating customer:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
      details: error.errors?.map((e) => e.message) || [],
    });
  }
};


export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, tin, isActive, updatedById } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    customer.name = name ?? customer.name;
    customer.address = address ?? customer.address;
    customer.tin = tin ?? customer.tin;
    customer.isActive = isActive ?? customer.isActive;

    customer.updatedById = req.user?.id ?? updatedById ?? customer.updatedById;

    await customer.save();

    res.status(200).json({
      message: 'Customer updated successfully.',
      data: customer.toJSON(),
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
