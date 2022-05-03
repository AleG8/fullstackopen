const FilterList = ({elements, keyFilter, handleDeletePerson}) => {
    elements = elements.filter(element => {
        if(Boolean(keyFilter)) {
            return element.name.match(new RegExp(`(${keyFilter})`, 'gi'))
        }
        return true
    });

    return (
        <ul>
            {elements.map(({id, name, number}) => (
                <li key={name}>
                    {name} {number}
                    <button onClick={()=> handleDeletePerson(id, name)}>delete</button>
                </li>
            ))}
        </ul>
    )   
}

export default FilterList