export default function validate(schema) {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return next();
  };
}
