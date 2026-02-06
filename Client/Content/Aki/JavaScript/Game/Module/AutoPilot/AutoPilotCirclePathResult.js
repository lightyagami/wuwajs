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
  constructor(t, e) {
    this.MapId = 0;
    this.CircleId = 0;
    this.CircleRoadWaysIds = undefined;
    this.PathToCircleSplinePoints = UE.NewArray(UE.Vector2D);
    this.Nwf = [];
    this.Vwf = true;
    this.thg = Vector_1.Vector.Create();
    this.vgg = new Map();
    this.RefreshPathToCircleDataInAutoPilot = () => {
      var t = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
      if (t) {
        var e = ModelManager_1.ModelManager.AutoPilotModel?.SplineMoveComp?.CurrentSplineMoveParams?.CurrentRouteIndex;
        if (e !== undefined) {
          if (e === this.Nwf.length - 1) {
            if (AutoPilotUtil_1.AutoPilotUtil.CheckReachEnd(this.Nwf[e].RoadSpline, t.ActorLocationProxy, this.thg)) {
              this.RefreshIsInCircle(true);
              return;
            }
          }
          AutoPilotUtil_1.AutoPilotUtil.ProcessSplinePointsForAutoPilotRoute(this.Nwf[e], this.PathToCircleSplinePoints, t.ActorLocationProxy, this.vgg);
        }
      }
    };
    this.CircleId = t;
    this.Vwf = e;
    e = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(t);
    this.MapId = e?.MapId ?? 0;
    this.CircleRoadWaysIds = e?.WaySplines;
  }
  RefreshPathToCircleData() {
    if (!this.Vwf) {
      var t = ModelManager_1.ModelManager.AutoPilotModel?.EnterCircleRoadId;
      if (t) {
        t = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem().GetRoadWay(t)?.RoadSpline?.D_GetLocationAtSplinePoint(1, 1);
        if (t) {
          this.thg.DeepCopy(t);
          t = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
          if (t) {
            var e = ControllerHolder_1.ControllerHolder.TransportController.FindPath(t.ActorLocationProxy, this.thg, true, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
            if (e) {
              this.Nwf.length = 0;
              var r = e.Roadways.Num();
              for (let t = 0; t < r; t++) {
                var i = e.Roadways.Get(t);
                this.Nwf.push(i);
                this.vgg.set(i.Id, []);
              }
              AutoPilotUtil_1.AutoPilotUtil.GenerateAllSplinePoints(this.Nwf, this.PathToCircleSplinePoints, t.ActorLocationProxy, this.thg, this.vgg);
              ControllerHolder_1.ControllerHolder.AutoPilotController.AddTick(this.RefreshPathToCircleDataInAutoPilot);
            }
          }
        }
      }
    }
  }
  GenerateAutopilotRoute() {
    let t = undefined;
    if (this.Vwf) {
      if (this.CircleRoadWaysIds) {
        return t = TransportNetworkController_1.TransportNetworkController.GetAssembleAutopilotRoute(this.CircleRoadWaysIds, true, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
      } else {
        return undefined;
      }
    }
    var e = [];
    for (const r of this.Nwf) {
      e.push(r.Id);
    }
    return t = TransportNetworkController_1.TransportNetworkController.GetAssembleAutopilotRoute(e, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
  }
  RefreshIsInCircle(t) {
    if (this.Vwf !== t) {
      if (this.Vwf = t) {
        ControllerHolder_1.ControllerHolder.AutoPilotController.RemoveTick(this.RefreshPathToCircleDataInAutoPilot);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCircleStateChange, t);
    }
  }
  GetIsInCircle() {
    return this.Vwf;
  }
}
exports.AutoPilotCirclePathResult = AutoPilotCirclePathResult;
//# sourceMappingURL=AutoPilotCirclePathResult.js.map