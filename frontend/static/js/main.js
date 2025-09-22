// Generate grid
function createGrid() {
  const grid = document.querySelector('.grid');
  grid.innerHTML = '';
  for (let i=0;i<81;i++){
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.maxLength = 1;
    input.dataset.index = i;
    input.addEventListener('input', onCellInput);
    input.addEventListener('keydown', onKeyDown);
    grid.appendChild(input);
  }
}

function onCellInput(e){
  const v = e.target.value.replace(/[^1-9]/g, '');
  e.target.value = v;
}

function onKeyDown(e){
  const idx = parseInt(e.target.dataset.index);
  if (e.key === 'ArrowRight') focusCell(idx+1);
  if (e.key === 'ArrowLeft') focusCell(idx-1);
  if (e.key === 'ArrowUp') focusCell(idx-9);
  if (e.key === 'ArrowDown') focusCell(idx+9);
  if (e.key === 'Backspace' && e.target.value === '') focusCell(idx-1);
}

function focusCell(i){
  if (i < 0 || i >= 81) return;
  const el = document.querySelector(`input[data-index='${i}']`);
  if (el) el.focus();
}

function getCells(){
  return Array.from(document.querySelectorAll('.grid input')).map(i => {
    const v = i.value.trim();
    return v === '' ? 0 : parseInt(v);
  });
}

function setCells(arr){
  const inputs = document.querySelectorAll('.grid input');
  inputs.forEach((inp, idx) => { inp.value = arr[idx] === 0 ? '' : arr[idx]; if (arr[idx] !== 0) inp.classList.add('prefilled'); });
}

async function solve(){
  const cells = getCells();
  showMessage('Solving...');
  try{
    const res = await fetch('/api/solve', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({cells})
    });
    const j = await res.json();
    if (j.success){
      setCells(j.solution);
      showMessage('Solved successfully!', false, true);
    } else {
      showMessage(j.error || 'Unknown error', true);
    }
  } catch(err){
    showMessage('Network error: ' + err.message, true);
  }
}

function clearGrid(){
  document.querySelectorAll('.grid input').forEach(i => { i.value=''; i.classList.remove('prefilled'); });
  showMessage('');
}

function loadSample(){
  const sample = [5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9];
  setCells(sample);
}

function showMessage(text, isError=false, isSuccess=false){
  const el = document.getElementById('message');
  el.textContent = text || '';
  el.className = 'message';
  if (isError) el.classList.add('error');
  if (isSuccess) el.classList.add('success');
}

window.addEventListener('DOMContentLoaded', () => {
  createGrid();
  document.getElementById('solve-btn').addEventListener('click', solve);
  document.getElementById('clear-btn').addEventListener('click', clearGrid);
  document.getElementById('fill-sample').addEventListener('click', loadSample);
});
