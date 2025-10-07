"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevSkillViewItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ButtonItem_1 = require("../../../../Module/Common/Button/ButtonItem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevDetailItem_1 = require("../Item/RoleDevDetailItem");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevSkillSlotItem_1 = require("./RoleDevSkillSlotItem");
class RoleDevSkillViewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.chd = [];
    this.nhd = undefined;
    this.Pe = undefined;
    this.fOe = undefined;
    this.qCd = undefined;
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.OnConfirmCallback = undefined;
    this.UiViewSequence = undefined;
    this.ahd = () => {
      return new RoleDevDetailItem_1.RoleDevDetailItem();
    };
    this.mhd = () => {
      if (this.Pe) {
        this.UiViewSequence?.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence?.PlaySequence("Switch");
        this.Pe.SwitchPlan();
        this.Refresh(this.Pe);
      }
    };
    this.GCd = () => {
      var e;
      var t;
      if (this.Pe?.IsRoleOwned) {
        e = {
          RoleId: this.Pe?.RoleId ?? 0,
          SkillNodeIndex: 0
        };
        t = this.Pe.IsHideMaterialList || this.Pe.IsBreakthroughLevelLow;
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 4, t ? 25 : 21);
        UiManager_1.UiManager.OpenView("RoleSkillMergeView", e);
      }
    };
    this.OVd = e => {
      var t = this.Pe?.SkillSlots ?? [];
      if (e < t.length ? t[e] : undefined) {
        t = {
          RoleId: this.Pe?.RoleId ?? 0,
          SkillNodeIndex: e
        };
        UiManager_1.UiManager.OpenView("RoleSkillMergeView", t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIVerticalLayout], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIItem]];
    this.BtnBindInfo = [[1, this.mhd]];
  }
  async OnBeforeStartAsync() {
    this.nhd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(12), this.ahd);
    await Promise.all([this.fhd(), this.FCd()]);
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  Refresh(e) {
    this.Pe = e;
    this.ghd(e);
    this.NCd(e);
    this.VCd(e);
    this.jCd(e);
    this.HCd(e);
  }
  NCd(e) {
    var t = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e.RoleId) === 0;
    var i = e.IsPerfectPlan || e.ShouldForcePerfectPlan ? "RoleProject_SkillUpgradePrefect" : "RoleProject_SkillUpgradeBasic";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i);
    if (t) {
      const s = this.GetButton(1);
      const o = this.GetText(0);
      if (s && o) {
        s.RootUIComp.SetUIActive(false);
        o.SetUIActive(false);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "RoleProject_SkillUpgradePrefect");
    } else {
      var i = !!RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e.RoleId)?.PrefectSkillLevel;
      const s = this.GetButton(1);
      const o = this.GetText(0);
      if (s && o && (t = i && !e.ShouldForcePerfectPlan, s.RootUIComp.SetUIActive(t), o.SetUIActive(t), t)) {
        i = e.IsPerfectPlan ? "RoleProject_Button_SkillUpgradeBasic" : "RoleProject_Button_SkillUpgradePrefect";
        LguiUtil_1.LguiUtil.SetLocalTextNew(o, i);
      }
    }
  }
  VCd(e) {
    e = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e.RoleId) === 0 || e.IsPerfectPlan || e.ShouldForcePerfectPlan ? e.PerfectDetailItems : e.DetailItems;
    this.nhd?.RefreshByData(e);
    this.GetItem(16).SetUIActive(e.length !== 0);
  }
  jCd(e) {
    var t = e.CurrentPlanMaterialEnough;
    this.fOe?.SetUiActive(!t);
    this.qCd?.SetUiActive(t);
    this.GetItem(7).SetUIActive(true);
    var t = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e.RoleId) === 0;
    if (t) {
      this.GetItem(7).SetUIActive(false);
    }
  }
  HCd(e) {
    if (e.IsHideMaterialList || e.IsBreakthroughLevelLow) {
      this.fOe?.SetLocalTextNew("RoleProject_Button02");
      this.qCd?.SetLocalTextNew("RoleProject_Button02");
    } else {
      this.fOe?.SetLocalTextNew("RoleProject_Button01");
      this.qCd?.SetLocalTextNew("RoleProject_Button01");
    }
    this.GetVerticalLayout(12).RootUIComp.SetUIActive(true);
    if (e.IsBreakthroughLevelLow) {
      this.GetItem(9).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "RoleProject_Tips05");
    } else {
      this.GetItem(9).SetUIActive(false);
    }
    if (!e.IsRoleOwned) {
      this.fOe?.SetUiActive(false);
      this.qCd?.SetUiActive(false);
      this.fOe?.SetLocalTextNew("RoleProject_Button02");
      this.qCd?.SetLocalTextNew("RoleProject_Button02");
    }
  }
  async fhd() {
    var t = [2, 3, 4, 5, 6];
    var i = [];
    for (let e = 0; e < t.length; e++) {
      var s = t[e];
      var o = new RoleDevSkillSlotItem_1.RoleDevSkillSlotItem();
      var s = o.CreateThenShowByActorAsync(this.GetItem(s).GetOwner());
      i.push(s);
      o.SetClickCallback(() => {
        this.OVd(e);
      });
      this.chd.push(o);
    }
    await Promise.all(i);
  }
  async FCd() {
    this.fOe = new ButtonItem_1.ButtonItem();
    this.qCd = new ButtonItem_1.ButtonItem();
    await Promise.all([this.fOe.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.qCd.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())]);
    this.fOe.SetFunction(this.GCd);
    this.qCd.SetFunction(this.GCd);
  }
  ghd(t) {
    var i = t.SkillSlots;
    for (let e = 0; e < this.chd.length; e++) {
      var s = this.chd[e];
      var o = e < i.length ? i[e] : undefined;
      s.SetIsPerfectPlan(t.IsPerfectPlan || t.ShouldForcePerfectPlan);
      s.Refresh(o);
    }
  }
}
exports.RoleDevSkillViewItem = RoleDevSkillViewItem;
//# sourceMappingURL=RoleDevSkillViewItem.js.map