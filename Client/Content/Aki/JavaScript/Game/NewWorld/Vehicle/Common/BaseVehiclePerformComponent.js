"use strict";

var __decorate = this && this.__decorate || function (e, t, i, r) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, r);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        n = (s < 3 ? o(n) : s > 3 ? o(t, i, n) : o(t, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseVehiclePerformComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const VehicleController_1 = require("../Controller/VehicleController");
const VehicleConfig_1 = require("./VehicleConfig");
const VehicleInfoDefines_1 = require("./VehicleInfoDefines");
let BaseVehiclePerformComponent = class BaseVehiclePerformComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.CreatureData = undefined;
    this.MaxSeatCount = 0;
    this.DriverSeat = -1;
    this.CanBeenManipulated = true;
    this.VehicleType = "Gongduola";
    this.Config = undefined;
    this.ConfigInternal = undefined;
    this.VehicleFeatures = new Set();
    this.DriverInternal = undefined;
    this.PassengerInfoMap = new Map();
    this.SeatInfoMap = new Map();
    this.IsPendingDestroy = false;
    this.EntityHandle = undefined;
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpVector3 = Vector_1.Vector.Create();
    this.TmpVector4 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpQuat1 = Quat_1.Quat.Create();
    this.TmpQuat2 = Quat_1.Quat.Create();
    this.OnRemoveEntity = (e, t) => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      this.EntityHandle = undefined;
      for (const i of this.PassengerInfoMap.values()) {
        this.Leave(i.PassengerEntity);
      }
    };
  }
  get Driver() {
    return this.DriverInternal;
  }
  set Driver(e) {
    if (this.DriverInternal !== e) {
      this.DriverInternal = e;
      this.OnSetDriver();
    }
  }
  OnSetDriver() {}
  OnInitData(e) {
    this.CreatureData = this.Entity.GetComponent(0);
    var t = this.CreatureData.GetPbEntityInitData();
    if (t?.ComponentsData) {
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent");
      if (!i?.Category.VehicleType) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "无法获取载具类型", ["PbDataId", this.CreatureData.GetPbDataId()], ["CreatureId", this.CreatureData.GetCreatureDataId()]);
        }
        return false;
      }
      this.VehicleType = i.Category.VehicleType;
      i = (0, IComponent_1.getComponent)(t.ComponentsData, "VehicleComponent");
      if (i) {
        this.MaxSeatCount = i.SeatCount;
        this.DriverSeat = i.DriverSeat !== VehicleInfoDefines_1.INVALID_SEAT ? i.DriverSeat : -1;
      }
    }
    return true;
  }
  OnStart() {
    this.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
    return true;
  }
  OnEnd() {
    this.Driver = undefined;
    return super.OnEnd();
  }
  OnActivate() {
    this.InitVehicleFeatures();
  }
  OnPostActivate() {
    VehicleController_1.VehicleController.OnVehicleActivate(this.Entity);
  }
  OnAfterTick(e) {
    for (const t of this.PassengerInfoMap.values()) {
      t.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime();
    }
  }
  InitVehicleConfig() {
    var e = this.LoadVehicleConfigAsset();
    this.Config = new VehicleConfig_1.VehicleConfig(this.Entity, e);
    this.ConfigInternal = this.Config.DeepCopy();
    return this.Config.Init();
  }
  LoadVehicleConfigAsset() {
    var e = this.CreatureData?.GetPbEntityInitData();
    if (e?.ComponentsData) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent");
      if (e && e.Config !== "" && e.Config !== "None") {
        return this.LoadVehicleConfig(e.Config);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Vehicle", 50, "载具初始化没有VehicleComp组件或没有配置载具DA", ["PbDataId", this.CreatureData?.GetPbDataId()], ["CreatureId", this.CreatureData?.GetCreatureDataId()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "载具初始化失败，没有组件信息", ["PbDataId", this.CreatureData?.GetPbDataId()], ["CreatureId", this.CreatureData?.GetCreatureDataId()]);
    }
  }
  LoadVehicleConfig(e) {
    var t = ResourceSystem_1.ResourceSystem.Load(e, UE.BP_VehicleConfig_C);
    if (t?.IsValid()) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "载具初始化失败，无法读取有效的载具DA配置", ["PbDataId", this.CreatureData?.GetPbDataId()], ["CreatureId", this.CreatureData?.GetCreatureDataId()], ["Path", e]);
    }
  }
  InitVehicleFeatures() {
    var e = this.CreatureData?.GetPbEntityInitData();
    if (e) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent");
      if (e?.VehicleFeatures?.length) {
        for (const i of e.VehicleFeatures) {
          var t = i.Type;
          this.VehicleFeatures.add(t);
          switch (t) {
            case 1:
              this.InitVehicleMovementFeature(i);
              break;
            case 2:
              this.InitVehicleBattleFeature(i);
          }
        }
      }
    }
  }
  InitVehicleMovementFeature(e) {}
  InitVehicleBattleFeature(e) {}
  TryEnter(e, t) {
    var i;
    var r;
    var o;
    return !!this.EnterConditionCheck(e, t) && ((r = e.GetComponent(1))?.CreatureData?.IsRole() ? (i = this.Entity.GetComponent(0), r = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : r.CreatureData.GetPlayerId(), (o = Protocol_1.Aki.Protocol.GC_.create()).F4n = MathUtils_1.MathUtils.NumberToLong(i.GetCreatureDataId()), o.ORs = r, o.phl = true, o.fhl = t, Net_1.Net.Call(18648, o, () => {})) : this.Enter(e, t), true);
  }
  Enter(e, t) {
    var i = this.DriverSeat === t;
    var r = new VehicleInfoDefines_1.VehiclePassengerInfo();
    r.VehicleEntity = this.Entity;
    r.PassengerEntity = e;
    r.VehicleType = this.VehicleType;
    r.IsDriver = i || true;
    r.Seat = t;
    var o = e.GetComponent(0).GetPlayerId();
    var s = this.Entity.GetComponent(1);
    var n = this.CreatureData.GetPbDataId();
    if (i && (s?.SetAutonomous(o === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 进入载具设置移动主控", ["v", o === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()]);
    }
    var s = this.SeatInfoMap.get(t);
    if (s) {
      if (s.PassengerEntity === e) {
        return;
      }
      o = s.PassengerEntity.GetComponent(0);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "[BaseVehicleComp] 进入载具时目标位置已有实体", ["Vehicle", n], ["OldPassenger", o?.GetPbDataId()], ["NewPassenger", e.GetComponent(0)?.GetPbDataId()], ["Seat", t]);
      }
      this.Leave(s.PassengerEntity);
    }
    this.PassengerInfoMap.set(e.Id, r);
    this.SeatInfoMap.set(t, r);
    if (i) {
      this.Driver = e;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 进入载具", ["V_PbDataId", n], ["V_CreatureId", this.CreatureData.GetCreatureDataId()], ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()], ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()], ["Seat", t], ["isDriver", i]);
    }
    this.EnterVehiclePerform(r);
    EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.OnEnterVehicle, r);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterVehicle, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleBeenEntered, r);
  }
  TryLeave(e, t = 0) {
    var i;
    var r;
    var o;
    var s;
    var n;
    return !!this.LeaveConditionCheck(e) && ((o = e.GetComponent(1))?.CreatureData?.IsRole() ? (i = this.Entity.GetComponent(0), r = this.PassengerInfoMap.get(e.Id), o = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : o.CreatureData.GetPlayerId(), s = ControllerHolder_1.ControllerHolder.VehicleController.ToServerExitVehicleType(t), (n = Protocol_1.Aki.Protocol.GC_.create()).F4n = MathUtils_1.MathUtils.NumberToLong(i.GetCreatureDataId()), n.ORs = o, n.phl = false, n.fhl = r.Seat, n.bI_ = s, Net_1.Net.Call(18648, n, () => {})) : this.Leave(e, t), true);
  }
  Leave(e, t = 0) {
    var i = this.Entity.GetComponent(1)?.CreatureData.GetPbDataId();
    var r = this.PassengerInfoMap.get(e.Id);
    if (r) {
      r.ExitType = t;
      if (r.ExitType !== 3) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 退出载具", ["V_PbDataId", i], ["V_CreatureId", this.CreatureData.GetCreatureDataId()], ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()], ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()], ["Seat", r.Seat], ["isDriver", r.IsDriver], ["ExitType", r.ExitType]);
        }
        this.LeaveVehiclePerform(r);
        EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.OnLeaveVehicle, r);
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveVehicle, r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleBeenLeaved, r);
        this.PassengerInfoMap.delete(e.Id);
        this.SeatInfoMap.delete(r.Seat);
        this.Driver = undefined;
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Vehicle", 50, "[BaseVehicleComp] 重复退出载具", ["V_PbDataId", i], ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()], ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()], ["Type", t]);
    }
  }
  ResetVehicleConfig(e = false) {
    this.Config = this.ConfigInternal?.DeepCopy();
    if (e) {
      this.RefreshMoveConfigFromVehicleConfig();
    }
  }
  RefreshMoveConfigFromVehicleConfig() {}
  FixBornLocation(e = 0, t) {}
  HandlePendingDestroy() {
    ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
  }
  EnterConditionCheck(e, t) {
    return !(t < 0) && !(t >= this.MaxSeatCount) && !this.SeatInfoMap.has(t) && (!!this.CanBeenManipulated || this.DriverSeat !== t) && !!(t = e.GetComponent(230)) && !t.IsOnVehicle;
  }
  LeaveConditionCheck(e) {
    return !!this.PassengerInfoMap.has(e.Id);
  }
  EnterVehiclePerform(e) {}
  LeaveVehiclePerform(e) {}
  SetGravityDirectForVehicle(e) {}
  SetGravityDirectForVehicleWithoutRotate(e) {}
  IsDriver(e) {
    return this.Driver === e;
  }
  IsPassenger(e) {
    return this.PassengerInfoMap.has(e.Id);
  }
  TryFindUsableSeat(t) {
    for (let e = 0; e < this.MaxSeatCount; e++) {
      if ((t || e !== this.DriverSeat) && !this.SeatInfoMap.has(e)) {
        return e;
      }
    }
    return -1;
  }
  IsVehicleInUse(e) {
    if (e === VehicleInfoDefines_1.INVALID_SEAT) {
      return !!this.PassengerInfoMap.size;
    } else {
      return this.SeatInfoMap.has(e);
    }
  }
  GetVehicleVelocity(e) {}
};
BaseVehiclePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(234)], BaseVehiclePerformComponent);
exports.BaseVehiclePerformComponent = BaseVehiclePerformComponent; //# sourceMappingURL=BaseVehiclePerformComponent.js.map