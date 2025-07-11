"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var d = t.length - 1; d >= 0; d--) {
      if (o = t[d]) {
        n = (h < 3 ? o(n) : h > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelFadeComponent = undefined;
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelFadeComponent = class UiModelFadeComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this.FHt = 0;
    this.zwr = 0;
    this.gle = 0;
    this.r1t = 0;
    this.kJo = undefined;
    this.APn = false;
    this.FadeFinishCallBack = undefined;
  }
  OnCreate() {
    this.APn = false;
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
  }
  OnEnd() {
    if (this.NeedTick) {
      this.ywr?.SetDitherEffect(this.zwr);
    }
    this.APn = true;
    this.av();
  }
  Fade(t, e, i, s, o) {
    if (!this.APn) {
      this.FHt = t;
      this.zwr = e;
      this.r1t = i;
      this.kJo = s;
      this.gle = 0;
      this.NeedTick = true;
      this.FadeFinishCallBack = o;
      this.ywr?.SetDitherEffect(t);
    }
  }
  Tick(t) {
    this.gle += t * 1000;
    t = this.kJo.GetFloatValue(this.gle / this.r1t) * (this.zwr - this.FHt) + this.FHt;
    this.ywr?.SetDitherEffect(t);
    if (this.gle >= this.r1t) {
      this.NeedTick = false;
      this.av();
      this.FadeFinishCallBack?.();
    }
  }
  av() {
    this.FHt = 0;
    this.zwr = 0;
    this.r1t = 0;
    this.kJo = undefined;
    this.gle = 0;
  }
};
UiModelFadeComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(8)], UiModelFadeComponent);
exports.UiModelFadeComponent = UiModelFadeComponent; //# sourceMappingURL=UiModelFadeComponent.js.map