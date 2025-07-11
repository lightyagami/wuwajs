"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemSynthetic = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemSynthetic extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return (await UiManager_1.UiManager.OpenViewAsync("ComposeCarryOnView")) !== undefined;
  }
  GetViewName(e) {
    return "ComposeCarryOnView";
  }
}
exports.OpenSystemSynthetic = OpenSystemSynthetic;
//# sourceMappingURL=OpenSystemSynthetic.js.map