"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaHandCardProxy = void 0;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaHandCardProxy {
  constructor() {
    this.li1 = void 0, this.AreaItem = void 0, this.Area = void 0, this.WD_ = !1, this.Jfu = -1, this.IsInit = !1
  }
  Init(t, i, s) {
    this.li1 = t, this.AreaItem = i, this.li1.SetCardProxy(this), this.Area = s, this.IsInit = !0
  }
  PointerClickCard(t, i) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "点击手牌"), this.Area.CardClick(t)
  }
  PointerEnterCard(t) {}
  PointerDownCard(t, i) {
    this.WD_ = this.Area.IsCanDragCard(), this.WD_ && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "按下手牌"), this.li1.RecordLastDragPos(i.pointerPosition))
  }
  PointerBeginDrag(t, i) {
    this.WD_ && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "开始拖动手牌"), this.Area.CardBeginDragByHand(this.li1), this.li1.PlaySequence("DragUpHandtoTable"), this.LK1())
  }
  PointerDragCard(t, i) {
    this.WD_ && (i = i.pointerPosition, this.li1.MoveCard(i), this.Area.CardDraggingByHand(this.li1))
  }
  PointerEndDrag(t, i) {
    this.WD_ && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "结束拖动手牌"), i = i.pointerPosition, this.li1.RecordLastDragPos(i), this.Area.CardEndDragByHand(this.li1))
  }
  async Remove() {
    await this.AreaItem.DestroyAsync()
  }
  async Clear() {
    await Promise.all([this.li1.DestroyAsync(), this.AreaItem.DestroyAsync()])
  }
  async RemoveBySequence() {
    await this.AreaItem.PlayMoveOutSequence()
  }
  async DissolveByLibrary() {
    this.li1.PlayStateSequence("SeleClose"), await Promise.all([this.li1.Dissolve(), this.RemoveBySequence()])
  }
  PlayInHandSequence() {
    this.Area.FunctionalArea.CheckSettingCardPosition(this.li1) ? this.li1.PlayStateSequence("UseStart") : this.li1.PlayStateSequence("UseClose")
  }
  RK1() {
    this.Area.FunctionalArea.CheckSettingCardPosition(this.li1) ? this.li1.PlayStateSequence("SeleToUse") : this.li1.PlayStateSequence("SeleClose")
  }
  LK1() {
    this.Area.FunctionalArea.CheckSettingCardPosition(this.li1) && this.li1.PlayStateSequence("UseToSele")
  }
  CheckCardOutHandArea() {
    return !!this.Area.FunctionalArea.GetNearlyAreaItemProxyByCard(this.li1) || !!this.Area.ViewProxy.CardRecycle.CheckCardInRecycleArea(this.li1)
  }
  async PlayStartTimeLocationTween(t, i) {
    await TimerSystem_1.TimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise;
    i = {
      StartCallback: () => {
        this.li1.SetActive(!0)
      },
      CompleteCallback: () => {
        this.li1.SetUiParent(this.AreaItem.GetRootItem(), !0), s.SetResult()
      },
      LocationCurveX: this.Area.DrawCardCurveX,
      LocationCurveY: this.Area.DrawCardCurveY
    };
    this.li1.PlayLocationByItem(t, this.AreaItem.GetRootItem(), i), this.li1.PlaySequenceWithoutStop("Rotation"), this.PlayInHandSequence(), await s.Promise
  }
  async PlayEndTimeLocationTween(t, i) {
    await TimerSystem_1.TimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise;
    i = {
      StartCallback: () => {
        this.li1?.SetUiParent(this.Area.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.li1.DestroyAsync().finally(() => {
          s.SetResult()
        })
      },
      LocationCurveX: this.Area.DiscardCardCurveX,
      LocationCurveY: this.Area.DiscardCardCurveY
    };
    this.li1.PlayLocationByItem(this.AreaItem.GetRootItem(), t, i), this.li1.PlaySequenceWithoutStop("Rotation", !0), await s.Promise
  }
  async PlayDiscardCardTween(t, i) {
    await TimerSystem_1.TimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise;
    i = {
      StartCallback: () => {
        this.li1.SetUiParent(this.Area.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.li1.DestroyAsync().finally(() => {
          s.SetResult()
        })
      },
      LocationCurveX: this.Area.DiscardCardCurveX,
      LocationCurveY: this.Area.DiscardCardCurveY
    };
    this.li1.PlayLocationByItem(this.AreaItem.GetRootItem(), t, i), this.li1.PlaySequenceWithoutStop("Rotation", !0), await s.Promise
  }
  async PlayHandRecycleCardTween(t, i) {
    await TimerSystem_1.TimerSystem.Wait(i);
    const s = new CustomPromise_1.CustomPromise;
    i = {
      StartCallback: () => {
        this.li1.SetUiParent(this.Area.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.DissolveByLibrary().finally(() => {
          s.SetResult()
        })
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_MOVE_DURATION
    };
    this.li1.PlayLocationByItem(this.li1.GetOriginalItem(), t, i), this.li1.PlaySequence("DragUpHandtoTable"), await s.Promise
  }
  async PlayResetPositionTween() {
    const t = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.li1.SetUiParent(this.Area.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.li1.SetUiParent(this.AreaItem.GetRootItem(), !0), this.RK1(), t.SetResult()
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_RESET_POS_TWEEN_DURATION
    };
    this.li1.PlayLocationByItem(this.li1.GetOriginalItem(), this.AreaItem.GetRootItem(), i), this.li1.PlaySequence("DragUpHandtoTable", !0), await t.Promise
  }
  async PlayHandToFunctionalTopTween(t, i) {
    const s = new CustomPromise_1.CustomPromise;
    var e = {
      StartCallback: () => {
        this.li1.SetUiParent(this.Area.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        s.SetResult()
      },
      LocationCurveX: this.Area.RecycleCurve,
      LocationCurveY: this.Area.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_RESET_POS_TWEEN_DURATION
    };
    this.li1.PlayLocationByItem(this.li1.GetOriginalItem(), t, e), i && (this.li1.PlaySequence("DragUpHandtoTable"), this.LK1()), await s.Promise
  }
  SetCardSelectedState(t) {
    t ? (this.Jfu = this.AreaItem.GetOriginalItem().GetHierarchyIndex(), this.AreaItem.GetOriginalItem().SetAsLastHierarchy(), this.li1.SetSelectedState(!0)) : (-1 !== this.Jfu && (this.AreaItem.GetOriginalItem().SetHierarchyIndex(this.Jfu), this.Jfu = -1), this.li1.SetSelectedState(!1))
  }
  IsFourCost() {
    return this.li1.Data.IsFourCost
  }
  GetCard() {
    return this.li1
  }
  async RefreshCardData(t) {
    await this.li1.RefreshAsync(t)
  }
  SetHierarchyIndex(t) {
    this.AreaItem.GetOriginalItem()?.SetHierarchyIndex(t)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    return t && 0 !== t.length && ("HandCard" === (i = t[0]) || "HandArea" === i) ? this.li1.GetGuideUiItemAndUiItemForShowEx(t) : void 0
  }
}
exports.PhantomArenaHandCardProxy = PhantomArenaHandCardProxy;
//# sourceMappingURL=PhantomArenaHandCardProxy.js.map