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
    this.$Jf = Vector_1.Vector.Create();
    this.Roadways = [];
    this.SplinePoints = UE.NewArray(UE.Vector2D);
    this.Hce = 0;
    this.Mkf = false;
    this.azf = new Map();
    this.gtg = new Stack_1.Stack();
    this.xZf = false;
    this.$8m = false;
    this.j8m = 0;
  }
  get PlayerPoint() {
    return ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.ActorLocationProxy ?? Vector_1.Vector.ZeroVectorProxy;
  }
  GetIsShowStartPoint() {
    return !ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot() && !this.$8m && !this.GetIsShowPlayerToTargetLine();
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
    return this.Mkf;
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
    this.Ctg();
    if (this.Roadways.length !== 0) {
      this.ptg();
      this.Hce = AutoPilotUtil_1.AutoPilotUtil.GenerateAllSplinePoints(this.Roadways, this.SplinePoints, this.StartPoint, this.EndPoint, this.azf);
    }
  }
  Ctg() {
    this.azf.forEach(t => {
      t.length = 0;
      this.gtg.Push(t);
    });
    this.azf.clear();
  }
  ptg() {
    for (const t of this.Roadways) {
      this.azf.set(t.Id, this.gtg.Pop() ?? []);
    }
  }
  GetDistSquaredPlayerToEndPoint() {
    return this.j8m;
  }
  RefreshHasArriveStartPoint() {
    var t;
    var i;
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsOnNearestRoadway() && this.Roadways.length !== 0 && (t = this.Roadways[0], (i = ModelManager_1.ModelManager.AutoPilotModel?.GetNearestRoadway())?.Roadway?.Id === t.Id || i?.Roadway?.Id === t.OpposingId || AutoPilotUtil_1.AutoPilotUtil.IsNearRoadWay(t, this.PlayerPoint) || (i = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem().GetRoadWay(t.OpposingId)) && AutoPilotUtil_1.AutoPilotUtil.IsNearRoadWay(i, this.PlayerPoint))) {
      this.$8m = true;
    } else {
      this.$8m = false;
    }
  }
  GetHasArriveStartPoint() {
    return this.$8m;
  }
  SetIsShowPlayerToTargetLine(t, i) {
    if (this.Mkf !== t) {
      if (t && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "直接连接玩家和目标点", ["reason", i]);
      }
      this.Mkf = t;
    }
  }
  RefreshData(t, i, e, s) {
    this.MapId = t;
    this.$Jf.DeepCopy(i);
    this.TargetPoint.DeepCopy(e);
    if (s) {
      this.StartPoint.DeepCopy(s.RoadStartPoint);
      this.Roadways.length = 0;
      var r = s.Roadways.Num();
      for (let t = 0; t < r; t++) {
        this.Roadways.push(s.Roadways.Get(t));
      }
      this.EndPoint.DeepCopy(s.RoadEndPoint);
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
          this.j8m = Vector_1.Vector.DistSquared(this.PlayerPoint, this.EndPoint);
        }
      }
    } else {
      this.SetIsShowPlayerToTargetLine(true, "没有找到路径");
    }
  }
  RefreshDataInAutoPilot() {
    this.xZf = true;
    this.StartPoint.DeepCopy(this.PlayerPoint);
    this.j8m = Vector_1.Vector.DistSquared(this.PlayerPoint, this.EndPoint);
    var t = ModelManager_1.ModelManager.AutoPilotModel?.SplineMoveComp?.CurrentSplineMoveParams?.CurrentRouteIndex;
    if (t !== undefined) {
      if (t === this.Roadways.length - 1) {
        if (AutoPilotUtil_1.AutoPilotUtil.CheckReachEnd(this.Roadways[t].RoadSpline, this.StartPoint, this.EndPoint)) {
          ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("OnReachEndPoint");
          return;
        }
      }
      AutoPilotUtil_1.AutoPilotUtil.ProcessSplinePointsForAutoPilotRoute(this.Roadways[t], this.SplinePoints, this.StartPoint, this.azf);
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
    if (this.xZf) {
      return !(this.xZf = false);
    } else {
      return this.Roadways.length !== 0 && (t = Vector_1.Vector.DistSquared(t, this.$Jf), i = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotRoadWayWidthOffset, (i = this.Roadways[0].Width / 2 + i) * i < t);
    }
  }
}
exports.AutoPilotFindPathResult = AutoPilotFindPathResult;
//# sourceMappingURL=AutoPilotFindPathResult.js.map