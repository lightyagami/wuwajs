"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CollectCardDetailPanel = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem"),
  CardDetailItem_1 = require("../../Common/CardDetail/CardDetailItem"),
  DetailViewCardItem_1 = require("../../Common/CardItem/Item/DetailViewCardItem"),
  PhantomArenaController_1 = require("../../PhantomArenaController");
class CollectCardDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.FK1 = -1, this.bs_ = void 0, this.NZ1 = void 0, this.eVi = void 0, this.Ept = void 0, this.VZ1 = void 0, this.$pt = void 0, this.jZ1 = () => {
      PhantomArenaController_1.PhantomArenaController.CardUnlockRequest(this.FK1)
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
    this.bs_ = new ButtonItem_1.ButtonItem, this.NZ1 = new ButtonItem_1.ButtonItem, this.eVi = new DetailViewCardItem_1.DetailViewCardItem, this.Ept = new CardDetailItem_1.CardDetailItem, this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem()), this.VZ1 = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(2)), await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Ept.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.bs_.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.NZ1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())])
  }
  OnStart() {
    this.NZ1.SetFunction(this.jZ1)
  }
  Refresh(e) {
    this.FK1 = e, this.cHt(), this.Wjt(), this.HZ1(), this.zao()
  }
  cHt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewCardData(this.FK1);
    this.eVi.Refresh(e)
  }
  Wjt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewDetailItemData(this.FK1);
    this.Ept.Refresh(e)
  }
  HZ1() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewEntryData(this.FK1);
    this.VZ1.Refresh(e)
  }
  zao() {
    var e = {
      CardId: this.FK1,
      LockTipItem: this.GetItem(6),
      LockTipText: this.GetText(7),
      TipText: this.GetText(5),
      UnlockBtnItem: this.NZ1,
      IsUnLocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(this.FK1),
      ShowUnlockRedDotWhenCanUnlock: !1
    };
    PhantomArenaController_1.PhantomArenaController.UpdateCardDetailLockState(e), this.bs_.SetActive(!1)
  }
  PlaySwitchSequence() {
    this.$pt.PlayOrReplaySequenceByName("Switch")
  }
  PlayShowSequence() {
    this.$pt.PlayOrReplaySequenceByName("Start")
  }
}
exports.CollectCardDetailPanel = CollectCardDetailPanel;
//# sourceMappingURL=CollectCardDetailPanel.js.map