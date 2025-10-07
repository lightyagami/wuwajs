"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevMediumItemGrid = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RoleDevMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.dFe = 0;
  }
  OnRefresh(e, t, o) {
    var i = e.GetDataId();
    this.dFe = i;
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(i, {
      ParamType: 0,
      OnlyMyRole: true
    });
    var r = r !== undefined;
    var l = ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId === i;
    var i = ModelManager_1.ModelManager.RoleModel.IsRoleOwned(i);
    let a = {};
    a = i ? {
      Type: 2,
      Data: e,
      ItemConfigId: e.GetRoleId(),
      SkinId: e.GetRoleSkinId(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [e.GetLevelData().GetLevel()],
      IsInTeam: r,
      IsRoleDevelopTagMark: l,
      ElementId: e.GetRoleConfig().ElementId,
      IsTrialRoleVisible: false
    } : (i = e.GetRoleConfig(), {
      Type: 2,
      Data: e,
      ItemConfigId: e.GetRoleId(),
      SkinId: e.GetRoleSkinId(),
      BottomText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name),
      IsInTeam: r,
      ElementId: e.GetRoleConfig().ElementId,
      IsTrialRoleVisible: false,
      IsShowLock: true,
      IsDisable: true
    });
    this.Apply(a);
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  GetKey() {
    return this.dFe;
  }
}
exports.RoleDevMediumItemGrid = RoleDevMediumItemGrid;
//# sourceMappingURL=RoleDevMediumItemGrid.js.map