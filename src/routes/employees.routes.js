const router = require('express').Router()
const employeesRoutes = require('../controllers/employees.controller')



router.get("/", employeesRoutes.getEmployees);
router.get("/:EMPLOYEE_ID", employeesRoutes.getEmployee);
router.post("/", employeesRoutes.addEmployee);
router.put("/:EMPLOYEE_ID", employeesRoutes.updateEmployee);
router.delete("/:EMPLOYEE_ID", employeesRoutes.deleteEmployee);

module.exports = router