"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulatableCastProjectileState = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulatableCastProjectileState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments);
    this.Vnr = undefined;
    this.Hnr = undefined;
    this.wga = undefined;
    this.Pga = undefined;
    this.jnr = 0;
    this.nJo = 0;
    this.Wnr = Vector_1.Vector.Create();
    this.Knr = Vector_1.Vector.Create();
    this.xga = false;
  }
  OnEnter() {
    super.OnEnter();
    this.Qnr();
    this.jnr = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式初速度;
    this.nJo = 0;
    this.Wnr = Vector_1.Vector.Create(this.SceneItem.LastHoldingLocation);
    this.xga = false;
    if (this.NeedNotifyServer) {
      LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(this.SceneItem.Entity.Id, Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateFreeThrowing);
    }
    if (this.EnterCallback) {
      this.EnterCallback();
    }
  }
  OnTick(t) {
    t = this.jnr * t;
    this.nJo += t;
    let e = new UE.VectorDouble();
    e = (this.xga ? this.wga : this.Vnr).D_GetLocationAtDistanceAlongSpline(this.nJo, 1);
    this.SceneItem.ActorComp.SetActorLocation(e);
    if (!this.xga && this.nJo >= this.Vnr.GetSplineLength()) {
      if (this.wga) {
        this.xga = true;
        this.SceneItem.ActorComp.SetActorLocation(this.wga.D_GetLocationAtDistanceAlongSpline(0, 1), "[SceneItemManipulatableCastProjectileState] OnTeleport", false);
        this.nJo = 0;
      } else {
        this.SceneItem.CastFreeState.NeedNotifyServer = false;
        this.SceneItem?.SetState(9, "CastProjectileState over spline and no afterPortal");
      }
    } else if (this.xga && this.nJo >= this.wga.GetSplineLength()) {
      this.SceneItem?.SetState(1, "CastProjectileState over spline");
    }
    this.SceneItem.ActorComp.PhysicsMode = 3;
    this.Knr = Vector_1.Vector.Create();
    this.SceneItem.ActorComp.ActorLocationProxy.Subtraction(this.Wnr, this.Knr);
    this.Knr.Normalize();
    this.Wnr = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocation);
    return true;
  }
  OnExit() {
    super.OnExit();
    this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(this.Knr.MultiplyEqual(this.jnr).ToUeVectorOld());
    if (this.Hnr?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("SceneItemManipulatableCastProjectileState.OnExit1", this.Hnr);
      this.Hnr = undefined;
      this.Vnr = undefined;
    }
    if (this.Pga?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("SceneItemManipulatableCastProjectileState.OnExit2", this.Pga);
      this.Pga = undefined;
      this.wga = undefined;
    }
  }
  Qnr() {
    var t;
    var e = this.SceneItem.LastHoldingLocation.ToUeVector();
    var i = ModelManager_1.ModelManager.ManipulaterModel.GetProjectilePath();
    var s = ModelManager_1.ModelManager.ManipulaterModel.GetAfterPortalProjectilePath();
    var r = Vector_1.Vector.Create(i.Get(i.Num() - 1));
    r.SubtractionEqual(Vector_1.Vector.Create(i.Get(i.Num() - 2)));
    r.Normalize();
    if (s.Num() <= 0) {
      (t = Vector_1.Vector.Create(i.Get(i.Num() - 1))).AdditionEqual(r.MultiplyEqual(this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径 * 2));
      i.Add(t.ToUeVector());
    } else {
      (t = Vector_1.Vector.Create(s.Get(s.Num() - 1))).AdditionEqual(r.MultiplyEqual(this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径 * 2));
      s.Add(t.ToUeVector());
    }
    this.Hnr = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.Hnr.D_K2_SetActorLocation(e, false, undefined, true);
    this.Vnr = this.Hnr.GetComponentByClass(UE.SplineComponent.StaticClass());
    this.Vnr.D_SetSplinePoints(i, 0, true);
    if (s.Num() > 0) {
      this.Pga = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
      r = ModelManager_1.ModelManager.ManipulaterModel.GetAfterPortalStartPosition();
      this.Pga.D_K2_SetActorLocation(r, false, undefined, true);
      this.wga = this.Pga.GetComponentByClass(UE.SplineComponent.StaticClass());
      this.wga.D_SetSplinePoints(s, 0, true);
    }
  }
  IsNoLockCasting() {
    return true;
  }
}
exports.SceneItemManipulatableCastProjectileState = SceneItemManipulatableCastProjectileState;
//# sourceMappingURL=SceneItemManipulableCastProjectileState.js.map