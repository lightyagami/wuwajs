"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var n = arguments.length;
  var h = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, o, i);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        h = (n < 3 ? s(h) : n > 3 ? s(e, o, h) : s(e, o)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, o, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelRotateComponent = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelRotateComponent = class UiModelRotateComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.nBr = 0;
    this.Rxe = false;
    this.hwe = undefined;
    this.sBr = undefined;
    this.aBr = false;
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
    this.hwe = Rotator_1.Rotator.Create();
  }
  SetRotateParam(t, e = 1, o = true) {
    this.nBr = t !== 0 ? MathCommon_1.MathCommon.RoundAngle / t : 0;
    this.sBr = e;
    this.aBr = o;
  }
  StartRotate() {
    this.Rxe = true;
    this.NeedTick = true;
  }
  StopRotate() {
    this.Rxe = false;
    this.NeedTick = false;
  }
  OnTick(t) {
    var e;
    if (!!this.Rxe && !(this.nBr <= 0)) {
      e = this.aBr ? 1 : -1;
      t = this.nBr * t * CommonDefine_1.MILLIONSECOND_PER_SECOND * e;
      if (this.sBr === 0) {
        this.hwe.Pitch = t;
      } else if (this.sBr === 1) {
        this.hwe.Yaw = t;
      } else if (this.sBr === 2) {
        this.hwe.Roll = t;
      }
      this.n$t.Actor.K2_AddActorLocalRotation(this.hwe.ToUeRotator(), false, undefined, false);
    }
  }
};
UiModelRotateComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(9)], UiModelRotateComponent);
exports.UiModelRotateComponent = UiModelRotateComponent; //# sourceMappingURL=UiModelRotateComponent.js.map