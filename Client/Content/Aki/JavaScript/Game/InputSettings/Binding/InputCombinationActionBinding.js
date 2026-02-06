"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCombinationActionBinding = undefined;
const Info_1 = require("../../../Core/Common/Info");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InputSettings_1 = require("../InputSettings");
const InputBindingDefine_1 = require("./InputBindingDefine");
class InputCombinationActionBinding {
  constructor() {
    this.hEe = new Map();
    this.lEe = new Map();
    this.uEe = new Map();
    this.cEe = -0;
    this.ZMe = undefined;
    this.s_f = new Map();
    this.a_f = new Map();
    this.f_f = new Map();
    this.g_f = new Map();
    this.C_f = new Map();
    this.ConfigBindingType = 0;
    this.CurrentBindingType = 0;
  }
  f2g(t) {
    var i = new Map();
    var e = new Map();
    var s = new Map();
    var a = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionName(t);
    this.ConfigBindingType = a.ExclusiveType;
    this.CurrentBindingType = a.ExclusiveType;
    if (this.ConfigBindingType === 0) {
      for (const u of InputBindingDefine_1.inputBindingTypesArray) {
        i.clear();
        e.clear();
        s.clear();
        for (var [r, n] of a.PcKeys) {
          i.set(r, n);
          s.set(r, n);
        }
        this.g_f.set(u, i);
        for (var [h, o] of a.GamepadKeys) {
          e.set(h, o);
          s.set(h, o);
        }
        this.C_f.set(u, e);
        this.f_f.set(u, s);
      }
    } else {
      for (var [p, f] of a.PcKeys) {
        i.set(p, f);
        s.set(p, f);
      }
      this.g_f.set(this.ConfigBindingType, i);
      for (var [y, M] of a.GamepadKeys) {
        e.set(y, M);
        s.set(y, M);
      }
      this.C_f.set(this.ConfigBindingType, e);
      this.f_f.set(this.ConfigBindingType, s);
    }
  }
  g2g(t) {
    t = ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(t);
    this.ConfigBindingType = t?.ExclusiveType ?? 0;
    this.CurrentBindingType = t?.ExclusiveType ?? 0;
    if (this.ConfigBindingType === 0) {
      for (const i of InputBindingDefine_1.inputBindingTypesArray) {
        this.g_f.set(i, new Map());
        this.C_f.set(i, new Map());
        this.f_f.set(i, new Map());
      }
    } else {
      this.g_f.set(this.ConfigBindingType, new Map());
      this.C_f.set(this.ConfigBindingType, new Map());
      this.f_f.set(this.ConfigBindingType, new Map());
    }
  }
  Initialize(t, i, e) {
    this.ZMe = t;
    this.cEe = i;
    if (e) {
      this.f2g(t);
    } else {
      this.g2g(t);
    }
  }
  InitializeBindingType(t) {
    this.CurrentBindingType = t;
  }
  Clear() {
    this.hEe.clear();
    this.lEe.clear();
    this.uEe.clear();
    this.ZMe = undefined;
    this.f_f.clear();
    this.g_f.clear();
    this.C_f.clear();
  }
  SwitchKeysByBindingType(t) {
    var i = this.g_f.get(t) ?? this.g_f.get(0);
    var e = this.C_f.get(t) ?? this.C_f.get(0);
    var s = new Map();
    if (i) {
      for (var [a, r] of i) {
        s.set(a, r);
      }
    }
    if (e) {
      for (var [n, h] of e) {
        s.set(n, h);
      }
    }
    if (s) {
      this.CurrentBindingType = t;
      this.uEe.clear();
      this.hEe.clear();
      this.lEe.clear();
      for (var [o, p] of s) {
        this.AddKey(o, p, t);
      }
    }
  }
  AddKey(t, i, e) {
    this.p_f(e).set(t, i);
    if (this.CurrentBindingType === e) {
      this.uEe.set(t, i);
    }
    var s = InputSettings_1.InputSettings.GetKey(t);
    if (s && ((s.IsKeyboardKey || s.IsMouseButton) && (this.v_f(e).set(t, i), this.CurrentBindingType === e) && this.hEe.set(t, i), s.IsGamepadKey) && (this.y_f(e).set(t, i), this.CurrentBindingType === e)) {
      this.lEe.set(t, i);
    }
  }
  AddKeyEmptyData(t) {
    this.p_f(t).clear();
    if (this.CurrentBindingType === t) {
      this.uEe.clear();
    }
    this.v_f(t).clear();
    if (this.CurrentBindingType === t) {
      this.hEe.clear();
    }
    this.y_f(t).clear();
    if (this.CurrentBindingType === t) {
      this.lEe.clear();
    }
  }
  RemoveKey(t, i) {
    this.f_f.get(i)?.delete(t);
    this.g_f.get(i)?.delete(t);
    this.C_f.get(i)?.delete(t);
    return this.CurrentBindingType === i && (this.uEe.delete(t), this.hEe.delete(t), this.lEe.delete(t), true);
  }
  GetKeyMapByBindingType(t, i) {
    i = this.hng(i);
    if (i) {
      for (var [e, s] of i) {
        t.set(e, s);
      }
    }
  }
  HasAnyKey() {
    for (const e of this.f_f.values()) {
      for (var [t, i] of e) {
        if (t && i) {
          return true;
        }
      }
    }
    return false;
  }
  GetKeyMap(t) {
    var i = this.hng(this.CurrentBindingType);
    if (i) {
      for (var [e, s] of i) {
        t.set(e, s);
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
    this.s_f.set(i, t);
  }
  SetKeyboardVersionMap(t) {
    for (var [i, e] of t) {
      this.s_f.set(i, e);
    }
  }
  GetKeyboardVersion(t) {
    return this.s_f.get(t) ?? 0;
  }
  SetGamepadVersion(t, i) {
    this.a_f.set(i, t);
  }
  SetGamepadVersionMap(t) {
    for (var [i, e] of t) {
      this.a_f.set(i, e);
    }
  }
  GetGamepadVersion(t) {
    return this.a_f.get(t) ?? 0;
  }
  HasKeyboardCombinationAction(t) {
    t = this.lng(t);
    return !!t && t.size > 0;
  }
  HasGamepadCombinationActionByBindingType(t) {
    t = this._ng(t);
    return !!t && t.size > 0;
  }
  HasGamepadCombinationAction() {
    var t = this._ng(this.CurrentBindingType);
    return !!t && t.size > 0;
  }
  HasCombinationAction(t, i) {
    return this.HasKey(t, i, this.CurrentBindingType);
  }
  GetSecondaryKeyValidTime() {
    return this.cEe;
  }
  GetAllPcKeyNameMap(t) {
    for (var [i, e] of this.g_f) {
      var s;
      var a;
      var r = new Map();
      for ([s, a] of e) {
        r.set(s, a);
      }
      t.set(i, r);
    }
  }
  GetPcKeyNameMap(t, i) {
    i = this.lng(i);
    if (i) {
      for (var [e, s] of i) {
        t.set(e, s);
      }
    }
  }
  GetPcKeyNameList(t, i) {
    i = this.lng(i);
    if (i) {
      for (var [e, s] of i) {
        t.push(e);
        t.push(s);
      }
    }
  }
  GetAllGamepadKeyNameMap(t) {
    for (var [i, e] of this.C_f) {
      var s;
      var a;
      var r = new Map();
      for ([s, a] of e) {
        r.set(s, a);
      }
      t.set(i, r);
    }
  }
  GetGamepadKeyNameMapByBindingType(t, i) {
    i = this._ng(i);
    if (i) {
      for (var [e, s] of i) {
        t.set(e, s);
      }
    }
  }
  GetGamepadKeyNameMap(t) {
    var i = this._ng(this.CurrentBindingType);
    if (i) {
      for (var [e, s] of i) {
        t.set(e, s);
      }
    }
  }
  GetGamepadKeyNameList(t, i) {
    i = this._ng(i);
    if (i) {
      for (var [e, s] of i) {
        t.push(e);
        t.push(s);
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
    e = this.hng(e);
    return !!e && e.get(t) === i;
  }
  HasKeyByAll(t, i) {
    for (const e of this.f_f.values()) {
      if (e.get(t) === i) {
        return true;
      }
    }
    return false;
  }
  GetSecondaryKeyNameByMainKey(t, i) {
    i = this.hng(i);
    if (i) {
      return i.get(t);
    }
  }
  GetKeyMapToBindingTypeMap() {
    return this.f_f;
  }
  GetCopyKeyMap() {
    var t;
    var i;
    var e = new Map();
    for ([t, i] of this.f_f.get(this.CurrentBindingType)) {
      e.set(t, i);
    }
    return e;
  }
  GetCopyKeyMapToBindingTypeMap() {
    var t;
    var i;
    var e = new Map();
    for ([t, i] of this.f_f) {
      var s;
      var a;
      var r = new Map();
      for ([s, a] of i) {
        r.set(s, a);
      }
      e.set(t, r);
    }
    return e;
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
  hng(t) {
    let i = this.f_f.get(t);
    return i = i || this.ConfigBindingType !== 0 ? i : this.f_f.get(this.ConfigBindingType);
  }
  lng(t) {
    let i = this.g_f.get(t);
    return i = i || this.ConfigBindingType !== 0 ? i : this.g_f.get(this.ConfigBindingType);
  }
  _ng(t) {
    let i = this.C_f.get(t);
    return i = i || this.ConfigBindingType !== 0 ? i : this.C_f.get(this.ConfigBindingType);
  }
}
exports.InputCombinationActionBinding = InputCombinationActionBinding;
//# sourceMappingURL=InputCombinationActionBinding.js.map