"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevSkillViewItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
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
    this.aKd = undefined;
    this.hKd = undefined;
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.OnConfirmCallback = undefined;
    this.OnPlanChangeCallback = undefined;
    this.UiViewSequence = undefined;
    this.ahd = () => {
      return new RoleDevDetailItem_1.RoleDevDetailItem();
    };
    this.mhd = () => {
      if (this.Pe) {
        this.UiViewSequence?.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence?.PlaySequence("Switch");
        this.Pe.SwitchPlan();
        this.OnPlanChangeCallback?.(this.Pe);
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 4, 20);
        this.Refresh(this.Pe);
      }
    };
    this.GCd = () => {
      var e;
      var i;
      if (this.Pe?.IsRoleOwned) {
        e = {
          RoleId: this.Pe?.RoleId ?? 0,
          SkillNodeIndex: ConfigManager_1.ConfigManager.RoleDevConfig.GetDefaultSkillNodeIndex()
        };
        i = this.Pe.CurrentPlanFinished;
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 4, i ? 25 : 21);
        UiManager_1.UiManager.OpenView("RoleSkillMergeView", e);
      }
    };
    this.OVd = e => {
      var i = this.Pe?.SkillSlots ?? [];
      var i = e < i.length ? i[e] : undefined;
      if (i) {
        e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(i.SkillNodeId);
        i = {
          RoleId: this.Pe?.RoleId ?? 0,
          SkillNodeIndex: e?.NodeIndex ?? ConfigManager_1.ConfigManager.RoleDevConfig.GetDefaultSkillNodeIndex()
        };
        UiManager_1.UiManager.OpenView("RoleSkillMergeView", i);
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
  }
  NCd(e) {
    var i = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e.RoleId) === 0;
    var t = e.IsPerfectPlan || e.ShouldForcePerfectPlan ? "RoleProject_SkillUpgradePrefect" : "RoleProject_SkillUpgradeBasic";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), t);
    if (i) {
      const s = this.GetButton(1);
      const l = this.GetText(0);
      if (s && l) {
        s.RootUIComp.SetUIActive(false);
        l.SetUIActive(false);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "RoleProject_SkillUpgradePrefect");
    } else {
      var t = !!RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e.RoleId)?.PrefectSkillLevel;
      const s = this.GetButton(1);
      const l = this.GetText(0);
      if (s && l && (i = t && !e.ShouldForcePerfectPlan, s.RootUIComp.SetUIActive(i), l.SetUIActive(i), i)) {
        t = e.IsPerfectPlan ? "RoleProject_Button_SkillUpgradeBasic" : "RoleProject_Button_SkillUpgradePrefect";
        LguiUtil_1.LguiUtil.SetLocalTextNew(l, t);
      }
    }
  }
  VCd(e) {
    e = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e.RoleId) === 0 || e.IsPerfectPlan || e.ShouldForcePerfectPlan ? e.PerfectDetailItems : e.NormalDetailItems;
    this.nhd?.RefreshByData(e);
    this.GetItem(16).SetUIActive(e.length !== 0);
  }
  jCd(l) {
    this.GetVerticalLayout(12).RootUIComp.SetUIActive(true);
    var o = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(l.RoleId) === 0;
    var r = l.IsRoleOwned;
    var o = !o && r;
    this.GetItem(7).SetUIActive(o);
    this.GetItem(11).SetUIActive(!o);
    if (r) {
      o = l.CurrentPlanFinished;
      let e = false;
      let i = false;
      let t = "";
      let s = false;
      s = o ? (r = l.IsBreakthroughLevelLow, e = true, i = false, t = "RoleProject_Button02", r) : (o = l.CurrentPlanMaterialEnough, e = !o, i = o, !(t = "RoleProject_Button01"));
      this.aKd?.SetLocalTextNew(t);
      this.hKd?.SetLocalTextNew(t);
      this.aKd?.SetUiActive(e);
      this.hKd?.SetUiActive(i);
      this.GetItem(9).SetUIActive(s);
      if (s) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "RoleProject_Tips05");
      }
    } else {
      this.aKd?.SetUiActive(false);
      this.hKd?.SetUiActive(false);
      this.GetItem(9).SetUIActive(false);
    }
  }
  async fhd() {
    var i = [2, 3, 4, 5, 6];
    var t = [];
    for (let e = 0; e < i.length; e++) {
      var s = i[e];
      var l = new RoleDevSkillSlotItem_1.RoleDevSkillSlotItem();
      var s = l.CreateThenShowByActorAsync(this.GetItem(s).GetOwner());
      t.push(s);
      l.SetClickCallback(() => {
        this.OVd(e);
      });
      this.chd.push(l);
    }
    await Promise.all(t);
  }
  async FCd() {
    this.aKd = new ButtonItem_1.ButtonItem();
    this.hKd = new ButtonItem_1.ButtonItem();
    await Promise.all([this.aKd.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.hKd.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())]);
    this.aKd.SetFunction(this.GCd);
    this.hKd.SetFunction(this.GCd);
  }
  ghd(i) {
    var t = i.SkillSlots;
    for (let e = 0; e < this.chd.length; e++) {
      var s = this.chd[e];
      var l = e < t.length ? t[e] : undefined;
      s.SetIsPerfectPlan(i.IsPerfectPlan || i.ShouldForcePerfectPlan);
      s.Refresh(l);
    }
  }
}
exports.RoleDevSkillViewItem = RoleDevSkillViewItem;
//# sourceMappingURL=RoleDevSkillViewItem.js.map