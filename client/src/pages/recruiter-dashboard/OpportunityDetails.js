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
    return <h3>No one applied to this job...</h3>;
  }

  return (
    <div>
      <h3>
        {currentOpportunity.company} | {currentOpportunity.position}
      </h3>
      {currentOpportunity.usersApplied.map((el, idx) => {
        return (
          <div>
            <Wrapper>
              <div>
                <header>
                  <div className="main-icon">{idx + 1}</div>
                  <div className="info">
                    <h5>{`Applicant - ${idx + 1}`}</h5>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${el.fileId}`}
                    >
                      Resume Link
                    </a>
                  </div>
                </header>
              </div>
            </Wrapper>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default OpportunityDetails;
