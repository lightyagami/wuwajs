"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleTips = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  PhantomArenaCard_1 = require("../../Card/PhantomArenaCard"),
  PhantomArenaBattleDetailsTips_1 = require("./PhantomArenaBattleDetailsTips");
class PhantomArenaBattleTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Sequence = void 0, this.CardItem = void 0, this.DetailsTipsItem = void 0, this.IsInActive = !1, this.Nno = t => {
      "Close" === t && this.SetActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem]
    ]
  }
  async InitCardItem() {
    this.CardItem = new PhantomArenaCard_1.PhantomArenaCard, await this.CardItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
  }
  async InitDetailsTipsItem() {
    this.DetailsTipsItem = new PhantomArenaBattleDetailsTips_1.PhantomArenaBattleDetailsTips, this.DetailsTipsItem.SetMaskAttach(this.RootItem), await this.DetailsTipsItem.CreateThenShowByResourceIdAsync("PnlCardTips", this.GetItem(1)), this.DetailsTipsItem.SetPivotAndResetOffset(0, 1)
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitCardItem(), this.InitDetailsTipsItem()])
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno)
  }
  OnBeforeDestroy() {
    this.Sequence.Clear()
  }
  RefreshTips(t) {
    this.CardItem.Refresh(t), this.DetailsTipsItem.RefreshByCardData(t)
  }
  SetTipsActive(t) {
    this.IsInActive !== t && (this.IsInActive = t, this.IsInActive ? (this.SetActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequence("Start")) : (this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequence("Close")))
  }
  GetCardId() {
    return this.CardItem.Data.CardId
  }
  RefreshContent() {
    this.DetailsTipsItem.RefreshByCardData(this.CardItem.Data)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (t && !(t.length <= 0)) return "CardEffect" === (e = t[0]) || "CardAttr" === e ? this.DetailsTipsItem?.GetGuideUiItemAndUiItemForShowEx(t) : "DetailCard" === e ? this.CardItem?.GetGuideUiItemAndUiItemForShowEx(t) : void 0
  }
}
exports.PhantomArenaBattleTips = PhantomArenaBattleTips;
//# sourceMappingURL=PhantomArenaBattleTips.js.map