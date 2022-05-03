import Details from './Details'
import Show from './Show';

const FilterList = ({countries, filterCountries, weatherInfo, handleClickShowDetails, handleOneCountry}) => {

    if(filterCountries.length === countries.length){
        return <div> Not results :-\</div>
        
    }else if(filterCountries.length === 1){
        handleOneCountry(filterCountries[0].capital[0])
        return (
            <Details information={filterCountries[0]} weatherInfo={weatherInfo}/>
        )
    }else if(filterCountries.length <= 10){
        return (
            <div>
                {
                    filterCountries.map(({name: {common}, showDetails}, i) => (
                        <Show key={common}
                        countryName={common} 
                        weatherInfo={weatherInfo}
                        showDetails={showDetails} 
                        handleClickShowDetails={handleClickShowDetails} 
                        information={filterCountries[i]}
                        />
                    ))
                }
            </div>
        )
        
    }else{
        <div>
            'Too many matches, please enter more information'
        </div>
    }  
}

export default FilterList