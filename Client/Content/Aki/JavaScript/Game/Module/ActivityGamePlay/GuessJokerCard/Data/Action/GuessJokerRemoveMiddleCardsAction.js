"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerRemoveMiddleCardsAction = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerRemoveMiddleCardsAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e = GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerRemoveCardTime")) {
    super();
    this.Duration = e;
  }
  OnStart() {
    const e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      e.RemoveCardFromMiddleArea(() => {
        if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.CheckBlankCardDisable()) {
          e.SetBlankCardDisable();
        }
        this.Done = true;
      });
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerRemoveMiddleCardsAction = GuessJokerRemoveMiddleCardsAction;
//# sourceMappingURL=GuessJokerRemoveMiddleCardsAction.js.map