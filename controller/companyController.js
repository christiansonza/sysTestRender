import Company from '../model/companyModel.js'

export const getCompany = async(req,res)=>{
    try {
        const result = await Company.findAll({raw:true})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error.'})
    }
}


// GET company by ID
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Company.findByPk(id, { raw: true });
    if (!result) {
      return res.status(404).json({ message: 'Company not found.' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching company by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createCompany = async (req, res) => {
  try {
    const { code, name, address, tin, isActive } = req.body;

    if (!code || !name) return res.status(400).json({ message: 'Code and name are required.' });

    const existingCompany = await Company.findOne({ where: { code } });
    if (existingCompany) return res.status(409).json({ message: 'Company code already exists.' });

    const newCompany = await Company.create({
      code,
      name,
      address,
      tin,
      isActive,
      updatedById: req.user?.id || null, 
    });

    res.status(201).json({ message: 'Created successfully.', data: newCompany });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, address, tin, isActive, updatedById } = req.body;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }
    

    company.code = code ?? company.code;
    company.name = name ?? company.name;
    company.address = address ?? company.address;
    company.tin = tin ?? company.tin;
    company.isActive = typeof isActive === 'boolean' ? isActive : company.isActive;

    company.updatedById = req.user?.id ?? updatedById ?? company.updatedById;

    await company.save();

    res.status(200).json({
      message: 'Company updated successfully.',
      data: company.toJSON(),
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
