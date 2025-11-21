"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryGamepadUtil = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
class HonamiStoryGamepadUtil {
  static HideAllTips() {
    var a = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView");
    if (a) {
      a.HideAllTips();
    }
    var a = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView");
    if (a) {
      a.HideAllTips();
    }
  }
  static EnterMask() {
    var a = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView");
    if (a) {
      a.OnEnterGamepadMask();
    }
    var a = UiManager_1.UiManager.GetViewByName("HonamiStoryPickUpBackpackView");
    if (a) {
      a.OnEnterGamepadMask();
    }
  }
  static ExitMask() {
    var a = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView");
    if (a) {
      a.OnExitGamepadMask();
    }
    var a = UiManager_1.UiManager.GetViewByName("HonamiStoryPickUpBackpackView");
    if (a) {
      a.OnExitGamepadMask();
    }
  }
}
exports.HonamiStoryGamepadUtil = HonamiStoryGamepadUtil;
//# sourceMappingURL=HonamiStoryGamepadUtil.js.map