"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotCirclePathResult = undefined;
const UE = require("ue");
const AutoPilotCirclesById_1 = require("../../../Core/Define/ConfigQuery/AutoPilotCirclesById");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TransportNetworkController_1 = require("../Transport/TransportNetworkController");
const AutoPilotUtil_1 = require("./AutoPilotUtil");
class AutoPilotCirclePathResult {
  constructor(e, t) {
    this.MapId = 0;
    this.CircleId = 0;
    this.CircleRoadWaysIds = undefined;
    this.PathToCircleSplinePoints = UE.NewArray(UE.Vector2D);
    this._If = [];
    this.uIf = true;
    this.nKf = Vector_1.Vector.Create();
    this.azf = new Map();
    this.CircleId = e;
    this.uIf = t;
    t = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(e);
    this.MapId = t?.MapId ?? 0;
    this.CircleRoadWaysIds = t?.WaySplines;
  }
  RefreshPathToCircleDataInAutoPilot() {
    var e;
    var t;
    if (!this.uIf) {
      if ((e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp) && (t = ModelManager_1.ModelManager.AutoPilotModel?.SplineMoveComp?.CurrentSplineMoveParams?.CurrentRouteIndex) !== undefined) {
        AutoPilotUtil_1.AutoPilotUtil.ProcessSplinePointsForAutoPilotRoute(this._If[t], this.PathToCircleSplinePoints, e.ActorLocationProxy, this.azf);
        this.RefreshIsInCircle();
      }
    }
  }
  RefreshPathToCircleData() {
    if (!this.uIf) {
      var e = ModelManager_1.ModelManager.AutoPilotModel?.EnterCircleRoadId;
      if (e) {
        e = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem().GetRoadWay(e)?.RoadSpline?.D_GetLocationAtSplinePoint(1, 1);
        if (e) {
          this.nKf.DeepCopy(e);
          e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
          if (e) {
            var t = ControllerHolder_1.ControllerHolder.TransportController.FindPath(e.ActorLocationProxy, this.nKf, true, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
            if (t) {
              this._If.length = 0;
              var r = t.Roadways.Num();
              for (let e = 0; e < r; e++) {
                var o = t.Roadways.Get(e);
                this._If.push(o);
                this.azf.set(o.Id, []);
              }
              AutoPilotUtil_1.AutoPilotUtil.GenerateAllSplinePoints(this._If, this.PathToCircleSplinePoints, e.ActorLocationProxy, this.nKf, this.azf);
            }
          }
        }
      }
    }
  }
  GenerateAutopilotRoute() {
    let e = undefined;
    if (this.uIf) {
      if (this.CircleRoadWaysIds) {
        return e = TransportNetworkController_1.TransportNetworkController.GetAssembleAutopilotRoute(this.CircleRoadWaysIds, true, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
      } else {
        return undefined;
      }
    }
    var t = [];
    for (const r of this._If) {
      t.push(r.Id);
    }
    return e = TransportNetworkController_1.TransportNetworkController.GetAssembleAutopilotRoute(t, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
  }
  RefreshIsInCircle() {
    var e = this.RXf();
    if (this.uIf !== e) {
      this.uIf = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCircleStateChange, e);
    }
  }
  RXf() {
    var e;
    return !!ModelManager_1.ModelManager.AutoPilotModel?.GetIsOnNearestRoadway() && !!(e = ModelManager_1.ModelManager.AutoPilotModel?.GetNearestRoadway()) && !!(e = e.Roadway) && (this.CircleRoadWaysIds?.includes(e.Id) ?? false);
  }
  GetIsInCircle() {
    return this.uIf;
  }
}
exports.AutoPilotCirclePathResult = AutoPilotCirclePathResult;
//# sourceMappingURL=AutoPilotCirclePathResult.js.map