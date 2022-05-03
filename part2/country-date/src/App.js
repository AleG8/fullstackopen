import {useState, useEffect} from 'react'
import FilterList from './components/FilterList';

function App() {
  const [countries, setCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filterCountries, setFilterCountries] = useState([])
  const [selectedCapital, setSelectedCapital] = useState('Caracas')
  const [weatherInfo, setWeatherInfo] = useState({});


  useEffect(() => {
    async function fetchData() {    
        return await fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
              data.forEach(element => element.showDetails = false);
              setCountries(data)
            });
    }

      fetchData();
  }, []);

  useEffect(() => {
    let apiKey = process.env.REACT_APP_WEATHER_KEY;
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCapital}}`;
    
    //When the country selected has not capital
    if (!selectedCapital) return setWeatherInfo(false)

    async function fetchData() {    
        return await fetch(url)
            .then((response) => response.json())
            .then((data) => setWeatherInfo(data))
            .catch(() => setWeatherInfo(false));
    }

      fetchData();
  }, [selectedCapital]);

  const handleInput = ({target}) => {
    let newCountries = countries.filter(({name: {common}}) => {
      let regex = new RegExp(`(${inputText})`, 'gi')
      if(Boolean(inputText)) return common.match(regex)
      return true
    });

    setFilterCountries(newCountries)
    setInputText(target.value)
  }

  const handleClickShowDetails = ({target}) =>{
    let newCountries = countries.map((country) =>{
      let {name: {common}, capital} = country

      if(country.showDetails){
        country.showDetails = !country.showDetails
      }

      if(common === target.getAttribute('class')){
        setSelectedCapital(capital ? capital[0] : false)
        country.showDetails = !country.showDetails
      }
      return country
    });
    setCountries(newCountries)
  }

  const handleOneCountry = (capital) => setSelectedCapital(capital)

  return (
    <div>
      <div>
        <span>find countries </span>
        <input value={inputText} onChange={handleInput}/>
      </div>
      <FilterList 
      countries={countries}
      filterCountries={filterCountries} 
      weatherInfo={weatherInfo}
      handleClickShowDetails={handleClickShowDetails}
      handleOneCountry={handleOneCountry}/>
    </div>
  );
}

export default App;
