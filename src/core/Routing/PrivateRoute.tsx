import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const BASE_URL = 'https://mern-advanced-auth.herokuapp.com/api/auth';

const PrivateRoute = ({ children }: Props) => {
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  const auth = localStorage.getItem('authToken');
  if (!auth) {
    navigate('/login');
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/private`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then(() => {
        setHasAccess(true);
      })
      .catch(() => {
        navigate('/login');
      });
  });

  return <div>{hasAccess && children}</div>;
};

export default PrivateRoute;
