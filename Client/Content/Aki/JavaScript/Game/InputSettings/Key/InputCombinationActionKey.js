"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCombinationActionKey = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const InputSettings_1 = require("../InputSettings");
class InputCombinationActionKey {
  constructor() {
    this.ActionName = "";
    this.MainKeyName = "";
    this.SecondaryKeyName = "";
  }
  static New(t, e, n) {
    var i = new InputCombinationActionKey();
    i.ActionName = t;
    i.MainKeyName = e;
    i.SecondaryKeyName = n;
    return i;
  }
  GetMainKey() {
    return InputSettings_1.InputSettings.GetKey(this.MainKeyName);
  }
  GetSecondaryKey() {
    return InputSettings_1.InputSettings.GetKey(this.SecondaryKeyName);
  }
  MainKeyToUeInputActionKeyMapping() {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActionName);
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.MainKeyName);
    var e = new UE.Key(e);
    return new UE.InputActionKeyMapping(t, false, false, false, false, e);
  }
  SecondaryKeyToUeInputActionKeyMapping() {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActionName);
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.SecondaryKeyName);
    var e = new UE.Key(e);
    return new UE.InputActionKeyMapping(t, false, false, false, false, e);
  }
}
exports.InputCombinationActionKey = InputCombinationActionKey;
//# sourceMappingURL=InputCombinationActionKey.js.map