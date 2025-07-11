"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemForging = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemForging extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return (await UiManager_1.UiManager.OpenViewAsync("ForgingRootView")) !== undefined;
  }
  GetViewName(e) {
    return "ForgingRootView";
  }
}
exports.OpenSystemForging = OpenSystemForging;
//# sourceMappingURL=OpenSystemForging.js.map