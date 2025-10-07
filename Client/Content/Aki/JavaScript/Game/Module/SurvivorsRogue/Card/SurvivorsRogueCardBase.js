"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardBase = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SurvivorsRogueUiDefine_1 = require("../SurvivorsRogueUiDefine");
const SurvivorsRogueCardComponentCost_1 = require("./CardComponent/SurvivorsRogueCardComponentCost");
const SurvivorsRogueCardComponentEvolveBond_1 = require("./CardComponent/SurvivorsRogueCardComponentEvolveBond");
const SurvivorsRogueCardComponentLvDesc_1 = require("./CardComponent/SurvivorsRogueCardComponentLvDesc");
const SurvivorsRogueCardComponentRoleItem_1 = require("./CardComponent/SurvivorsRogueCardComponentRoleItem");
const SurvivorsRogueCardComponentWeaponItem_1 = require("./CardComponent/SurvivorsRogueCardComponentWeaponItem");
class SurvivorsRogueCardBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.LPt = undefined;
    this.kyd = undefined;
    this.tui = undefined;
    this.iui = undefined;
    this.CPt = new Set();
    this.mPt = new Map();
    this.XWd = [];
    this.gPt = [];
    this.RYu = (e, i) => {
      if (i) {
        this.CPt.add(e);
      } else {
        this.CPt.delete(e);
      }
    };
    this.LockFunction = undefined;
    this.ahh = e => {
      if (this.Data && this.LockFunction) {
        this.LockFunction?.(this.Data, !e);
      }
    };
    this.PPt = e => {
      this.OnExtendToggleStateChanged(e);
      if (this.kyd && this.Data) {
        this.kyd(this.Data, e);
      }
    };
    this.Lke = () => this.LPt && this.Data ? this.LPt(this.Data, this.GetCardToggle().GetToggleState()) : this.OnCanExecuteChange();
    this.v9d = () => {
      if (this.tui && this.Data) {
        this.tui(this.Data, this.GetCardToggle().GetToggleState());
      }
    };
    this.y9d = () => {
      if (this.iui && this.Data) {
        this.iui(this.Data, this.GetCardToggle().GetToggleState());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIExtendToggle], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UISprite], [14, UE.UIText]];
    this.BtnBindInfo = [[6, this.ahh]];
  }
  OnStart() {
    this.GetText(10).SetUIActive(false);
    var e = {
      UiText: this.GetText(8),
      ViewType: 0,
      ReportType: 10
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
    this.AddEvents();
  }
  OnBeforeDestroy() {
    this.RemoveEvents();
  }
  async Apply(e) {
    this.Data = e;
    this.Oyd();
    this.YWd();
    switch (e.Type) {
      case 0:
        await this.ApplyCardTypeItem(e);
        break;
      case 1:
        await this.ApplyCardTypeWeapon(e);
        break;
      case 2:
        await this.ApplyCardTypeCharacter(e);
    }
    this.RefreshComponentVisible();
    this.RefreshComponentHierarchyIndex();
  }
  async ApplyCardTypeItem(e) {
    this.ApplyBase(e);
    var i;
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsItem(e.Id);
    if (t) {
      i = [];
      this.SetTextureByPath(t.Icon, this.GetTexture(2));
      this.GetTexture(2).SetUIActive(true);
      i.push(this.RefreshCost(e.Cost, e.Cost !== undefined, e.CostEnoughCheck ?? true));
      await Promise.all(i);
    }
  }
  async ApplyCardTypeCharacter(e) {
    this.ApplyBase(e);
    var i = [];
    i.push(this.qyd(e));
    i.push(this.Gyd(e.LvUpCount, e.Type));
    i.push(this.RefreshCost(e.Cost, e.Cost !== undefined, e.CostEnoughCheck ?? true));
    await Promise.all(i);
  }
  async ApplyCardTypeWeapon(e) {
    this.ApplyBase(e);
    var i = [];
    i.push(this.Fyd(e));
    i.push(this.Nyd(e.Id, e.WeaponBondInfo ?? false));
    i.push(this.Gyd(e.LvUpCount, e.Type));
    i.push(this.RefreshCost(e.Cost, e.Cost !== undefined, e.CostEnoughCheck ?? true));
    await Promise.all(i);
  }
  async RefreshComponent(e, i, ...t) {
    let s = this.Vyd(e);
    if (t === undefined) {
      s?.SetActive(false);
    } else {
      if (!s && i) {
        s = await this.jyd(e);
      } else if (s) {
        this.GPt(s);
      }
      if (s) {
        s.Refresh(...t);
      }
    }
    return s;
  }
  Vyd(e) {
    e = this.mPt.get(e);
    if (e) {
      return e;
    }
  }
  async jyd(e) {
    var i = this.mPt.get(e);
    if (i) {
      this.GPt(i);
    } else {
      i = new e();
      this.GPt(i);
      switch (i.GetLayoutLevel()) {
        case 0:
          await i.CreateByResourceIdAsync(i.GetResourceId(), this.GetItem(3));
          break;
        case 1:
          await i.CreateByResourceIdAsync(i.GetResourceId(), this.GetItem(9));
      }
      i.OnComponentVisibleChanged = this.RYu;
      this.mPt.set(e, i);
    }
    return i;
  }
  YWd() {
    this.XWd.length = 0;
    this.gPt.length = 0;
  }
  GPt(e) {
    switch (e.GetLayoutLevel()) {
      case 0:
        this.XWd.push(e);
        break;
      case 1:
        this.gPt.push(e);
    }
  }
  RefreshComponentHierarchyIndex() {
    for (let e = 0; e < this.gPt.length; e++) {
      this.gPt[e]?.GetOriginalItem()?.SetHierarchyIndex(e);
    }
    for (let e = 0; e < this.XWd.length; e++) {
      this.XWd[e]?.GetOriginalItem()?.SetHierarchyIndex(e);
    }
  }
  Oyd() {
    this.CPt.clear();
  }
  RefreshComponentVisible() {
    for (const e of this.mPt.values()) {
      if (!this.CPt.has(e)) {
        e.SetActive(false);
      }
    }
  }
  ApplyBase(e) {
    this.Hyd(e);
    this.e01(e);
    this.$yd(e);
    this.Rxt(e);
    this.t01(e);
  }
  Hyd(e) {
    var i = this.GetText(7);
    if (e.TitleId) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.TitleId);
    } else if (e.TitleText) {
      i.SetText(e.TitleText);
    }
    var i = this.GetText(8);
    var t = e.DescParams ?? [];
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.DescId, ...t);
    var i = this.GetText(5);
    let s = e.TagId;
    if (!s) {
      switch (e.Type) {
        case 0:
          s = SurvivorsRogueUiDefine_1.SURVIVORS_ITEM_TAG_ID;
          break;
        case 1:
          s = SurvivorsRogueUiDefine_1.SURVIVORS_WEAPON_TAG_ID;
          break;
        case 2:
          s = SurvivorsRogueUiDefine_1.SURVIVORS_ROLE_TAG_ID;
      }
    }
    t = e.TagParams ?? [];
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, s, ...t);
    this.GetItem(4).SetUIActive(e.TagVisible ?? true);
  }
  e01(e) {
    var i = this.GetTexture(1);
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(e.QualityId);
    this.SetTextureByPath(t?.CardBasePath, i);
    if (e.IsLevelUp) {
      this.SetSpriteByPath(t.LvUpTagPath, this.GetSprite(13), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "SurvivorsCardLvUp");
    }
    this.GetItem(12).SetUIActive(e.IsLevelUp ?? false);
  }
  $yd(e) {
    this.GetItem(11).SetUIActive(e.IsLevelUp ?? false);
    this.SetToggleInteractive(e.UseToggle ?? false);
    this.GetText(8).SetBubbleUpToParent(e.UseToggle ?? false);
  }
  t01(e) {
    this.GetTexture(2).SetUIActive(false);
  }
  Rxt(e) {
    var i = this.GetExtendToggle(6);
    var t = e.NeedLock ?? false;
    var e = e.LockState ?? false;
    i.RootUIComp.SetUIActive(t);
    i.SetToggleStateForce(e ? 0 : 1, false);
  }
  SetLock(e) {
    this.GetExtendToggle(6).SetToggleStateForce(e ? 0 : 1, false);
  }
  BindLockFunction(e) {
    this.LockFunction = e;
  }
  async qyd(e) {
    await this.RefreshComponent(SurvivorsRogueCardComponentRoleItem_1.SurvivorsRogueCardComponentRoleItem, e.Id > 0, e.Id, e.PropertyId);
  }
  async Fyd(e) {
    await this.RefreshComponent(SurvivorsRogueCardComponentWeaponItem_1.SurvivorsRogueCardComponentWeaponItem, e.Id > 0, e.Id, e.QualityId, e.PropertyId);
  }
  async Gyd(e, i) {
    await this.RefreshComponent(SurvivorsRogueCardComponentLvDesc_1.SurvivorsRogueCardComponentLvDesc, e !== undefined && e > 0, e, i);
  }
  async Nyd(e, i) {
    await this.RefreshComponent(SurvivorsRogueCardComponentEvolveBond_1.SurvivorsRogueCardComponentEvolveBond, i, i ? e : undefined);
  }
  async RefreshCost(e, i, t) {
    await this.RefreshComponent(SurvivorsRogueCardComponentCost_1.SurvivorsRogueCardCostItem, i, e, t);
  }
  GetTextureIconItem() {
    return this.GetTexture(2);
  }
  GetCardToggle() {
    return this.GetExtendToggle(0);
  }
  AddEvents() {
    var e = this.GetCardToggle();
    e.OnStateChange.Add(this.PPt);
    e.CanExecuteChange.Bind(this.Lke);
    e.OnHover.Add(this.v9d);
    e.OnUnHover.Add(this.y9d);
  }
  RemoveEvents() {
    var e = this.GetCardToggle();
    e.OnStateChange.Remove(this.PPt);
    e.CanExecuteChange.Unbind();
    e.OnHover.Clear();
    e.OnUnHover.Clear();
  }
  OnExtendToggleStateChanged(e) {}
  OnCanExecuteChange() {
    return true;
  }
  BindOnStateChangeCallback(e) {
    this.kyd = e;
  }
  UnBindOnStateChangeCallback() {
    this.kyd = undefined;
  }
  BindOnCanExecuteChangeCallback(e) {
    this.LPt = e;
  }
  BindOnHoverCallback(e) {
    this.tui = e;
  }
  BindOnUnHoverCallback(e) {
    this.iui = e;
  }
  SetSelected(e, i = false, t = false) {
    var s = this.GetCardToggle();
    var e = e ? 1 : 0;
    if (t) {
      s.SetToggleStateForce(e, i);
    } else {
      s.SetToggleState(e, i);
    }
  }
  SetToggleInteractive(e) {
    this.GetExtendToggle(0)?.SetSelfInteractive(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length <= 0) && e[0] === "WeaponEvolve" && (e = this.mPt.get(SurvivorsRogueCardComponentEvolveBond_1.SurvivorsRogueCardComponentEvolveBond)?.GetGuideUiItem("0"))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
  HasBondInfo() {
    return this.Data?.WeaponBondInfo ?? false;
  }
}
exports.SurvivorsRogueCardBase = SurvivorsRogueCardBase;
//# sourceMappingURL=SurvivorsRogueCardBase.js.map