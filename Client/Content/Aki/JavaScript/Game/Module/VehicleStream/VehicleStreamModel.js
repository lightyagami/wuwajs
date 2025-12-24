"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleStreamModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const VehicleTeamById_1 = require("../../../Core/Define/ConfigQuery/VehicleTeamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
class VehicleStreamModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.EnableDebug = false;
    this.EnableInteractionSinglePass = false;
    this.EnableRotationOptimize = true;
    this.TransportSystemInitDone = false;
    this.SplineLocation = Vector_1.Vector.Create();
    this.SplineRotation = Rotator_1.Rotator.Create();
    this.BasisForwardVector = Vector_1.Vector.Create();
    this.BasisUpVector = Vector_1.Vector.Create();
    this.BasisRightVector = Vector_1.Vector.Create();
    this.CacheVector = Vector_1.Vector.Create();
    this.kUm = new Map();
    this.qUm = new Map();
    this.OUm = new Map();
    this._Bf = new Map();
    this.GUm = new Map();
    this.FUm = new Map();
    this.dvf = new Map();
  }
  OnLeaveLevel() {
    this.TransportSystemInitDone = false;
    this.OUm.clear();
    this._Bf.clear();
    this.GUm.clear();
    this.FUm.clear();
    this.dvf.clear();
    return true;
  }
  GetAllVehicleTeam() {
    return this.kUm;
  }
  GetVehicleTeam(e) {
    return this.kUm.get(e);
  }
  AddVehicleTeam(e, t) {
    this.kUm.set(e, t);
  }
  RemoveTeamMember(e) {
    var t = this.GetVehicleTeamMember(e);
    if (t) {
      this.GetVehicleTeam(t.TeamId)?.RemoveVehicleMember(e);
      t.Destroy();
    }
  }
  GetVehicleTeamMember(e) {
    return this.qUm.get(e);
  }
  OnAddVehicleTeamMember(e, t) {
    if (this.qUm.get(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "[VehicleStream]VehicleStreamModel.OnAddVehicleTeamMember:同一个载具重复添加", ["vehicleCreatureDataId", e]);
      }
    } else {
      this.qUm.set(e, t);
    }
  }
  OnRemoveVehicleTeamMember(e) {
    this.qUm.delete(e);
  }
  AddIntersection(t, r) {
    if (this.OUm.get(t)) {
      return false;
    }
    var i = [];
    for (let e = 0; e < r.Num(); e++) {
      var a = r.Get(e);
      this._Bf.set(a, t);
      i.push(a);
    }
    this.OUm.set(t, i);
    return true;
  }
  RecordCrossingRoadways(e, t) {
    if (this.GUm.get(e)) {
      return false;
    }
    var r = [];
    for (let e = 0; e < t.Num(); e++) {
      var i = t.Get(e);
      r.push(i);
    }
    this.GUm.set(e, r);
    return true;
  }
  GetRelativePosition(e, t) {
    if (!(e <= 0)) {
      var r = VehicleTeamById_1.configVehicleTeamById.GetConfig(e);
      if (r) {
        return Vector_1.Vector.Create(r?.PositionList[t]);
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "[VehicleStream]VehicleStreamModel.GetRelativePosition:找不到车队配置", ["id", e]);
      }
    }
  }
  EnterRoadway(e, t) {
    let r = this.FUm.get(e);
    if (!r) {
      r = new Set();
      this.FUm.set(e, r);
    }
    r.add(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VehicleStream", 18, "EnterRoadway", ["CreatureDataId", t], ["roadwayId", e]);
    }
  }
  ExitRoadway(e, t) {
    var r = this.FUm.get(e);
    if (r && r.size !== 0 && (r.delete(t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("VehicleStream", 18, "ExitRoadway", ["CreatureDataId", t], ["roadwayId", e]);
    }
  }
  GetAllVehicleInRoadway(e) {
    return this.FUm.get(e);
  }
  CheckIntersectionRoadwayOccupied(e) {
    if (this.EnableInteractionSinglePass && this.FUm.get(e)?.size) {
      return true;
    }
    var t = this.GetIntersectionId(e);
    var t = this.OUm.get(t);
    if (t) {
      for (const r of t) {
        if (r !== e && this.FUm.get(r)?.size) {
          return true;
        }
      }
    }
    return false;
  }
  AddWaitTransportInitVehicle(e, t) {
    this.dvf.set(e, t);
  }
  GetWaitTransportInitVehicles() {
    return this.dvf;
  }
  GetIntersectionId(e) {
    return this._Bf.get(e) ?? 0;
  }
}
exports.VehicleStreamModel = VehicleStreamModel;
//# sourceMappingURL=VehicleStreamModel.js.map