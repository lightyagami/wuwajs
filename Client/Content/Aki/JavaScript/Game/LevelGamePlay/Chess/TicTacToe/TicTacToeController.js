"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicTacToeController = undefined;
class TicTacToeController {
  constructor() {
    this.SelfCamp = 1;
    this.SelectIndex = -1;
    this.WinLineCount = 3;
    this.ChessBoard = undefined;
    this.OnPieceMove = undefined;
  }
  Init(t, e) {
    this.ChessBoard = t;
    this.SelfCamp = e;
  }
  OnStartRound() {}
  OnStartGame() {
    this.SelectIndex = -1;
  }
  get IsSelecting() {
    return this.SelectIndex > -1;
  }
  get SelectPieceIndex() {
    return this.SelectIndex;
  }
  SelectPiece(t) {
    if (this.SelectIndex !== t) {
      if (!this.ChessBoard.CheckPieceSelect(t, this.SelfCamp)) {
        return !(this.SelectIndex = -1);
      }
      this.SelectIndex = t;
    }
    return true;
  }
  ResetSelectPiece(t) {
    return this.SelectIndex === t && (this.SelectIndex = -1, true);
  }
  GetSelectNeighbor() {
    return this.ChessBoard.GetNoneNeighbors(this.SelectIndex);
  }
  RegisterEvent(t) {
    this.OnPieceMove = t;
  }
  MovePiece(t) {
    if (this.ChessBoard?.CheckPieceMove(this.SelectIndex, t, this.SelfCamp) && this.ChessBoard?.OnPieceMove(this.SelectIndex, t)) {
      if (this.OnPieceMove) {
        this.OnPieceMove(this.SelectIndex, t);
      }
      this.SelectIndex = -1;
      return true;
    } else {
      return !(this.SelectIndex = -1);
    }
  }
  OnResetGame() {
    this.OnStartGame();
  }
}
exports.TicTacToeController = TicTacToeController;
//# sourceMappingURL=TicTacToeController.js.map