import React from "react";

function Banner() {
    return (
        <div className="flex items-center w-full h-[40vh] min-h-[40vh] bg-opacity-40 bg-cover bg-[url('https://live.staticflickr.com/294/20205591511_c49100c2dc_h.jpg')]">
            <img className="flex w-full h-[40vh] opacity-80" src="src\assets\images\wicked.jpg"></img>
        </div>
    );
}

export default Banner;
