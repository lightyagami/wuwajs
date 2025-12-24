"use strict";

var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var n = arguments.length;
  var r = n < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, e);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        r = (n < 3 ? h(r) : n > 3 ? h(i, s, r) : h(i, s)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleInputComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../Input/InputEnums");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const VehicleInputComponent_1 = require("../Common/VehicleInputComponent");
const ASSIST_INPUT_DATA_ASSET_PATH = "/Game/Aki/Character/Vehicle/Motor/Data/DA/DA_MotorAssistInputConfig.DA_MotorAssistInputConfig";
class AssistedInputInfo {
  constructor(t, i) {
    this.LastState = false;
    this.CurrentTime = 0;
    this.hCc = false;
    this.Z$f = false;
    this.Duration = MathUtils_1.MathUtils.MaxFloat;
    this.TagList = [];
    this.SkillList = [];
    this.DebugText = "";
    this.TagComp = undefined;
    this.xNf = undefined;
    this.xNf = i;
    this.TagComp = t;
  }
  InitConfig(t) {}
  UpdateAutoState() {
    return false;
  }
  SetAutoState(t) {
    if (t !== this.LastState && (this.LastState = t, this.UpdateAutoTag(t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Input", 42, "[MotorInput] 切换输入辅助状态", ["Type", this.DebugText], ["Entity", this.TagComp?.Entity.Id], ["Running", t]);
    }
  }
  AddTimeAccumulation(t) {
    if (this.BNf()) {
      this.CurrentTime += t;
    } else {
      this.ClearTimeAccumulation();
    }
  }
  ClearTimeAccumulation() {
    this.CurrentTime = 0;
  }
  ResetAutoState(t) {
    this.ClearTimeAccumulation();
    this.SetAutoState(false);
    if (t && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 42, "[MotorInput] 打断输入辅助", ["Type", this.DebugText], ["Entity", this.TagComp?.Entity.Id], ["context", t]);
    }
  }
  CheckTimeDuration() {
    return this.CurrentTime > this.Duration;
  }
  GetCurrentTime() {
    return this.CurrentTime;
  }
  GetDuration() {
    return this.Duration;
  }
  BNf() {
    if (this.TagList && this.TagList.length > 0) {
      for (const t of this.TagList) {
        if (this.TagComp?.HasTag(t)) {
          return false;
        }
      }
    }
    return true;
  }
  CheckPermitSkill(t) {
    return this.SkillList.includes(t);
  }
  IsStartEnter() {
    return this.hCc;
  }
  SetStartEnter(t) {
    this.hCc = t;
  }
  IsIgnoreInput() {
    return this.Z$f;
  }
  SetIgnoreInput(t) {
    this.Z$f = t;
  }
  CheckGameplayTag() {
    return (this.TagComp?.HasTag(this.xNf) ?? false) && this.BNf();
  }
  UpdateAutoTag(t) {
    if (t && !this.TagComp?.HasTag(this.xNf)) {
      this.TagComp?.AddTag(this.xNf);
    }
    if (!t && this.TagComp?.HasTag(this.xNf)) {
      this.TagComp?.RemoveTag(this.xNf);
    }
  }
}
class NitroBoostInfo extends AssistedInputInfo {
  constructor() {
    super(...arguments);
    this.DebugText = "氮气维持";
    this.kNf = false;
  }
  UpdateAutoState() {
    var t = this.GetSettingEnable() && this.CheckGameplayTag();
    if (this.LastState && !t) {
      this.ResetAutoState("不满足默认条件");
    }
    return t;
  }
  GetSettingEnable() {
    return ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.AutoNitrogenSettingEnable || this.kNf;
  }
  InitConfig(i) {
    this.Duration = i.NitroBoostTime;
    this.kNf = i.DebugNitroBoost;
    for (let t = 0; t < i.ForbidNitroBoostTag.GameplayTags.Num(); t++) {
      this.TagList.push(i.ForbidNitroBoostTag.GameplayTags.Get(t).TagId);
    }
    for (let t = 0; t < i.NitroBoostSkill.Num(); t++) {
      this.SkillList.push(i.NitroBoostSkill.Get(t));
    }
  }
}
class HoldThrottleInfo extends AssistedInputInfo {
  constructor() {
    super(...arguments);
    this.DebugText = "油门维持";
    this.kNf = false;
  }
  UpdateAutoState() {
    var t = this.GetSettingEnable() && this.CheckGameplayTag();
    if (this.LastState && !t) {
      this.ResetAutoState("不满足默认条件");
    }
    return t;
  }
  GetSettingEnable() {
    return ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.AutoAcceleratorSettingEnable || this.kNf;
  }
  InitConfig(i) {
    this.Duration = i.HoldThrottleTime;
    this.kNf = i.DebugHoldThrottle;
    for (let t = 0; t < i.ForbidHoldThrottleTag.GameplayTags.Num(); t++) {
      this.TagList.push(i.ForbidHoldThrottleTag.GameplayTags.Get(t).TagId);
    }
    for (let t = 0; t < i.HoldThrottleSkill.Num(); t++) {
      this.SkillList.push(i.HoldThrottleSkill.Get(t));
    }
  }
}
let MotorcycleInputComponent = class MotorcycleInputComponent extends VehicleInputComponent_1.VehicleInputComponent {
  constructor() {
    super(...arguments);
    this.Rhm = false;
    this.qNf = Vector_1.Vector.Create();
    this.ONf = undefined;
    this.GNf = undefined;
    this.MoveComp = undefined;
    this.AudioComp = undefined;
    this.LastInputSeconds = 0;
    this.TmpVector1 = Vector_1.Vector.Create();
    this.MotorInputCache = Vector_1.Vector.Create();
    this.PressingBackBraking = false;
    this.PressingSprint = false;
    this.InSprintInternal = false;
    this.Mrm = false;
    this.BanSprint = (t, i) => {
      var s = this.PerformComp?.Driver?.GetComponent(215);
      this.Mrm = s?.HasTag(1664561458) || (this.TagComp?.HasTag(-9258219) ?? false);
      this.RefreshSprint();
    };
    this.InBackBrakingInternal = false;
    this.Erm = false;
    this.BanDrift = (t, i) => {
      var s = this.PerformComp?.Driver?.GetComponent(215);
      this.Erm = s?.HasTag(952008256) || (this.TagComp?.HasTag(823224219) ?? false);
      this.RefreshBackBraking();
    };
    this.AirRotateInput = 0;
    this.yZf = new Map();
    this.SZf = new Map();
    this.MZf = new Map();
    this.FNf = false;
    this.NNf = (t, i) => {};
    this.NitroBoostChange = (t, i) => {
      this.RefreshSprint();
    };
    this.BJe = (t, i, s) => {
      if (!this.ONf?.CheckPermitSkill(i)) {
        this.VNf("氮气维持，使用了技能" + i, true, false);
      }
      if (!this.GNf?.CheckPermitSkill(i)) {
        this.VNf("油门维持，使用了技能" + i, false, true);
      }
    };
    this.Jze = () => {
      this.VNf("角色死亡");
    };
    this.PMe = t => {
      var i;
      if (this.PressingSprint && (i = this.MZf.get(4))) {
        ControllerHolder_1.ControllerHolder.InputDistributeController?.InputAction(i, false);
      }
      if (this.PressingBackBraking && (i = this.MZf.get(2))) {
        ControllerHolder_1.ControllerHolder.InputDistributeController?.InputAction(i, false);
      }
    };
    this.YC1 = t => {
      var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(t);
      if (i && !i.AllowAutoMotor) {
        this.VNf("打开了UI" + t);
      }
    };
  }
  get InSprint() {
    return this.InSprintInternal;
  }
  set InSprint(t) {
    if (this.InSprintInternal !== t) {
      if (this.InSprintInternal = t) {
        this.TagComp?.AddTag(735065266);
      } else {
        this.TagComp?.RemoveTag(735065266);
      }
    }
  }
  RefreshSprint() {
    var t = this.q8f();
    var i = (this.PressingSprint || t) && !this.Mrm && !this.InBackBraking;
    if (this.InSprint !== i && this.Mrm) {
      this.AudioComp?.MotorNitroAccelerationFailure();
    }
    if (this.InSprint !== i && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 6, "1176311 Sprint", ["NewState", i], ["Pr", this.PressingSprint], ["As", t], ["Ban", this.Mrm], ["Bck", this.InBackBraking]);
    }
    this.InSprint = i;
  }
  get InBackBraking() {
    return this.InBackBrakingInternal;
  }
  set InBackBraking(t) {
    if (this.InBackBrakingInternal !== t) {
      this.InBackBrakingInternal = t;
      this.MoveComp.BackBraking = t;
    }
  }
  RefreshBackBraking() {
    this.InBackBraking = this.PressingBackBraking && !this.Erm;
    this.RefreshSprint();
  }
  OnEnterOrLeaveVehicle(t, i) {
    var s;
    super.OnEnterOrLeaveVehicle(t, i);
    if (t.IsDriver) {
      this.Rhm = i;
      s = t.PassengerEntity?.GetComponent(215);
      if (i) {
        this.O5a(t);
      } else {
        this.HNf(t);
      }
      this.Mrm = s?.HasTag(1664561458) || (this.TagComp?.HasTag(-9258219) ?? false);
      this.Erm = s?.HasTag(952008256) || (this.TagComp?.HasTag(823224219) ?? false);
    }
  }
  O5a(t) {
    t = t.PassengerEntity?.GetComponent(215);
    t?.ListenForTagAddOrRemove(1664561458, this.BanSprint);
    t?.ListenForTagAddOrRemove(952008256, this.BanDrift);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
    if (t) {
      EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
      EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ForceReleaseInput, this.PMe);
  }
  HNf(t) {
    t = t.PassengerEntity?.GetComponent(215);
    this.PressingBackBraking = false;
    this.PressingSprint = false;
    this.InSprint = false;
    this.InBackBraking = false;
    t?.RemoveTagAddOrRemoveListener(1664561458, this.BanSprint);
    t?.RemoveTagAddOrRemoveListener(952008256, this.BanDrift);
    this.VNf("角色离开载具");
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
    if (t) {
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ForceReleaseInput, this.PMe);
  }
  OnStart() {
    super.OnStart();
    this.MoveComp = this.Entity.GetComponent(265);
    this.AudioComp = this.Entity.GetComponent(297);
    this.TagComp?.ListenForTagAddOrRemove(-9258219, this.BanSprint);
    this.TagComp?.ListenForTagAddOrRemove(823224219, this.BanDrift);
    this.TagComp?.ListenForTagAddOrRemove(285518931, this.NNf);
    this.TagComp?.ListenForTagAddOrRemove(-904464547, this.NitroBoostChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.YC1);
    this.jNf();
    this.EZf();
    return true;
  }
  OnEnd() {
    super.OnEnd();
    this.TagComp?.RemoveTagAddOrRemoveListener(-9258219, this.BanSprint);
    this.TagComp?.RemoveTagAddOrRemoveListener(823224219, this.BanDrift);
    this.TagComp?.RemoveTagAddOrRemoveListener(285518931, this.NNf);
    this.TagComp?.RemoveTagAddOrRemoveListener(-904464547, this.NitroBoostChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.YC1);
    return true;
  }
  OnDisable(t) {
    this.AirRotateInput = 0;
  }
  OnTick(t) {
    super.OnTick(t);
    if (!this.MoveVectorCache.IsNearlyZero() || !!this.InSprint || !!this.InBackBraking) {
      this.LastInputSeconds = Time_1.Time.NowSeconds;
    }
    this.$Nf(t);
  }
  UpdateVehicleInputDirectAndFacing() {
    if (Info_1.Info.IsInTouch()) {
      this.UpdateMoveCache();
      this.InputAdjusted(this.MotorInputCache);
    } else {
      this.GetMoveVector(this.MotorInputCache);
      this.MotorInputCache.X = MathUtils_1.MathUtils.Clamp(this.MotorInputCache.X, -1, 1);
      this.MotorInputCache.Y = MathUtils_1.MathUtils.Clamp(this.MotorInputCache.Y, -1, 1);
    }
    this.qNf.DeepCopy(this.MotorInputCache);
    if (this.GNf?.UpdateAutoState() || this.ONf?.UpdateAutoState()) {
      this.MotorInputCache.X = 1;
    }
    if (this.WNf() && (this.PressingBackBraking || this.MoveComp?.DriftingState)) {
      this.MotorInputCache.X = 1;
    }
    this.ActorComp.SetInputDirect(this.MotorInputCache);
    this.SetInputFacingFromInputDirect();
  }
  SetInputFacingFromInputDirect(t = 0) {
    this.ActorComp.SetInputFacing(this.ActorComp.ActorForwardProxy);
  }
  InputAdjusted(t) {
    this.TmpVector1.DeepCopy(this.MoveVectorCache);
    if (this.PerformComp?.Driver?.GetComponent(215)?.HasTag(275316259) || this.TagComp?.HasTag(-1203255164)) {
      this.TmpVector1.X = Math.max(0, this.TmpVector1.X);
    }
    var i = this.TmpVector1.Size();
    if (i <= MathUtils_1.MathUtils.KindaSmallNumber) {
      t.DeepCopy(this.TmpVector1);
    } else {
      this.TmpVector1.Multiply(i / Math.max(Math.abs(this.TmpVector1.X), Math.abs(this.TmpVector1.Y)), t);
    }
  }
  ExecuteInputCommand(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 67, "[MotorcycleInputComponent.ExecuteInputCommand]执行指令", ["action", t.Action], ["commandType", t.Command.CommandType], ["commandValue", t.Command.IntValue], ["eventId", t.Id]);
    }
    var s = t.Command;
    switch (s.CommandType) {
      case 4:
        this.ExecuteSprint(s);
        break;
      case 2:
        this.ExecuteJump(s);
        break;
      case 1:
        this.ExecuteSkill(s);
        break;
      case 8:
        this.ExecuteSwitchWalk(s);
    }
  }
  ExecuteSprint(t) {
    this.PressingSprint = !!t.IntValue;
    this.RefreshSprint();
  }
  ExecuteJump(t) {
    this.PressingBackBraking = !!t.IntValue;
    this.RefreshBackBraking();
  }
  ExecuteSkill(t) {
    var i;
    this.LastInputSeconds = Time_1.Time.NowSeconds;
    if (t.IntValue === 210012) {
      if ((i = this.Entity.GetComponent(246))?.Driver) {
        i.TryLeave(i.Driver);
      }
    } else {
      this.WZo(t.IntValue);
    }
  }
  ExecuteSwitchWalk(t) {
    this.AirRotateInput = t.IntValue ? 1 : 0;
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 6, "ExecuteSwitchWalk", ["AirRotateInput", this.AirRotateInput]);
    }
  }
  WZo(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Motor BeginSkill", ["SkillId", t]);
    }
    this.Entity.GetComponent(40).BeginSkill(t, {
      Reason: "FishingBoatInputComponent.ExecuteSkill"
    });
  }
  ForceRefreshBraking() {
    this.InBackBraking = !this.InBackBraking;
    this.InBackBraking = !this.InBackBraking;
    this.RefreshSprint();
  }
  OnAddBlockAction(t) {
    if (t === InputEnums_1.EInputAction.跳跃) {
      if (this.PressingBackBraking) {
        this.PressingBackBraking = false;
        this.RefreshBackBraking();
      }
    } else if (t === InputEnums_1.EInputAction.闪避 && this.PressingSprint) {
      this.PressingSprint = false;
      this.RefreshSprint();
    }
  }
  IsEnableExecuteCommandImmediately() {
    return true;
  }
  GetImmediateInputCommands(i) {
    if (i.length !== 0) {
      this.yZf.clear();
      this.SZf.clear();
      var s = [];
      let t = -1;
      for (const r of i) {
        var e;
        var h = r.Command.CommandType;
        var n = this.yZf.get(h);
        if (n !== undefined) {
          if ((e = this.QueryCommandPriority(r.Command) ?? -1) > (this.SZf.get(h) ?? -1)) {
            s[n] = r;
            this.SZf.set(h, e);
          }
        } else if ((n = this.QueryCommandPriority(r.Command) ?? -1) > -1) {
          s.push(r);
          this.yZf.set(h, ++t);
          this.SZf.set(h, n);
        }
      }
      return s;
    }
  }
  QuerySkillPriority() {
    return 2;
  }
  QueryCommandPriority(t) {
    var i = this.MZf.get(t.CommandType);
    if (i !== undefined) {
      var i = ModelManager_1.ModelManager.InputModel?.GetInputData(3).GetActionNameByInputAction(i);
      if (i) {
        i = ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(i);
        if (t.IntValue === 1 && i || t.IntValue === 0) {
          return 1;
        } else {
          return -1;
        }
      }
    }
  }
  EZf() {
    this.MZf.set(2, InputEnums_1.EInputAction.跳跃);
    this.MZf.set(4, InputEnums_1.EInputAction.闪避);
    this.MZf.set(8, InputEnums_1.EInputAction.走跑切换);
  }
  jNf() {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_MotorAssistInputConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(ASSIST_INPUT_DATA_ASSET_PATH, UE.BP_MotorAssistInputConfig_C, t => {
        if (t && this.TagComp) {
          this.FNf = t.DebugAssistDrift;
          this.GNf = new HoldThrottleInfo(this.TagComp, 285518931);
          this.GNf.InitConfig(t);
          this.ONf = new NitroBoostInfo(this.TagComp, -904464547);
          this.ONf.InitConfig(t);
        }
      });
    });
  }
  WNf() {
    return ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.DriftAcceleratorSettingEnable || this.FNf;
  }
  VNf(t, i = true, s = true) {
    if (i) {
      if (this.ONf?.UpdateAutoState()) {
        this.ONf?.ResetAutoState(t);
      } else {
        this.ONf?.ClearTimeAccumulation();
      }
    }
    if (s) {
      if (this.GNf?.UpdateAutoState()) {
        this.GNf?.ResetAutoState(t);
      } else {
        this.GNf?.ClearTimeAccumulation();
      }
    }
  }
  $Nf(t) {
    this.QNf(t);
    this.KNf(t);
  }
  QNf(t) {
    var i = this.ONf?.GetSettingEnable();
    var s = !this.Mrm && !this.InBackBraking;
    var e = this.qNf.X >= 0;
    var i = i && s && e && this.Rhm;
    if (this.ONf?.UpdateAutoState()) {
      if (!i) {
        this.VNf("氮气维持，不在冲刺或刹车", true, false);
      }
    } else {
      s = this.ONf?.IsIgnoreInput();
      if (this.InSprint && i && !s) {
        this.ONf?.AddTimeAccumulation(t);
        if (this.ONf?.CheckTimeDuration()) {
          this.ONf?.SetStartEnter(true);
          this.ONf?.SetAutoState(true);
        }
      } else {
        if (!this.PressingSprint && s) {
          this.ONf?.SetIgnoreInput(false);
        }
        this.ONf?.ClearTimeAccumulation();
      }
    }
  }
  KNf(t) {
    var i = this.GNf?.GetSettingEnable();
    var s = this.MoveComp.Speed > 0;
    var e = this.qNf.X > 0;
    var i = i && s && e && this.Rhm;
    if (this.GNf?.UpdateAutoState()) {
      s = this.GNf?.IsStartEnter();
      if (this.qNf.X < 0) {
        this.VNf("油门维持，不在移动或刹车");
        return;
      } else if (this.qNf.X === 0 && s) {
        this.GNf?.SetStartEnter(false);
        return;
      } else {
        if (!s && e) {
          this.VNf("给了新的油门，退出油门维持");
          this.GNf?.SetIgnoreInput(true);
        }
        return;
      }
    }
    s = this.GNf?.IsIgnoreInput();
    if (i && !s) {
      this.GNf?.AddTimeAccumulation(t);
      if (this.GNf?.CheckTimeDuration()) {
        this.GNf?.SetStartEnter(true);
        this.GNf?.SetAutoState(true);
      }
    } else {
      if (!e && s) {
        this.GNf?.SetIgnoreInput(false);
      }
      this.GNf?.ClearTimeAccumulation();
    }
  }
  q8f() {
    var t = this.ONf?.UpdateAutoState() ?? false;
    if (t) {
      if (this.PressingSprint && !this.ONf?.IsStartEnter()) {
        this.VNf("氮气维持被新输入打断", true, false);
        this.ONf?.SetIgnoreInput(true);
        return false;
      }
      if (!this.PressingSprint) {
        this.ONf?.SetStartEnter(false);
      }
    }
    return t;
  }
  GetNitroBoostInfo() {
    return this.ONf;
  }
  GetHoldThrottleInfo() {
    return this.GNf;
  }
};
MotorcycleInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(264)], MotorcycleInputComponent);
exports.MotorcycleInputComponent = MotorcycleInputComponent; //# sourceMappingURL=MotorcycleInputComponent.js.map