"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleBackpackView = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../../../Module/HonamiStory/HonamiStoryUtil");
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleBackpackView extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  get ViewName() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
      return "HonamiStoryBackpackView";
    } else {
      return this.DefaultViewName;
    }
  }
  OnOpenViewImplement() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10102)) {
        ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(10102);
      }
    } else {
      super.OnOpenViewImplement();
    }
  }
}
exports.ViewHotKeyHandleBackpackView = ViewHotKeyHandleBackpackView;
//# sourceMappingURL=ViewHotKeyHandleBackpackView.js.map