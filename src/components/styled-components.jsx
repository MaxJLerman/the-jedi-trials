import styled from "styled-components";

export const OutermostDiv = styled.div`
  position: relative;
  display: inline-block;
`;

export const SpritesContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
`;

export const TimerContainer = styled.div`
  color: white;
  background-color: black;
  height: 50px;
  width: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
`;

export const ResultContainer = styled.div`
  position: absolute;
  color: white;
  display: none; /* temporarily hidden */
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const PlayerHealthBarContainer = styled.div`
  position: relative;
  width: 100%;
  border-top: 4px solid white;
  border-bottom: 4px solid white;
  display: flex;
  justify-content: flex-end;
  border-left: 4px solid white;
;`

export const EnemyHealthBarContainer = styled.div`
  position: relative;
  width: 100%;
  border-top: 4px solid white;
  border-bottom: 4px solid white;
  border-right: 4px solid white;
;`

export const HealthBarForeground = styled.div`
  position: absolute;
  background-color: green;
  height: 30px;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const EnemyHealthBarForeground = styled(HealthBarForeground)`
  left: 0;
`;

export const HealthBarBackground = styled.div`
  background-color: yellow;
  height: 30px;
  width: 100%;
`;