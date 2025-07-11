"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionUiGame = exports.unionToUnionUiGame = exports.UnionUiGame = undefined;
const broken_rock_js_1 = require("../fb-action/broken-rock.js");
const cipher_gameplay_js_1 = require("../fb-action/cipher-gameplay.js");
const daoling_authentication_js_1 = require("../fb-action/daoling-authentication.js");
const fishing_roulette_js_1 = require("../fb-action/fishing-roulette.js");
const life_point_js_1 = require("../fb-action/life-point.js");
const morse_code_js_1 = require("../fb-action/morse-code.js");
const renju_chess_js_1 = require("../fb-action/renju-chess.js");
const signal_break_gameplay_js_1 = require("../fb-action/signal-break-gameplay.js");
const signal_device_js_1 = require("../fb-action/signal-device.js");
const signal_device2_js_1 = require("../fb-action/signal-device2.js");
const sundial_puzzle_gameplay_js_1 = require("../fb-action/sundial-puzzle-gameplay.js");
var UnionUiGame;
function unionToUnionUiGame(e, n) {
  switch (UnionUiGame[e]) {
    case "NONE":
      return;
    case "BrokenRock":
      return n(new broken_rock_js_1.BrokenRock());
    case "CipherGameplay":
      return n(new cipher_gameplay_js_1.CipherGameplay());
    case "DaolingAuthentication":
      return n(new daoling_authentication_js_1.DaolingAuthentication());
    case "FishingRoulette":
      return n(new fishing_roulette_js_1.FishingRoulette());
    case "LifePoint":
      return n(new life_point_js_1.LifePoint());
    case "MorseCode":
      return n(new morse_code_js_1.MorseCode());
    case "RenjuChess":
      return n(new renju_chess_js_1.RenjuChess());
    case "SignalBreakGameplay":
      return n(new signal_break_gameplay_js_1.SignalBreakGameplay());
    case "SignalDevice":
      return n(new signal_device_js_1.SignalDevice());
    case "SignalDevice2":
      return n(new signal_device2_js_1.SignalDevice2());
    case "SundialPuzzleGameplay":
      return n(new sundial_puzzle_gameplay_js_1.SundialPuzzleGameplay());
    default:
      return;
  }
}
function unionListToUnionUiGame(e, n, i) {
  switch (UnionUiGame[e]) {
    case "NONE":
      return;
    case "BrokenRock":
      return n(i, new broken_rock_js_1.BrokenRock());
    case "CipherGameplay":
      return n(i, new cipher_gameplay_js_1.CipherGameplay());
    case "DaolingAuthentication":
      return n(i, new daoling_authentication_js_1.DaolingAuthentication());
    case "FishingRoulette":
      return n(i, new fishing_roulette_js_1.FishingRoulette());
    case "LifePoint":
      return n(i, new life_point_js_1.LifePoint());
    case "MorseCode":
      return n(i, new morse_code_js_1.MorseCode());
    case "RenjuChess":
      return n(i, new renju_chess_js_1.RenjuChess());
    case "SignalBreakGameplay":
      return n(i, new signal_break_gameplay_js_1.SignalBreakGameplay());
    case "SignalDevice":
      return n(i, new signal_device_js_1.SignalDevice());
    case "SignalDevice2":
      return n(i, new signal_device2_js_1.SignalDevice2());
    case "SundialPuzzleGameplay":
      return n(i, new sundial_puzzle_gameplay_js_1.SundialPuzzleGameplay());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.BrokenRock = 1] = "BrokenRock";
  e[e.CipherGameplay = 2] = "CipherGameplay";
  e[e.DaolingAuthentication = 3] = "DaolingAuthentication";
  e[e.FishingRoulette = 4] = "FishingRoulette";
  e[e.LifePoint = 5] = "LifePoint";
  e[e.MorseCode = 6] = "MorseCode";
  e[e.RenjuChess = 7] = "RenjuChess";
  e[e.SignalBreakGameplay = 8] = "SignalBreakGameplay";
  e[e.SignalDevice = 9] = "SignalDevice";
  e[e.SignalDevice2 = 10] = "SignalDevice2";
  e[e.SundialPuzzleGameplay = 11] = "SundialPuzzleGameplay";
})(UnionUiGame = exports.UnionUiGame ||= {});
exports.unionToUnionUiGame = unionToUnionUiGame;
exports.unionListToUnionUiGame = unionListToUnionUiGame; //# sourceMappingURL=union-ui-game.js.map