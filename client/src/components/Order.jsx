import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortByName, sortByPopulation } from '../redux/actions/';
import "../assets/styles/FilterOrder.css"

export default function Order(){
    let dispatch = useDispatch();

    const [valueAlfab, setValueAlfab] = useState("OFF");
    const [valuePopulation, setValuePopulation] = useState("OFF");

    function handleSelectAlfab(e){
        setValueAlfab(e.target.value);
        dispatch(sortByName(e.target.value));
    }

    function handleSelectPopulation(e){
        setValuePopulation(e.target.value);
        dispatch(sortByPopulation(e.target.value));
    }

    return(
        <div> 
            <span className="orderTitle">Order by: </span>
            <select className="dropdown order" name="alfab" value={valueAlfab} onChange={handleSelectAlfab}>
                <option className="opt" key="1" value="OFF">OFF</option>
                <option className="opt" key="2" value="AZ">A to Z</option>
                <option className="opt" key="3" value="ZA">Z to A</option>
            </select>
            <select className="dropdown order" name="rating" value={valuePopulation} onChange={handleSelectPopulation}>
                <option className="opt" key="1" value="OFF">OFF</option>
                <option className="opt" key="2" value="05">LOWEST</option>
                <option className="opt" key="3" value="50">HIGHEST</option>
            </select>
        </div>
    );
}



