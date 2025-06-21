"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderDeckSlotsPanel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem"),
  DeckBuilderCardSlotItem_1 = require("./DeckBuilderCardSlotItem");
class DeckBuilderDeckSlotsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Data = void 0, this.CurCoreSlotData = void 0, this.CurNormalSlotDataList = [], this.$cu = void 0, this.NormalSlotLoopScrollView = void 0, this.CoreElementLayout = void 0, this.NormalElementLayout = void 0, this.DK1 = 0, this.fZ1 = 0, this.gZ1 = new Map, this.EV1 = () => {
      var t = new DeckBuilderCardSlotItem_1.DeckBuilderCardSlotItem;
      return t.CanToggleChange = this.TV1, t.ShortClickCallback = t => {
        this.Data?.OnNormalSlotItemSortClick?.(t)
      }, t.LongPressCallback = t => {
        this.Data?.OnNormalSlotItemLongPress?.(t)
      }, t.OnToggleStateChange = (t, e) => {
        this.Data?.OnNormalSlotItemToggleStateChange?.(t, e)
      }, t
    }, this.TV1 = t => this.Data.CanNormalSlotItemToggleChange(t), this.Wcu = () => {
      var t = new DeckBuilderCardSlotItem_1.DeckBuilderCardSlotItem;
      return t.CanToggleChange = this.Qcu, t.ShortClickCallback = t => {
        this.Data?.OnCoreSlotItemSortClick?.(t)
      }, t.LongPressCallback = t => {
        this.Data?.OnCoreSlotItemLongPress?.(t)
      }, t.OnToggleStateChange = (t, e) => {
        this.Data?.OnCoreSlotItemToggleStateChange?.(t, e)
      }, t
    }, this.Qcu = t => this.Data.CanCoreSlotItemToggleChange(t), this.jli = () => new CardElementItem_1.CardElementItem, this.CZ1 = t => {
      1 === t && this.SwitchMaskState(2)
    }, this.Kcu = t => {
      1 === t && this.SwitchMaskState(1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [2, UE.UIItem],
      [9, UE.UIItem],
      [4, UE.UILayoutBase],
      [3, UE.UIText],
      [5, UE.UIItem],
      [7, UE.UIItem],
      [11, UE.UILayoutBase],
      [10, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UILoopScrollViewComponent],
      [14, UE.UIItem],
      [6, UE.UIItem],
      [1, UE.UIExtendToggle],
      [8, UE.UIExtendToggle]
    ]
  }
  async OnBeforeStartAsync() {
    this.$cu = this.Wcu(), this.NormalSlotLoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(13), this.GetItem(14).GetOwner(), this.EV1, !0), this.CoreElementLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(4), this.jli), this.NormalElementLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(11), this.jli), await Promise.all([this.$cu.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())]);
    var t = this.GetExtendToggle(1),
      e = this.GetExtendToggle(8);
    t.SetToggleState(2), this.gZ1.set(1, {
      SlotType: 1,
      Toggle: t,
      MaskItem: this.GetItem(2),
      Enabled: !1
    }), e.SetToggleState(2), this.gZ1.set(2, {
      SlotType: 2,
      Toggle: e,
      MaskItem: this.GetItem(9),
      Enabled: !1
    }), t.OnStateChange.Add(this.Kcu), e.OnStateChange.Add(this.CZ1)
  }
  RefreshByData(t) {
    this.Data = t, this.RefreshCardSlot(), this.RefreshCardSlotElements(), this.RefreshNameText()
  }
  RefreshCardSlot(t, e = !1) {
    this.RefreshCoreCardSlot(t), this.RefreshNormalCardSlot(t, e)
  }
  dtu(t) {
    var e = t.CardId,
      i = this.Data.ShowLocked && !ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(e);
    return {
      SlotInfo: t,
      Locked: i,
      RedDotState: i && ModelManager_1.ModelManager.PhantomArenaModel.CanCardUnlock(e),
      OutlookUnlocked: this.Data.ShowOutlook && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e),
      NeedPlayAddAnim: !1
    }
  }
  RefreshCoreCardSlot(t) {
    var e = this.Data.DeckInfo,
      i = e.GetCoreCardSlot(),
      s = e.IsCoreCardSlotLocked(),
      h = void 0 !== i,
      h = (this.$cu.SetActive(!s && h), this.GetItem(5).SetUIActive(!s && !h), this.GetItem(6).SetUIActive(s), i?.Count ?? 0),
      s = e.GetCoreCardCountLimit();
    this.GetText(3).SetText(h + "/" + s), i && (this.CurCoreSlotData = this.dtu(i), t && t === this.CurCoreSlotData.SlotInfo.CardId && (this.CurCoreSlotData.NeedPlayAddAnim = !0), this.$cu.Refresh(this.CurCoreSlotData, !1, 0))
  }
  RefreshNormalCardSlot(t, e = !1, i = 0) {
    var s = this.Data.DeckInfo,
      h = Array.from(s.GetNormalCardSlotList());
    ModelManager_1.ModelManager.PhantomArenaModel.SortCardSlotList(h, this.Data.SortContext), this.CurNormalSlotDataList = [];
    for (const o of h) {
      var r = this.dtu(o);
      r.NeedPlayAddAnim = void 0 !== t && t === r.SlotInfo.CardId, this.CurNormalSlotDataList.push(r)
    }
    this.NormalSlotLoopScrollView?.RefreshByData(this.CurNormalSlotDataList, e, () => {
      var t;
      0 !== i && 0 <= (t = this.CurNormalSlotDataList.findIndex(t => t.SlotInfo.CardId === i)) && this.NormalSlotLoopScrollView && this.GetLoopScrollViewComponent(13)?.IsValid() && !this.NormalSlotLoopScrollView.IsGridDisplaying(t) && this.NormalSlotLoopScrollView.ScrollToGridIndex(t)
    });
    h = 0 < this.CurNormalSlotDataList.length, this.GetLoopScrollViewComponent(13).RootUIComp.SetUIActive(h), this.GetItem(12).SetUIActive(!h), e = s.GetNormalCardCount(), h = s.GetNormalCardCountLimit();
    this.GetText(10).SetText(e + "/" + h)
  }
  RefreshCardSlotElements() {
    this.Xcu(), this.jV1()
  }
  Xcu() {
    var t = this.Data.DeckInfo.GetCoreCardSlot(),
      e = [];
    t && e.push(t.Element), this.CoreElementLayout?.RefreshByData(e)
  }
  jV1() {
    this.NormalElementLayout?.RefreshByData(this.Data.DeckInfo.GetElementList())
  }
  RefreshNameText() {
    this.GetText(0).SetText(this.Data.DeckInfo.GetDeckName())
  }
  RefreshBySortContext(t) {
    this.Data.SortContext = t, this.RefreshNormalCardSlot()
  }
  SelectCoreCardSlot() {
    var t = this.Data.DeckInfo.GetCoreCardSlot();
    return void 0 !== t && (this.NormalSlotLoopScrollView?.DeselectCurrentGridProxy(), this.$cu.OnSelected(!1), this.DK1 = t.CardId, !0)
  }
  SelectNormalCardSlotByIndex(t) {
    return this.$cu.OnDeselected(!1), this.NormalSlotLoopScrollView.SelectGridProxy(t), t < 0 || t >= this.CurNormalSlotDataList.length ? (Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "SelectNormalCardSlotByIndex Error, index out of range"), !1) : (this.DK1 = this.CurNormalSlotDataList[t].SlotInfo.CardId, !0)
  }
  RefreshOutlookByCardId(e) {
    var t = this.Data.ShowOutlook && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e),
      i = this.CurCoreSlotData;
    i && e === i.SlotInfo.CardId ? (i.OutlookUnlocked = t, this.$cu.RefreshOutlookState()) : (i = this.CurNormalSlotDataList.findIndex(t => t.SlotInfo.CardId === e)) < 0 || (this.CurNormalSlotDataList[i].OutlookUnlocked = t, this.NormalSlotLoopScrollView?.UnsafeGetGridProxy(i)?.RefreshOutlookState())
  }
  GetSelectedCardId() {
    return this.DK1
  }
  SetMaskAreaEnabled(t, e) {
    var i, s = this.gZ1.get(t);
    s && s.Enabled !== e && (s.Enabled = e, i = s.Toggle, e ? this.fZ1 === t ? (s.MaskItem.SetUIActive(!1), i.SetToggleState(1, !1)) : (s.MaskItem.SetUIActive(!0), i.SetToggleState(0, !1)) : (i.SetToggleState(2, !1), this.fZ1 === t && (this.fZ1 = 0)))
  }
  SwitchMaskState(t) {
    var e, i;
    this.fZ1 !== t && (e = this.gZ1.get(t)) && e.Enabled && (e = this.gZ1.get(this.fZ1), i = this.gZ1.get(t), this.fZ1 = t, e && e.Enabled && (e.MaskItem.SetUIActive(!0), e.Toggle.SetToggleState(0, !1)), i) && i.Enabled && (i.MaskItem.SetUIActive(!1), i.Toggle.SetToggleState(1, !1))
  }
  GamepadTriggerDeckBuilderCardInfoView(e) {
    if (e === this.$cu.GetRootItem()) this.$cu.TriggerLongPress();
    else
      for (let t = 0; t < this.CurNormalSlotDataList.length; t++) {
        var i = this.NormalSlotLoopScrollView.UnsafeGetGridProxy(t);
        if (i?.GetRootItem() === e) return void i.TriggerLongPress()
      }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    return t && !(t.length <= 0) && "CardInGroup" === t[0] && (t = Number(t[1]), t = this.NormalSlotLoopScrollView?.GetGridByDisplayIndex(t)) ? [t, t] : void 0
  }
}
exports.DeckBuilderDeckSlotsPanel = DeckBuilderDeckSlotsPanel;
//# sourceMappingURL=DeckBuilderDeckSlotsPanel.js.map