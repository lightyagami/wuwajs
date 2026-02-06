"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityJumpFixTimeAction = undefined;
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CharacterActorComponent_1 = require("../../../../NewWorld/Character/Common/Component/CharacterActorComponent");
const EntityBaseMoveAction_1 = require("./EntityBaseMoveAction");
class EntityJumpFixTimeAction extends EntityBaseMoveAction_1.EntityMoveAction {
  constructor() {
    super(...arguments);
    this.N4f = 0;
    this.BDc = 0;
    this._ae = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
  }
  OnExecuteAction() {
    var t;
    var i = this.GetMoveActorComp();
    if (i) {
      t = this.Config;
      this.N4f = 0;
      this._ae.DeepCopy(i.ActorLocationProxy);
      i = this.TargetLocation.Z - this._ae.Z;
      this.BDc = i >= 0 ? MathCommon_1.MathCommon.Clamp(i / t.MaxRiseHeightEdge, 0, 1) : MathCommon_1.MathCommon.Clamp(i / t.MaxFallHeightEdge, -1, 0);
    } else {
      this.FinishExecute();
    }
  }
  OnInterruptAction() {}
  TickAction(i) {
    var e = this.GetMoveActorComp();
    if (e) {
      var o = this.Config;
      this.N4f += i;
      if (this.N4f >= o.JumpTime) {
        e.SetActorLocationAndRotation(this.TargetLocation.ToUeVector(), this.TargetRotator.ToUeRotator(), "EntityJumpFixTimeAction");
        if (e instanceof CharacterActorComponent_1.CharacterActorComponent) {
          e.SetInputRotator(this.cie);
        }
        this.FinishExecute();
      } else {
        var s = MathCommon_1.MathCommon.Clamp(this.N4f / o.JumpTime, 0, 1);
        Vector_1.Vector.Lerp(this._ae, this.TargetLocation, s, this.cz);
        var h = this.FDc(s, 2);
        let t = 0;
        t = (this.BDc > 0 ? o.MoveRiseCurve : o.MoveFallCurve).GetFloatValue(s);
        s = Math.abs(this.BDc);
        h = (h * (1 - s) + t * s) * o.MoveBaseHeightOffset;
        this.cz.Z += h;
        s = e.ActorRotationProxy;
        if (s.Equals2(this.TargetRotator)) {
          e.SetActorLocation(this.cz.ToUeVector(), "EntityJumpFixTimeAction", false);
        } else {
          this.cie.DeepCopy(this.TargetRotator);
          MathUtils_1.MathUtils.RotatorInterpConstantTo(s, this.cie, i * MathUtils_1.MathUtils.MillisecondToSecond, o.RotateSpeed, this.cie);
          e.SetActorLocationAndRotation(this.cz.ToUeVector(), this.cie.ToUeRotator(), "EntityJumpFixTimeAction", false);
          if (e instanceof CharacterActorComponent_1.CharacterActorComponent) {
            e.SetInputRotator(this.cie);
          }
        }
      }
    } else {
      this.FinishExecute();
    }
  }
  FDc(t, i) {
    return 1 - Math.pow(Math.abs(t * 2 - 1), i);
  }
}
exports.EntityJumpFixTimeAction = EntityJumpFixTimeAction;
//# sourceMappingURL=EntityJumpFixTimeAction.js.map