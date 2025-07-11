"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicTacToeGame = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TicTacToeAIController_1 = require("./TicTacToeAIController");
const TicTacToeBoard_1 = require("./TicTacToeBoard");
const TicTacToeController_1 = require("./TicTacToeController");
class TicTacToeGame {
  constructor() {
    this.Controller = new TicTacToeController_1.TicTacToeController();
    this.AiController = new TicTacToeAIController_1.TicTacToeAiController();
    this.Board = new TicTacToeBoard_1.TicTacToeBoard();
    this.WinLineCount = 3;
    this.CampLoop = [1, 2];
    this.PlayerCamp = 1;
    this.AiCamp = 2;
    this.CurrentCamp = this.CampLoop[0];
    this.AutoNextRound = false;
    this.QOa = 0;
    this.L5a = true;
    this.KOa = 0;
    this.OnGameOverCallback = t => {
      this.OnGameOver(t);
    };
    this.OnEndRoundCallback = () => {
      this.OnEndRound();
    };
  }
  Init(t, i) {
    this.Board.Init(this.WinLineCount, this.OnGameOverCallback, this.OnEndRoundCallback);
    this.Controller.Init(this.Board, this.PlayerCamp);
    this.AiController.InitAi(this.Board, this.AiCamp, this.PlayerCamp);
    this.Controller.RegisterEvent(i);
    this.AiController.RegisterEvent(i);
    this.SetOffensive(t);
  }
  RefreshAiEnable(t) {
    if (this.L5a !== t) {
      if (!this.L5a && this.CurrentCamp === this.AiCamp) {
        this.StartRound();
      }
      this.L5a = t;
    }
  }
  StartRound() {
    if (this.CurrentCamp === this.PlayerCamp) {
      this.Controller.OnStartRound();
    } else if (this.CurrentCamp === this.AiCamp) {
      if (this.L5a) {
        this.AiController.OnStartRound();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 36, "[TicTacToe]当前回合阵营错误");
    }
  }
  OnIndexSelect(t) {
    if (this.Controller.IsSelecting) {
      return !!this.Controller.ResetSelectPiece(t) || this.Controller.MovePiece(t);
    } else {
      return this.Controller.SelectPiece(t);
    }
  }
  OnIndexMove(t, i) {
    this.Controller.SelectPiece(t);
    return !!this.Controller.IsSelecting && this.Controller.MovePiece(i);
  }
  NextRound() {
    this.QOa++;
    var t = this.CampLoop.length;
    this.CurrentCamp = this.CampLoop[this.QOa % t];
    this.StartRound();
  }
  SetCurrentRound(t) {
    this.QOa = t;
    t = this.CampLoop.length;
    this.CurrentCamp = this.CampLoop[this.QOa % t];
    this.KOa = 0;
    this.StartRound();
  }
  get IsPlayerRound() {
    return this.CurrentCamp === this.PlayerCamp;
  }
  get PlayerWin() {
    return this.KOa === this.PlayerCamp;
  }
  get AiWin() {
    return this.KOa === this.AiCamp;
  }
  get IsFinish() {
    return this.KOa !== 0;
  }
  StartGame() {
    this.QOa = 0;
    this.CurrentCamp = this.CampLoop[0];
    this.KOa = 0;
    this.StartRound();
  }
  ResetGame() {
    this.Controller.OnResetGame();
    this.AiController.OnResetGame();
    this.Board.ResetGame();
    this.StartGame();
  }
  OnGameOver(t) {
    this.KOa = t;
  }
  OnEndRound() {
    if (this.AutoNextRound) {
      this.NextRound();
    }
  }
  RefreshAiInfo(t) {
    this.AiController.RefreshAiInfo(t);
  }
  InitBoardInfo(t, i, s = false) {
    var h = new Array();
    h.length = this.Board.BoardLength * this.Board.BoardLength;
    for (let t = 0; t < h.length; t++) {
      h[t] = 0;
    }
    for (const e of t) {
      if (e < h.length) {
        h[e] = this.AiCamp;
      }
    }
    for (const r of i) {
      if (r < h.length) {
        h[r] = this.PlayerCamp;
      }
    }
    if (s) {
      this.Board.InitOriginBoardInfo(h);
    } else {
      this.Board.InitBoardInfo(h);
    }
  }
  GetPlayerPieces() {
    var i = new Array();
    var s = new Array();
    this.Board.GetBoardInfo(s);
    for (let t = 0; t < s.length; t++) {
      if (s[t] === this.PlayerCamp) {
        i.push(t);
      }
    }
    return i;
  }
  SetOffensive(t) {
    this.CampLoop = t ? [this.AiCamp, this.PlayerCamp] : [this.PlayerCamp, this.AiCamp];
  }
  GetNoneNeighbors(t) {
    return this.Board.GetNoneNeighbors(t);
  }
  CheckCanMove(t) {
    return this.Board.CheckBoardValue(t, 0);
  }
  CheckIsPlayerPiece(t) {
    return this.Board.CheckBoardValue(t, this.PlayerCamp);
  }
  CheckIsCenter(t) {
    return this.Board.CenterIndex === t;
  }
  CheckGameOver(t) {
    return this.Board.CheckGameOver(t);
  }
}
exports.TicTacToeGame = TicTacToeGame;
//# sourceMappingURL=TicTacToeGame.js.map