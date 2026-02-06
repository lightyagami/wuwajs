"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorRoleGridItem = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class SpringManorRoleGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.dFe = 0;
  }
  OnRefresh(e, t, o) {
    var r;
    var i = e.GetDataId();
    if (i !== this.dFe) {
      this.dFe = i;
      r = e.IsTrialRole();
      e = {
        Type: 2,
        Data: e,
        ItemConfigId: i,
        SkinId: e.GetRoleConfig().SkinId,
        BottomText: e.GetName(),
        IsTrialRoleVisible: r,
        IsDisable: ModelManager_1.ModelManager.SpringManorModel.IsRoleDead(i)
      };
      this.SetUseFixedAsync(true);
      this.Apply(e);
      r = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetCurrentRoleConfigId;
      this.SetCurTagIcon(r === i);
      this.SetToggleState(t, false, true);
    }
  }
  OnDeselected(e) {
    this.SetToggleState(false, false);
  }
  SetToggleState(e, t, o = false) {
    this.GetItemGridExtendToggle()?.SetToggleStateForce(e ? 1 : 0, t, false, o);
  }
}
exports.SpringManorRoleGridItem = SpringManorRoleGridItem;
//# sourceMappingURL=SpringManorRoleGridItem.js.map