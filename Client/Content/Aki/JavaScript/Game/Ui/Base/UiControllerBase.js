"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiControllerBase = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class UiControllerBase extends ControllerBase_1.ControllerBase {
  static Init() {
    var e = super.Init();
    this.OnRegisterNetEvent();
    this.OnAddEvents();
    this.OnAddOpenViewCheckFunction();
    return e;
  }
  static Clear() {
    this.OnUnRegisterNetEvent();
    this.OnRemoveEvents();
    this.OnRemoveOpenViewCheckFunction();
    return super.Clear();
  }
  static OnRegisterNetEvent() {}
  static OnUnRegisterNetEvent() {}
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static OnAddOpenViewCheckFunction() {}
  static OnRemoveOpenViewCheckFunction() {}
}
exports.UiControllerBase = UiControllerBase;
//# sourceMappingURL=UiControllerBase.js.map