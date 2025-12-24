"use strict";

var VehicleInputComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var s;
  var h = arguments.length;
  var o = h < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, n);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        o = (h < 3 ? s(o) : h > 3 ? s(e, i, o) : s(e, i)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleInputComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CameraUtility_1 = require("../../../Camera/CameraUtility");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const InputFilter_1 = require("../../../Input/InputFilter");
const InputFilterManager_1 = require("../../../Input/InputFilterManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const CharacterInputComponent_1 = require("../../Character/Common/Component/CharacterInputComponent");
const ZERO_TIME = 0;
const NULL_CONFIG_TIME = -1;
const INVALID_PRIORITY = -1;
const INVALID_PRIORITY_INDEX = -1;
const INVALID_INPUT_TIME = -1;
const MOVE_VECTOR_CACHE_TIME = 100;
let VehicleInputComponent = VehicleInputComponent_1 = class VehicleInputComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Bhh = undefined;
    this.ActorComp = undefined;
    this.PerformComp = undefined;
    this.TagComp = undefined;
    this.MoveDirectionDistanceMin = 0;
    this.MoveDirectionDistanceMax = 0;
    this.MovementDirectionAngleThreshold = 0;
    this.InputEvents = new Array();
    this.InputCaches = new Array();
    this.AxisValues = new Map();
    this.NextFrameClear = false;
    this.InputGroup = undefined;
    this.HoldConfigs = new Map();
    this.CacheTimes = new Map();
    this.MoveVectorCache = Vector_1.Vector.Create();
    this.MoveDirectionCache = Vector_1.Vector.Create();
    this.WorldMoveDirectionCache = Vector_1.Vector.Create();
    this.LastMovementInputTime = INVALID_INPUT_TIME;
    this.TagEventJump = undefined;
    this.TagEventClimb = undefined;
    this.TagEventAttack = undefined;
    this.TagEventDodge = undefined;
    this.TagEventSkill = undefined;
    this.TagEventVision1 = undefined;
    this.TagEventUltimateSkill = undefined;
    this.TagEventVision2 = undefined;
    this.TagEventLock = undefined;
    this.TagEventAim = undefined;
    this.TagEventMove = undefined;
    this.PassengerInputForbidTagArray = new Array();
    this.TempVector = Vector_1.Vector.Create();
    this.TempRotator = Rotator_1.Rotator.Create();
    this.TempQuat = Quat_1.Quat.Create();
    this.TempQuat2 = Quat_1.Quat.Create();
    this.VehicleType = "Gongduola";
    this.IsEnableLongPressLeave = false;
    this.LongPressLeaveCondition = false;
    this.InvalidHoldTime = 0;
    this.ForwardInputCurve = undefined;
    this.vZf = 0;
    this.WLm = t => {
      if (this.IsEnableLongPressLeave) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressEnd, t);
      }
    };
    this.QLm = t => {
      if (this.IsEnableLongPressLeave && (this.LongPressLeaveCondition = true, this.InvalidHoldTime = 0, this.CheckIfCanLeave())) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressStart, t);
      }
    };
    this.W$a = new Set();
    this.OnEnterVehicle = t => {
      var e;
      if (t.IsRolePassenger(true)) {
        this.RegisterInputHandler();
        this.SetVehicleRelatedInputEnable(t.PassengerEntity, false);
        this.SetVehicleType(t.VehicleType);
        if (!t.IsDriver) {
          this.SetVehicleRelatedInputEnable(this.Entity, false);
          (e = this.Entity.GetComponent(215))?.RemoveTag(-469423249);
          e?.RemoveTag(-1802431900);
        }
        this.OnEnterOrLeaveVehicle(t, true);
      }
    };
    this.OnLeaveVehicle = t => {
      if (t.IsRolePassenger(true)) {
        this.UnRegisterInputHandler();
        this.SetVehicleRelatedInputEnable(t.PassengerEntity, true);
        if (t.IsDriver) {
          this.ActorComp.ClearInput();
        } else {
          this.SetVehicleRelatedInputEnable(this.Entity, true);
        }
        this.OnEnterOrLeaveVehicle(t, false);
      }
    };
    this.TestInputEvent = [];
  }
  OnInitData(t) {
    this.InputGroup = new InputFilter_1.InputFilter(InputFilterManager_1.InputFilterManager.CharacterActions, undefined, InputFilterManager_1.InputFilterManager.CharacterAxes, undefined);
    this.MoveDirectionDistanceMin = CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionDistanceMin");
    this.MoveDirectionDistanceMax = CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionDistanceMax");
    this.MovementDirectionAngleThreshold = CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionAngleThreshold");
    this.MoveVectorCache.Reset();
    this.MoveDirectionCache.Reset();
    this.WorldMoveDirectionCache.Reset();
    return true;
  }
  OnInit(t) {
    return true;
  }
  OnStart() {
    this.PerformComp = this.Entity.GetComponent(246);
    this.TagComp = this.Entity.GetComponent(215);
    this.ActorComp = this.Entity.CheckGetComponent(247) ?? this.Entity.CheckGetComponent(3);
    this.KLm();
    this.AddBlockEvents();
    this.InitPassengerInputForbidTagInfo();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    var t = this.Entity.GetComponent(246)?.Config?.Asset;
    if (t) {
      this.ForwardInputCurve = t.前后输入映射曲线;
    }
    return true;
  }
  OnTick(t) {
    this.Mqu(t);
    if (this.NeedUpdateInputDirectAndFacing()) {
      this.UpdateVehicleInputDirectAndFacing();
    }
  }
  XLm() {
    if (this.Bhh) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Bhh, EventDefine_1.EEventName.VehicleInputLayerPress, this.QLm);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Bhh, EventDefine_1.EEventName.VehicleInputLayerRelease, this.WLm);
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
  }
  KLm() {
    var t;
    if (this.Bhh) {
      this.XLm();
    }
    this.Bhh = InputController_1.InputController.CreateInputLayer(4);
    if (this.Bhh) {
      if (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity)) {
        this.Bhh.Init(t);
        InputController_1.InputController.AddInputLayer(this.Entity.Id, this.Bhh);
      }
      EventSystem_1.EventSystem.AddWithTarget(this.Bhh, EventDefine_1.EEventName.VehicleInputLayerPress, this.QLm);
      EventSystem_1.EventSystem.AddWithTarget(this.Bhh, EventDefine_1.EEventName.VehicleInputLayerRelease, this.WLm);
    }
  }
  Mqu(t) {
    if (this.InputCaches.length !== 0) {
      var e = t * TimeUtil_1.TimeUtil.Millisecond * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1);
      for (const i of this.InputCaches) {
        i.AccumulateTime += e;
      }
    }
  }
  OnEnd() {
    InputController_1.InputController.RemoveInputHandler(this);
    this.LastMovementInputTime = INVALID_INPUT_TIME;
    this.InputEvents.length = 0;
    this.InputCaches.length = 0;
    this.AxisValues.clear();
    this.RemoveBlockActionEvents();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    return true;
  }
  GetPriority() {
    return 1;
  }
  GetInputFilter() {
    return this.InputGroup;
  }
  HandlePressEvent(t, e) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.InputEvents.push(new CharacterInputComponent_1.InputEvent(t, 1, e, this.vZf++));
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行按下操作", ["action", t]);
    }
  }
  HandleReleaseEvent(t, e) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.InputEvents.push(new CharacterInputComponent_1.InputEvent(t, 2, e, this.vZf++));
      VehicleInputComponent_1.HoldPressMap.set(t, false);
      VehicleInputComponent_1.HoldActionMap.delete(t);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行放开操作", ["action", t]);
    }
  }
  HandleHoldEvent(t, e) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.InputEvents.push(new CharacterInputComponent_1.InputEvent(t, 3, e));
      VehicleInputComponent_1.HoldActionMap.set(t, true);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 72, "该战斗输入被禁用，不执行长按操作", ["action", t]);
    }
  }
  HandleInputAxis(t, e) {
    let i = e;
    if (Info_1.Info.IsInKeyBoard()) {
      switch (t) {
        case InputEnums_1.EInputAxis.LookUp:
        case InputEnums_1.EInputAxis.Turn:
        case InputEnums_1.EInputAxis.Zoom:
          i /= Time_1.Time.DeltaTimeSeconds;
      }
    }
    this.AxisValues.set(t, i);
  }
  PreProcessInput(t, e) {
    if (Info_1.Info.AxisInputOptimize) {
      if (this.NextFrameClear) {
        this.NextFrameClear = false;
        this.AxisValues.clear();
      }
      for (const i of this.W$a) {
        if (this.AxisValues.has(i)) {
          this.AxisValues.delete(i);
        }
      }
      this.W$a.clear();
    } else {
      this.AxisValues.clear();
    }
  }
  PostProcessInput(n, t) {
    this.UpdateMoveCache();
    let e = this.InputEvents;
    let s = 0;
    if (this.IsEnableInputCache() && this.InputCaches.length > 0 && (o = this.GetSpecificInputCaches()) && o.length > 0) {
      e = [...o, ...this.InputEvents];
      s = o.length;
    }
    const h = new Array();
    e.forEach((t, e) => {
      var i = this.R8r(n, t);
      if (i && i.CommandType !== 0) {
        e = e < s ? -1 : e;
        h.push(new CharacterInputComponent_1.InputCommand(t.Action, t.State, t.Time, i, e, t.Id));
      }
    });
    if (this.TestInputEvent.length > 0) {
      let t = e.length;
      for (const r of this.TestInputEvent) {
        var i = this.R8r(n, r);
        if (i) {
          h.push(new CharacterInputComponent_1.InputCommand(r.Action, r.State, r.Time, i, t));
        }
        t++;
      }
      this.TestInputEvent.length = 0;
    }
    var o = this.GetBestInputCommand(h);
    if (o?.Index === -1) {
      this.RemoveInputCache(o.Action, o.State);
    }
    this.ValidateInputCaches();
    this.CacheInputs(o);
    this.InputEvents.length = 0;
    if (o?.State === 3) {
      VehicleInputComponent_1.HoldPressMap.set(o.Action, true);
    }
    if (o !== undefined && (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Input", 6, "ReceiveInput", ["BestInputCommand", JSON.stringify(o)]), this.ExecuteInputCommand(o, "PostProcessInput"), this.IsEnableExecuteCommandImmediately()) && h.length > 1) {
      if ((o = h.indexOf(o)) > -1) {
        h.splice(o, 1);
      }
      this.ExecuteImmediateInputCommand(h);
    }
  }
  ClearInputAxis(t) {
    if (Info_1.Info.AxisInputOptimize) {
      if (!t) {
        this.AxisValues.clear();
      }
      this.NextFrameClear = t;
    }
  }
  ClearSingleAxisInput(t, e) {
    if (Info_1.Info.AxisInputOptimize) {
      if (e) {
        this.W$a.add(t);
      } else if (this.AxisValues.has(t)) {
        this.AxisValues.set(t, 0);
      }
    }
  }
  GetCameraInput() {
    return [this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0, this.QueryInputAxis(InputEnums_1.EInputAxis.LookUp) ?? 0];
  }
  GetZoomInput() {
    return this.QueryInputAxis(InputEnums_1.EInputAxis.Zoom) ?? 0;
  }
  OnEnterOrLeaveVehicle(t, e) {}
  RegisterInputHandler() {
    InputController_1.InputController.AddInputHandler(this);
  }
  UnRegisterInputHandler() {
    InputController_1.InputController.RemoveInputHandler(this);
    this.LastMovementInputTime = INVALID_INPUT_TIME;
    this.InputEvents.length = 0;
    this.InputCaches.length = 0;
    this.vZf = 0;
    this.AxisValues.clear();
    this.LongPressLeaveCondition = false;
    VehicleInputComponent_1.HoldPressMap.clear();
    VehicleInputComponent_1.HoldActionMap.clear();
  }
  SetVehicleRelatedInputEnable(t, e) {
    const i = t?.GetComponent(215);
    if (i) {
      if (e) {
        this.PassengerInputForbidTagArray.forEach(t => {
          i.RemoveTag(t);
        });
      } else {
        this.PassengerInputForbidTagArray.forEach(t => {
          i.AddTag(t);
        });
      }
    }
  }
  ValidateInputCaches() {
    for (let t = this.InputCaches.length - 1; t >= 0; t--) {
      var e = this.InputCaches[t];
      var i = this.GetCacheTime(e.Action, e.State);
      if (e.AccumulateTime > i) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Input", 67, "[VehicleInputComponent.ValidateInputCaches]输入缓存已过期，移除输入缓存", ["action", e.Action], ["state", e.State], ["time", e.Time], ["worldTime", e.WorldTime], ["eventId", e.Id]);
        }
        this.InputCaches.splice(t, 1);
      }
    }
  }
  GetCacheTime(e, i) {
    if (this.GetBpInputComp()) {
      let t = undefined;
      if (!this.CacheTimes.has(e)) {
        t = this.GetBpInputComp().GetUnrealCacheConfig(e);
        this.CacheTimes.set(e, t);
      }
      if (t = t || this.CacheTimes.get(e)) {
        switch (i) {
          case 1:
            return t.按下;
          case 3:
            return t.长按;
          case 2:
            return t.抬起;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 14, "错误的输入状态 ", ["state", i]);
        }
      }
    }
    return ZERO_TIME;
  }
  R8r(t, e) {
    let i = undefined;
    switch (e.State) {
      case 1:
        this.DispatchPressEvent(e.Action, e.Time);
        i = this.w8r(e.Action, e.Time, e.Id);
        break;
      case 2:
        this.DispatchReleaseEvent(e.Action, e.Time);
        i = this.b8r(e.Action, e.Time, e.Id);
        break;
      case 3:
        if (e.Action === InputEnums_1.EInputAction.跳跃 && this.IsEnableLongPressLeave) {
          if (!this.CheckIfCanLeave()) {
            this.LongPressLeaveCondition = false;
            return;
          }
          if (!this.LongPressLeaveCondition) {
            this.InvalidHoldTime = e.Time;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressStart, e.Action);
          }
          this.LongPressLeaveCondition = true;
        }
        if (!this.ShouldTriggerHoldEvent(e.Action, e.Time - this.InvalidHoldTime, t)) {
          e.Action = InputEnums_1.EInputAction.None;
          return;
        }
        i = this.HandleHold(e.Action, e.Time);
    }
    return i;
  }
  GetBestInputCommand(t) {
    if (t.length !== 0) {
      let i = INVALID_PRIORITY;
      let n = INVALID_PRIORITY_INDEX;
      t.forEach((t, e) => {
        t = this.QueryInputPriority(t.Command);
        if (t > i) {
          i = t;
          n = e;
        }
      });
      return t[n];
    }
  }
  CacheInputs(t) {
    const i = this.GetWorldTime();
    const n = t !== undefined ? t.Index : -1;
    this.InputEvents.forEach((t, e) => {
      if (e !== n && t.Action !== InputEnums_1.EInputAction.None && this.GetCacheTime(t.Action, t.State) !== ZERO_TIME) {
        this.InputCaches.push(new CharacterInputComponent_1.InputCache(t.Action, t.State, t.Time, i, 0, t.Id));
      }
    });
  }
  DispatchPressEvent(t, e) {
    if (this.ActorComp) {
      var i = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (i) {
        for (const n of i) {
          n.DispatchPressEvent(t, e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 72, "[VehicleInputComponent.DispatchPressEvent]", ["EntityId", this.Entity.Id], ["InputLayers", i]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  w8r(t, e, i = -1) {
    if (this.ActorComp) {
      var n = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (n) {
        for (const h of n) {
          var s = h.HandlePress(t, e);
          if (s && s.CommandType !== 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Input", 72, "[VehicleInputComponent.HandlePress]输入层级处理指令", ["layerType", h.GetLayerType()], ["action", t], ["commandType", s.CommandType], ["commandValue", s.IntValue], ["eventId", i]);
            }
            return s;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 72, "[VehicleInputComponent.HandlePress]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  DispatchReleaseEvent(t, e) {
    if (this.ActorComp) {
      var i = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (i) {
        for (const n of i) {
          n.DispatchReleaseEvent(t, e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 72, "[VehicleInputComponent.DispatchReleaseEvent]", ["EntityId", this.Entity.Id], ["InputLayers", i]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  b8r(t, e, i = -1) {
    if (this.ActorComp) {
      var n = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (n) {
        for (const h of n) {
          var s = h.HandleRelease(t, e);
          if (s && s.CommandType !== 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Input", 72, "[VehicleInputComponent.HandleRelease]输入层级处理指令", ["layerType", h.GetLayerType()], ["action", t], ["commandType", s.CommandType], ["commandValue", s.IntValue], ["eventId", i]);
            }
            return s;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 72, "[VehicleInputComponent.HandleRelease]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  GetBpInputComp() {
    return this.Bhh?.GetBpInputComp();
  }
  ShouldTriggerHoldEvent(t, e, i) {
    var [n, s] = this.GetHoldConfig(t);
    return s !== NULL_CONFIG_TIME && !(e < s) && (!!n || (!VehicleInputComponent_1.HoldPressMap.has(t) || !VehicleInputComponent_1.HoldPressMap.get(t)) && !!(s < e - i * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1)));
  }
  GetHoldConfig(t) {
    if (!this.GetBpInputComp()) {
      return [false, NULL_CONFIG_TIME];
    }
    let e = undefined;
    if (!this.HoldConfigs.has(t)) {
      e = this.GetBpInputComp().GetUnrealHoldConfig(t);
      this.HoldConfigs.set(t, e);
    }
    if (e = e || this.HoldConfigs.get(t)) {
      return [e.连续触发, e.触发时间];
    } else {
      return [false, NULL_CONFIG_TIME];
    }
  }
  HandleHold(t, e) {
    if (this.ActorComp) {
      var i = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (i) {
        for (const s of i) {
          var n = s.HandleHold(t, e);
          if (n && n.CommandType !== 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Input", 72, "[VehicleInputComponent.HandleHold]输入层级处理指令", ["layerType", s.GetLayerType()], ["action", t], ["commandType", n.CommandType], ["commandValue", n.IntValue]);
            }
            return n;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 72, "[VehicleInputComponent.HandleHold]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  IsHoldingAction(t) {
    return VehicleInputComponent_1.HoldActionMap.has(t);
  }
  NeedUpdateInputDirectAndFacing() {
    return !!this.PerformComp?.CanBeenManipulated && !!this.PerformComp?.Driver;
  }
  UpdateVehicleInputDirectAndFacing() {
    this.UpdateMoveCache();
    this.ActorComp.SetInputDirect(this.GetWorldMoveDirectionCache(), true);
    this.SetInputFacingFromInputDirect();
  }
  SetInputFacingFromInputDirect(t = true) {
    if (GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.ActorComp.InputDirectProxy) > MathUtils_1.MathUtils.SmallNumber) {
      this.ActorComp.SetInputFacing(this.ActorComp.InputDirectProxy);
    } else if (t) {
      this.ActorComp.SetInputFacing(this.ActorComp.ActorForwardProxy);
    }
  }
  GetMoveDirectionCache() {
    return this.MoveDirectionCache;
  }
  GetWorldMoveDirectionCache() {
    if (this.ActorComp.IsAutonomousProxy) {
      this.TempRotator.DeepCopy(this.ActorComp.ActorRotationProxy);
      GravityUtils_1.GravityUtils.GetQuatFromRotatorAndGravityForActor(this.ActorComp, this.TempRotator, this.TempQuat);
      this.TempQuat.RotateVector(this.MoveDirectionCache, this.WorldMoveDirectionCache);
    }
    return this.WorldMoveDirectionCache;
  }
  UpdateMoveCache() {
    this.GetMoveVector(this.MoveVectorCache);
    if (this.MoveVectorCache.SizeSquared2D() > 1) {
      this.MoveVectorCache.Normalize();
    }
    if (this.IsSmallInput(this.MoveVectorCache)) {
      if (Time_1.Time.Now - this.LastMovementInputTime > MOVE_VECTOR_CACHE_TIME) {
        this.MoveDirectionCache.DeepCopy(this.MoveVectorCache);
        this.MoveDirectionCache.Normalize();
        this.LastMovementInputTime = INVALID_INPUT_TIME;
      }
    } else {
      this.MoveDirectionCache.DeepCopy(this.MoveVectorCache);
      this.MoveDirectionCache.Normalize();
      this.LastMovementInputTime = Time_1.Time.Now;
    }
  }
  ExecuteInputCommand(t, e) {
    var i = t.Command;
    switch (i.CommandType) {
      case 4:
        this.ExecuteSprint(i);
        break;
      case 2:
        this.ExecuteJump(i);
        break;
      case 1:
        this.ExecuteSkill(i);
    }
  }
  ExecuteJump(t) {
    this.Entity.GetComponent(246)?.TryLeave(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity);
  }
  ExecuteSprint(t) {}
  ExecuteSkill(t) {}
  AddBlockEvents() {
    this.TagEventJump = this.AddBlockActionEvent(-469423249, InputEnums_1.EInputAction.跳跃);
    this.TagEventClimb = this.AddBlockActionEvent(766688429, InputEnums_1.EInputAction.攀爬);
    this.TagEventAttack = this.AddBlockActionEvent(-542518289, InputEnums_1.EInputAction.攻击);
    this.TagEventDodge = this.AddBlockActionEvent(581080458, InputEnums_1.EInputAction.闪避);
    this.TagEventSkill = this.AddBlockActionEvent(-541178966, InputEnums_1.EInputAction.技能1);
    this.TagEventVision1 = this.AddBlockActionEvent(-1802431900, InputEnums_1.EInputAction.幻象1);
    this.TagEventUltimateSkill = this.AddBlockActionEvent(-732810197, InputEnums_1.EInputAction.大招);
    this.TagEventVision2 = this.AddBlockActionEvent(-1752099043, InputEnums_1.EInputAction.幻象2);
    this.TagEventLock = this.AddBlockActionEvent(-2140742267, InputEnums_1.EInputAction.锁定目标);
    this.TagEventAim = this.AddBlockActionEvent(-1013832153, InputEnums_1.EInputAction.瞄准);
    this.TagEventMove = this.AddBlockAxisEvent(1616400338, [InputEnums_1.EInputAxis.MoveForward, InputEnums_1.EInputAxis.MoveRight]);
  }
  AddBlockActionEvent(t, i) {
    return this.TagComp.ListenForTagAddOrRemove(t, (t, e) => {
      if (e) {
        this.InputGroup.BlockActions.add(i);
        this.OnAddBlockAction(i);
      } else {
        this.InputGroup.BlockActions.delete(i);
      }
    });
  }
  AddBlockAxisEvent(t, n) {
    return this.TagComp.ListenForTagAddOrRemove(t, (t, e) => {
      for (const i of n) {
        if (e) {
          this.InputGroup.BlockAxes.add(i);
        } else {
          this.InputGroup.BlockAxes.delete(i);
        }
      }
    });
  }
  RemoveBlockActionEvents() {
    this.TagEventJump.EndTask();
    this.TagEventClimb.EndTask();
    this.TagEventAttack.EndTask();
    this.TagEventDodge.EndTask();
    this.TagEventSkill.EndTask();
    this.TagEventVision1.EndTask();
    this.TagEventUltimateSkill.EndTask();
    this.TagEventVision2.EndTask();
    this.TagEventLock.EndTask();
    this.TagEventAim.EndTask();
    this.TagEventMove.EndTask();
  }
  InitPassengerInputForbidTagInfo() {
    this.PassengerInputForbidTagArray.push(-541178966);
    this.PassengerInputForbidTagArray.push(1616400338);
    this.PassengerInputForbidTagArray.push(-469423249);
    this.PassengerInputForbidTagArray.push(766688429);
    this.PassengerInputForbidTagArray.push(-542518289);
    this.PassengerInputForbidTagArray.push(581080458);
    this.PassengerInputForbidTagArray.push(-1802431900);
    this.PassengerInputForbidTagArray.push(-1752099043);
    this.PassengerInputForbidTagArray.push(-732810197);
    this.PassengerInputForbidTagArray.push(-2140742267);
    this.PassengerInputForbidTagArray.push(-1013832153);
  }
  OnAddBlockAction(t) {}
  GetNewQuatInLockMode(t, e, i) {
    CameraUtility_1.CameraUtility.GetSocketLocation(undefined, e, this.TempVector, t);
    this.TempVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
    var e = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.TempVector);
    if (!(e < this.MoveDirectionDistanceMin * this.MoveDirectionDistanceMin) && !(i.Inverse(this.TempQuat), this.TempQuat.RotateVector(this.TempVector, this.TempVector), t = this.TempVector.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg, Math.abs(t) > this.MovementDirectionAngleThreshold)) {
      e = MathUtils_1.MathUtils.RangeClamp(Math.sqrt(e), this.MoveDirectionDistanceMin, this.MoveDirectionDistanceMax, 0, t);
      this.TempRotator.Set(0, e, 0);
      this.TempRotator.Quaternion(this.TempQuat);
      i.Multiply(this.TempQuat, this.TempQuat2);
      i.DeepCopy(this.TempQuat2);
    }
  }
  QueryInputAxis(t) {
    return this.AxisValues.get(t);
  }
  QueryInputPriority(t) {
    let e = undefined;
    switch (t.CommandType) {
      case 0:
        break;
      case 1:
        e = this.QuerySkillPriority(t.IntValue);
        break;
      default:
        if ((e = this.QueryCommandPriority(t)) === undefined) {
          e = InputController_1.InputController.QueryCommandPriority(t.CommandType);
        }
    }
    return e = e === undefined ? INVALID_PRIORITY : e;
  }
  QuerySkillPriority(t) {
    return 0;
  }
  QueryCommandPriority(t) {}
  GetMoveVector(t) {
    t.X = this.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0;
    if (this.ForwardInputCurve) {
      t.X = this.ForwardInputCurve.GetFloatValue(t.X);
    }
    t.Y = this.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight) ?? 0;
    t.Z = 0;
  }
  IsSmallInput(t) {
    return t.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber);
  }
  GetWorldTime() {
    return UE.GameplayStatics.GetTimeSeconds(GlobalData_1.GlobalData.World);
  }
  SetVehicleType(t) {
    this.VehicleType = t;
    this.IsEnableLongPressLeave = t === "Gongduola" || t === "AutoMoveGongduola" || this.IsActionShowLongPress(InputEnums_1.EInputAction.跳跃);
  }
  IsActionShowLongPress(t) {
    var e = this.Entity.GetComponent(0)?.GetTemplateId();
    if (e) {
      e = ConfigManager_1.ConfigManager.SkillButtonConfig.GetAllSkillVehicleButtonConfig(e);
      if (e) {
        for (const i of e) {
          if (i.ActionType === t && i.ShowLongPress) {
            return true;
          }
        }
      }
    }
    return false;
  }
  CheckIfCanLeave() {
    return this.VehicleType !== "Gongduola" || !!this.Entity.GetComponent(250)?.CheckIfCanLeave();
  }
  IsEnableInputCache() {
    return false;
  }
  GetSpecificInputCaches() {}
  RemoveInputCache(e, i) {
    for (let t = this.InputCaches.length - 1; t >= 0; t--) {
      var n = this.InputCaches[t];
      if (n.Action === e && n.State === i) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Input", 67, "[VehicleInputComponent.RemoveInputCache]移除输入缓存", ["action", n.Action], ["state", n.State], ["time", n.Time], ["worldTime", n.WorldTime], ["eventId", n.Id]);
        }
        this.InputCaches.splice(t, 1);
      }
    }
  }
  IsEnableExecuteCommandImmediately() {
    return false;
  }
  GetImmediateInputCommands(t) {}
  ExecuteImmediateInputCommand(t) {
    t = this.GetImmediateInputCommands(t);
    if (t) {
      for (const e of t) {
        this.ExecuteInputCommand(e, "ExecuteImmediateInputCommand");
      }
    }
  }
  TestActionInput(t, e, i) {
    t = new CharacterInputComponent_1.InputEvent(t, e, i);
    this.TestInputEvent.push(t);
  }
};
VehicleInputComponent.HoldPressMap = new Map();
VehicleInputComponent.HoldActionMap = new Map();
VehicleInputComponent = VehicleInputComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(253)], VehicleInputComponent);
exports.VehicleInputComponent = VehicleInputComponent; //# sourceMappingURL=VehicleInputComponent.js.map