export const saveGame = ({ board, turn, winsX, winsO }) => {
  window.localStorage.setItem("board", JSON.stringify(board)); //Guardar el último movimiiendo hecho
  window.localStorage.setItem("turn", turn); //Guardar el último turno
  window.localStorage.setItem("winsX", JSON.stringify(winsX))
  window.localStorage.setItem("winsO", JSON.stringify(winsO))
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
// window.localStorage.removeItem("winsX");
// window.localStorage.removeItem("winsO");