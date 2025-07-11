"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputAxisBinding = undefined;
const Info_1 = require("../../../Core/Common/Info");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputSettings_1 = require("../InputSettings");
class InputAxisBinding {
  constructor() {
    this.sEe = undefined;
    this.Lo = undefined;
    this.aEe = 0;
    this.tEe = [];
    this.iEe = [];
    this.rEe = [];
    this.Xih = 0;
    this.Yih = 0;
  }
  Initialize(t) {
    this.sEe = t.AxisName;
    this.Lo = t;
    this.aEe = this.Lo.AxisType;
    this.Xih = t.KeyboardVersion;
    this.Yih = t.GamepadVersion;
  }
  Clear() {
    this.sEe = undefined;
    this.aEe = 0;
    this.Lo = undefined;
    this.Xih = 0;
    this.Yih = 0;
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
  GetInputAxisKeyMap() {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe);
  }
  GetCurrentPlatformKey() {
    if (Info_1.Info.IsInKeyBoard()) {
      return this.GetPcKey();
    } else if (Info_1.Info.IsInGamepad()) {
      return this.GetGamepadKey();
    } else {
      return undefined;
    }
  }
  GetCurrentPlatformKeyNameList(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      this.GetPcKeyNameList(t);
    } else if (Info_1.Info.IsInGamepad()) {
      this.GetGamepadKeyNameList(t);
    }
  }
  GetCurrentPlatformKeyByIndex(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      return this.GetPcKeyByIndex(t);
    } else if (Info_1.Info.IsInGamepad()) {
      return this.GetGamepadKeyByIndex(t);
    } else {
      return undefined;
    }
  }
  GetPcKeyByIndex(t) {
    if (!(t >= this.tEe.length)) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, this.tEe[t]);
    }
  }
  GetPcKey() {
    for (const t of this.tEe) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t);
    }
  }
  GetGamepadKeyByIndex(t) {
    if (!(t >= this.iEe.length)) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, this.iEe[t]);
    }
  }
  GetGamepadKey() {
    for (const t of this.iEe) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t);
    }
  }
  GetPcKeyNameList(t) {
    for (const e of this.tEe) {
      t.push(e);
    }
  }
  GetGamepadKeyNameList(t) {
    for (const e of this.iEe) {
      t.push(e);
    }
  }
  GetPcKeyScaleMap(t) {
    for (const s of this.tEe) {
      var e = InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, s);
      if (e) {
        e = e.Scale;
        t.set(s, e);
      }
    }
    return t;
  }
  GetGamepadKeyScaleMap(t) {
    for (const s of this.iEe) {
      var e = InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, s);
      if (e) {
        e = e.Scale;
        t.set(s, e);
      }
    }
    return t;
  }
  GetKeyNameList(t) {
    for (const e of this.rEe) {
      t.push(e);
    }
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe).has(t);
  }
  HasAnyKey() {
    return this.rEe.length > 0;
  }
  GetKey(t) {
    var e = [];
    for (const s of InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe).values()) {
      if (s.Scale === t) {
        e.push(s);
      }
    }
    return e;
  }
  SetKeys(t) {
    InputSettings_1.InputSettings.SetAxisMapping(this.sEe, t);
    this.rEe.length = 0;
    for (const e of t.keys()) {
      this.rEe.push(e);
    }
    this.nEe();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAxisKeyChanged, this.sEe);
  }
  SetKeyboardKeys(t) {
    var e;
    var s;
    var i = new Map();
    for ([e, s] of t) {
      i.set(e, s);
    }
    this.GetGamepadKeyScaleMap(i);
    this.SetKeys(i);
  }
  SetGamepadKeys(t) {
    var e;
    var s;
    var i = new Map();
    for ([e, s] of t) {
      i.set(e, s);
    }
    this.GetPcKeyScaleMap(i);
    this.SetKeys(i);
  }
  RefreshKeys(e) {
    this.rEe.length = 0;
    for (let t = e.Num() - 1; t >= 0; t--) {
      var s = e.Get(t).Key.KeyName.toString();
      this.rEe.push(s);
    }
    this.nEe();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAxisKeyChanged, this.sEe);
  }
  AddKeys(t) {
    for (var [e, s] of t) {
      InputSettings_1.InputSettings.AddAxisMapping(this.sEe, e, s);
      this.rEe.push(e);
    }
    this.nEe();
  }
  RemoveKeys(t) {
    for (const s of t) {
      InputSettings_1.InputSettings.RemoveAxisMapping(this.sEe, s);
      var e = this.rEe.indexOf(s);
      this.rEe.splice(e, 1);
    }
    this.nEe();
  }
  RemoveKeysByCondition(t) {
    InputSettings_1.InputSettings.RemoveAxisMappingByCondition(this.sEe, t);
    this.nEe();
  }
  ClearAllKeys() {
    if (this.tEe) {
      this.tEe.length = 0;
    }
    if (this.iEe) {
      this.iEe.length = 0;
    }
    if (this.rEe) {
      this.rEe.length = 0;
    }
    InputSettings_1.InputSettings.ClearAxisMapping(this.sEe);
  }
  GetAxisMappingConfig() {
    return this.Lo;
  }
  GetAxisMappingType() {
    return this.aEe;
  }
  nEe() {
    if (this.tEe) {
      this.tEe.length = 0;
    }
    if (this.iEe) {
      this.iEe.length = 0;
    }
    if (this.rEe) {
      for (const e of this.rEe) {
        var t = InputSettings_1.InputSettings.GetKey(e);
        if (t) {
          if (t.IsKeyboardKey || t.IsMouseButton) {
            this.tEe.push(t.GetKeyName());
          } else if (t.IsGamepadKey) {
            this.iEe.push(e);
          }
        }
      }
    }
  }
}
exports.InputAxisBinding = InputAxisBinding;
//# sourceMappingURL=InputAxisBinding.js.map