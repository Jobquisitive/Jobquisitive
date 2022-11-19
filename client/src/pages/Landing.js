import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../Components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            <strong>
              WANT TO TRACK YOUR PROGRESS DURING THE JOB SEARCH PROCESS?
            </strong>
            <br />
            We have made this convenient for you!
            <br /> Register on the app and track your progress now.
          </p>
          <div className="flex-container">
            <div>
              <strong>For Job Seekers</strong>
              <Link to="/register-user" className="btn btn-hero h3">
                Login/Register
              </Link>
            </div>
            <div>
              <strong>For Recruiters</strong>
              <Link to="/register-recruiter" className="btn btn-hero">
                Login/Register
              </Link>
            </div>
          </div>
        </div>
        {/* image */}
        <img src={main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
