"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCombinationAxisBinding = undefined;
const Info_1 = require("../../../Core/Common/Info");
const InputSettings_1 = require("../InputSettings");
class InputCombinationAxisBinding {
  constructor() {
    this.Mne = 0;
    this.hEe = new Map();
    this.lEe = new Map();
    this.uEe = new Map();
    this.sEe = undefined;
    this.Lo = undefined;
    this.aEe = 0;
    this.mEe = undefined;
    this.Xih = 0;
    this.Yih = 0;
  }
  Initialize(t) {
    this.Mne = t.Id;
    this.sEe = t.AxisName;
    this.Lo = t;
    this.aEe = this.Lo.AxisType;
    this.mEe = this.Lo.SecondaryKeyScaleMap;
    for (var [i, s] of t.PcKeyMap) {
      this.uEe.set(i, s);
    }
    for (var [e, r] of t.GamepadKeyMap) {
      this.uEe.set(e, r);
    }
    this.Xih = t.KeyboardVersion;
    this.Yih = t.GamepadVersion;
    this.dEe();
  }
  Clear() {
    this.hEe = undefined;
    this.lEe = undefined;
    this.uEe = undefined;
    this.sEe = undefined;
    this.aEe = 0;
    this.Lo = undefined;
    this.Xih = 0;
    this.Yih = 0;
  }
  dEe() {
    this.hEe.clear();
    this.lEe.clear();
    for (var [t, i] of this.uEe) {
      var s = InputSettings_1.InputSettings.GetKey(i);
      if (s && ((s.IsKeyboardKey || s.IsMouseButton) && this.hEe.set(t, i), s.IsGamepadKey)) {
        this.lEe.set(t, i);
      }
    }
  }
  GetAxisName() {
    return this.sEe;
  }
  SetKeyboardVersion(t) {
    this.Xih = t;
  }
  GetKeyboardVersion() {
    return this.Xih;
  }
  SetGamepadVersion(t) {
    this.Yih = t;
  }
  GetGamepadVersion() {
    return this.Yih;
  }
  GetCombinationAxisKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationAxisKeyMap(this.sEe);
  }
  HasKeyboardCombinationAxis() {
    return !!this.hEe && this.hEe.size > 0;
  }
  HasGamepadCombinationAxis() {
    return !!this.lEe && this.lEe.size > 0;
  }
  GetAxisMappingType() {
    return this.aEe;
  }
  GetSourceAxisValue(t) {
    return this.mEe.get(t);
  }
  GetConfigId() {
    return this.Mne;
  }
  GetPcKeyNameMap(t) {
    for (var [i, s] of this.hEe) {
      t.set(i, s);
    }
  }
  GetGamepadKeyNameMap(t) {
    for (var [i, s] of this.lEe) {
      t.set(i, s);
    }
  }
  GetKeyMap(t) {
    for (var [i, s] of this.uEe) {
      t.set(i, s);
    }
  }
  GetCurrentPlatformKeyNameMap(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      this.GetPcKeyNameMap(t);
    } else if (Info_1.Info.IsInGamepad()) {
      this.GetGamepadKeyNameMap(t);
    }
  }
  HasKey(t, i) {
    return this.uEe.get(t) === i;
  }
}
exports.InputCombinationAxisBinding = InputCombinationAxisBinding;
//# sourceMappingURL=InputCombinationAxisBinding.js.map