"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueMoveSpline = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../../Core/Actor/ActorSystem");
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../../GlobalData");
const GameplayCueEffect_1 = require("./GameplayCueEffect");
const WIDTH = 70;
const LENGTH = 100;
const TANGENT = 130;
const SPLINE_MOVE_SPEED = 520;
const SPLINE_ROTATION_SPEED = 20;
class GameplayCueMoveSpline extends GameplayCueEffect_1.GameplayCueEffect {
  constructor() {
    super(...arguments);
    this._Yo = undefined;
    this.uYo = (0, puerts_1.$ref)(0);
    this.cYo = (0, puerts_1.$ref)(0);
    this.mYo = (0, puerts_1.$ref)(false);
  }
  OnTick(e) {
    var t;
    super.OnTick(e);
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle) && (t = EffectSystem_1.EffectSystem.GetSureEffectActor(this.EffectViewHandle))) {
      UE.MoveSplineAI_C.元素球跟随(e, t, this.ActorInternal, this._Yo, (0, puerts_1.$unref)(this.uYo), SPLINE_MOVE_SPEED, SPLINE_ROTATION_SPEED, (0, puerts_1.$unref)(this.cYo), (0, puerts_1.$unref)(this.mYo), undefined, this.uYo, this.cYo, this.mYo);
    }
  }
  OnDestroy() {
    ActorSystem_1.ActorSystem.Put("GameplayCueMoveSpline.OnDestroy", this._Yo.GetOwner());
    super.OnDestroy();
  }
  AttachEffect() {
    var t = [new UE.Vector(-WIDTH, 0, 0), new UE.Vector(0, LENGTH, 0), new UE.Vector(WIDTH, 0, 0), new UE.Vector(0, -LENGTH, 0)];
    var r = [new UE.Vector(0, TANGENT, 0), new UE.Vector(TANGENT, 0, 0), new UE.Vector(0, -TANGENT, 0), new UE.Vector(-TANGENT, 0, 0)];
    this._Yo = this.dYo();
    this._Yo.SetClosedLoop(true);
    this._Yo.ClearSplinePoints();
    var s = UE.NewArray(UE.SplinePoint);
    for (let e = 0; e < t.length; e++) {
      var E = new UE.SplinePoint(e, t[e], r[e], r[e], Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVector, 4);
      s.Add(E);
    }
    this._Yo.AddPoints(s);
  }
  dYo() {
    var e = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.ActorInternal.D_GetTransform());
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      e.SetActorLabel(this.ActorInternal.GetActorLabel() + ":" + GameplayCueMoveSpline.name);
    }
    var e = e.D_AddComponentByClass(UE.KuroMoveSplineComponent.StaticClass(), false, this.ActorInternal.D_GetTransform(), false);
    return e;
  }
}
exports.GameplayCueMoveSpline = GameplayCueMoveSpline;
//# sourceMappingURL=GameplayCueMoveSpline.js.map