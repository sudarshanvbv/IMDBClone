import React from "react";

function Header(){
    return (
<header className="flex p-1">
      <div className="m-2">
        <button className="font-bold text-white">Home</button>
      </div>
      <div className="m-2">
        <button className="font-bold text-white">Watchlist</button>
      </div>
    </header>
    )
}

export default Header