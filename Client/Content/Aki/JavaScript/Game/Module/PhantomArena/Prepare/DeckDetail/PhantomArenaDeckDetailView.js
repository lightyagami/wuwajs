"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDeckDetailView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem");
const CardDetailFactorDescItem_1 = require("../../Common/CardDetail/CardDetailFactorDescItem");
const CardDetailItem_1 = require("../../Common/CardDetail/CardDetailItem");
const DetailViewCardItem_1 = require("../../Common/CardItem/Item/DetailViewCardItem");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const DeckBuilderDeckSlotsPanel_1 = require("../DeckBuilder/DeckBuilderDeckSlotsPanel");
class PhantomArenaDeckDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.lqe = undefined;
    this.eVi = undefined;
    this.Ept = undefined;
    this.DA1 = undefined;
    this.rY1 = undefined;
    this.oY1 = undefined;
    this.ucc = undefined;
    this.G7c = undefined;
    this.fgu = false;
    this.NA1 = () => {
      PhantomArenaController_1.PhantomArenaController.CardUnlockRequest(this.Pe.CurCardId);
    };
    this.sOu = (t, e) => {
      if (e === 1) {
        this.SelectCoreCardSlot();
      }
    };
    this.KTu = t => true;
    this.aOu = (t, e) => {
      if (e === 1) {
        this.SelectNormalCardSlotByIndex(t.GridIndex);
      }
    };
    this.i61 = t => true;
    this.AMo = () => {
      this.CloseMe();
    };
    this.PV1 = t => {
      this.RefreshLockState();
    };
    this.Dlu = t => {
      if (t === "TipsHide") {
        this.RefreshEntryShowState();
      }
    };
    this.cgu = () => {
      this.ShowEntry();
      this.MLt();
    };
    this.XTt = () => {
      this.HideEntry();
      this.TLt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIButtonComponent]];
    this.BtnBindInfo = [[12, this.cgu], [16, this.XTt]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.eVi = new DetailViewCardItem_1.DetailViewCardItem();
    this.Ept = new CardDetailItem_1.CardDetailItem();
    this.DA1 = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(5));
    this.oY1 = new ButtonItem_1.ButtonItem();
    this.ucc = new ButtonItem_1.ButtonItem();
    this.rY1 = new DeckBuilderDeckSlotsPanel_1.DeckBuilderDeckSlotsPanel();
    this.G7c = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(13));
    this.G7c.BindSequenceCloseEvent(this.Dlu);
    await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.oY1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.rY1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())]);
    if (this.Pe.ShowLocked) {
      this.Pe.CurrencyId = ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId();
      await this.lqe.SetCurrencyItemList([this.Pe.CurrencyId]);
    }
    this.oY1.SetFunction(this.NA1);
    this.ucc.SetFunction(this.AMo);
    this.lqe.SetCloseCallBack(this.AMo);
    this.lqe.SetHelpBtnActive(false);
    this.rY1.SetMaskAreaEnabled(1, false);
    this.rY1.SetMaskAreaEnabled(2, false);
    this.RefreshDeckSlotsPanel();
    this.SelectFirstCardSlot();
    this.fgu = false;
    this.RefreshEntryShowState();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
  }
  RefreshDeckSlotsPanel() {
    var t = {
      DeckInfo: this.Pe.DeckInfo,
      OnCoreSlotItemToggleStateChange: this.sOu,
      CanCoreSlotItemToggleChange: this.KTu,
      OnNormalSlotItemToggleStateChange: this.aOu,
      CanNormalSlotItemToggleChange: this.i61,
      SortContext: {
        SortType: 1,
        IsAscending: true
      },
      ShowLocked: this.Pe.ShowLocked,
      ShowOutlook: this.Pe.ShowLocked
    };
    this.rY1?.RefreshByData(t);
  }
  SelectFirstCardSlot() {
    if (!this.SelectCoreCardSlot()) {
      this.SelectNormalCardSlotByIndex(0);
    }
  }
  SelectCoreCardSlot() {
    return !!this.rY1.SelectCoreCardSlot() && (this.Pe.CurCardId = this.rY1.GetSelectedCardId(), this.RefreshCardDetail(), true);
  }
  SelectNormalCardSlotByIndex(t) {
    this.rY1.SelectNormalCardSlotByIndex(t);
    this.Pe.CurCardId = this.rY1.GetSelectedCardId();
    this.RefreshCardDetail();
  }
  RefreshCardDetail() {
    var t = this.Pe.CurCardId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t);
    var i = e.InitAttack;
    var s = i.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility) ?? 0;
    var i = i.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility) ?? 0;
    var h = e.Cost;
    this.Pe.IsUnlock = this.IsCardUnlock(t);
    this.RefreshDetailLockState();
    var o = this.Pe.ShowLocked && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(t);
    var r = o && ModelManager_1.ModelManager.PhantomArenaModel.CheckCardSpineConfigValid(t) ? 1 : 0;
    var t = {
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
    };
    this.Pe.CardItemData = t;
    this.eVi.Refresh(t);
    var o = e.CardFactorId;
    var a = [];
    for (const m of o) {
      var n = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      n.FactorConfigId = m;
      n.IsActive = false;
      a.push(n);
    }
    var r = {
      Name: e.Name,
      Cost: h,
      Attack: s,
      Life: i,
      CardDescription: e.CardEffectDescription,
      CardDescriptionParams: e.CardEffectDescriptionParams,
      FactorDataList: a
    };
    this.Pe.DetailItemData = r;
    this.Ept.Refresh(r);
    var l = [];
    l.push(...e.EntryIdList);
    for (const C of o) {
      var d = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(C).EntryId;
      if (d > 0 && !l.includes(d)) {
        l.push(d);
      }
    }
    this.Pe.EntryList = l;
    this.DA1.Refresh(l);
  }
  IsCardUnlock(t) {
    return !this.Pe?.ShowLocked || ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(t);
  }
  RefreshDetailLockState() {
    var t = {
      CardId: this.Pe.CurCardId,
      LockTipItem: this.GetItem(14),
      LockTipText: this.GetText(15),
      TipText: this.GetText(9),
      UnlockBtnItem: this.oY1,
      IsUnLocked: this.IsCardUnlock(this.Pe.CurCardId),
      ShowUnlockRedDotWhenCanUnlock: true
    };
    PhantomArenaController_1.PhantomArenaController.UpdateCardDetailLockState(t);
  }
  RefreshCardItemLockState() {
    this.eVi.RefreshIsLocked();
  }
  RefreshLockState() {
    var t = this.Pe.CurCardId;
    if (t !== undefined) {
      this.Pe.IsUnlock = this.IsCardUnlock(t);
      this.Pe.CardItemData.IsLock = !this.Pe.IsUnlock;
      this.RefreshDetailLockState();
      this.RefreshCardItemLockState();
      this.RefreshDeckSlotsPanel();
    }
  }
  ShowEntry() {
    if (!this.fgu) {
      this.fgu = true;
      this.G7c?.PlayOrReplaySequenceByName("TipsShow");
      this.RefreshEntryShowState();
    }
  }
  HideEntry() {
    if (this.fgu) {
      this.fgu = false;
      this.G7c?.PlayOrReplaySequenceByName("TipsHide");
    }
  }
  RefreshEntryShowState() {
    this.GetItem(4).SetUIActive(this.fgu);
    this.GetItem(10).SetUIActive(this.fgu);
    this.GetItem(11).SetUIActive(this.fgu);
  }
  MLt() {
    this.GetButton(16).RootUIComp.SetUIActive(true);
  }
  TLt() {
    this.GetButton(16).RootUIComp.SetUIActive(false);
  }
}
exports.PhantomArenaDeckDetailView = PhantomArenaDeckDetailView;
//# sourceMappingURL=PhantomArenaDeckDetailView.js.map