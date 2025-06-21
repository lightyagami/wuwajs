"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpenSystemShower = void 0;
const UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemShower extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, r) {
    return "ShowerInviteView"
  }
  async ExecuteOpenView(e, r) {
    var t;
    return !!(e.Seats && 0 < e.Seats.length) && ((t = []).push(...e.Seats), void 0 !== await UiManager_1.UiManager.OpenViewAsync("ShowerInviteView", t))
  }
}
exports.OpenSystemShower = OpenSystemShower;
//# sourceMappingURL=OpenSystemShower.js.map