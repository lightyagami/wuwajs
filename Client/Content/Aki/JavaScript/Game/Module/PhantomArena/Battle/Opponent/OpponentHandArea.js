"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpponentHandArea = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  OpponentHandCardItem_1 = require("./OpponentHandCardItem");
class OpponentHandArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.TotalWidth = 0, this.TotalHeight = 0, this.OriginalSpace = 0, this.GridWidth = 0, this.ParentArea = void 0, this.Layout = void 0, this.HandCardItemList = []
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout]
    ]
  }
  OnStart() {
    this.Layout = this.GetHorizontalLayout(0), this.OriginalSpace = this.Layout.GetSpacing()
  }
  async Klu() {
    var a = new OpponentHandCardItem_1.OpponentHandCardItem;
    a.SetAreaItem(this.ParentArea), this.HandCardItemList.push(a), await a.CreateThenShowByResourceIdAsync("PnlPlayerItem", this.Layout.RootUIComp), await a.PlayMoveInSequence(), this.GridWidth = a.GetRootItem().GetWidth()
  }
  Uc1() {
    this.TotalWidth = PhantomArenaDefine_1.HANDCARD_LIMIT * this.GridWidth + (PhantomArenaDefine_1.HANDCARD_LIMIT - 1) * this.OriginalSpace, this.TotalHeight = this.Layout.RootUIComp.GetHeight();
    let a = this.OriginalSpace;
    var t;
    this.HandCardItemList.length > PhantomArenaDefine_1.HANDCARD_LIMIT && (t = this.TotalWidth - this.HandCardItemList.length * this.GridWidth, a = t / (this.HandCardItemList.length - 1)), this.Layout.SetSpacing(a)
  }
  async ltu() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0,
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HandCardNum,
      i = [];
    for (let a = t; a < e; a++) i.push(this.Klu());
    await Promise.all(i), this.Uc1(), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "初始化Npc手牌", ["HandCardNum", e])
  }
  async PlayStartTimeDrawCardTween(t) {
    var e = [],
      i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    for (let a = i; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a],
        r = (a - i + 1) * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY;
      e.push(s.PlayStartTimeLocationTween(t, r))
    }
    await Promise.all(e)
  }
  async PlayEndTimeDiscardTween(t) {
    var e = [],
      i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    for (let a = i; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      e.push(s.PlayEndTimeLocationTween(t, (a - i + 1) * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY))
    }
    await Promise.all(e), this.HandCardItemList.length = i
  }
  async PlayBackToRecycleTween(t, a) {
    var e = this.HandCardItemList.length;
    if (!(e < a)) {
      var i = [],
        e = this.HandCardItemList.length - a;
      for (let a = e; a < this.HandCardItemList.length; a++) {
        var s = this.HandCardItemList[a];
        i.push(s.PlayBackToRecycleTween(t))
      }
      await Promise.all(i), this.Uc1(), this.HandCardItemList.length = e
    }
  }
  async PlayDiscardCardTween(t, a) {
    var e = this.HandCardItemList.length;
    if (!(e < a)) {
      var i = [],
        e = this.HandCardItemList.length - a;
      for (let a = e; a < this.HandCardItemList.length; a++) {
        var s = this.HandCardItemList[a];
        i.push(s.PlayBackToLibraryTween(t))
      }
      await Promise.all(i), this.Uc1(), this.HandCardItemList.length = e
    }
  }
  async PlayAddCardTween(t) {
    var e = [],
      t = this.HandCardItemList.length - t,
      i = this.ParentArea.ViewProxy.GetOpponentCardLibraryItem();
    for (let a = t; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      e.push(s.PlayAddCardTween(i))
    }
    await Promise.all(e)
  }
  async AddCardList(t) {
    var e = [];
    for (let a = 0; a < t; a++) e.push(this.Klu());
    await Promise.all(e), this.Uc1()
  }
  async DestroyCardList(t) {
    var e = [],
      t = this.HandCardItemList.length - t;
    for (let a = t; a < this.HandCardItemList.length; a++) {
      var i = this.HandCardItemList[a];
      e.push(i.PlayRemoveSequence())
    }
    await Promise.all(e), this.Uc1(), this.HandCardItemList.length = t
  }
  RegisterBattleArea(a) {
    this.ParentArea = a
  }
  GetLayoutItem() {
    return this.Layout.RootUIComp
  }
  async RefreshHandCardNum(a) {
    const t = this.HandCardItemList.length;
    var e = new UiAsyncTask_1.UiAsyncTask("OpponentHandArea.RefreshHandCardNum", async () => {
      a > t ? (await this.AddCardList(a - t), await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME), await this.PlayAddCardTween(a - t)) : await this.DestroyCardList(t - a), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "刷新Npc手牌", ["HandCardNum", a])
    });
    await this.RunAsyncTask(e)
  }
  async StartTimeDrawCard(a) {
    await this.ltu(), await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME), await this.PlayStartTimeDrawCardTween(a)
  }
  async EndTimeDiscardCard(a) {
    await this.PlayEndTimeDiscardTween(a)
  }
  async BackToRecycle(a) {
    var t = this.ParentArea.ViewProxy.CardRecycle.GetRootItem();
    await this.PlayBackToRecycleTween(t, a)
  }
  async DiscardCard(a) {
    var t = this.ParentArea.ViewProxy.GetOpponentCardLibraryItem();
    await this.PlayDiscardCardTween(t, a)
  }
}
exports.OpponentHandArea = OpponentHandArea;
//# sourceMappingURL=OpponentHandArea.js.map