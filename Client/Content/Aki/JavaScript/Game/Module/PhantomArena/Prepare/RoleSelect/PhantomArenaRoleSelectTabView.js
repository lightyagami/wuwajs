"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleSelectTabView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  MiniElementItem_1 = require("../../../Common/MiniElementItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase"),
  PhantomArenaRoleSelectionItem_1 = require("./PhantomArenaRoleSelectionItem"),
  PhantomArenaRoleSkillItem_1 = require("./PhantomArenaRoleSkillItem");
class PhantomArenaRoleSelectTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments), this.quu = [], this.i61 = -1, this.r61 = -1, this.aho = void 0, this.o61 = void 0, this.det = [], this.n61 = [], this.qsi = void 0, this.uyi = () => {
      var t = new PhantomArenaRoleSelectionItem_1.PhantomArenaRoleSelectionItem;
      return t.BindOnExtendToggleStateChanged(this.j5e), t.BindOnCanExecuteChange(this.CanExecuteChange), t
    }, this.j5e = t => {
      1 === t.State && (t = t.Data, this.SelectCardRoleByCardRoleId(t.CardRoleId, !0))
    }, this.CanExecuteChange = (t, e, i) => {
      return 1 !== i || t.CardRoleId !== this.GetSelectedCardRoleId()
    }, this.s61 = t => {
      t !== this.r61 && (0 <= this.r61 && this.det[this.r61].SetSelected(!1), this.r61 = t, this.det[this.r61].SetSelected(!0), this.RefreshSkillDetailView())
    }, this.tWt = () => {
      this.ViewModel.SelectedCardRoleId = this.GetSelectedCardRoleId(), this.ViewModel.RoleSelectedConfirmFlag = !0, this.CloseMe()
    }, this.G3e = () => {
      var t = this.GetSelectedCardRoleId();
      PhantomArenaController_1.PhantomArenaController.RoleRewardRequest(t, this.vZ1)
    }, this.vZ1 = e => {
      for (let t = 0; t < this.quu.length; t++) {
        var i = this.quu[t];
        if (i.CardRoleId === e) {
          i.CanReceived = !1, this.o61?.RefreshGridProxy(t);
          break
        }
      }
      this.RefreshDetailView()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText]
    ], this.BtnBindInfo = [
      [8, this.tWt]
    ]
  }
  async OnBeforeStartAsync() {
    for (const r of ModelManager_1.ModelManager.PhantomArenaModel.GetCardRoleList()) this.quu.push(this.CreateCardRoleItemData(r));
    this.aho = new MiniElementItem_1.MiniElementItem(0, void 0, this.GetItem(3).GetOwner()), this.o61 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.uyi);
    var t, e = [];
    for (let t = 4; t <= 5; t++) {
      var i = new PhantomArenaRoleSkillItem_1.PhantomArenaRoleSkillItem;
      i.OnToggleSelect = this.s61, this.det.push(i), e.push(i.CreateByActorAsync(this.GetItem(t).GetOwner()))
    }
    this.qsi = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid, e.push(this.qsi.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()), this.o61?.RefreshByDataAsync(this.quu)), await Promise.all(e), this.qsi.SetAllowClickBack(!1), this.qsi.BindOnExtendToggleClicked(this.G3e);
    const s = this.ViewModel.SelectedCardRoleId;
    let h = 0;
    s && 0 < s && -1 !== (t = this.quu.findIndex(t => t.CardRoleId === s)) && (h = t), this.i61 = h, this.o61?.SelectGridProxy(h), this.RefreshDetailView()
  }
  OnBeforeShow() {
    this.ViewModel.SetViewTitle?.("PhantomArenaRoleSelectTabView_Name"), this.ViewModel.SetViewHelpId?.(337), this.ViewModel.SetViewHelpBtnActive?.(!0), this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena4"), this.ViewModel.TextureCardRoleId = this.GetSelectedCardRoleId(), this.ViewModel.RefreshRoleTexture?.(), this.ViewModel.ShowRoleTexture?.(!0)
  }
  CreateCardRoleItemData(t) {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.IsRoleUnlock(t),
      i = this.ViewModel.CanShowSelectBtnInRoleSelectTabView,
      s = this.ViewModel.CanShowRewardInRoleSelectTabView,
      h = ModelManager_1.ModelManager.PhantomArenaModel.IsRoleReward(t);
    return {
      CardRoleId: t,
      CanReceived: s && e && !h,
      IsLocked: !e,
      CanSelect: e && i
    }
  }
  GetSelectedCardRoleId() {
    return this.quu[this.i61].CardRoleId
  }
  GetSelectedCardRoleData() {
    return this.quu[this.i61]
  }
  SelectCardRoleByCardRoleId(e, t) {
    var i = this.quu.findIndex(t => t.CardRoleId === e); - 1 !== i && this.SelectCardRoleByIndex(i, t)
  }
  SelectCardRoleByIndex(t, e) {
    -1 !== t && (this.i61 = t, this.o61?.SelectGridProxy(t), t = this.quu[t].CardRoleId, this.ViewModel.ChangeRoleTexture?.(t, e), this.RefreshDetailView())
  }
  RefreshDetailView() {
    if (!(-1 === this.i61 || this.i61 >= this.quu.length)) {
      var t = this.GetSelectedCardRoleId(),
        t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t),
        e = t.RoleConfigId,
        e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
        e = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name), this.aho?.RefreshMiniElement(e.ElementId), this.RefreshStates(), [...t.PassiveSkillIconList, ...t.SkillIconList]),
        i = (this.r61 = 0, e.length);
      this.n61.length = 0;
      for (const o of e) {
        var s = {
          IconPath: o
        };
        this.n61.push(s)
      }
      for (let t = 0; t < i; t++) {
        var h = this.det[t],
          r = this.n61[t];
        h.SetActive(!0), h.Refresh(r, this.r61 === t, t)
      }
      if (this.det.length > i)
        for (let t = i; t < this.det.length; t++) this.det[t].SetActive(!1);
      this.RefreshSkillDetailView()
    }
  }
  RefreshStates() {
    var t = this.GetSelectedCardRoleData(),
      e = t.CardRoleId,
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    if (this.GetItem(11).SetUIActive(t.IsLocked), this.GetItem(9).SetUIActive(t.CanReceived), this.GetButton(8).RootUIComp.SetUIActive(t.CanSelect), t.IsLocked && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.UnlockConditionTip), t.CanReceived) {
      t = i.DropId;
      if (0 < t) {
        var s, h, i = DropPackageById_1.configDropPackageById.GetConfig(t).DropPreview;
        1 < i.size && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "奖励物品数量大于1，请检查配置", ["cardRoleConfig", e]);
        for ([s, h] of i) {
          var r = [{
            ItemId: s,
            IncId: 0
          }, h];
          this.qsi?.Refresh(r), this.qsi?.SetReceivableVisible(!0);
          break
        }
      }
    }
  }
  RefreshSkillDetailView() {
    if (-1 !== this.r61) {
      var t = this.GetSelectedCardRoleId(),
        e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t),
        i = [...e.PassiveSkillNameList, ...e.SkillNameList],
        s = [];
      for (let t = 0; t < e.PassiveSkillDescList.length; t++) {
        var h = e.PassiveSkillDescList[t],
          r = e.PassiveSkillDescParamsList[t] ? e.PassiveSkillDescParamsList[t].ArrayString : [];
        s.push({
          Desc: h,
          Params: r
        })
      }
      for (let t = 0; t < e.SkillDescList.length; t++) {
        var o = e.SkillDescList[t],
          a = e.SkillDescParamsList[t] ? e.SkillDescParamsList[t].ArrayString : [];
        s.push({
          Desc: o,
          Params: a
        })
      }
      i.length !== this.n61.length || s.length !== this.n61.length ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "技能名称、技能描述数量不一致，请检查配置", ["cardRoleConfig", t]) : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i[this.r61]), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), s[this.r61].Desc, ...s[this.r61].Params))
    }
  }
}
exports.PhantomArenaRoleSelectTabView = PhantomArenaRoleSelectTabView;
//# sourceMappingURL=PhantomArenaRoleSelectTabView.js.map