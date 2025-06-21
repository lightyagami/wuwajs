"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaDeckDetailView = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem"),
  CardDetailFactorDescItem_1 = require("../../Common/CardDetail/CardDetailFactorDescItem"),
  CardDetailItem_1 = require("../../Common/CardDetail/CardDetailItem"),
  DetailViewCardItem_1 = require("../../Common/CardItem/Item/DetailViewCardItem"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  DeckBuilderDeckSlotsPanel_1 = require("../DeckBuilder/DeckBuilderDeckSlotsPanel");
class PhantomArenaDeckDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.lqe = void 0, this.eVi = void 0, this.Ept = void 0, this.nA1 = void 0, this.qK1 = void 0, this.GK1 = void 0, this.ucc = void 0, this.Puu = void 0, this.Dhu = !1, this.dA1 = () => {
      PhantomArenaController_1.PhantomArenaController.CardUnlockRequest(this.Pe.CurCardId)
    }, this.Bfu = (t, e) => {
      1 === e && this.SelectCoreCardSlot()
    }, this.Qcu = t => !0, this.kfu = (t, e) => {
      1 === e && this.SelectNormalCardSlotByIndex(t.GridIndex)
    }, this.TV1 = t => !0, this.AMo = () => {
      this.CloseMe()
    }, this.eV1 = t => {
      this.RefreshLockState()
    }, this.Wou = t => {
      "TipsHide" === t && this.RefreshEntryShowState()
    }, this.Phu = () => {
      this.ShowEntry(), this.MLt()
    }, this.XTt = () => {
      this.HideEntry(), this.TLt()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UILayoutBase],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [12, this.Phu],
      [16, this.XTt]
    ]
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam, this.lqe = new PopupCaptionItem_1.PopupCaptionItem, this.eVi = new DetailViewCardItem_1.DetailViewCardItem, this.Ept = new CardDetailItem_1.CardDetailItem, this.nA1 = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(5)), this.GK1 = new ButtonItem_1.ButtonItem, this.ucc = new ButtonItem_1.ButtonItem, this.qK1 = new DeckBuilderDeckSlotsPanel_1.DeckBuilderDeckSlotsPanel, this.Puu = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(13)), this.Puu.BindSequenceCloseEvent(this.Wou), await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.GK1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.qK1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())]), this.Pe.ShowLocked && (this.Pe.CurrencyId = ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId(), await this.lqe.SetCurrencyItemList([this.Pe.CurrencyId])), this.GK1.SetFunction(this.dA1), this.ucc.SetFunction(this.AMo), this.lqe.SetCloseCallBack(this.AMo), this.lqe.SetHelpBtnActive(!1), this.qK1.SetMaskAreaEnabled(1, !1), this.qK1.SetMaskAreaEnabled(2, !1), this.RefreshDeckSlotsPanel(), this.SelectFirstCardSlot(), this.Dhu = !1, this.RefreshEntryShowState()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1)
  }
  RefreshDeckSlotsPanel() {
    var t = {
      DeckInfo: this.Pe.DeckInfo,
      OnCoreSlotItemToggleStateChange: this.Bfu,
      CanCoreSlotItemToggleChange: this.Qcu,
      OnNormalSlotItemToggleStateChange: this.kfu,
      CanNormalSlotItemToggleChange: this.TV1,
      SortContext: {
        SortType: 1,
        IsAscending: !0
      },
      ShowLocked: this.Pe.ShowLocked,
      ShowOutlook: this.Pe.ShowLocked
    };
    this.qK1?.RefreshByData(t)
  }
  SelectFirstCardSlot() {
    this.SelectCoreCardSlot() || this.SelectNormalCardSlotByIndex(0)
  }
  SelectCoreCardSlot() {
    return !!this.qK1.SelectCoreCardSlot() && (this.Pe.CurCardId = this.qK1.GetSelectedCardId(), this.RefreshCardDetail(), !0)
  }
  SelectNormalCardSlotByIndex(t) {
    this.qK1.SelectNormalCardSlotByIndex(t), this.Pe.CurCardId = this.qK1.GetSelectedCardId(), this.RefreshCardDetail()
  }
  RefreshCardDetail() {
    var t = this.Pe.CurCardId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t),
      i = e.InitAttack,
      s = i.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility) ?? 0,
      i = i.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility) ?? 0,
      h = e.Cost,
      o = (this.Pe.IsUnlock = this.IsCardUnlock(t), this.RefreshDetailLockState(), this.Pe.ShowLocked && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(t)),
      r = o && ModelManager_1.ModelManager.PhantomArenaModel.CheckCardSpineConfigValid(t) ? 1 : 0,
      t = {
        IsLock: !this.Pe.IsUnlock,
        CardId: t,
        Cost: h,
        Attack: s,
        Life: i,
        Element: e.Element,
        CardFaceTexturePath: e.CardFaceTexture,
        CardSpineData: ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(t),
        OutlookUnlocked: o,
        CardFaceType: r
      },
      o = (this.Pe.CardItemData = t, this.eVi.Refresh(t), e.CardFactorId),
      a = [];
    for (const m of o) {
      var n = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData;
      n.FactorConfigId = m, n.IsActive = !1, a.push(n)
    }
    var r = {
        Name: e.Name,
        Cost: h,
        Attack: s,
        Life: i,
        CardDescription: e.CardEffectDescription,
        CardDescriptionParams: e.CardEffectDescriptionParams,
        FactorDataList: a
      },
      l = (this.Pe.DetailItemData = r, this.Ept.Refresh(r), []);
    l.push(...e.EntryIdList);
    for (const C of o) {
      var d = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(C).EntryId;
      0 < d && !l.includes(d) && l.push(d)
    }
    this.Pe.EntryList = l, this.nA1.Refresh(l)
  }
  IsCardUnlock(t) {
    return !this.Pe?.ShowLocked || ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(t)
  }
  RefreshDetailLockState() {
    var t = {
      CardId: this.Pe.CurCardId,
      LockTipItem: this.GetItem(14),
      LockTipText: this.GetText(15),
      TipText: this.GetText(9),
      UnlockBtnItem: this.GK1,
      IsUnLocked: this.IsCardUnlock(this.Pe.CurCardId),
      ShowUnlockRedDotWhenCanUnlock: !0
    };
    PhantomArenaController_1.PhantomArenaController.UpdateCardDetailLockState(t)
  }
  RefreshCardItemLockState() {
    this.eVi.RefreshIsLocked()
  }
  RefreshLockState() {
    var t = this.Pe.CurCardId;
    void 0 !== t && (this.Pe.IsUnlock = this.IsCardUnlock(t), this.Pe.CardItemData.IsLock = !this.Pe.IsUnlock, this.RefreshDetailLockState(), this.RefreshCardItemLockState(), this.RefreshDeckSlotsPanel())
  }
  ShowEntry() {
    this.Dhu || (this.Dhu = !0, this.Puu?.PlayOrReplaySequenceByName("TipsShow"), this.RefreshEntryShowState())
  }
  HideEntry() {
    this.Dhu && (this.Dhu = !1, this.Puu?.PlayOrReplaySequenceByName("TipsHide"))
  }
  RefreshEntryShowState() {
    this.GetItem(4).SetUIActive(this.Dhu), this.GetItem(10).SetUIActive(this.Dhu), this.GetItem(11).SetUIActive(this.Dhu)
  }
  MLt() {
    this.GetButton(16).RootUIComp.SetUIActive(!0)
  }
  TLt() {
    this.GetButton(16).RootUIComp.SetUIActive(!1)
  }
}
exports.PhantomArenaDeckDetailView = PhantomArenaDeckDetailView;
//# sourceMappingURL=PhantomArenaDeckDetailView.js.map