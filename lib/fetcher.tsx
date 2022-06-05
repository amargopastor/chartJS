import axios from 'axios';

const indescatApi = axios.create({ baseURL: 'https://api.idescat.cat/pob/v1' });

const fetcher = async (resource: string) => {
  const res = await indescatApi.get(resource);
  return res.data;
};

export default fetcher;
