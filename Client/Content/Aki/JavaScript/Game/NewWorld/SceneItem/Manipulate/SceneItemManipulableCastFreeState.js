"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableCastFreeState = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastFreeState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments);
    this.Fnr = new UE.Vector();
  }
  SetForward(e) {
    this.Fnr = e;
  }
  OnEnter() {
    super.OnEnter();
    let e = 1;
    let t = 0;
    var r = this.SceneItem.Config.ThrowCfg.MotionConfig;
    if (r.Type === IComponent_1.EThrowMotion.Projectile) {
      e = r.Velocity;
      t = r.AngularVelocity;
    }
    this.SceneItem.IsCanBeHeld = false;
    if (this.NeedResetPhysicsMode) {
      this.SceneItem.ActorComp.PhysicsMode = 3;
    }
    if (this.NeedNotifyServer) {
      LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(this.SceneItem.Entity.Id, Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateFreeThrowing);
    }
    var r = UE.KismetMathLibrary.RandomUnitVector();
    var o = this.SceneItem.ActorComp.GetPrimitiveComponent();
    o.SetPhysicsLinearVelocity(this.Fnr.op_Multiply(e));
    o.SetPhysicsAngularVelocityInDegrees(r.op_Multiply(t));
    this.SceneItem.TargetActorComponent = undefined;
    this.SceneItem.TargetOutletComponent = undefined;
    if (this.EnterCallback) {
      this.EnterCallback();
    }
  }
  OnTick(e) {
    this.UpdateRotationAccordingToVelocity();
    return true;
  }
  OnChangeMoveController(e) {
    if (e) {
      if (this.SceneItem && (e = this.SceneItem.ActorComp)) {
        e.PhysicsMode = 3;
      }
    } else {
      this.OnExit();
    }
  }
  IsNoLockCasting() {
    return true;
  }
}
exports.SceneItemManipulableCastFreeState = SceneItemManipulableCastFreeState;
//# sourceMappingURL=SceneItemManipulableCastFreeState.js.map