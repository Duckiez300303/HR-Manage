import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/auth/category')
    .then(result => {
      if(result.data.Status){
        setCategory(result.data.Result);
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Category List</h2>
      </div>
      <Link to = "/dashboard/add_category" className='btn btn-success'>Add Category</Link>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Assigned Employees</th>
            </tr>
          </thead>
          <tbody>
      {
        category.map(c =>(
          <React.Fragment key={c.id}>
            <tr>
              <td>{c.cateName}</td>
              <td>
                <div className='d-flex justify-content-between'>
                  <div>
                    <Link to ={'/dashboard/display_Emp_Cate/' +c.id} className='btn btn-primary btn-sm ms-2'>Show Employees</Link>
                  </div>
                  <div>
                    <Link to = {'/dashboard/edit_category/' + c.id} className='btn btn-warning btn-sm ms-2'>Edit</Link>
                  </div>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))
      }
    </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category