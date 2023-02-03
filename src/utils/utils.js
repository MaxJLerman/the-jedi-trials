// collision detection
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && // rectangle1's right-side box colliding with left of rectangle2
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && // rectangle1's right-side box is on the left of the rectangle2 ONLY
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && //
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height //
  );
}

function determineWinner({ player, enemy, timerID }) {
  clearTimeout(timerID);
  document.querySelector('#result').style.display = 'flex'; // displays the result regardless of value

  if (player.health === enemy.health) {
    document.querySelector('#result').innerHTML = 'Tie';
  } else if (player.health > enemy.health) {
    document.querySelector('#result').innerHTML = 'Player wins!';
  } else if (player.health < enemy.health) {
    document.querySelector('#result').innerHTML = 'Enemy wins!';
  }
}

let timer = 10 + 1; // added +1 so the timer renders with provided value
let timerID;
function decreateTimer() {
  if (timer > 0) {
    timerID = setTimeout(decreateTimer, 1000);
    timer--;
    document.querySelector('#timer').innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({player, enemy, timerID});
  }
}