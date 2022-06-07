import axios from 'axios';
import { CountiesList } from '../types/countie';

const apiBaseURL = 'https://api.idescat.cat/pob/v1';
const api = axios.create({ baseURL: apiBaseURL });

export const getCountiesFromAPI = async () => {
  const res = await api.get('/cerca.json?p=tipus/com');
  if (res.data) {
    const filteredData:CountiesList = res.data.feed.entry.map((e) => ({
      value: e['cross:DataSet']['cross:Section'].AREA,
      label: e.title,
      active: true,
      male: e['cross:DataSet']['cross:Section']['cross:Obs'][0].OBS_VALUE,
      female: e['cross:DataSet']['cross:Section']['cross:Obs'][1].OBS_VALUE,
      all: e['cross:DataSet']['cross:Section']['cross:Obs'][2].OBS_VALUE,
    }));
    return filteredData;
  }
  return false;
};
