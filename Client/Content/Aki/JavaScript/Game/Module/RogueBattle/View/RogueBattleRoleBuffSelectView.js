"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRoleBuffSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleController_1 = require("../../RoleUi/RoleController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleRoleBuffItem_1 = require("../Component/RogueBattleRoleBuffItem");
const RogueBattleRoleStarItem_1 = require("../Component/RogueBattleRoleStarItem");
const RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleRoleBuffSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OVc = undefined;
    this.$be = undefined;
    this.clo = undefined;
    this.ilo = () => {
      var e = this.OpenParam;
      ModelManager_1.ModelManager.MapRogueModel.GetOpData(e).Select(this.OVc.GetSelectedGridIndex());
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(e);
    };
    this.nlo = () => {
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.LE1.Al1.zm1;
      var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e);
      if (e) {
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [e.TrialRoleId], "RoleSkillTabView");
      }
    };
    this.Xho = e => {
      if (e === this.OVc.GetSelectedGridIndex()) {
        this.OVc?.DeselectCurrentGridProxy();
        this.GetButton(4).SetSelfInteractive(false);
      } else {
        this.OVc?.SelectGridProxy(e);
        this.GetButton(4).SetSelfInteractive(true);
      }
    };
    this.UOe = e => {
      var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
      var i = t.GetGainDataList();
      var r = [];
      for (let e = 0; e < i.length; e++) {
        var a = i[e];
        if (a.cIc) {
          r.push(a.cIc.v9n);
        }
      }
      e = {
        Index: e,
        AffixIds: r,
        RoleId: t.Data.LE1.QEc.Q6n
      };
      UiManager_1.UiManager.OpenView("RogueBattleRoleAffixDetailView", e);
    };
    this.Bqe = () => {
      var e = new RogueBattleRoleBuffItem_1.RogueBattleRoleBuffItem();
      e.OnSelectCallback = this.Xho;
      e.OnClickBtnDetailCallback = this.UOe;
      return e;
    };
    this.$An = e => {
      if (e === "Enter") {
        this.aqe();
      }
    };
    this.wIc = () => {
      ModelManager_1.ModelManager.RogueBattleModel.ChangeDescMode();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIExtendToggle], [7, UE.UIHorizontalLayout], [8, UE.UIItem]];
    this.BtnBindInfo = [[4, this.ilo], [5, this.nlo]];
  }
  async OnBeforeStartAsync() {
    this.OVc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.Bqe);
    this.clo = new RogueBattleTopPanel_1.RogueBattleTopPanel();
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), () => new RogueBattleRoleStarItem_1.RogueBattleRoleStarItem());
    var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    if (t) {
      t.UpdateViewFunc = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
        this.OVc?.DeselectCurrentGridProxy();
        this.OVc?.RefreshByDataAsync(e.GetGainDataList(), true);
        this.GetButton(4).SetSelfInteractive(false);
      };
      var i = t.Data.LE1.Al1.zm1;
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
      let e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i).FormationRoleCard;
      if (r && (i = r.GetRoleSkinId()) !== -1) {
        r = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i);
        e = r.FormationRoleCard;
      }
      this.SetTextureByPath(e, this.GetTexture(1));
      this.GetButton(4).SetSelfInteractive(true);
      await Promise.all([this.OVc.RefreshByDataAsync(t.Data.LE1.QEc.fIc), this.clo.CreateByActorAsync(this.GetItem(0).GetOwner())]);
      this.AddChild(this.clo);
      this.clo.SetCloseBtnActive(false);
      this.YJu();
      this.OVc.SelectGridProxy(0, true);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  YJu() {
    var e = this.GetExtendToggle(6);
    var t = ModelManager_1.ModelManager.RogueBattleModel.DescMode === 1 ? 0 : 1;
    e?.SetToggleState(t);
    e?.OnStateChange.Add(this.wIc);
  }
  aqe() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.LE1.Al1;
    var t = ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar;
    var i = e.Jm1;
    var r = e.Zm1;
    var a = [];
    for (let e = 0; e < t; e++) {
      if (e < r) {
        if (e >= i) {
          a.push(2);
        } else {
          a.push(1);
        }
      } else {
        a.push(0);
      }
    }
    this.$be.RefreshByData(a, undefined, true);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      return this.OVc?.GetLayoutItemByIndex(0)?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
exports.RogueBattleRoleBuffSelectView = RogueBattleRoleBuffSelectView;
//# sourceMappingURL=RogueBattleRoleBuffSelectView.js.map