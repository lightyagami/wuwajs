"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputActionKey = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const InputSettings_1 = require("../InputSettings");
class InputActionKey {
  constructor() {
    this.ActionName = "";
    this.IsAlt = false;
    this.IsCmd = false;
    this.IsCtrl = false;
    this.IsShift = false;
    this.KeyName = "";
    this.UeActionName = undefined;
    this.UeKeyName = undefined;
    this.UeKey = undefined;
    this.UeInputActionKeyMapping = undefined;
  }
  CreateUeData() {
    this.UeActionName = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActionName);
    this.UeKeyName = FNameUtil_1.FNameUtil.GetDynamicFName(this.KeyName);
    this.UeKey = new UE.Key(this.UeKeyName);
    this.UeInputActionKeyMapping = new UE.InputActionKeyMapping(this.UeActionName, this.IsShift, this.IsCtrl, this.IsAlt, this.IsCmd, this.UeKey);
  }
  static New(t, i, e, s, h, n) {
    var r = new InputActionKey();
    r.ActionName = t;
    r.IsShift = i;
    r.IsCtrl = e;
    r.IsAlt = s;
    r.IsCmd = h;
    r.KeyName = n;
    r.CreateUeData();
    return r;
  }
  static NewByInputActionKeyMapping(t) {
    var i = new InputActionKey();
    i.ActionName = t.ActionName.toString();
    i.IsShift = t.bShift;
    i.IsCtrl = t.bCtrl;
    i.IsAlt = t.bAlt;
    i.IsCmd = t.bCmd;
    i.KeyName = t.Key.KeyName.toString();
    i.CreateUeData();
    return i;
  }
  static Refresh(t, i, e, s, h, n, r) {
    t.ActionName = i;
    t.IsShift = e;
    t.IsCtrl = s;
    t.IsAlt = h;
    t.IsCmd = n;
    t.KeyName = r;
    t.UeActionName = FNameUtil_1.FNameUtil.GetDynamicFName(i);
    t.UeKeyName = FNameUtil_1.FNameUtil.GetDynamicFName(r);
    t.UeKey.KeyName = t.UeKeyName;
    t.UeInputActionKeyMapping.ActionName = t.UeActionName;
    t.UeInputActionKeyMapping.bShift = e;
    t.UeInputActionKeyMapping.bCtrl = s;
    t.UeInputActionKeyMapping.bAlt = h;
    t.UeInputActionKeyMapping.bCmd = n;
    t.UeInputActionKeyMapping.Key = t.UeKey;
  }
  ToUeInputActionKeyMapping() {
    return this.UeInputActionKeyMapping;
  }
  GetKey() {
    return InputSettings_1.InputSettings.GetKey(this.KeyName);
  }
  GetKeyIconPath() {
    return this.GetKey()?.GetKeyIconPath() ?? "";
  }
  IsEqual(t) {
    return this.ActionName === t.ActionName.toString() && this.KeyName === t.Key.KeyName.toString() && this.IsAlt === t.bAlt && this.IsCmd === t.bCmd && this.IsCtrl === t.bCtrl && this.IsShift === t.bShift;
  }
}
exports.InputActionKey = InputActionKey;
//# sourceMappingURL=InputActionKey.js.map