const getConnection = require("../model/db");


const getEmployees = async (req, res) => {
    let query = "SELECT * FROM EMPLOYEES"

    if(req.query.FIRST_NAME || req.query.EMAIL ||req.query.SALARY){
        let options = 0
        query += ` WHERE`
        if(req.query.FIRST_NAME){
            query += ` FIRST_NAME LIKE '%${req.query.FIRST_NAME}%'`
            options++
        }
        if(req.query.EMAIL){
            if(options > 0){
                query += ' AND'
            }
            query += ` EMAIL LIKE '%${req.query.EMAIL}%'`
            options++
        }
        if(req.query.SALARY){
            if(options > 0){
                query += ' AND'
            }
            query += ` SALARY > ${req.query.SALARY}`
            options++
        }
    }


    // if(req.query.PAGE != undefined && req.query.PAGE > 1){
    //     query += ` LIMIT ${(req.query.PAGE - 1) * 5},5`
    // } else {
    //     query += ` LIMIT 0,5`
    // }


    try {
        const connection = await getConnection();
        const result = await connection.query(query);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getEmployee = async (req, res) => {
    try {
        const { EMPLOYEE_ID } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM EMPLOYEES WHERE EMPLOYEE_ID = ?", EMPLOYEE_ID);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addEmployee = async (req, res) => {
    console.log(req.body)
    try {
        const { FIRST_NAME, LAST_NAME, EMAIL,SALARY,PHONE_NUMBER,HIRE_DATE } = req.body;

        // if (FIRST_NAME === undefined || LAST_NAME === undefined || EMAIL === undefined) {
        //     res.status(400).json({ message: "Bad Request. Please fill all field." });
        // }

        const employee = { FIRST_NAME, LAST_NAME, EMAIL, SALARY, PHONE_NUMBER,HIRE_DATE };
        const connection = await getConnection();
        var conn = await connection.query("INSERT INTO EMPLOYEES SET ?", employee);
        console.log(conn)
        res.json({ message: "Employee added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { EMPLOYEE_ID } = req.params;
        const { FIRST_NAME,LAST_NAME, EMAIL, PHONE_NUMBER,SALARY,HIRE_DATE } = req.body;

        console.log(req.body)

        if (EMPLOYEE_ID === undefined || FIRST_NAME === undefined || LAST_NAME === undefined || EMAIL === undefined || SALARY === undefined || HIRE_DATE === undefined || PHONE_NUMBER === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
            return
        }

        const employee = { FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, SALARY, HIRE_DATE, PHONE_NUMBER };
        const connection = await getConnection();
        const result = await connection.query("UPDATE EMPLOYEES SET ? WHERE EMPLOYEE_ID = ?", [employee, EMPLOYEE_ID]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { EMPLOYEE_ID } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM EMPLOYEES WHERE EMPLOYEE_ID = ?", EMPLOYEE_ID);
        res.json(result).status(202);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
};