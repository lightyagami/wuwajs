"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderDeckSlotsPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const DeckBuilderCardSlotItem_1 = require("./DeckBuilderCardSlotItem");
const DeckBuilderFieldCardItem_1 = require("./DeckBuilderFieldCardItem");
const ITEM_LOCATION_TOLERANCE = 0.1;
class DeckBuilderDeckSlotsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.CurCoreSlotData = undefined;
    this.CurFieldSlotData = undefined;
    this.CurNormalSlotDataList = [];
    this.WTu = undefined;
    this.WQm = undefined;
    this.NormalSlotScrollLayout = undefined;
    this.CoreElementLayout = undefined;
    this.NormalElementLayout = undefined;
    this.ZX1 = 0;
    this.keu = 0;
    this.Oeu = new Map();
    this.QQm = t => {
      this.RefreshFieldCardEffectUnlock(t);
    };
    this.e61 = () => {
      var t = new DeckBuilderCardSlotItem_1.DeckBuilderCardSlotItem();
      t.LongPressStartTime = this.Data?.SlotLongPressStartTime ?? 0;
      t.LongPressEndTime = this.Data?.SlotLongPressEndTime ?? 0;
      t.CanToggleChange = this.i61;
      t.ShortClickCallback = t => {
        this.Data?.OnNormalSlotItemSortClick?.(t);
      };
      t.LongPressCallback = (t, i) => {
        this.Data?.OnNormalSlotItemLongPress?.(t, i);
      };
      t.LongPressEndCallback = this.Data?.OnSlotItemLongPressEnd;
      t.OnToggleStateChange = (t, i) => {
        this.Data?.OnNormalSlotItemToggleStateChange?.(t, i);
      };
      t.OnPointEnterCallback = t => {
        this.Data?.OnSlotCardPointEnterCallback?.(t);
      };
      t.OnPointExitCallback = () => {
        this.Data?.OnSlotCardPointExitCallback?.();
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
      t.LongPressCallback = (t, i) => {
        this.Data?.OnCoreSlotItemLongPress?.(t, i);
      };
      t.LongPressEndCallback = () => {
        this.Data?.OnSlotItemLongPressEnd?.();
      };
      t.OnToggleStateChange = (t, i) => {
        this.Data?.OnCoreSlotItemToggleStateChange?.(t, i);
      };
      t.OnPointEnterCallback = t => {
        this.Data?.OnSlotCardPointEnterCallback?.(t);
      };
      t.OnPointExitCallback = () => {
        this.Data?.OnSlotCardPointExitCallback?.();
      };
      return t;
    };
    this.KTu = t => this.Data.CanCoreSlotItemToggleChange(t);
    this.KQm = () => {
      var t = new DeckBuilderCardSlotItem_1.DeckBuilderCardSlotItem();
      t.CanToggleChange = this.XQm;
      t.ShortClickCallback = t => {
        this.Data?.OnCoreSlotItemSortClick?.(t);
      };
      t.LongPressCallback = (t, i) => {
        this.Data?.OnCoreSlotItemLongPress?.(t, i);
      };
      t.LongPressEndCallback = () => {
        this.Data?.OnSlotItemLongPressEnd?.();
      };
      t.OnToggleStateChange = (t, i) => {
        this.Data?.OnFieldSlotItemToggleStateChange?.(t, i);
      };
      t.OnPointEnterCallback = t => {
        this.Data?.OnSlotCardPointEnterCallback?.(t);
      };
      t.OnPointExitCallback = () => {
        this.Data?.OnSlotCardPointExitCallback?.();
      };
      return t;
    };
    this.XQm = t => this.Data.CanFieldSlotItemToggleChange(t);
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
    this.ComponentRegisterInfos = [[0, UE.UIText], [2, UE.UIItem], [9, UE.UIItem], [4, UE.UILayoutBase], [3, UE.UIText], [5, UE.UIItem], [7, UE.UIItem], [11, UE.UILayoutBase], [10, UE.UIText], [12, UE.UIItem], [13, UE.UIScrollViewWithScrollbarComponent], [14, UE.UIVerticalLayout], [15, UE.UIItem], [6, UE.UIItem], [1, UE.UIExtendToggle], [8, UE.UIExtendToggle], [16, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.WTu = this.QTu();
    this.NormalSlotScrollLayout = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(13), this.e61, undefined, false, this.GetVerticalLayout(14));
    this.CoreElementLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(4), this.jli);
    this.NormalElementLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(11), this.jli);
    var t = [];
    if (this.GetItem(16)) {
      this.WQm = new DeckBuilderFieldCardItem_1.DeckBuilderFieldCardItem();
      this.WQm.FieldSlotItem = this.KQm();
      t.push(this.WQm.CreateThenShowByActorAsync(this.GetItem(16).GetOwner()));
    }
    t.push(this.WTu.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(t);
    var t = this.GetExtendToggle(1);
    var i = this.GetExtendToggle(8);
    t.SetToggleState(2);
    this.Oeu.set(1, {
      SlotType: 1,
      Toggle: t,
      MaskItem: this.GetItem(2),
      Enabled: false
    });
    i.SetToggleState(2);
    this.Oeu.set(2, {
      SlotType: 2,
      Toggle: i,
      MaskItem: this.GetItem(9),
      Enabled: false
    });
    t.OnStateChange.Add(this.XTu);
    i.OnStateChange.Add(this.qeu);
  }
  RefreshByData(t) {
    this.Data = t;
    if (this.WQm) {
      this.WQm.OnEffectBtnClickCallback = this.Data.OnFieldCardItemEffectBtnClick;
      this.WQm.FieldSlotItem.LongPressStartTime = this.Data?.SlotLongPressStartTime ?? 0;
      this.WQm.FieldSlotItem.LongPressEndTime = this.Data?.SlotLongPressEndTime ?? 0;
    }
    if (this.WTu) {
      this.WTu.LongPressStartTime = this.Data?.SlotLongPressStartTime ?? 0;
      this.WTu.LongPressEndTime = this.Data?.SlotLongPressEndTime ?? 0;
    }
    if (t.IsNeedRequestCheckCardSkillUnlock) {
      PhantomArenaController_1.PhantomArenaController.RequestCheckCardSkillUnlock(t.DeckInfo, this.QQm);
    }
    this.RefreshCardSlot();
    this.RefreshCardSlotElements();
    this.RefreshNameText();
  }
  RefreshCardSlot(t, i = false) {
    this.RefreshCoreCardSlot(t);
    this.RefreshFieldCardSlot(t);
    this.RefreshNormalCardSlot(t, i);
  }
  Diu(t) {
    var i = t.CardId;
    var e = this.Data.ShowLocked && !ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(i);
    return {
      SlotInfo: t,
      Locked: e,
      RedDotState: e && ModelManager_1.ModelManager.PhantomArenaModel.CanCardUnlock(i),
      OutlookUnlocked: this.Data.ShowOutlook && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(i),
      NeedPlayAddAnim: false
    };
  }
  RefreshCoreCardSlot(t) {
    var i = this.Data.DeckInfo;
    var e = i.GetCoreCardSlot();
    var s = i.IsCoreCardSlotLocked();
    var h = e !== undefined;
    this.WTu.SetActive(!s && h);
    this.GetItem(5).SetUIActive(!s && !h);
    this.GetItem(6).SetUIActive(s);
    var h = e?.Count ?? 0;
    var s = i.GetCoreCardCountLimit();
    this.GetText(3).SetText(h + "/" + s);
    if (e) {
      this.CurCoreSlotData = this.Diu(e);
      if (t && t === this.CurCoreSlotData.SlotInfo.CardId) {
        this.CurCoreSlotData.NeedPlayAddAnim = true;
      }
      this.WTu.Refresh(this.CurCoreSlotData, false, 0);
    }
  }
  RefreshFieldCardSlot(t) {
    var i;
    if (this.Data.IsNeedFieldCard) {
      this.WQm?.SetUiActive(true);
      i = this.Data.DeckInfo;
      this.WQm?.RefreshItem(i, t);
      if (i = i.GetFieldCardSlot()) {
        i = this.Diu(i);
        if (t && t === i.SlotInfo.CardId) {
          i.NeedPlayAddAnim = true;
        }
        this.WQm?.RefreshSlotItem(i);
      }
    } else {
      this.WQm?.SetUiActive(false);
    }
  }
  RefreshNormalCardSlot(t, i = 0, e = 0) {
    var s = this.Data.DeckInfo;
    var h = Array.from(s.GetNormalCardSlotList());
    ModelManager_1.ModelManager.PhantomArenaModel.SortCardSlotList(h, this.Data.SortContext);
    this.CurNormalSlotDataList = [];
    for (const a of h) {
      var r = this.Diu(a);
      r.NeedPlayAddAnim = t !== undefined && t === r.SlotInfo.CardId;
      this.CurNormalSlotDataList.push(r);
    }
    this.NormalSlotScrollLayout?.RefreshByData(this.CurNormalSlotDataList, () => {
      var t;
      if (e !== 0 && !((t = this.CurNormalSlotDataList.findIndex(t => t.SlotInfo.CardId === e)) < 0)) {
        if ((t = this.NormalSlotScrollLayout.GetItemByIndex(t)) && this.NormalSlotScrollLayout.IsItemInViewport(t, ITEM_LOCATION_TOLERANCE) !== 0) {
          this.NormalSlotScrollLayout.ScrollTo(t);
        }
      }
    });
    h = this.CurNormalSlotDataList.length > 0;
    this.GetVerticalLayout(14).RootUIComp.SetUIActive(h);
    this.GetItem(12).SetUIActive(!h);
    h = s.GetNormalCardCount();
    s = s.GetNormalCardCountLimit();
    this.GetText(10).SetText(h + "/" + s);
  }
  RefreshFieldCardEffectUnlock(t) {
    var i;
    var e = this.Data.DeckInfo.GetFieldCardSlot();
    if (e && this.WQm) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.CardId);
      i = t.Vqm >= t.Nqm ? e.FieldConditionDesc : e.FieldUnlockConditionDesc;
      t = {
        CurrentProgress: t.Vqm,
        MaxProgress: t.Nqm,
        Icon: e.FieldConditionIcon,
        ConditionDesc: i
      };
      this.WQm?.RefreshEffectUnlock(t);
    }
  }
  RefreshCardSlotElements() {
    this.YTu();
    this.y61();
  }
  YTu() {
    var t = this.Data.DeckInfo.GetCoreCardSlot();
    var i = [];
    if (t) {
      i.push(t.Element);
    }
    this.CoreElementLayout?.RefreshByData(i);
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
  SelectFieldCardSlot() {
    var t = this.Data.DeckInfo.GetFieldCardSlot();
    return t !== undefined && (this.NormalSlotScrollLayout?.SelectGridProxy(), this.WTu.OnDeselected(false), this.ZX1 = t.CardId, true);
  }
  SelectCoreCardSlot() {
    var t = this.Data.DeckInfo.GetCoreCardSlot();
    return t !== undefined && (this.NormalSlotScrollLayout?.SelectGridProxy(), this.WQm?.FieldSlotItem?.OnDeselected(false), this.WTu.OnSelected(false), this.ZX1 = t.CardId, true);
  }
  SelectNormalCardSlotByIndex(t) {
    this.WTu.OnDeselected(false);
    this.WQm?.FieldSlotItem?.OnDeselected(false);
    this.NormalSlotScrollLayout.SelectGridProxy(t);
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
  RefreshOutlookByCardId(i) {
    var t = this.Data.ShowOutlook && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(i);
    var e = this.CurCoreSlotData;
    if (e && i === e.SlotInfo.CardId) {
      e.OutlookUnlocked = t;
      this.WTu.RefreshOutlookState();
    } else if (!((e = this.CurNormalSlotDataList.findIndex(t => t.SlotInfo.CardId === i)) < 0)) {
      this.CurNormalSlotDataList[e].OutlookUnlocked = t;
      this.NormalSlotScrollLayout.GetScrollItemByIndex(e)?.RefreshOutlookState();
    }
  }
  GetSelectedCardId() {
    return this.ZX1;
  }
  SetMaskAreaEnabled(t, i) {
    var e;
    var s = this.Oeu.get(t);
    if (s && s.Enabled !== i) {
      s.Enabled = i;
      e = s.Toggle;
      if (i) {
        if (this.keu === t) {
          s.MaskItem.SetUIActive(false);
          e.SetToggleState(1, false);
        } else {
          s.MaskItem.SetUIActive(true);
          e.SetToggleState(0, false);
        }
      } else {
        e.SetToggleState(2, false);
        if (this.keu === t) {
          this.keu = 0;
        }
      }
    }
  }
  SwitchMaskState(t) {
    var i;
    var e;
    if (this.keu !== t && (i = this.Oeu.get(t)) && i.Enabled && (i = this.Oeu.get(this.keu), e = this.Oeu.get(t), this.keu = t, i && i.Enabled && (i.MaskItem.SetUIActive(true), i.Toggle.SetToggleState(0, false)), e) && e.Enabled) {
      e.MaskItem.SetUIActive(false);
      e.Toggle.SetToggleState(1, false);
    }
  }
  GamepadTriggerDeckBuilderCardInfoView(i) {
    if (i === this.WTu.GetRootItem()) {
      this.WTu.TriggerLongPress();
    } else {
      for (let t = 0; t < this.CurNormalSlotDataList.length; t++) {
        var e = this.NormalSlotScrollLayout.GetScrollItemByIndex(t);
        if (e?.GetRootItem() === i) {
          e.TriggerLongPress();
          return;
        }
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0) && t[0] === "CardInGroup" && (t = Number(t[1]), t = this.NormalSlotScrollLayout?.GetItemByIndex(t))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.DeckBuilderDeckSlotsPanel = DeckBuilderDeckSlotsPanel;
//# sourceMappingURL=DeckBuilderDeckSlotsPanel.js.map