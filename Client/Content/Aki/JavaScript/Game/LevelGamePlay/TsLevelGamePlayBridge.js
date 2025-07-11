"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
class TsLevelGamePlayBridge extends UE.Object {
  Constructor() {}
  UpdateGamePlayTimerBridge(e, r) {}
  GetDragonPoolState(e) {
    return ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(e);
  }
  ApplyScanEffect(e) {
    ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleScanResponse(e);
  }
  ClearAllScanEffects() {
    ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleClearAllScanEffect();
  }
}
exports.default = TsLevelGamePlayBridge;
//# sourceMappingURL=TsLevelGamePlayBridge.js.map