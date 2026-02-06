"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemDrinksGamePlayView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemDrinksGamePlayView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    await UiManager_1.UiManager.OpenViewAsync("DrinksGameplayView");
    return true;
  }
  GetViewName(e, s) {}
}
exports.OpenSystemDrinksGamePlayView = OpenSystemDrinksGamePlayView;
//# sourceMappingURL=OpenSystemDrinksGamePlayView.js.map