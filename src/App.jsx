import { useEffect, useState } from 'react'
import { getCountries } from "./services/countries";
import { getCities } from "./services/cities"
import { getCityWeather } from './services/weather';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [wether, setWeather] = useState(null);



  useEffect(() => {
    (async () => {
      setCountries(await getCountries());

    })();
  }, []);

  const countryHandler = async e => {
    e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
    setWeather(null)
  }
  const cityHandler = async e => e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value));

  console.info(wether)


  return (
    <>

      <div>
        <label> Elige un pais</label>

        <select onChange={countryHandler}>
          <option value="">Selecciona</option>
          {countries.map(country => <option key={country.cca2} value={country.cca2}>{country.name.common}</option>)}

        </select>

      </div>

      ¨{cities.length > 0 && (
        <div>
          <label>Elige una ciudad</label>

          <select onChange={cityHandler}>
            <option value="">Selecciona</option>

            {cities.map(city => <option key={city.id}>{city.name}</option>)}
          </select>
        </div>
      )}

      <hr />
      {wether && (

        <div>

          <h2> Actual temperature {wether.main.temp}º</h2>
          <p>Min:{wether.main.temp_min}º</p>
          <p>Max: {wether.main.temp_max}º</p>
          <img src={`http://openweathermap.org/img/wn/${wether.weather[0].icon}@2x.png`} alt="weather icon" />

        </div>

      )}

    </>
  );
}
export default App
