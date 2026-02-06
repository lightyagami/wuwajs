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
    this.Bog = false;
    this.Duration = MathUtils_1.MathUtils.MaxFloat;
    this.TagList = [];
    this.SkillList = [];
    this.DebugText = "";
    this.TagComp = undefined;
    this.pHf = undefined;
    this.pHf = i;
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
    if (this.vHf()) {
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
  vHf() {
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
    return this.Bog;
  }
  SetIgnoreInput(t) {
    this.Bog = t;
  }
  CheckGameplayTag() {
    return (this.TagComp?.HasTag(this.pHf) ?? false) && this.vHf();
  }
  UpdateAutoTag(t) {
    if (t && !this.TagComp?.HasTag(this.pHf)) {
      this.TagComp?.AddTag(this.pHf);
    }
    if (!t && this.TagComp?.HasTag(this.pHf)) {
      this.TagComp?.RemoveTag(this.pHf);
    }
  }
}
class NitroBoostInfo extends AssistedInputInfo {
  constructor() {
    super(...arguments);
    this.DebugText = "氮气维持";
    this.yHf = false;
  }
  UpdateAutoState() {
    var t = this.GetSettingEnable() && this.CheckGameplayTag();
    if (this.LastState && !t) {
      this.ResetAutoState("不满足默认条件");
    }
    return t;
  }
  GetSettingEnable() {
    return ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.AutoNitrogenSettingEnable || this.yHf;
  }
  InitConfig(i) {
    this.Duration = i.NitroBoostTime;
    this.yHf = i.DebugNitroBoost;
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
    this.yHf = false;
  }
  UpdateAutoState() {
    var t = this.GetSettingEnable() && this.CheckGameplayTag();
    if (this.LastState && !t) {
      this.ResetAutoState("不满足默认条件");
    }
    return t;
  }
  GetSettingEnable() {
    return ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.AutoAcceleratorSettingEnable || this.yHf;
  }
  InitConfig(i) {
    this.Duration = i.HoldThrottleTime;
    this.yHf = i.DebugHoldThrottle;
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
    this.SHf = Vector_1.Vector.Create();
    this.MHf = undefined;
    this.EHf = undefined;
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
      var s = this.PerformComp?.Driver?.GetComponent(217);
      this.Mrm = s?.HasTag(1664561458) || (this.TagComp?.HasTag(-9258219) ?? false);
      this.RefreshSprint();
    };
    this.InBackBrakingInternal = false;
    this.Erm = false;
    this.BanDrift = (t, i) => {
      var s = this.PerformComp?.Driver?.GetComponent(217);
      this.Erm = s?.HasTag(952008256) || (this.TagComp?.HasTag(823224219) ?? false);
      this.RefreshBackBraking();
    };
    this.AirRotateInput = 0;
    this.pyg = new Map();
    this.vyg = new Map();
    this.yyg = new Map();
    this.IHf = false;
    this.THf = (t, i) => {};
    this.NitroBoostChange = (t, i) => {
      this.RefreshSprint();
    };
    this.BJe = (t, i, s) => {
      if (!this.MHf?.CheckPermitSkill(i)) {
        this.bHf("氮气维持，使用了技能" + i, true, false);
      }
      if (!this.EHf?.CheckPermitSkill(i)) {
        this.bHf("油门维持，使用了技能" + i, false, true);
      }
    };
    this.Jze = () => {
      this.bHf("角色死亡");
    };
    this.PMe = t => {
      var i;
      if (this.PressingSprint && (i = this.yyg.get(4))) {
        ControllerHolder_1.ControllerHolder.InputDistributeController?.InputAction(i, false);
      }
      if (this.PressingBackBraking && (i = this.yyg.get(2))) {
        ControllerHolder_1.ControllerHolder.InputDistributeController?.InputAction(i, false);
      }
    };
    this.YC1 = t => {
      var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(t);
      if (i && !i.AllowAutoMotor) {
        this.bHf("打开了UI" + t);
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
    var t = this.QYf();
    var i = (this.PressingSprint || t) && !this.Mrm && !this.InBackBraking;
    this.AudioComp?.MotorNitroAccelerationFailure(this.Mrm, i, this.PressingSprint);
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
      s = t.PassengerEntity?.GetComponent(217);
      if (i) {
        this.O5a(t);
      } else {
        this.RHf(t);
      }
      this.Mrm = s?.HasTag(1664561458) || (this.TagComp?.HasTag(-9258219) ?? false);
      this.Erm = s?.HasTag(952008256) || (this.TagComp?.HasTag(823224219) ?? false);
    }
  }
  O5a(t) {
    t = t.PassengerEntity?.GetComponent(217);
    t?.ListenForTagAddOrRemove(1664561458, this.BanSprint);
    t?.ListenForTagAddOrRemove(952008256, this.BanDrift);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
    if (t) {
      EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.CharUseSkill, this.BJe);
      EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ForceReleaseInput, this.PMe);
  }
  RHf(t) {
    t = t.PassengerEntity?.GetComponent(217);
    this.PressingBackBraking = false;
    this.PressingSprint = false;
    this.InSprint = false;
    this.InBackBraking = false;
    t?.RemoveTagAddOrRemoveListener(1664561458, this.BanSprint);
    t?.RemoveTagAddOrRemoveListener(952008256, this.BanDrift);
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
    this.AudioComp = this.Entity.GetComponent(299);
    this.TagComp?.ListenForTagAddOrRemove(-9258219, this.BanSprint);
    this.TagComp?.ListenForTagAddOrRemove(823224219, this.BanDrift);
    this.TagComp?.ListenForTagAddOrRemove(285518931, this.THf);
    this.TagComp?.ListenForTagAddOrRemove(-904464547, this.NitroBoostChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.YC1);
    this.LHf();
    this.Syg();
    return true;
  }
  OnEnd() {
    super.OnEnd();
    this.TagComp?.RemoveTagAddOrRemoveListener(-9258219, this.BanSprint);
    this.TagComp?.RemoveTagAddOrRemoveListener(823224219, this.BanDrift);
    this.TagComp?.RemoveTagAddOrRemoveListener(285518931, this.THf);
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
    this.wHf(t);
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
    this.SHf.DeepCopy(this.MotorInputCache);
    if (this.EHf?.UpdateAutoState() || this.MHf?.UpdateAutoState()) {
      this.MotorInputCache.X = 1;
    }
    if (this.PHf() && (this.PressingBackBraking || this.MoveComp?.DriftingState)) {
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
    if (this.PerformComp?.Driver?.GetComponent(217)?.HasTag(275316259) || this.TagComp?.HasTag(-1203255164)) {
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
  }
  WZo(t) {
    this.Entity.GetComponent(42).BeginSkill(t, {
      Reason: "MotorInputComponent.ExecuteSkill"
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
      this.pyg.clear();
      this.vyg.clear();
      var s = [];
      let t = -1;
      for (const r of i) {
        var e;
        var h = r.Command.CommandType;
        var n = this.pyg.get(h);
        if (n !== undefined) {
          if ((e = this.QueryCommandPriority(r.Command) ?? -1) > (this.vyg.get(h) ?? -1)) {
            s[n] = r;
            this.vyg.set(h, e);
          }
        } else if ((n = this.QueryCommandPriority(r.Command) ?? -1) > -1) {
          s.push(r);
          this.pyg.set(h, ++t);
          this.vyg.set(h, n);
        }
      }
      return s;
    }
  }
  QuerySkillPriority() {
    return 2;
  }
  QueryCommandPriority(t) {
    var i = this.yyg.get(t.CommandType);
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
  Syg() {
    this.yyg.set(2, InputEnums_1.EInputAction.跳跃);
    this.yyg.set(4, InputEnums_1.EInputAction.闪避);
    this.yyg.set(8, InputEnums_1.EInputAction.走跑切换);
  }
  LHf() {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_MotorAssistInputConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(ASSIST_INPUT_DATA_ASSET_PATH, UE.BP_MotorAssistInputConfig_C, t => {
        if (t && this.TagComp) {
          this.IHf = t.DebugAssistDrift;
          this.EHf = new HoldThrottleInfo(this.TagComp, 285518931);
          this.EHf.InitConfig(t);
          this.MHf = new NitroBoostInfo(this.TagComp, -904464547);
          this.MHf.InitConfig(t);
        }
      });
    });
  }
  PHf() {
    return ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.DriftAcceleratorSettingEnable || this.IHf;
  }
  bHf(t, i = true, s = true) {
    if (i) {
      if (this.MHf?.UpdateAutoState()) {
        this.MHf?.ResetAutoState(t);
      } else {
        this.MHf?.ClearTimeAccumulation();
      }
    }
    if (s) {
      if (this.EHf?.UpdateAutoState()) {
        this.EHf?.ResetAutoState(t);
      } else {
        this.EHf?.ClearTimeAccumulation();
      }
    }
  }
  wHf(t) {
    if (this.Rhm) {
      this.AHf(t);
      this.DHf(t);
    } else {
      this.bHf("角色离开载具");
    }
  }
  AHf(t) {
    var i = this.MHf?.GetSettingEnable();
    var s = !this.Mrm && !this.InBackBraking;
    var e = this.SHf.X >= 0;
    var i = i && s && e && this.Rhm;
    if (this.MHf?.UpdateAutoState()) {
      if (!i) {
        this.bHf("氮气维持，不在冲刺或刹车", true, false);
      }
    } else {
      s = this.MHf?.IsIgnoreInput();
      if (this.InSprint && i && !s) {
        this.MHf?.AddTimeAccumulation(t);
        if (this.MHf?.CheckTimeDuration()) {
          this.MHf?.SetStartEnter(true);
          this.MHf?.SetAutoState(true);
        }
      } else {
        if (!this.PressingSprint && s) {
          this.MHf?.SetIgnoreInput(false);
        }
        this.MHf?.ClearTimeAccumulation();
      }
    }
  }
  DHf(t) {
    var i = this.EHf?.GetSettingEnable();
    var s = this.MoveComp.Speed > 0;
    var e = this.SHf.X > 0;
    var i = i && s && e && this.Rhm;
    var s = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.GetIsRoundJoystick();
    if (this.EHf?.UpdateAutoState()) {
      h = this.EHf?.IsStartEnter();
      if (this.SHf.X < 0) {
        this.bHf("油门维持，不在移动或刹车");
        return;
      } else if (this.SHf.X === 0 && h) {
        this.EHf?.SetStartEnter(false);
        return;
      } else {
        if (!h && !!e && !s) {
          this.bHf("给了新的油门，退出油门维持");
          this.EHf?.SetIgnoreInput(true);
        }
        return;
      }
    }
    var h = this.EHf?.IsIgnoreInput();
    if (i && !h) {
      this.EHf?.AddTimeAccumulation(t);
      if (this.EHf?.CheckTimeDuration()) {
        this.EHf?.SetStartEnter(true);
        this.EHf?.SetAutoState(true);
      }
    } else {
      if (!e && h) {
        this.EHf?.SetIgnoreInput(false);
      }
      this.EHf?.ClearTimeAccumulation();
    }
  }
  QYf() {
    var t = this.MHf?.UpdateAutoState() ?? false;
    if (t) {
      if (this.PressingSprint && !this.MHf?.IsStartEnter()) {
        this.bHf("氮气维持被新输入打断", true, false);
        this.MHf?.SetIgnoreInput(true);
        return false;
      }
      if (!this.PressingSprint) {
        this.MHf?.SetStartEnter(false);
      }
    }
    return t;
  }
  GetNitroBoostInfo() {
    return this.MHf;
  }
  GetHoldThrottleInfo() {
    return this.EHf;
  }
  ExternalResetAssistInput(t, i = true, s = true) {
    this.bHf(t, i, s);
  }
};
MotorcycleInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(264)], MotorcycleInputComponent);
exports.MotorcycleInputComponent = MotorcycleInputComponent; //# sourceMappingURL=MotorcycleInputComponent.js.map