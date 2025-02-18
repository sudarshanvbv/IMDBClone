import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return (
<header className="flex p-1">
      <div className="m-2">
        <Link className="font-bold text-white" to={"/"}>HOME</Link>
      </div>
      <div className="m-2">
        <Link className="font-bold text-white" to={"/watchlist"}>WATCHLIST</Link>
      </div>
    </header>
    )
}

export default Header