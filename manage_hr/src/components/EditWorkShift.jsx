import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditWorkShift = () => {
    const [values, setValues] = useState({
        shiftDate:'',
        endDate:'',
        endTime:''
    })
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('http://localhost:8000/auth/workshift/' + id)
        .then(result => {
          if(result.data.Status){
            setWorkshift(result.data.Status);
          } else {
            alert(result.data.Error);
          }
        }).catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put('http://localhost:8000/auth/edit_workshift/' + id,  values )
        .then(result => {
          if(result.data.Status){
            alert('Edit WorkShift successfully');
            navigate('/dashboard/manageWorkshift');
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    };
  
  return (
    <div className='display-f justify-content-center align-items-center h-75 addWorkshift'>
        <div className='p-3 rounded w-25 border'>
                <form onSubmit={handleSubmit}>
                        <div className ='mb-3'>
                            <label htmlFor='shiftDate'><strong>Select Date:</strong></label>
                            <input type="date" name = 'Date' autoComplete='off'
                            onChange={(e) => setValues ({...values, shiftDate : e.target.value})} className='form-control rounded-0' />
                        </div>
                        <div className ='mb-3'>
                            <label htmlFor='startDate'><strong>Select Start Time:</strong></label>
                            <input type="time" name = 'startDate' autoComplete='off' placeholder='Enter startDate'
                            onChange={(e) => setValues({...values, startTime : e.target.value})} className='form-control rounded-0' />
                        </div>
                        <div className ='mb-3'>
                            <label htmlFor='endTime'><strong>Select End Time:</strong></label>
                            <input type="time" name = 'endTime' autoComplete='off' placeholder='Enter endTime'
                            onChange={(e) => setValues({...values, endTime : e.target.value})} className='form-control rounded-0' />
                        </div>
                        <button className='btn btn-success w-100 rounded-0'>Submit</button>
                        <div className ='mb-3'>
                        </div>
                </form>
        </div>
    </div>
  )
}

export default EditWorkShift