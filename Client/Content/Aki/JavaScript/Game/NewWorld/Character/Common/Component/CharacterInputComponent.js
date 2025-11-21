"use strict";

var CharacterInputComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var n = arguments.length;
  var r = n < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (h = t[a]) {
        r = (n < 3 ? h(r) : n > 3 ? h(i, e, r) : h(i, e)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterInputComponent = exports.InputCache = exports.InputCommand = exports.InputEvent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const CameraUtility_1 = require("../../../../Camera/CameraUtility");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const InputController_1 = require("../../../../Input/InputController");
const InputEnums_1 = require("../../../../Input/InputEnums");
const InputFilter_1 = require("../../../../Input/InputFilter");
const InputFilterManager_1 = require("../../../../Input/InputFilterManager");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const RoleDefine_1 = require("../../../../Module/RoleUi/RoleDefine");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const RoleGaitStatic_1 = require("../../Role/Component/Define/RoleGaitStatic");
const RoleAudioController_1 = require("../../Role/RoleAudioController");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
const ZERO_TIME = 0;
const NULL_CONFIG_TIME = -1;
const INVALID_PRIORITY = -1;
const INVALID_PRIORITY_INDEX = -1;
const INVALID_INPUT_TIME = -1;
const MOVE_VECTOR_CACHE_TIME = 100;
const EXIT_CLIMB_BLOCK_ATTACK_RELEASE_TIME = 0.25;
const FIRST_FORWARD_ANGLE = 50;
const FLYING_FEATHER_CONFIG_PATH = "/Game/Aki/Character/Role/Common/Data/DA/DA_FirstPersonConfig.DA_FirstPersonConfig";
const LOW_STRENGTH_EXIT_VALUE = 2200;
const interruptAutoMoving = [0, 1, 2, 3, 4, 5, 7, 8, 9];
const useDelayCacheModeRoleIds = [1409, 1306, 1410];
class InputEvent {
  constructor(t, i, e) {
    this.Action = t;
    this.State = i;
    this.Time = e;
  }
}
exports.InputEvent = InputEvent;
class InputCommand {
  constructor(t, i, e, s, h) {
    this.Action = t;
    this.State = i;
    this.Time = e;
    this.Command = s;
    this.Index = h;
  }
}
exports.InputCommand = InputCommand;
class InputCache {
  constructor(t, i, e, s, h) {
    this.Action = t;
    this.State = i;
    this.Time = e;
    this.WorldTime = s;
    this.AccumulateTime = h;
  }
}
exports.InputCache = InputCache;
class InputContinuously {
  constructor(t, i) {
    this.Gtr = false;
    this.hCc = false;
    this.Cce = 0;
    this.ZSc = 0;
    this.InAirTime = 0;
    this.InDelayExitTime = 0;
    this.r1t = 0;
    this.AutoGlideTime = 0;
    this.DelayExitTime = 0;
    this.QC1 = undefined;
    this.KC1 = undefined;
    this.Lie = undefined;
    this.$zo = undefined;
    this.Lie = t;
    this.$zo = i;
  }
  InitConfig() {
    this.r1t = CommonParamById_1.configCommonParamById.GetIntConfig("ConstantSprintEnterTime");
    this.AutoGlideTime = CommonParamById_1.configCommonParamById.GetIntConfig("ConstantSprintAutoGlideTime");
    this.DelayExitTime = CommonParamById_1.configCommonParamById.GetIntConfig("ConstantSprintSpecialStateOffset");
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("ConstantSprintListeningBuffStopList");
    var i = CommonParamById_1.configCommonParamById.GetStringArrayConfig("ConstantSprintListeningTagStopList");
    if (t && t.length > 0) {
      this.QC1 = [];
      this.QC1.push(...t);
    }
    if (i && i.length > 0) {
      this.KC1 = [];
      for (const s of i) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s);
        this.KC1.push(e);
      }
    }
  }
  GetAutoMovingState() {
    var t = ModelManager_1.ModelManager.BattleUiModel.FormationData.AutoMovingSettingEnable && this.CheckTagAndBuff();
    if (this.Gtr && !t) {
      this.ResetAutoMovingState("不满足默认奔跑条件");
    }
    return t;
  }
  CheckTagAndBuff() {
    return !!this.Lie?.HasTag(-69562997) && this.XC1();
  }
  SetAutoMovingState(t, i = false) {
    this.hCc = i;
    this.Gtr = t;
    this.lCc(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 42, "切换自动持续奔跑状态", ["Entity", this.Lie?.Entity.Id], ["Running", t]);
    }
  }
  AddTimeAccumulation(t) {
    if (this.XC1()) {
      this.Cce += t;
      this.ZSc += t;
    } else {
      this.ClearTimeAccumulation();
    }
  }
  ClearTimeAccumulation() {
    this.Cce = 0;
    this.ZSc = 0;
  }
  ResetAutoMovingState(t) {
    this.ClearTimeAccumulation();
    this.SetAutoMovingState(false);
    if (t && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 42, "打断自动持续奔跑", ["Entity", this.Lie?.Entity.Id], ["context", t]);
    }
  }
  DeepCopy(t) {
    this.Cce = t.Cce;
    this.ZSc = t.ZSc;
    this.InAirTime = t.InAirTime;
    this.SetAutoMovingState(t.GetAutoMovingState());
  }
  IsStartEnter() {
    return this.hCc;
  }
  ClearStartEnter() {
    this.hCc = false;
  }
  CheckTimeDuration() {
    return this.ZSc > this.r1t;
  }
  GetCurrentTime() {
    return this.Cce;
  }
  GetDuration() {
    return this.r1t;
  }
  XC1() {
    if (this.QC1 && this.QC1.length > 0) {
      for (const t of this.QC1) {
        if (this.$zo?.HasBuff(t)) {
          return false;
        }
      }
    }
    if (this.KC1 && this.KC1.length > 0) {
      for (const i of this.KC1) {
        if (this.Lie?.HasTag(i)) {
          return false;
        }
      }
    }
    return true;
  }
  lCc(t) {
    if (t && !this.Lie?.HasTag(-69562997)) {
      this.Lie?.AddTag(-69562997);
    }
    if (!t && this.Lie?.HasTag(-69562997)) {
      this.Lie?.RemoveTag(-69562997);
    }
  }
}
class AutomaticFlightData {
  constructor(t) {
    this.MinFlySpeed = undefined;
    this.NormalFlySpeed = undefined;
    this.MaxFlySpeed = undefined;
    this.SpeedTransitionCurve = undefined;
    this.ForwardAxisResponseValue = undefined;
    this.BackwardAxisResponseValue = undefined;
    this.ForwardSkill = undefined;
    this.BackwardSkill = undefined;
    this.CurrentSkill = undefined;
    this.FlySpeed = undefined;
    this.LastFlySpeed = undefined;
    this.TargetFlySpeed = undefined;
    this.LastState = 0;
    this.CurrentState = 0;
    this.MinFlySpeed = t.低飞行速度;
    this.NormalFlySpeed = t.标准飞行速度;
    this.MaxFlySpeed = t.高飞行速度;
    this.SpeedTransitionCurve = t.速度过渡曲线;
    this.ForwardAxisResponseValue = t.前向轴输入响应比例;
    this.BackwardAxisResponseValue = t.后向轴输入响应比例 > 0 ? -t.后向轴输入响应比例 : t.后向轴输入响应比例;
    this.ForwardSkill = t.前向轴输入响应技能;
    this.BackwardSkill = t.后向轴输入响应技能;
  }
}
class CameraDrivenAutoFlightData {
  constructor() {
    this.AutoFlightEnableTime = 0;
    this.AutoFlightStartAngleTolerance = 0;
    this.AutoFlightFinishAngleTolerance = 0;
    this.AutoFlightInputAngleMin = 0;
    this.AutoFlightInputAngleMax = 0;
    this.AutoFlightInputMin = 0;
    this.AutoFlightInputMax = 0;
  }
}
class FirstPersonConfig {
  constructor() {
    this.ForwardAngle = FIRST_FORWARD_ANGLE;
    this.FirstPersonTagList = [];
    this.ForbidRotationTagList = [];
  }
  Init(i) {
    this.ForwardAngle = i.ForwardAngle;
    for (let t = 0; t < i?.FirstPersonTagList.GameplayTags.Num(); t++) {
      this.FirstPersonTagList.push(i.FirstPersonTagList.GameplayTags.Get(t).TagId);
    }
    for (let t = 0; t < i?.ForbidRotationTagList.GameplayTags.Num(); t++) {
      this.ForbidRotationTagList.push(i.ForbidRotationTagList.GameplayTags.Get(t).TagId);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 42, "初始化第一人称Config成功", ["ForwardAngle", this.ForwardAngle], ["FirstPersonTagList", this.FirstPersonTagList], ["ForbidRotationTagList", this.ForbidRotationTagList]);
    }
  }
}
let CharacterInputComponent = CharacterInputComponent_1 = class CharacterInputComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.e7o = Quat_1.Quat.Create();
    this.k6r = Quat_1.Quat.Create();
    this.Hte = undefined;
    this.pZo = undefined;
    this.Lie = undefined;
    this.mBe = undefined;
    this.tRr = undefined;
    this.Gce = undefined;
    this.rJo = undefined;
    this.F6r = undefined;
    this.V6r = undefined;
    this.Bhh = undefined;
    this.qjd = undefined;
    this.H6r = new Array();
    this.j6r = new Array();
    this.QMe = new Map();
    this.XMe = undefined;
    this.W6r = Vector_1.Vector.Create();
    this.K6r = Vector_1.Vector.Create();
    this.Q6r = Vector_1.Vector.Create();
    this.t6c = false;
    this.awd = false;
    this.X6r = INVALID_INPUT_TIME;
    this.uu1 = new Map();
    this.t6d = false;
    this.Rne = undefined;
    this.Y6r = false;
    this.J6r = undefined;
    this.z6r = 0;
    this.Ukl = false;
    this.Akl = undefined;
    this.Dkl = false;
    this.Rkl = false;
    this.Pkl = 0;
    this.Z6r = 0;
    this.e8r = 0;
    this.t8r = 0;
    this.Bum = 1;
    this.BJe = (t, i, e) => {
      i = this.tRr?.GetSkillInfo(i);
      if (i && interruptAutoMoving.includes(i.SkillGenre)) {
        this.InterruptAutoMoving("技能类型属于0/1/2/3/4/5/7/8/9");
      }
    };
    this.PPr = (t, i) => {
      this.SetCharacterController(i);
      InputController_1.InputController.AddInputHandler(this);
    };
    this.xPr = (t, i) => {
      this.H6r.length = 0;
      this.j6r.length = 0;
      this.t6d = false;
      this.QMe.clear();
      this.SetCharacterController(undefined);
      InputController_1.InputController.RemoveInputHandler(this);
    };
    this.DVr = () => {
      this.i8r(0);
    };
    this.o8r = t => {
      this.r8r("CharOnRoleDrownInjure");
    };
    this._7_ = (t, i) => {
      if (this.Bhh) {
        if (i !== 0) {
          i = t.GetComponent(287)?.GetMorphBpInputComp();
          this.Bhh.SetBpInputComp(i);
        } else {
          this.Bhh.ResetBpInputComp();
        }
      }
    };
    this.n8r = this.s8r.bind(this);
    this.fPa = false;
    this.W$a = new Set();
    this.ZQa = false;
    this.fZt = t => {
      if (this.ZQa !== t && (this.ZQa = t)) {
        this.QMe.clear();
      }
    };
    this.a8r = [];
    this.h8r = Quat_1.Quat.Create();
    this.l8r = undefined;
    this._8r = undefined;
    this.u8r = undefined;
    this.c8r = undefined;
    this.m8r = undefined;
    this.d8r = undefined;
    this.C8r = undefined;
    this.g8r = undefined;
    this.f8r = undefined;
    this.p8r = undefined;
    this.v8r = undefined;
    this.M8r = undefined;
    this.E8r = undefined;
    this.S8r = undefined;
    this.y8r = new Map();
    this.I8r = new Map();
    this.Kmm = false;
    this.s5u = undefined;
    this.oFd = false;
    this.Exd = false;
    this.yWd = undefined;
    this.olc = undefined;
    this.Jze = () => {
      this.InterruptAutoMoving("角色死亡", true);
    };
    this.AMe = t => {
      if (t.PlotLevel === "LevelA" || t.PlotLevel === "LevelB" || t.PlotLevel === "LevelC") {
        this.InterruptAutoMoving("进入剧情", true);
      }
    };
    this.Duc = t => {
      if (!t) {
        this.nlc.ResetAutoMovingState("退出自动奔跑模式");
      }
    };
    this.YC1 = t => {
      var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(t);
      if (i && !i.AllowAutoMoving) {
        this.InterruptAutoMoving("打开了UI" + t);
      }
    };
    this.cdu = (t, i) => {
      if (t === 1 || t === 3 || t === 4 || t === 5) {
        this.InterruptAutoMoving("CameraModeChange:" + t);
      }
    };
    this.jT1 = 0;
    this.HT1 = 0;
  }
  static get Dependencies() {
    return [3];
  }
  get IsLocalInput() {
    return this.t6c;
  }
  set IsLocalInput(t) {
    this.t6c = t;
  }
  GetPriority() {
    return 0;
  }
  GetInputFilter() {
    return this.XMe;
  }
  HandlePressEvent(t, i) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.H6r.push(new InputEvent(t, 1, i));
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行按下操作", ["action", t]);
    }
  }
  HandleReleaseEvent(t, i) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.H6r.push(new InputEvent(t, 2, i));
      CharacterInputComponent_1.T8r.set(t, false);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行放开操作", ["action", t]);
    }
  }
  HandleHoldEvent(t, i) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)) {
      this.H6r.push(new InputEvent(t, 3, i));
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行长按操作", ["action", t]);
    }
  }
  HandleInputAxis(t, i) {
    let e = i;
    if (Info_1.Info.IsInKeyBoard()) {
      switch (t) {
        case InputEnums_1.EInputAxis.LookUp:
        case InputEnums_1.EInputAxis.Turn:
        case InputEnums_1.EInputAxis.Zoom:
          e /= Time_1.Time.DeltaTimeSeconds;
      }
    }
    this.QMe.set(t, e);
  }
  ClearInputAxis(t, i = false) {
    if (Info_1.Info.AxisInputOptimize) {
      if (!t) {
        if (i) {
          this.QMe.delete(InputEnums_1.EInputAxis.MoveForward);
          this.QMe.delete(InputEnums_1.EInputAxis.MoveRight);
        } else {
          this.QMe.clear();
        }
      }
      this.fPa = t;
    }
  }
  ClearSingleAxisInput(t, i) {
    if (Info_1.Info.AxisInputOptimize) {
      if (i) {
        this.W$a.add(t);
      } else if (this.QMe.has(t)) {
        this.QMe.set(t, 0);
      }
    }
  }
  PreProcessInput(t, i) {
    if (Info_1.Info.AxisInputOptimize) {
      if (this.fPa) {
        this.fPa = false;
        this.QMe.clear();
      }
      if (this.W$a.size > 0) {
        for (const e of this.W$a) {
          if (this.QMe.has(e)) {
            this.QMe.delete(e);
          }
        }
        this.W$a.clear();
      }
    } else {
      this.QMe.clear();
    }
  }
  PostProcessInput(s, t) {
    this.L8r();
    var i = this.t6d ? [...this.j6r, ...this.H6r] : this.H6r;
    const h = this.t6d ? this.j6r.length : 0;
    this.t6d = false;
    CharacterInputComponent_1.x0l.Start();
    const n = new Array();
    i.forEach((t, i) => {
      var e = this.R8r(s, t);
      if (e && e.CommandType !== 0) {
        i = i < h ? -1 : i;
        n.push(new InputCommand(t.Action, t.State, t.Time, e, i));
      }
    });
    CharacterInputComponent_1.x0l.Stop();
    if (this.a8r.length > 0) {
      let t = i.length;
      for (const r of this.a8r) {
        var e = this.R8r(s, r);
        if (e) {
          n.push(new InputCommand(r.Action, r.State, r.Time, e, t));
        }
        t++;
      }
      this.a8r.length = 0;
    }
    i = this.U8r(n);
    if (i?.Index === -1) {
      this.r8r("PostProcessInput");
    }
    this.D8r();
    this.A8r(i);
    this.H6r.length = 0;
    if (i?.State === 3) {
      CharacterInputComponent_1.T8r.set(i.Action, true);
    }
    if (i !== undefined) {
      if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 6, "ReceiveInput", ["BestInputCommand", JSON.stringify(i)]);
      }
      this.P8r(i, "PostProcessInput");
    }
  }
  TestActionInput(t, i, e) {
    t = new InputEvent(t, i, e);
    this.a8r.push(t);
  }
  R8r(t, i) {
    let e = undefined;
    switch (i.State) {
      case 1:
        this.x8r(i.Action, i.Time);
        e = this.w8r(i.Action, i.Time);
        break;
      case 2:
        this.B8r(i.Action, i.Time);
        e = this.b8r(i.Action, i.Time);
        break;
      case 3:
        if (!this.q8r(i.Action, i.Time, t)) {
          i.Action = InputEnums_1.EInputAction.None;
          return;
        }
        e = this.G8r(i.Action, i.Time);
    }
    return e;
  }
  A8r(t) {
    const e = this.N8r();
    const s = t ? t.Index : -1;
    this.H6r.forEach((t, i) => {
      if (i !== s && t.Action !== InputEnums_1.EInputAction.None && this.O8r(t.Action, t.State) !== ZERO_TIME) {
        this.j6r.push(new InputCache(t.Action, t.State, t.Time, e, 0));
      }
    });
  }
  SetMoveVectorCache(t, i) {
    this.K6r.DeepCopy(t);
    this.K6r.Normalize();
    this.Q6r.DeepCopy(i);
    this.Q6r.Normalize();
  }
  ResetMoveVectorCache() {
    this.K6r.Reset();
    this.Q6r.Reset();
  }
  SetCharacterController(t) {
    this.V6r = t;
  }
  get CharacterController() {
    return this.V6r;
  }
  get Character() {
    return this.F6r;
  }
  SetCharacter(t) {
    this.F6r = t;
  }
  GetMoveVectorCache() {
    return this.W6r;
  }
  GetMoveDirectionCache() {
    return this.K6r;
  }
  GetWorldMoveDirectionCache() {
    var t;
    var i;
    if (this.Hte.IsAutonomousProxy) {
      ControllerHolder_1.ControllerHolder.CameraController.GetCameraRotation(this.cie);
      GravityUtils_1.GravityUtils.GetQuatFromRotatorAndGravityForActor(this.Hte, this.cie, this.h8r);
      if (this.rJo?.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection && (i = (t = ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent)?.TargetEntity)) {
        this.GetNewQuatInLockMode(i, t.TargetSocketName, this.h8r);
      }
      this.h8r.RotateVector(this.K6r, this.Q6r);
    }
    return this.Q6r;
  }
  GetMoveVector(t) {
    if (this.Y6r) {
      t.Reset();
    } else {
      t.X = this.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0;
      t.Y = this.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight) ?? 0;
      t.Z = 0;
    }
  }
  GetMoveDirection(t) {
    this.GetMoveVector(t);
    t.Normalize();
  }
  GetCameraInput() {
    let t = this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0;
    let i = this.QueryInputAxis(InputEnums_1.EInputAxis.LookUp) ?? 0;
    var e;
    if (t === 0 && i === 0 && Info_1.Info.IsInGamepad() && (e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData)?.ControlCameraByMoveAxis) {
      t = e.GetInputAxis(InputEnums_1.EInputAxis.MoveRight);
      i = -e.GetInputAxis(InputEnums_1.EInputAxis.MoveForward);
    }
    return [t, i];
  }
  HasCameraInput(t = MathUtils_1.MathUtils.KindaSmallNumber) {
    return !MathUtils_1.MathUtils.IsNearlyZero(this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0, t) || !MathUtils_1.MathUtils.IsNearlyZero(this.QueryInputAxis(InputEnums_1.EInputAxis.LookUp) ?? 0, t);
  }
  GetZoomInput() {
    return this.QueryInputAxis(InputEnums_1.EInputAxis.Zoom) ?? 0;
  }
  QueryInputAxis(t) {
    return this.QMe.get(t);
  }
  ClearMoveVectorCache() {
    this.W6r.Reset();
    this.K6r.Reset();
    this.Q6r.Reset();
    this.X6r = INVALID_INPUT_TIME;
  }
  AnimBreakPoint() {
    if (this.k8r()) {
      this.r8r("AnimBreakPoint");
    }
  }
  ClearInputCache(i, e) {
    if (i === 0) {
      this.r8r("ClearInputCache");
    } else {
      for (let t = this.j6r.length - 1; t >= 0; t--) {
        var s = this.j6r[t];
        if (s.Action === i && (s.State === 0 || s.State === e)) {
          this.j6r.splice(t, 1);
        }
      }
    }
  }
  OnInitData() {
    this.XMe = new InputFilter_1.InputFilter(InputFilterManager_1.InputFilterManager.CharacterActions, undefined, InputFilterManager_1.InputFilterManager.CharacterAxes, undefined);
    this.W6r.Reset();
    this.K6r.Reset();
    this.Q6r.Reset();
    this.Z6r = CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionDistanceMin");
    this.e8r = CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionDistanceMax");
    this.t8r = CommonParamById_1.configCommonParamById.GetIntConfig("MovementDirectionAngleThreshold");
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Hte.Actor;
    this.SetCharacter(t);
    if (this.V6r) {
      InputController_1.InputController.AddInputHandler(this);
    }
    this.pZo = this.Entity.GetComponent(18);
    this.Lie = this.Entity.GetComponent(209);
    this.mBe = this.Entity.GetComponent(179);
    this.tRr = this.Entity.GetComponent(40);
    this.Gce = this.Entity.GetComponent(182);
    this.rJo = this.Entity.GetComponent(179);
    this.bhh();
    this.Gjd();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharAnimBreakPoint, this.n8r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharPossessed, this.PPr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUnpossessed, this.xPr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraModeChanged, this.cdu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.YC1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AutoMovingSettingChanged, this.Duc);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    this.a5u();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrownInjure, this.o8r);
    if (Info_1.Info.AxisInputOptimize) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    this.F8r();
    ModelManager_1.ModelManager.InputModel?.InitInputCommandTransformMap();
    this.kum();
    return true;
  }
  OnEnd() {
    this.qhh();
    this.Fjd();
    InputController_1.InputController.RemoveInputHandler(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharAnimBreakPoint, this.n8r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharPossessed, this.PPr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUnpossessed, this.xPr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraModeChanged, this.cdu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.YC1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AutoMovingSettingChanged, this.Duc);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    this.h5u();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrownInjure, this.o8r);
    if (Info_1.Info.AxisInputOptimize) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    this.X6r = INVALID_INPUT_TIME;
    this.H6r.length = 0;
    this.j6r.length = 0;
    this.t6d = false;
    this.QMe.clear();
    this.V8r();
    return true;
  }
  OnTick(t) {
    this.Mqu(t);
    this.t6c = false;
    if (this.Y6r) {
      this.H8r(t);
    } else {
      this.i8r(t);
      if (this.Ukl) {
        this.xkl(t);
      }
    }
  }
  Mqu(t) {
    if (this.j6r.length !== 0) {
      var i = t * TimeUtil_1.TimeUtil.Millisecond * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1);
      for (const e of this.j6r) {
        e.AccumulateTime += i;
      }
    }
  }
  F8r() {
    this.l8r = this.j8r(-469423249, InputEnums_1.EInputAction.跳跃);
    this._8r = this.j8r(766688429, InputEnums_1.EInputAction.攀爬);
    this.u8r = this.j8r(-542518289, InputEnums_1.EInputAction.攻击);
    this.c8r = this.j8r(581080458, InputEnums_1.EInputAction.闪避);
    this.m8r = this.j8r(-541178966, InputEnums_1.EInputAction.技能1);
    this.d8r = this.j8r(-1802431900, InputEnums_1.EInputAction.幻象1);
    this.C8r = this.j8r(-732810197, InputEnums_1.EInputAction.大招);
    this.g8r = this.j8r(-1752099043, InputEnums_1.EInputAction.幻象2);
    this.f8r = this.j8r(-1216591977, InputEnums_1.EInputAction.切换角色1);
    this.p8r = this.j8r(-1199814358, InputEnums_1.EInputAction.切换角色2);
    this.v8r = this.j8r(-1183036739, InputEnums_1.EInputAction.切换角色3);
    this.M8r = this.j8r(-2140742267, InputEnums_1.EInputAction.锁定目标);
    this.E8r = this.j8r(-1013832153, InputEnums_1.EInputAction.瞄准);
    this.S8r = this.W8r(1616400338, [InputEnums_1.EInputAxis.MoveForward, InputEnums_1.EInputAxis.MoveRight]);
  }
  j8r(t, e) {
    return this.Lie.ListenForTagAddOrRemove(t, (t, i) => {
      if (i) {
        this.XMe.BlockActions.add(e);
      } else {
        this.XMe.BlockActions.delete(e);
      }
    });
  }
  W8r(t, s) {
    return this.Lie.ListenForTagAddOrRemove(t, (t, i) => {
      for (const e of s) {
        if (i) {
          this.XMe.BlockAxes.add(e);
        } else {
          this.XMe.BlockAxes.delete(e);
        }
      }
    });
  }
  V8r() {
    this.l8r.EndTask();
    this._8r.EndTask();
    this.u8r.EndTask();
    this.c8r.EndTask();
    this.m8r.EndTask();
    this.d8r.EndTask();
    this.C8r.EndTask();
    this.g8r.EndTask();
    this.f8r.EndTask();
    this.p8r.EndTask();
    this.v8r.EndTask();
    this.M8r.EndTask();
    this.E8r.EndTask();
    this.S8r.EndTask();
  }
  K8r() {
    return this.Gce?.CharacterMovement?.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE && (this.Entity.GetComponent(33)?.LockRotator ?? false);
  }
  i8r(t) {
    let i = Vector_1.Vector.ZeroVectorProxy;
    var e;
    if (this.Lie?.Valid && this.mBe.Valid) {
      if (this.Lie.HasTag(1996624497)) {
        if ((i = this.GetWorldMoveDirectionCache()).IsNearlyZero() && (this.Lie.HasTag(1336868783) || this.nlc.GetAutoMovingState()) && (i = this.Hte.InputDirectProxy).IsNearlyZero()) {
          i = this.Hte.ActorForwardProxy;
        }
        this.Hte.SetInputDirect(i, true);
        if (this.K8r()) {
          this.Hte.SetInputFacing(this.Hte.ActorForwardProxy);
        } else {
          this.Q8r();
        }
      } else {
        if (this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
          this.t6c = true;
          i = this.GetMoveDirectionCache();
          this._Cc(i, t);
          if (this.nlc.GetAutoMovingState()) {
            i = Vector_1.Vector.ForwardVectorProxy;
          }
        } else if (this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
          this.t6c = true;
          this.cz.DeepCopy(this.GetMoveVectorCache());
          if (GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlyControlMode) === 0) {
            this.cz.X = -this.cz.X;
          }
          if ((e = i.SizeSquared()) > 1) {
            this.cz.DivisionEqual(Math.sqrt(e));
          }
          i = this.cz;
          this.InterruptAutoMoving("翱翔状态");
        } else {
          i = this.GetWorldMoveDirectionCache();
          this._Cc(i, t);
          e = this.nlc.GetAutoMovingState();
          if (i.IsNearlyZero() && (this.Lie.HasTag(1336868783) || e) && ((i = this.Hte.InputDirectProxy).IsNearlyZero() && (i = this.Hte.ActorForwardProxy), e)) {
            this.zC1(this.fz);
            if (!this.fz.IsNearlyZero()) {
              this.fz.Normalize();
              i.DeepCopy(this.fz);
            }
          }
          if (i.IsNearlyZero() || FormationDataController_1.FormationDataController.GlobalIsInFight || !e && !ModelManager_1.ModelManager.BattleUiModel?.FormationData?.AutoSprintSettingEnable) {
            this.jT1 = 0;
          } else {
            this.JC1(e, t);
          }
        }
        this.Hte.SetInputDirect(i, !this.t6c);
        if (this.Hte.UseControllerRotation) {
          this.Hte.SetInputFacing(this.Hte.Actor.Controller.GetActorForwardVector(), true);
        } else {
          switch (this.mBe.PositionState) {
            case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
              this.X8r();
              break;
            case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
              if (this.mBe.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.WalkOnAir) {
                this.X8r();
              } else {
                this.Q8r();
              }
              break;
            case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
              this.Q8r();
          }
        }
      }
    } else {
      i = this.GetWorldMoveDirectionCache();
      this.Hte.SetInputDirect(i, true);
      this.Q8r();
    }
  }
  H8r(t) {
    var i;
    if (this.Lie?.Valid && this.pZo?.Valid) {
      if (!this.Lie.HasTag(1616400338)) {
        if (this.mBe.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Input", 29, "错误的位置状态");
          }
        } else if (this.J6r === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Input", 29, "自动飞行模式配置无效");
          }
        } else {
          if (this.J6r) {
            if ((i = this.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward)) > this.J6r.ForwardAxisResponseValue) {
              this.J6r.CurrentState = 2;
              this.J6r.LastFlySpeed = this.J6r.TargetFlySpeed;
              this.J6r.TargetFlySpeed = this.J6r.MaxFlySpeed;
              this.Gce.SetMaxSpeed(this.J6r.MaxFlySpeed);
              if (this.J6r.ForwardSkill > 0 && this.tRr.BeginSkill(this.J6r.ForwardSkill, {
                Target: this.Entity,
                Reason: "EAutomaticFlightState.Max"
              })) {
                this.J6r.CurrentSkill = this.J6r.ForwardSkill;
              }
            } else if (i < this.J6r.BackwardAxisResponseValue) {
              this.J6r.CurrentState = 1;
              this.J6r.LastFlySpeed = this.J6r.TargetFlySpeed;
              this.J6r.TargetFlySpeed = this.J6r.MinFlySpeed;
              this.Gce.SetMaxSpeed(this.J6r.MinFlySpeed);
              if (this.J6r.BackwardSkill > 0 && this.tRr.BeginSkill(this.J6r.BackwardSkill, {
                Target: this.Entity,
                Reason: "EAutomaticFlightState.Min"
              })) {
                this.J6r.CurrentSkill = this.J6r.BackwardSkill;
              }
            } else {
              this.J6r.CurrentState = 0;
              this.J6r.LastFlySpeed = this.J6r.TargetFlySpeed;
              this.J6r.TargetFlySpeed = this.J6r.NormalFlySpeed;
              this.Gce.SetMaxSpeed(this.J6r.NormalFlySpeed);
              if (this.J6r.CurrentSkill !== undefined) {
                this.tRr.EndSkill(this.J6r.CurrentSkill, "EAutomaticFlightState.Normal");
                this.J6r.CurrentSkill = undefined;
              }
            }
          }
          if (this.J6r.LastState !== this.J6r.CurrentState) {
            this.z6r = 0;
          }
          this.J6r.LastState = this.J6r.CurrentState;
          this.z6r += t * MathUtils_1.MathUtils.MillisecondToSecond;
          i = this.J6r.SpeedTransitionCurve.GetVectorValue(this.z6r).X;
          this.J6r.FlySpeed = MathUtils_1.MathUtils.Lerp(this.J6r.LastFlySpeed, this.J6r.TargetFlySpeed, i);
          this.Hte.ActorForwardProxy.Multiply(this.J6r.FlySpeed, this.cz);
          this.Gce.SetForceSpeed(this.cz);
        }
      }
    }
  }
  xkl(t) {
    var i;
    var e;
    this.Dkl = false;
    if (this.Akl) {
      if (this.Hte.InputDirectProxy.IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber)) {
        i = this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0;
        if (!MathUtils_1.MathUtils.IsNearlyZero(i, this.Akl.AutoFlightStartAngleTolerance) && !this.Rkl) {
          this.Rkl = true;
        }
        if (this.Rkl) {
          i = CameraUtility_1.CameraUtility.GetYawInGravity(this.Hte.ActorRotationProxy);
          e = CameraUtility_1.CameraUtility.GetYawInGravity(CameraController_1.CameraController.FightCamera.LogicComponent.DesiredCamera.ArmRotation);
          i = MathUtils_1.MathUtils.WrapAngle(i - e);
          if (MathUtils_1.MathUtils.IsNearlyZero(i, this.Akl.AutoFlightFinishAngleTolerance)) {
            this.Pkl = 0;
            this.Rkl = false;
          } else {
            this.Pkl += t;
            if (!(this.Pkl < this.Akl.AutoFlightEnableTime)) {
              this.Dkl = true;
              e = MathUtils_1.MathUtils.RangeClamp(Math.abs(i), this.Akl.AutoFlightInputAngleMin, this.Akl.AutoFlightInputAngleMax, this.Akl.AutoFlightInputMin, this.Akl.AutoFlightInputMax);
              this.Hte.SetInputDirectByNumber(this.Hte.InputDirectProxy.X, e * (i > 0 ? -1 : 1), 0);
            }
          }
        }
      } else {
        this.Pkl = 0;
        this.Rkl = false;
      }
    }
  }
  X8r() {
    var t;
    if (this.mBe.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection && (t = CameraController_1.CameraController.FightCamera.GetComponent(5), this.mBe.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) && t?.TargetEntity && t?.IsTargetLocationValid && !this.Lie.HasTag(131819029)) {
      t.TargetLocation.Subtraction(this.Hte.ActorLocationProxy, this.cz);
      this.Hte.SetInputFacing(this.cz, true);
    } else {
      this.Q8r(false);
    }
  }
  Q8r(t = true) {
    if (this.Kmm) {
      this.l5u();
    } else if (this.t6c) {
      this.Hte.SetInputFacing(this.Hte.ActorForwardProxy, t);
    } else if (GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.Hte, this.Hte.InputDirectProxy) > MathUtils_1.MathUtils.SmallNumber) {
      this.Hte.SetInputFacing(this.Hte.InputDirectProxy, t);
    } else if (t) {
      this.Hte.SetInputFacing(this.Hte.ActorForwardProxy, t);
    }
  }
  q8r(t, i, e) {
    var [s, h] = this.GetHoldConfig(t);
    return h !== NULL_CONFIG_TIME && !(i < h) && (!!s || (!CharacterInputComponent_1.T8r.has(t) || !CharacterInputComponent_1.T8r.get(t)) && !!(h < i - e * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1)));
  }
  L8r() {
    this.GetMoveVector(this.W6r);
    if (this.Y8r(this.W6r)) {
      if (Time_1.Time.SystemNow - this.X6r > MOVE_VECTOR_CACHE_TIME) {
        this.K6r.DeepCopy(this.W6r);
        this.K6r.Normalize();
        this.X6r = INVALID_INPUT_TIME;
      }
    } else {
      this.K6r.DeepCopy(this.W6r);
      this.K6r.Normalize();
      this.X6r = Time_1.Time.SystemNow;
    }
  }
  GetNewQuatInLockMode(t, i, e) {
    CameraUtility_1.CameraUtility.GetSocketLocation(undefined, i, this.cz, t);
    this.cz.SubtractionEqual(this.Hte.ActorLocationProxy);
    var i = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.Hte, this.cz);
    if (!(i < this.Z6r * this.Z6r) && !(e.Inverse(this.e7o), this.e7o.RotateVector(this.cz, this.cz), t = this.cz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg, Math.abs(t) > this.t8r)) {
      i = MathUtils_1.MathUtils.RangeClamp(Math.sqrt(i), this.Z6r, this.e8r, 0, t);
      this.cie.Set(0, i, 0);
      this.cie.Quaternion(this.e7o);
      e.Multiply(this.e7o, this.k6r);
      e.DeepCopy(this.k6r);
    }
  }
  Y8r(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      return t.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber);
    } else {
      return t.SizeSquared() <= MathUtils_1.MathUtils.Square(RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate());
    }
  }
  D8r() {
    for (let t = this.j6r.length - 1; t >= 0; t--) {
      var i = this.j6r[t];
      var e = this.O8r(i.Action, i.State);
      if (i.AccumulateTime > e) {
        this.j6r.splice(t, 1);
      }
    }
  }
  r8r(t) {
    this.j6r.length = 0;
  }
  k8r() {
    if (this.j6r.length === 0) {
      return false;
    }
    if (this.Bum === 0) {
      return !(this.t6d = true);
    }
    const s = new Array();
    this.j6r.forEach((t, i) => {
      let e = undefined;
      switch (t.State) {
        case 1:
          e = this.w8r(t.Action, t.Time);
          break;
        case 2:
          e = this.b8r(t.Action, t.Time);
          break;
        case 3:
          e = this.G8r(t.Action, t.Time);
      }
      if (e && e.CommandType !== 0) {
        s.push(new InputCommand(t.Action, t.State, t.Time, e, i));
      }
    });
    var t = this.U8r(s);
    return t !== undefined && (t?.State === 3 && CharacterInputComponent_1.T8r.set(t.Action, true), this.P8r(t, "QueryInputCaches"), true);
  }
  s8r(t) {
    if (this.F6r && this.F6r.GetEntityIdNoBlueprint() === t && this.k8r()) {
      this.r8r("HandleAnimBreakPoint");
    }
  }
  U8r(t) {
    if (t.length !== 0) {
      let e = INVALID_PRIORITY;
      let s = INVALID_PRIORITY_INDEX;
      t.forEach((t, i) => {
        t = this.z8r(t.Command);
        if (t > e) {
          e = t;
          s = i;
        }
      });
      return t[s];
    }
  }
  z8r(t) {
    let i = undefined;
    switch (t.CommandType) {
      case 0:
        break;
      case 1:
        i = this.Z8r(t.IntValue);
        break;
      default:
        i = InputController_1.InputController.QueryCommandPriority(t.CommandType);
    }
    return i = i === undefined ? INVALID_PRIORITY : i;
  }
  Z8r(t) {
    return (this.F6r?.CharacterActorComponent?.Entity?.GetComponent(40)).GetPriority(t);
  }
  P8r(t, i) {
    CharacterInputComponent_1.P0l.Start();
    var e = t.Command;
    var s = e.CommandType;
    switch (s) {
      case 1:
        if (Info_1.Info.IsInGamepad() && t.Action === InputEnums_1.EInputAction.攻击 && t.State === 2) {
          if (this.GetCommandInterval(3) < EXIT_CLIMB_BLOCK_ATTACK_RELEASE_TIME) {
            this.RemoveCommandInterval(3);
            break;
          }
        }
        this.e9r(e.IntValue, i);
        break;
      case 2:
        this.t9r(e);
        break;
      case 3:
        this.i9r(e);
        this.uu1.set(s, Time_1.Time.WorldTimeSeconds);
        break;
      case 4:
        this.o9r(e);
        break;
      case 5:
        this.r9r(e);
        break;
      case 6:
        this.n9r(e);
        break;
      case 7:
        this.s9r(e.IntValue);
        break;
      case 8:
        this.a9r(e);
        break;
      case 9:
        this.pZo.SendGameplayEventToActor(e.TagValue);
        break;
      case 10:
        this.rja(e);
    }
    CharacterInputComponent_1.P0l.Stop();
  }
  t9r(t) {
    var i = this.Entity.GetComponent(182);
    if (i.Valid) {
      if (t.IntValue === 1) {
        i.JumpPress();
      } else {
        i.JumpRelease();
      }
    }
  }
  i9r(t) {
    this.Entity.GetComponent(34)?.ClimbPress(t.IntValue === 1);
  }
  o9r(t) {
    if (t.IntValue === 1) {
      this.Entity.CheckGetComponent(179).SprintPress();
    } else {
      this.Entity.CheckGetComponent(179).SprintRelease();
    }
  }
  r9r(t) {
    this.Entity.CheckGetComponent(179).SwitchFastSwim(t.IntValue === 1);
  }
  n9r(t) {
    this.Entity.CheckGetComponent(179).SwitchFastClimb(t.IntValue === 1);
  }
  a9r(t) {
    this.Entity.CheckGetComponent(179).WalkPress();
  }
  rja(t) {
    this.Entity.CheckGetComponent(59)?.SetSoarBoostOn(t.IntValue > 0);
  }
  s9r(t) {}
  e9r(t, i) {
    this.Entity.GetComponent(40).BeginSkillAsync(t, {
      Reason: "CharacterInputComponent.ExecuteSkill." + i
    });
  }
  N8r() {
    return UE.GameplayStatics.GetTimeSeconds(GlobalData_1.GlobalData.World);
  }
  SetActive(t) {
    if (t) {
      if (this.Rne) {
        super.Enable(this.Rne, "[CharacterInputComponent.SetActive] this.DisableHandle=true");
        this.Rne = undefined;
      }
    } else {
      this.Rne ||= super.Disable("[CharacterInputComponent.SetActive] this.DisableHandle=false");
    }
  }
  x8r(t, i) {
    if (this.Hte) {
      var e = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (e) {
        CharacterInputComponent_1.w0l.Start();
        for (const s of e) {
          s.DispatchPressEvent(t, i);
        }
        CharacterInputComponent_1.w0l.Stop();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 67, "[CharacterInputComponent.DispatchPressEvent]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  B8r(t, i) {
    if (this.Hte) {
      var e = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (e) {
        CharacterInputComponent_1.B0l.Start();
        for (const s of e) {
          s.DispatchReleaseEvent(t, i);
        }
        CharacterInputComponent_1.B0l.Stop();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 67, "[CharacterInputComponent.DispatchReleaseEvent]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  w8r(t, i) {
    if (this.Hte) {
      var e = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (e) {
        CharacterInputComponent_1.b0l.Start();
        for (const h of e) {
          var s = h.HandlePress(t, i);
          if (s && s.CommandType !== 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[CharacterInputComponent.HandlePress]输入层级处理指令", ["layerType", h.GetLayerType()]);
            }
            CharacterInputComponent_1.b0l.Stop();
            return s;
          }
        }
        CharacterInputComponent_1.b0l.Stop();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 67, "[CharacterInputComponent.HandlePress]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  b8r(t, i) {
    if (this.Hte) {
      var e = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (e) {
        CharacterInputComponent_1.q0l.Start();
        for (const h of e) {
          var s = h.HandleRelease(t, i);
          if (s && s.CommandType !== 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[CharacterInputComponent.HandleRelease]输入层级处理指令", ["layerType", h.GetLayerType()]);
            }
            CharacterInputComponent_1.q0l.Stop();
            return s;
          }
        }
        CharacterInputComponent_1.q0l.Stop();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 67, "[CharacterInputComponent.HandleRelease]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  G8r(t, i) {
    if (this.Hte) {
      var e = InputController_1.InputController.GetInputLayers(this.Entity.Id);
      if (e) {
        for (const h of e) {
          var s = h.HandleHold(t, i);
          if (s && s.CommandType !== 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[CharacterInputComponent.HandleHold]输入层级处理指令", ["layerType", h.GetLayerType()]);
            }
            return s;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 67, "[CharacterInputComponent.HandleHold]输入层级为空", ["entityId", this.Entity.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Input", 6, "Entity Is End");
    }
  }
  O8r(i, e) {
    var s = this.GetBpInputComp();
    if (s) {
      let t = undefined;
      if (!this.y8r.has(i)) {
        t = s.GetUnrealCacheConfig(i);
        this.y8r.set(i, t);
      }
      if (t = t || this.y8r.get(i)) {
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
  GetHoldConfig(t) {
    var i = this.GetBpInputComp();
    if (!i) {
      return [false, NULL_CONFIG_TIME];
    }
    let e = undefined;
    if (!this.I8r.has(t)) {
      e = i.GetUnrealHoldConfig(t);
      this.I8r.set(t, e);
    }
    if (e = e || this.I8r.get(t)) {
      return [e.连续触发, e.触发时间];
    } else {
      return [false, NULL_CONFIG_TIME];
    }
  }
  TurnOnAutomaticFlightMode(t) {
    if (this.Hte?.Actor.GetName().includes("Youyidie")) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 6, "TurnOnAutomaticFlightMode", ["Actor", this.Hte?.Actor.GetName()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 6, "Error TurnOnAutomaticFlightMode", ["Actor", this.Hte?.Actor.GetName()]);
    }
    this.Y6r = true;
    this.J6r = new AutomaticFlightData(t);
    if (this.Gce?.Valid) {
      this.J6r.LastFlySpeed = this.J6r.NormalFlySpeed;
      this.J6r.TargetFlySpeed = this.J6r.NormalFlySpeed;
      this.Gce.SetMaxSpeed(this.J6r.NormalFlySpeed);
    }
  }
  TurnOffAutomaticFlightMode() {
    this.Y6r = false;
    this.J6r = undefined;
    if (this.Gce?.Valid) {
      this.mBe.ResetCharState();
    }
  }
  IsInAutomaticFlightMode() {
    return this.Y6r;
  }
  TurnOnCameraDrivenAutoFlightMode(t) {
    if (t) {
      this.Ukl = true;
      this.Rkl = false;
      this.Akl ||= new CameraDrivenAutoFlightData();
      this.Akl.AutoFlightEnableTime = t.自动驾驶开始时间;
      this.Akl.AutoFlightStartAngleTolerance = t.自动驾驶启动输入;
      this.Akl.AutoFlightFinishAngleTolerance = t.自动驾驶完成角度;
      this.Akl.AutoFlightInputAngleMin = t.自动驾驶归正角度Min;
      this.Akl.AutoFlightInputAngleMax = t.自动驾驶归正角度Max;
      this.Akl.AutoFlightInputMin = t.自动驾驶归正角度模拟输入Min;
      this.Akl.AutoFlightInputMax = t.自动驾驶归正角度模拟输入Max;
    }
  }
  TurnOffCameraDrivenAutoFlightMode() {
    this.Ukl = false;
    this.Rkl = false;
  }
  IsInCameraDrivenAutoFlightMode() {
    return this.Ukl && this.Dkl;
  }
  bhh() {
    var t;
    if (this.Bhh) {
      this.qhh();
    }
    this.Bhh = InputController_1.InputController.CreateInputLayer(1);
    if (this.Bhh && (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity))) {
      this.Bhh.Init(t);
      InputController_1.InputController.AddInputLayer(this.Entity.Id, this.Bhh);
    }
  }
  qhh() {
    if (this.Bhh) {
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
  }
  Gjd() {
    var t;
    var i = InputController_1.InputController.CreateInputLayer(2);
    if (i && (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity)) && (i.Init(t, true), i.IsValid())) {
      if (this.qjd) {
        this.Fjd();
      }
      this.qjd = i;
      InputController_1.InputController.AddInputLayer(this.Entity.Id, this.qjd);
    }
  }
  Fjd() {
    if (this.qjd) {
      InputController_1.InputController.RemoveInputLayer(this.qjd);
      this.qjd.Clear();
      this.qjd = undefined;
    }
  }
  GetBpInputComp() {
    return this.Bhh?.GetBpInputComp();
  }
  SetBpInputComp(t) {
    this.Bhh?.SetBpInputComp(t);
  }
  GetCommandInterval(t) {
    t = this.uu1.get(t) ?? 0;
    return Time_1.Time.WorldTimeSeconds - t;
  }
  RemoveCommandInterval(t) {
    this.uu1.delete(t);
  }
  IsOnlyAllowFightInput() {
    return this.awd;
  }
  SetOnlyAllowFightInput(t) {
    this.awd = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOnlyAllowFightInputStateChanged);
  }
  kum() {
    var i = this.Entity.GetComponent(0);
    if (i) {
      let t = i.GetPbDataId();
      if (i.IsRole() && t && t > RoleDefine_1.ROBOT_DATA_MIN_ID && ConfigManager_1.ConfigManager.RoleConfig) {
        if (i = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t)) {
          t = i.ParentId;
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "无法找到试用角色数据", ["pbDataId", t]);
        }
      }
      if (useDelayCacheModeRoleIds.includes(t)) {
        this.Bum = 0;
      }
    }
  }
  SetInputCacheMode(t) {
    this.Bum = t;
  }
  a5u() {
    this.s5u = this.Lie?.ListenForTagAddOrRemove(-869438579, (t, i) => {
      if (i) {
        this.Kmm = true;
        this.SWd(t => {
          for (const i of t.FirstPersonTagList) {
            this.Lie?.AddTag(i);
          }
        });
        this.mBe?.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.CameraDirection);
        this.Entity?.GetComponent(45)?.SetLockedRotation(true);
      } else {
        this.Kmm = false;
        this.cXd();
      }
    });
  }
  cXd() {
    this.rJo?.MarkWalkOrRun(false, false, false);
    this.mBe?.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
    this.Entity?.GetComponent(45)?.SetLockedRotation(false);
    if (this.yWd) {
      for (const t of this.yWd.FirstPersonTagList) {
        this.Lie?.RemoveTag(t);
      }
    }
  }
  h5u() {
    this.cXd();
    this.oFd = false;
    this.Exd = false;
    this.yWd = undefined;
    this.s5u?.EndTask();
  }
  SWd(i) {
    if (!this.oFd) {
      this.oFd = true;
      this.rJo?.MarkWalkOrRun(false, false, true);
    }
    if (this.yWd) {
      i(this.yWd);
    } else {
      const t = FLYING_FEATHER_CONFIG_PATH;
      this.yWd = new FirstPersonConfig();
      ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_FirstPersonConfig_C", () => {
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_FirstPersonConfig_C, t => {
          this.yWd ||= new FirstPersonConfig();
          if (t?.IsValid()) {
            this.yWd.Init(t);
          }
          i(this.yWd);
        });
      });
    }
  }
  Msm(t) {
    if (t) {
      if (!this.Exd) {
        this.rJo?.SprintPress();
        this.Exd = true;
      }
    } else if (this.Exd) {
      this.rJo?.SprintRelease();
      this.Exd = false;
    }
  }
  l5u() {
    var t;
    if (this.rJo?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.rJo?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Air && this.rJo?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
      this.Msm(false);
    } else {
      if (this.rJo?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) {
        this.Msm(false);
      }
      if (this.mBe.DirectionState !== CharacterUnifiedStateTypes_1.ECharDirectionState.CameraDirection) {
        this.mBe?.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.CameraDirection);
        this.Entity?.GetComponent(45)?.SetLockedRotation(true);
      }
      if (this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && !this.fz.IsNearlyZero() && !this.tRr?.CurrentSkill && (t = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Hte.ActorForwardProxy, this.Hte.InputDirectProxy), Math.abs(t) < (this.yWd?.ForwardAngle ?? FIRST_FORWARD_ANGLE))) {
        this.Msm(true);
      } else {
        this.Msm(false);
      }
      if ((!this.yWd || !this.Lie?.HasAnyTag(this.yWd.ForbidRotationTagList)) && !(this.zC1(this.fz), this.fz.IsNearlyZero())) {
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.fz, this.Hte.ActorUpProxy, this.cie);
        this.Hte.SetActorRotation(this.cie.ToUeRotator(), "FirstPerson.CameraDirection", false);
        this.Hte.SetInputFacing(this.Hte.ActorForwardProxy);
      }
    }
  }
  set nlc(t) {
    this.olc = t;
  }
  get nlc() {
    var t;
    var i;
    if (!this.olc) {
      t = this.Entity.GetComponent(209);
      i = this.Entity.GetComponent(213);
      this.olc = new InputContinuously(t, i);
      this.olc.InitConfig();
    }
    return this.olc;
  }
  _Cc(t, i) {
    if (ModelManager_1.ModelManager.BattleUiModel.FormationData.AutoMovingSettingEnable) {
      var e = this.nlc.GetAutoMovingState();
      var s = this.nlc.IsStartEnter();
      var t = t.IsNearlyZero();
      if (!e || s || t) {
        if (e) {
          if (this.y2c(i)) {
            return;
          }
          if (this.rJo?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
            this.InterruptAutoMoving("处于其他移动状态");
            return;
          }
        }
        if (t) {
          if (e) {
            if (s) {
              this.nlc.ClearStartEnter();
            }
          } else {
            this.nlc.ClearTimeAccumulation();
          }
        }
        if (!e) {
          if (t || this.rJo?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) {
            this.nlc.ClearTimeAccumulation();
          } else {
            this.nlc.AddTimeAccumulation(i);
          }
          if (this.nlc.CheckTimeDuration()) {
            this.nlc.SetAutoMovingState(true, true);
          }
        }
      } else {
        this.InterruptAutoMoving("玩家输入");
      }
    }
  }
  y2c(t) {
    var i = FormationAttributeController_1.FormationAttributeController.GetValue(1) < LOW_STRENGTH_EXIT_VALUE;
    if (i && FormationDataController_1.FormationDataController.GlobalIsInFight) {
      this.InterruptAutoMoving("进战下体力值太低自动结束");
      return true;
    }
    let e = false;
    if (this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
      e = true;
      this.nlc.InAirTime += t;
      if (this.nlc.InAirTime > this.nlc.AutoGlideTime) {
        this.InterruptAutoMoving("空中太久");
        this.Gce?.TrySetGlide();
      }
    } else {
      this.nlc.InAirTime = 0;
    }
    if (this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water || this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
      e = true;
      this.nlc.InDelayExitTime += t;
      if (this.nlc.InDelayExitTime > this.nlc.DelayExitTime) {
        this.InterruptAutoMoving("处于攀爬/游泳状态太久");
      } else if (!!i && (this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb || this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb || this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim || this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim)) {
        this.InterruptAutoMoving("体力值太低自动结束");
      }
    } else {
      this.nlc.InDelayExitTime = 0;
    }
    return e;
  }
  InterruptAutoMoving(t, i = true) {
    return !this.Entity || (this.nlc.GetAutoMovingState() ? (this.nlc.ResetAutoMovingState(t), true) : (i && (this.nlc.ClearTimeAccumulation(), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Input", 42, "未处于自动持续奔跑状态，但是触发打断条件，清空计时", ["Entity", this.Lie?.Entity.Id], ["context", t]), false));
  }
  SetAutoMovingConfig(t) {
    this.nlc.DeepCopy(t);
  }
  GetAutoMovingConfig() {
    return this.nlc;
  }
  zC1(t) {
    var i = Global_1.Global.CharacterCameraManager.GetCameraRotation().VectorDouble();
    this.cz.DeepCopy(i);
    var i = this.Gce.GravityDirect;
    Vector_1.Vector.VectorPlaneProject(this.cz, i, t);
  }
  JC1(t, i) {
    this.HT1 ||= CommonParamById_1.configCommonParamById.GetIntConfig("AutoSprintTimerCondition");
    this.jT1 += i;
    if (!!t || !(this.jT1 < this.HT1)) {
      this.jT1 = 0;
      if (this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Run || t && this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
        this.rJo.SprintPress();
        RoleAudioController_1.RoleAudioController.OnPlayAccelerateAudio(this.Entity, CharacterUnifiedStateTypes_1.ECharMoveState.Sprint, CharacterUnifiedStateTypes_1.ECharPositionState.Ground);
      }
    }
  }
};
CharacterInputComponent.x0l = Stats_1.Stat.Create("CharacterInputComponent.GetCommand");
CharacterInputComponent.P0l = Stats_1.Stat.Create("CharacterInputComponent.ExecuteCommand");
CharacterInputComponent.w0l = Stats_1.Stat.Create("CharacterInputComponent.DispatchPressEvent");
CharacterInputComponent.B0l = Stats_1.Stat.Create("CharacterInputComponent.DispatchReleaseEvent");
CharacterInputComponent.b0l = Stats_1.Stat.Create("CharacterInputComponent.HandlePress");
CharacterInputComponent.q0l = Stats_1.Stat.Create("CharacterInputComponent.HandleRelease");
CharacterInputComponent.T8r = new Map();
CharacterInputComponent = CharacterInputComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(62)], CharacterInputComponent);
exports.CharacterInputComponent = CharacterInputComponent; //# sourceMappingURL=CharacterInputComponent.js.map