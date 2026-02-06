"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const ColorUtils_1 = require("../Utils/ColorUtils");
class TsAnimNotifyStateRotateAlignGravity extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.TurnSpeed = 360;
    this.ModelBufferTime = 200;
    this.DebugDraw = false;
    this.TempVector = Vector_1.Vector.Create();
    this.TempVector2 = Vector_1.Vector.Create();
    this.TempVector3 = Vector_1.Vector.Create();
    this.TempRotator = Rotator_1.Rotator.Create();
    this.TempQuat = Quat_1.Quat.Create();
    this.TempQuat2 = Quat_1.Quat.Create();
    this.TempQuat3 = Quat_1.Quat.Create();
  }
  Constructor() {
    this.TempVector = Vector_1.Vector.Create();
    this.TempVector2 = Vector_1.Vector.Create();
    this.TempVector3 = Vector_1.Vector.Create();
    this.TempRotator = Rotator_1.Rotator.Create();
    this.TempQuat = Quat_1.Quat.Create();
    this.TempQuat2 = Quat_1.Quat.Create();
    this.TempQuat3 = Quat_1.Quat.Create();
  }
  K2_NotifyBegin(t, i, s) {
    t = t?.GetOwner();
    return !!t && !!(t instanceof TsBaseCharacter_1.default) && !!t.CharacterActorComponent;
  }
  K2_NotifyTick(i, t, s) {
    if (s < MathUtils_1.MathUtils.KindaSmallNumber) {
      return false;
    }
    i = i.GetOwner();
    if (!(i instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    i = i.CharacterActorComponent;
    if (!i) {
      return false;
    }
    var r = i.MoveComp;
    if (!r) {
      return false;
    }
    var h = i.Entity.GetComponent(242);
    if (!h?.IsOnVehicle) {
      h = r.GravityUp;
      r = MathUtils_1.MathUtils.GetAngleByVectorDot(h, i.ActorUpProxy);
      if (!(Math.abs(r) < 1)) {
        this.DrawAllow(i.ActorLocationProxy, h, ColorUtils_1.ColorUtils.LinearBlue);
        this.TempVector.DeepCopy(i.ActorForwardProxy);
        this.DrawAllow(i.ActorLocationProxy, i.ActorForwardProxy, ColorUtils_1.ColorUtils.LinearWhite);
        r = i.ActorRightProxy;
        this.DrawAllow(i.ActorLocationProxy, r, ColorUtils_1.ColorUtils.LinearGreen);
        Vector_1.Vector.VectorPlaneProject(this.TempVector, h, this.TempVector2);
        if (this.TempVector2.IsNearlyZero()) {
          r.CrossProduct(h, this.TempVector2);
        }
        this.DrawAllow(i.ActorLocationProxy, this.TempVector2, ColorUtils_1.ColorUtils.LinearRed);
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.TempVector2, h, this.TempRotator);
        this.TempRotator.Quaternion(this.TempQuat);
        i.ActorQuatProxy.Inverse(this.TempQuat2);
        this.TempQuat2.Multiply(this.TempQuat, this.TempQuat3);
        r = this.TurnSpeed * s;
        h = Math.abs(Math.acos(this.TempQuat3.W) * 2 * MathUtils_1.MathUtils.RadToDeg);
        let t = 0;
        t = h < MathUtils_1.MathUtils.KindaSmallNumber ? 1 : MathUtils_1.MathUtils.Clamp(r / h, 0, 1);
        Quat_1.Quat.Slerp(i.ActorQuatProxy, this.TempQuat, t, this.TempQuat3);
        this.TempQuat3.Rotator(this.TempRotator);
        i.SetActorRotation(this.TempRotator.ToUeRotator(), "TsAnimNotifyStateRotateAlignGravity.Tick", false);
      }
    }
    return true;
  }
  K2_NotifyEnd(t, i) {
    var s;
    var r;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent) && !!(r = t.MoveComp) && (t.Entity.GetComponent(242)?.IsOnVehicle || (r = r.GravityUp, s = MathUtils_1.MathUtils.GetAngleByVectorDot(r, t.ActorUpProxy), Math.abs(s) < 1) || (this.TempVector.DeepCopy(t.ActorForwardProxy), s = t.ActorRightProxy, Vector_1.Vector.VectorPlaneProject(this.TempVector, r, this.TempVector2), this.TempVector2.IsNearlyZero() && s.CrossProduct(r, this.TempVector2), MathUtils_1.MathUtils.LookRotationForwardFirst(this.TempVector2, r, this.TempRotator), r = (s = t.Entity.GetComponent(188))?.GetMeshTransform(), t.SetActorRotation(this.TempRotator.ToUeRotator(), "TsAnimNotifyStateRotateAlignGravity.End", false), s && r && s?.SetModelBuffer(r, this.ModelBufferTime)), true);
  }
  GetNotifyName() {
    return "旋转对齐Up到重力反方向";
  }
  DrawAllow(t, i, s) {
    if (this.DebugDraw) {
      this.TempVector3.DeepCopy(i);
      this.TempVector3.MultiplyEqual(100);
      this.TempVector3.AdditionEqual(t);
      UE.KismetSystemLibrary.D_DrawDebugArrow(GlobalData_1.GlobalData.World, t.ToUeVector(), this.TempVector3.ToUeVector(), 30, s);
    }
  }
}
exports.default = TsAnimNotifyStateRotateAlignGravity;
//# sourceMappingURL=TsAnimNotifyStateRotateAlignGravity.js.map