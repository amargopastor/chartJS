import axios from 'axios';

const apiBaseURL = 'https://api.idescat.cat/pob/v1';
const api = axios.create({ baseURL: apiBaseURL });

export const getIngredients = async () => {
  const res = await api.get('/cerca.json?p=tipus/com');
  if (res.data) {
    const filtered_data = res.data.feed.entry.map((e) => ({
      area: e['cross:DataSet']['cross:Section'].AREA,
      name: e.title,
      male: e['cross:DataSet']['cross:Section']['cross:Obs'][0].OBS_VALUE,
      female: e['cross:DataSet']['cross:Section']['cross:Obs'][1].OBS_VALUE,
      all: e['cross:DataSet']['cross:Section']['cross:Obs'][2].OBS_VALUE,
    }));
    return filtered_data;
  }
  return false;
};
