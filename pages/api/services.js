import {URLSTUDENTINFO, URLSTUDENTORDER} from '../constante'
import axios from 'axios';

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
