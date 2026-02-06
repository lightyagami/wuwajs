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
    this.SecondaryKeyScaleMap = undefined;
    this.s_f = new Map();
    this.a_f = new Map();
    this.f_f = new Map();
    this.g_f = new Map();
    this.C_f = new Map();
    this.S_f = new Map();
    this.CurrentBindingType = 0;
  }
  Initialize(t) {
    this.Mne = t.Id;
    this.sEe = t.AxisName;
    this.Lo = t;
    this.aEe = this.Lo.AxisType;
    this.CurrentBindingType = this.Lo.ExclusiveType;
    var i;
    var s;
    var e;
    var h;
    var r;
    var a;
    var n;
    var o;
    var p;
    var f;
    var M = this.p_f(this.Lo.ExclusiveType);
    var u = this.v_f(this.Lo.ExclusiveType);
    var v = this.y_f(this.Lo.ExclusiveType);
    var y = this.M_f(this.Lo.ExclusiveType);
    for ([i, s] of t.PcKeyMap) {
      u.set(i, s);
      M.set(i, s);
    }
    for ([e, h] of t.GamepadKeyMap) {
      v.set(e, h);
      M.set(e, h);
    }
    for ([r, a] of t.SecondaryKeyScaleMap) {
      y.set(r, a);
    }
    this.uEe = M;
    this.SecondaryKeyScaleMap = y;
    for ([n, o] of t.KeyboardVersionMap) {
      this.s_f.set(n, o);
    }
    for ([p, f] of t.GamepadVersionMap) {
      this.a_f.set(p, f);
    }
    this.dEe();
  }
  Clear() {
    this.hEe.clear();
    this.lEe.clear();
    this.uEe.clear();
    this.sEe = undefined;
    this.aEe = 0;
    this.Lo = undefined;
    this.s_f.clear();
    this.a_f.clear();
    this.f_f.clear();
    this.g_f.clear();
    this.C_f.clear();
    this.S_f.clear();
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
  SwitchKeysByBindingType(t) {
    var i = this.g_f.get(t) ?? this.g_f.get(0);
    var s = this.C_f.get(t) ?? this.C_f.get(0);
    var e = this.S_f.get(t) ?? this.S_f.get(0);
    var h = new Map();
    if (i) {
      for (var [r, a] of i) {
        h.set(r, a);
      }
    }
    if (s) {
      for (var [n, o] of s) {
        h.set(n, o);
      }
    }
    if (e) {
      this.S_f.set(t, e);
    }
    if (h) {
      this.CurrentBindingType = t;
      this.uEe.clear();
      this.hEe.clear();
      this.lEe.clear();
      for (var [p, f] of h) {
        this.AddKey(p, f, t);
      }
    }
  }
  AddKey(t, i, s) {
    this.p_f(s).set(t, i);
    if (this.CurrentBindingType === s) {
      this.uEe.set(t, i);
    }
    var e = InputSettings_1.InputSettings.GetKey(i);
    if (e && ((e.IsKeyboardKey || e.IsMouseButton) && (this.v_f(s).set(t, i), this.CurrentBindingType === s) && this.hEe.set(t, i), e.IsGamepadKey) && (this.y_f(s).set(t, i), this.CurrentBindingType === s)) {
      this.lEe.set(t, i);
    }
  }
  RemoveKey(t, i) {
    this.p_f(i).delete(t);
    this.v_f(i).delete(t);
    this.y_f(i).delete(t);
    if (this.CurrentBindingType === i) {
      this.uEe.delete(t);
      this.hEe.delete(t);
      this.lEe.delete(t);
    }
  }
  GetAxisName() {
    return this.sEe;
  }
  SetKeyboardVersion(t, i) {
    this.s_f.set(i, t);
  }
  GetKeyboardVersion(t) {
    return this.s_f.get(t) ?? 0;
  }
  SetGamepadVersion(t, i) {
    this.a_f.set(i, t);
  }
  GetGamepadVersion(t) {
    return this.a_f.get(t) ?? 0;
  }
  GetCombinationAxisKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationAxisKeyMap(this.sEe);
  }
  HasKeyboardCombinationAxis(t) {
    return this.v_f(t).size > 0;
  }
  HasGamepadCombinationAxis(t) {
    return this.y_f(t).size > 0;
  }
  GetAxisMappingType() {
    return this.aEe;
  }
  GetSourceAxisValue(t) {
    let i = this.S_f.get(this.CurrentBindingType);
    return (i = i || this.S_f.get(0)).get(t);
  }
  GetConfigId() {
    return this.Mne;
  }
  GetAllPcKeyNameMap(t) {
    for (var [i, s] of this.g_f) {
      t.set(i, s);
    }
  }
  GetPcKeyNameMap(t, i) {
    var s;
    var e;
    for ([s, e] of this.v_f(i)) {
      t.set(s, e);
    }
  }
  GetAllGamepadKeyNameMap(t) {
    for (var [i, s] of this.C_f) {
      t.set(i, s);
    }
  }
  GetGamepadKeyNameMap(t, i) {
    var s;
    var e;
    for ([s, e] of this.y_f(i)) {
      t.set(s, e);
    }
  }
  GetKeyMap(t, i) {
    var s;
    var e;
    for ([s, e] of this.p_f(i)) {
      t.set(s, e);
    }
  }
  GetCopyKeyMapToBindingTypeMap() {
    var t;
    var i;
    var s = new Map();
    for ([t, i] of this.f_f) {
      var e;
      var h;
      var r = new Map();
      for ([e, h] of i) {
        r.set(e, h);
      }
      s.set(t, r);
    }
    return s;
  }
  GetCurrentPlatformKeyNameMap(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      this.GetPcKeyNameMap(t, this.CurrentBindingType);
    } else if (Info_1.Info.IsInGamepad()) {
      this.GetGamepadKeyNameMap(t, this.CurrentBindingType);
    }
  }
  HasKey(t, i, s) {
    return this.p_f(s).get(t) === i;
  }
  p_f(t) {
    let i = this.f_f.get(t);
    if (!i) {
      i = new Map();
      this.f_f.set(t, i);
    }
    return i;
  }
  v_f(t) {
    let i = this.g_f.get(t);
    if (!i) {
      i = new Map();
      this.g_f.set(t, i);
    }
    return i;
  }
  y_f(t) {
    let i = this.C_f.get(t);
    if (!i) {
      i = new Map();
      this.C_f.set(t, i);
    }
    return i;
  }
  M_f(t) {
    let i = this.S_f.get(t);
    if (!i) {
      i = new Map();
      this.S_f.set(t, i);
    }
    return i;
  }
}
exports.InputCombinationAxisBinding = InputCombinationAxisBinding;
//# sourceMappingURL=InputCombinationAxisBinding.js.map