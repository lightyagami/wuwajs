"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardDetailPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem");
const CardDetailItem_1 = require("../../Common/CardDetail/CardDetailItem");
const DetailViewCardItem_1 = require("../../Common/CardItem/Item/DetailViewCardItem");
const PhantomArenaController_1 = require("../../PhantomArenaController");
class DeckBuilderCardDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.eVi = undefined;
    this.Ept = undefined;
    this.DA1 = undefined;
    this.UA1 = undefined;
    this.BA1 = undefined;
    this.$pt = undefined;
    this.qA1 = () => {
      if (this.Pe && this.Pe.AddCardToDeck) {
        this.Pe.AddCardToDeck();
        this.RefreshDetailLockState();
      }
    };
    this.FA1 = () => {
      if (this.Pe && this.Pe.RemoveCardFromDeck) {
        this.Pe.RemoveCardFromDeck?.();
        this.RefreshDetailLockState();
      }
    };
    this.NA1 = () => {
      PhantomArenaController_1.PhantomArenaController.CardUnlockRequest(this.GetCardId());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.eVi = new DetailViewCardItem_1.DetailViewCardItem();
    this.Ept = new CardDetailItem_1.CardDetailItem();
    this.DA1 = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(2));
    this.UA1 = new ButtonItem_1.ButtonItem();
    this.BA1 = new ButtonItem_1.ButtonItem();
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.UA1.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.BA1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
  }
  Refresh(t) {
    this.Pe = t;
    this.RefreshDetailLockState();
    this.eVi.Refresh(t.CardItemData);
    this.Ept.Refresh(this.Pe.DetailItemData);
    this.DA1.Refresh(this.Pe.EntryIdList);
  }
  RefreshDetailLockState() {
    var t;
    var e;
    if (this.Pe?.DeckInfo) {
      if (this.Pe.IsCardUnlocked) {
        this.UA1.SetActive(true);
        this.UA1.SetFunction(this.FA1);
        this.UA1.SetLocalTextNew("PhantomBattle_1007");
        this.BA1.SetActive(true);
        this.BA1.SetFunction(this.qA1);
        this.BA1.SetLocalTextNew("PhantomBattle_1008");
        this.GetText(5).SetUIActive(true);
        this.GetItem(6).SetUIActive(false);
        e = this.Pe.DeckInfo;
        t = this.GetCardId();
        e = e.GetCardCount(t);
        t = this.Pe.CardLimit - e;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1009", t);
        this.UA1.SetEnableClick(e > 0);
        this.BA1.SetEnableClick(t > 0);
      } else {
        this.BA1.SetFunction(this.NA1);
        this.UA1.SetActive(false);
        e = {
          CardId: this.GetCardId(),
          LockTipItem: this.GetItem(6),
          LockTipText: this.GetText(7),
          TipText: this.GetText(5),
          UnlockBtnItem: this.BA1,
          IsUnLocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(this.GetCardId()),
          ShowUnlockRedDotWhenCanUnlock: false
        };
        PhantomArenaController_1.PhantomArenaController.UpdateCardDetailLockState(e);
      }
    } else {
      this.UA1.SetActive(false);
      this.BA1.SetActive(false);
      this.GetText(5).SetUIActive(false);
      this.GetItem(6).SetUIActive(false);
    }
  }
  RefreshCardItemLockState() {
    this.eVi.RefreshIsLocked();
  }
  RefreshLockState() {
    this.RefreshDetailLockState();
    this.RefreshCardItemLockState();
  }
  PlaySwitchSequence() {
    this.$pt.PlayOrReplaySequenceByName("Switch");
  }
  PlayShowSequence() {
    this.$pt.PlayOrReplaySequenceByName("Start");
  }
  GetCardId() {
    return this.Pe.CardItemData.CardId;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0) && t[0] === "UnlockCard" && (t = this.GetGuideUiItem("0"))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.DeckBuilderCardDetailPanel = DeckBuilderCardDetailPanel;
//# sourceMappingURL=DeckBuilderCardDetailPanel.js.map