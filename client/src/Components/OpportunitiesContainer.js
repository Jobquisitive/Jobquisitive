import { useAppContext } from '../Context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Opportunity from './Opportunity'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const OpportunitiesContainer = () => {
    const {
        getAllOpportunitiesRecruiter,
        opportunities,
        isLoading,
        page,
        numOfPages,
        totalJobs,
        search,
        searchStatus,
        searchType,
        sort,
    } = useAppContext()
    useEffect(() => {
        getAllOpportunitiesRecruiter()
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Loading center='center' />
    }
    if (opportunities.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <h5>
                {opportunities.length} job{opportunities.length > 1 && 's'} 
            </h5>
            <div className='jobs'>
                {opportunities.map((job) => {
                    return <Opportunity key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default OpportunitiesContainer
