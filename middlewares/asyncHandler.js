module.exports = (cb) => {
  return async(req, res, next) => {
    try {
      await cb(req, res,next);
    } catch(err) {
      if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const error = err.errors.map(error => error.message);
        res.status(400).json({ error });
      } else {
        throw err;
      }
    }
  }
}