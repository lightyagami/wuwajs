"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalTaskTabRedDot = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  BeginnerCarnivalController_1 = require("../../../Module/Activity/ActivityContent/BeginnerCarnival/BeginnerCarnivalController"),
  RedDotBase_1 = require("../../RedDotBase");
class BeginnerCarnivalTaskTabRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshBeginnerCarnivalTask]
  }
  OnCheck(e) {
    var n = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    return !!n && n.GetTabRedDotShow(e)
  }
}
exports.BeginnerCarnivalTaskTabRedDot = BeginnerCarnivalTaskTabRedDot;
//# sourceMappingURL=BeginnerCarnivalTaskTabRedDot.js.map