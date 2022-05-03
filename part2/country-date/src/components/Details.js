const Weather = ({weatherInfo}) => {
    if(weatherInfo.hasOwnProperty('error') || !weatherInfo) return (
        <div><strong>Not Available</strong></div>
    )

    let {current: {temp_c, condition, wind_mph}} = weatherInfo

    return (
        <section>
            <p>Temperature: {temp_c} | Celcius</p>
            <img src={condition.icon} alt="weather icon"/>
            <p>Wind: {wind_mph}</p>
        </section>
    )
}

const Details = ({information, weatherInfo}) => {
    let {name: {common}, capital, population, languages, flags: {png}} = information
    
    return (
        <div>   
            <h1>{common}</h1>
                <img src={png} alt="country flag" width="150"/>
                <p>
                    Capital: {capital || 'Has not capital'} <br/>
                    Population: {population}
                </p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(languages).map(lan =>(
                        <li key={lan}>{lan}</li>
                    ))}
                </ul>
                <h2>{capital ? `Weather in ${capital}` : '**********'}</h2>
                <Weather weatherInfo={weatherInfo}/>
        </div>
    )
}

export default Details