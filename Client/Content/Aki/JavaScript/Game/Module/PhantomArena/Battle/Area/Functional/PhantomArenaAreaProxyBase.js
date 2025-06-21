"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAreaProxyBase = void 0;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaAreaProxyBase {
  constructor(t, e) {
    this.Distance = PhantomArenaDefine_1.DISTANCE_MAX, this.Index = -1, this.Card = void 0, this.ParentArea = void 0, this.SettingFailReason = "", this.Index = t, this.ParentArea = e
  }
  SetCardResetPosition(t) {
    t.SetUiParent(this.GetCardRootItem(), !0), t.PlayStateSequence("SeleClose")
  }
  DestroyCard() {
    this.Card && (this.Card.Destroy(), this.Card = void 0)
  }
  SetAreaItem(t) {
    this.AreaItem = t, this.AreaItem.SetProxy(this)
  }
  async SetCard(t) {
    t && (t.SetCardProxy(this), t.SetSelectedState(!1), this.SetCardResetPosition(t)), this.Card = t, this.AreaItem.Refresh(t), await this.Card?.RefreshSelfAsync(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBattleCardNumChange)
  }
  async ChangeCard(t) {
    t.SetCardProxy(this), this.Card = t, this.AreaItem.Refresh(t), await this.Card.RefreshSelfAsync(), await this.PlayChangeCardTween(t.GetRootItem())
  }
  async DissolveByLibrary() {
    this.Card?.PlayStateSequence("SeleClose"), await Promise.all([this.Card?.Dissolve(), this.SetCard(void 0)])
  }
  IsCanSettingCard(t) {
    return !!this.CheckSettingCardCondition(t) && this.IsCardNearlyAreaItem(t)
  }
  SetHoverStateActive(t) {
    this.AreaItem.SetHoverStateActive(t)
  }
  SetCanUseStateActive(t) {
    this.AreaItem.SetCanUseStateActive(t)
  }
  async HandleCardSetting(t) {
    return this.OnHandleCardSetting(t)
  }
  ResetCardSelectState() {
    this.Card?.SetToggleState(0, !1)
  }
  IsCardNearlyAreaItem(t) {
    var e = this.AreaItem.GetWorldLocation(),
      t = t.GetWorldLocation();
    return this.Distance = Vector_1.Vector.Distance(e, t), this.Distance <= PhantomArenaDefine_1.CHECK_ATTACH_DISTANCE
  }
  GetSettingFailReason() {
    return this.SettingFailReason
  }
  ResetSettingFailReason() {
    this.SettingFailReason = ""
  }
  SetCardSelectedState(t) {
    this.Card?.SetSelectedState(t)
  }
  async PlayResetPositionTween() {
    const t = new CustomPromise_1.CustomPromise;
    var e = {
      CompleteCallback: () => {
        this.Card?.SetUiParent(this.AreaItem.GetRootItem(), !0), this.Card?.PlayStateSequence("SeleClose"), t.SetResult()
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_RESET_POS_TWEEN_DURATION
    };
    this.Card?.PlayLocationByItem(this.Card.GetOriginalItem(), this.AreaItem.GetRootItem(), e), this.Card?.PlaySequence("DragUpTabletoHand", !0), await t.Promise
  }
  async PlayChangeCardTween(t) {
    const e = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.Card?.SetUiParent(this.AreaItem.GetRootItem(), !0), this.Card?.StopSequence("DragUpTabletoHand"), this.Card?.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          e.SetResult()
        })
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_CHANGE_CARD_TWEEN_DURATION
    };
    this.Card?.PlayLocationByItem(t, this.AreaItem.GetRootItem(), i), this.Card?.PlaySequenceWithoutStop("DragUpTabletoHand"), await e.Promise
  }
  async PlaySetCardTween() {
    const t = new CustomPromise_1.CustomPromise;
    var e = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.Card?.SetUiParent(this.AreaItem.GetRootItem(), !0), this.Card?.StopSequence("DragUpTabletoHand"), this.Card?.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          t.SetResult()
        })
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_CHANGE_CARD_TWEEN_DURATION
    };
    this.Card?.PlayLocationByItem(this.Card.GetOriginalItem(), this.AreaItem.GetRootItem(), e), this.Card?.PlaySequenceWithoutStop("DragUpHandtoTable"), await t.Promise
  }
  async PlayFunctionalCardToFunctionalTopTween(t, e) {
    const i = new CustomPromise_1.CustomPromise;
    var a = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        i.SetResult()
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_CHANGE_CARD_TWEEN_DURATION
    };
    this.Card?.PlayLocationByItem(this.Card.GetOriginalItem(), t, a), e && (this.Card?.PlayStateSequence("SeleStart"), this.Card?.PlaySequenceWithoutStop("DragUpTabletoHand")), await i.Promise
  }
  async PlayFunctionalCardToRecycleTween(t) {
    const e = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.DissolveByLibrary().finally(() => {
          e.SetResult()
        })
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_MOVE_DURATION
    };
    this.Card?.PlayLocationByItem(this.Card.GetOriginalItem(), t, i), await e.Promise
  }
}
exports.PhantomArenaAreaProxyBase = PhantomArenaAreaProxyBase;
//# sourceMappingURL=PhantomArenaAreaProxyBase.js.map