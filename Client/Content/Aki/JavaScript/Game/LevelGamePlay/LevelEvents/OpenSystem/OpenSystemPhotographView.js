"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemPhotographView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPhotographView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    ControllerHolder_1.ControllerHolder.PhotographController.PhotoTargets = undefined;
    if (e && e.PhotographConfig) {
      ControllerHolder_1.ControllerHolder.PhotographController.PhotoTargets = e.PhotographConfig.PhotoTargets;
      return await ControllerHolder_1.ControllerHolder.PhotographController.TryOpenTogetherPhotograph();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 45, "打开系统界面：拍照 但找不到对应的目标");
      }
      return false;
    }
  }
  GetViewName(e) {
    return "PhotographView";
  }
}
exports.OpenSystemPhotographView = OpenSystemPhotographView;
//# sourceMappingURL=OpenSystemPhotographView.js.map