"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaMapUnlockDropDownItem = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaMapUnlockDropDownItem extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaMapUnlock";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaMapUnlockUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel?.GetMapUnlockRedDotById(e) ?? false;
  }
}
exports.RedDotPhantomArenaMapUnlockDropDownItem = RedDotPhantomArenaMapUnlockDropDownItem;
//# sourceMappingURL=RedDotPhantomArenaMapUnlockDropDownItem.js.map