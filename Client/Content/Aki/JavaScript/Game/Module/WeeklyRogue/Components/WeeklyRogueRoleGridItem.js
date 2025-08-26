"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueRoleGridItem = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class WeeklyRogueRoleGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, t) {
    var r = e.GetDataId();
    var d = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(r);
    var d = {
      Type: 2,
      ItemConfigId: r,
      SkinId: e.GetRoleSkinId(),
      BottomTextId: e.IsTrialRole() ? "WeRougeFormationMissingRole" : "Text_LevelShow_Text",
      BottomTextParameter: e.IsTrialRole() ? undefined : [e.GetLevelData().GetLevel()],
      Index: d > 0 ? d : undefined,
      ElementId: e.GetRoleConfig().ElementId,
      IsDisable: e.IsTrialRole(),
      Data: e
    };
    this.Apply(d);
    var e = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(r);
    this.SetSelected(e, true);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  OnForceSelected(e) {
    this.SetSelected(e, true);
  }
  GetKey(e, o) {
    return e.GetDataId();
  }
}
exports.WeeklyRogueRoleGridItem = WeeklyRogueRoleGridItem;
//# sourceMappingURL=WeeklyRogueRoleGridItem.js.map