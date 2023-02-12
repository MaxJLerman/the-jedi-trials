import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <br />
      <ul>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/game">Game</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;