const Person = ({ person, deleteItem}) => 
  <li>
    {person.name} {person.number} <button onClick={deleteItem}>delete</button>
  </li>
export default Person