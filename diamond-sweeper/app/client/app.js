global.startApp = function (container) {
  //  console.log("Here is the container:", container);
  var table = document.querySelector('.diamondsweeper-board');
  var rows = 8,
      cols = 8,
      index = 0,
      score = 0,
      diamondsFound = 0,
      remainingBoxes = 0,
      diffX = 0,
      diffY = 0,
      x1, x2, y1, y2,
      directions = [],
      distances = [];
  for (var i = 0; i < rows; i++) {
      var tr = document.createElement('tr');
      table.appendChild(tr);
      for (var j = 0; j < cols; j++) {
          var td = document.createElement('td');
          td.setAttribute('id', '(' + i + ',' + j + ')');
          td.setAttribute('class', 'cell unknown');
          tr.appendChild(td);
          index++;
          td.addEventListener('click', boxClick);
      }
  }
  var td = document.querySelectorAll('.diamondsweeper-board tr td');
  var totalBoxes = td.length;
  var diamondIndexes = [];
  while (diamondIndexes.length < 8) {
      var diamondIndex = '(' + Math.floor(Math.random() * rows) + ',' + Math.floor(Math.random() * cols) + ')';
      if (diamondIndexes.indexOf(diamondIndex) == -1) {
          diamondIndexes.push(diamondIndex);
      }
  }
  console.log(diamondIndexes)


  function boxClick() {
      var boxIndex = this.getAttribute('id');
      if (this.classList.contains('unknown')) {
          this.classList.remove('unknown');
          score += 1;
          if (diamondIndexes.indexOf(boxIndex) == -1) {
              this.classList.add('arrow');
              this.classList.add(findNearByDiamond(boxIndex));
          } else {
              this.classList.add('diamond');
              diamondsFound += 1;
              remainingBoxes = totalBoxes - score;
              if (diamondsFound >= 8) {
                  setTimeout(function () {
                      alert('Game is Over! Your Score is ' + remainingBoxes);
                  }, 300)
              }
          }
      }
  }

  function findNearByDiamond(boxIndex) {
      x1 = boxIndex.substring(1, 2);
      y1 = boxIndex.substring(3, 4);
      for (var i = 0; i < diamondIndexes.length; i++) {
          x2 = diamondIndexes[i].substring(1, 2);
          y2 = diamondIndexes[i].substring(3, 4);
          if (y1 > y2) {
              diffY = y1 - y2;
              directions.push('up');
          } else if (y1 < y2) {
              diffY = y2 - y1;
              directions.push('down');
          }

          if (x1 > x2) {
              if (diffY === 0) {
                  directions.push('left');
              }
              diffX = x1 - x2;
          } else if (x1 < x2) {
              if (diffY === 0) {
                  directions.push('right');
              }
              diffX = x2 - x1;
          }
          distances.push(diffX + diffY);
      }
      var shortest = Math.min.apply(null, distances);
      return directions[distances.indexOf(shortest)];
  }
}
