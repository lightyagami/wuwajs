"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteGroupContext = undefined;
const TimeUtil_1 = require("../../../Common/TimeUtil");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteGroupContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.ContextMap = undefined;
    this.MainQteContext = undefined;
    this.OnContextFail = t => {
      if (this.IsPending() && t && this.ContextMap?.has(t.QteId)) {
        this.QteFail();
      }
    };
    this.Type = 5;
  }
  OnClear() {
    if (this.ContextMap) {
      for (const t of this.ContextMap.values()) {
        t.Clear();
      }
      this.ContextMap = undefined;
    }
    this.MainQteContext = undefined;
  }
  GetConfig() {
    return (this.MainQteContext || this).Config;
  }
  OnQteSuccess() {
    if (this.ContextMap) {
      for (const t of this.ContextMap.values()) {
        t.QteSuccess();
      }
    }
  }
  OnQteFail() {
    if (this.ContextMap) {
      for (const t of this.ContextMap.values()) {
        t.QteFail();
      }
    }
  }
  CheckQteConditionMatch() {
    if (!this.ContextMap) {
      return true;
    }
    let t = true;
    var i = (this.GroupConfig?.ToleranceTime ?? 0) * TimeUtil_1.TimeUtil.InverseMillisecond;
    for (const o of this.ContextMap.values()) {
      if (!o.CheckQteConditionMatch() || !o.CheckQteSuccessInTime(i)) {
        t = false;
        break;
      }
    }
    return t;
  }
  CheckQteConditionAndDoSuccess() {
    return !!this.CheckQteConditionMatch() && (this.QteSuccess(), true);
  }
  AddContext(t, i, o) {
    this.ContextMap ||= new Map();
    this.ContextMap.set(t, i);
    if (o) {
      this.MainQteContext = i;
    }
  }
}
exports.CommonQteGroupContext = CommonQteGroupContext;
//# sourceMappingURL=CommonQteGroupContext.js.map