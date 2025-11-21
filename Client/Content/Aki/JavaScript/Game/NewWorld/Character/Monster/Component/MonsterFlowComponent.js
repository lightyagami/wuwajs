"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var s = arguments.length;
  var i = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, n);
  } else {
    for (var c = e.length - 1; c >= 0; c--) {
      if (r = e[c]) {
        i = (s < 3 ? r(i) : s > 3 ? r(t, o, i) : r(t, o)) || i;
      }
    }
  }
  if (s > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterFlowComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent");
let MonsterFlowComponent = class MonsterFlowComponent extends CharacterFlowComponent_1.CharacterFlowComponent {
  constructor() {
    super(...arguments);
    this.Stn = undefined;
    this.I5r = undefined;
  }
  OnStart() {
    this.I5r = this.Entity.GetComponent(179);
    this.Stn = this.Entity.GetComponent(125);
    super.OnStart();
    return true;
  }
  InitFlowLogicRange(e, t) {
    return !!super.InitFlowLogicRange(e, t) && (this.Stn?.SetLogicRange(t ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE), true);
  }
  CheckCondition() {
    return !!super.CheckCondition() && !!this.Stn && (this.Stn.IsInLogicRange && !this.I5r.IsInFightState() || (this.ForceStopFlow(), false));
  }
};
MonsterFlowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(186)], MonsterFlowComponent);
exports.MonsterFlowComponent = MonsterFlowComponent; //# sourceMappingURL=MonsterFlowComponent.js.map