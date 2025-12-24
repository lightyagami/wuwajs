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
    this.Vhf = new Map();
    this.Hhf = new Map();
    this.jhf = new Map();
    this.$hf = new Map();
    this.Whf = new Map();
    this.r5f = 0;
    this.Xhf = 0;
  }
  Initialize(t) {
    this.sEe = t.AxisName;
    this.Lo = t;
    this.aEe = this.Lo.AxisType;
    this.Xhf = t.ExclusiveType;
    this.r5f = t.ExclusiveType;
    for (var [e, i] of t.KeyboardVersionMap) {
      this.Vhf.set(e, i);
    }
    for (var [s, n] of t.GamepadVersionMap) {
      this.Hhf.set(s, n);
    }
  }
  Clear() {
    this.sEe = undefined;
    this.aEe = 0;
    this.Lo = undefined;
    this.$hf.clear();
    this.Whf.clear();
  }
  GetAxisName() {
    return this.sEe;
  }
  SetKeyboardVersion(t, e) {
    this.Vhf.set(e, t);
  }
  GetKeyboardVersion(t) {
    return this.Vhf.get(t) ?? 0;
  }
  SetGamepadVersion(t, e) {
    this.Hhf.set(e, t);
  }
  GetGamepadVersion(t) {
    return this.Hhf.get(t) ?? 0;
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
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, this.tEe[t], this.Xhf);
    }
  }
  GetPcKey() {
    for (const t of this.tEe) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t, this.Xhf);
    }
  }
  GetGamepadKeyByIndex(t) {
    if (!(t >= this.iEe.length)) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, this.iEe[t], this.Xhf);
    }
  }
  GetGamepadKey() {
    for (const t of this.iEe) {
      return InputSettings_1.InputSettings.GetInputAxisKey(this.sEe, t, this.Xhf);
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
    for ([i, s] of this.$hf.get(e) ?? new Map()) {
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
    for ([i, s] of this.Whf.get(e) ?? new Map()) {
      t.set(i, s);
    }
  }
  GetAllPcKeyScaleMap(t) {
    for (var [e, i] of this.$hf) {
      t.set(e, i);
    }
  }
  GetPcKeyScaleMap(t, e) {
    var i;
    var s;
    for ([i, s] of this.$hf.get(e) ?? new Map()) {
      t.set(i, s);
    }
    return t;
  }
  GetAllGamepadKeyScaleMap(t) {
    for (var [e, i] of this.Whf) {
      t.set(e, i);
    }
  }
  GetGamepadKeyScaleMap(t, e) {
    var i;
    var s;
    for ([i, s] of this.Whf.get(e) ?? new Map()) {
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
    for ([i] of this.jhf.get(e) ?? new Map()) {
      t.push(i);
    }
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputAxisKeyMap(this.sEe, this.Xhf).has(t);
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
    var e = this.$hf.get(t) ?? this.$hf.get(0);
    var i = this.Whf.get(t) ?? this.Whf.get(0);
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
      this.Xhf = t;
      this.SetKeys(s, t);
      this.r5f = this.Xhf;
    }
  }
  SetKeys(t, e) {
    this.jhf.set(e, t);
    if (this.Xhf === e) {
      InputSettings_1.InputSettings.SetAxisMapping(this.sEe, t, this.r5f, e);
      this.rEe = Array.from(t.keys());
      this.nEe();
    } else {
      InputSettings_1.InputSettings.SetAxisMappingWithoutInputSettings(this.sEe, t, e);
      this.Qhf(e);
    }
  }
  SetAllKeys(t) {
    for (const e of this.jhf.keys()) {
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
    for (const e of this.$hf.keys()) {
      if (e !== 0) {
        this.SetGamepadKeys(t, e);
      }
    }
  }
  RefreshKeys(e, t) {
    var i = this.Yhf(t);
    i.clear();
    for (let t = e.Num() - 1; t >= 0; t--) {
      var s = e.Get(t);
      var n = s.Key.KeyName.toString();
      i.set(n, s.Scale);
    }
    if (this.Xhf === t) {
      this.rEe = Array.from(i.keys());
      this.nEe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAxisKeyChanged, this.sEe);
    } else {
      this.Qhf(t);
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
    return this.jhf;
  }
  GetCopyKeyNameListToBindingTypeMap() {
    return new Map(this.jhf);
  }
  Qhf(t) {
    let e = new Map();
    let i = new Map();
    var s = this.jhf.get(t) ?? new Map();
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
      if (!this.$hf.has(t) && e.size === 0) {
        e = this.$hf.get(0) ?? new Map();
      }
      s = this.Whf.has(t);
      if (!s && i.size === 0) {
        i = this.Whf.get(0) ?? new Map();
      }
      if (this.Xhf === t) {
        this.tEe.length = 0;
        for (var [a] of e) {
          this.tEe.push(a);
        }
        this.iEe.length = 0;
        for (var [o] of i) {
          this.iEe.push(o);
        }
      }
      this.$hf.set(t, e);
      this.Whf.set(t, i);
    }
  }
  nEe() {
    this.Qhf(this.Xhf);
  }
  Yhf(t) {
    let e = this.jhf.get(t);
    if (!e) {
      e = new Map();
      this.jhf.set(t, e);
    }
    return e;
  }
}
exports.InputAxisBinding = InputAxisBinding;
//# sourceMappingURL=InputAxisBinding.js.map