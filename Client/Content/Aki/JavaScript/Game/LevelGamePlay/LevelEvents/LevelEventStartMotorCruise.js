"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventStartMotorCruise = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TransportNetworkController_1 = require("../../Module/Transport/TransportNetworkController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStartMotorCruise extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.jwu = undefined;
    this.Gmf = e => {
      if (!e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 87, "StartMotorCruise:巡航完成");
        }
        ModelManager_1.ModelManager.AutoPilotModel?.SetIsCanShowSkipBtn(false);
        ModelManager_1.ModelManager.AutoPilotModel?.ClearTrackingData();
        this.FinishExecute(true);
      }
    };
  }
  ExecuteNew(e, t) {
    this.jwu = e;
    var r;
    var e = TransportNetworkController_1.TransportNetworkController.GetTransportSystem().GetRoadWay(this.jwu.StartPoint.Spline);
    if (e) {
      r = e.RoadSpline?.D_GetLocationAtSplinePoint(this.jwu.StartPoint.PointId, 1);
      e = e.RoadSpline?.GetRotationAtSplinePoint(this.jwu.StartPoint.PointId, 1);
      if (r && e) {
        this.oIf(r, e);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 87, "巡航起点样条线上的点id不存在", ["PointId", this.jwu.StartPoint.PointId]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 87, "巡航起点样条线id不存在", ["SplineId", this.jwu.StartPoint.Spline]);
      }
      this.FinishExecute(false);
    }
  }
  async oIf(e, t) {
    if (await ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayerInVehicle({
      ClientReason: "LevelEventStartMotorCruise",
      TargetPosition: e,
      TargetRotation: t,
      TeleportMode: 0
    })) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 87, "StartMotorCruise:传送到起点");
      }
      this.nIf();
    } else {
      this.FinishExecute(false);
    }
  }
  async nIf() {
    var e;
    if (this.jwu) {
      if (e = TransportNetworkController_1.TransportNetworkController.GetTransportSystem().GetRoadWay(this.jwu.EndPoint.Spline)) {
        if (e = e.RoadSpline?.D_GetLocationAtSplinePoint(this.jwu.EndPoint.PointId, 1)) {
          e = {
            TargetPos: Vector_1.Vector.Create(e),
            MapId: ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId
          };
          ModelManager_1.ModelManager.AutoPilotModel?.SetIsCanShowSkipBtn(this.jwu.AllowSkip);
          ModelManager_1.ModelManager.AutoPilotModel?.SetTrackingData(e);
          if (await ControllerHolder_1.ControllerHolder.AutoPilotController.EnterAutoPilot()) {
            EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.OnAutoPilotStateChange, this.Gmf);
          } else {
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 87, "巡航终点样条线上的点id不存在", ["PointId", this.jwu.EndPoint.PointId]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 87, "巡航终点样条线id不存在", ["SplineId", this.jwu.EndPoint.Spline]);
        }
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
}
exports.LevelEventStartMotorCruise = LevelEventStartMotorCruise;
//# sourceMappingURL=LevelEventStartMotorCruise.js.map