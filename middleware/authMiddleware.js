import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found.' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('AuthMiddleware Error:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }

    return res.status(401).json({ message: 'Invalid token. Unauthorized.' });
  }
};

export default AuthMiddleware;
