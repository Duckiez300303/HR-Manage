import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

var errorAttempt = 3;
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and pass = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ loginStatus: true });
      } else {
        errorAttempt = errorAttempt - 1;
        if (errorAttempt === 0) {
          return res.json({ loginStatus: false, Error: "You have reached the maximum number of login attempts!" });
        }
      return res.json({ loginStatus: false, Error: "Wrong email or password!" + "\n" + errorAttempt + " attempts left"});
    }
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (cateName) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true });
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category;";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true, Result: result});
  });
});

router.post("/add_employee", (req, res) => {
  const sql = "INSERT INTO employees (name,email,pass,yob,nationality,phoneNum,address,cateID,job) VALUES (?,?,?,?,?,?,?,?,?)";
  con.query(sql,  
    [req.body.name, req.body.email, req.body.password, req.body.yearOfBirth, req.body.nationality, req.body.phoneNum, req.body.address, req.body.cateId, req.body.job],
    (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" + err });
    return res.json({ Status: true });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employees JOIN category ON employees.cateID = category.id";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" });
    return res.json({Status: true, Result: result});
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees WHERE employees.eid = ?";
  con.query(sql,[id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" });
    return res.json({Status: true, Result: result});
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE employees SET name=?, yob=?, email=?, nationality =?, phoneNum=?, address=?,job =?, cateID= ? WHERE eid=?";
  con.query(sql,  
    [req.body.name,
     req.body.yearOfBirth,
     req.body.email,
     req.body.nationality,
     req.body.phoneNum,
     req.body.address,
     req.body.job,
     req.body.cateId,
     id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Querry Error" + err });
      return res.json({ Status: true, Result: result });
     });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employees WHERE eid = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Querry Error" + err });
      return res.json({ Status: true, Result: result });
     });
});

router.get("/category/:id", (req, res) =>{
  const id = req.params.id;
  const sql = "SELECT * FROM category where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err});
    return res.json({Status: true, Category: result});
  });
});

router.put("/edit_category/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE category SET cateName = ? WHERE id = ?";
  con.query(sql, [req.body.category, id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err }); 
    return res.json({Status: true});
  });
});

router.delete("/delete_category/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM category WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true});
  });
});

router.get("/display_Emp_Cate/:id", (req, res) => {
  const id = req.params.id;
  console.log(id) 
  const sql = "SELECT * FROM employees JOIN category ON employees.cateID = category.id WHERE category.id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" +err });
    return res.json({Status: true, Result: result});
  });
});

router.post("/add_workshift", (req, res) => {
  const sql = "INSERT INTO workshift (shiftDate, startTime, endTime) VALUES (?,?,?)";
  con.query(sql, [req.body.shiftDate, req.body.startTime, req.body.endTime], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" + err });
    return res.json({ Status: true });
  });
});
router.get("/workshift", (req, res) => {
  const sql = "SELECT distinct shiftDate,startTime,endTime,workshift.shiftID FROM workshift;";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true, Result: result});
  });
});
router.get("/workshift/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM workshift WHERE shiftID = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true, Result: result});
  });
});
router.put("/edit_workshift/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE workshift SET shiftDate=?, startTime=?, endTime=? WHERE shiftID=?";
  con.query(sql, [req.body.shiftDate, req.body.startTime, req.body.endTime, id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true});
  });
});

router.get("/employee2/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees JOIN emp_shift ON employees.eid = emp_shift.eid WHERE emp_shift.shiftID = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" +err });
    return res.json({Status: true, Result: result});
  });
});
router.get("/display_Emp_Shift/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sql = "SELECT * FROM employees JOIN emp_shift ON employees.eid = emp_shift.eid WHERE emp_shift.shiftID = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" +err });
    return res.json({Status: true, Result: result});
  });
});

router.get("/emp_shift", (req, res) => {
  const sql = "SELECT * FROM emp_shift JOIN employees ON emp_shift.eid = employees.eid JOIN workshift ON emp_shift.shiftID = workshift.shiftID";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true, Result: result});
  });
});
router.get("/workshift2", (req, res) => {
  const sql = "SELECT * FROM emp_shift JOIN workshift ON emp_shift.shiftID = workshift.shiftID JOIN employees ON employees.eid = emp_shift.eid WHERE emp_shift.eid = 1";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" +err });
    return res.json({Status: true, Result: result});
  });
});
router.get("/registeredShift/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sql = "SELECT * FROM emp_shift JOIN workshift ON emp_shift.shiftID = workshift.shiftID where emp_shift.eid = ?";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true, Result: result});
  });
});
router.get("/employee3/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees JOIN emp_shift ON employees.eid = emp_shift.eid JOIN workshift ON emp_shift.shiftID = workshift.shiftID WHERE emp_shift.eid = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" +err });
    return res.json({Status: true, Result: result});
  });
});
router.get("/specSal/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sql = "SELECT * FROM emp_shift JOIN workshift ON emp_shift.shiftID = workshift.shiftID WHERE emp_shift.eid = ?";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true, Result: result});
  });
});

router.put("/edit_salary/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE employees SET allowances = ?, deductions = ?, salary = ? WHERE eid = ?";
  con.query(sql, [req.body.allowances, req.body.deductions, req.body.salary, id], (err, result) => {
    if (err) return res.json({Status: false, Error: "Query error" + err });
    return res.json({Status: true});
  });
});

export { router as adminRouter };
