import { ajax } from "../tools/ajax";

export const getCountries =  async() =>{

    const optionRequest  = {
        method: "GET",
        url:"https://restcountries.com/v3.1/all"
      };

    return await ajax(optionRequest);
}