"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentHandArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const OpponentHandCardItem_1 = require("./OpponentHandCardItem");
class OpponentHandArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TotalWidth = 0;
    this.TotalHeight = 0;
    this.OriginalSpace = 0;
    this.GridWidth = 0;
    this.ParentArea = undefined;
    this.Layout = undefined;
    this.HandCardItemList = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.Layout = this.GetHorizontalLayout(0);
    this.OriginalSpace = this.Layout.GetSpacing();
  }
  async g0u() {
    var a = new OpponentHandCardItem_1.OpponentHandCardItem();
    a.SetAreaItem(this.ParentArea);
    this.HandCardItemList.push(a);
    await a.CreateThenShowByResourceIdAsync("PnlPlayerItem", this.Layout.RootUIComp);
    await a.PlayMoveInSequence();
    this.GridWidth = a.GetRootItem().GetWidth();
  }
  iu1() {
    this.TotalWidth = PhantomArenaDefine_1.HANDCARD_LIMIT * this.GridWidth + (PhantomArenaDefine_1.HANDCARD_LIMIT - 1) * this.OriginalSpace;
    this.TotalHeight = this.Layout.RootUIComp.GetHeight();
    let a = this.OriginalSpace;
    var t;
    if (this.HandCardItemList.length > PhantomArenaDefine_1.HANDCARD_LIMIT) {
      t = this.TotalWidth - this.HandCardItemList.length * this.GridWidth;
      a = t / (this.HandCardItemList.length - 1);
    }
    this.Layout.SetSpacing(a);
  }
  async Aiu() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HandCardNum;
    var i = [];
    for (let a = t; a < e; a++) {
      i.push(this.g0u());
    }
    await Promise.all(i);
    this.iu1();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "初始化Npc手牌", ["HandCardNum", e]);
    }
  }
  async PlayStartTimeDrawCardTween(t) {
    var e = [];
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    for (let a = i; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      var r = (a - i + 1) * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY;
      e.push(s.PlayStartTimeLocationTween(t, r));
    }
    await Promise.all(e);
  }
  async PlayEndTimeDiscardTween(t) {
    var e = [];
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    for (let a = i; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      e.push(s.PlayEndTimeLocationTween(t, (a - i + 1) * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY));
    }
    await Promise.all(e);
    this.HandCardItemList.length = i;
  }
  async PlayBackToRecycleTween(t, a) {
    var e = this.HandCardItemList.length;
    if (!(e < a)) {
      var i = [];
      var e = this.HandCardItemList.length - a;
      for (let a = e; a < this.HandCardItemList.length; a++) {
        var s = this.HandCardItemList[a];
        i.push(s.PlayBackToRecycleTween(t));
      }
      await Promise.all(i);
      this.iu1();
      this.HandCardItemList.length = e;
    }
  }
  async PlayDiscardCardTween(t, a) {
    var e = this.HandCardItemList.length;
    if (!(e < a)) {
      var i = [];
      var e = this.HandCardItemList.length - a;
      for (let a = e; a < this.HandCardItemList.length; a++) {
        var s = this.HandCardItemList[a];
        i.push(s.PlayBackToLibraryTween(t));
      }
      await Promise.all(i);
      this.iu1();
      this.HandCardItemList.length = e;
    }
  }
  async PlayAddCardTween(t) {
    var e = [];
    var t = this.HandCardItemList.length - t;
    var i = this.ParentArea.ViewProxy.GetOpponentCardLibraryItem();
    for (let a = t; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      e.push(s.PlayAddCardTween(i));
    }
    await Promise.all(e);
  }
  async AddCardList(t) {
    var e = [];
    for (let a = 0; a < t; a++) {
      e.push(this.g0u());
    }
    await Promise.all(e);
    this.iu1();
  }
  async DestroyCardList(t) {
    var e = [];
    var t = this.HandCardItemList.length - t;
    for (let a = t; a < this.HandCardItemList.length; a++) {
      var i = this.HandCardItemList[a];
      e.push(i.PlayRemoveSequence());
    }
    await Promise.all(e);
    this.iu1();
    this.HandCardItemList.length = t;
  }
  RegisterBattleArea(a) {
    this.ParentArea = a;
  }
  GetLayoutItem() {
    return this.Layout.RootUIComp;
  }
  async RefreshHandCardNum(a) {
    const t = this.HandCardItemList.length;
    var e = new UiAsyncTask_1.UiAsyncTask("OpponentHandArea.RefreshHandCardNum", async () => {
      if (a > t) {
        await this.AddCardList(a - t);
        await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
        await this.PlayAddCardTween(a - t);
      } else {
        await this.DestroyCardList(t - a);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "刷新Npc手牌", ["HandCardNum", a]);
      }
    });
    await this.RunAsyncTask(e);
  }
  async StartTimeDrawCard(a) {
    await this.Aiu();
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    await this.PlayStartTimeDrawCardTween(a);
  }
  async EndTimeDiscardCard(a) {
    await this.PlayEndTimeDiscardTween(a);
  }
  async BackToRecycle(a) {
    var t = this.ParentArea.ViewProxy.CardRecycle.GetRootItem();
    await this.PlayBackToRecycleTween(t, a);
  }
  async DiscardCard(a) {
    var t = this.ParentArea.ViewProxy.GetOpponentCardLibraryItem();
    await this.PlayDiscardCardTween(t, a);
  }
}
exports.OpponentHandArea = OpponentHandArea;
//# sourceMappingURL=OpponentHandArea.js.map