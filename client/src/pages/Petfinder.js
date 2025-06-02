import axios from 'axios';

const PETFINDER_KEY = process.env.REACT_APP_PETFINDER_KEY;
const PETFINDER_SECRET = process.env.REACT_APP_PETFINDER_SECRET;

let token = null;

const getToken = async () => {
  const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
    grant_type: 'client_credentials',
    client_id: PETFINDER_KEY,
    client_secret: PETFINDER_SECRET,
  });
  token = response.data.access_token;
  return token;
};

export const getCats = async () => {
  if (!token) await getToken();
  const response = await axios.get('https://api.petfinder.com/v2/animals?type=cat&status=adoptable', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.animals;
};
