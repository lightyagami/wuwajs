"use strict";

var VehicleInputComponent_1;
var __decorate = this && this.__decorate || function (t, s, e, i) {
  var n;
  var h = arguments.length;
  var u = h < 3 ? s : i === null ? i = Object.getOwnPropertyDescriptor(s, e) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    u = Reflect.decorate(t, s, e, i);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (n = t[r]) {
        u = (h < 3 ? n(u) : h > 3 ? n(s, e, u) : n(s, e)) || u;
      }
    }
  }
  if (h > 3 && u) {
    Object.defineProperty(s, e, u);
  }
  return u;
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
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
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
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const CharacterInputComponent_1 = require("../../Character/Common/Component/CharacterInputComponent");
const ZERO_TIME = 0;
const NULL_CONFIG_TIME = -1;
const INVALID_PRIORITY = -1;
const INVALID_PRIORITY_INDEX = -1;
const INVALID_INPUT_TIME = -1;
const MOVE_VECTOR_CACHE_TIME = 100;
const NPC_VEHICLE_INPUT_CLASS_PATH = "/Game/Aki/Character/NPC/BP_InputComponent_NpcVehicle.BP_InputComponent_NpcVehicle_C";
let VehicleInputComponent = VehicleInputComponent_1 = class VehicleInputComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.PerformComp = undefined;
    this.TagComp = undefined;
    this.BpInputComp = undefined;
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
    this.TagEventChangeRoll1 = undefined;
    this.TagEventChangeRoll2 = undefined;
    this.TagEventChangeRoll3 = undefined;
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
    this.W$a = new Set();
    this.OnEnterVehicle = t => {
      if (t.IsRolePassenger(true)) {
        this.RegisterInputHandler();
        this.SetVehicleRelatedInputEnable(t.PassengerEntity, false);
        this.SetVehicleType(t.VehicleType);
        if (!t.IsDriver) {
          this.SetVehicleRelatedInputEnable(this.Entity, false);
          (t = this.Entity.GetComponent(206))?.RemoveTag(-469423249);
          t?.RemoveTag(-1802431900);
        }
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
    this.PerformComp = this.Entity.GetComponent(234);
    this.TagComp = this.Entity.GetComponent(206);
    let t = undefined;
    this.ActorComp = this.Entity.GetComponent(235);
    if ((t = this.ActorComp ? this.ActorComp.Actor.InputComponentClass?.AssetPathName?.toString() : (this.ActorComp = this.Entity.GetComponent(3), NPC_VEHICLE_INPUT_CLASS_PATH)) && t !== "") {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
        this.BpInputComp = this.ActorComp?.Actor.AddComponentByClass(t, false, MathUtils_1.MathUtils.DefaultTransform, false);
        this.BpInputComp.OwnerActor = this.ActorComp?.Actor;
      });
      this.AddBlockEvents();
      this.InitPassengerInputForbidTagInfo();
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 6, "1060541 InputComponent init NoClass.", ["Vehicle", this.ActorComp?.Actor.GetName()]);
      }
      return false;
    }
  }
  OnTick(t) {
    this.t4u(t);
    if (this.NeedUpdateInputDirectAndFacing()) {
      this.UpdateVehicleInputDirectAndFacing();
    }
  }
  t4u(t) {
    if (this.InputCaches.length !== 0) {
      var s = t * TimeUtil_1.TimeUtil.Millisecond * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1);
      for (const e of this.InputCaches) {
        e.AccumulateTime += s;
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
  OnClear() {
    return true;
  }
  OnDisable(t) {}
  OnEnable() {}
  GetPriority() {
    return 1;
  }
  GetInputFilter() {
    return this.InputGroup;
  }
  HandlePressEvent(t, s) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.InputEvents.push(new CharacterInputComponent_1.InputEvent(t, 1, s));
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行按下操作", ["action", t]);
    }
  }
  HandleReleaseEvent(t, s) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.InputEvents.push(new CharacterInputComponent_1.InputEvent(t, 2, s));
      VehicleInputComponent_1.HoldPressMap.set(t, false);
      VehicleInputComponent_1.HoldActionMap.delete(t);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行放开操作", ["action", t]);
    }
  }
  HandleHoldEvent(t, s) {
    this.InputEvents.push(new CharacterInputComponent_1.InputEvent(t, 3, s));
    VehicleInputComponent_1.HoldActionMap.set(t, true);
  }
  HandleInputAxis(t, s) {
    let e = s;
    if (Info_1.Info.IsInKeyBoard()) {
      switch (t) {
        case InputEnums_1.EInputAxis.LookUp:
        case InputEnums_1.EInputAxis.Turn:
        case InputEnums_1.EInputAxis.Zoom:
          e /= Time_1.Time.DeltaTimeSeconds;
      }
    }
    this.AxisValues.set(t, e);
  }
  PreProcessInput(t, s) {
    if (Info_1.Info.AxisInputOptimize) {
      if (this.NextFrameClear) {
        this.NextFrameClear = false;
        this.AxisValues.clear();
      }
      for (const e of this.W$a) {
        if (this.AxisValues.has(e)) {
          this.AxisValues.delete(e);
        }
      }
      this.W$a.clear();
    } else {
      this.AxisValues.clear();
    }
  }
  PostProcessInput(i, t) {
    this.UpdateMoveCache();
    this.ValidateInputCaches();
    const n = new Array();
    this.InputEvents.forEach((t, s) => {
      var e = this.GetCommand(i, t);
      if (e && e.CommandType !== 0) {
        n.push(new CharacterInputComponent_1.InputCommand(t.Action, t.State, t.Time, e, s));
      }
    });
    if (this.TestInputEvent.length > 0) {
      let t = this.InputEvents.length;
      for (const h of this.TestInputEvent) {
        var s = this.GetCommand(i, h);
        if (s) {
          n.push(new CharacterInputComponent_1.InputCommand(h.Action, h.State, h.Time, s, t));
        }
        t++;
      }
      this.TestInputEvent.length = 0;
    }
    var e = this.GetBestInputCommand(n);
    this.CacheInputs(e);
    this.InputEvents.length = 0;
    if (e?.State === 3) {
      VehicleInputComponent_1.HoldPressMap.set(e.Action, true);
    }
    if (e !== undefined) {
      if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 6, "ReceiveInput", ["BestInputCommand", JSON.stringify(e)]);
      }
      this.ExecuteInputCommand(e, "PostProcessInput");
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
  ClearSingleAxisInput(t, s) {
    if (Info_1.Info.AxisInputOptimize) {
      if (s) {
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
  RegisterInputHandler() {
    InputController_1.InputController.AddInputHandler(this);
  }
  UnRegisterInputHandler() {
    InputController_1.InputController.RemoveInputHandler(this);
    this.LastMovementInputTime = INVALID_INPUT_TIME;
    this.InputEvents.length = 0;
    this.InputCaches.length = 0;
    this.AxisValues.clear();
    this.LongPressLeaveCondition = false;
    VehicleInputComponent_1.HoldPressMap.clear();
    VehicleInputComponent_1.HoldActionMap.clear();
  }
  SetVehicleRelatedInputEnable(t, s) {
    const e = t?.GetComponent(206);
    if (e) {
      if (s) {
        this.PassengerInputForbidTagArray.forEach(t => {
          e.RemoveTag(t);
        });
      } else {
        this.PassengerInputForbidTagArray.forEach(t => {
          e.AddTag(t);
        });
      }
    }
  }
  ValidateInputCaches() {
    for (let t = this.InputCaches.length - 1; t >= 0; t--) {
      var s = this.InputCaches[t];
      var e = this.GetCacheTime(s.Action, s.State);
      if (s.AccumulateTime > e) {
        this.InputCaches.splice(t, 1);
      }
    }
  }
  GetCacheTime(s, e) {
    if (this.BpInputComp) {
      let t = undefined;
      if (!this.CacheTimes.has(s)) {
        t = this.BpInputComp.GetUnrealCacheConfig(s);
        this.CacheTimes.set(s, t);
      }
      if (t = t || this.CacheTimes.get(s)) {
        switch (e) {
          case 1:
            return t.按下;
          case 3:
            return t.长按;
          case 2:
            return t.抬起;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 14, "错误的输入状态 ", ["state", e]);
        }
      }
    }
    return ZERO_TIME;
  }
  GetCommand(t, s) {
    let e = undefined;
    switch (s.State) {
      case 1:
        this.DispatchPressEvent(s.Action, s.Time);
        e = this.HandlePress(s.Action, s.Time);
        break;
      case 2:
        this.DispatchReleaseEvent(s.Action, s.Time);
        e = this.HandleRelease(s.Action, s.Time);
        break;
      case 3:
        if (s.Action === InputEnums_1.EInputAction.跳跃 && this.IsEnableLongPressLeave) {
          if (!this.CheckIfCanLeave()) {
            this.LongPressLeaveCondition = false;
            return;
          }
          if (!this.LongPressLeaveCondition) {
            this.InvalidHoldTime = s.Time;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressStart, s.Action);
          }
          this.LongPressLeaveCondition = true;
        }
        if (!this.ShouldTriggerHoldEvent(s.Action, s.Time - this.InvalidHoldTime, t)) {
          s.Action = InputEnums_1.EInputAction.None;
          return;
        }
        e = this.HandleHold(s.Action, s.Time);
    }
    return e;
  }
  GetBestInputCommand(t) {
    if (t.length !== 0) {
      let e = INVALID_PRIORITY;
      let i = INVALID_PRIORITY_INDEX;
      t.forEach((t, s) => {
        t = this.QueryInputPriority(t.Command);
        if (t > e) {
          e = t;
          i = s;
        }
      });
      return t[i];
    }
  }
  CacheInputs(t) {
    const e = this.GetWorldTime();
    const i = t !== undefined ? t.Index : -1;
    this.InputEvents.forEach((t, s) => {
      if (s !== i && t.Action !== InputEnums_1.EInputAction.None && this.GetCacheTime(t.Action, t.State) !== ZERO_TIME) {
        this.InputCaches.push(new CharacterInputComponent_1.InputCache(t.Action, t.State, t.Time, e, 0));
      }
    });
  }
  DispatchPressEvent(t, s) {
    if (this.ActorComp) {
      if (this.BpInputComp) {
        switch (t) {
          case InputEnums_1.EInputAction.跳跃:
            this.BpInputComp.跳跃按下事件(s);
            if (this.IsEnableLongPressLeave && (this.LongPressLeaveCondition = true, this.InvalidHoldTime = 0, this.CheckIfCanLeave())) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressStart, t);
            }
            break;
          case InputEnums_1.EInputAction.攀爬:
            this.BpInputComp.攀爬按下事件(s);
            break;
          case InputEnums_1.EInputAction.走跑切换:
            this.BpInputComp.走跑切换按下事件(s);
            break;
          case InputEnums_1.EInputAction.攻击:
            this.BpInputComp.攻击按下事件(s);
            break;
          case InputEnums_1.EInputAction.闪避:
            this.BpInputComp.闪避按下事件(s);
            break;
          case InputEnums_1.EInputAction.技能1:
            this.BpInputComp.技能1按下事件(s);
            break;
          case InputEnums_1.EInputAction.幻象1:
            this.BpInputComp.幻象1按下事件(s);
            break;
          case InputEnums_1.EInputAction.大招:
            this.BpInputComp.大招按下事件(s);
            break;
          case InputEnums_1.EInputAction.幻象2:
            this.BpInputComp.幻象2按下事件(s);
            break;
          case InputEnums_1.EInputAction.切换角色1:
            this.BpInputComp.切换角色1按下事件(s);
            break;
          case InputEnums_1.EInputAction.切换角色2:
            this.BpInputComp.切换角色2按下事件(s);
            break;
          case InputEnums_1.EInputAction.切换角色3:
            this.BpInputComp.切换角色3按下事件(s);
            break;
          case InputEnums_1.EInputAction.锁定目标:
            this.BpInputComp.锁定目标按下事件(s);
            break;
          case InputEnums_1.EInputAction.瞄准:
            this.BpInputComp.瞄准按下事件(s);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  HandlePress(t, s) {
    if (this.ActorComp) {
      if (this.BpInputComp) {
        switch (t) {
          case InputEnums_1.EInputAction.跳跃:
            return this.BpInputComp.跳跃按下(s);
          case InputEnums_1.EInputAction.攀爬:
            return this.BpInputComp.攀爬按下(s);
          case InputEnums_1.EInputAction.走跑切换:
            return this.BpInputComp.走跑切换按下(s);
          case InputEnums_1.EInputAction.攻击:
            return this.BpInputComp.攻击按下(s);
          case InputEnums_1.EInputAction.闪避:
            return this.BpInputComp.闪避按下(s);
          case InputEnums_1.EInputAction.技能1:
            return this.BpInputComp.技能1按下(s);
          case InputEnums_1.EInputAction.幻象1:
            return this.BpInputComp.幻象1按下(s);
          case InputEnums_1.EInputAction.大招:
            return this.BpInputComp.大招按下(s);
          case InputEnums_1.EInputAction.幻象2:
            return this.BpInputComp.幻象2按下(s);
          case InputEnums_1.EInputAction.切换角色1:
            return this.BpInputComp.切换角色1按下(s);
          case InputEnums_1.EInputAction.切换角色2:
            return this.BpInputComp.切换角色2按下(s);
          case InputEnums_1.EInputAction.切换角色3:
            return this.BpInputComp.切换角色3按下(s);
          case InputEnums_1.EInputAction.瞄准:
            return this.BpInputComp.瞄准按下(s);
          case InputEnums_1.EInputAction.通用交互:
            return this.BpInputComp.通用交互按下(s);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  DispatchReleaseEvent(t, s) {
    if (this.ActorComp) {
      if (this.BpInputComp) {
        switch (t) {
          case InputEnums_1.EInputAction.跳跃:
            this.BpInputComp.跳跃抬起事件(s);
            if (this.IsEnableLongPressLeave) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressEnd, t);
            }
            break;
          case InputEnums_1.EInputAction.攀爬:
            this.BpInputComp.攀爬抬起事件(s);
            break;
          case InputEnums_1.EInputAction.走跑切换:
            this.BpInputComp.走跑切换抬起事件(s);
            break;
          case InputEnums_1.EInputAction.攻击:
            this.BpInputComp.攻击抬起事件(s);
            break;
          case InputEnums_1.EInputAction.闪避:
            this.BpInputComp.闪避抬起事件(s);
            break;
          case InputEnums_1.EInputAction.技能1:
            this.BpInputComp.技能1抬起事件(s);
            break;
          case InputEnums_1.EInputAction.幻象1:
            this.BpInputComp.幻象1抬起事件(s);
            break;
          case InputEnums_1.EInputAction.大招:
            this.BpInputComp.大招抬起事件(s);
            break;
          case InputEnums_1.EInputAction.幻象2:
            this.BpInputComp.幻象2抬起事件(s);
            break;
          case InputEnums_1.EInputAction.切换角色1:
            this.BpInputComp.切换角色1抬起事件(s);
            break;
          case InputEnums_1.EInputAction.切换角色2:
            this.BpInputComp.切换角色2抬起事件(s);
            break;
          case InputEnums_1.EInputAction.切换角色3:
            this.BpInputComp.切换角色3抬起事件(s);
            break;
          case InputEnums_1.EInputAction.锁定目标:
            this.BpInputComp.锁定目标抬起事件(s);
            break;
          case InputEnums_1.EInputAction.瞄准:
            this.BpInputComp.瞄准抬起事件(s);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  HandleRelease(t, s) {
    if (this.ActorComp) {
      if (this.BpInputComp) {
        switch (t) {
          case InputEnums_1.EInputAction.跳跃:
            return this.BpInputComp.跳跃抬起(s);
          case InputEnums_1.EInputAction.攀爬:
            return this.BpInputComp.攀爬抬起(s);
          case InputEnums_1.EInputAction.走跑切换:
            return this.BpInputComp.走跑切换抬起(s);
          case InputEnums_1.EInputAction.攻击:
            return this.BpInputComp.攻击抬起(s);
          case InputEnums_1.EInputAction.闪避:
            return this.BpInputComp.闪避抬起(s);
          case InputEnums_1.EInputAction.技能1:
            return this.BpInputComp.技能1抬起(s);
          case InputEnums_1.EInputAction.幻象1:
            return this.BpInputComp.幻象1抬起(s);
          case InputEnums_1.EInputAction.大招:
            return this.BpInputComp.大招抬起(s);
          case InputEnums_1.EInputAction.幻象2:
            return this.BpInputComp.幻象2抬起(s);
          case InputEnums_1.EInputAction.切换角色1:
            return this.BpInputComp.切换角色1抬起(s);
          case InputEnums_1.EInputAction.切换角色2:
            return this.BpInputComp.切换角色2抬起(s);
          case InputEnums_1.EInputAction.切换角色3:
            return this.BpInputComp.切换角色3抬起(s);
          case InputEnums_1.EInputAction.瞄准:
            return this.BpInputComp.瞄准抬起(s);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  ShouldTriggerHoldEvent(t, s, e) {
    var [i, n] = this.GetHoldConfig(t);
    return n !== NULL_CONFIG_TIME && !(s < n) && (!!i || (!VehicleInputComponent_1.HoldPressMap.has(t) || !VehicleInputComponent_1.HoldPressMap.get(t)) && !!(n < s - e * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1)));
  }
  GetHoldConfig(t) {
    if (!this.BpInputComp) {
      return [false, NULL_CONFIG_TIME];
    }
    let s = undefined;
    if (!this.HoldConfigs.has(t)) {
      s = this.BpInputComp.GetUnrealHoldConfig(t);
      this.HoldConfigs.set(t, s);
    }
    if (s = s || this.HoldConfigs.get(t)) {
      return [s.连续触发, s.触发时间];
    } else {
      return [false, NULL_CONFIG_TIME];
    }
  }
  HandleHold(t, s) {
    if (this.ActorComp) {
      if (this.BpInputComp) {
        switch (t) {
          case InputEnums_1.EInputAction.跳跃:
            return this.BpInputComp.跳跃长按(s);
          case InputEnums_1.EInputAction.攀爬:
            return this.BpInputComp.攀爬长按(s);
          case InputEnums_1.EInputAction.走跑切换:
            return this.BpInputComp.走跑切换长按(s);
          case InputEnums_1.EInputAction.攻击:
            return this.BpInputComp.攻击长按(s);
          case InputEnums_1.EInputAction.闪避:
            return this.BpInputComp.闪避长按(s);
          case InputEnums_1.EInputAction.技能1:
            return this.BpInputComp.技能1长按(s);
          case InputEnums_1.EInputAction.幻象1:
            return this.BpInputComp.幻象1长按(s);
          case InputEnums_1.EInputAction.大招:
            return this.BpInputComp.大招长按(s);
          case InputEnums_1.EInputAction.幻象2:
            return this.BpInputComp.幻象2长按(s);
          case InputEnums_1.EInputAction.切换角色1:
            return this.BpInputComp.切换角色1长按(s);
          case InputEnums_1.EInputAction.切换角色2:
            return this.BpInputComp.切换角色2长按(s);
          case InputEnums_1.EInputAction.切换角色3:
            return this.BpInputComp.切换角色3长按(s);
          case InputEnums_1.EInputAction.锁定目标:
            return this.BpInputComp.锁定目标长按(s);
          case InputEnums_1.EInputAction.瞄准:
            return this.BpInputComp.瞄准长按(s);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  IsHoldingAction(t) {
    return VehicleInputComponent_1.HoldActionMap.has(t);
  }
  NeedUpdateInputDirectAndFacing() {
    return !!this.PerformComp?.CanBeenManipulated && !!this.PerformComp?.Drivers.size;
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
  ExecuteInputCommand(t, s) {
    var e = t.Command;
    switch (e.CommandType) {
      case 4:
        this.ExecuteSprint(e);
        break;
      case 2:
        this.ExecuteJump(e);
        break;
      case 1:
        this.ExecuteSkill(e);
    }
  }
  ExecuteJump(t) {
    this.Entity.GetComponent(234)?.TryLeave(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity);
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
    this.TagEventChangeRoll1 = this.AddBlockActionEvent(-1216591977, InputEnums_1.EInputAction.切换角色1);
    this.TagEventChangeRoll2 = this.AddBlockActionEvent(-1199814358, InputEnums_1.EInputAction.切换角色2);
    this.TagEventChangeRoll3 = this.AddBlockActionEvent(-1183036739, InputEnums_1.EInputAction.切换角色3);
    this.TagEventLock = this.AddBlockActionEvent(-2140742267, InputEnums_1.EInputAction.锁定目标);
    this.TagEventAim = this.AddBlockActionEvent(-1013832153, InputEnums_1.EInputAction.瞄准);
    this.TagEventMove = this.AddBlockAxisEvent(1616400338, [InputEnums_1.EInputAxis.MoveForward, InputEnums_1.EInputAxis.MoveRight]);
  }
  AddBlockActionEvent(t, e) {
    return this.TagComp.ListenForTagAddOrRemove(t, (t, s) => {
      if (s) {
        this.InputGroup.BlockActions.add(e);
      } else {
        this.InputGroup.BlockActions.delete(e);
      }
    });
  }
  AddBlockAxisEvent(t, i) {
    return this.TagComp.ListenForTagAddOrRemove(t, (t, s) => {
      for (const e of i) {
        if (s) {
          this.InputGroup.BlockAxes.add(e);
        } else {
          this.InputGroup.BlockAxes.delete(e);
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
    this.TagEventChangeRoll1.EndTask();
    this.TagEventChangeRoll2.EndTask();
    this.TagEventChangeRoll3.EndTask();
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
    this.PassengerInputForbidTagArray.push(-1216591977);
    this.PassengerInputForbidTagArray.push(-1199814358);
    this.PassengerInputForbidTagArray.push(-1183036739);
    this.PassengerInputForbidTagArray.push(-2140742267);
    this.PassengerInputForbidTagArray.push(-1013832153);
  }
  GetNewQuatInLockMode(t, s, e) {
    CameraUtility_1.CameraUtility.GetSocketLocation(undefined, s, this.TempVector, t);
    this.TempVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
    var s = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.TempVector);
    if (!(s < this.MoveDirectionDistanceMin * this.MoveDirectionDistanceMin) && !(e.Inverse(this.TempQuat), this.TempQuat.RotateVector(this.TempVector, this.TempVector), t = this.TempVector.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg, Math.abs(t) > this.MovementDirectionAngleThreshold)) {
      s = MathUtils_1.MathUtils.RangeClamp(Math.sqrt(s), this.MoveDirectionDistanceMin, this.MoveDirectionDistanceMax, 0, t);
      this.TempRotator.Set(0, s, 0);
      this.TempRotator.Quaternion(this.TempQuat);
      e.Multiply(this.TempQuat, this.TempQuat2);
      e.DeepCopy(this.TempQuat2);
    }
  }
  QueryInputAxis(t) {
    return this.AxisValues.get(t);
  }
  QueryInputPriority(t) {
    let s = undefined;
    switch (t.CommandType) {
      case 0:
        break;
      case 1:
        s = this.QuerySkillPriority(t.IntValue);
        break;
      default:
        s = InputController_1.InputController.QueryCommandPriority(t.CommandType);
    }
    return s = s === undefined ? INVALID_PRIORITY : s;
  }
  QuerySkillPriority(t) {
    return 0;
  }
  GetMoveVector(t) {
    t.X = this.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0;
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
    this.IsEnableLongPressLeave = true;
  }
  CheckIfCanLeave() {
    return this.VehicleType !== "Gongduola" || !!this.Entity.GetComponent(238)?.CheckIfCanLeave();
  }
  TestActionInput(t, s, e) {
    t = new CharacterInputComponent_1.InputEvent(t, s, e);
    this.TestInputEvent.push(t);
  }
};
VehicleInputComponent.HoldPressMap = new Map();
VehicleInputComponent.HoldActionMap = new Map();
VehicleInputComponent = VehicleInputComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(241)], VehicleInputComponent);
exports.VehicleInputComponent = VehicleInputComponent; //# sourceMappingURL=VehicleInputComponent.js.map