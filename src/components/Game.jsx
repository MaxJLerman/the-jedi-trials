import React from "react";
import {Link} from "react-router-dom";

import {OutermostDiv, SpritesContainer, TimerContainer, ResultContainer, PlayerHealthBarContainer, EnemyHealthBarContainer, HealthBarForeground, EnemyHealthBarForeground, HealthBarBackground} from "./styled-components";

const Game = () => {
  return (
    <div>
      <h2>Game Page</h2>

      <div>
        <OutermostDiv>
          <SpritesContainer>
            {/* <!-- player health --> */}
            <PlayerHealthBarContainer>
              <HealthBarForeground />
              <HealthBarBackground />
            </PlayerHealthBarContainer>
            {/* <!-- timer --> */}
            <TimerContainer>
              {/* <!-- need to be able to change the timer value dynamically --> */}
              10
            </TimerContainer>
            {/* <!-- enemy health --> */}
            <EnemyHealthBarContainer>
              <EnemyHealthBarForeground />
              <HealthBarBackground />
            </EnemyHealthBarContainer>
          </SpritesContainer>
          <ResultContainer>
            Tie
          </ResultContainer>
          <canvas></canvas>
        </OutermostDiv>
        
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js" integrity="sha512-f8mwTB+Bs8a5c46DEm7HQLcJuHMBaH/UFlcgyetMqqkvTcYg4g5VXsYR71b3qC82lZytjNYvBj2pf0VekA9/FQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="src/utils/utils.js"></script>
        <script src="src/classNamees/sprite.js"></script>
        <script src="src/classNamees/fighter.js"></script>
        <script src="index.js"></script> */}
      </div>

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

export default Game;