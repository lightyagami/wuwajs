"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClientTeleportVehicle = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
class LevelEventClientTeleportVehicle extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.hpl = false;
    this._Rf = undefined;
    this._pl = () => {
      var e;
      var t;
      var o;
      var r;
      var l;
      if (this.OPt && Global_1.Global.BaseCharacter?.IsValid() && (e = Global_1.Global.BaseCharacter.CharacterActorComponent) && (e = e.Entity.CheckGetComponent(242).VehicleEntity) && (l = (t = e.GetComponent(250)).Entity.GetComponent(70), (this._Rf = l) && (l.CollectSampleAndSend(true), o = l.GetEnableMovementSync(), this.hpl = o) && l.SetEnableMovementSync(false), o = this.OPt.Pos, l = this.OPt.Rot, o = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0), r = Rotator_1.Rotator.Create(), l ? (r.Pitch = l.X ?? 0, r.Yaw = l.Y ?? 0, r.Roll = l.Z ?? 0) : (l = t.ActorRotationProxy, r.Pitch = l?.Pitch ?? 0, r.Yaw = l?.Yaw ?? 0, r.Roll = l?.Roll ?? 0), this.feg(e.GetComponent(0).GetCreatureDataId(), o, r))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "开始客户端载具传送", ["开始位置", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorLocationProxy], ["目标位置", o], ["开始旋转", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorRotationProxy], ["目标旋转", r], ["原因", "LevelEventClientTeleportVehicle"]);
        }
        ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayerInVehicle({
          ClientReason: "LevelEventClientTeleportVehicle",
          TargetPosition: o.ToUeVector(),
          TargetRotation: r,
          NeedRequestToServer: false
        }).finally(this.cpl);
      } else {
        this.cpl();
        this.FinishExecute(false);
      }
    };
    this.cpl = () => {
      this.FinishExecute(true);
      if (Global_1.Global.BaseCharacter?.IsValid() && this.hpl) {
        this._Rf?.SetEnableMovementSync(true);
        this.hpl = false;
      }
    };
  }
  ExecuteNew(e, t) {
    this.OPt = e;
    if (this.OPt && Global_1.Global.BaseCharacter?.IsValid()) {
      if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Teleport", 79, "当前正处于传送过程中，无法进行客户端先行传送", ["ActionId", this.ActionIndex]);
        }
        this.FinishExecute(false);
      } else {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this._pl();
        }, 100);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  feg(t, o, r) {
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestClientTeleportVehicle(t, o, r, e => {
      if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 79, "客户端传送请求载具传送失败", ["VehicleServerEntityId", t], ["ActionId", this.ActionIndex], ["Location", o], ["Rotation", r]);
        }
      }
    });
    return true;
  }
}
exports.LevelEventClientTeleportVehicle = LevelEventClientTeleportVehicle;
//# sourceMappingURL=LevelEventClientTeleportVehicle.js.map