"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGameExitState = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const BlackScreenController_1 = require("../../../BlackScreen/BlackScreenController");
const FloroRanchEntityActionSystem_1 = require("../../Entity/FloroRanchEntityActionSystem");
const FloroRanchController_1 = require("../../FloroRanchController");
const FloroRanchStateBase_1 = require("../FloroRanchStateBase");
class FloroRanchGameExitState extends FloroRanchStateBase_1.FloroRanchStateBase {
  OnEnter() {
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.NeedReStart) {
      BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "FloroRanch Restart").then(() => {
        this.$Oe();
      });
    } else {
      this.$Oe();
    }
  }
  $Oe() {
    const e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.ActivityId;
    const r = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    const o = [...ModelManager_1.ModelManager.FloroRanchGamePlayModel.Races];
    const a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SkillId;
    const n = ModelManager_1.ModelManager.FloroRanchGamePlayModel.NeedReStart;
    const t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.NeedSettle;
    UiManager_1.UiManager.CloseView("FloroRanchGamePlayView", () => {
      FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.Exit();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.GameEnd();
      if (n) {
        FloroRanchController_1.FloroRanchController.SendFloroRanchReStartRequest(e, r, o, a).then(() => {
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "FloroRanch Restart");
        });
      } else if (t) {
        FloroRanchController_1.FloroRanchController.SendFloroRanchSettleRequest(e, r, true, () => {});
      }
    });
  }
}
exports.FloroRanchGameExitState = FloroRanchGameExitState;
//# sourceMappingURL=FloroRanchGameExitState.js.map