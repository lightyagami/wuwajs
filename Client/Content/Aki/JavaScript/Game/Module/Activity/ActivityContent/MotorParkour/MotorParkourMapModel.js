"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourMapModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapUtil_1 = require("../../../Map/MapUtil");
const MotorParkourDefine_1 = require("./MotorParkourDefine");
class MotorParkourMapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Vnr = undefined;
    this.kG = 1;
    this.Qzu = Vector2D_1.Vector2D.Create();
    this.TUf = 0;
    this.V8m = Vector2D_1.Vector2D.Create();
    this.CTn = Vector2D_1.Vector2D.Create();
    this.EndPointOffset = Vector2D_1.Vector2D.Create();
    this.EndPointRotator = new UE.Rotator();
    this.SplinePoints = UE.NewArray(UE.Vector2D);
    this.PathTakenSplinePoints = UE.NewArray(UE.Vector2D);
  }
  InitSplinePoints(t, e, i, r, o) {
    this.kG = e;
    this.Qzu = i;
    if (Global_1.Global.BaseCharacter) {
      this.Vnr = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t, Global_1.Global.BaseCharacter.EntityId, 1);
      if (this.Vnr) {
        this.TUf = this.Vnr.GetDistanceAlongSplineAtSplinePoint(0);
        this.TUf = this.Vnr.GetDistanceAlongSplineAtSplinePoint(r);
        e = this.Vnr.GetDistanceAlongSplineAtSplinePoint(o);
        this.GetSplinePoints(e, this.SplinePoints, this.TUf === e);
        i = this.SplinePoints.Get(this.SplinePoints.Num() - 1);
        this.EndPointOffset.Set(i.X, i.Y);
        r = this.Vnr.D_GetArriveTangentAtSplinePoint(o, 1);
        this.EndPointRotator.Yaw = -(Math.atan2(r.Y, r.X) * MathUtils_1.MathUtils.RadToDeg + MotorParkourDefine_1.MOTORPARKOUR_WORLD_TO_UI_ROTATION_REVISE_ANGLE);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorParkour", 71, "摩托车跑酷spline获取失败", ["SplineId", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "当前角色实体不存在，样条线组件无法绑定角色实体");
    }
  }
  GetPathTakenSplinePoints() {
    var t;
    if (this.Vnr && (t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation())) {
      t = this.Vnr.D_FindInputKeyClosestToWorldLocation(t.ToUeVector());
      t = this.Vnr.GetDistanceAlongSplineAtSplineInputKey(t);
      this.GetSplinePoints(t, this.PathTakenSplinePoints);
    }
    return this.PathTakenSplinePoints;
  }
  GetSplinePoints(t, e, i = false) {
    var r;
    var o;
    if (this.Vnr) {
      e.Empty();
      r = this.Vnr.GetSplineLength();
      o = t < this.TUf;
      if (i || o) {
        this.AddPoints(this.TUf, r, e);
        this.AddPoints(0, t, e);
      } else {
        this.AddPoints(this.TUf, t, e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "样条线组件不存在");
    }
  }
  AddPoints(e, i, r) {
    if (this.Vnr) {
      let t = e;
      while (t !== i) {
        var o = this.Vnr.D_GetLocationAtDistanceAlongSpline(t, 1);
        this.CTn.Set(o.X, o.Y);
        MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn).Multiply(this.kG, this.V8m).Subtraction(this.Qzu, this.V8m);
        r.Add(this.V8m.ToUeVector2D());
        t = Math.min(t + MotorParkourDefine_1.SPLINE_DISTANCE_INTERVAL, i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "样条线组件不存在");
    }
  }
}
exports.MotorParkourMapModel = MotorParkourMapModel;
//# sourceMappingURL=MotorParkourMapModel.js.map