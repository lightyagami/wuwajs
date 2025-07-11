"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = exports.tryCatchWrapper = exports.filterResult = exports.filterTypePriority = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Criteria_1 = require("./Criteria");
function tryCatchWrapper(t, e, r) {
  try {
    return t();
  } catch (t) {
    if (t instanceof Error) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("FilterWithState", 72, e, t, ["debugValue", r], ["error", t.message]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FilterWithState", 72, e, ["debugValue", r], ["error", t]);
    }
  }
}
exports.filterTypePriority = [0, 1, 2];
exports.filterResult = {
  [0]: true,
  1: true,
  2: false
};
exports.tryCatchWrapper = tryCatchWrapper;
class Filter {
  constructor() {
    this.TargetCriteriaInternal = Criteria_1.alwaysTrueCriteria;
    this.FilterType = 2;
  }
  get Criteria() {
    return this.TargetCriteriaInternal;
  }
  set Criteria(t) {
    this.TargetCriteriaInternal = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FilterCriteriaChanged, this);
  }
  Init() {
    tryCatchWrapper(this.OnInit.bind(this), "[Filter] OnInit执行出错", this.constructor.name);
  }
  OnInit() {}
  Cleanup() {
    tryCatchWrapper(this.OnInit.bind(this), "[Filter] OnCleanup执行出错", this.constructor.name);
  }
  OnCleanup() {}
  ExecuteCriteria(e) {
    try {
      return this.TargetCriteriaInternal(e);
    } catch (t) {
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("FilterWithState", 72, "业务层执行过滤器的判定标准的时候异常", t, ["target", e], ["error", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FilterWithState", 72, "业务层执行过滤器的判定标准的时候异常, 并且捕获的不是Error", ["target", e]);
      }
    }
    return false;
  }
}
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map