import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import reducer from './reducer'
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_RECRUITER_BEGIN,
    REGISTER_RECRUITER_SUCCESS,
    REGISTER_RECRUITER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_RECRUITER_BEGIN,
    LOGIN_RECRUITER_SUCCESS,
    LOGIN_RECRUITER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_RECRUITER_BEGIN,
    UPDATE_RECRUITER_SUCCESS,
    UPDATE_RECRUITER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
     POST_JOB_BEGIN,
    POST_JOB_SUCCESS,
    POST_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
} from './actions'

const user = localStorage.getItem('user')
const recruiter = localStorage.getItem('recruiter')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    recruiter:recruiter?JSON.parse(recruiter):null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,
    // recruiter
    companyName: '',
    //jobs
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation || '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    jobDescription:'',
    statusOptions: ['pending', 'interview', 'declined'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //axios
    const fetchAuth = axios.create({
        baseURL: 'api/v1',
    })
    //requests
    fetchAuth.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    //response
    fetchAuth.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, recruiter, token }) => {
        localStorage.setItem('recruiter', JSON.stringify(recruiter))
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('recruiter')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post(
                '/api/v1/user-auth/register-user',
                currentUser
            )
            console.log(response)
            const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location },
            })
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const registerRecruiter = async (currentUser) => {
        dispatch({ type: REGISTER_RECRUITER_BEGIN })
        try {
            const response = await axios.post(
                '/api/v1/recruiter-auth/register-recruiter',
                currentUser
            )
            console.log(response)
            const { recruiter, token } = response.data
            dispatch({
                type: REGISTER_RECRUITER_SUCCESS,
                payload: { recruiter, token },
            })
            addUserToLocalStorage({ recruiter, token})
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: REGISTER_RECRUITER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/user-auth/login-user', currentUser)
            console.log(response)
            const { user, token } = response.data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token },
            })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const loginRecruiter = async (currentUser) => {
        dispatch({ type: LOGIN_RECRUITER_BEGIN })
        try {
            const response = await axios.post('/api/v1/recruiter-auth/login-recruiter', currentUser)
            console.log(response)
            const { recruiter, token } = response.data
            dispatch({
                type: LOGIN_RECRUITER_SUCCESS,
                payload: { recruiter, token },
            })
            addUserToLocalStorage({ recruiter, token })
        } catch (error) {
            dispatch({
                type: LOGIN_RECRUITER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await fetchAuth.patch(
                '/auth/updateUser',
                currentUser
            )
            const { user, token, location } = data

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, token, location },
            })

            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }

    const updateRecruiter = async (currentUser) => {
        dispatch({ type: UPDATE_RECRUITER_BEGIN })
        try {
            const { data } = await fetchAuth.patch(
                '/recruiter-auth/update-recruiter',
                currentUser
            )
            const { recruiter, token } = data

            dispatch({
                type: UPDATE_RECRUITER_SUCCESS,
                payload: { recruiter, token },
            })

            addUserToLocalStorage({ recruiter, token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_RECRUITER_ERROR,
                    payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }

    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state

            await fetchAuth.post('/user-jobs', {
                company,
                position,
                jobLocation,
                jobType,
                status,
            })
            dispatch({
                type: CREATE_JOB_SUCCESS,
            })
            //dispatch({ type: CLEAR_VALUES })
            clearValues()
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: CREATE_JOB_ERROR,
                    payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }
    
    // Recruiter posted job :
    const postJob = async () => {
        dispatch({ type: POST_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, jobDescription } = state

            await fetchAuth.post('/recruiter-jobs', {
                company,
                position,
                jobLocation,
                jobType,
                jobDescription,
            })
            dispatch({
                type: POST_JOB_SUCCESS,
            })
            //dispatch({ type: CLEAR_VALUES })
            clearValues()
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: POST_JOB_ERROR,
                    payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }

    const getAllJobs = async () => {
        // will add page later
        const { page, search, searchStatus, searchType, sort } = state
        let url = `/user-jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if (search) {
            url = url + `&search=${search}`
        }
        dispatch({ type: GET_JOBS_BEGIN })
        try {
            const { data } = await fetchAuth.get(url)
            const { jobs, totalJobs, numOfPages } = data
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages,
                },
            })
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
    }
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state

            await fetchAuth.patch(`/user-jobs/${state.editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status,
            })
            dispatch({
                type: EDIT_JOB_SUCCESS,
            })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            await fetchAuth.delete(`/user-jobs/${jobId}`)
            getAllJobs()
        } catch (error) {
            logoutUser()
        }
    }

    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await fetchAuth.get('/user-jobs/stats')
            const { defaultStats, monthlyApplications } = data
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: { stats: defaultStats, monthlyApplications },
            })
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } })
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                clearAlert,
                registerUser,
                registerRecruiter,
                loginUser,
                loginRecruiter,
                toggleSidebar,
                logoutUser,
                updateUser,
                updateRecruiter,
                handleChange,
                clearValues,
                createJob,
                postJob,
                getAllJobs,
                setEditJob,
                deleteJob,
                editJob,
                showStats,
                clearFilters,
                changePage,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { initialState, AppProvider, useAppContext }
