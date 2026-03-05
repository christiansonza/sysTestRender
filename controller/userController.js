import User from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser'

export const getUser = async(req,res)=>{
  try {
    const fetchUser = await User.findAll({raw:true})
    res.status(200).json(fetchUser)
  }catch (error) {
  console.error(' Error fetching user:', error);
  res.status(500).json({ message: error.message });
}
}

export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json(req.user); 
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch current user' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password, email, firstName, middleName, lastName} = req.body;

    if (!username || !password || !email || !firstName) {
      return res.status(400).json({ message: 'Missing field. Please try again.' });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      middleName,
      lastName
    });

    const userResponse = newUser.toJSON();
    delete userResponse.password;

    res.status(201).json({
      message: 'Created successfully.',
      data: userResponse,
    });

  } catch (error) {
  console.error(' Error creating user:', error);
  res.status(500).json({ message: error.message });
}
};

export const logUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const userResponse = user.toJSON();
    delete userResponse.password;

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24*60*60*1000
    })


    res.status(200).json({
      message: 'Login successful!',
      data: userResponse,
    });

  } catch (error) {
    console.error('Error logging user:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { raw: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, firstName, middleName, lastName } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.middleName = middleName || user.middleName;
    user.lastName = lastName || user.lastName;

    await user.save();

    res.status(200).json({ message: 'User updated.', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
