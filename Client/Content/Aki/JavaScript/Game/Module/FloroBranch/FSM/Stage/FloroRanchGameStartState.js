"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGameStartState = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchStateBase_1 = require("../FloroRanchStateBase");
class FloroRanchGameStartState extends FloroRanchStateBase_1.FloroRanchStateBase {
  OnEnter() {
    UiManager_1.UiManager.OpenView("FloroRanchGamePlayView", undefined, () => {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsOver) {
        this.StageFsm.ChangeState(4);
      } else {
        this.StageFsm.ChangeState(2);
      }
    });
  }
}
exports.FloroRanchGameStartState = FloroRanchGameStartState;
//# sourceMappingURL=FloroRanchGameStartState.js.map