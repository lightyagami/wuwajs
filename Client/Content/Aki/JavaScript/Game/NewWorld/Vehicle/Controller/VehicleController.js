"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GameModePromise_1 = require("../../../World/Define/GameModePromise");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const VehicleInfoDefines_1 = require("../Common/VehicleInfoDefines");
const WAIT_ENTITY_CREATE_TIMEOUT = 60000;
const TRIAL_ROLE_ID = 10000;
const CHECK_DRIVE_INFO_INTERVAL = 500;
class VehicleController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(20941, this.VehicleUpdateNotify);
    Net_1.Net.Register(27000, this.OnUpdateVehicleRideSharingNotify);
    Net_1.Net.Register(23075, this.VehicleUpdateEntityNotify);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRideSharingPassenger, this.OnChangeVehicleRideSharing);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, this.OnRemoveVehicleRideSharing);
    return true;
  }
  static OnTick(e) {
    if (this.Kbl && (this.mie += e, this.mie > CHECK_DRIVE_INFO_INTERVAL)) {
      ModelManager_1.ModelManager.VehicleModel?.UpdateKeepDrivingInfo(this.mie, this.Kbl);
      this.mie = 0;
    }
  }
  static OnClear() {
    Net_1.Net.UnRegister(20941);
    Net_1.Net.UnRegister(27000);
    Net_1.Net.UnRegister(23075);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRideSharingPassenger, this.OnChangeVehicleRideSharing);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, this.OnRemoveVehicleRideSharing);
    return true;
  }
  static VehicleUpdateEntity(e) {
    ModelManager_1.ModelManager.VehicleModel.UpdateEntityVehicleData(e);
    this.RegisterWaitEntityTask(e);
  }
  static W5_(e, t, r, a = 0) {
    if (e?.IsInit && t?.IsInit && (t = t.GetComponent(234))) {
      if (r !== -1) {
        t.Enter(e, r);
      } else {
        t.Leave(e, a);
      }
    }
  }
  static async UpdatePlayerVehiclePerform() {
    var e;
    var t;
    var r;
    var a;
    var o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var i = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(o);
    if (i && (a = i.EntityCreatureId, e = i.VehicleCreatureId, t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a)?.Entity, r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity, this.Q5_ && (this.Q5_.SetResult(true), this.Q5_ = undefined), t?.IsInit && r?.IsInit || (Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 48, "角色或船未加载完成，进行等待", ["passengerCreatureId", a], ["vehicleCreatureId", e]), this.Q5_ = new GameModePromise_1.GameModePromise(), WaitEntityTask_1.WaitEntityTask.Create("VehicleController.UpdatePlayerVehiclePerform", [e, a], () => {
      this.Q5_?.SetResult(true);
      this.Q5_ = undefined;
    }, WAIT_ENTITY_CREATE_TIMEOUT)), await this.Q5_?.Promise, a === (a = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(o))?.EntityCreatureId) && e === a?.VehicleCreatureId) {
      this.W5_(t, r, -1, 1);
      this.W5_(t, r, i.Seat, i.ExitType);
    }
  }
  static OnCharacterActivate(e) {
    var t = e.GetComponent(0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "OnRoleActivate", ["PlayerId", t.GetPlayerId()], ["PlayerCreatureId", t.GetCreatureDataId()]);
    }
    var r = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(t.GetPlayerId());
    if (r?.EntityCreatureId !== t.GetCreatureDataId()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "OnRoleActivate 非当前角色乘坐", ["PlayerId", t.GetPlayerId()], ["PlayerCreatureId", t.GetCreatureDataId()]);
      }
    } else if (r?.VehicleCreatureId) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r.VehicleCreatureId)?.Entity;
      this.W5_(e, t, r.Seat, r.ExitType);
    }
  }
  static OnVehicleActivate(e) {
    var t;
    var r = e.GetComponent(0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "OnVehicleActivate", ["VehicleCreatureId", r.GetCreatureDataId()]);
    }
    var r = ModelManager_1.ModelManager.VehicleModel.GetVehiclePlayerData(r.GetCreatureDataId());
    for (const a of r) {
      if (a.VehicleCreatureId && a.Seat >= 0) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a.EntityCreatureId)?.Entity;
        this.W5_(t, e, a.Seat, a.ExitType);
      }
    }
  }
  static RegisterWaitEntityTask(r) {
    var e = ModelManager_1.ModelManager.VehicleModel.PassengerVehicleMap.get(r.EntityCreatureId);
    if (e?.Context?.Equals(r) && !e.WaitTask) {
      const a = r.EntityCreatureId;
      const o = r.VehicleCreatureId;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "[VehicleController] 创建载具等待实体任务", ["EntityCreatureId", a], ["VehicleCreatureId", o], ["Seat", r.Seat]);
      }
      e.WaitTask = WaitEntityTask_1.WaitEntityTask.Create("VehicleController.RegisterWaitEntityTask", [o, a], e => {
        var t;
        if (e && (e = ModelManager_1.ModelManager.VehicleModel.PassengerVehicleMap.get(a))?.Context?.Equals(r)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Vehicle", 50, "[VehicleController] 开始执行载具等待实体任务", ["EntityCreatureId", a], ["VehicleCreatureId", o], ["Seat", r.Seat]);
          }
          e.WaitTask = undefined;
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a)?.Entity;
          t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Entity;
          this.W5_(e, t, r.Seat, r.ExitType);
          ModelManager_1.ModelManager.VehicleModel.PostUpdateVehicleEntityData(r);
        }
      }, WAIT_ENTITY_CREATE_TIMEOUT, false, true);
    }
  }
  static TryEnterRideSharingMode(e) {
    var t;
    var r;
    if (this.CanResponseRideSharingModeChange(e)) {
      if (ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing) {
        t = e.VehicleEntity?.GetComponent(235);
        r = e.PassengerEntity?.GetComponent(2);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "重复进入共乘玩法", ["VehicleId", t?.CreatureData.GetPbDataId()], ["PassengerId", r?.CreatureData.GetPbDataId()], ["Seat", e.Seat]);
        }
      } else {
        this.EnterRideSharingMode(e);
      }
    }
  }
  static EnterRideSharingMode(e) {
    ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterVehicleRideSharing, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 50, "进入共乘玩法");
    }
  }
  static TryExitRideSharingMode(e) {
    var t;
    var r;
    if (this.CanResponseRideSharingModeChange(e)) {
      if (!ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing) {
        t = e.VehicleEntity?.GetComponent(235);
        r = e.PassengerEntity?.GetComponent(2);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "离开载具前已退出共乘玩法", ["VehicleId", t?.CreatureData.GetPbDataId()], ["PassengerId", r?.CreatureData.GetPbDataId()], ["Seat", e.Seat]);
        }
      }
      this.ExitRideSharingMode(e);
    }
  }
  static ExitRideSharingMode(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, e);
    var t = ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.size;
    for (let e = 0; e < t; e++) {
      this.OnRemoveVehicleRideSharing(-1, -1);
    }
    ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing = false;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 50, "退出共乘玩法");
    }
  }
  static CanResponseRideSharingModeChange(e) {
    return !!e.IsRolePassenger(true) && !(e.PassengerEntity.GetComponent(0).GetRoleId() > TRIAL_ROLE_ID) && !!e.VehicleEntity.GetComponent(234) && !!this.CheckVehicleTypeForRideSharing(e);
  }
  static CheckVehicleTypeForRideSharing(e) {
    return true;
  }
  static OnChangeMode() {
    ModelManager_1.ModelManager.VehicleModel.Reset();
    return true;
  }
  static SetRideSharingEnable(e) {
    if (ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing === e && (ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing = !e, Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(230)?.VehicleEntity?.GetComponent(238)?.RefreshRideSharingSkillState(), !e)) {
      var t = ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.size;
      for (let e = 0; e < t; e++) {
        this.OnRemoveVehicleRideSharing(-1, -1);
      }
    }
  }
  static $bl(e) {
    if (e.IsDriver && e.IsRolePassenger(true) && e.VehicleEntity) {
      this.Kbl = e.VehicleEntity.GetComponent(237);
      switch (e.VehicleType) {
        case "Gongduola":
          ModelManager_1.ModelManager.GameAudioModel.AddAllGondolaMusic(e.VehicleEntity);
          break;
        case "FishingBoat":
          ModelManager_1.ModelManager.GameAudioModel.RegisterFishingAudioEvent();
      }
    }
  }
  static zbl(e) {
    if (e.IsDriver && e.IsRolePassenger(true)) {
      this.Kbl = undefined;
      this.mie = 0;
      switch (e.VehicleType) {
        case "Gongduola":
          ModelManager_1.ModelManager.GameAudioModel.StopAllGondolaMusic();
          break;
        case "FishingBoat":
          ModelManager_1.ModelManager.GameAudioModel.RemoveFishingAudioEvent();
      }
    }
  }
  static ToServerExitVehicleType(e) {
    switch (e) {
      case 1:
        return Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeNormal;
      case 3:
        return Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeDelayShow;
      case 2:
        return Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeSeatStandUp;
      default:
        return Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeLaunch;
    }
  }
  static CJl(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeNormal:
        return 1;
      case Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeDelayShow:
        return 3;
      case Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeSeatStandUp:
        return 2;
      default:
        return 0;
    }
  }
  static K6_(e) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(e) ?? ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(e) ?? ModelManager_1.ModelManager.CreatureModel.GetEntityWithPendingRemoveContainer(e);
  }
}
exports.VehicleController = VehicleController;
(_a = VehicleController).mie = 0;
VehicleController.Kbl = undefined;
VehicleController.Q5_ = undefined;
VehicleController.VehicleUpdateNotify = e => {
  var t;
  var r;
  var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e.W5n)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
  if (a) {
    (t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId = e.W5n;
    t.EntityCreatureId = a;
    t.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    t.Seat = e.fhl;
    t.ExitType = _a.CJl(e.bI_);
    ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(t);
    a = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.EntityCreatureId)?.Entity;
    r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.VehicleCreatureId)?.Entity;
    _a.W5_(a, r, t.Seat, t.ExitType);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Vehicle", 50, "[VehicleController] 服务器下发载具数据更新时无法获取对应PlayerId的CreatureId", ["PlayerId", e.W5n], ["VehicleId", MathUtils_1.MathUtils.LongToNumber(e.F4n)], ["Seat", e.fhl]);
  }
};
VehicleController.VehicleUpdateEntityNotify = e => {
  var t = new VehicleInfoDefines_1.EntityVehicleInfo();
  t.EntityCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  t.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.TI_);
  t.Seat = e.phl ? e.fhl : -1;
  t.ExitType = _a.CJl(e.bI_);
  _a.VehicleUpdateEntity(t);
};
VehicleController.OnEnterVehicle = e => {
  _a.TryEnterRideSharingMode(e);
  _a.$bl(e);
};
VehicleController.OnLeaveVehicle = e => {
  _a.TryExitRideSharingMode(e);
  _a.zbl(e);
};
VehicleController.OnChangeVehicleRideSharing = (t, r) => {
  var e;
  var a = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(231)?.VehicleEntity;
  if (a && ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing && !ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing && (a = a.GetComponent(234), (a = r !== -1 ? r : a.TryFindUsableSeat(false)) !== -1) && ((e = Protocol_1.Aki.Protocol.vp_.create()).Q6n = t, e.fhl = a, Net_1.Net.Call(24771, e, e => {
    if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "共乘ChangeRole请求失败", ["ErrorCode", e.Q4n], ["RoleId", t], ["Seat", r]);
    }
  }), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Vehicle", 50, "发送共乘玩法Change通知", ["RoleId", t], ["Seat", r]);
  }
};
VehicleController.OnRemoveVehicleRideSharing = (e, t) => {
  var r = ModelManager_1.ModelManager.VehicleModel;
  if (r.IsReadyRiderSharing && r.RideSharingInfoMap.size) {
    r = r.RideSharingInfoMap.values().next().value;
    const a = Protocol_1.Aki.Protocol.Sp_.create();
    a.Q6n = e === -1 ? r.RoleId : e;
    Net_1.Net.Call(23584, a, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "共乘RemoveRole请求失败", ["ErrorCode", e.Q4n], ["RoleId", a.Q6n]);
      }
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 50, "发送共乘玩法Remove通知", ["RoleId", a.Q6n]);
    }
  }
};
VehicleController.OnUpdateVehicleRideSharingNotify = e => {
  var t;
  if (e.Q6n) {
    t = new VehicleInfoDefines_1.VehicleRideSharingInfo(e);
    ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.set(e.fhl, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, t.RoleId, t.Seat);
  } else {
    t = ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.get(e.fhl);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, t.RoleId, t.Seat);
    if (t = ModelManager_1.ModelManager.VehicleModel.GetEntityVehicleData(t.RoleCreatureId)) {
      (t = t.DeepCopy()).Seat = -1;
      ModelManager_1.ModelManager.VehicleModel.UpdateEntityVehicleData(t);
    }
    ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.delete(e.fhl);
  }
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Vehicle", 50, "收到共乘玩法UpdateNotify", ["RoleId", e.Q6n], ["SeatId", e.fhl]);
  }
};
VehicleController.OnChangeRole = (e, t) => {
  var r;
  var a;
  var o;
  var i = e.Entity.GetComponent(0);
  var n = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(i.GetPlayerId());
  if (n?.VehicleCreatureId && n.EntityCreatureId !== i.GetCreatureDataId()) {
    r = n.DeepCopy();
    a = n.DeepCopy();
    o = _a.K6_(n.EntityCreatureId)?.Entity;
    n = ModelManager_1.ModelManager.CreatureModel.GetEntity(n.VehicleCreatureId)?.Entity;
    a.VehicleCreatureId = 0;
    ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(a);
    _a.W5_(o, n, -1, 1);
    r.EntityCreatureId = i.GetCreatureDataId();
    ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(r);
    _a.W5_(e.Entity, n, r.Seat);
  }
}; //# sourceMappingURL=VehicleController.js.map