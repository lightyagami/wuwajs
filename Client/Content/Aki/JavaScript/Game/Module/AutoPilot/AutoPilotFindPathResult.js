"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotFindPathResult = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stack_1 = require("../../../Core/Container/Stack");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoPilotUtil_1 = require("./AutoPilotUtil");
class AutoPilotFindPathResult {
  constructor() {
    this.MapId = 0;
    this.TargetPoint = Vector_1.Vector.Create();
    this.StartPoint = Vector_1.Vector.Create();
    this.EndPoint = Vector_1.Vector.Create();
    this.Hpg = Vector_1.Vector.Create();
    this.Roadways = [];
    this.SplinePoints = UE.NewArray(UE.Vector2D);
    this.Hce = 0;
    this.C3f = false;
    this.vgg = new Map();
    this.JAg = new Stack_1.Stack();
    this.GSg = false;
    this.Y8m = false;
    this.K8m = 0;
    this.CheckFindPathAutoPilotConditions = () => {
      if (ModelManager_1.ModelManager.AutoPilotModel?.CheckCommonConditions()) {
        if (this.GetIsShowPlayerToTargetLine()) {
          ModelManager_1.ModelManager.AutoPilotModel?.SetEnableAutoPilot(0, 6);
        } else {
          this.RefreshHasArriveStartPoint();
          if (this.GetHasArriveStartPoint()) {
            ModelManager_1.ModelManager.AutoPilotModel?.SetEnableAutoPilot(1);
          } else {
            ModelManager_1.ModelManager.AutoPilotModel?.SetEnableAutoPilot(0, 2);
          }
        }
      }
    };
    ControllerHolder_1.ControllerHolder.AutoPilotController.AddTick(this.CheckFindPathAutoPilotConditions);
  }
  get PlayerPoint() {
    return ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.ActorLocationProxy ?? Vector_1.Vector.ZeroVectorProxy;
  }
  GetIsShowStartPoint() {
    return !ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot() && !this.Y8m && !this.GetIsShowPlayerToTargetLine();
  }
  GetIsShowEndPoint() {
    return !this.GetIsShowPlayerToTargetLine();
  }
  GetIsShowHighLightLine() {
    return !this.GetIsShowPlayerToTargetLine();
  }
  GetIsShowPlayerToStartLine() {
    return this.GetIsShowStartPoint() && !this.GetIsShowPlayerToTargetLine();
  }
  GetIsShowEndToTargetLine() {
    return this.GetIsShowEndPoint() && !this.GetIsShowPlayerToTargetLine();
  }
  GetIsShowPlayerToTargetLine() {
    return this.C3f;
  }
  GetTrackingPoint() {
    if (this.GetIsShowStartPoint()) {
      return this.StartPoint;
    } else if (this.GetIsShowEndPoint()) {
      return this.EndPoint;
    } else {
      return undefined;
    }
  }
  RefreshSplinePoints() {
    this.ZAg();
    if (this.Roadways.length !== 0) {
      this.eDg();
      this.Hce = AutoPilotUtil_1.AutoPilotUtil.GenerateAllSplinePoints(this.Roadways, this.SplinePoints, this.StartPoint, this.EndPoint, this.vgg);
    }
  }
  ZAg() {
    this.vgg.forEach(t => {
      t.length = 0;
      this.JAg.Push(t);
    });
    this.vgg.clear();
  }
  eDg() {
    for (const t of this.Roadways) {
      this.vgg.set(t.Id, this.JAg.Pop() ?? []);
    }
  }
  GetDistSquaredPlayerToEndPoint() {
    return this.K8m;
  }
  RefreshHasArriveStartPoint() {
    var t;
    if (this.Roadways.length !== 0 && (t = this.Roadways[0], AutoPilotUtil_1.AutoPilotUtil.IsNearRoadWay(t, this.PlayerPoint) || (t = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem().GetRoadWay(t.OpposingId)) && AutoPilotUtil_1.AutoPilotUtil.IsNearRoadWay(t, this.PlayerPoint))) {
      this.Y8m = true;
    } else {
      this.Y8m = false;
    }
  }
  GetHasArriveStartPoint() {
    return this.Y8m;
  }
  SetIsShowPlayerToTargetLine(t, i) {
    if (this.C3f !== t) {
      if (t && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "直接连接玩家和目标点", ["reason", i]);
      }
      this.C3f = t;
    }
  }
  RefreshData(t, i, e, s) {
    this.MapId = t;
    this.Hpg.FromUeVector(i);
    this.TargetPoint.FromUeVector(e);
    if (s) {
      this.StartPoint.FromUeVector(s.RoadStartPoint);
      this.Roadways.length = 0;
      var r = s.Roadways.Num();
      for (let t = 0; t < r; t++) {
        this.Roadways.push(s.Roadways.Get(t));
      }
      this.EndPoint.FromUeVector(s.RoadEndPoint);
      this.RefreshSplinePoints();
      if (this.Hce < ModelManager_1.ModelManager.AutoPilotModel.GetSplineDistanceThreshold()) {
        this.SetIsShowPlayerToTargetLine(true, "样条线距离过短");
      } else {
        t = Vector_1.Vector.DistSquared2D(this.StartPoint, this.PlayerPoint);
        i = Vector_1.Vector.DistSquared2D(this.EndPoint, this.TargetPoint);
        if (Vector_1.Vector.DistSquared2D(this.PlayerPoint, this.TargetPoint) < t + i) {
          this.SetIsShowPlayerToTargetLine(true, "玩家到目标点距离<起点到切入点+切出点到目标点");
        } else {
          this.SetIsShowPlayerToTargetLine(false);
          this.K8m = Vector_1.Vector.DistSquared(this.PlayerPoint, this.EndPoint);
        }
      }
    } else {
      this.SetIsShowPlayerToTargetLine(true, "没有找到路径");
    }
  }
  RefreshDataInAutoPilot() {
    this.GSg = true;
    this.StartPoint.FromUeVector(this.PlayerPoint);
    this.K8m = Vector_1.Vector.DistSquared(this.PlayerPoint, this.EndPoint);
    var t = ModelManager_1.ModelManager.AutoPilotModel?.SplineMoveComp?.CurrentSplineMoveParams?.CurrentRouteIndex;
    if (t !== undefined) {
      if (t === this.Roadways.length - 1) {
        if (AutoPilotUtil_1.AutoPilotUtil.CheckReachEnd(this.Roadways[t].RoadSpline, this.StartPoint, this.EndPoint)) {
          ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("OnReachEndPoint");
          return;
        }
      }
      AutoPilotUtil_1.AutoPilotUtil.ProcessSplinePointsForAutoPilotRoute(this.Roadways[t], this.SplinePoints, this.StartPoint, this.vgg);
    }
  }
  GetLastRoadWay() {
    return this.Roadways[this.Roadways.length - 1];
  }
  GenerateAutopilotRoute() {
    if (this.Roadways) {
      var t = [];
      for (const i of this.Roadways) {
        t.push(i.Id);
      }
      return ControllerHolder_1.ControllerHolder.TransportController.GetAssembleAutopilotRoute(t, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
    }
  }
  IsNeedRefreshByFindPath(t) {
    var i;
    if (this.GSg) {
      return !(this.GSg = false);
    } else {
      return this.Roadways.length !== 0 && (t = Vector_1.Vector.DistSquared(t, this.Hpg), i = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotRoadWayWidthOffset, (i = this.Roadways[0].Width / 2 + i) * i < t);
    }
  }
  GetStartRotator() {
    var t;
    if (this.Roadways.length !== 0) {
      t = AutoPilotUtil_1.AutoPilotUtil.GetDistanceAlongSplineAtWorldLocation(this.Roadways[0].RoadSpline, this.StartPoint);
      return this.Roadways[0].RoadSpline?.GetRotationAtDistanceAlongSpline(t, 1);
    }
  }
  Clear() {
    ControllerHolder_1.ControllerHolder.AutoPilotController.RemoveTick(this.CheckFindPathAutoPilotConditions);
  }
}
exports.AutoPilotFindPathResult = AutoPilotFindPathResult;
//# sourceMappingURL=AutoPilotFindPathResult.js.map