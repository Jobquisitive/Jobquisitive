import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, Alert } from "../../Components";
import { useAppContext } from "../../Context/appContext";

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    isLoading,
    updateUser,
    positionOptions,
  } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [aspiringPosition, setAspiringPosition] = useState(
    user?.aspiringPosition
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, location, aspiringPosition });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <FormRowSelect
            labelText="Position Type"
            name="aspiringPosition"
            value={aspiringPosition}
            handleChange={(e) => setAspiringPosition(e.target.value)}
            list={positionOptions}
          >
            Position Type
          </FormRowSelect>

          <button
            id="btn-profile"
            className="btn btn-block"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
