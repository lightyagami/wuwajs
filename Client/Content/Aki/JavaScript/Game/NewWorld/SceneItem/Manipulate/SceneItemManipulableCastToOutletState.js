"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableCastToOutletState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastToOutletState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments);
    this.NHo = undefined;
  }
  SetTarget(t) {
    this.NHo = t;
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    if (this.NHo?.Valid) {
      super.OnEnter();
      this.SceneItem.IsCanBeHeld = false;
      this.SceneItem.TargetActorComponent = this.NHo.GetComponent(1);
      this.SceneItem.TargetOutletComponent = this.NHo.GetComponent(170);
      if (this.NeedNotifyServer) {
        LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(this.SceneItem.Entity.Id, Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateLockBaseThrowing);
      }
      this.StartCast();
      this.CalcDirection();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 31, "被控物进入CastToTarget时,没有设置目标");
    }
  }
  OnTick(t) {
    this.Timer += t;
    let e = MathUtils_1.MathUtils.Clamp(this.Timer / this.CastDuration, 0, 1);
    if (this.SceneItem.CastCurve) {
      e = this.SceneItem.CastCurve.GetFloatValue(e);
    }
    this.UpdateLocation(e);
    this.T_e(e);
    this.kxe();
    return true;
  }
  OnExit() {
    super.OnExit();
    this.NHo = undefined;
    this.SceneItem.StopSequence();
  }
  T_e(t) {
    var t = UE.KismetMathLibrary.Ease(0, 1, t, 7);
    var e = this.SceneItem.TargetOutletComponent.GetSocketRotator(this.SceneItem.Entity);
    var i = Rotator_1.Rotator.Create();
    Rotator_1.Rotator.Lerp(this.StartRot, e, t, i);
    this.SceneItem.ActorComp.SetActorRotation(i.ToUeRotator(), "[ManipulableCastToOutletState.UpdateRotation]", false);
  }
  kxe() {
    if ((!(this.Timer < this.CastDuration) || !(this.CastDuration > 0)) && !this.SceneItem.PlayingMatchSequence) {
      if (this.SceneItem.MatchSequence) {
        this.SceneItem.PlayingMatchSequence = true;
        this.SceneItem.PlayMatchSequence(() => {
          this.Jnr();
          this.SceneItem.PlayingMatchSequence = false;
        }, false);
      } else {
        this.Jnr();
      }
      if (this.FinishCallback) {
        this.FinishCallback();
      }
    }
  }
  Jnr() {
    this.SceneItem.ActivatedOutlet = this.SceneItem.TargetOutletComponent;
    this.SceneItem.ActivatedOutlet.EntityInSocket = this.SceneItem;
    var t = this.SceneItem.TargetOutletComponent.Entity;
    if (this.SceneItem.ShouldPlayMismatchSequence(t)) {
      this.SceneItem.CastFreeState.NeedResetPhysicsMode = false;
      this.SceneItem?.SetState(9, "CastToOutlet Finish");
      this.SceneItem?.TryPlayMismatchSequence(t);
    } else {
      this.SceneItem?.SetState(10, "CastToOutlet Finish");
      this.SceneItem.RequestAttachToOutlet();
    }
  }
}
exports.SceneItemManipulableCastToOutletState = SceneItemManipulableCastToOutletState;
//# sourceMappingURL=SceneItemManipulableCastToOutletState.js.map