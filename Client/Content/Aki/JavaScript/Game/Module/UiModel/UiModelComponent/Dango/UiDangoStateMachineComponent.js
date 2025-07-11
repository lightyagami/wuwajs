"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var s = arguments.length;
  var h = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        h = (s < 3 ? o(h) : s > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (s > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiDangoStateMachineComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiDangoStateMachineComponent = class UiDangoStateMachineComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.sp1 = 0;
    this.BS1 = 0;
    this.RU1 = 0;
    this.ywr = undefined;
    this.n$t = undefined;
    this.OnDangoMeshLoadComplete = () => {
      this.m8();
    };
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
    this.n$t = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnDangoMeshLoadComplete);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnDangoMeshLoadComplete);
  }
  SetState(e, t = 0, i = 0) {
    this.sp1 = e;
    this.BS1 = t;
    this.RU1 = i;
    this.m8();
  }
  m8() {
    if (this.ywr.GetModelLoadState() === 2) {
      var e = this.GetDangoBp();
      switch (this.sp1) {
        case 1:
          e?.StartActionPerform(this.BS1);
          break;
        case 2:
          e?.StartJumpWithParams(this.BS1, this.RU1);
      }
    }
  }
  GetDangoBp() {
    var e = this.n$t?.MainMeshComponent;
    if (e) {
      return this.n$t?.GetDangoAnimInstanceFromSkeletalMesh(e);
    }
  }
};
UiDangoStateMachineComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(27)], UiDangoStateMachineComponent);
exports.UiDangoStateMachineComponent = UiDangoStateMachineComponent; //# sourceMappingURL=UiDangoStateMachineComponent.js.map