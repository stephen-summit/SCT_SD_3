from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from solver import grid_from_list, list_from_grid, solve, is_valid
app = Flask(
    __name__,
    static_folder='../frontend/static',
    template_folder='../frontend/templates'
)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/solve', methods=['POST'])
def api_solve():
    data = request.get_json()
    if not data or 'cells' not in data:
        return jsonify({'success': False, 'error': 'Missing cells array'}), 400

    cells = data['cells']
    try:
        grid = grid_from_list([int(x) for x in cells])
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

    # Validate initial grid for conflicts
    for r in range(9):
        for c in range(9):
            val = grid[r][c]
            if val != 0:
                grid[r][c] = 0
                if not is_valid(grid, r, c, val):
                    return jsonify({'success': False, 'error': f'Initial puzzle has a conflict at row {r+1}, col {c+1}'}), 400
                grid[r][c] = val

    solvable = solve(grid)
    if not solvable:
        return jsonify({'success': False, 'error': 'Puzzle cannot be solved (no solution found)'}), 200

    solved_list = list_from_grid(grid)
    return jsonify({'success': True, 'solution': solved_list}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
