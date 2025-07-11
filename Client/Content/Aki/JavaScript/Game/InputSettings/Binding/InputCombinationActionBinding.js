"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCombinationActionBinding = undefined;
const Info_1 = require("../../../Core/Common/Info");
const InputSettings_1 = require("../InputSettings");
class InputCombinationActionBinding {
  constructor() {
    this.hEe = new Map();
    this.lEe = new Map();
    this.uEe = new Map();
    this.cEe = -0;
    this.ZMe = undefined;
    this.Xih = 0;
    this.Yih = 0;
  }
  Initialize(t, i) {
    this.ZMe = t;
    this.cEe = i;
  }
  Clear() {
    this.hEe = undefined;
    this.lEe = undefined;
    this.uEe = undefined;
    this.ZMe = undefined;
    this.Xih = 0;
    this.Yih = 0;
  }
  AddKey(t, i) {
    this.uEe.set(t, i);
    var e = InputSettings_1.InputSettings.GetKey(t);
    if (e && ((e.IsKeyboardKey || e.IsMouseButton) && this.hEe.set(t, i), e.IsGamepadKey)) {
      this.lEe.set(t, i);
    }
  }
  RemoveKey(t) {
    this.uEe.delete(t);
    this.hEe.delete(t);
    this.lEe.delete(t);
  }
  GetKeyMap(t) {
    for (var [i, e] of this.uEe) {
      t.set(i, e);
    }
  }
  IsValid() {
    return !!this.uEe && this.uEe.size > 0;
  }
  GetActionName() {
    return this.ZMe;
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
  GetCombinationActionKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationActionKeyMap(this.ZMe);
  }
  HasKeyboardCombinationAction() {
    return !!this.hEe && this.hEe.size > 0;
  }
  HasGamepadCombinationAction() {
    return !!this.lEe && this.lEe.size > 0;
  }
  GetSecondaryKeyValidTime() {
    return this.cEe;
  }
  GetPcKeyNameMap(t) {
    for (var [i, e] of this.hEe) {
      t.set(i, e);
    }
  }
  GetGamepadKeyNameMap(t) {
    for (var [i, e] of this.lEe) {
      t.set(i, e);
    }
  }
  GetGamepadKeyNameList(t) {
    for (var [i, e] of this.lEe) {
      t.push(i);
      t.push(e);
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
  GetSecondaryKeyNameByMainKey(t) {
    return this.uEe.get(t);
  }
}
exports.InputCombinationActionBinding = InputCombinationActionBinding;
//# sourceMappingURL=InputCombinationActionBinding.js.map