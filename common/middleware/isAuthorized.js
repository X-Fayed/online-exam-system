const { StatusCodes } = require(`http-status-codes`);
const jwt = require(`jsonwebtoken`);
const User = require("../../src/users/model/user.model");
const rbac = require("../rbac/rbac");

module.exports = (endPoint) => {
  return async (req, res, next) => {
    if (req.headers) {
      if (req.headers.authorization) {
        let token = req.headers.authorization.split(` `)[1];
        try {
          if (token) {
            try {
              let decoded = jwt.verify(token, process.env.SECRET_KEY);
              let user = await User.findOne({
                _id: decoded.id,
                approvedStatus: true,
              });
              if (!user) {
                res
                  .status(StatusCodes.UNAUTHORIZED)
                  .json({ message: `UNAUTHORIZED` });
              } else {
                req.user = user;
                let isAuthorized = await rbac.can(decoded.role, endPoint);
                if (isAuthorized) {
                  next();
                } else {
                  res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({ message: `UNAUTHORIZED` });
                }
              }
            } catch (error) {
              res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: `Invalid Signature`, error });
            }
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ message: `UNAUTHORIZED` });
          }
        } catch (error) {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: `INTERNAL SERVER ERROR` });
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: `UNAUTHORIZED` });
      }
    }

    // console.log(req.headers.authorization.split(` `)[1]);
  };
};
