import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { FormRow, Alert, FormRowSelect } from './'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import moment from 'moment'
import { useState } from 'react'
import { useAppContext } from '../Context/appContext'


const OpportunityApply = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    jobDescription,
    createdAt,
}) => {
    const [show, setShow] = useState(false);
    const [resume, setResume] = useState('');

    const { appliedJob } = useAppContext();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleResumeInput = (e) => {
        e.preventDefault();
        setResume(e.target.value);
    }

    const handleSubmit = (e) => {
        // Handle Post Resume in appContext
        e.preventDefault()
        appliedJob(_id, resume)
    }

    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')

    
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div>{jobDescription}</div>
                </div>
                
                <footer>
                    <div className='actions'>
                        <button
                            // to='/add-job'
                            onClick={() => handleShow()}
                            className='btn edit-btn'
                        >
                            Apply
                        </button>
                    </div>
                    <div className={ show ? undefined : 'hidden'}>
                        <form className='form'>
                            <div className='form-center'>
                                <FormRow
                                    type='text'
                                    labelText='Provide your resume drive link'
                                    name='resumeId'
                                    value={resume}
                                    handleChange={handleResumeInput}
                                />
                            </div>
                            <div className='btn-container'>
                                <button
                                    className='btn btn-block submit-btn'
                                    type='submit'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </footer>
            </div>
        </Wrapper>
    )
}

export default OpportunityApply
