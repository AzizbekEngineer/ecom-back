export const adminMiddleware = (req, res, next) => {
  let role = req?.admin?.role;
  if (role === "admin" || role === "owner") {
    next();
  } else {
    res.status(403).json({
      msg: "Access denied.",
      variant: "error",
      payload: null,
    });
  }
};
