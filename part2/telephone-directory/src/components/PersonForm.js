import Input from './Input'

const PersonForm = ({handles: [addPerson, handleInputName, handleInputNumber], values: [newName, newNumber]}) => {

    return (
        <form onSubmit={addPerson}>
            <Input 
            value={newName} 
            handleChange={handleInputName} 
            text='Name:'/>
            <Input 
            value={newNumber} 
            handleChange={handleInputNumber} 
            text='Number:'/>
            <button type="submit">add</button>
        </form> 
    )
}

export default PersonForm