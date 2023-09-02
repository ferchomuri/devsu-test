import axios from "axios";

const token = 272627262;

const initData = {
  api: "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/",
};

const auth = {
  headers: {
    "Content-Type": "application/json",
    authorId: `${token}`,
  },
};

export const get = async (endpoint) => {
  try {
    let url = `${initData.api}${endpoint}`;

    const response = await axios.get(url, auth);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Error al realizar la petición");
  }
};

export const post = async (endpoint, data) => {
  try {
    let url = `${initData.api}${endpoint}`;
    const response = await axios.post(url, data, auth);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Error al realizar la petición");
  }
};

export const put = async (endpoint, data) => {
  try {
    let url = `${initData.api}${endpoint}`;
    const response = await axios.put(url, data, auth);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Error al realizar la petición");
  }
};

export const remove = async (endpoint) => {
  try {
    let url = `${initData.api}${endpoint}`;
    const response = await axios.delete(url, auth);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Error al realizar la petición");
  }
};
