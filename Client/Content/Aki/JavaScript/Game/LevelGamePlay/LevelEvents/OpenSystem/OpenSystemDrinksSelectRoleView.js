"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemDrinksSelectRoleView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemDrinksSelectRoleView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    await UiManager_1.UiManager.OpenViewAsync("DrinksSelectRoleView", 2);
    return true;
  }
  GetViewName(e, s) {}
}
exports.OpenSystemDrinksSelectRoleView = OpenSystemDrinksSelectRoleView;
//# sourceMappingURL=OpenSystemDrinksSelectRoleView.js.map