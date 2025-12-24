"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputAxisKey = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const InputSettings_1 = require("../InputSettings");
class InputAxisKey {
  constructor() {
    this.AxisName = "";
    this.Scale = -0;
    this.KeyName = "";
    this.UeAxisName = undefined;
    this.UeKeyName = undefined;
    this.UeKey = undefined;
    this.UeInputAxisKeyMapping = undefined;
  }
  CreateUeData() {
    this.UeAxisName = FNameUtil_1.FNameUtil.GetDynamicFName(this.AxisName);
    this.UeKeyName = FNameUtil_1.FNameUtil.GetDynamicFName(this.KeyName);
    this.UeKey = new UE.Key(this.UeKeyName);
    this.UeInputAxisKeyMapping = new UE.InputAxisKeyMapping(this.UeAxisName, this.Scale, this.UeKey);
  }
  static New(t, e, i) {
    var s = new InputAxisKey();
    s.AxisName = t;
    s.Scale = e;
    s.KeyName = i;
    s.CreateUeData();
    return s;
  }
  static NewByInputAxisKeyMapping(t) {
    var e = new InputAxisKey();
    e.AxisName = t.AxisName.toString();
    e.Scale = t.Scale;
    e.KeyName = t.Key.KeyName.toString();
    e.CreateUeData();
    return e;
  }
  static Refresh(t, e, i, s) {
    t.AxisName = e;
    t.Scale = i;
    t.KeyName = s;
    t.UeAxisName = FNameUtil_1.FNameUtil.GetDynamicFName(e);
    t.UeKeyName = FNameUtil_1.FNameUtil.GetDynamicFName(s);
    t.UeKey.KeyName = t.UeKeyName;
    t.UeInputAxisKeyMapping.AxisName = t.UeAxisName;
    t.UeInputAxisKeyMapping.Scale = i;
    t.UeInputAxisKeyMapping.Key = t.UeKey;
  }
  ToUeInputAxisKeyMapping() {
    return this.UeInputAxisKeyMapping;
  }
  GetKey() {
    return InputSettings_1.InputSettings.GetKey(this.KeyName);
  }
  GetKeyIconPath() {
    return this.GetKey()?.GetKeyIconPath() ?? "";
  }
  IsEqual(t) {
    return this.AxisName === t.AxisName.toString() && this.KeyName === t.Key.KeyName.toString() && this.Scale === t.Scale;
  }
}
exports.InputAxisKey = InputAxisKey;
//# sourceMappingURL=InputAxisKey.js.map