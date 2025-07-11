"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaShopUpdate = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaShopUpdate extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaLimitReward";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaShopOpen, EventDefine_1.EEventName.RefreshGoodsList];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomArenaModel.CheckShopRedDot();
  }
}
exports.RedDotPhantomArenaShopUpdate = RedDotPhantomArenaShopUpdate;
//# sourceMappingURL=RedDotPhantomArenaShopUpdate.js.map