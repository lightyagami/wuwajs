"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapRoleLayoutGrid = exports.MediumItemGridRogueRoleLevelComponent = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
class MediumItemGridRogueRoleLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_ItemRoleInfo";
  }
  OnRefresh(e) {
    var t = e.ConfigId;
    var o = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(t);
    this.SetActive(o);
    if (o) {
      o = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(t);
      t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(o);
      if (e.NeedLevel) {
        this.GetText(0)?.SetText("Lv." + ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel());
      } else {
        this.GetText(0)?.SetText("");
      }
      this.GetText(3)?.SetText(t.F6n.toString());
    }
  }
}
exports.MediumItemGridRogueRoleLevelComponent = MediumItemGridRogueRoleLevelComponent;
class RogueBattleMapRoleLayoutGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Wst = undefined;
  }
  OnRefresh(e, t, o) {
    var i = !(this.Wst = e).IsGain;
    var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ConfigId);
    var r = ModelManager_1.ModelManager.RogueBattleModel.GetRoleIsRogueTrial(e.ConfigId);
    if (i) {
      i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleCantGet(e.ConfigId);
      i = {
        Type: 2,
        ItemConfigId: e.ConfigId,
        SkinId: n.SkinId,
        BottomTextId: i ? "RogueResRole_Unable" : "RogueRes_Overall_Role_9",
        ElementId: n.ElementId,
        Data: e,
        IsDisable: true,
        IsTrialRoleVisible: r
      };
      this.Apply(i);
    } else {
      i = {
        Type: 2,
        ItemConfigId: e.ConfigId,
        SkinId: n.SkinId,
        ElementId: n.ElementId,
        Data: e,
        IsTrialRoleVisible: r
      };
      this.Apply(i);
    }
    this.SetBottomStarTextVisible(e);
  }
  SetBottomStarTextVisible(e) {
    var t = this.RefreshComponent(MediumItemGridRogueRoleLevelComponent, true, e);
    var e = e.ConfigId;
    var e = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e);
    this.SetComponentVisible(t, e);
  }
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.Wst.ConfigId);
    }
  }
}
exports.RogueBattleMapRoleLayoutGrid = RogueBattleMapRoleLayoutGrid;
//# sourceMappingURL=RogueBattleMapRoleListGrid.js.map