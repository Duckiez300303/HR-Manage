import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


const EditCategory = () => {
    const [category, setCategory] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('http://localhost:8000/auth/category/' + id)
        .then(result => {
          if(result.data.Status){ 
            setCategory(result.data.Category);
          } else {
            alert(result.data.Error);
          }
        }).catch(err => console.log(err));
    }, [id]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put('http://localhost:8000/auth/edit_category/' + id, { category })
        .then(result => {
          if(result.data.Status){
            alert('Edit Category successfully');
            navigate('/dashboard/category');
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    };
  return (
    <div className='display-f justify-content-center align-items-center addCategoryPage'>
                <div className='p-3 rounded w-25 border'>
                    <h2>Edit Category</h2>
                    <form onSubmit={handleSubmit}>
                        <div className ='mb-3'>
                            <label htmlFor='category'><strong>Category:</strong></label>
                            <input type="category" name = 'category' autoComplete='off' placeholder='Enter Category'
                            onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0' />
                        </div>
                        <button className='btn btn-success w-100 rounded-0'>Submit</button>
                    </form>
                </div>
            </div>
  );
};

export default EditCategory;