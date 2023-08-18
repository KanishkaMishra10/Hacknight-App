import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRotate, FaMeteor } from 'react-icons/fa6';
import Loader from '../components/Loader';
import ParticipantService from '../services/ParticipantService';
import { v4  as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const navigate = useNavigate();

  const [load,setLoad] = useState(false)
  const loader = state => {
    setLoad(state);
  };

  const [fullName, setFullName] = useState('');
  const [country,setCountry] = useState('');
  const [email,setEmail] = useState('');
  const [github,setGithub] = useState('');

  const handleFullName = e => setFullName(e.target.value);
  const handleCountry = e => setCountry(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handleGithub = e => setGithub(e.target.value);

  // const handleSubmit = async () => {
  //   event.preventDefault();
  //   console.log('handleSubmit');
  // };

  const handleRegister = async event => {
    try {
      event.preventDefault();

      loader(true);

      if (fullName === '' | email === '' | country ==='' | github==='') {
        window.alert('Please fill the form');
        return;
      }

      const newEntry = {
        id: uuid(),
        fullName: fullName,
        country: country,
        email: email,
        gitHubLink: github
      };

      await ParticipantService.register(newEntry);
      navigate('/participants');
      
    } catch (error) {
      window.alert(`Error Occurred: ${error.message}`);
    } finally {
      //setNote('');
      loader(false);
    }
  };

  return (
    <>
      {load && <Loader />}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullName}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Country"
            value={country}
            onChange={handleCountry}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="GitHub"
            value={github}
            onChange={handleGithub}
          />
        </div>
        <button className="btn btn-danger me-2" type="submit">
          <FaMeteor /> Register
        </button>
        <button className="btn btn-dark" type="submit">
          <FaRotate /> Reset
        </button>
      </form>
    </>
  );
};

export default Register;

Register.propTypes = {
  add: PropTypes.func,
  loader: PropTypes.func,
};
