"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpponentHandCardItem = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  PhantomArenaCardTweenLogic_1 = require("../Card/PhantomArenaCardTweenLogic");
class OpponentHandCardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.TweenLogic = void 0, this.CardSequence = void 0, this.AreaItem = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem]
    ]
  }
  OnStart() {
    this.CardSequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.TweenLogic = new PhantomArenaCardTweenLogic_1.PhantomArenaCardTweenLogic, this.TweenLogic.Init(this.GetItem(0)), this.GetItem(0).SetAlpha(0)
  }
  OnBeforeDestroy() {
    this.TweenLogic.Destroy(), this.CardSequence.Clear()
  }
  SetAreaItem(e) {
    this.AreaItem = e
  }
  async PlayStartTimeLocationTween(e, t) {
    await TimerSystem_1.TimerSystem.Wait(t);
    const i = new CustomPromise_1.CustomPromise;
    t = {
      StartCallback: () => {
        this.GetItem(0).SetAlpha(1)
      },
      CompleteCallback: () => {
        i.SetResult()
      },
      LocationCurveX: this.AreaItem.DrawCardCurveX,
      LocationCurveY: this.AreaItem.DrawCardCurveY
    };
    this.TweenLogic.PlayLocationByItem(e, this.GetRootItem(), t), this.PlaySequence("Rotation"), await i.Promise
  }
  async PlayEndTimeLocationTween(e, t) {
    await TimerSystem_1.TimerSystem.Wait(t);
    const i = new CustomPromise_1.CustomPromise;
    t = {
      CompleteCallback: () => {
        this.GetItem(0).SetAlpha(0), i.SetResult()
      },
      LocationCurveX: this.AreaItem.DiscardCardCurveX,
      LocationCurveY: this.AreaItem.DiscardCardCurveY
    };
    this.TweenLogic.PlayLocationByItem(this.GetRootItem(), e, t), this.PlaySequence("Rotation", !0), await i.Promise, await this.DestroyAsync()
  }
  async PlayAddCardTween(e) {
    const t = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.GetItem(0).SetAlpha(1)
      },
      CompleteCallback: () => {
        t.SetResult()
      },
      LocationCurveX: this.AreaItem.DrawCardCurveX,
      LocationCurveY: this.AreaItem.DrawCardCurveY
    };
    this.TweenLogic.PlayLocationByItem(e, this.GetRootItem(), i), this.PlaySequence("Rotation"), await t.Promise
  }
  async PlayBackToLibraryTween(e) {
    const t = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.CardSequence.PlaySequencePurely("MoveOut")
      },
      CompleteCallback: () => {
        t.SetResult()
      },
      LocationCurveX: this.AreaItem.DiscardCardCurveX,
      LocationCurveY: this.AreaItem.DiscardCardCurveY
    };
    this.TweenLogic.PlayLocationByItem(this.GetRootItem(), e, i), await t.Promise, await this.DestroyAsync()
  }
  async PlayBackToRecycleTween(e) {
    const t = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.CardSequence.PlaySequencePurely("MoveOut")
      },
      CompleteCallback: () => {
        this.DissolveByLibrary().finally(() => {
          t.SetResult()
        })
      },
      LocationCurveX: this.AreaItem.RecycleCurve,
      LocationCurveY: this.AreaItem.RecycleCurve
    };
    this.TweenLogic.PlayLocationByItem(this.GetRootItem(), e, i), await t.Promise, await this.DestroyAsync()
  }
  PlaySequence(e, t = !1) {
    this.CardSequence.StopPrevSequence(!1, !0), this.CardSequence.PlaySequencePurely(e, !1, t)
  }
  async DissolveByLibrary() {
    var e = new CustomPromise_1.CustomPromise;
    await this.CardSequence.PlaySequenceAsync("Dissolve", e)
  }
  async PlayRemoveSequence() {
    this.GetItem(0).SetAlpha(0);
    var e = new CustomPromise_1.CustomPromise;
    await this.CardSequence.PlaySequenceAsync("MoveOut", e), await this.DestroyAsync()
  }
  async PlayMoveInSequence() {
    var e = new CustomPromise_1.CustomPromise;
    await this.CardSequence.PlaySequenceAsync("MoveIn", e)
  }
}
exports.OpponentHandCardItem = OpponentHandCardItem;
//# sourceMappingURL=OpponentHandCardItem.js.map