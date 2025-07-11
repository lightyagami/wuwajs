"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputKeyDisplayData = undefined;
const InputSettings_1 = require("./InputSettings");
class InputKeyDisplayData {
  constructor() {
    this.ActionOrAxisName = undefined;
    this.KeyNameList = [];
    this.KeyNameMap = new Map();
    this.IsCombination = false;
  }
  RefreshInput(t, s) {
    this.ActionOrAxisName = t;
    this.KeyNameList = s;
    this.IsCombination = false;
  }
  RefreshCombinationInput(t, s) {
    this.ActionOrAxisName = t;
    this.KeyNameMap = s;
    this.IsCombination = true;
  }
  GetDisplayKeyNameList(t = 0) {
    if (this.KeyNameMap.size > 0) {
      for (var [s, i] of this.KeyNameMap) {
        return [s, i];
      }
    }
    if (this.KeyNameList.length > 0) {
      return [this.KeyNameList[t]];
    }
  }
  GetDisplayKeyIconPathList(t = 0) {
    t = this.GetDisplayKeyNameList(t);
    if (t !== undefined) {
      var s = [];
      for (const e of t) {
        var i = InputSettings_1.InputSettings.GetKey(e);
        s.push(i?.GetKeyIconPath() ?? "");
      }
      return s;
    }
  }
  IsValid() {
    return this.ActionOrAxisName !== undefined;
  }
  Reset() {
    this.ActionOrAxisName = undefined;
    this.KeyNameList = [];
    this.KeyNameMap.clear();
  }
}
exports.InputKeyDisplayData = InputKeyDisplayData;
//# sourceMappingURL=InputKeyDisplayData.js.map