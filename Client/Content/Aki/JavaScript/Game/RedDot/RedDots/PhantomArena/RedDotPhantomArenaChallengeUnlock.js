"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaChallengeUnlock = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaChallengeUnlock extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeUnlockRedDotById(e);
  }
}
exports.RedDotPhantomArenaChallengeUnlock = RedDotPhantomArenaChallengeUnlock;
//# sourceMappingURL=RedDotPhantomArenaChallengeUnlock.js.map