"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchStageSuccessState = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchController_1 = require("../../FloroRanchController");
const FloroRanchStateBase_1 = require("../FloroRanchStateBase");
class FloroRanchStageSuccessState extends FloroRanchStateBase_1.FloroRanchStateBase {
  OnEnter() {
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var o = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    FloroRanchController_1.FloroRanchController.SendFloroRanchSettleDataRequest(e.Id, o, e => {
      if (e?.yQu) {
        if (e.H4u.j1u) {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchDungeonEndlessSettleView", e);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchDungeonSuccessSettleView", e);
        }
      } else {
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.ExitGame(true);
      }
    });
  }
}
exports.FloroRanchStageSuccessState = FloroRanchStageSuccessState;
//# sourceMappingURL=FloroRanchStageSuccessState.js.map