"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotPhantomArenaGym = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaGym extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaActivity"
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate]
  }
  IsMultiple() {
    return !1
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetGymRedDot()
  }
}
exports.RedDotPhantomArenaGym = RedDotPhantomArenaGym;
//# sourceMappingURL=RedDotPhantomArenaGym.js.map