"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, o, i);
  } else {
    for (var c = t.length - 1; c >= 0; c--) {
      if (s = t[c]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, o, n) : s(e, o)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockComponent = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let LockComponent = class LockComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.inn = undefined;
    this.u1t = undefined;
    this.onn = 0;
  }
  OnStart() {
    this.inn = this.Entity.GetComponent(206);
    this.u1t = this.Entity.GetComponent(0);
    var t = this.u1t.GetEntityEnterComponentState();
    if (t !== undefined) {
      switch (t) {
        case Protocol_1.Aki.Protocol.U3s.Proto_NotUnlock:
          this.onn = -421801185;
          break;
        case Protocol_1.Aki.Protocol.U3s.Proto_Unlockable:
          this.onn = 1960897308;
          break;
        case Protocol_1.Aki.Protocol.U3s.Proto_Unlocked:
          this.onn = 1196894179;
          break;
        default:
          this.onn = -421801185;
      }
    }
    this.onn ||= -421801185;
    this.inn.AddTag(this.onn);
    return true;
  }
  ChangeLockTag(t) {
    var e = this.onn;
    this.onn = t;
    this.inn.ChangeLocalLevelTag(this.onn, e);
  }
};
LockComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(112)], LockComponent);
exports.LockComponent = LockComponent; //# sourceMappingURL=LockComponent.js.map