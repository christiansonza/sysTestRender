import Employee from '../model/employeeModel.js'

export const getEmployee = async(req,res)=>{
    try {
        const fetchEmployee = await Employee.findAll({raw:true})
        res.status(200).json(fetchEmployee)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error.'})
    }
}

export const createEmployee = async(req,res)=>{
    try {
        const {firstName, middleName, lastName,contactNumber, isActive, userId, updatedById} = req.body

        if(!firstName || !contactNumber){
            return res.srtatus(400).json({message:'Firstname and contact are required.'})
        }

        const result = await Employee.create({
            firstName,
            middleName,
            lastName,
            contactNumber,
            isActive,
            userId,
            updatedById: req.user?.id || null,
        })
        res.status(201).json({
            message:'Created successfully.',
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error.'})
    }
}

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByPk(id, { raw: true });
    if (!result) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, middleName, lastName, contactNumber, userId, isActive, updatedById } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    employee.firstName = firstName ?? employee.firstName;
    employee.middleName = middleName ?? employee.middleName;
    employee.lastName = lastName ?? employee.lastName;
    employee.contactNumber = contactNumber ?? employee.contactNumber;
    employee.userId = userId ?? employee.userId;
    employee.isActive = isActive ?? employee.isActive;

    employee.updatedById = req.user?.id ?? updatedById ?? employee.updatedById;

    await employee.save();

    res.status(200).json({
      message: 'Employee updated successfully.',
      data: employee.toJSON(),
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
