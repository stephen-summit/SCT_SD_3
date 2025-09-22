from typing import List, Tuple, Optional

Grid = List[List[int]]

def is_valid(grid: Grid, row: int, col: int, val: int) -> bool:
    # Check row and column
    for i in range(9):
        if grid[row][i] == val:
            return False
        if grid[i][col] == val:
            return False
    # Check 3x3 box
    box_r = (row // 3) * 3
    box_c = (col // 3) * 3
    for r in range(box_r, box_r + 3):
        for c in range(box_c, box_c + 3):
            if grid[r][c] == val:
                return False
    return True

def find_most_constrained_empty(grid: Grid) -> Optional[Tuple[int,int]]:
    best = None
    best_count = 10
    for r in range(9):
        for c in range(9):
            if grid[r][c] == 0:
                possibilities = 0
                for val in range(1,10):
                    if is_valid(grid, r, c, val):
                        possibilities += 1
                if possibilities < best_count:
                    best_count = possibilities
                    best = (r, c)
                    if best_count == 1:
                        return best
    return best

def solve(grid: Grid) -> bool:
    empty = find_most_constrained_empty(grid)
    if not empty:
        return True
    row, col = empty
    for val in range(1, 10):
        if is_valid(grid, row, col, val):
            grid[row][col] = val
            if solve(grid):
                return True
            grid[row][col] = 0
    return False

def grid_from_list(lst: List[int]) -> Grid:
    if len(lst) != 81:
        raise ValueError("List must be 81 integers")
    return [lst[i*9:(i+1)*9] for i in range(9)]

def list_from_grid(grid: Grid) -> List[int]:
    return [cell for row in grid for cell in row]
