"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSelectionMediumItemGrid = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RoleDataBase_1 = require("../RoleData/RoleDataBase");
class RoleSelectionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.f1a = false;
    this.dFe = 0;
  }
  SetNeedShowTrial(e) {
    this.f1a = false;
  }
  OnRefresh(e, t, i) {
    var o = e.GetDataId();
    this.dFe = o;
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(o, {
      ParamType: 0
    });
    var a = a !== undefined;
    var r = ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId === o;
    var o = ModelManager_1.ModelManager.RoleModel.IsRoleOwned(o);
    let s = {};
    s = o ? {
      Type: 2,
      Data: e,
      ItemConfigId: e.GetRoleId(),
      SkinId: e.GetRoleSkinId(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [e.GetLevelData().GetLevel()],
      IsInTeam: a,
      IsRoleDevelopTagMark: r,
      ElementId: e.GetRoleConfig().ElementId,
      IsTrialRoleVisible: e.IsTrialRole() && this.f1a
    } : (o = e.GetRoleConfig(), {
      Type: 2,
      Data: e,
      ItemConfigId: e.GetRoleId(),
      SkinId: e.GetRoleSkinId(),
      BottomText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Name),
      IsInTeam: a,
      ElementId: e.GetRoleConfig().ElementId,
      IsTrialRoleVisible: e.IsTrialRole() && this.f1a,
      IsShowLock: true,
      IsDisable: true
    });
    this.Apply(s);
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
    this.SetNewVisible(false);
    if (this.Data instanceof RoleDataBase_1.RoleDataBase) {
      this.Data.TryRemoveNewFlag();
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  GetKey() {
    return this.dFe;
  }
}
exports.RoleSelectionMediumItemGrid = RoleSelectionMediumItemGrid;
//# sourceMappingURL=RoleSelectionMediumItemGrid.js.map