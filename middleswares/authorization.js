const authorization = (permissions) => {
  return (req, res, next) => {
    const userPermission = req.token.role.permissions;
    console.log(permissions, userPermission);

    if (userPermission.includes(permissions)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  };
};

module.exports = authorization;
