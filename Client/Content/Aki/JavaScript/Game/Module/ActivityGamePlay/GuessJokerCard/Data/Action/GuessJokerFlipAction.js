"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerFlipAction = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerFlipAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e, s) {
    super();
    this.nY1 = 0;
    this.G$f = false;
    this.nY1 = e;
    this.G$f = s;
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e = e && e.GetCardItemById(this.nY1)) {
      e.CardFlip(this.G$f);
    }
    this.Done = true;
  }
}
exports.GuessJokerFlipAction = GuessJokerFlipAction;
//# sourceMappingURL=GuessJokerFlipAction.js.map