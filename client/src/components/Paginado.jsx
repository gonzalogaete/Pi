import React from "react";

export default function Paginado ({PkmPerPage, allPokemones, paginado}){
   
    const pageNumbers = []
    
    for(let i=0 ; i < Math.ceil(allPokemones/PkmPerPage);i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className="paginado">
                {pageNumbers && pageNumbers.map(number =>{
                    return (
                        <li className="number" key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    )
                    
                })}
            </ul>
        </nav>
    )
}
