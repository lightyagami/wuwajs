"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemShower = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemShower extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, r) {
    return "ShowerInviteView";
  }
  async ExecuteOpenView(e, r) {
    var t;
    return !!e.Seats && !!(e.Seats.length > 0) && ((t = []).push(...e.Seats), (await UiManager_1.UiManager.OpenViewAsync("ShowerInviteView", t)) !== undefined);
  }
}
exports.OpenSystemShower = OpenSystemShower;
//# sourceMappingURL=OpenSystemShower.js.map