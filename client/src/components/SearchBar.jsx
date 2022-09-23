import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBarPokemon } from "../actions";

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name,setName] = useState('')

    function InputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function Submit(e){
        e.preventDefault()
        dispatch(searchBarPokemon(name))
    }

    return(
        <div>
            <input 
                type='text'
                placeholder="Buscar Pokemon"
                onChange={(e)=> InputChange(e)}
            >
            </input>
            <button type="submit" onClick={e => Submit(e)}>Buscar</button>
        </div>
    )
}