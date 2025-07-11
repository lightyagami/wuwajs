"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSettleInfoRoleGrid = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
class RogueBattleSettleInfoRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, t) {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.mIc.if1);
    if (i) {
      i = {
        Type: 2,
        ItemConfigId: e.mIc.if1,
        SkinId: i.GetRoleSkinId(),
        ElementId: i.GetElementInfo().Id,
        Data: e,
        IsTrialRoleVisible: i.IsTrialRole()
      };
      this.Apply(i);
      i = this.RefreshComponent(RogueBattleSettleInfoRoleGridLevelComponent, true, e);
      this.SetComponentVisible(i, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "刷新角色信息失败，角色配置不存在", ["ConfigId:", e.mIc.if1]);
    }
  }
}
exports.RogueBattleSettleInfoRoleGrid = RogueBattleSettleInfoRoleGrid;
class RogueBattleSettleInfoRoleGridLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_ItemRoleInfo";
  }
  OnRefresh(e) {
    this.GetText(0)?.SetText("");
    this.GetText(3)?.SetText(e.mIc.F6n.toString());
  }
}
//# sourceMappingURL=RogueBattleSettleInfoRoleGrid.js.map