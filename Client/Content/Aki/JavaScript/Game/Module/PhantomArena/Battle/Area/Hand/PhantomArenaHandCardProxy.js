"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaHandCardProxy = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaHandCardProxy {
  constructor() {
    this.wi1 = undefined;
    this.AreaItem = undefined;
    this.Area = undefined;
    this.WD_ = false;
    this.XGu = -1;
    this.IsInit = false;
  }
  Init(t, i, a) {
    this.wi1 = t;
    this.AreaItem = i;
    this.wi1.SetCardProxy(this);
    this.Area = a;
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
    this.WD_ = this.Area.IsCanDragCard(t);
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
      this.QX1();
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
  WX1() {
    if (this.Area.FunctionalArea.CheckSettingCardPosition(this.wi1)) {
      this.wi1.PlayStateSequence("SeleToUse");
    } else {
      this.wi1.PlayStateSequence("SeleClose");
    }
  }
  QX1() {
    if (this.Area.FunctionalArea.CheckSettingCardPosition(this.wi1)) {
      this.wi1.PlayStateSequence("UseToSele");
    }
  }
  CheckCardOutHandArea() {
    return !!this.Area.FunctionalArea.GetNearlyAreaItemProxyByCard(this.wi1) || !!this.Area.ViewProxy.CardRecycle.CheckCardInRecycleArea(this.wi1);
  }
  async PlayStartTimeLocationTween(t, i) {
    await TimerSystem_1.GameplayTimerSystem.Wait(i);
    const a = new CustomPromise_1.CustomPromise();
    i = {
      StartCallback: () => {
        this.wi1.SetActive(true);
      },
      CompleteCallback: () => {
        this.wi1.SetUiParent(this.AreaItem.GetRootItem(), true);
        a.SetResult();
      },
      LocationCurveX: this.Area.DrawCardCurveX,
      LocationCurveY: this.Area.DrawCardCurveY
    };
    this.wi1.PlayLocationByItem(t, this.AreaItem.GetRootItem(), i);
    this.wi1.PlaySequenceWithoutStop("Rotation");
    this.PlayInHandSequence();
    await a.Promise;
  }
  async PlayEndTimeLocationTween(t, i) {
    await TimerSystem_1.GameplayTimerSystem.Wait(i);
    const a = new CustomPromise_1.CustomPromise();
    i = {
      StartCallback: () => {
        this.wi1?.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.wi1.DestroyAsync().finally(() => {
          a.SetResult();
        });
      },
      LocationCurveX: this.Area.DiscardCardCurveX,
      LocationCurveY: this.Area.DiscardCardCurveY
    };
    this.wi1.PlayLocationByItem(this.AreaItem.GetRootItem(), t, i);
    this.wi1.PlaySequenceWithoutStop("Rotation", true);
    await a.Promise;
  }
  async PlayDiscardCardTween(t, i) {
    await TimerSystem_1.GameplayTimerSystem.Wait(i);
    const a = new CustomPromise_1.CustomPromise();
    i = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.wi1.DestroyAsync().finally(() => {
          a.SetResult();
        });
      },
      LocationCurveX: this.Area.DiscardCardCurveX,
      LocationCurveY: this.Area.DiscardCardCurveY
    };
    this.wi1.PlayLocationByItem(this.AreaItem.GetRootItem(), t, i);
    this.wi1.PlaySequenceWithoutStop("Rotation", true);
    await a.Promise;
  }
  async PlayHandRecycleCardTween(t) {
    var i = this.Area.ViewProxy.CardRecycle.GetRootItem();
    await TimerSystem_1.GameplayTimerSystem.Wait(t);
    const a = new CustomPromise_1.CustomPromise();
    t = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.DissolveByLibrary().finally(() => {
          a.SetResult();
        });
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_MOVE_DURATION
    };
    this.wi1.PlayLocationByItem(this.wi1.GetOriginalItem(), i, t);
    this.wi1.PlaySequence("DragUpHandtoTable");
    await a.Promise;
  }
  async PlayResetPositionTween() {
    const t = new CustomPromise_1.CustomPromise();
    var i = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.wi1.SetUiParent(this.AreaItem.GetRootItem(), true);
        this.WX1();
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
    const a = new CustomPromise_1.CustomPromise();
    var e = {
      StartCallback: () => {
        this.wi1.SetUiParent(this.Area.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        a.SetResult();
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_RESET_POS_TWEEN_DURATION
    };
    this.wi1.PlayLocationByItem(this.wi1.GetOriginalItem(), t, e);
    if (i) {
      this.wi1.PlaySequence("DragUpHandtoTable");
      this.QX1();
    }
    await a.Promise;
  }
  async CallHandCardToFight(t, i) {
    const a = this.Area.HandArea.GetCardProxy(t.CardId).GetCard();
    const e = new CustomPromise_1.CustomPromise();
    t = {
      CompleteCallback: () => {
        a.StopSequence("DragUpHandtoTable");
        a.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          e.SetResult();
        });
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_MOVE_DURATION
    };
    a.PlayLocationByItem(a.GetOriginalItem(), i, t);
    a.PlaySequenceWithoutStop("DragUpHandtoTable");
    this.QX1();
    await e.Promise;
  }
  SetCardSelectedState(t) {
    if (t) {
      this.XGu = this.AreaItem.GetOriginalItem().GetHierarchyIndex();
      this.AreaItem.GetOriginalItem().SetAsLastHierarchy();
      this.wi1.SetSelectedState(true);
    } else {
      if (this.XGu !== -1) {
        this.AreaItem.GetOriginalItem().SetHierarchyIndex(this.XGu);
        this.XGu = -1;
      }
      this.wi1.SetSelectedState(false);
    }
  }
  IsNoAllowDiscard() {
    return this.wi1.Data.IsNoAllowDiscard;
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
      if (Info_1.Info.IsInGamepad()) {
        if (i = this.AreaItem.GetGuideUiItem("0")) {
          return [i, i];
        } else {
          return undefined;
        }
      } else {
        return this.wi1.GetGuideUiItemAndUiItemForShowEx(t);
      }
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaHandCardProxy = PhantomArenaHandCardProxy;
//# sourceMappingURL=PhantomArenaHandCardProxy.js.map