"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../../../GlobalData");
class TsTraceBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SphereDetect(r, e, t, i, n = true, a = false) {
    TsTraceBlueprintFunctionLibrary.SphereElement ||= new UE.TraceSphereElement();
    var c = TsTraceBlueprintFunctionLibrary.SphereElement;
    c.Radius = r;
    c.WorldContextObject = GlobalData_1.GlobalData.World;
    c.SetStartLocation(e.X, e.Y, e.Z);
    c.SetEndLocation(t.X, t.Y, t.Z);
    c.SetObjectTypesQuery(i);
    c.bIsSingle = n;
    if (a) {
      c.SetDrawDebugTrace(2);
      c.DrawTime = 1;
    }
    return TraceElementCommon_1.TraceElementCommon.SphereTrace(c, "SphereDetect");
  }
  static BoxDetect(r, e, t, i, n = true, a = false) {
    TsTraceBlueprintFunctionLibrary.BoxElement ||= new UE.TraceBoxElement();
    var c = TsTraceBlueprintFunctionLibrary.BoxElement;
    c.WorldContextObject = GlobalData_1.GlobalData.World;
    c.SetBoxHalfSize(r.X, r.Y, r.Z);
    c.SetStartLocation(e.X, e.Y, e.Z);
    c.SetEndLocation(t.X, t.Y, t.Z);
    TsTraceBlueprintFunctionLibrary.LookVector.FromUeVector(t);
    TsTraceBlueprintFunctionLibrary.LookVector.X -= t.X;
    TsTraceBlueprintFunctionLibrary.LookVector.Y -= t.Y;
    TsTraceBlueprintFunctionLibrary.LookVector.Z -= t.Z;
    TsTraceBlueprintFunctionLibrary.LookVector.Normalize();
    MathUtils_1.MathUtils.LookRotationUpFirst(TsTraceBlueprintFunctionLibrary.LookVector, Vector_1.Vector.UpVectorProxy, TsTraceBlueprintFunctionLibrary.LookQuat);
    var r = TsTraceBlueprintFunctionLibrary.LookQuat.Rotator();
    c.SetBoxOrientation(r.Pitch, r.Yaw, r.Roll);
    c.SetObjectTypesQuery(i);
    c.bIsSingle = n;
    if (a) {
      c.SetDrawDebugTrace(2);
      c.DrawTime = 1;
    }
    return TraceElementCommon_1.TraceElementCommon.BoxTrace(c, "BoxDetect");
  }
}
TsTraceBlueprintFunctionLibrary.SphereElement = undefined;
TsTraceBlueprintFunctionLibrary.BoxElement = undefined;
TsTraceBlueprintFunctionLibrary.LookVector = Vector_1.Vector.Create();
TsTraceBlueprintFunctionLibrary.LookQuat = Quat_1.Quat.Create();
exports.default = TsTraceBlueprintFunctionLibrary; //# sourceMappingURL=TsTraceBlueprintFunctionLibrary.js.map