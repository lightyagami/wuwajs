"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanoramicInputLayer = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const InputEnums_1 = require("../../../../../../Input/InputEnums");
const InputLayer_1 = require("../../../../../../Input/InputLayer");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
class PanoramicInputLayer extends InputLayer_1.InputLayer {
  Init() {}
  GetLayerType() {
    return 10;
  }
  HandleRelease(e, n) {
    if (e === InputEnums_1.EInputAction.锁定目标) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Panoramic", 45, "[环视] HandleRelease1 锁定目标 HandleRelease");
      }
      return PanoramicInputLayer.GetSwallowCommand();
    }
  }
  HandlePress(e, n) {
    if (e === InputEnums_1.EInputAction.锁定目标) {
      ControllerHolder_1.ControllerHolder.PanoramicController.InteractPawn();
      return PanoramicInputLayer.GetSwallowCommand();
    }
  }
  HandleHold(e, n) {
    if (e === InputEnums_1.EInputAction.锁定目标) {
      return PanoramicInputLayer.GetSwallowCommand();
    }
  }
  CheckBlockDispatchEvent(e) {
    let n = false;
    if (e === InputEnums_1.EInputAction.锁定目标) {
      n = true;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Panoramic", 45, "[环视] 忽略DispatchEvent事件", ["action", e]);
    }
    return n;
  }
}
exports.PanoramicInputLayer = PanoramicInputLayer;
//# sourceMappingURL=PanoramicInputLayer.js.map