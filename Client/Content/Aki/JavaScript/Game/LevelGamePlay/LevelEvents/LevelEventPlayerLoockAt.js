"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayerLoockAt = undefined;
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraBlueprintFunctionLibrary_1 = require("../../Camera/CameraBlueprintFunctionLibrary");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const tmpVector = Vector_1.Vector.Create();
const tmpQuat = Quat_1.Quat.Create();
const tmpRotator = Rotator_1.Rotator.Create();
class LevelEventPlayerLoockAt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(t, e) {
    var r;
    var a;
    var o;
    var l;
    if (t && (a = t.Pos.X, o = t.Pos.Y, l = t.Pos.Z, r = t.CameraMove, a = Vector_1.Vector.Create(a ?? 0, o ?? 0, l ?? 0), o = Global_1.Global.BaseCharacter)) {
      l = o.CharacterActorComponent;
      a.Subtraction(l.ActorLocationProxy, tmpVector);
      MathUtils_1.MathUtils.LookRotationUpFirst(tmpVector, l.ActorUpProxy, tmpQuat);
      if (!tmpQuat.IsNearZero()) {
        tmpQuat.Rotator(tmpRotator);
        if (!t.PlayAnimation) {
          l.SetActorRotation(tmpRotator.ToUeRotator(), "LevelEventPlayerLoockAt", false);
        }
        l.SetInputRotator(tmpRotator);
        if (r) {
          CameraBlueprintFunctionLibrary_1.default.SetCameraRotation(tmpRotator.ToUeRotator());
        }
      }
    }
  }
  ExecuteInGm(t, e) {
    this.FinishExecute(true);
  }
}
exports.LevelEventPlayerLoockAt = LevelEventPlayerLoockAt;
//# sourceMappingURL=LevelEventPlayerLoockAt.js.map