"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomInteractUnlock = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const PhantomInteractModel_1 = require("../../../Module/Phantom/PhantomInteract/PhantomInteractModel");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomInteractUnlock extends RedDotBase_1.RedDotBase {
  OnCheck(e) {
    return PhantomInteractModel_1.PhantomInteractModel.CheckPhantomInteractUnlockRedDot(e);
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.PhantomInteractNewUnlock];
  }
}
exports.RedDotPhantomInteractUnlock = RedDotPhantomInteractUnlock;
//# sourceMappingURL=RedDotPhantomInteractUnlock.js.map