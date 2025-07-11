"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaGym = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaGym extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaActivity";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate];
  }
  IsMultiple() {
    return false;
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetGymRedDot();
  }
}
exports.RedDotPhantomArenaGym = RedDotPhantomArenaGym;
//# sourceMappingURL=RedDotPhantomArenaGym.js.map