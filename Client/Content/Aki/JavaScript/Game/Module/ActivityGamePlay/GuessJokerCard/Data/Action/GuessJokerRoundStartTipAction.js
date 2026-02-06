"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerRoundStartTipAction = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerRoundStartTipAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e) {
    super();
    this.ZRf = 1;
    this.ZRf = e;
  }
  OnStart() {
    var e;
    if (!ModelManager_1.ModelManager.GuessJokerGamePlayModel?.HasShownRoundStartTip(this.ZRf) && (e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView())) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.MarkRoundStartTipShown(this.ZRf);
      e.ShowPlayerRoundStartTip(this.ZRf, () => {
        this.Done = true;
      });
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerRoundStartTipAction = GuessJokerRoundStartTipAction;
//# sourceMappingURL=GuessJokerRoundStartTipAction.js.map