import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

var errorAttempt = 3;
router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employees Where email = ? and pass = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "employee", email: email },
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

// router.post("/signup", (req, res) => {
//     const sql = "SELECT * from empAccount Where email = ?";
//     con.query(sql, [req.body.email], (err, result) => {
//       if (err) return res.json({ registerStatus: false, Error: "Query error" });
//       if (result.length > 0) {
//         return res.json({ registerStatus: false, Error: "Email has been used!" });
//       } else {
//         if (req.body.email===undefined || req.body.email ===""){
//             return res.json({Error: "Email cannot be blank!"})
//         }
//         if(req.body.username===undefined || req.body.username ===""){
//             return res.json({Error: "Username cannot be blank!"})
//         }
//         if (req.body.password===undefined || req.body.password ===""){
//             return res.json({Error: "Password cannot be blank!"})
//         }
//         if (req.body.password!==req.body.password2){
//             return res.json({Error: "You must re-enter the same password!"})
//         }
//         if (req.body.password.length <8){
//             return res.json({Error: "Your password must be longer than 8 characters"})
//         }
//         if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(req.body.password)){
//           return res.json({Error: "Your password must contain both uppercase and lowercase letters"})
//         }
//         if (!/^(?=.*[!@#$%^&*])/.test(req.body.password)){
//         return res.json({Error: "Your password must contain at least one special character"})
//         }
//         if(req.body.checkbox != "on"){
//           return res.json({Error: "You must accept our terms!"})
//         }
//         const sql2 = "INSERT INTO empAccount (email, username, pass) VALUES (?,?,?)";
//         con.query(sql2, [req.body.email, req.body.username, req.body.password], (err, result) =>{
//             if (err) return res.json({ registerStatus: false, Error: "Query error" });
//         })
//         return res.json({ registerStatus: true });
//       }
//     });
//   });

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as employeeRouter };
