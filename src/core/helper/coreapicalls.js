import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}products`, {
    method: "GET"
  })
    .then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        return data.json();
      }
    })
    .catch(error => {
      console.log(error);
    });
};
