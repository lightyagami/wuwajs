"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderDeckSlotsPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
const DeckBuilderCardSlotItem_1 = require("./DeckBuilderCardSlotItem");
class DeckBuilderDeckSlotsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.CurCoreSlotData = undefined;
    this.CurNormalSlotDataList = [];
    this.WTu = undefined;
    this.NormalSlotLoopScrollView = undefined;
    this.CoreElementLayout = undefined;
    this.NormalElementLayout = undefined;
    this.ZX1 = 0;
    this.keu = 0;
    this.Oeu = new Map();
    this.e61 = () => {
      var t = new DeckBuilderCardSlotItem_1.DeckBuilderCardSlotItem();
      t.CanToggleChange = this.i61;
      t.ShortClickCallback = t => {
        this.Data?.OnNormalSlotItemSortClick?.(t);
      };
      t.LongPressCallback = t => {
        this.Data?.OnNormalSlotItemLongPress?.(t);
      };
      t.OnToggleStateChange = (t, e) => {
        this.Data?.OnNormalSlotItemToggleStateChange?.(t, e);
      };
      return t;
    };
    this.i61 = t => this.Data.CanNormalSlotItemToggleChange(t);
    this.QTu = () => {
      var t = new DeckBuilderCardSlotItem_1.DeckBuilderCardSlotItem();
      t.CanToggleChange = this.KTu;
      t.ShortClickCallback = t => {
        this.Data?.OnCoreSlotItemSortClick?.(t);
      };
      t.LongPressCallback = t => {
        this.Data?.OnCoreSlotItemLongPress?.(t);
      };
      t.OnToggleStateChange = (t, e) => {
        this.Data?.OnCoreSlotItemToggleStateChange?.(t, e);
      };
      return t;
    };
    this.KTu = t => this.Data.CanCoreSlotItemToggleChange(t);
    this.jli = () => new CardElementItem_1.CardElementItem();
    this.qeu = t => {
      if (t === 1) {
        this.SwitchMaskState(2);
      }
    };
    this.XTu = t => {
      if (t === 1) {
        this.SwitchMaskState(1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [2, UE.UIItem], [9, UE.UIItem], [4, UE.UILayoutBase], [3, UE.UIText], [5, UE.UIItem], [7, UE.UIItem], [11, UE.UILayoutBase], [10, UE.UIText], [12, UE.UIItem], [13, UE.UILoopScrollViewComponent], [14, UE.UIItem], [6, UE.UIItem], [1, UE.UIExtendToggle], [8, UE.UIExtendToggle]];
  }
  async OnBeforeStartAsync() {
    this.WTu = this.QTu();
    this.NormalSlotLoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(13), this.GetItem(14).GetOwner(), this.e61, true);
    this.CoreElementLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(4), this.jli);
    this.NormalElementLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(11), this.jli);
    await Promise.all([this.WTu.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())]);
    var t = this.GetExtendToggle(1);
    var e = this.GetExtendToggle(8);
    t.SetToggleState(2);
    this.Oeu.set(1, {
      SlotType: 1,
      Toggle: t,
      MaskItem: this.GetItem(2),
      Enabled: false
    });
    e.SetToggleState(2);
    this.Oeu.set(2, {
      SlotType: 2,
      Toggle: e,
      MaskItem: this.GetItem(9),
      Enabled: false
    });
    t.OnStateChange.Add(this.XTu);
    e.OnStateChange.Add(this.qeu);
  }
  RefreshByData(t) {
    this.Data = t;
    this.RefreshCardSlot();
    this.RefreshCardSlotElements();
    this.RefreshNameText();
  }
  RefreshCardSlot(t, e = false) {
    this.RefreshCoreCardSlot(t);
    this.RefreshNormalCardSlot(t, e);
  }
  Diu(t) {
    var e = t.CardId;
    var i = this.Data.ShowLocked && !ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(e);
    return {
      SlotInfo: t,
      Locked: i,
      RedDotState: i && ModelManager_1.ModelManager.PhantomArenaModel.CanCardUnlock(e),
      OutlookUnlocked: this.Data.ShowOutlook && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e),
      NeedPlayAddAnim: false
    };
  }
  RefreshCoreCardSlot(t) {
    var e = this.Data.DeckInfo;
    var i = e.GetCoreCardSlot();
    var s = e.IsCoreCardSlotLocked();
    var h = i !== undefined;
    this.WTu.SetActive(!s && h);
    this.GetItem(5).SetUIActive(!s && !h);
    this.GetItem(6).SetUIActive(s);
    var h = i?.Count ?? 0;
    var s = e.GetCoreCardCountLimit();
    this.GetText(3).SetText(h + "/" + s);
    if (i) {
      this.CurCoreSlotData = this.Diu(i);
      if (t && t === this.CurCoreSlotData.SlotInfo.CardId) {
        this.CurCoreSlotData.NeedPlayAddAnim = true;
      }
      this.WTu.Refresh(this.CurCoreSlotData, false, 0);
    }
  }
  RefreshNormalCardSlot(t, e = false, i = 0) {
    var s = this.Data.DeckInfo;
    var h = Array.from(s.GetNormalCardSlotList());
    ModelManager_1.ModelManager.PhantomArenaModel.SortCardSlotList(h, this.Data.SortContext);
    this.CurNormalSlotDataList = [];
    for (const l of h) {
      var r = this.Diu(l);
      r.NeedPlayAddAnim = t !== undefined && t === r.SlotInfo.CardId;
      this.CurNormalSlotDataList.push(r);
    }
    const o = this.GetLoopScrollViewComponent(13).ContentUIItem;
    const a = o.GetAnchorOffsetY();
    this.NormalSlotLoopScrollView?.RefreshByData(this.CurNormalSlotDataList, false, () => {
      var t;
      if (e) {
        o.SetAnchorOffsetY(a);
      }
      if (i !== 0 && (t = this.CurNormalSlotDataList.findIndex(t => t.SlotInfo.CardId === i)) >= 0 && this.NormalSlotLoopScrollView && this.GetLoopScrollViewComponent(13)?.IsValid() && !this.NormalSlotLoopScrollView.IsGridDisplaying(t)) {
        this.NormalSlotLoopScrollView.ScrollToGridIndex(t);
      }
    });
    h = this.CurNormalSlotDataList.length > 0;
    this.GetLoopScrollViewComponent(13).RootUIComp.SetUIActive(h);
    this.GetItem(12).SetUIActive(!h);
    h = s.GetNormalCardCount();
    s = s.GetNormalCardCountLimit();
    this.GetText(10).SetText(h + "/" + s);
  }
  RefreshCardSlotElements() {
    this.YTu();
    this.y61();
  }
  YTu() {
    var t = this.Data.DeckInfo.GetCoreCardSlot();
    var e = [];
    if (t) {
      e.push(t.Element);
    }
    this.CoreElementLayout?.RefreshByData(e);
  }
  y61() {
    this.NormalElementLayout?.RefreshByData(this.Data.DeckInfo.GetElementList());
  }
  RefreshNameText() {
    this.GetText(0).SetText(this.Data.DeckInfo.GetDeckName());
  }
  RefreshBySortContext(t) {
    this.Data.SortContext = t;
    this.RefreshNormalCardSlot();
  }
  SelectCoreCardSlot() {
    var t = this.Data.DeckInfo.GetCoreCardSlot();
    return t !== undefined && (this.NormalSlotLoopScrollView?.DeselectCurrentGridProxy(), this.WTu.OnSelected(false), this.ZX1 = t.CardId, true);
  }
  SelectNormalCardSlotByIndex(t) {
    this.WTu.OnDeselected(false);
    this.NormalSlotLoopScrollView.SelectGridProxy(t);
    if (t < 0 || t >= this.CurNormalSlotDataList.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "SelectNormalCardSlotByIndex Error, index out of range");
      }
      return false;
    } else {
      this.ZX1 = this.CurNormalSlotDataList[t].SlotInfo.CardId;
      return true;
    }
  }
  RefreshOutlookByCardId(e) {
    var t = this.Data.ShowOutlook && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e);
    var i = this.CurCoreSlotData;
    if (i && e === i.SlotInfo.CardId) {
      i.OutlookUnlocked = t;
      this.WTu.RefreshOutlookState();
    } else if (!((i = this.CurNormalSlotDataList.findIndex(t => t.SlotInfo.CardId === e)) < 0)) {
      this.CurNormalSlotDataList[i].OutlookUnlocked = t;
      this.NormalSlotLoopScrollView?.UnsafeGetGridProxy(i)?.RefreshOutlookState();
    }
  }
  GetSelectedCardId() {
    return this.ZX1;
  }
  SetMaskAreaEnabled(t, e) {
    var i;
    var s = this.Oeu.get(t);
    if (s && s.Enabled !== e) {
      s.Enabled = e;
      i = s.Toggle;
      if (e) {
        if (this.keu === t) {
          s.MaskItem.SetUIActive(false);
          i.SetToggleState(1, false);
        } else {
          s.MaskItem.SetUIActive(true);
          i.SetToggleState(0, false);
        }
      } else {
        i.SetToggleState(2, false);
        if (this.keu === t) {
          this.keu = 0;
        }
      }
    }
  }
  SwitchMaskState(t) {
    var e;
    var i;
    if (this.keu !== t && (e = this.Oeu.get(t)) && e.Enabled && (e = this.Oeu.get(this.keu), i = this.Oeu.get(t), this.keu = t, e && e.Enabled && (e.MaskItem.SetUIActive(true), e.Toggle.SetToggleState(0, false)), i) && i.Enabled) {
      i.MaskItem.SetUIActive(false);
      i.Toggle.SetToggleState(1, false);
    }
  }
  GamepadTriggerDeckBuilderCardInfoView(e) {
    if (e === this.WTu.GetRootItem()) {
      this.WTu.TriggerLongPress();
    } else {
      for (let t = 0; t < this.CurNormalSlotDataList.length; t++) {
        var i = this.NormalSlotLoopScrollView.UnsafeGetGridProxy(t);
        if (i?.GetRootItem() === e) {
          i.TriggerLongPress();
          return;
        }
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0) && t[0] === "CardInGroup" && (t = Number(t[1]), t = this.NormalSlotLoopScrollView?.GetGridByDisplayIndex(t))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.DeckBuilderDeckSlotsPanel = DeckBuilderDeckSlotsPanel;
//# sourceMappingURL=DeckBuilderDeckSlotsPanel.js.map