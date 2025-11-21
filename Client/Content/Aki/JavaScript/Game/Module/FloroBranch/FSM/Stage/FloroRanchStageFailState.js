"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchStageFailState = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchController_1 = require("../../FloroRanchController");
const FloroRanchStateBase_1 = require("../FloroRanchStateBase");
class FloroRanchStageFailState extends FloroRanchStateBase_1.FloroRanchStateBase {
  OnEnter() {
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    FloroRanchController_1.FloroRanchController.SendFloroRanchSettleDataRequest(e.Id, a, e => {
      if (e?.yQu) {
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchDungeonFailSettleView", e);
      } else {
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.ExitGame(true);
      }
    });
  }
}
exports.FloroRanchStageFailState = FloroRanchStageFailState;
//# sourceMappingURL=FloroRanchStageFailState.js.map