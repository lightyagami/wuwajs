"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomInteractEditEntry = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomInteractEditEntry extends RedDotBase_1.RedDotBase {
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomInteractModel.CheckAnyPhantomInteractUnlockRedDot();
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.PhantomInteractNewUnlock];
  }
  IsAllEventParamAsUId() {
    return false;
  }
}
exports.RedDotPhantomInteractEditEntry = RedDotPhantomInteractEditEntry;
//# sourceMappingURL=RedDotPhantomInteractEditEntry.js.map