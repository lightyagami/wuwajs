"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleTips = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
const PhantomArenaBattleDetailsTips_1 = require("./PhantomArenaBattleDetailsTips");
class PhantomArenaBattleTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.CardItem = undefined;
    this.DetailsTipsItem = undefined;
    this.IsInActive = false;
    this.Nno = t => {
      if (t === "Close") {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async InitCardItem() {
    this.CardItem = new PhantomArenaCard_1.PhantomArenaCard();
    await this.CardItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async InitDetailsTipsItem() {
    this.DetailsTipsItem = new PhantomArenaBattleDetailsTips_1.PhantomArenaBattleDetailsTips();
    this.DetailsTipsItem.SetMaskAttach(this.RootItem);
    await this.DetailsTipsItem.CreateThenShowByResourceIdAsync("PnlCardTips", this.GetItem(1));
    this.DetailsTipsItem.SetPivotAndResetOffset(0, 1);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitCardItem(), this.InitDetailsTipsItem()]);
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  RefreshTips(t, e) {
    this.CardItem.SetUiActive(e);
    this.CardItem.Refresh(t);
    this.DetailsTipsItem.RefreshByCardData(t);
  }
  SetTipsActive(t) {
    if (this.IsInActive !== t) {
      this.IsInActive = t;
      if (this.IsInActive) {
        this.SetActive(true);
        this.Sequence.StopPrevSequence(false, true);
        this.Sequence.PlaySequence("Start");
      } else {
        this.Sequence.StopPrevSequence(false, true);
        this.Sequence.PlaySequence("Close");
      }
    }
  }
  GetCardId() {
    return this.CardItem.Data.CardId;
  }
  RefreshContent() {
    this.DetailsTipsItem.RefreshByCardData(this.CardItem.Data);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (t && !(t.length <= 0)) {
      if ((e = t[0]) === "CardEffect" || e === "CardAttr" || e === "CardFullInfo") {
        return this.DetailsTipsItem?.GetGuideUiItemAndUiItemForShowEx(t);
      } else if (e === "DetailCard") {
        return this.CardItem?.GetGuideUiItemAndUiItemForShowEx(t);
      } else {
        return undefined;
      }
    }
  }
}
exports.PhantomArenaBattleTips = PhantomArenaBattleTips;
//# sourceMappingURL=PhantomArenaBattleTips.js.map