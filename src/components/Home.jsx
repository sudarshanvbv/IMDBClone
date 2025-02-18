import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import Movies from "./Movies";

function Home() {
  return (
    <div className="bg-green-800">
    <Banner/>
    <Movies/>
    </div>
  );
}

export default Home;
