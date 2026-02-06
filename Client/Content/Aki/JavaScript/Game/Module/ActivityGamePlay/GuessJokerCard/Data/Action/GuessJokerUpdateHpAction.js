"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerUpdateHpAction = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerUpdateHpAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e, s) {
    super();
    this.PlayerType = 1;
    this.Hp = 0;
    this.PlayerType = e;
    this.Hp = s;
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      e.UpdateHp(this.PlayerType, () => {
        this.Done = true;
      });
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerUpdateHpAction = GuessJokerUpdateHpAction;
//# sourceMappingURL=GuessJokerUpdateHpAction.js.map