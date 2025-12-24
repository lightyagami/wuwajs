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
const WAIT_ADD_CARD_TIME = 40;
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
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? "PnlPlayerItem" : "PnlPlayerItemNew";
    await a.CreateThenShowByResourceIdAsync(e, this.Layout.RootUIComp);
    await a.PlayMoveInSequence();
    this.GridWidth = a.GetRootItem().GetWidth();
  }
  iu1() {
    this.TotalWidth = PhantomArenaDefine_1.HANDCARD_LIMIT * this.GridWidth + (PhantomArenaDefine_1.HANDCARD_LIMIT - 1) * this.OriginalSpace;
    this.TotalHeight = this.Layout.RootUIComp.GetHeight();
    let a = this.OriginalSpace;
    var e;
    if (this.HandCardItemList.length > PhantomArenaDefine_1.HANDCARD_LIMIT) {
      e = this.TotalWidth - this.HandCardItemList.length * this.GridWidth;
      a = e / (this.HandCardItemList.length - 1);
    }
    this.Layout.SetSpacing(a);
  }
  async Aiu() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HandCardNum;
    var i = [];
    for (let a = e; a < t; a++) {
      i.push(this.g0u());
    }
    await Promise.all(i);
    this.iu1();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "初始化Npc手牌", ["HandCardNum", t]);
    }
  }
  async PlayStartTimeDrawCardTween(e) {
    var t = [];
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    for (let a = i; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      var r = (a - i + 1) * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY;
      t.push(s.PlayStartTimeLocationTween(e, r));
    }
    await Promise.all(t);
  }
  async PlayEndTimeDiscardTween(e) {
    var t = [];
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.HasFourCostInHand() ? 1 : 0;
    for (let a = i; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      t.push(s.PlayEndTimeLocationTween(e, (a - i + 1) * PhantomArenaDefine_1.PLAY_STARTTIME_CARD_TWEEN_DELAY));
    }
    await Promise.all(t);
    this.HandCardItemList.length = i;
  }
  async PlayBackToRecycleTween(e, a) {
    var t = this.HandCardItemList.length;
    if (!(t < a)) {
      var i = [];
      var t = this.HandCardItemList.length - a;
      for (let a = t; a < this.HandCardItemList.length; a++) {
        var s = this.HandCardItemList[a];
        i.push(s.PlayBackToRecycleTween(e));
      }
      await Promise.all(i);
      this.iu1();
      this.HandCardItemList.length = t;
    }
  }
  async PlayDiscardCardTween(e, a) {
    var t = this.HandCardItemList.length;
    if (!(t < a)) {
      var i = [];
      var t = this.HandCardItemList.length - a;
      for (let a = t; a < this.HandCardItemList.length; a++) {
        var s = this.HandCardItemList[a];
        i.push(s.PlayBackToLibraryTween(e));
      }
      await Promise.all(i);
      this.iu1();
      this.HandCardItemList.length = t;
    }
  }
  async PlayAddCardTween(e) {
    var t = [];
    var e = this.HandCardItemList.length - e;
    var i = this.ParentArea.ViewProxy.GetOpponentCardLibraryItem();
    for (let a = e; a < this.HandCardItemList.length; a++) {
      var s = this.HandCardItemList[a];
      t.push(s.PlayAddCardTween(i));
    }
    await Promise.all(t);
  }
  async AddCardList(e) {
    var t = [];
    for (let a = 0; a < e; a++) {
      t.push(this.g0u());
    }
    await Promise.all(t);
    this.iu1();
  }
  async DestroyCardList(e) {
    var t = [];
    var e = this.HandCardItemList.length - e;
    for (let a = e; a < this.HandCardItemList.length; a++) {
      var i = this.HandCardItemList[a];
      t.push(i.PlayRemoveSequence());
    }
    await Promise.all(t);
    this.iu1();
    this.HandCardItemList.length = e;
  }
  RegisterBattleArea(a) {
    this.ParentArea = a;
  }
  GetLayoutItem() {
    return this.Layout.RootUIComp;
  }
  async RefreshHandCardNum(a) {
    const e = this.HandCardItemList.length;
    var t = new UiAsyncTask_1.UiAsyncTask("OpponentHandArea.RefreshHandCardNum", async () => {
      if (a > e) {
        await this.AddCardList(a - e);
        await TimerSystem_1.GameplayTimerSystem.Wait(WAIT_ADD_CARD_TIME);
        await this.PlayAddCardTween(a - e);
      } else {
        await this.DestroyCardList(e - a);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "刷新Npc手牌", ["HandCardNum", a]);
      }
    });
    await this.RunAsyncTask(t);
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
    var e = this.ParentArea.ViewProxy.CardRecycle.GetRootItem();
    await this.PlayBackToRecycleTween(e, a);
  }
  async DiscardCard(a) {
    var e = this.ParentArea.ViewProxy.GetOpponentCardLibraryItem();
    await this.PlayDiscardCardTween(e, a);
  }
}
exports.OpponentHandArea = OpponentHandArea;
//# sourceMappingURL=OpponentHandArea.js.map