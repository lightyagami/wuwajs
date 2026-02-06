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
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem");
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
    this.bYm = (t, e) => {
      if (e === 1) {
        this.SelectFieldCardSlot();
      }
    };
    this.gYm = t => true;
    this.aOu = (t, e) => {
      if (e === 1) {
        this.SelectNormalCardSlotByIndex(t.GridIndex);
      }
    };
    this.i61 = t => true;
    this.AMo = () => {
      this.CloseMe();
    };
    this.tWt = () => {
      let t = false;
      const e = this.Pe.DeckInfo.DeepCopy();
      e.RemoveAllCard();
      for (const o of this.Pe.DeckInfo.GetCardSlotList()) {
        var i;
        if (ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(o.CardId)) {
          i = {
            CardId: o.CardId,
            Cost: o.Cost,
            Element: o.Element,
            MaxCount: o.Count,
            AddCount: o.Count,
            CardType: o.CardType
          };
          e.AddCard(i);
        } else {
          t = true;
        }
      }
      var s = t ? 413 : 412;
      var s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(s);
      s.FunctionMap.set(2, () => {
        this.Pe.SaveRecommendDeckCallback(e);
        this.CloseMe();
      });
      var h = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.Pe.ActivityId);
      PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(s, h);
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
    this.eVi.IsNewPhantomArenaActivity = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.Pe.ActivityId);
    this.Ept = new CardDetailItem_1.CardDetailItem();
    this.DA1 = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(5));
    this.oY1 = new ButtonItem_1.ButtonItem();
    this.ucc = new ButtonItem_1.ButtonItem();
    this.rY1 = new DeckBuilderDeckSlotsPanel_1.DeckBuilderDeckSlotsPanel();
    this.G7c = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(13));
    this.G7c.BindSequenceCloseEvent(this.Dlu);
    await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.oY1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.rY1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())]);
    if (this.Pe.ShowLocked) {
      this.Pe.CurrencyId = ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId(this.Pe.ActivityId);
      await this.lqe.SetCurrencyItemList([this.Pe.CurrencyId]);
    }
    this.oY1.SetFunction(this.NA1);
    if (this.Pe.IsRecommend) {
      this.ucc.SetLocalTextNew("PhantomBattle_1136");
      this.ucc.SetFunction(this.tWt);
    } else {
      this.ucc.SetLocalTextNew("PrefabTextItem_1418254434_Text");
      this.ucc.SetFunction(this.AMo);
    }
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
    var t = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.Pe.ActivityId);
    var t = {
      DeckInfo: this.Pe.DeckInfo,
      OnCoreSlotItemToggleStateChange: this.sOu,
      CanCoreSlotItemToggleChange: this.KTu,
      OnNormalSlotItemToggleStateChange: this.aOu,
      CanNormalSlotItemToggleChange: this.i61,
      OnFieldSlotItemToggleStateChange: this.bYm,
      CanFieldSlotItemToggleChange: this.gYm,
      SortContext: {
        SortType: 1,
        IsAscending: true
      },
      ShowLocked: this.Pe.ShowLocked,
      ShowOutlook: this.Pe.ShowLocked,
      IsNeedFieldCard: t,
      IsNeedRequestCheckCardSkillUnlock: true
    };
    this.rY1?.RefreshByData(t);
  }
  SelectFirstCardSlot() {
    if (!this.SelectCoreCardSlot()) {
      this.SelectNormalCardSlotByIndex(0);
    }
  }
  SelectFieldCardSlot() {
    return !!this.rY1.SelectFieldCardSlot() && (this.Pe.CurCardId = this.rY1.GetSelectedCardId(), this.RefreshCardDetail(), true);
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
    var h = {
      IsLock: !this.Pe.IsUnlock,
      CardId: t,
      Cost: h,
      Attack: s,
      Life: i,
      Element: e.Element,
      CardFaceTexturePath: e.CardFaceTexture,
      CardSpineData: ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(t),
      OutlookUnlocked: o,
      CardFaceType: r,
      CardType: e.Type
    };
    this.Pe.CardItemData = h;
    this.eVi.Refresh(h);
    var s = e.CardFactorId;
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewDetailItemData(t, this.Pe.DeckInfo);
    this.Pe.DetailItemData = i;
    this.Ept.Refresh(i);
    var a = [];
    a.push(...e.EntryIdList);
    for (const l of s) {
      var n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(l).EntryId;
      if (n > 0 && !a.includes(n)) {
        a.push(n);
      }
    }
    this.Pe.EntryList = a;
    this.DA1.Refresh(a);
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