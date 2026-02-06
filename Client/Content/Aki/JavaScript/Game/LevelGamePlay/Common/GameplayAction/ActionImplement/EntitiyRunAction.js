"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityRunAction = undefined;
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CharacterActorComponent_1 = require("../../../../NewWorld/Character/Common/Component/CharacterActorComponent");
const EntityBaseMoveAction_1 = require("./EntityBaseMoveAction");
class EntityRunAction extends EntityBaseMoveAction_1.EntityMoveAction {
  constructor() {
    super(...arguments);
    this.xsr = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
  }
  OnExecuteAction() {
    var t = this.GetMoveActorComp();
    if (t) {
      this.TargetLocation.Subtraction(t.ActorLocationProxy, this.xsr);
      this.xsr.Normalize();
    } else {
      this.FinishExecute();
    }
  }
  OnInterruptAction() {}
  TickAction(t) {
    var i;
    var s;
    var o;
    var e = this.GetMoveActorComp();
    if (e) {
      i = this.Config;
      s = e.ActorLocationProxy;
      this.TargetLocation.Subtraction(s, this.cz);
      if (this.cz.SizeSquared() < (o = i.MoveSpeed * t * MathUtils_1.MathUtils.MillisecondToSecond) * o) {
        e.SetActorLocationAndRotation(this.TargetLocation.ToUeVector(), this.TargetRotator.ToUeRotator(), "EntityRunAction");
        if (e instanceof CharacterActorComponent_1.CharacterActorComponent) {
          e.SetInputRotator(this.cie);
        }
        this.FinishExecute();
      } else {
        this.cz.DeepCopy(this.xsr);
        this.cz.MultiplyEqual(o);
        this.cz.AdditionEqual(s);
        if ((o = e.ActorRotationProxy).Equals2(this.TargetRotator)) {
          e.SetActorLocation(this.cz.ToUeVector(), "EntityRunAction", false);
        } else {
          this.cie.DeepCopy(this.TargetRotator);
          MathUtils_1.MathUtils.RotatorInterpConstantTo(o, this.cie, t * MathUtils_1.MathUtils.MillisecondToSecond, i.RotateSpeed, this.cie);
          e.SetActorLocationAndRotation(this.cz.ToUeVector(), this.cie.ToUeRotator(), "EntityRunAction", false);
          if (e instanceof CharacterActorComponent_1.CharacterActorComponent) {
            e.SetInputRotator(this.cie);
          }
        }
      }
    } else {
      this.FinishExecute();
    }
  }
}
exports.EntityRunAction = EntityRunAction;
//# sourceMappingURL=EntitiyRunAction.js.map