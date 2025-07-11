"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemHiddenBossWindow = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHiddenBossWindow extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    if (e) {
      e = {
        UiId: e.BoardId
      };
      await UiManager_1.UiManager.OpenViewAsync("HiddenBossWindow", e);
    }
    return true;
  }
  GetViewName(e, s) {
    return "HiddenBossWindow";
  }
}
exports.OpenSystemHiddenBossWindow = OpenSystemHiddenBossWindow;
//# sourceMappingURL=OpenSystemHiddenBossWindow.js.map