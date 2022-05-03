import Details from "./Details"

const Show = ({countryName, weatherInfo, showDetails, handleClickShowDetails, information}) => {

    return (
      <div>
          <span>{countryName}</span>
          <button 
          className={countryName}
          type='button' 
          onClick={handleClickShowDetails}>Show</button>
          {
            (showDetails) && 
            <Details 
            information={information} 
            weatherInfo={weatherInfo}/>
          }
      </div>
    )
  }

  export default Show