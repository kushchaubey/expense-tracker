import axios from 'axios';


export const  getdataBasedOnURL = (URL, setState,setloading) => {

      axios.get(URL)
    .then((res) => {
         
       if(res.data.statusText=="success"){
      setState(res.data.data); // ✔️ works if your API response format is { data: { ... } }
      setloading(false)
       }
    })
    .catch((err) => {
      console.error('Error fetching data:', err); // more descriptive
      setState([]); // optional: clear state on error
    });
 
};

