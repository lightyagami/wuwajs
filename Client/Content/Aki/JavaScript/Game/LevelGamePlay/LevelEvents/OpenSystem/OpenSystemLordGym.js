"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemLordGym = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemLordGym extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e.BoardId) {
      return false;
    }
    let t = undefined;
    switch (r.Type) {
      case 5:
        t = r.TriggerEntityId;
        break;
      case 1:
        t = r.EntityId;
    }
    return ControllerHolder_1.ControllerHolder.LordGymController.OpenLordGymEntrance(e.BoardId, t);
  }
  GetViewName(e) {
    return "LordGymEntranceView";
  }
}
exports.OpenSystemLordGym = OpenSystemLordGym;
//# sourceMappingURL=OpenSystemLordGym.js.map