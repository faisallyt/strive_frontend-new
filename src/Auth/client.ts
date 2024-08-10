import axios from "axios";



export const api = axios.create({
  headers: {
    "Content-type": "multipart/form-data",
    Accept: "application/json",
  },
});


