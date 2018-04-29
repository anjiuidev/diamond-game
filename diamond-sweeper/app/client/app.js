global.startApp = function (container) {
  //  console.log("Here is the container:", container);
  var table = document.querySelector('.diamondsweeper-board');
  var rows = 8,
      cols = 8,
      index = 0,
      score = 0,
      diamondsFound = 0,
      remainingBoxes = 0;
  for (var i = 0; i < rows; i++) {
      var tr = document.createElement('tr');
      table.appendChild(tr);
      for (var j = 0; j < cols; j++) {
          var td = document.createElement('td');
          td.setAttribute('id', index);
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
      var diamondIndex = Math.floor(Math.random() * totalBoxes);
      if (diamondIndexes.indexOf(diamondIndex) == -1) {
          diamondIndexes.push(diamondIndex);
      }
  }
  console.log(diamondIndexes)

  function boxClick() {
      var boxIndex = parseInt(this.getAttribute('id'));
      if (this.classList.contains('unknown')) {
          this.classList.remove('unknown');
          score += 1;
          if (diamondIndexes.indexOf(boxIndex) == -1) {
              this.classList.add('arrow');
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
}
