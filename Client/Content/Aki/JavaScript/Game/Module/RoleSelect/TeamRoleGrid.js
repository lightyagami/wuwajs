"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TeamRoleGrid = void 0;
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  RoguelikeSelectRoleView_1 = require("../Roguelike/View/RoguelikeSelectRoleView");
class TeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), this.IsHighlightIndex = void 0
  }
  OnRefresh(e, o, r) {
    var a = e.GetLevelData(),
      l = e.GetDataId(),
      i = ModelManager_1.ModelManager.EditFormationModel,
      t = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(l);
    let d = !1;
    var n = e.IsTrialRole(),
      i = (n || ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() || ModelManager_1.ModelManager.MowingTowerModel.IsOpenMowingTowerFormation() || ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance() || (d = i.IsRoleDead(l)), this.IsHighlightIndex?.(t));
    let M = !1;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId && (g = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId).RecommendRole, M = g.includes(e.GetRoleId()));
    var g = ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(l ?? -1) ? {
        BelongTo: 1 - ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea
      } : void 0,
      n = {
        Type: 2,
        ItemConfigId: l,
        SkinId: e.GetRoleSkinId(),
        IsTrialRoleVisible: n,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [a.GetLevel()],
        Index: 0 < t ? t : void 0,
        HighlightIndex: i,
        ElementId: e.GetRoleConfig().ElementId,
        IsShowCost: ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
        Data: e,
        IsDisable: d,
        IsRecommendVisible: M,
        HalfAreaInfo: g,
        IsShowWeeklyRogueTag: ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen() && ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(l)
      },
      t = (this.Apply(n), e.IsTrialRole() ? this.SetLevelAndLock() : (a = !e || !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(l), this.SetLevelAndLock(void 0, a)), e.GetLevelData().GetLevel() < ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0]),
      i = (-1 !== ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0] && t && this.SetAddLevelComponent(ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0], t), ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(l));
    this.SetSelected(i, !0)
  }
  OnForceSelected() {
    this.SetSelected(!0, !0)
  }
  OnSelected(e) {
    this.SetSelected(!0)
  }
  OnDeselected(e) {
    this.SetSelected(!1)
  }
  SetAddLevelComponent(e, o) {
    var r = this.Data.GetLevelData().GetLevel(),
      r = Math.max(r, e),
      e = this.RefreshComponent(RoguelikeSelectRoleView_1.RogueAddLevelComponent, !0, r);
    this.SetComponentVisible(e, o), r && this.SetBottomTextVisible(!1)
  }
}
exports.TeamRoleGrid = TeamRoleGrid;
//# sourceMappingURL=TeamRoleGrid.js.map