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
const CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine");
const VehicleInfoDefines_1 = require("../Common/VehicleInfoDefines");
const WAIT_ENTITY_CREATE_TIMEOUT = 60000;
const TRIAL_ROLE_ID = 10000;
const CHECK_DRIVE_INFO_INTERVAL = 500;
class VehicleController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(29073, this.VehicleUpdateNotify);
    Net_1.Net.Register(29170, this.OnUpdateVehicleRideSharingNotify);
    Net_1.Net.Register(20089, this.VehicleUpdateEntityNotify);
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
    Net_1.Net.UnRegister(29073);
    Net_1.Net.UnRegister(29170);
    Net_1.Net.UnRegister(20089);
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
  static W5_(e, t, o, r = 0) {
    if (e?.IsInit && t?.IsInit && (t = t.GetComponent(237))) {
      if (o !== -1) {
        t.Enter(e, o);
      } else {
        t.Leave(e, r);
      }
    }
  }
  static async UpdatePlayerVehiclePerform() {
    var e;
    var t;
    var o;
    var r;
    var a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var i = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(a);
    if (i && (r = i.EntityCreatureId, e = i.VehicleCreatureId, t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity, o = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity, this.Q5_ && (this.Q5_.SetResult(true), this.Q5_ = undefined), t?.IsInit && o?.IsInit || (Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 48, "角色或船未加载完成，进行等待", ["passengerCreatureId", r], ["vehicleCreatureId", e]), this.Q5_ = new GameModePromise_1.GameModePromise(), WaitEntityTask_1.WaitEntityTask.Create("VehicleController.UpdatePlayerVehiclePerform", [e, r], () => {
      this.Q5_?.SetResult(true);
      this.Q5_ = undefined;
    }, WAIT_ENTITY_CREATE_TIMEOUT)), await this.Q5_?.Promise, r === (r = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(a))?.EntityCreatureId) && e === r?.VehicleCreatureId) {
      this.W5_(t, o, -1, 1);
      this.W5_(t, o, i.Seat, i.ExitType);
    }
  }
  static OnCharacterActivate(e) {
    var t = e.GetComponent(0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "OnRoleActivate", ["PlayerId", t.GetPlayerId()], ["PlayerCreatureId", t.GetCreatureDataId()]);
    }
    var o = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(t.GetPlayerId());
    if (o?.EntityCreatureId !== t.GetCreatureDataId()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "OnRoleActivate 非当前角色乘坐", ["PlayerId", t.GetPlayerId()], ["PlayerCreatureId", t.GetCreatureDataId()]);
      }
    } else if (o?.VehicleCreatureId) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o.VehicleCreatureId)?.Entity;
      this.W5_(e, t, o.Seat, o.ExitType);
    }
  }
  static OnVehicleActivate(e) {
    var t;
    var o = e.GetComponent(0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "OnVehicleActivate", ["VehicleCreatureId", o.GetCreatureDataId()]);
    }
    var o = ModelManager_1.ModelManager.VehicleModel.GetVehiclePlayerData(o.GetCreatureDataId());
    for (const r of o) {
      if (r.VehicleCreatureId && r.Seat >= 0) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r.EntityCreatureId)?.Entity;
        this.W5_(t, e, r.Seat, r.ExitType);
      }
    }
  }
  static RegisterWaitEntityTask(o) {
    var e = ModelManager_1.ModelManager.VehicleModel.PassengerVehicleMap.get(o.EntityCreatureId);
    if (e?.Context?.Equals(o) && !e.WaitTask) {
      const r = o.EntityCreatureId;
      const a = o.VehicleCreatureId;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "[VehicleController] 创建载具等待实体任务", ["EntityCreatureId", r], ["VehicleCreatureId", a], ["Seat", o.Seat]);
      }
      e.WaitTask = WaitEntityTask_1.WaitEntityTask.Create("VehicleController.RegisterWaitEntityTask", [a, r], e => {
        var t;
        if (e && (e = ModelManager_1.ModelManager.VehicleModel.PassengerVehicleMap.get(r))?.Context?.Equals(o)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Vehicle", 50, "[VehicleController] 开始执行载具等待实体任务", ["EntityCreatureId", r], ["VehicleCreatureId", a], ["Seat", o.Seat]);
          }
          e.WaitTask = undefined;
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity;
          t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a)?.Entity;
          this.W5_(e, t, o.Seat, o.ExitType);
          ModelManager_1.ModelManager.VehicleModel.PostUpdateVehicleEntityData(o);
        }
      }, WAIT_ENTITY_CREATE_TIMEOUT, false, true);
    }
  }
  static TryEnterRideSharingMode(e) {
    var t;
    var o;
    if (this.CanResponseRideSharingModeChange(e)) {
      if (ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing) {
        t = e.VehicleEntity?.GetComponent(238);
        o = e.PassengerEntity?.GetComponent(2);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "重复进入共乘玩法", ["VehicleId", t?.CreatureData.GetPbDataId()], ["PassengerId", o?.CreatureData.GetPbDataId()], ["Seat", e.Seat]);
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
    var o;
    if (this.CanResponseRideSharingModeChange(e)) {
      if (!ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing) {
        t = e.VehicleEntity?.GetComponent(238);
        o = e.PassengerEntity?.GetComponent(2);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "离开载具前已退出共乘玩法", ["VehicleId", t?.CreatureData.GetPbDataId()], ["PassengerId", o?.CreatureData.GetPbDataId()], ["Seat", e.Seat]);
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
    return !!e.IsRolePassenger(true) && !(e.PassengerEntity.GetComponent(0).GetRoleId() > TRIAL_ROLE_ID) && !!e.VehicleEntity.GetComponent(237) && !!this.CheckVehicleTypeForRideSharing(e);
  }
  static CheckVehicleTypeForRideSharing(e) {
    switch (e.VehicleType) {
      case "Gongduola":
      case "AutoMoveGongduola":
        return e.IsDriver;
      case "CoBathingEmptyVehicle":
        return true;
    }
    return false;
  }
  static OnChangeMode() {
    ModelManager_1.ModelManager.VehicleModel.Reset();
    return true;
  }
  static SetRideSharingEnable(e) {
    if (ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing === e && (ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing = !e, Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(233)?.VehicleEntity?.GetComponent(241)?.RefreshRideSharingSkillState(), !e)) {
      var t = ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.size;
      for (let e = 0; e < t; e++) {
        this.OnRemoveVehicleRideSharing(-1, -1);
      }
    }
  }
  static $bl(e) {
    if (e.IsDriver && e.IsRolePassenger(true) && e.VehicleEntity) {
      this.Kbl = e.VehicleEntity.GetComponent(240);
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
  var o;
  var r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e.W5n)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
  if (r) {
    (t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId = e.W5n;
    t.EntityCreatureId = r;
    t.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    t.Seat = e.fhl;
    t.ExitType = _a.CJl(e.bI_);
    ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(t);
    r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.EntityCreatureId)?.Entity;
    o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.VehicleCreatureId)?.Entity;
    _a.W5_(r, o, t.Seat, t.ExitType);
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
VehicleController.OnChangeVehicleRideSharing = (t, o) => {
  var e;
  var r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(234)?.VehicleEntity;
  if (r && ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing && !ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing && (r = r.GetComponent(237), (r = o !== -1 ? o : r.TryFindUsableSeat(false)) !== -1) && ((e = Protocol_1.Aki.Protocol.vp_.create()).Q6n = t, e.fhl = r, Net_1.Net.Call(27060, e, e => {
    if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "共乘ChangeRole请求失败", ["ErrorCode", e.Q4n], ["RoleId", t], ["Seat", o]);
    }
  }), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Vehicle", 50, "发送共乘玩法Change通知", ["RoleId", t], ["Seat", o]);
  }
};
VehicleController.OnRemoveVehicleRideSharing = (e, t) => {
  var o = ModelManager_1.ModelManager.VehicleModel;
  if (o.IsReadyRiderSharing && o.RideSharingInfoMap.size) {
    o = o.RideSharingInfoMap.values().next().value;
    const r = Protocol_1.Aki.Protocol.Sp_.create();
    r.Q6n = e === -1 ? o.RoleId : e;
    Net_1.Net.Call(18575, r, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "共乘RemoveRole请求失败", ["ErrorCode", e.Q4n], ["RoleId", r.Q6n]);
      }
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 50, "发送共乘玩法Remove通知", ["RoleId", r.Q6n]);
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
  var o;
  var r;
  var a = e.Entity.GetComponent(0);
  var i = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(a.GetPlayerId());
  if (i?.VehicleCreatureId) {
    if (i.EntityCreatureId === a.GetCreatureDataId()) {
      if (t === undefined && (e.Entity.GetComponent(3)?.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE,
        Context: "[VehicleController.OnChangeRole]"
      }), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Vehicle", 50, "[VehicleController] 乘坐载具后角色上场，强制维持Ride移动状态", ["CreatureId", i.EntityCreatureId], ["PbDataId", a.GetPbDataId()]);
      }
    } else {
      t = i.DeepCopy();
      o = i.DeepCopy();
      r = _a.K6_(i.EntityCreatureId)?.Entity;
      i = ModelManager_1.ModelManager.CreatureModel.GetEntity(i.VehicleCreatureId)?.Entity;
      o.VehicleCreatureId = 0;
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(o);
      _a.W5_(r, i, -1, 1);
      t.EntityCreatureId = a.GetCreatureDataId();
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(t);
      _a.W5_(e.Entity, i, t.Seat);
    }
  }
}; //# sourceMappingURL=VehicleController.js.map