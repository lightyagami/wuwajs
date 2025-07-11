"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var s = arguments.length;
  var h = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, n);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (o = e[r]) {
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
exports.UiRoleStateMachineComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleStateMachineComponent = class UiRoleStateMachineComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this.n$t = undefined;
    this.Ndo = 0;
    this.vBr = false;
    this.MBr = false;
    this.EBr = false;
    this.OnRoleMeshLoadComplete = () => {
      this.SBr();
      this.m8();
    };
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
    this.n$t = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
  }
  SetState(e, t = false, i = false, n = false) {
    this.Ndo = e;
    this.vBr = t;
    this.EBr = i;
    this.MBr = n;
    this.m8();
  }
  m8() {
    var e;
    if (this.ywr.GetModelLoadState() === 2) {
      e = this.n$t.MainMeshComponent;
      this.n$t.GetAnimInstanceFromSkeletalMesh(e)?.SetState(this.Ndo, this.vBr, this.EBr, this.MBr);
    }
  }
  SBr() {
    var e = this.n$t.MainMeshComponent;
    var e = this.n$t.GetAnimInstanceFromSkeletalMesh(e);
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRolePerformanceDelayTime();
    e?.SetPerformDelay(t);
  }
};
UiRoleStateMachineComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(16)], UiRoleStateMachineComponent);
exports.UiRoleStateMachineComponent = UiRoleStateMachineComponent; //# sourceMappingURL=UiRoleStateMachineComponent.js.map