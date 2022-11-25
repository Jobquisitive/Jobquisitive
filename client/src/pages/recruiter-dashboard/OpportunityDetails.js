import Wrapper from "../../assets/wrappers/Job";
import { useAppContext } from "../../Context/appContext";
import { useEffect } from "react";
import Loading from "../../Components/Loading";

const OpportunityDetails = () => {
  const { getCurrentOpportunityDetails, currentOpportunity, isLoading } =
    useAppContext();

  useEffect(() => {
    getCurrentOpportunityDetails();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center="center" />;
  }
  if (currentOpportunity.usersApplied.length === 0) {
    return (
      <Wrapper>
        <h2>No Applicants applied to this job.</h2>
      </Wrapper>
    );
  }

  return (
    <div>
      <h2>{currentOpportunity.position}</h2>
      {currentOpportunity.usersApplied.map((el, idx) => {
        return (
          <Wrapper>
            <div>
              <header>
                <div className="main-icon">{idx + 1}</div>
                <div className="info">
                  <h5>{`Applicant - ${idx + 1}`}</h5>
                  <a href={`${el.fileId}`}>Resume Link</a>
                </div>
              </header>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
};

export default OpportunityDetails;
