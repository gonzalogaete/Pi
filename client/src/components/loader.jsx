import React from 'react'
import '../css/loader.css';



const Loader = () => {
  return (
    <div className="loading">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader;