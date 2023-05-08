const {
  getAllDepartmentHandelr,
  addNewDepartmentHandelr,
  updateDepartmentHandelr,
  deleteDepartmentHandelr,
  } = require("../controller/department.controller");
  
  const router = require("express").Router();
  const validateRequest = require("../../../common/middleware/validation.request");
  const { departmentSchema } = require("../joi/departmentValidation");
  router.get("/department", getAllDepartmentHandelr);
  router.get("/department/:id", getAllDepartmentHandelr);
  
  router.post("/department", validateRequest(departmentSchema), addNewDepartmentHandelr);
  
  router.put("/department/:id",validateRequest(departmentSchema), updateDepartmentHandelr);
  router.delete("/department/:id", deleteDepartmentHandelr);
  
  module.exports = router;
  