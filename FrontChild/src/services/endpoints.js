import { keys } from '../utils/storage'
import axios from 'axios'

const auth = {
  email: 'codegods@codegods.com',
  fullname: 'Juan',
  jwt: '',
  username: 'Juan'
}

const deleteAuth = () => {
  window.localStorage.removeItem(keys.auth)
}

const setAuth = () => {
  window.localStorage.setItem(keys.auth, JSON.stringify(auth))
}

const getAuth = () => {
  return JSON.parse(window.localStorage.getItem(keys.auth)) ?? undefined
}

const signOut = () => {
  deleteAuth()
}

const signInWithEmailAndPassword = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setAuth()
      resolve(auth)
    }, 1000)
  })
}

const instanceAPI = axios.create({
  baseURL: 'http://localhost:8081'
})

const URLS = {
  POST_TASK: '/chpp/Tasks/1/new',
  UPDATE_TASK: '/chpp/Tasks',
  GET_TASKBOARD: '/chpp/TaskBoards/1'
}

const getTask = async () => {
  const response = await instanceAPI.get(URLS.GET_TASKBOARD)
  return response.data
}
const postTask = async (body) => {
  const response = await instanceAPI.post(URLS.POST_TASK, body)
  return response.data
}
const updateTask = async (body, id) => {
  const url = URLS.UPDATE_TASK + `/${id}`
  const response = await instanceAPI.put(url, body)
  return response.data
}
const deleteTask = async (id) => {
  const url = URLS.UPDATE_TASK + `/${id}`
  const response = await instanceAPI.delete(url)
  return response.data
}

export const api = {
  getTask,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  postTask,
  updateTask,
  deleteTask
}
