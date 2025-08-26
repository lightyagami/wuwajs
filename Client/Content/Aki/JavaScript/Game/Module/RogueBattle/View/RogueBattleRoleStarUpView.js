"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRoleStarUpView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const RoleController_1 = require("../../RoleUi/RoleController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueBattleFetterUpItem_1 = require("../Component/RogueBattleFetterUpItem");
const RogueBattleRoleStarItem_1 = require("../Component/RogueBattleRoleStarItem");
const RogueBattleDefine_1 = require("../RogueBattleDefine");
class RogueBattleRoleStarUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.m01 = undefined;
    this.$be = undefined;
    this.DT1 = () => {
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.LE1.Al1.zm1;
      var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e);
      if (e) {
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [e.TrialRoleId], "RoleSkillTabView");
      }
    };
    this.$An = e => {
      if (e === "Enter") {
        this.m01?.PlayTurnAnimation();
        this.RefreshStar();
      }
    };
    this.ilo = () => {
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.OpenParam);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIHorizontalLayout], [7, UE.UIItem]];
    this.BtnBindInfo = [[4, this.ilo], [5, this.DT1]];
  }
  async OnBeforeStartAsync() {
    this.m01 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), () => new RogueBattleFetterUpItem_1.RogueBattleFetterUpItem(), this.GetItem(3).GetOwner());
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), () => new RogueBattleRoleStarItem_1.RogueBattleRoleStarItem());
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.LE1.Al1;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.if1);
    let r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.zm1).FormationRoleCard;
    if (t && (e = t.GetRoleSkinId()) !== -1) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(e);
      r = t.FormationRoleCard;
    }
    this.SetTextureShowUntilLoaded(r, this.GetTexture(1));
    e = this.BuildFetterData();
    await this.m01.RefreshByDataAsync(e);
  }
  OnAfterShow() {
    this.m01?.GetScrollItemMap().forEach(e => {
      e.PlayExpAnimation();
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  BuildFetterData() {
    const i = [];
    const n = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.LE1.Al1;
    var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(n.zm1);
    const o = n.Zm1 - n.Jm1;
    e.BondIds.forEach(t => {
      let e = n.Pl1.find(e => e.v9n === t);
      e = e || ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(t);
      var r = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondPreviewDataById(e.v9n, o, e.F6n, e.Whc);
      var r = {
        OldRoleBondInfo: e,
        NewRoleBondInfo: r,
        AddStar: o
      };
      i.push(r);
    });
    i.sort(RogueBattleDefine_1.sortRogueBattleRoleBondUpdateInfo);
    return i;
  }
  RefreshStar() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.LE1.Al1;
    var t = ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar;
    var r = e.Jm1;
    var i = e.Zm1;
    var n = [];
    for (let e = 0; e < t; e++) {
      if (e < i) {
        if (e >= r) {
          n.push(2);
        } else {
          n.push(1);
        }
      } else {
        n.push(0);
      }
    }
    this.$be.RefreshByData(n, undefined, true);
  }
}
exports.RogueBattleRoleStarUpView = RogueBattleRoleStarUpView;
//# sourceMappingURL=RogueBattleRoleStarUpView.js.map