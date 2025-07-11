"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaHandCardProxy = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaHandCardProxy {
  constructor() {
    this.wi1 = undefined;
    this.AreaItem = undefined;
    this.Area = undefined;
    this.WD_ = false;
    this.T2u = -1;
    this.IsInit = false;
  }
  Init(t, i, s) {
    this.wi1 = t;
    this.AreaItem = i;
    this.wi1.SetCardProxy(this);
    this.Area = s;
    this.IsInit = true;
  }
  PointerClickCard(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "点击手牌");
    }
    this.Area.CardClick(t);
  }
  PointerEnterCard(t) {}
  PointerDownCard(t, i) {
    this.WD_ = this.Area.IsCanDragCard();
    if (this.WD_) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "按下手牌");
      }
      this.wi1.RecordLastDragPos(i.pointerPosition);
    }
  }
  PointerBeginDrag(t, i) {
    if (this.WD_) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "开始拖动手牌");
      }
      this.Area.CardBeginDragByHand(this.wi1);
      this.wi1.PlaySequence("DragUpHandtoTable");
      this.SX1();
    }
  }
  PointerDragCard(t, i) {
    if (this.WD_) {
      i = i.pointerPosition;
      this.wi1.MoveCard(i);
      this.Area.CardDraggingByHand(this.wi1);
    }
  }
  PointerEndDrag(t, i) {
    if (this.WD_) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "结束拖动手牌");
      }
      i = i.pointerPosition;
      this.wi1.RecordLastDragPos(i);
      this.Area.CardEndDragByHand(this.wi1);
    }
  }
  async Remove() {
    await this.AreaItem.DestroyAsync();
  }
  async Clear() {
    await Promise.all([this.wi1.DestroyAsync(), this.AreaItem.DestroyAsync()]);
  }
  async RemoveBySequence() {
    await this.AreaItem.PlayMoveOutSequence();
  }
  async DissolveByLibrary() {
    this.wi1.PlayStateSequence("SeleClose");
    this.wi1.SetCardProxy(undefined);
    await Promise.all([this.wi1.Dissolve(), this.RemoveBySequence()]);
  }
  PlayInHandSequence() {
    if (this.Area.FunctionalArea.CheckSettingCardPosition(this.wi1)) {
      this.wi1.PlayStateSequence("UseStart");
    } else {
      this.wi1.PlayStateSequence("UseClose");
    }
  }
  yX1() {
    if (this.Area.FunctionalArea.CheckSettingCardPosition(this.wi1)) {
      this.wi1.PlayStateSequence("SeleToUse");
    } else {
      this.wi1.PlayStateSequence("SeleClose");
    }
  }
  SX1() {
    if (this.Area.FunctionalArea.CheckSettingCardPosition(this.wi1)) {
      this.wi1.PlayStateSequence("UseToSele");
    }
  }
  CheckCardOutHandArea() {
    return !!this.Area.FunctionalArea.GetNearlyAreaItemProxyByCard(this.wi1) || !!this.Area.ViewProxy.CardRecycle.CheckCardInRecycleArea(this.wi1);
  }
  async PlayStartTimeLocationTween(t, i) {
    await TimerSystem_1.GameplayTimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise();
    i = {
      StartCallback: () => {
        this.wi1.SetActive(true);
      },
      CompleteCallback: () => {
        this.wi1.SetUiParent(this.AreaItem.GetRootItem(), true);
        s.SetResult();
      },
      LocationCurveX: this.Area.DrawCardCurveX,
      LocationCurveY: this.Area.DrawCardCurveY
    };
    this.wi1.PlayLocationByItem(t, this.AreaItem.GetRootItem(), i);
    this.wi1.PlaySequenceWithoutStop("Rotation");
    this.PlayInHandSequence();
    await s.Promise;
  }
  async PlayEndTimeLocationTween(t, i) {
    await TimerSystem_1.GameplayTimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise();
    i = {
      StartCallback: () => {
        this.wi1?.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.wi1.DestroyAsync().finally(() => {
          s.SetResult();
        });
      },
      LocationCurveX: this.Area.DiscardCardCurveX,
      LocationCurveY: this.Area.DiscardCardCurveY
    };
    this.wi1.PlayLocationByItem(this.AreaItem.GetRootItem(), t, i);
    this.wi1.PlaySequenceWithoutStop("Rotation", true);
    await s.Promise;
  }
  async PlayDiscardCardTween(t, i) {
    await TimerSystem_1.GameplayTimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise();
    i = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.wi1.DestroyAsync().finally(() => {
          s.SetResult();
        });
      },
      LocationCurveX: this.Area.DiscardCardCurveX,
      LocationCurveY: this.Area.DiscardCardCurveY
    };
    this.wi1.PlayLocationByItem(this.AreaItem.GetRootItem(), t, i);
    this.wi1.PlaySequenceWithoutStop("Rotation", true);
    await s.Promise;
  }
  async PlayHandRecycleCardTween(t, i) {
    await TimerSystem_1.GameplayTimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise();
    i = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.DissolveByLibrary().finally(() => {
          s.SetResult();
        });
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_MOVE_DURATION
    };
    this.wi1.PlayLocationByItem(this.wi1.GetOriginalItem(), t, i);
    this.wi1.PlaySequence("DragUpHandtoTable");
    await s.Promise;
  }
  async PlayResetPositionTween() {
    const t = new CustomPromise_1.CustomPromise();
    var i = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.wi1.SetUiParent(this.AreaItem.GetRootItem(), true);
        this.yX1();
        t.SetResult();
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_RESET_POS_TWEEN_DURATION
    };
    this.wi1.PlayLocationByItem(this.wi1.GetOriginalItem(), this.AreaItem.GetRootItem(), i);
    this.wi1.PlaySequence("DragUpHandtoTable", true);
    await t.Promise;
  }
  async PlayHandToFunctionalTopTween(t, i) {
    const s = new CustomPromise_1.CustomPromise();
    var e = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        s.SetResult();
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_RESET_POS_TWEEN_DURATION
    };
    this.wi1.PlayLocationByItem(this.wi1.GetOriginalItem(), t, e);
    if (i) {
      this.wi1.PlaySequence("DragUpHandtoTable");
      this.SX1();
    }
    await s.Promise;
  }
  SetCardSelectedState(t) {
    if (t) {
      this.T2u = this.AreaItem.GetOriginalItem().GetHierarchyIndex();
      this.AreaItem.GetOriginalItem().SetAsLastHierarchy();
      this.wi1.SetSelectedState(true);
    } else {
      if (this.T2u !== -1) {
        this.AreaItem.GetOriginalItem().SetHierarchyIndex(this.T2u);
        this.T2u = -1;
      }
      this.wi1.SetSelectedState(false);
    }
  }
  IsFourCost() {
    return this.wi1.Data.IsFourCost;
  }
  GetCard() {
    return this.wi1;
  }
  async RefreshCardData(t) {
    await this.wi1.RefreshAsync(t);
  }
  SetHierarchyIndex(t) {
    this.AreaItem.GetOriginalItem()?.SetHierarchyIndex(t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t && t.length !== 0 && ((i = t[0]) === "HandCard" || i === "HandArea")) {
      return this.wi1.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaHandCardProxy = PhantomArenaHandCardProxy;
//# sourceMappingURL=PhantomArenaHandCardProxy.js.map