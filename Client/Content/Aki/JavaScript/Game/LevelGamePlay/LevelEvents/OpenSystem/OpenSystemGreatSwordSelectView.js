"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemGreatSwordSelectView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemGreatSwordSelectView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, t) {
    return "GreatSwordLevelSelectView";
  }
  async ExecuteOpenView(e, t) {
    if (e) {
      await UiManager_1.UiManager.OpenViewAsync("GreatSwordLevelSelectView", true);
    }
    return true;
  }
}
exports.OpenSystemGreatSwordSelectView = OpenSystemGreatSwordSelectView;
//# sourceMappingURL=OpenSystemGreatSwordSelectView.js.map