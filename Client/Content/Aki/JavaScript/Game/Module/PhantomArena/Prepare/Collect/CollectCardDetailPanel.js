"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectCardDetailPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem");
const CardDetailItem_1 = require("../../Common/CardDetail/CardDetailItem");
const DetailViewCardItem_1 = require("../../Common/CardItem/Item/DetailViewCardItem");
const PhantomArenaController_1 = require("../../PhantomArenaController");
class CollectCardDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UX1 = -1;
    this.bs_ = undefined;
    this.keu = undefined;
    this.eVi = undefined;
    this.Ept = undefined;
    this.Oeu = undefined;
    this.$pt = undefined;
    this.qeu = () => {
      PhantomArenaController_1.PhantomArenaController.CardUnlockRequest(this.UX1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.bs_ = new ButtonItem_1.ButtonItem();
    this.keu = new ButtonItem_1.ButtonItem();
    this.eVi = new DetailViewCardItem_1.DetailViewCardItem();
    this.Ept = new CardDetailItem_1.CardDetailItem();
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.Oeu = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(2));
    await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.bs_.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.keu.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
  }
  OnStart() {
    this.keu.SetFunction(this.qeu);
  }
  Refresh(e) {
    this.UX1 = e;
    this.cHt();
    this.Wjt();
    this.Geu();
    this.zao();
  }
  cHt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewCardData(this.UX1);
    this.eVi.Refresh(e);
  }
  Wjt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewDetailItemData(this.UX1);
    this.Ept.Refresh(e);
  }
  Geu() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewEntryData(this.UX1);
    this.Oeu.Refresh(e);
  }
  zao() {
    var e = {
      CardId: this.UX1,
      LockTipItem: this.GetItem(6),
      LockTipText: this.GetText(7),
      TipText: this.GetText(5),
      UnlockBtnItem: this.keu,
      IsUnLocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(this.UX1),
      ShowUnlockRedDotWhenCanUnlock: false
    };
    PhantomArenaController_1.PhantomArenaController.UpdateCardDetailLockState(e);
    this.bs_.SetActive(false);
  }
  PlaySwitchSequence() {
    this.$pt.PlayOrReplaySequenceByName("Switch");
  }
  PlayShowSequence() {
    this.$pt.PlayOrReplaySequenceByName("Start");
  }
}
exports.CollectCardDetailPanel = CollectCardDetailPanel;
//# sourceMappingURL=CollectCardDetailPanel.js.map