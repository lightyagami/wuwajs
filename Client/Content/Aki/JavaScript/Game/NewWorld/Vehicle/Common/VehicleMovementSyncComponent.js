"use strict";

var VehicleMovementSyncComponent_1;
var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var i = arguments.length;
  var l = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, t, o, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (r = e[s]) {
        l = (i < 3 ? r(l) : i > 3 ? r(t, o, l) : r(t, o)) || l;
      }
    }
  }
  if (i > 3 && l) {
    Object.defineProperty(t, o, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleMovementSyncComponent = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatLog_1 = require("../../../Utils/CombatLog");
const BaseMovementSyncComponent_1 = require("../../Character/Common/Component/BaseMovementSyncComponent");
const VehiclePathMoveController_1 = require("../Controller/VehiclePathMoveController");
const MOTORCYCLE_MOVE_SYNC_INTERVAL = 0.3;
let VehicleMovementSyncComponent = VehicleMovementSyncComponent_1 = class VehicleMovementSyncComponent extends BaseMovementSyncComponent_1.BaseMovementSyncComponent {
  constructor() {
    super(...arguments);
    this.InputComp = undefined;
    this.VehicleMoveComp = undefined;
    this.PerformComp = undefined;
    this.Li_ = 0;
  }
  OnStart() {
    return !!super.OnStart() && (this.InputComp = this.Entity.GetComponent(253), this.VehicleMoveComp = this.Entity.GetComponent(249), this.PerformComp = this.Entity.GetComponent(246), this.SingleModeSendInterval = this.GetSingleModeMoveSyncInterval(), true);
  }
  DefaultEnableMovementSync() {
    return true;
  }
  GetCurrentMoveSample() {
    var e;
    var t = super.GetCurrentMoveSample();
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e = this.ActorComp.ActorVelocityProxy;
      t.f8n = {
        X: e.X,
        Y: e.Y,
        Z: e.Z
      };
    }
    return t;
  }
  ApplyMoveSample(e, t, o, n, r, i, l, s, c, h, m) {
    super.ApplyMoveSample(e, t, o, n, r, i, l, s, c, h, m);
    this.VehicleMoveComp?.SetForceSpeed(n);
  }
  CustomAfterTickInternal(e) {
    var t;
    var o = VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(this.Entity);
    if (o && this.PerformComp?.VehicleType !== "Motorcycle") {
      if (Time_1.Time.NowSeconds - this.Li_ >= VehicleMovementSyncComponent_1.VehiclePathRatioSyncInterval) {
        (t = Protocol_1.Aki.Protocol.g0_.create()).F4n = this.ActorComp.CreatureData.GetCreatureDataId();
        t.Ii_ = o.SplineId;
        t.Ti_ = o.State.PathRatio * 10000;
        t.l8n = {
          X: this.ActorComp.ActorLocationProxy.X,
          Y: this.ActorComp.ActorLocationProxy.Y,
          Z: this.ActorComp.ActorLocationProxy.Z
        };
        CombatLog_1.CombatLog.Info("Move", this.Entity, "SendSplineMove", ["Ratio", o.State.PathRatio]);
        this.Li_ = Time_1.Time.NowSeconds;
        Net_1.Net.Call(25211, t, () => {});
      }
    } else {
      super.CustomAfterTickInternal(e);
    }
  }
  HandleSplineMoveNotify(e, t) {
    if (VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(this.Entity)) {
      CombatLog_1.CombatLog.Info("Move", this.Entity, "ReceiveSplineMove", ["Ratio", t * 0.0001]);
      VehiclePathMoveController_1.VehiclePathMoveController.SyncEntityPathRatio(this.Entity, e, t * 0.0001);
    }
  }
  CustomPreTickInternal(e) {
    if (!VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(this.Entity)) {
      super.CustomPreTickInternal(e);
    }
  }
  GetSingleModeMoveSyncInterval() {
    if (this.PerformComp?.VehicleType !== "Motorcycle") {
      return 1;
    } else {
      return MOTORCYCLE_MOVE_SYNC_INTERVAL;
    }
  }
};
VehicleMovementSyncComponent.VehiclePathRatioSyncInterval = 2;
VehicleMovementSyncComponent = VehicleMovementSyncComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(256)], VehicleMovementSyncComponent);
exports.VehicleMovementSyncComponent = VehicleMovementSyncComponent; //# sourceMappingURL=VehicleMovementSyncComponent.js.map