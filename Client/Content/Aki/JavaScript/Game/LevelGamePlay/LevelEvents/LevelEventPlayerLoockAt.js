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
    if (t && (r = t.Pos.X, a = t.Pos.Y, o = t.Pos.Z, t = t.CameraMove, r = Vector_1.Vector.Create(r ?? 0, a ?? 0, o ?? 0), a = Global_1.Global.BaseCharacter)) {
      o = a.CharacterActorComponent;
      r.Subtraction(o.ActorLocationProxy, tmpVector);
      MathUtils_1.MathUtils.LookRotationUpFirst(tmpVector, o.ActorUpProxy, tmpQuat);
      if (!tmpQuat.IsNearZero()) {
        tmpQuat.Rotator(tmpRotator);
        o.SetActorRotation(tmpRotator.ToUeRotator(), "LevelEventPlayerLoockAt", false);
        o.SetInputRotator(tmpRotator);
        if (t) {
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