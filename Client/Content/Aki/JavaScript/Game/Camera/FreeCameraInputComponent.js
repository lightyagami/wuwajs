"use strict";
var __decorate = this && this.__decorate || function(t, e, i, s) {
  var n, r = arguments.length,
    o = r < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s);
  else
    for (var h = t.length - 1; 0 <= h; h--)(n = t[h]) && (o = (r < 3 ? n(o) : 3 < r ? n(e, i, o) : n(e, i)) || o);
  return 3 < r && o && Object.defineProperty(e, i, o), o
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FreeCameraInputComponent = void 0;
const EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
  MOVE_STEP = 10,
  ROTATE_STEP = 3,
  FOV_STEP = 1;
let FreeCameraInputComponent = class FreeCameraInputComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.HU1 = void 0, this.$U1 = !1, this.zk1 = {
      Distance: 0,
      IsMoveBySelf: !0
    }, this.Jk1 = {
      Distance: 0,
      IsMoveBySelf: !0
    }, this.Bbi = {
      Distance: 0,
      IsMoveBySelf: !0
    }, this.KU1 = 0, this.XU1 = 0, this.YU1 = 0, this.InputCameraFov = (t, e) => {
      this.InputCameraFieldFov(e * FOV_STEP)
    }, this.InputCameraForward = (t, e) => {
      this.InputCameraMoveForward(e * MOVE_STEP)
    }, this.InputCameraRight = (t, e) => {
      this.InputCameraMoveRight(e * MOVE_STEP)
    }, this.InputCameraUp = (t, e) => {
      this.InputCameraMoveUp(e * MOVE_STEP)
    }, this.InputCameraLookUp = (t, e) => {
      this.InputCameraRotateLookUp(-e * ROTATE_STEP)
    }, this.InputCameraTurn = (t, e) => {
      this.InputCameraRotateTurn(e * ROTATE_STEP)
    }
  }
  static get Dependencies() {
    return [286]
  }
  OnStart() {
    return this.HU1 = this.Entity.GetComponent(286), void 0 !== this.HU1
  }
  GB1() {
    0 === this.zk1.Distance && 0 === this.Jk1.Distance && 0 === this.Bbi.Distance && 0 === this.KU1 && 0 === this.XU1 && 0 === this.YU1 && (this.$U1 = !1)
  }
  LWs() {
    this.YU1 = 0
  }
  OnTick(t) {
    this.$U1 && (this.GB1(), this.HU1?.ReceiveCameraInput(this.zk1, this.Jk1, this.Bbi, this.KU1, this.XU1, this.YU1), this.LWs())
  }
  BindAxes() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes([InputMappingsDefine_1.axisMappings.Zoom, InputMappingsDefine_1.axisMappings.UiIncrease, InputMappingsDefine_1.axisMappings.UiReduce], this.InputCameraFov), ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MoveForward, this.InputCameraForward), ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MoveRight, this.InputCameraRight), ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.LookUp, this.InputCameraLookUp), ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.Turn, this.InputCameraTurn)
  }
  UnBindAxes() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes([InputMappingsDefine_1.axisMappings.Zoom, InputMappingsDefine_1.axisMappings.UiIncrease, InputMappingsDefine_1.axisMappings.UiReduce], this.InputCameraFov), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MoveForward, this.InputCameraForward), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MoveRight, this.InputCameraRight), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.LookUp, this.InputCameraLookUp), ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.Turn, this.InputCameraTurn)
  }
  InputCameraMoveForward(t) {
    0 === t && 0 === this.zk1.Distance || (this.zk1.Distance = t, this.$U1 = !0)
  }
  InputCameraMoveRight(t) {
    0 === t && 0 === this.Jk1.Distance || (this.Jk1.Distance = t, this.$U1 = !0)
  }
  InputCameraMoveUp(t) {
    0 === t && 0 === this.Bbi.Distance || (this.Bbi.Distance = t, this.$U1 = !0)
  }
  InputCameraRotateLookUp(t) {
    0 === t && 0 === this.KU1 || (this.KU1 = t, this.$U1 = !0)
  }
  InputCameraRotateTurn(t) {
    0 === t && 0 === this.XU1 || (this.XU1 = t, this.$U1 = !0)
  }
  InputCameraFieldFov(t) {
    0 !== t && (this.YU1 = t, this.$U1 = !0)
  }
  SetUpMoveByWorld() {
    this.Bbi.IsMoveBySelf = !1
  }
  SetForwardMoveByWorld() {
    this.zk1.IsMoveBySelf = !1
  }
  SetRightMoveByWorld() {
    this.Jk1.IsMoveBySelf = !1
  }
  ResetInputData() {
    this.zk1.Distance = 0, this.Jk1.Distance = 0, this.Bbi.Distance = 0, this.KU1 = 0, this.XU1 = 0, this.YU1 = 0, this.$U1 = !1, this.HU1?.ResetToInit()
  }
};
FreeCameraInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(287)], FreeCameraInputComponent), exports.FreeCameraInputComponent = FreeCameraInputComponent;
//# sourceMappingURL=FreeCameraInputComponent.js.map