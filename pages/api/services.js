import axios from 'axios';

const URLSTUDENTINFO = `http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/`
const URLSTUDENTORDER = `http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders/`
export const servicesStudentInfo = async () => {
  let response = await axios.get(URLSTUDENTINFO,  {
    headers: {
        'hash': 'OcJn4jYChW',
    }
  })
  return response
}

export const servicesStudentOrder = async () => {
  let response = await axios.get(URLSTUDENTORDER,  {
    headers: {
        hash: 'OcJn4jYChW'
    }
  })
  return response
}
