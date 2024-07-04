import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Employee from './components/Employee'
import Category from './components/Category'
import ManageWorkshift from './components/ManageWorkshift'
import ManageSalary from './components/ManageSalary'
import SignUp from './components/SignUp'
import AddEmployee from './components/AddEmployee'
import AddCategory from './components/AddCategory'
import EditEmployee from './components/EditEmployee'
import EditCategory from './components/EditCategory'
import DisplayEmpCate from './components/DisplayEmpCate'
import Start from './components/Start'
import EmployeeLogin from './components/EmployeeLogin'
import EmpDashboard from './components/EmpDashboard'
import ViewShift from './components/ViewShift'
import AddWorkShift from './components/AddWorkShift'
import EditWorkShift from './components/EditWorkShift'
import DisplayEmpShift from './components/DisplayEmpShift'
import RegisteredShift from './components/RegisteredShift'
import SpecifySalary from './components/SpecifySalary'
import EmpSalary from './components/EmpSalary'
import ManageEmpSalary from './components/ManageEmpSalary'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/start' element = {<Start/>}></Route>
      <Route path='/adminlogin' element = {<Login/>}></Route>
      <Route path='/employee_login' element = {<EmployeeLogin/>}></Route>
      <Route path='/employee_dashboard' element = {<EmpDashboard/>}>
        <Route path='' element = {<ViewShift/>}></Route>
        <Route path='/employee_dashboard/viewShift' element = {<ViewShift/>}></Route>
        <Route path='/employee_dashboard/registeredShift/1' element = {<RegisteredShift/>}></Route>
        <Route path='/employee_dashboard/specSal/2' element = {<EmpSalary/>}></Route>
      </Route>
      <Route path='/dashboard' element = {<Dashboard/>}>
        <Route path='' element = {<ManageSalary/>}></Route>
        <Route path='/dashboard/employee' element = {<Employee/>}></Route>
        <Route path='/dashboard/category' element = {<Category/>}></Route>
        <Route path='/dashboard/manageWorkshift' element = {<ManageWorkshift/>}></Route>
        <Route path='/dashboard/add_workshift' element = {<AddWorkShift/>}></Route>
        <Route path='/dashboard/edit_workshift/:id' element = {<EditWorkShift/>}></Route>
        <Route path='/dashboard/add_employee' element = {<AddEmployee/>}></Route>
        <Route path='/dashboard/edit_employee/:id' element = {<EditEmployee/>}></Route>
        <Route path='/dashboard/add_category' element = {<AddCategory/>}></Route>
        <Route path='/dashboard/edit_category/:id' element = {<EditCategory/>}></Route>
        <Route path='/dashboard/display_Emp_Cate/:id' element = {<DisplayEmpCate/>}></Route>
        <Route path='/dashboard/display_Emp_Shift/:id' element = {<DisplayEmpShift/>}></Route>
        <Route path='/dashboard/specSal/:id' element = {<SpecifySalary/>}></Route>
        <Route path='/dashboard/manageEmpSalary/:id' element = {<ManageEmpSalary/>}></Route>
      </Route>
      <Route path='/signup' element = {<SignUp/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
