import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    getRecords()
  }, [])

  const getRecords = async () => {
    try {
      const response = await axios.get(
        'https://expectoo-csv-test.herokuapp.com/records'
      )
      if (response.data.status === 'success') {
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const uploadCsv = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('csvfile', selectedFile)
      const response = await axios.post(
        'https://expectoo-csv-test.herokuapp.com/upload-csv',
        formData
      )
      if (response.data.status === 'success') {
        alert('Uploaded successfully')
        getRecords()
      }
    } catch (error) {
      alert(error)
    }
  }
  

  return (
    <div className='container'>
      <form onSubmit={uploadCsv} encType='multipart/formdata'>
        <input
          type='file'
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button type='submit'>Upload CSV file</button>
      </form>

      <table className='table text-center mt-5'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Title</th>
            <th scope='col'>Comment</th>
            <th scope='col'>Author</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.comment}</td>
              <td>{item.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
