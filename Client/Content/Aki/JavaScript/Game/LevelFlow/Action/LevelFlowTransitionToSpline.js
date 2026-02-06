"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowTransitionToSpline = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const VehiclePathMoveController_1 = require("../../NewWorld/Vehicle/Controller/VehiclePathMoveController");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowTransitionToSpline extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
    this.TraceLength = 1000;
    this.TraceStartOffset = 500;
    this.yem = 0;
  }
  Init(e) {
    this.pDe = e;
    return this;
  }
  OnExecute() {
    var e;
    var o;
    if (this.pDe) {
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.pDe.EntityId))?.IsInit && e.Entity) {
        if ((e = e.Entity).GetComponent(249)) {
          o = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.pDe.SplineId, e.Id, 1).D_GetTransformAtDistanceAlongSpline(0, 1);
          o = Transform_1.Transform.Create(o);
          if (this.pDe.SnapToWall) {
            this.POm(o);
          }
          if (o = VehiclePathMoveController_1.VehiclePathMoveController.CreateMotorcycleMoveToTask(e, o, this.pDe.Speed)) {
            o.CurveInfo.SplineId = -this.pDe.SplineId;
            o.NeedSync = false;
            o.SimulateRotation = this.pDe.SimulateRotation ?? false;
            o.KeepForward = this.pDe.KeepForward ?? false;
            o.OnMoveEndHandle = e => {
              this.FinishExecute(e);
            };
            VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(o);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelFlow", 58, "CreateMotorcycleMoveToTask failed");
            }
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelFlow", 58, "[MoveWithSpline]实体没有MoveComp", ["PbDataId", e.Id]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelFlow", 58, "[MoveWithSpline]实体无效", ["PbDataId", this.pDe.EntityId]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "[LevelFlowTransitionToSpline]Param is undefined");
      }
      this.FinishExecute(false);
    }
  }
  POm(e) {
    var o = UE.NewObject(UE.TraceSphereElement.StaticClass());
    o.bIsSingle = true;
    o.bIgnoreSelf = true;
    o.WorldContextObject = GlobalData_1.GlobalData.World;
    o.Radius = 30;
    o.bTraceComplex = false;
    o.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    o.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    var r = this.TraceStartOffset;
    var t = this.TraceLength;
    var i = Vector_1.Vector.Create();
    e.GetRotation().RotateVector(Vector_1.Vector.UpVectorProxy, i);
    var l = Vector_1.Vector.Create();
    i.GetSafeNormal(l);
    l.MultiplyEqual(r);
    l.AdditionEqual(e.GetLocation());
    var r = Vector_1.Vector.Create();
    i.GetSafeNormal(r);
    r.MultiplyEqual(-t);
    r.AdditionEqual(e.GetLocation());
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, l);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, r);
    var i = TraceElementCommon_1.TraceElementCommon.SphereTrace(o, "BuildWallSpline");
    if (i && o.HitResult) {
      t = Vector_1.Vector.Create();
      TraceElementCommon_1.TraceElementCommon.GetImpactPoint(o.HitResult, 0, t);
      l = Vector_1.Vector.Create();
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(o.HitResult, 0, l);
      l.Multiply(this.yem, l);
      t.AdditionEqual(l);
      e.SetLocation(t);
    }
  }
}
exports.LevelFlowTransitionToSpline = LevelFlowTransitionToSpline;
//# sourceMappingURL=LevelFlowTransitionToSpline.js.map