
export const isClient = (req, res, next) => {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Access denied: only clients allowed' });
    }
    next();
  };
  
  export const isBusiness = (req, res, next) => {
    if (req.user.role !== 'business') {
      return res.status(403).json({ message: 'Access denied: only business users allowed' });
    }
    next();
  };