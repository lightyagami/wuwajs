"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControllerWithAssistantBase = undefined;
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
class ControllerWithAssistantBase extends ControllerBase_1.ControllerBase {
  static Init() {
    var t = super.Init();
    this.OnRegisterNetEvent();
    this.OnAddEvents();
    return t;
  }
  static Clear() {
    this.OnUnRegisterNetEvent();
    this.OnRemoveEvents();
    return super.Clear();
  }
  static OnInit() {
    this.F$t();
    return true;
  }
  static OnClear() {
    this.V$t();
    return super.OnClear();
  }
  static OnRegisterNetEvent() {
    this.H$t();
  }
  static OnUnRegisterNetEvent() {
    this.j$t();
  }
  static OnAddEvents() {
    this.W$t();
  }
  static OnRemoveEvents() {
    this.K$t();
  }
  static F$t() {
    this.Assistants = new Map();
    this.RegisterAssistant();
  }
  static RegisterAssistant() {}
  static V$t() {
    if (this.Assistants) {
      for (var [, t] of this.Assistants) {
        t.Destroy();
      }
      this.Assistants.clear();
      this.Assistants = undefined;
    }
  }
  static H$t() {
    if (this.Assistants) {
      for (var [, t] of this.Assistants) {
        t.OnRegisterNetEvent();
      }
    }
  }
  static j$t() {
    if (this.Assistants) {
      for (var [, t] of this.Assistants) {
        t.OnUnRegisterNetEvent();
      }
    }
  }
  static W$t() {
    if (this.Assistants) {
      for (var [, t] of this.Assistants) {
        t.OnAddEvents();
      }
    }
  }
  static K$t() {
    if (this.Assistants) {
      for (var [, t] of this.Assistants) {
        t.OnRemoveEvents();
      }
    }
  }
  static AddAssistant(t, s) {
    if (s) {
      s.Init();
      this.Assistants.set(t, s);
    }
  }
}
(exports.ControllerWithAssistantBase = ControllerWithAssistantBase).Assistants = undefined;
//# sourceMappingURL=ControllerWithAssistantBase.js.map