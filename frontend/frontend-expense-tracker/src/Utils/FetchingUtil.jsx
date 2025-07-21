import axios from 'axios';

export const  getdataBasedOnURL = (URL, setState) => {
  axios.get(URL)
    .then((res) => {
      setState(res.data.data); // ✔️ works if your API response format is { data: { ... } }
    })
    .catch((err) => {
      console.error('Error fetching data:', err); // more descriptive
      setState([]); // optional: clear state on error
    });
};

