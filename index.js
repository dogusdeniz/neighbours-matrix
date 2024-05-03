/**
 * 2 dimentional array
 *
 * 9 4
 * 6 3
 * 5 8
 *
 * getNeighbours(9) => [4,6]
 * getNeighbours(3) => [4,6,8]
 *
 */

var rows = [
    [9, 4],
    [6, 3],
    [5, 8],
  ];
  
  var xLen = 2;
  var yLen = 3;
  
  function getPosition(num) {
    for (let y = 0; y < rows.length; y++) {
      const cols = rows[y];
  
      for (let x = 0; x < cols.length; x++) {
        const val = cols[x];
  
        if (val == num) {
          return { x, y };
        }
      }
    }
  
    return null;
  }
  
  function hasTopNeighbour(pos) {
    const { y } = pos;
  
    return y > 0 && y < yLen;
  }
  
  function hasBottomNeighbour(pos) {
    const { y } = pos;
  
    return y > -1 && y < yLen - 1;
  }
  
  function hasLeftNeighbour(pos) {
    const { x } = pos;
  
    return x > 0 && x < xLen;
  }
  
  function hasRightNeighbour(pos) {
    const { x } = pos;
  
    return x > -1 && x < xLen - 1;
  }
  
  function getTopNeighbour(pos) {
    const { x, y } = pos;
  
    return rows[y - 1][x];
  }
  
  function getBottomNeighbour(pos) {
    const { x, y } = pos;
  
    return rows[y + 1][x];
  }
  
  function getLeftNeighbour(pos) {
    const { x, y } = pos;
  
    return rows[y][x - 1];
  }
  
  function getRightNeighbour(pos) {
    const { x, y } = pos;
  
    return rows[y][x + 1];
  }
  
  function getNeighbours(num) {
    // find number x , y position
    let pos = getPosition(num);
  
    if (!pos) throw Error(`Error : ${num} not found!`);
  
    let topNeighbour = null;
    let bottomNeighbour = null;
    let leftNeighbour = null;
    let rightNeighbour = null;
  
    if (hasTopNeighbour(pos)) {
      topNeighbour = getTopNeighbour(pos);
    }
  
    if (hasBottomNeighbour(pos)) {
      bottomNeighbour = getBottomNeighbour(pos);
    }
  
    if (hasLeftNeighbour(pos)) {
      leftNeighbour = getLeftNeighbour(pos);
    }
  
    if (hasRightNeighbour(pos)) {
      rightNeighbour = getRightNeighbour(pos);
    }
  
    return [topNeighbour, bottomNeighbour, leftNeighbour, rightNeighbour];
  }
  
  function getVectorTransform(vector) {
    let xVector = rows.flat(1);
  
    let transfromed = {};
  
    for (let i = 0; i < xVector.length; i++) {
      const val = vector[i];
      const index = xVector[i];
  
      transfromed[index + "."] = val;
    }
  
    return transfromed;
  }
  
  function getNeighboursMatrix() {
    let matrix = {};
    let xVector = rows.flat(1);
    let yVector = rows.flat(1);
  
    for (let x = 0; x < xVector.length; x++) {
      const xVal = xVector[x];
      const row = [];
      const neighbours = getNeighbours(xVal);
  
      for (let y = 0; y < yVector.length; y++) {
        const yVal = yVector[y];
  
        if (neighbours.includes(yVal)) {
          row.push(1);
          continue;
        }
  
        row.push(0);
      }
  
      const transfromed = getVectorTransform(row);
  
      matrix[xVal + "."] = transfromed;
    }
  
    return matrix;
  }
  
  async function readLine() {
    return new Promise((resolve, reject) => {
      process.stdin.once("data", (data) => {
        resolve(data.toString().trim());
      });
    });
  }
  
  async function main() {
    // print array table
    // color yellow
    console.log("\x1b[33m");
    console.log(rows.map((x) => x.join(" ")).join("\n"));
    console.log("\x1b[0m");
  
    //   while (true) {
    //     console.log("Enter a number to get neighbours : ");
    //     let num = await readLine();
  
    //     if (num === "exit") break;
  
    //     try {
    //       let neighbours = getNeighbours(parseInt(num));
  
    //       console.log(`Neighbours of ${num} are : ${neighbours.filter((x) => x).join(", ")}`);
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   }
  
    const neighbours = getNeighboursMatrix();
  
    console.table(neighbours);
  }
  
  main();
  
  /* OUTPUT
  
  9 4
  6 3
  5 8
  
  ┌─────────┬────┬────┬────┬────┬────┬────┐
  │ (index) │ 9. │ 4. │ 6. │ 3. │ 5. │ 8. │
  ├─────────┼────┼────┼────┼────┼────┼────┤
  │   9.    │ 0  │ 1  │ 1  │ 0  │ 0  │ 0  │
  │   4.    │ 1  │ 0  │ 0  │ 1  │ 0  │ 0  │
  │   6.    │ 1  │ 0  │ 0  │ 1  │ 1  │ 0  │
  │   3.    │ 0  │ 1  │ 1  │ 0  │ 0  │ 1  │
  │   5.    │ 0  │ 0  │ 1  │ 0  │ 0  │ 1  │
  │   8.    │ 0  │ 0  │ 0  │ 1  │ 1  │ 0  │
  └─────────┴────┴────┴────┴────┴────┴────┘
  
  */