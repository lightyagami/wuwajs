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
    if (e && e.PhotographConfig) {
      return await ControllerHolder_1.ControllerHolder.PhotographController.TryOpenTogetherPhotograph(e);
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