"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleStreamController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const ControllerWithAssistantBase_1 = require("../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const VehicleTeam_1 = require("./StateMachineContainer/VehicleTeam");
const VehicleTeamMember_1 = require("./StateMachineContainer/VehicleTeamMember");
const VehicleStreamDefine_1 = require("./VehicleStreamDefine");
class VehicleStreamController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent();
    Net_1.Net.Register(20251, VehicleStreamController.DUm);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20251);
    super.OnUnRegisterNetEvent();
  }
  static OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TransportSystemInitDone, VehicleStreamController.cvf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TransportSystemInitDone, VehicleStreamController.cvf);
    super.OnRemoveEvents();
  }
  static UUm(e, t) {
    var r = e.Entity.GetComponent(1);
    var o = e.Entity.GetComponent(338);
    VehicleStreamController.RegisterVehicleAndLaunch(e.CreatureDataId, e.PbDataId, t.bAm, t.RAm, t.fom, t.gom, r.ActorLocationProxy, r.ActorRotationProxy, o.GetConfig().BasicConfig, "RoadNetworkEntityStartNavNotifyImp Enable");
  }
  static UnRegisterVehicleTeamMember(e) {
    ModelManager_1.ModelManager.VehicleStreamModel.RemoveTeamMember(e);
  }
  static RegisterVehicleAndLaunch(e, t, r, o, a, i, n, l, c, s) {
    var m = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (m?.Valid) {
      return !!VehicleStreamController.RegisterVehicleTeamMember(e, t, r, o, a, i, n, l, c) && !!(t = m.Entity.GetComponent(338))?.LaunchVehicle() && (t.GetMoveSyncComponent()?.SetEnableMovementSync(true, s), true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "无法获取对应实体", ["creatureDataId", e], ["enableMoveSyncReason", s]);
      }
      return false;
    }
  }
  static RegisterVehicleTeamMember(e, t, r, o, a, i, n, l, c) {
    var s = ModelManager_1.ModelManager.VehicleStreamModel;
    if (s.TransportSystemInitDone) {
      return VehicleStreamController.xUm(e, t, r, o, a, i, n, l, c);
    } else {
      s.AddWaitTransportInitVehicle(e, {
        VehiclePbDataId: t,
        StartRoadId: r,
        StartRoadIndex: o,
        DestRoadId: a,
        DestIndex: i,
        ActorLocation: n,
        ActorRotator: l,
        BaseConfig: c
      });
      return false;
    }
  }
  static xUm(e, t, r, o, a, i, n, l, c) {
    var s = ModelManager_1.ModelManager.VehicleStreamModel;
    let m = s.GetVehicleTeam(0);
    if (!m) {
      m = new VehicleTeam_1.VehicleTeam(0);
      s.AddVehicleTeam(0, m);
    }
    var _;
    var S = m.GetVehicleMember(e);
    if (S) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "[VehicleStream]VehicleStreamController.RegisterVehicleTeamMember:载具实体在车队中已存在", ["CreatureDataId", e]);
      }
      return false;
    } else {
      o = VehicleStreamController.BUm(r, o);
      _ = VehicleStreamController.BUm(a, i);
      return !!o && !!_ && !((s = ControllerHolder_1.ControllerHolder.TransportController.FindPath(o, _, false, true, s.EnableDebug)) && s.Roadways.Num() ? ((S = new VehicleTeamMember_1.VehicleTeamMember(m.TeamId, 0, e, t, n, l, _, a, i, c, s)).Init(), m.AddVehicleMember(e, S), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("VehicleStream", 18, "[VehicleStream]VehicleStreamController.RegisterVehicleTeamMember:查找路径失败", ["CreatureDataId", e], ["startRoadId", r], ["destRoadId", a], ["startLocation", o], ["destinationLocation", _]), 1));
    }
  }
  static LaunchVehicle(e, t) {
    e = ModelManager_1.ModelManager.VehicleStreamModel.GetVehicleTeamMember(e);
    return !!e && (e.Launch(t), true);
  }
  static BUm(e, t) {
    var r = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(e);
    if (r) {
      var o = (0, IComponent_1.getComponent)(r.ComponentsData, "SplineComponent");
      if (o) {
        var a;
        var i;
        var o = o.Option;
        if (o.Type !== IComponent_1.ESplineType.Way) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("VehicleStream", 18, "[VehicleStream]VehicleStreamController.GetSplinePointWorldLocation:SplineComp配置类型不是Way", ["SplineId", e]);
          }
        } else {
          if (!(o.Points.length <= t)) {
            a = ModelManager_1.ModelManager.VehicleStreamModel;
            i = r.Transform.Pos;
            a.SplineLocation.Set(i.X ?? 0, i.Y ?? 0, i.Z ?? 0);
            i = r.Transform.Rot;
            a.SplineRotation.Set(i?.Y ?? 0, i?.Z ?? 0, i?.X ?? 0);
            a.SplineRotation.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, a.BasisForwardVector);
            a.BasisForwardVector.Normalize();
            Vector_1.Vector.UpVectorProxy.CrossProduct(a.BasisForwardVector, a.BasisRightVector);
            a.BasisRightVector.Normalize();
            a.BasisForwardVector.CrossProduct(a.BasisRightVector, a.BasisUpVector);
            a.BasisUpVector.Normalize();
            r = Vector_1.Vector.Create();
            i = o.Points[t].Position;
            r.AdditionEqual(a.SplineLocation);
            a.CacheVector.DeepCopy(a.BasisForwardVector);
            a.CacheVector.MultiplyEqual(i.X ?? 0);
            r.AdditionEqual(a.CacheVector);
            a.CacheVector.DeepCopy(a.BasisRightVector);
            a.CacheVector.MultiplyEqual(i.Y ?? 0);
            r.AdditionEqual(a.CacheVector);
            a.CacheVector.DeepCopy(a.BasisUpVector);
            a.CacheVector.MultiplyEqual(i.Z ?? 0);
            r.AdditionEqual(a.CacheVector);
            return r;
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("VehicleStream", 18, "[VehicleStream]VehicleStreamController.GetSplinePointWorldLocation:splineData配置与服务端对不上", ["SplineId", e]);
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("VehicleStream", 18, "[VehicleStream]VehicleStreamController.GetSplinePointWorldLocation:无法找到SplineComponent配置", ["SplineId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("VehicleStream", 18, "[VehicleStream]VehicleStreamController.GetSplinePointWorldLocation:无法找到Spline EntityData", ["SplineId", e]);
    }
  }
  static RequestNetworkEntityUpdateCurRoadPush(e, t, r) {
    var o = Protocol_1.Aki.Protocol.xLm.create();
    o.F4n = e;
    o.OLm = t;
    o.GLm = r;
    Net_1.Net.Send(18034, o);
  }
}
(exports.VehicleStreamController = VehicleStreamController).cvf = () => {
  var e;
  var t;
  var r = ModelManager_1.ModelManager.VehicleStreamModel;
  r.TransportSystemInitDone = true;
  var r = r.GetWaitTransportInitVehicles();
  for ([e, t] of r) {
    VehicleStreamController.RegisterVehicleAndLaunch(e, t.VehiclePbDataId, t.StartRoadId, t.StartRoadIndex, t.DestRoadId, t.DestIndex, t.ActorLocation, t.ActorRotator, t.BaseConfig, "OnTransportSystemInitDone");
  }
  r.clear();
};
VehicleStreamController.DUm = t => {
  if (t) {
    const r = MathUtils_1.MathUtils.LongToNumber(t.F4n);
    WaitEntityTask_1.WaitEntityTask.Create("RoadNetworkEntityStartNavNotify", r, e => {
      if (e) {
        if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid) {
          VehicleStreamController.UUm(e, t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("VehicleStream", 18, "[VehicleStreamController.OnRoadNetworkEntityStartNavNotify]无法获取对应实体", ["creatureDataId", r], ["F4n", t.F4n]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "[VehicleStreamController.OnRoadNetworkEntityStartNavNotify]实体等待出错", ["creatureDataId", r], ["F4n", t.F4n]);
      }
    }, VehicleStreamDefine_1.WAIT_ENTITY_TIMEOUT, true, true);
  }
}; //# sourceMappingURL=VehicleStreamController.js.map