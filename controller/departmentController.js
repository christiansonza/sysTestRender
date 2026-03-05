import Department from '../model/departmentModel.js'

export const getDepartment = async(req,res)=>{
    try {
        const result = await Department.findAll({raw:true})
        res.status(200).json(result)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export const getDepartmentById = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await Department.findByPk(id,{raw:true})

        if(!result) {
            return res.status(404).json({message:'Department not found'})
        }
        res.status(200).json(result)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export const postDepartment = async(req,res)=>{
    try {
      const {code, name, type, isActive} = req.body
      const result = await Department.create({
        code,
        name,
        type,
        isActive
      })
      res.status(201).json({
        message:'Created successfully.',
        data:result
      })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, type, isActive } = req.body;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    department.code = code ?? department.code;
    department.name = name ?? department.name;
    department.type = type ?? department.type;
    department.isActive = isActive ?? department.isActive;

    await department.save();

    res.status(200).json({
      message: 'Department updated successfully.',
      data: department.toJSON(),
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};