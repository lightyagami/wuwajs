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
    this.Vhf = new Map();
    this.Hhf = new Map();
    this.zhf = new Map();
    this.Jhf = new Map();
    this.Zhf = new Map();
    this.rlf = new Map();
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
    var M = this.elf(this.Lo.ExclusiveType);
    var u = this.tlf(this.Lo.ExclusiveType);
    var v = this.ilf(this.Lo.ExclusiveType);
    var y = this.olf(this.Lo.ExclusiveType);
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
      this.Vhf.set(n, o);
    }
    for ([p, f] of t.GamepadVersionMap) {
      this.Hhf.set(p, f);
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
    this.Vhf.clear();
    this.Hhf.clear();
    this.zhf.clear();
    this.Jhf.clear();
    this.Zhf.clear();
    this.rlf.clear();
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
    var i = this.Jhf.get(t) ?? this.Jhf.get(0);
    var s = this.Zhf.get(t) ?? this.Zhf.get(0);
    var e = this.rlf.get(t) ?? this.rlf.get(0);
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
      this.rlf.set(t, e);
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
    this.elf(s).set(t, i);
    if (this.CurrentBindingType === s) {
      this.uEe.set(t, i);
    }
    var e = InputSettings_1.InputSettings.GetKey(i);
    if (e && ((e.IsKeyboardKey || e.IsMouseButton) && (this.tlf(s).set(t, i), this.CurrentBindingType === s) && this.hEe.set(t, i), e.IsGamepadKey) && (this.ilf(s).set(t, i), this.CurrentBindingType === s)) {
      this.lEe.set(t, i);
    }
  }
  RemoveKey(t, i) {
    this.elf(i).delete(t);
    this.tlf(i).delete(t);
    this.ilf(i).delete(t);
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
    this.Vhf.set(i, t);
  }
  GetKeyboardVersion(t) {
    return this.Vhf.get(t) ?? 0;
  }
  SetGamepadVersion(t, i) {
    this.Hhf.set(i, t);
  }
  GetGamepadVersion(t) {
    return this.Hhf.get(t) ?? 0;
  }
  GetCombinationAxisKeyMap() {
    return InputSettings_1.InputSettings.GetCombinationAxisKeyMap(this.sEe);
  }
  HasKeyboardCombinationAxis(t) {
    return this.tlf(t).size > 0;
  }
  HasGamepadCombinationAxis(t) {
    return this.ilf(t).size > 0;
  }
  GetAxisMappingType() {
    return this.aEe;
  }
  GetSourceAxisValue(t) {
    let i = this.rlf.get(this.CurrentBindingType);
    return (i = i || this.rlf.get(0)).get(t);
  }
  GetConfigId() {
    return this.Mne;
  }
  GetAllPcKeyNameMap(t) {
    for (var [i, s] of this.Jhf) {
      t.set(i, s);
    }
  }
  GetPcKeyNameMap(t, i) {
    var s;
    var e;
    for ([s, e] of this.tlf(i)) {
      t.set(s, e);
    }
  }
  GetAllGamepadKeyNameMap(t) {
    for (var [i, s] of this.Zhf) {
      t.set(i, s);
    }
  }
  GetGamepadKeyNameMap(t, i) {
    var s;
    var e;
    for ([s, e] of this.ilf(i)) {
      t.set(s, e);
    }
  }
  GetKeyMap(t, i) {
    var s;
    var e;
    for ([s, e] of this.elf(i)) {
      t.set(s, e);
    }
  }
  GetCopyKeyMapToBindingTypeMap() {
    var t;
    var i;
    var s = new Map();
    for ([t, i] of this.zhf) {
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
    return this.elf(s).get(t) === i;
  }
  elf(t) {
    let i = this.zhf.get(t);
    if (!i) {
      i = new Map();
      this.zhf.set(t, i);
    }
    return i;
  }
  tlf(t) {
    let i = this.Jhf.get(t);
    if (!i) {
      i = new Map();
      this.Jhf.set(t, i);
    }
    return i;
  }
  ilf(t) {
    let i = this.Zhf.get(t);
    if (!i) {
      i = new Map();
      this.Zhf.set(t, i);
    }
    return i;
  }
  olf(t) {
    let i = this.rlf.get(t);
    if (!i) {
      i = new Map();
      this.rlf.set(t, i);
    }
    return i;
  }
}
exports.InputCombinationAxisBinding = InputCombinationAxisBinding;
//# sourceMappingURL=InputCombinationAxisBinding.js.map