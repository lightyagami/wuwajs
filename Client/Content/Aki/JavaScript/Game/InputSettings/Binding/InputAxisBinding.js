"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputAxisBinding = undefined;
const Info_1 = require("../../../Core/Common/Info");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputSettings_1 = require("../InputSettings");
const InputBindingDefine_1 = require("./InputBindingDefine");
class InputAxisBinding {
  constructor() {
    this.sEe = undefined;
    this.Lo = undefined;
    this.aEe = 0;
    this.tEe = [];
    this.iEe = [];
    this.rEe = [];
    this.s_f = new Map();
    this.a_f = new Map();
    this.h_f = new Map();
    this.l_f = new Map();
    this.__f = new Map();
    this.UWf = 0;
    this.d_f = 0;
  }
  Initialize(t) {
    this.sEe = t.AxisName;
    this.Lo = t;
    this.aEe = this.Lo.AxisType;
    this.d_f = t.ExclusiveType;
    this.UWf = t.ExclusiveType;
    for (var [e, i] of t.KeyboardVersionMap) {
      this.s_f.set(e, i);
    }
    for (var [s, n] of t.GamepadVersionMap) {
      this.a_f.set(s, n);
    }
  }
  Clear() {
    this.sEe = undefined;
    this.aEe = 0;
    this.Lo = undefined;
    this.l_f.clear();
    this.__f.clear();
  }
  GetAxisName() {
    return this.sEe;
  }
  SetKeyboardVersion(t, e) {
    this.s_f.set(e, t);
  }
  GetKeyboardVersion(t) {
    return this.s_f.get(t) ?? 0;
  }
  SetGamepadVersion(t, e) {
    this.a_f.set(e, t);
  }
  GetGamepadVersion(t) {
    return this.a_f.get(t) ?? 0;
  }
  GetAllInputAxisKeyMap() {
    return InputSettings_1.InputSettings.GetInputAxisKeyMapByBindingType(this.sEe);
  }
  GetInputAxisKeyMap(t) {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe, t);
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
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, this.tEe[t], this.d_f);
    }
  }
  GetPcKey() {
    for (const t of this.tEe) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t, this.d_f);
    }
  }
  GetGamepadKeyByIndex(t) {
    if (!(t >= this.iEe.length)) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, this.iEe[t], this.d_f);
    }
  }
  GetGamepadKey() {
    for (const t of this.iEe) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t, this.d_f);
    }
  }
  GetPcKeyNameList(t) {
    for (const e of this.tEe) {
      t.push(e);
    }
  }
  GetPcKeyNameMapByBindingType(t, e) {
    var i;
    var s;
    for ([i, s] of this.l_f.get(e) ?? new Map()) {
      t.set(i, s);
    }
  }
  GetGamepadKeyNameList(t) {
    for (const e of this.iEe) {
      t.push(e);
    }
  }
  GetGamepadKeyNameMapByBindingType(t, e) {
    var i;
    var s;
    for ([i, s] of this.__f.get(e) ?? new Map()) {
      t.set(i, s);
    }
  }
  GetAllPcKeyScaleMap(t) {
    for (var [e, i] of this.l_f) {
      t.set(e, i);
    }
  }
  GetPcKeyScaleMap(t, e) {
    var i;
    var s;
    for ([i, s] of this.l_f.get(e) ?? new Map()) {
      t.set(i, s);
    }
    return t;
  }
  GetAllGamepadKeyScaleMap(t) {
    for (var [e, i] of this.__f) {
      t.set(e, i);
    }
  }
  GetGamepadKeyScaleMap(t, e) {
    var i;
    var s;
    for ([i, s] of this.__f.get(e) ?? new Map()) {
      t.set(i, s);
    }
    return t;
  }
  GetKeyNameList(t) {
    for (const e of this.rEe) {
      t.push(e);
    }
  }
  GetKeyNameListByBindingType(t, e) {
    var i;
    for ([i] of this.h_f.get(e) ?? new Map()) {
      t.push(i);
    }
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe, this.d_f).has(t);
  }
  HasAnyKey() {
    return this.rEe.length > 0;
  }
  GetKey(t, e) {
    var i = [];
    for (const s of InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe, e).values()) {
      if (s.Scale === t) {
        i.push(s);
      }
    }
    return i;
  }
  SwitchKeysByBindingType(t) {
    var e = this.l_f.get(t) ?? this.l_f.get(0);
    var i = this.__f.get(t) ?? this.__f.get(0);
    var s = new Map();
    if (e) {
      for (var [n, r] of e) {
        s.set(n, r);
      }
    }
    if (i) {
      for (var [h, a] of i) {
        s.set(h, a);
      }
    }
    if (s) {
      this.d_f = t;
      this.SetKeys(s, t);
      this.UWf = this.d_f;
    }
  }
  SetKeys(t, e) {
    this.h_f.set(e, t);
    if (this.d_f === e) {
      InputSettings_1.InputSettings.SetAxisMapping(this.sEe, t, this.UWf, e);
      this.rEe = Array.from(t.keys());
      this.nEe();
    } else {
      InputSettings_1.InputSettings.SetAxisMappingWithoutInputSettings(this.sEe, t, e);
      this.u_f(e);
    }
  }
  SetAllKeys(t) {
    for (const e of this.h_f.keys()) {
      this.SetKeys(t, e);
    }
  }
  SetKeyboardKeys(t, e) {
    var i;
    var s;
    var n = new Map();
    for ([i, s] of t) {
      n.set(i, s);
    }
    this.GetGamepadKeyScaleMap(n, e);
    this.SetKeys(n, e);
  }
  SetKeyboardKeysWithoutOriginal(t) {
    for (const e of InputBindingDefine_1.inputBindingTypesArray) {
      if (e !== 0) {
        this.SetKeyboardKeys(t, e);
      }
    }
  }
  SetGamepadKeys(t, e) {
    var i;
    var s;
    var n = new Map();
    for ([i, s] of t) {
      n.set(i, s);
    }
    this.GetPcKeyScaleMap(n, e);
    this.SetKeys(n, e);
  }
  SetGamepadKeysWithoutOriginal(t) {
    for (const e of this.l_f.keys()) {
      if (e !== 0) {
        this.SetGamepadKeys(t, e);
      }
    }
  }
  RefreshKeys(e, t) {
    var i = this.m_f(t);
    i.clear();
    for (let t = e.Num() - 1; t >= 0; t--) {
      var s = e.Get(t);
      var n = s.Key.KeyName.toString();
      i.set(n, s.Scale);
    }
    if (this.d_f === t) {
      this.rEe = Array.from(i.keys());
      this.nEe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAxisKeyChanged, this.sEe);
    } else {
      this.u_f(t);
    }
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
  GetKeyNameListToBindingTypeMap() {
    return this.h_f;
  }
  GetCopyKeyNameListToBindingTypeMap() {
    return new Map(this.h_f);
  }
  u_f(t) {
    let e = new Map();
    let i = new Map();
    var s = this.h_f.get(t) ?? new Map();
    if (s) {
      for (var [n, r] of s) {
        var h = InputSettings_1.InputSettings.GetKey(n);
        if (h) {
          if (h.IsKeyboardKey || h.IsMouseButton) {
            e.set(n, r);
          } else if (h.IsGamepadKey || h.IsPcPsTouchPadKey) {
            i.set(n, r);
          }
        }
      }
      if (!this.l_f.has(t) && e.size === 0) {
        e = this.l_f.get(0) ?? new Map();
      }
      s = this.__f.has(t);
      if (!s && i.size === 0) {
        i = this.__f.get(0) ?? new Map();
      }
      if (this.d_f === t) {
        this.tEe.length = 0;
        for (var [a] of e) {
          this.tEe.push(a);
        }
        this.iEe.length = 0;
        for (var [o] of i) {
          this.iEe.push(o);
        }
      }
      this.l_f.set(t, e);
      this.__f.set(t, i);
    }
  }
  nEe() {
    this.u_f(this.d_f);
  }
  m_f(t) {
    let e = this.h_f.get(t);
    if (!e) {
      e = new Map();
      this.h_f.set(t, e);
    }
    return e;
  }
}
exports.InputAxisBinding = InputAxisBinding;
//# sourceMappingURL=InputAxisBinding.js.map