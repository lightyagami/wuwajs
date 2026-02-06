"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationRoleDragItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationRoleDragItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.SpineSkeletonAnimationComponent], [3, UE.UIItem]];
  }
  RefreshRoleIcon(e, a) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    a = a ? ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(a) : undefined;
    if (e) {
      const n = this.GetItem(3);
      const o = this.GetSpine(2);
      var i = (a || e).FormationSpineAtlas;
      var e = (a || e).FormationSpineSkeletonData;
      const r = a ? a.SpineParam : [0, 0, 1];
      this.SetSpineAssetByPath(i, e, o).then(() => {
        n.SetAlpha(1);
        o.SetAnimation(0, "idle", true);
        n.SetAnchorOffsetX(r[0]);
        n.SetAnchorOffsetY(r[1]);
        n.SetUIItemScale(new UE.Vector(r[2], r[2], r[2]));
      });
    }
  }
}
exports.FormationRoleDragItem = FormationRoleDragItem;
//# sourceMappingURL=FormationRoleDragItem.js.map