"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var r = arguments.length;
  var o = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeCameraInputComponent = undefined;
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
const MOVE_STEP = 10;
const ROTATE_STEP = 3;
const FOV_STEP = 1;
let FreeCameraInputComponent = class FreeCameraInputComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.SB1 = undefined;
    this.MB1 = false;
    this.LO1 = {
      Distance: 0,
      IsMoveBySelf: true
    };
    this.wO1 = {
      Distance: 0,
      IsMoveBySelf: true
    };
    this.Bbi = {
      Distance: 0,
      IsMoveBySelf: true
    };
    this.TB1 = 0;
    this.bB1 = 0;
    this.RB1 = 0;
    this.InputCameraFov = (t, e) => {
      this.InputCameraFieldFov(e * FOV_STEP);
    };
    this.InputCameraForward = (t, e) => {
      this.InputCameraMoveForward(e * MOVE_STEP);
    };
    this.InputCameraRight = (t, e) => {
      this.InputCameraMoveRight(e * MOVE_STEP);
    };
    this.InputCameraUp = (t, e) => {
      this.InputCameraMoveUp(e * MOVE_STEP);
    };
    this.InputCameraLookUp = (t, e) => {
      this.InputCameraRotateLookUp(-e * ROTATE_STEP);
    };
    this.InputCameraTurn = (t, e) => {
      this.InputCameraRotateTurn(e * ROTATE_STEP);
    };
  }
  static get Dependencies() {
    return [297];
  }
  OnStart() {
    this.SB1 = this.Entity.GetComponent(297);
    return this.SB1 !== undefined;
  }
  gk1() {
    if (this.LO1.Distance === 0 && this.wO1.Distance === 0 && this.Bbi.Distance === 0 && this.TB1 === 0 && this.bB1 === 0 && this.RB1 === 0) {
      this.MB1 = false;
    }
  }
  LWs() {
    this.RB1 = 0;
  }
  OnTick(t) {
    if (this.MB1) {
      this.gk1();
      this.SB1?.ReceiveCameraInput(this.LO1, this.wO1, this.Bbi, this.TB1, this.bB1, this.RB1);
      this.LWs();
    }
  }
  BindAxes() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes([InputMappingsDefine_1.axisMappings.Zoom, InputMappingsDefine_1.axisMappings.UiIncrease, InputMappingsDefine_1.axisMappings.UiReduce], this.InputCameraFov);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MoveForward, this.InputCameraForward);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MoveRight, this.InputCameraRight);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.LookUp, this.InputCameraLookUp);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.Turn, this.InputCameraTurn);
  }
  UnBindAxes() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes([InputMappingsDefine_1.axisMappings.Zoom, InputMappingsDefine_1.axisMappings.UiIncrease, InputMappingsDefine_1.axisMappings.UiReduce], this.InputCameraFov);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MoveForward, this.InputCameraForward);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MoveRight, this.InputCameraRight);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.LookUp, this.InputCameraLookUp);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.Turn, this.InputCameraTurn);
  }
  InputCameraMoveForward(t) {
    if (t !== 0 || this.LO1.Distance !== 0) {
      this.LO1.Distance = t;
      this.MB1 = true;
    }
  }
  InputCameraMoveRight(t) {
    if (t !== 0 || this.wO1.Distance !== 0) {
      this.wO1.Distance = t;
      this.MB1 = true;
    }
  }
  InputCameraMoveUp(t) {
    if (t !== 0 || this.Bbi.Distance !== 0) {
      this.Bbi.Distance = t;
      this.MB1 = true;
    }
  }
  InputCameraRotateLookUp(t) {
    if (t !== 0 || this.TB1 !== 0) {
      this.TB1 = t;
      this.MB1 = true;
    }
  }
  InputCameraRotateTurn(t) {
    if (t !== 0 || this.bB1 !== 0) {
      this.bB1 = t;
      this.MB1 = true;
    }
  }
  InputCameraFieldFov(t) {
    if (t !== 0) {
      this.RB1 = t;
      this.MB1 = true;
    }
  }
  SetUpMoveByWorld() {
    this.Bbi.IsMoveBySelf = false;
  }
  SetForwardMoveByWorld() {
    this.LO1.IsMoveBySelf = false;
  }
  SetRightMoveByWorld() {
    this.wO1.IsMoveBySelf = false;
  }
  ResetInputData() {
    this.LO1.Distance = 0;
    this.wO1.Distance = 0;
    this.Bbi.Distance = 0;
    this.TB1 = 0;
    this.bB1 = 0;
    this.RB1 = 0;
    this.MB1 = false;
    this.SB1?.ResetToInit();
  }
};
FreeCameraInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(298)], FreeCameraInputComponent);
exports.FreeCameraInputComponent = FreeCameraInputComponent; //# sourceMappingURL=FreeCameraInputComponent.js.map