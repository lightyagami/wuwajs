"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleSelectionItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class PhantomArenaRoleSelectionItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, o, r) {
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e.CardRoleId).RoleConfigId;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a);
    var a = {
      Type: 2,
      Data: e,
      ItemConfigId: a,
      SkinId: t.SkinId,
      ElementId: t.ElementId,
      IsLockVisible: !ModelManager_1.ModelManager.PhantomArenaModel.IsRoleUnlock(e.CardRoleId),
      IsRedDotVisible: e.CanReceived
    };
    this.Apply(a);
    this.SetSelected(o);
  }
  OnSelected(e) {
    this.SetSelected(true, true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  GetKey(e, o) {
    return e.CardRoleId;
  }
}
exports.PhantomArenaRoleSelectionItem = PhantomArenaRoleSelectionItem;
//# sourceMappingURL=PhantomArenaRoleSelectionItem.js.map