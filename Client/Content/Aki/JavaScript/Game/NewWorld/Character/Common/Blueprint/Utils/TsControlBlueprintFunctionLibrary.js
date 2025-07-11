"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../../../Global");
const tmpVector2D = new UE.Vector2D();
const tmpVector = Vector_1.Vector.Create();
class TsControlBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetMoveVectorCache(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 62).GetMoveVectorCache();
    tmpVector2D.X = t.X;
    tmpVector2D.Y = t.Y;
    return tmpVector2D;
  }
  static GetMoveDirectionCache(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 62).GetMoveDirectionCache();
    tmpVector2D.X = t.X;
    tmpVector2D.Y = t.Y;
    return tmpVector2D;
  }
  static GetWorldMoveDirectionCache(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 62).GetWorldMoveDirectionCache();
    tmpVector2D.X = t.X;
    tmpVector2D.Y = t.Y;
    return tmpVector2D;
  }
  static GetMoveVector(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 62).GetMoveVector(tmpVector);
    tmpVector2D.X = tmpVector.X;
    tmpVector2D.Y = tmpVector.Y;
    return tmpVector2D;
  }
  static GetMoveDirection(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 62).GetMoveDirection(tmpVector);
    tmpVector2D.X = tmpVector.X;
    tmpVector2D.Y = tmpVector.Y;
    return tmpVector2D;
  }
  static PlayKuroForceFeedback(t, e, o, r, c) {
    if (Info_1.Info.IsInGamepad() && Global_1.Global.CharacterController) {
      Global_1.Global.CharacterController.PlayKuroForceFeedback(t, e, o, r, c);
    }
  }
  static StopKuroForceFeedback(t, e) {
    if (Global_1.Global.CharacterController) {
      Global_1.Global.CharacterController.StopKuroForceFeedback(t, e);
    }
  }
  static BpInputReceiveEndPlay(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (!!t && !t.IsEnd && !UE.KuroStaticLibrary.IsWorldTearingDown(Info_1.Info.World)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "Bp Input Destroy at Wrong Time.", ["Actor", t.GetComponent(3)?.Actor?.GetName()]);
      }
    }
  }
  static SetUseControllerRotationYaw(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3).UseControllerRotation = e;
  }
  static SetBpInputComponent(t, e) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 62);
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    o.SetBpInputComp(e);
    e.OwnerActor = t.Actor;
  }
}
exports.default = TsControlBlueprintFunctionLibrary;
//# sourceMappingURL=TsControlBlueprintFunctionLibrary.js.map