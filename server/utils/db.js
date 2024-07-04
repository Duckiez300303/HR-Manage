import mysql from 'mysql'
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Duckiez2740@',
    database: 'hr_manage'
})

con.connect(function (err) {
    if(err) {
        console.log('connection error', err)
    }
    else {
        //create hr_manage database
        const create_admin_table = "create table if not exists admin (id int auto_increment primary key, email varchar(150) not null,pass varchar(100) not null);";
        const create_category_table = "create table if not exists category (id int auto_increment primary key, cateName varchar(100) not null);";
        const create_employees_table = "create table if not exists employees(eid int primary key auto_increment,name varchar(100) not null,email varchar(150) not null,pass varchar(100) not null,yob int not null,nationality varchar(100) not null,phoneNum int not null,address varchar(150) not null,cateID int not null,job varchar(150) not null,salary int,allowances int,deductions int,foreign key(cateID) references category(id));";
        const create_workshift_table = "create table if not exists workshift(shiftID int auto_increment primary key,shiftDate date not null,startTime time not null,endTime time not null);"
        const create_emp_shift_table = "create table if not exists emp_shift(ID int auto_increment primary key,eid int not null,shiftID int not null,foreign key(eid) references employees(eid),foreign key(shiftID) references workshift(shiftID));"
        
        con.query(create_admin_table, (err) => {
            if (err) throw err;
            console.log('admin table created');
          });
        con.query(create_category_table, (err) => {
            if (err) throw err;
            console.log('category table created');
          });
        con.query(create_employees_table, (err) => {
            if (err) throw err;
            console.log('employees table created');
          });
        con.query(create_workshift_table, (err) => {
            if (err) throw err;
            console.log('workshift table created');
          });
        con.query(create_emp_shift_table, (err) => {
            if (err) throw err;
            console.log('emp_shift table created');
          });
        
        //insert dummy data

        const insert_admin = "insert into admin(email, pass) values ('a@gmail.com','Test@1234');";
        con.query(insert_admin, (err) => {
            if (err) throw err;
            console.log('admin inserted');
        });
        console.log('connect database successful')
    }
})
export default con;