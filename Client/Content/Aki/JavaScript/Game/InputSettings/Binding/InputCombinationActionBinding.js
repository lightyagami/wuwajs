"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCombinationActionBinding = undefined;
const Info_1 = require("../../../Core/Common/Info");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InputSettings_1 = require("../InputSettings");
class InputCombinationActionBinding {
  constructor() {
    this.hEe = new Map();
    this.lEe = new Map();
    this.uEe = new Map();
    this.cEe = -0;
    this.ZMe = undefined;
    this.Vhf = new Map();
    this.Hhf = new Map();
    this.zhf = new Map();
    this.Jhf = new Map();
    this.Zhf = new Map();
    this.ConfigBindingType = 0;
    this.CurrentBindingType = 0;
  }
  Initialize(t, i) {
    this.ZMe = t;
    this.cEe = i;
    i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionNameInList(t);
    this.ConfigBindingType = i?.ExclusiveType ?? 0;
    this.CurrentBindingType = i?.ExclusiveType ?? 0;
  }
  Clear() {
    this.hEe.clear();
    this.lEe.clear();
    this.uEe.clear();
    this.ZMe = undefined;
    this.zhf.clear();
    this.Jhf.clear();
    this.Zhf.clear();
  }
  SwitchKeysByBindingType(t) {
    var i = this.Jhf.get(t) ?? this.Jhf.get(0);
    var e = this.Zhf.get(t) ?? this.Zhf.get(0);
    var a = new Map();
    if (i) {
      for (var [r, s] of i) {
        a.set(r, s);
      }
    }
    if (e) {
      for (var [n, h] of e) {
        a.set(n, h);
      }
    }
    if (a) {
      this.CurrentBindingType = t;
      this.uEe.clear();
      this.hEe.clear();
      this.lEe.clear();
      for (var [o, p] of a) {
        this.AddKey(o, p, t);
      }
    }
  }
  AddKey(t, i, e) {
    this.elf(e).set(t, i);
    if (this.CurrentBindingType === e) {
      this.uEe.set(t, i);
    }
    var a = InputSettings_1.InputSettings.GetKey(t);
    if (a && ((a.IsKeyboardKey || a.IsMouseButton) && (this.tlf(e).set(t, i), this.CurrentBindingType === e) && this.hEe.set(t, i), a.IsGamepadKey) && (this.ilf(e).set(t, i), this.CurrentBindingType === e)) {
      this.lEe.set(t, i);
    }
  }
  RemoveKey(t, i) {
    this.zhf.get(i)?.delete(t);
    this.Jhf.get(i)?.delete(t);
    this.Zhf.get(i)?.delete(t);
    return this.CurrentBindingType === i && (this.uEe.delete(t), this.hEe.delete(t), this.lEe.delete(t), true);
  }
  GetKeyMapByBindingType(t, i) {
    i = this.gWf(i);
    if (i) {
      for (var [e, a] of i) {
        t.set(e, a);
      }
    }
  }
  HasAnyKey() {
    for (const e of this.zhf.values()) {
      for (var [t, i] of e) {
        if (t && i) {
          return true;
        }
      }
    }
    return false;
  }
  GetKeyMap(t) {
    var i = this.gWf(this.CurrentBindingType);
    if (i) {
      for (var [e, a] of i) {
        t.set(e, a);
      }
    }
  }
  IsValid() {
    return !!this.uEe && this.uEe.size > 0;
  }
  GetActionName() {
    return this.ZMe;
  }
  SetKeyboardVersion(t, i) {
    this.Vhf.set(i, t);
  }
  SetKeyboardVersionMap(t) {
    for (var [i, e] of t) {
      this.Vhf.set(i, e);
    }
  }
  GetKeyboardVersion(t) {
    return this.Vhf.get(t) ?? 0;
  }
  SetGamepadVersion(t, i) {
    this.Hhf.set(i, t);
  }
  SetGamepadVersionMap(t) {
    for (var [i, e] of t) {
      this.Hhf.set(i, e);
    }
  }
  GetGamepadVersion(t) {
    return this.Hhf.get(t) ?? 0;
  }
  HasKeyboardCombinationAction(t) {
    t = this.CWf(t);
    return !!t && t.size > 0;
  }
  HasGamepadCombinationActionByBindingType(t) {
    t = this.pWf(t);
    return !!t && t.size > 0;
  }
  HasGamepadCombinationAction() {
    var t = this.pWf(this.CurrentBindingType);
    return !!t && t.size > 0;
  }
  HasCombinationAction(t, i) {
    return this.HasKey(t, i, this.CurrentBindingType);
  }
  GetSecondaryKeyValidTime() {
    return this.cEe;
  }
  GetAllPcKeyNameMap(t) {
    for (var [i, e] of this.Jhf) {
      var a;
      var r;
      var s = new Map();
      for ([a, r] of e) {
        s.set(a, r);
      }
      t.set(i, s);
    }
  }
  GetPcKeyNameMap(t, i) {
    i = this.CWf(i);
    if (i) {
      for (var [e, a] of i) {
        t.set(e, a);
      }
    }
  }
  GetPcKeyNameList(t, i) {
    i = this.CWf(i);
    if (i) {
      for (var [e, a] of i) {
        t.push(e);
        t.push(a);
      }
    }
  }
  GetAllGamepadKeyNameMap(t) {
    for (var [i, e] of this.Zhf) {
      var a;
      var r;
      var s = new Map();
      for ([a, r] of e) {
        s.set(a, r);
      }
      t.set(i, s);
    }
  }
  GetGamepadKeyNameMapByBindingType(t, i) {
    i = this.pWf(i);
    if (i) {
      for (var [e, a] of i) {
        t.set(e, a);
      }
    }
  }
  GetGamepadKeyNameMap(t) {
    var i = this.pWf(this.CurrentBindingType);
    if (i) {
      for (var [e, a] of i) {
        t.set(e, a);
      }
    }
  }
  GetGamepadKeyNameList(t, i) {
    i = this.pWf(i);
    if (i) {
      for (var [e, a] of i) {
        t.push(e);
        t.push(a);
      }
    }
  }
  GetCurrentPlatformKeyNameMap(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      this.GetPcKeyNameMap(t, this.CurrentBindingType);
    } else if (Info_1.Info.IsInGamepad()) {
      this.GetGamepadKeyNameMapByBindingType(t, this.CurrentBindingType);
    }
  }
  GetCurrentPlatformKeyNameList(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      this.GetPcKeyNameList(t, this.CurrentBindingType);
    } else if (Info_1.Info.IsInGamepad()) {
      this.GetGamepadKeyNameList(t, this.CurrentBindingType);
    }
  }
  HasKey(t, i, e) {
    e = this.gWf(e);
    return !!e && e.get(t) === i;
  }
  GetSecondaryKeyNameByMainKey(t, i) {
    i = this.gWf(i);
    if (i) {
      return i.get(t);
    }
  }
  GetKeyMapToBindingTypeMap() {
    return this.zhf;
  }
  GetCopyKeyMap() {
    var t;
    var i;
    var e = new Map();
    for ([t, i] of this.zhf.get(this.CurrentBindingType)) {
      e.set(t, i);
    }
    return e;
  }
  GetCopyKeyMapToBindingTypeMap() {
    var t;
    var i;
    var e = new Map();
    for ([t, i] of this.zhf) {
      var a;
      var r;
      var s = new Map();
      for ([a, r] of i) {
        s.set(a, r);
      }
      e.set(t, s);
    }
    return e;
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
  gWf(t) {
    let i = this.zhf.get(t);
    return i = i || this.ConfigBindingType !== 0 ? i : this.zhf.get(this.ConfigBindingType);
  }
  CWf(t) {
    let i = this.Jhf.get(t);
    return i = i || this.ConfigBindingType !== 0 ? i : this.Jhf.get(this.ConfigBindingType);
  }
  pWf(t) {
    let i = this.Zhf.get(t);
    return i = i || this.ConfigBindingType !== 0 ? i : this.Zhf.get(this.ConfigBindingType);
  }
}
exports.InputCombinationActionBinding = InputCombinationActionBinding;
//# sourceMappingURL=InputCombinationActionBinding.js.map