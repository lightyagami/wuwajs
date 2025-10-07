"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, s);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (o = e[r]) {
        n = (h < 3 ? o(n) : h > 3 ? o(t, i, n) : o(t, i)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelFadeComponent = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
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
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
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
  Fade(t, i, s, e, o) {
    if (!this.APn) {
      this.av();
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
        if (e) {
          this.UYd(t, i, s, e, o);
        }
      });
    }
  }
  UYd(e, t, i, s, o) {
    if (!this.APn) {
      this.FHt = e;
      this.zwr = t;
      this.r1t = i;
      this.kJo = s;
      this.gle = 0;
      this.NeedTick = true;
      this.FadeFinishCallBack = o;
      this.ywr?.SetDitherEffect(e);
    }
  }
  Tick(e) {
    this.gle += e * 1000;
    if (this.kJo) {
      e = this.kJo.GetFloatValue(this.gle / this.r1t) * (this.zwr - this.FHt) + this.FHt;
      this.ywr?.SetDitherEffect(e);
    }
    if (this.gle >= this.r1t) {
      this.FadeFinishCallBack?.();
      this.av();
    }
  }
  X3i() {
    if (this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
    }
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
  }
  av() {
    this.FHt = 0;
    this.zwr = 0;
    this.r1t = 0;
    this.kJo = undefined;
    this.gle = 0;
    this.NeedTick = false;
    this.FadeFinishCallBack = undefined;
    this.X3i();
  }
};
UiModelFadeComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(8)], UiModelFadeComponent);
exports.UiModelFadeComponent = UiModelFadeComponent; //# sourceMappingURL=UiModelFadeComponent.js.map