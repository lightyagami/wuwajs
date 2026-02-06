"use strict";

var _a;
var __decorate = this && this.__decorate || function (e, t, o, r) {
  var a;
  var n = arguments.length;
  var i = n < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, r);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (a = e[l]) {
        i = (n < 3 ? a(i) : n > 3 ? a(t, o, i) : a(t, o)) || i;
      }
    }
  }
  if (n > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleController = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const GameBudgetInterfaceController_1 = require("../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const CreatureController_1 = require("../../../World/Controller/CreatureController");
const GameModePromise_1 = require("../../../World/Define/GameModePromise");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine");
const VehicleInfoDefines_1 = require("../Common/VehicleInfoDefines");
const WAIT_ENTITY_CREATE_TIMEOUT = 60000;
const CHECK_DRIVE_INFO_INTERVAL = 500;
const enableMotorcycleTagId = -1118575054;
const disableMotorcycleTagId = 379437700;
const MIN_UPDATE_FIFO_BUDGET_TIME_IN_MOTORCYCLE = 6;
const SOURCE_MIN_UPDATE_FIFO_BUDGET_TIME = 3;
class VehicleController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.B3f = new Queue_1.Queue();
    Net_1.Net.Register(23830, this.VehicleUpdateNotify);
    Net_1.Net.Register(18484, this.VehiclePassengerUpdateNotify);
    Net_1.Net.Register(17223, this.VehicleUpdateEntityNotify);
    Net_1.Net.Register(21263, this.VehicleShareNotify);
    Net_1.Net.Register(25410, this.MotorOutlookChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOtherChangeRole, this.OnOtherChangeRole);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRideSharingPassenger, this.OnChangeVehicleRideSharing);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, this.OnRemoveVehicleRideSharing);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.zGf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.zGf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerEntityStarted, this.JGf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerEntityEnded, this.ZGf);
    return true;
  }
  static OnTick(e) {
    if (this.Kbl && (this.mie += e, this.mie > CHECK_DRIVE_INFO_INTERVAL)) {
      ModelManager_1.ModelManager.VehicleModel?.UpdateKeepDrivingInfo(this.mie, this.Kbl);
      this.mie = 0;
    }
  }
  static OnClear() {
    this.B3f?.Clear();
    this.B3f = undefined;
    Net_1.Net.UnRegister(23830);
    Net_1.Net.UnRegister(18484);
    Net_1.Net.UnRegister(17223);
    Net_1.Net.UnRegister(21263);
    Net_1.Net.UnRegister(25410);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOtherChangeRole, this.OnOtherChangeRole);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRideSharingPassenger, this.OnChangeVehicleRideSharing);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, this.OnRemoveVehicleRideSharing);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.zGf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.zGf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerEntityStarted, this.JGf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerEntityEnded, this.ZGf);
    return true;
  }
  static MotorSummonAndRideNotify(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 6, "[VehicleController] MotorSummonAndRide", ["PlayerId", t.W5n], ["EntityId", t.F4n], ["VehicleId", t.lxg]);
    }
    if (t.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Vehicle", 6, "[VehicleController] 收到自己的MotorSummonAndRide，直接跳过");
      }
    } else {
      var o;
      var r;
      var a;
      var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(t.W5n)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
      if (n) {
        const i = new VehicleInfoDefines_1.ScenePlayerVehicleInfo();
        i.PlayerId = t.W5n;
        i.EntityCreatureId = n;
        i.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(t.lxg);
        i.Seat = 0;
        i.ExitType = 1;
        const l = ModelManager_1.ModelManager.CreatureModel.GetEntity(i.EntityCreatureId)?.Entity;
        const _ = ModelManager_1.ModelManager.CreatureModel.GetEntity(i.VehicleCreatureId)?.Entity;
        if (_ && l) {
          if ((n = _.GetComponent(265)) && (o = new UE.Transform(), r = new UE.Vector(), a = new UE.Rotator(), r.Set(t.wn1?.l8n?.X ?? 0, t.wn1?.l8n?.Y ?? 0, t.wn1?.l8n?.Z ?? 0), a.Roll = t.wn1?._8n?.Roll ?? 0, a.Pitch = t.wn1?._8n?.Pitch ?? 0, a.Yaw = t.wn1?._8n?.Yaw ?? 0, o.SetLocation(r), o.SetRotation(a.Quaternion()), o.SetScale3D(Vector_1.Vector.OneVector), r = n.GetMotorcycleSummonTrans(l.Id, o), a = _.GetComponent(247), r)) {
            a.SetActorTransform(r.ToUeTransform(), "SummonAndRideMotorcycle.Simulated", false, 1);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 6, "[VehicleController] MotorSummonAndRide丢失载具或驾驶员", ["vehicleEntity", !!_], ["driverEntity", !!l]);
        }
        if (_) {
          CreatureController_1.CreatureController.SetEntityEnable(_, true, "SummonAndRideMotorcycle.Simulated", false);
        }
        TimerSystem_1.TimerSystem.Next(() => {
          ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(i);
          var e = new VehicleInfoDefines_1.VehiclePassengerInfo();
          e.PassengerEntity = l;
          e.VehicleEntity = _;
          e.Seat = i.Seat;
          e.ExitType = i.ExitType;
          this.W5_(e, true);
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 6, "[VehicleController] 服务器下发MotorSummonAndRide无法获取对应PlayerId的CreatureId", ["PlayerId", t.W5n], ["VehicleId", MathUtils_1.MathUtils.LongToNumber(t.lxg)]);
      }
    }
  }
  static VehicleUpdateEntity(e) {
    ModelManager_1.ModelManager.VehicleModel.UpdateEntityVehicleData(e);
    var t = new VehicleInfoDefines_1.VehiclePassengerInfo();
    t.PassengerEntity = ModelManager_1.ModelManager.CreatureModel.GetEntity(e.EntityCreatureId)?.Entity;
    t.VehicleEntity = ModelManager_1.ModelManager.CreatureModel.GetEntity(e.VehicleCreatureId)?.Entity;
    t.Seat = e.Seat;
    t.ExitType = e.ExitType;
    this.W5_(t);
  }
  static CheckMotorAllowed(e = true) {
    var t;
    return !!ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098) && !ModelManager_1.ModelManager.FunctionModel?.IsLimit(10098) && !(t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), !(t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.CheckGetComponent(212))?.HasTag(enableMotorcycleTagId)) && (!e || !t?.HasTag(disableMotorcycleTagId));
  }
  static W5_(e, t = false) {
    var o;
    var r = e.PassengerEntity;
    var a = e.VehicleEntity;
    if (r?.IsInit && a?.IsInit && a?.Active && (a = a.GetComponent(246)) && ((o = e.Seat !== -1) ? a.Enter(r, e.Seat) : a.Leave(r, e.ExitType), a = !!r.GetComponent(3)?.IsRoleAndCtrlByMe, o) && t && a) {
      this.SendVehiclePerformFinishRequest(e);
    }
  }
  static async UpdatePlayerVehiclePerform() {
    var e;
    var t;
    var o;
    var r;
    var a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var n = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(a);
    if (n && (o = n.EntityCreatureId, r = n.VehicleCreatureId, e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Entity, t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity, this.Q5_ && (this.Q5_.SetResult(true), this.Q5_ = undefined), e?.IsInit && t?.IsInit || (Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 48, "角色或船未加载完成，进行等待", ["passengerCreatureId", o], ["vehicleCreatureId", r]), this.Q5_ = new GameModePromise_1.GameModePromise(), WaitEntityTask_1.WaitEntityTask.Create("VehicleController.UpdatePlayerVehiclePerform", [r, o], () => {
      this.Q5_?.SetResult(true);
      this.Q5_ = undefined;
    }, WAIT_ENTITY_CREATE_TIMEOUT)), await this.Q5_?.Promise, o === (o = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(a))?.EntityCreatureId) && r === o?.VehicleCreatureId) {
      (a = new VehicleInfoDefines_1.VehiclePassengerInfo()).PassengerEntity = e;
      a.VehicleEntity = t;
      a.Seat = -1;
      a.ExitType = 1;
      (r = a.DeepCopy()).Seat = n.Seat;
      r.ExitType = n.ExitType;
      this.W5_(a);
      this.W5_(r);
    }
  }
  static OnCharacterEnable(e) {
    var t = e.GetComponent(0);
    var o = t.GetCreatureDataId();
    var r = t.GetPbDataId();
    var a = t.GetPlayerId();
    var n = t.IsRole() ? ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(t.GetPlayerId()) : ModelManager_1.ModelManager.VehicleModel.GetEntityVehicleData(t.GetCreatureDataId());
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "[OnCharacterActivate] 乘客实体准备完成", ["PbDataId", r], ["CreatureId", o], ["PlayerId", a]);
    }
    if (n?.EntityCreatureId !== t.GetCreatureDataId()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "[OnCharacterActivate] 非当前乘客实体乘坐", ["PbDataId", r], ["CreatureId", o], ["PlayerId", a]);
      }
    } else if (n?.VehicleCreatureId) {
      (t = new VehicleInfoDefines_1.VehiclePassengerInfo()).PassengerEntity = e;
      t.VehicleEntity = ModelManager_1.ModelManager.CreatureModel.GetEntity(n.VehicleCreatureId)?.Entity;
      t.Seat = n.Seat;
      t.ExitType = n.ExitType;
      this.W5_(t, true);
    }
  }
  static OnVehicleEnable(e) {
    var t = e.GetComponent(0);
    var o = t.GetCreatureDataId();
    var t = t.GetPbDataId();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "[OnCharacterActivate] 载具实体准备完成", ["PbDataId", t], ["CreatureId", o]);
    }
    var t = ModelManager_1.ModelManager.VehicleModel.GetVehicleEntityData(o);
    var r = new VehicleInfoDefines_1.VehiclePassengerInfo();
    r.VehicleEntity = e;
    for (const a of t) {
      if (a.VehicleCreatureId && a.Seat >= 0) {
        r.PassengerEntity = ModelManager_1.ModelManager.CreatureModel.GetEntity(a.EntityCreatureId)?.Entity;
        r.Seat = a.Seat;
        r.ExitType = a.ExitType;
        this.W5_(r, true);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleActivate, e);
  }
  static rhg(e, t) {
    if (Info_1.Info.IsPcOrGamepadPlatform() && t.IsRolePassenger(true) && t.VehicleType === "Motorcycle") {
      if (e) {
        if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.MinUpdateFifoBudgetTime === SOURCE_MIN_UPDATE_FIFO_BUDGET_TIME) {
          GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(MIN_UPDATE_FIFO_BUDGET_TIME_IN_MOTORCYCLE);
        }
      } else if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.MinUpdateFifoBudgetTime === MIN_UPDATE_FIFO_BUDGET_TIME_IN_MOTORCYCLE) {
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(SOURCE_MIN_UPDATE_FIFO_BUDGET_TIME);
      }
    }
  }
  static SendVehiclePerformFinishRequest(e) {
    var e = e.PassengerEntity.GetComponent(0);
    var t = Protocol_1.Aki.Protocol.QIg.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(e.GetCreatureDataId());
    Net_1.Net.Call(27644, t, () => {});
  }
  static TryEnterRideSharingMode(e) {
    var t;
    var o;
    if (this.CanResponseRideSharingModeChange(e)) {
      if (ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing) {
        t = e.VehicleEntity?.GetComponent(247);
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
        t = e.VehicleEntity?.GetComponent(247);
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
    return !!e.IsRolePassenger(true) && !!e.VehicleEntity.GetComponent(246) && !!this.CheckVehicleTypeForRideSharing(e);
  }
  static CheckVehicleTypeForRideSharing(e) {
    switch (e.VehicleType) {
      case "Gongduola":
      case "AutoMoveGongduola":
      case "Motorcycle":
        return e.IsDriver;
      case "CoBathingEmptyVehicle":
        return true;
    }
    return false;
  }
  static SetRideSharingEnable(e) {
    if (ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing === e && (ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing = !e, Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(242)?.VehicleEntity?.GetComponent(250)?.RefreshRideSharingSkillState(), !e)) {
      var t = ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.size;
      for (let e = 0; e < t; e++) {
        this.OnRemoveVehicleRideSharing(-1, -1);
      }
    }
  }
  static ChangeRoleEntityOnVehicle(e) {
    var t;
    var o;
    var r;
    var a = e.Entity.GetComponent(0);
    var n = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(a.GetPlayerId());
    if (n?.VehicleCreatureId) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(n.VehicleCreatureId)?.Entity;
      r = this.K6_(n.EntityCreatureId)?.Entity;
      e = e.Entity;
      (o = n.DeepCopy()).VehicleCreatureId = 0;
      (n = n.DeepCopy()).EntityCreatureId = a.GetCreatureDataId();
      (a = new VehicleInfoDefines_1.VehiclePassengerInfo()).VehicleEntity = t;
      a.PassengerEntity = r;
      a.Seat = -1;
      a.ExitType = 1;
      (r = new VehicleInfoDefines_1.VehiclePassengerInfo()).VehicleEntity = t;
      r.PassengerEntity = e;
      r.Seat = n.Seat;
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(o);
      this.W5_(a);
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(n);
      this.W5_(r);
    }
  }
  static $bl(e) {
    if (e.IsDriver && e.IsRolePassenger(true) && e.VehicleEntity) {
      this.Kbl = e.VehicleEntity.GetComponent(249);
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
  static async k3f(e) {
    var t;
    if (!e || !!VehicleController.CheckMotorAllowed(false)) {
      if (this.q3f) {
        this.B3f.Push(e);
      } else {
        this.q3f = true;
        (t = new Protocol_1.Aki.Protocol.iGf()).rGf = e;
        e = await Net_1.Net.CallAsync(24115, t);
        this.q3f = false;
        if (!this.B3f.Empty) {
          t = this.B3f.Pop();
          this.k3f(t);
        }
        if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && !ModelManager_1.ModelManager.FunctionModel.GetFunctionInstance(10098)?.GetIsOpen() && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 72, "MotorCreateRequest failed, motorcycle function is not set or open", ["errorCode", e.Q4n]);
        }
      }
    }
  }
  static fDg(e, t = "") {
    var o = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.CheckGetComponent(242);
    if (o && o.VehicleEntity?.Valid && o.VehicleType === e && (o = o.VehicleEntity.CheckGetComponent(246)) && o.VehicleType === e) {
      o.TryLeaveAllAtOnce(0, t);
    }
  }
}
(_a = VehicleController).mie = 0;
VehicleController.Kbl = undefined;
VehicleController.Q5_ = undefined;
VehicleController.B3f = undefined;
VehicleController.q3f = false;
VehicleController.VehicleUpdateNotify = e => {
  var t;
  var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e.W5n)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
  if (o) {
    (t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId = e.W5n;
    t.EntityCreatureId = o;
    t.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    t.Seat = e.fhl;
    t.ExitType = _a.CJl(e.bI_);
    ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(t);
    (o = new VehicleInfoDefines_1.VehiclePassengerInfo()).PassengerEntity = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.EntityCreatureId)?.Entity;
    o.VehicleEntity = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.VehicleCreatureId)?.Entity;
    o.Seat = t.Seat;
    o.ExitType = t.ExitType;
    _a.W5_(o, true);
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
  _a.rhg(true, e);
};
VehicleController.OnLeaveVehicle = e => {
  _a.TryExitRideSharingMode(e);
  _a.zbl(e);
  _a.rhg(false, e);
};
VehicleController.OnChangeVehicleRideSharing = (t, o) => {
  var e;
  var r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(243)?.VehicleEntity;
  if (r && ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing && !ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing && (r = r.GetComponent(246), (r = o !== -1 ? o : r.TryFindUsableSeat(false)) !== -1) && ((e = Protocol_1.Aki.Protocol.vp_.create()).Q6n = t, e.fhl = r, Net_1.Net.Call(28876, e, e => {
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
    Net_1.Net.Call(22001, r, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "共乘RemoveRole请求失败", ["ErrorCode", e.Q4n], ["RoleId", r.Q6n]);
      }
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Vehicle", 50, "发送共乘玩法Remove通知", ["RoleId", r.Q6n]);
    }
  }
};
VehicleController.VehiclePassengerUpdateNotify = e => {
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
VehicleController.VehicleShareNotify = e => {
  if (ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(e.W5n)) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpecialVehicleShareNotify, e);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Vehicle", 50, "[VehicleShareNotify] 无法找到对应的玩家载具信息", ["PlayerId", e.W5n]);
  }
};
VehicleController.MotorOutlookChange = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Motor", 6, "EquipMotor OnNotify", ["Id", e.F4n]);
  }
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.F4n))?.Entity?.GetComponent(270);
  if (t) {
    t.EquipMotor(e.bpf);
  }
};
VehicleController.OnChangeRole = (e, t) => {
  var o = e.Entity.GetComponent(0);
  var r = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(o.GetPlayerId());
  if (r?.VehicleCreatureId) {
    if (r.EntityCreatureId === o.GetCreatureDataId()) {
      if (t === undefined && (e.Entity.GetComponent(3)?.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE,
        Context: "[VehicleController.OnChangeRole]"
      }), e.Entity.GetComponent(242)?.AttachAndSetPassengerTransform(), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Vehicle", 50, "[VehicleController] 乘坐载具后角色上场，强制维持Ride移动状态并ReAttach载具", ["CreatureId", r.EntityCreatureId], ["PbDataId", o.GetPbDataId()]);
      }
    } else {
      _a.ChangeRoleEntityOnVehicle(e);
    }
  }
};
VehicleController.OnOtherChangeRole = (e, t) => {
  var o = e.Entity.GetComponent(0);
  var r = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(o.GetPlayerId());
  if (r?.VehicleCreatureId && r.EntityCreatureId !== o.GetCreatureDataId()) {
    _a.ChangeRoleEntityOnVehicle(e);
  }
};
VehicleController.zGf = (e, t) => {
  if (e === 10098) {
    if (!t) {
      VehicleController.fDg("Motorcycle", "UpdateVehicleFunctionOpen");
    }
    _a.k3f(t);
  }
};
VehicleController.tFf = (e, t) => {
  if (e === enableMotorcycleTagId) {
    _a.k3f(t);
  }
};
VehicleController.JGf = (e, t) => {
  if (ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === e) {
    t.CheckGetComponent(212)?.AddTagAddOrRemoveListener(enableMotorcycleTagId, _a.tFf);
  }
};
VehicleController.ZGf = (e, t) => {
  if (ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === e) {
    t.CheckGetComponent(212)?.RemoveTagAddOrRemoveListener(enableMotorcycleTagId, _a.tFf);
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("Gxg", true)], VehicleController, "MotorSummonAndRideNotify", null);
exports.VehicleController = VehicleController; //# sourceMappingURL=VehicleController.js.map