"use strict";

var _StateRef_Group;
var _StateRef_State;
var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (t, e, a, r, i) {
  if (r === "m") {
    throw new TypeError("Private method is not writable");
  }
  if (r === "a" && !i) {
    throw new TypeError("Private accessor was defined without a setter");
  }
  if (typeof e == "function" ? t === e && i : e.has(t)) {
    if (r === "a") {
      i.call(t, a);
    } else if (i) {
      i.value = a;
    } else {
      e.set(t, a);
    }
    return a;
  }
  throw new TypeError("Cannot write private member to an object whose class did not declare it");
};
var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (t, e, a, r) {
  if (a === "a" && !r) {
    throw new TypeError("Private accessor was defined without a getter");
  }
  if (typeof e == "function" ? t === e && r : e.has(t)) {
    if (a === "m") {
      return r;
    } else if (a === "a") {
      return r.call(t);
    } else if (r) {
      return r.value;
    } else {
      return e.get(t);
    }
  }
  throw new TypeError("Cannot read private member from an object whose class did not declare it");
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateRef = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
class StateRef {
  constructor(t, e) {
    _StateRef_Group.set(this, undefined);
    _StateRef_State.set(this, undefined);
    __classPrivateFieldSet(this, _StateRef_Group, t, "f");
    __classPrivateFieldSet(this, _StateRef_State, e, "f");
  }
  get State() {
    return __classPrivateFieldGet(this, _StateRef_State, "f");
  }
  set State(t) {
    if (__classPrivateFieldGet(this, _StateRef_State, "f") !== t) {
      __classPrivateFieldSet(this, _StateRef_State, t, "f");
      AudioSystem_1.AudioSystem.SetState(__classPrivateFieldGet(this, _StateRef_Group, "f"), __classPrivateFieldGet(this, _StateRef_State, "f"));
    }
  }
  ClearObject() {
    return true;
  }
}
exports.StateRef = StateRef;
_StateRef_Group = new WeakMap();
_StateRef_State = new WeakMap(); //# sourceMappingURL=StateRef.js.map