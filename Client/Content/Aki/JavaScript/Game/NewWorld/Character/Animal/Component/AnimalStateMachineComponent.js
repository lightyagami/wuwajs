"use strict";

var AnimalStateMachineComponent_1;
var __decorate = this && this.__decorate || function (t, e, r, a) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, r) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, r, a);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (i = t[o]) {
        s = (n < 3 ? i(s) : n > 3 ? i(e, r, s) : i(e, r)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalStateMachineComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const StateMachine_1 = require("../../../../../Core/Utils/StateMachine/StateMachine");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const AnimalPerformAlertState_1 = require("../StateMachine/AnimalPerformAlertState");
const AnimalPerformBornState_1 = require("../StateMachine/AnimalPerformBornState");
const AnimalPerformIdleState_1 = require("../StateMachine/AnimalPerformIdleState");
const AnimalPerformInteractState_1 = require("../StateMachine/AnimalPerformInteractState");
const AnimalPerformStandState_1 = require("../StateMachine/AnimalPerformStandState");
const AnimalPerformSystemUiState_1 = require("../StateMachine/AnimalPerformSystemUiState");
const AnimalPerformTakeOffState_1 = require("../StateMachine/AnimalPerformTakeOffState");
const AnimalPerformUnderAttackState_1 = require("../StateMachine/AnimalPerformUnderAttackState");
let AnimalStateMachineComponent = AnimalStateMachineComponent_1 = class AnimalStateMachineComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.oRe = undefined;
    this.ubr = undefined;
    this.Lle = undefined;
    this.cbr = 0;
    this.aGe = false;
    this.Pz = (t, e) => {};
  }
  OnInitData() {
    this.Lle = new StateMachine_1.StateMachine(this.Entity, this.Pz);
    return true;
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    this.Mne = t.GetPbDataId();
    this.oRe = this.Entity.GetComponent(181);
    var t = this.oRe?.MainAnimInstance;
    if (t && UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_AnimalEcological_C.StaticClass())) {
      this.ubr = t;
      if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEANIMAL) || UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASERUNANIMAL)) {
        this.Lle.AddState(0, AnimalPerformBornState_1.AnimalPerformBornState, this.ubr);
        this.Lle.AddState(1, AnimalPerformStandState_1.AnimalPerformStandState, this.ubr);
        this.Lle.AddState(2, AnimalPerformIdleState_1.AnimalPerformIdleState, this.ubr);
        this.Lle.AddState(3, AnimalPerformInteractState_1.AnimalPerformInteractState, this.ubr);
        this.Lle.AddState(4, AnimalPerformUnderAttackState_1.AnimalPerformUnderAttackState, this.ubr);
        this.Lle.AddState(6, AnimalPerformAlertState_1.AnimalPerformAlertState, this.ubr);
        this.Lle.AddState(5, AnimalPerformTakeOffState_1.AnimalPerformTakeOffState, this.ubr);
        this.Lle.AddState(7, AnimalPerformSystemUiState_1.AnimalPerformSystemUiState, this.ubr);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Animal", 29, "动画蓝图不符合规范，不是ABP_BaseAnimal的实例，不能开启状态机", ["ConfigID", this.Mne], ["ABP", t?.GetName()]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Animal", 29, "动画蓝图不符合规范，缺少AnimalEcological接口，不能开启状态机", ["ConfigID", this.Mne], ["ABP", t?.GetName()]);
    }
    return true;
  }
  OnActivate() {
    this.StartStateMachine();
  }
  OnTick(t) {
    if (this.aGe) {
      this.Lle.Update(t);
    }
  }
  OnEnd() {
    this.aGe = false;
    this.Lle.Destroy();
    return true;
  }
  StartStateMachine() {
    this.Lle.Start(this.cbr);
    this.aGe = true;
  }
  CurrentState() {
    return AnimalStateMachineComponent_1.GetUeState(this.Lle.CurrentState);
  }
  CurrentTsState() {
    return this.Lle.CurrentState;
  }
  SwitchState(t) {
    if (this.aGe) {
      this.Lle.Switch(t);
    }
  }
  GetWaitTime() {
    return this.Lle.GetState(this.Lle.CurrentState)?.GetActionTime() ?? 0;
  }
  GetState(t) {
    if (this.aGe) {
      return this.Lle.GetState(t);
    }
  }
  GetCurrentState() {
    if (this.aGe) {
      return this.GetState(this.Lle.CurrentState);
    }
  }
  static GetStateName(t) {
    switch (t) {
      case 0:
      case 1:
        return "None";
      case 2:
        return "空闲";
      case 3:
        return "交互";
      case 6:
        return "警觉";
      case 4:
        return "受击";
      case 5:
        return "起飞";
      case 7:
        return "系统UI";
      default:
        return "None";
    }
  }
  static GetUeState(t) {
    switch (t) {
      case 0:
      case 1:
        return 0;
      case 2:
        return 1;
      case 3:
        return 5;
      case 6:
        return 2;
      case 4:
        return 3;
      case 5:
        return 4;
      case 7:
        return 6;
    }
    return 0;
  }
  static GetTsState(t) {
    switch (t) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 6;
      case 3:
        return 4;
      case 4:
        return 5;
      case 5:
        return 3;
      case 6:
        return 7;
    }
    return 1;
  }
};
AnimalStateMachineComponent = AnimalStateMachineComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(14)], AnimalStateMachineComponent);
exports.AnimalStateMachineComponent = AnimalStateMachineComponent; //# sourceMappingURL=AnimalStateMachineComponent.js.map