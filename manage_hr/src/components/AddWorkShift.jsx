import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddWorkShift = () => {
  const [values, setValues] = useState({
    shiftDate:'',
    endDate:'',
    endTime:''
})
const [error, setError] = useState(null)
const navigate = useNavigate()
axios.defaults.withCredentials=true;
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8000/auth/add_workshift', values)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/manageWorkshift')
            alert('Work shift added successfully!')
        } else {
            setError(result.data.Error)
            alert('Work shift added failed!')
        }
    })
    .catch(err=> console.log(err))
}
  
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

export default AddWorkShift