"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemTakePhotoView = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTakePhotoView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    var o = new CustomPromise_1.CustomPromise();
    ControllerHolder_1.ControllerHolder.PhotographController.CameraCaptureType = 1;
    if (!UiManager_1.UiManager.IsViewOpen("PhotographView")) {
      if (ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(1)) {
        TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("PhotographView");
        o.SetResult(true);
      }
    }
    await o.Promise;
    return true;
  }
  GetViewName(e) {
    return "PhotographView";
  }
}
exports.OpenSystemTakePhotoView = OpenSystemTakePhotoView;
//# sourceMappingURL=OpenSystemTakePhotoView.js.map