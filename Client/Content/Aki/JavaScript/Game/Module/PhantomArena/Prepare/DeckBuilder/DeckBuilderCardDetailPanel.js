"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardDetailPanel = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem"),
  CardDetailItem_1 = require("../../Common/CardDetail/CardDetailItem"),
  DetailViewCardItem_1 = require("../../Common/CardItem/Item/DetailViewCardItem"),
  PhantomArenaController_1 = require("../../PhantomArenaController");
class DeckBuilderCardDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.eVi = void 0, this.Ept = void 0, this.nA1 = void 0, this.sA1 = void 0, this.aA1 = void 0, this.$pt = void 0, this._A1 = () => {
      this.Pe && this.Pe.AddCardToDeck && (this.Pe.AddCardToDeck(), this.RefreshDetailLockState())
    }, this.cA1 = () => {
      this.Pe && this.Pe.RemoveCardFromDeck && (this.Pe.RemoveCardFromDeck?.(), this.RefreshDetailLockState())
    }, this.dA1 = () => {
      PhantomArenaController_1.PhantomArenaController.CardUnlockRequest(this.GetCardId())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UILayoutBase],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    this.eVi = new DetailViewCardItem_1.DetailViewCardItem, this.Ept = new CardDetailItem_1.CardDetailItem, this.nA1 = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(2)), this.sA1 = new ButtonItem_1.ButtonItem, this.aA1 = new ButtonItem_1.ButtonItem, this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem()), await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.sA1.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.aA1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())])
  }
  Refresh(t) {
    this.Pe = t, this.RefreshDetailLockState(), this.eVi.Refresh(t.CardItemData), this.Ept.Refresh(this.Pe.DetailItemData), this.nA1.Refresh(this.Pe.EntryIdList)
  }
  RefreshDetailLockState() {
    var t, e;
    this.Pe?.DeckInfo ? this.Pe.IsCardUnlocked ? (this.sA1.SetActive(!0), this.sA1.SetFunction(this.cA1), this.sA1.SetLocalTextNew("PhantomBattle_1007"), this.aA1.SetActive(!0), this.aA1.SetFunction(this._A1), this.aA1.SetLocalTextNew("PhantomBattle_1008"), this.GetText(5).SetUIActive(!0), this.GetItem(6).SetUIActive(!1), e = this.Pe.DeckInfo, t = this.GetCardId(), e = e.GetCardCount(t), t = this.Pe.CardLimit - e, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1009", t), this.sA1.SetEnableClick(0 < e), this.aA1.SetEnableClick(0 < t)) : (this.aA1.SetFunction(this.dA1), this.sA1.SetActive(!1), e = {
      CardId: this.GetCardId(),
      LockTipItem: this.GetItem(6),
      LockTipText: this.GetText(7),
      TipText: this.GetText(5),
      UnlockBtnItem: this.aA1,
      IsUnLocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(this.GetCardId()),
      ShowUnlockRedDotWhenCanUnlock: !1
    }, PhantomArenaController_1.PhantomArenaController.UpdateCardDetailLockState(e)) : (this.sA1.SetActive(!1), this.aA1.SetActive(!1), this.GetText(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!1))
  }
  RefreshCardItemLockState() {
    this.eVi.RefreshIsLocked()
  }
  RefreshLockState() {
    this.RefreshDetailLockState(), this.RefreshCardItemLockState()
  }
  PlaySwitchSequence() {
    this.$pt.PlayOrReplaySequenceByName("Switch")
  }
  PlayShowSequence() {
    this.$pt.PlayOrReplaySequenceByName("Start")
  }
  GetCardId() {
    return this.Pe.CardItemData.CardId
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    return t && !(t.length <= 0) && "UnlockCard" === t[0] && (t = this.GetGuideUiItem("0")) ? [t, t] : void 0
  }
}
exports.DeckBuilderCardDetailPanel = DeckBuilderCardDetailPanel;
//# sourceMappingURL=DeckBuilderCardDetailPanel.js.map