class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}
export default class Matrix {
    constructor(rows, cols, cellSize) {
        this.grid = [];
        for (let x = 0; x < rows; x++) {
            this.grid[x] = [];
            for (let y = 0; y < cols; y++) {
                this.grid[x][y] = new Cell(x, y, cellSize)
            }
        }
    }
    draw(context) {
        this.grid.forEach(row => {
            row.forEach(cell => {
                context.fillStyle = (cell.x + cell.y) % 2 === 0 ? "white" : "#eee";
                context.fillRect(cell.x * cell.size, cell.y * cell.size, cell.size, cell.size)
                context.fillStyle = "black";
                context.font = "12px sans-serif"
                let x = cell.x * cell.size + 5;
                let y = cell.y * cell.size + 15;
                context.fillText(`(${cell.x}, ${cell.y})`, x, y);
            })
        })
    }
}