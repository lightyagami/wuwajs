"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleDetailsTips = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  DynamicMaskButton_1 = require("../../../../DynamicMask/DynamicMaskButton"),
  CardDetailEntryDescLayoutItem_1 = require("../../../Common/CardDetail/CardDetailEntryDescLayoutItem"),
  CardDetailFactorDescItem_1 = require("../../../Common/CardDetail/CardDetailFactorDescItem"),
  CardDetailItem_1 = require("../../../Common/CardDetail/CardDetailItem");
class PhantomArenaBattleDetailsTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.DetailItem = void 0, this.EntryDescLayoutItem = void 0, this.Sequence = void 0, this.MaskButton = void 0, this.MaskAttach = void 0, this.IsEntryShow = !1, this.IsInActive = !1, this.ShowType = 0, this.BtnBottomCb = void 0, this.Nno = t => {
      "Close" === t && this.SetActive(!1)
    }, this.Phu = () => {
      this.ShowEntry(), this.MLt()
    }, this.XTt = () => {
      this.HideEntry(), this.TLt()
    }, this.vfu = () => {
      this.BtnBottomCb && this.BtnBottomCb()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UILayoutBase],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [5, this.Phu],
      [6, this.vfu]
    ]
  }
  async InitDetailsItem() {
    this.DetailItem = new CardDetailItem_1.CardDetailItem, await this.DetailItem.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())
  }
  async InitMaskButton() {
    this.MaskButton = new DynamicMaskButton_1.DynamicMaskButton, this.MaskButton.SetButtonFunction(this.XTt), await this.MaskButton.Init(this.MaskAttach), this.MaskButton.GetRootItem().SetAsFirstHierarchy()
  }
  async OnBeforeStartAsync() {
    this.MaskButton = new DynamicMaskButton_1.DynamicMaskButton, this.MaskButton.SetButtonFunction(this.XTt), await Promise.all([this.InitDetailsItem(), this.InitMaskButton()]), this.IsEntryShow = !1, this.RefreshEntryShowState()
  }
  OnStart() {
    this.GetButton(6)?.RootUIComp.SetUIActive(!1), this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno), this.EntryDescLayoutItem = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(3), this.GetItem(4))
  }
  OnBeforeDestroy() {
    this.Sequence.Clear(), this.MaskButton?.Destroy()
  }
  RefreshByTaskData(t) {
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.TaskCardConfigId),
      s = i.InitAttack.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility),
      e = i.InitAttack.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility),
      a = [];
    for (const h of i.CardFactorId) {
      var r = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData;
      r.FactorConfigId = h, r.IsActive = !1, a.push(r)
    }
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaFourTask(t.TaskCardConfigId),
      t = t.GetConditionDescCurrentProgress(o.TaskDescConditionId),
      o = {
        Desc: o.TaskDesc,
        CurrentProgress: t
      },
      t = {
        Name: i.Name,
        Cost: i.Cost,
        Attack: s,
        Life: e,
        CardDescription: i.CardEffectDescription,
        CardDescriptionParams: i.CardEffectDescriptionParams,
        FactorDataList: a,
        TaskData: o
      };
    this.DetailItem.Refresh(t), this.EntryDescLayoutItem.RefreshByCardConfig(i)
  }
  RefreshByCardData(t) {
    var i = [];
    for (const h of t.ExtraFactors) {
      var s = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData;
      s.FactorConfigId = h, s.IsActive = !0, i.push(s)
    }
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId),
      a = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility),
      r = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility),
      t = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.gC1.Proto_CostAbility);
    for (const n of e.CardFactorId) {
      var o = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData;
      o.FactorConfigId = n, o.IsActive = !1, i.push(o)
    }
    t = {
      Name: e.Name,
      Cost: t,
      Attack: a,
      Life: r,
      CardDescription: e.CardEffectDescription,
      CardDescriptionParams: e.CardEffectDescriptionParams,
      FactorDataList: i
    };
    this.DetailItem.Refresh(t), this.EntryDescLayoutItem.RefreshByCardConfig(e)
  }
  SetTipsPosition(t) {
    this.GetOriginalItem()?.SetUIParent(t.AttachItem), this.ShowType = t.ShowType, 1 === t.ShowType ? (this.GetItem(1).SetHierarchyIndex(0), this.SetPivotAndResetOffset(1, 0)) : 2 === t.ShowType && (this.GetItem(0).SetHierarchyIndex(0), this.SetPivotAndResetOffset(0, 1))
  }
  SetTipsActive(t) {
    this.IsInActive !== t && ((this.IsInActive = t) ? (this.SetActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequence("Start")) : (this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequence("Close"), this.ShowType = 0))
  }
  SetPivotAndResetOffset(t, i) {
    this.GetOriginalItem()?.SetPivot(new UE.Vector2D(t, i)), this.GetOriginalItem()?.SetAnchorOffset(new UE.Vector2D(0, 0))
  }
  MLt() {
    this.MaskButton.SetActive(!0)
  }
  TLt() {
    this.MaskButton.SetActive(!1)
  }
  SetMaskAttach(t) {
    this.MaskAttach = t
  }
  ShowEntry() {
    this.IsEntryShow || (this.IsEntryShow = !0, this.RefreshEntryShowState())
  }
  HideEntry() {
    this.IsEntryShow && (this.IsEntryShow = !1, this.RefreshEntryShowState())
  }
  RefreshEntryShowState() {
    this.GetItem(1).SetUIActive(this.IsEntryShow)
  }
  SetBtnMaskCallback(t) {
    this.BtnBottomCb = t, this.GetButton(6)?.RootUIComp.SetUIActive(!0)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    return t && !(t.length <= 0) && ("CardEffect" === (i = t[0]) || "CardAttr" === i || "Task" === i) ? this.DetailItem?.GetGuideUiItemAndUiItemForShowEx(t) : void 0
  }
}
exports.PhantomArenaBattleDetailsTips = PhantomArenaBattleDetailsTips;
//# sourceMappingURL=PhantomArenaBattleDetailsTips.js.map