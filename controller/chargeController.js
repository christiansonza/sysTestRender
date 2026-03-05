import Charge from '../model/chargeModel.js'

export const getCharge = async(req,res)=>{
    try {
        const result = await Charge.findAll({raw:true})
        res.status(200).json(result)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export const getChargeById = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await Charge.findByPk(id)
        res.status(200).json(result)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export const postCharge = async(req,res)=>{
    try {
        const {code, name, isActive} = req.body
        const result = await Charge.create({
            code,
            name, isActive
        })
        res.status(201).json({
            message:'Created succesfully',
            data:result
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}



export const updateCharge = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, isActive } = req.body;

    const charge = await Charge.findByPk(id);
    if (!charge) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    charge.code = code ?? charge.code;
    charge.name = name ?? charge.name;
    charge.isActive = isActive ?? charge.isActive;

    await charge.save();

    res.status(200).json({
      message: 'Updated successfully.',
      data: charge.toJSON(),
    });
  } catch (error) {
    console.error('Error updating charge:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};