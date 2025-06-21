"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleSelectionItem = void 0;
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class PhantomArenaRoleSelectionItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, o, r) {
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e.CardRoleId).RoleConfigId,
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a),
      a = {
        Type: 2,
        Data: e,
        ItemConfigId: a,
        SkinId: t.SkinId,
        ElementId: t.ElementId,
        IsLockVisible: !ModelManager_1.ModelManager.PhantomArenaModel.IsRoleUnlock(e.CardRoleId),
        IsRedDotVisible: e.CanReceived
      };
    this.Apply(a), this.SetSelected(o)
  }
  OnSelected(e) {
    this.SetSelected(!0, !0)
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0)
  }
  GetKey(e, o) {
    return e.CardRoleId
  }
}
exports.PhantomArenaRoleSelectionItem = PhantomArenaRoleSelectionItem;
//# sourceMappingURL=PhantomArenaRoleSelectionItem.js.map