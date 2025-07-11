"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemCook = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemCook extends OpenSystemBase_1.OpenSystemBase {
  constructor() {
    super(...arguments);
    this.F0l = new Map([[0, "CookRootView"], [1, "CookMechanismRootView"]]);
  }
  async ExecuteOpenView(e, o) {
    e = this.F0l.get(e.BoardId);
    return e !== undefined && (await UiManager_1.UiManager.OpenViewAsync(e)) !== undefined;
  }
  GetViewName(e) {
    return this.F0l.get(e.BoardId) ?? "CookRootView";
  }
}
exports.OpenSystemCook = OpenSystemCook;
//# sourceMappingURL=OpenSystemCook.js.map