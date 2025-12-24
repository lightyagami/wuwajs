"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleSelectTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const MiniElementItem_1 = require("../../../Common/MiniElementItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
const PhantomArenaRoleSelectionItem_1 = require("./PhantomArenaRoleSelectionItem");
const PhantomArenaRoleSkillItem_1 = require("./PhantomArenaRoleSkillItem");
class PhantomArenaRoleSelectTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this._Iu = [];
    this.D61 = -1;
    this.U61 = -1;
    this.aho = undefined;
    this.B61 = undefined;
    this.det = [];
    this.k61 = [];
    this.qsi = undefined;
    this.uyi = () => {
      var t = new PhantomArenaRoleSelectionItem_1.PhantomArenaRoleSelectionItem();
      t.BindOnExtendToggleStateChanged(this.j5e);
      t.BindOnCanExecuteChange(this.CanExecuteChange);
      return t;
    };
    this.j5e = t => {
      if (t.State === 1) {
        t = t.Data;
        this.SelectCardRoleByCardRoleId(t.CardRoleId, true);
      }
    };
    this.CanExecuteChange = (t, e, i) => {
      return i !== 1 || t.CardRoleId !== this.GetSelectedCardRoleId();
    };
    this.O61 = t => {
      if (t !== this.U61) {
        if (this.U61 >= 0) {
          this.det[this.U61].SetSelected(false);
        }
        this.U61 = t;
        this.det[this.U61].SetSelected(true);
        this.RefreshSkillDetailView();
      }
    };
    this.tWt = () => {
      this.ViewModel.SelectedCardRoleId = this.GetSelectedCardRoleId();
      this.ViewModel.RoleSelectedConfirmFlag = true;
      this.CloseMe();
    };
    this.G3e = () => {
      var t = this.GetSelectedCardRoleId();
      PhantomArenaController_1.PhantomArenaController.RoleRewardRequest(t, this.Feu);
    };
    this.Feu = e => {
      for (let t = 0; t < this._Iu.length; t++) {
        var i = this._Iu[t];
        if (i.CardRoleId === e) {
          i.CanReceived = false;
          this.B61?.RefreshGridProxy(t);
          break;
        }
      }
      this.RefreshDetailView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText]];
    this.BtnBindInfo = [[8, this.tWt]];
  }
  async OnBeforeStartAsync() {
    for (const r of ModelManager_1.ModelManager.PhantomArenaModel.GetCardRoleList(this.ActivityId)) {
      this._Iu.push(this.CreateCardRoleItemData(r));
    }
    this.aho = new MiniElementItem_1.MiniElementItem(0, undefined, this.GetItem(3).GetOwner());
    this.B61 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.uyi);
    var t;
    var e = [];
    for (let t = 4; t <= 5; t++) {
      var i = new PhantomArenaRoleSkillItem_1.PhantomArenaRoleSkillItem();
      i.OnToggleSelect = this.O61;
      this.det.push(i);
      e.push(i.CreateByActorAsync(this.GetItem(t).GetOwner()));
    }
    this.qsi = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    e.push(this.qsi.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()), this.B61?.RefreshByDataAsync(this._Iu));
    await Promise.all(e);
    this.qsi.SetAllowClickBack(false);
    this.qsi.BindOnExtendToggleClicked(this.G3e);
    const s = this.ViewModel.SelectedCardRoleId;
    let h = 0;
    if (s && s > 0 && (t = this._Iu.findIndex(t => t.CardRoleId === s)) !== -1) {
      h = t;
    }
    this.D61 = h;
    this.B61?.SelectGridProxy(h);
    this.RefreshDetailView();
  }
  OnBeforeShow() {
    this.ViewModel.SetViewTitle?.("PhantomArenaRoleSelectTabView_Name");
    this.ViewModel.SetViewHelpId?.(337);
    this.ViewModel.SetViewHelpBtnActive?.(true);
    this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena4");
    this.ViewModel.TextureCardRoleId = this.GetSelectedCardRoleId();
    this.ViewModel.RefreshRoleTexture?.();
    this.ViewModel.ShowRoleTexture?.(true);
  }
  CreateCardRoleItemData(t) {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.IsRoleUnlock(t);
    var i = this.ViewModel.CanShowSelectBtnInRoleSelectTabView;
    var s = this.ViewModel.CanShowRewardInRoleSelectTabView;
    var h = ModelManager_1.ModelManager.PhantomArenaModel.IsRoleReward(t);
    return {
      CardRoleId: t,
      CanReceived: s && e && !h,
      IsLocked: !e,
      CanSelect: e && i
    };
  }
  GetSelectedCardRoleId() {
    return this._Iu[this.D61].CardRoleId;
  }
  GetSelectedCardRoleData() {
    return this._Iu[this.D61];
  }
  SelectCardRoleByCardRoleId(e, t) {
    var i = this._Iu.findIndex(t => t.CardRoleId === e);
    if (i !== -1) {
      this.SelectCardRoleByIndex(i, t);
    }
  }
  SelectCardRoleByIndex(t, e) {
    if (t !== -1) {
      this.D61 = t;
      this.B61?.SelectGridProxy(t);
      t = this._Iu[t].CardRoleId;
      this.ViewModel.ChangeRoleTexture?.(t, e);
      this.RefreshDetailView();
    }
  }
  RefreshDetailView() {
    if (this.D61 !== -1 && !(this.D61 >= this._Iu.length)) {
      var t = this.GetSelectedCardRoleId();
      var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
      var e = t.RoleConfigId;
      var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
      this.aho?.RefreshMiniElement(e.ElementId);
      this.RefreshStates();
      var e = [...t.PassiveSkillIconList, ...t.SkillIconList];
      this.U61 = 0;
      var i = e.length;
      this.k61.length = 0;
      for (const o of e) {
        var s = {
          IconPath: o
        };
        this.k61.push(s);
      }
      for (let t = 0; t < i; t++) {
        var h = this.det[t];
        var r = this.k61[t];
        h.SetActive(true);
        h.Refresh(r, this.U61 === t, t);
      }
      if (this.det.length > i) {
        for (let t = i; t < this.det.length; t++) {
          this.det[t].SetActive(false);
        }
      }
      this.RefreshSkillDetailView();
    }
  }
  RefreshStates() {
    var t = this.GetSelectedCardRoleData();
    var e = t.CardRoleId;
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    this.GetItem(11).SetUIActive(t.IsLocked);
    this.GetItem(9).SetUIActive(t.CanReceived);
    this.GetButton(8).RootUIComp.SetUIActive(t.CanSelect);
    if (t.IsLocked) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.UnlockConditionTip);
    }
    if (t.CanReceived) {
      t = i.DropId;
      if (t > 0) {
        var s;
        var h;
        var i = DropPackageById_1.configDropPackageById.GetConfig(t).DropPreview;
        if (i.size > 1 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 43, "奖励物品数量大于1，请检查配置", ["cardRoleConfig", e]);
        }
        for ([s, h] of i) {
          var r = [{
            ItemId: s,
            IncId: 0
          }, h];
          this.qsi?.Refresh(r);
          this.qsi?.SetReceivableVisible(true);
          break;
        }
      }
    }
  }
  RefreshSkillDetailView() {
    if (this.U61 !== -1) {
      var t = this.GetSelectedCardRoleId();
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
      var i = [...e.PassiveSkillNameList, ...e.SkillNameList];
      var s = [];
      for (let t = 0; t < e.PassiveSkillDescList.length; t++) {
        var h = e.PassiveSkillDescList[t];
        var r = e.PassiveSkillDescParamsList[t] ? e.PassiveSkillDescParamsList[t].ArrayString : [];
        s.push({
          Desc: h,
          Params: r
        });
      }
      for (let t = 0; t < e.SkillDescList.length; t++) {
        var o = e.SkillDescList[t];
        var a = e.SkillDescParamsList[t] ? e.SkillDescParamsList[t].ArrayString : [];
        s.push({
          Desc: o,
          Params: a
        });
      }
      if (i.length !== this.k61.length || s.length !== this.k61.length) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 43, "技能名称、技能描述数量不一致，请检查配置", ["cardRoleConfig", t]);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i[this.U61]);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), s[this.U61].Desc, ...s[this.U61].Params);
      }
    }
  }
}
exports.PhantomArenaRoleSelectTabView = PhantomArenaRoleSelectTabView;
//# sourceMappingURL=PhantomArenaRoleSelectTabView.js.map