"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSettleFailView = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoginDefine_1 = require("../../../Login/Data/LoginDefine");
const GuessJokerSettleViewBase_1 = require("./GuessJokerSettleViewBase");
class GuessJokerSettleFailView extends GuessJokerSettleViewBase_1.GuessJokerSettleViewBase {
  GetWinnerName() {
    return ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerNameByType(1);
  }
  GetNpcPokerState() {
    return 9;
  }
  GetEmojiTexturePath() {
    var e;
    var r = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
    var r = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(r);
    if (r === undefined || (e = ModelManager_1.ModelManager.WorldLevelModel.Sex === LoginDefine_1.ELoginSex.Girl ? 1 : 0, (r = r.FailEmojiPath[e]) === undefined)) {
      return "";
    } else {
      return r;
    }
  }
  GetDescText() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
    var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(e);
    if (e === undefined) {
      return "";
    }
    var r;
    var a;
    var e = e.FailText;
    var t = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
    let n = 0;
    let o = "";
    for ([r, a] of Object.entries(e)) {
      if (Number(r) >= t && (n === 0 || Number(r) < n)) {
        n = Number(r);
        o = a;
      }
    }
    if (n === 0) {
      return e.get(0);
    } else {
      return o;
    }
  }
  GetViewName() {
    return "GuessJokerSettleFailView";
  }
}
exports.GuessJokerSettleFailView = GuessJokerSettleFailView;
//# sourceMappingURL=GuessJokerSettleFailView.js.map