import { useAppContext } from "../Context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import OpportunityApply from "./OpportunityApply";
import Wrapper from "../assets/wrappers/OpportunityContainer";
import PageBtnContainer from "./PageBtnContainer";

const UserOpportunitiesContainer = () => {
  const { getAllOpportunitiesUser, opportunities, isLoading, numOfPages } =
    useAppContext();
  useEffect(() => {
    getAllOpportunitiesUser();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center="center" />;
  }
  if (opportunities.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {opportunities.length} job{opportunities.length > 1 && "s"}
      </h5>
      <div className="opp">
        {opportunities.map((job) => {
          return <OpportunityApply key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default UserOpportunitiesContainer;
