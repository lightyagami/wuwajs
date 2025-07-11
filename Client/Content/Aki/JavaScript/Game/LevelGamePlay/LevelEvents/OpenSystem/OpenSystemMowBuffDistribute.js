"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemMowBuffDistribute = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMowBuffDistribute extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    await UiManager_1.UiManager.OpenViewAsync("BossRushBuffInGameView");
    return true;
  }
  GetViewName(e) {
    return "BossRushBuffInGameView";
  }
}
exports.OpenSystemMowBuffDistribute = OpenSystemMowBuffDistribute;
//# sourceMappingURL=OpenSystemMowBuffDistribute.js.map