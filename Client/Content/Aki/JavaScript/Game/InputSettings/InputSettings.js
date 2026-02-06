"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSettings = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const ConfigManager_1 = require("../Manager/ConfigManager");
const InputBindingDefine_1 = require("./Binding/InputBindingDefine");
const InputActionKey_1 = require("./Key/InputActionKey");
const InputAxisKey_1 = require("./Key/InputAxisKey");
const InputCombinationActionKey_1 = require("./Key/InputCombinationActionKey");
const InputCombinationAxisKey_1 = require("./Key/InputCombinationAxisKey");
const InputKey_1 = require("./Key/InputKey");
const LanguageKeyTransUtils_1 = require("./LanguageKeyTrans/LanguageKeyTransUtils");
class InputSettings {
  static ngg(t, i, e, n, s, a) {
    let o = this.sgg.pop();
    if (o) {
      InputActionKey_1.InputActionKey.Refresh(o, t, i, e, n, s, a);
    } else {
      o = InputActionKey_1.InputActionKey.New(t, i, e, n, s, a);
    }
    return o;
  }
  static agg(t) {
    this.sgg.push(t);
  }
  static hgg(t, i, e) {
    let n = this.lgg.pop();
    if (n) {
      InputAxisKey_1.InputAxisKey.Refresh(n, t, i, e);
    } else {
      n = InputAxisKey_1.InputAxisKey.New(t, i, e);
    }
    return n;
  }
  static _gg(t) {
    this.lgg.push(t);
  }
  static Initialize() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "初始化InputSettings");
    }
    LanguageKeyTransUtils_1.LanguageKeyTransUtils.Initialize();
    this.CEe = UE.InputSettings.GetInputSettings();
    this.Refresh();
  }
  static Clear() {
    this.CEe = undefined;
    this.vEe = undefined;
    this.MEe = undefined;
    this.EEe = undefined;
    this.SEe.clear();
    this.yEe.clear();
    this.LEe.clear();
    this.REe.clear();
    this.IEe();
  }
  static Refresh() {
    this.tra();
    this.ira();
    this.rra();
  }
  static tra() {
    var e = this.GetActionNames();
    for (let t = 0; t < e.Num(); t++) {
      var n = e.Get(t);
      this.MEe = (0, puerts_1.$ref)(undefined);
      this.CEe.GetActionMappingByName(n, this.MEe);
      var s = (0, puerts_1.$unref)(this.MEe);
      var n = n.toString();
      if (Info_1.Info.IsPlayInEditor) {
        if (!ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(n)) {
          this.CEe.RemoveActionMappings(s);
          continue;
        }
      }
      let i = this.SEe.get(n);
      if (!i) {
        i = new Map();
        this.SEe.set(n, i);
      }
      for (let t = 0; t < s.Num(); t++) {
        var a;
        var o = s.Get(t);
        var r = o.Key.KeyName.toString();
        this.TEe(r);
        for (const p of InputBindingDefine_1.inputBindingTypesArray) {
          let t = i.get(p);
          if (!t) {
            t = new Map();
            i.set(p, t);
          }
          if (!t.get(r)?.IsEqual(o)) {
            a = InputActionKey_1.InputActionKey.NewByInputActionKeyMapping(o);
            t.set(r, a);
          }
        }
      }
      s.Empty();
    }
  }
  static ira() {
    var e = this.GetAxisNames();
    for (let t = 0; t < e.Num(); t++) {
      var n = e.Get(t);
      this.CEe.GetAxisMappingByName(n, this.EEe);
      var s = (0, puerts_1.$unref)(this.EEe);
      var n = n.toString();
      if (Info_1.Info.IsPlayInEditor) {
        if (!ConfigManager_1.ConfigManager.InputSettingsConfig.GetAxisMappingConfigByAxisName(n)) {
          this.CEe.RemoveAxisMappings(s);
          continue;
        }
      }
      let i = this.yEe.get(n);
      if (!i) {
        i = new Map();
        this.yEe.set(n, i);
      }
      for (let t = 0; t < s.Num(); t++) {
        var a;
        var o = s.Get(t);
        var r = o.Key.KeyName.toString();
        this.TEe(r);
        for (const p of InputBindingDefine_1.inputBindingTypesArray) {
          let t = i.get(p);
          if (!t) {
            t = new Map();
            i.set(p, t);
          }
          if (!t.get(r)?.IsEqual(o)) {
            a = InputAxisKey_1.InputAxisKey.NewByInputAxisKeyMapping(o);
            t.set(r, a);
          }
        }
      }
      s.Empty();
    }
  }
  static RemoveCombinationActionMapping(t, e, n) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "删除组合Action按键映射", ["actionName", t], ["mainKeyName", e], ["secondaryKeyName", n]);
    }
    t = this.LEe.get(t);
    if (t) {
      var s = t.get(e);
      if (s) {
        let i = -1;
        for (let t = 0; t < s.length; t++) {
          if (s[t].GetSecondaryKey()?.GetKeyName() === n) {
            i = t;
            break;
          }
        }
        if (i >= 0) {
          s?.splice(i, 1);
        }
        if (s.length <= 0) {
          t.delete(e);
        }
      }
    }
  }
  static NewInputCombinationActionKey(t, i, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "添加组合Action按键映射", ["actionName", t], ["mainKeyName", i], ["secondaryKeyName", e]);
    }
    this.TEe(i);
    this.TEe(e);
    e = InputCombinationActionKey_1.InputCombinationActionKey.New(t, i, e);
    let n = this.LEe.get(t);
    if (n) {
      let t = n.get(i);
      if (t) {
        t.push(e);
      } else {
        t = [e];
        n.set(i, t);
      }
    } else {
      (n = new Map()).set(i, [e]);
      this.LEe.set(t, n);
    }
  }
  static rra() {
    this.REe.clear();
    for (const p of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig()) {
      var t;
      var i;
      var e;
      var n;
      var s = p.AxisName;
      var a = p.SecondaryKeyScaleMap;
      for ([t, i] of p.PcKeyMap) {
        var o = a.get(t);
        this.DEe(s, i, t, o);
      }
      for ([e, n] of p.GamepadKeyMap) {
        var r = a.get(e);
        this.DEe(s, n, e, r);
      }
    }
  }
  static RemoveCombinationAxisMapping(t, e, n) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "删除组合Axis按键映射", ["axisName", t], ["mainKeyName", e], ["secondaryKeyName", n]);
    }
    t = this.REe.get(t);
    if (t) {
      var s = t.get(e);
      if (s) {
        let i = -1;
        for (let t = 0; t < s.length; t++) {
          if (s[t].GetSecondaryKey()?.GetKeyName() === n) {
            i = t;
            break;
          }
        }
        if (i >= 0) {
          s?.splice(i, 1);
        }
        if (s.length <= 0) {
          t.delete(e);
        }
      }
    }
  }
  static DEe(t, i, e, n) {
    this.TEe(i);
    this.TEe(e);
    let s = this.REe.get(t);
    if (!s) {
      s = new Map();
      this.REe.set(t, s);
    }
    let a = s.get(i);
    if (!a) {
      a = [];
      s.set(i, a);
    }
    t = InputCombinationAxisKey_1.InputCombinationAxisKey.New(t, i, e, n);
    a.push(t);
  }
  static SaveKeyMappings() {
    this.CEe?.SaveKeyMappingsNotSort();
  }
  static TEe(t) {
    if (!this.UEe.has(t)) {
      this.AEe(t);
    }
  }
  static AEe(t) {
    var i = new InputKey_1.InputKey(t);
    this.UEe.set(t, i);
  }
  static IEe() {
    this.UEe.clear();
  }
  static GetKey(t) {
    return this.UEe.get(t);
  }
  static GetUeKey(t) {
    return this.GetKey(t)?.ToUeKey();
  }
  static GetInputAnalogKeyState(t) {
    return this.GetKey(t)?.GetInputAnalogKeyState();
  }
  static IsInputKeyDown(t) {
    t = this.GetKey(t);
    return !!t && t.IsInputKeyDown();
  }
  static IsKeyboardKey(t) {
    var i = this.GetKey(t);
    if (i) {
      return i.IsKeyboardKey;
    } else {
      i = new UE.Key(new UE.FName(t));
      return UE.KismetInputLibrary.Key_IsKeyboardKey(i);
    }
  }
  static IsGamepadKey(t) {
    var i = this.GetKey(t);
    if (i) {
      return i.IsGamepadKey;
    } else {
      i = new UE.Key(new UE.FName(t));
      return UE.KismetInputLibrary.Key_IsGamepadKey(i);
    }
  }
  static IsMouseButton(t) {
    var i = this.GetKey(t);
    if (i) {
      return i.IsMouseButton;
    } else {
      i = new UE.Key(new UE.FName(t));
      return UE.KismetInputLibrary.Key_IsMouseButton(i);
    }
  }
  static IsValidKey(t) {
    return t !== "Keyboard_Invalid" && t !== "Gamepad_Invalid" && t !== "GenericUSBController_ButtonInvalid";
  }
  static GetKeyIconPath(t) {
    t = this.GetKey(t);
    if (t) {
      return t.GetKeyIconPath();
    }
  }
  static SetActionMappingApplyInputSettings(t, i, e, n, s) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "设置Action按键映射", ["actionName", t], ["keys", i]);
    }
    this.xWf(t, e, n);
    this.ugg(t, i, e, s);
  }
  static SetActionMapping(t, i, e, n) {
    if (this.CEe?.IsValid()) {
      if (e !== n) {
        e = this.GetInputActionKeyMapByBindingType(t, e);
        if (e && e.size > 0) {
          var s = UE.NewArray(UE.InputActionKeyMapping);
          for (const a of e.values()) {
            s.Add(a.ToUeInputActionKeyMapping());
          }
          this.CEe.RemoveActionMappings(s);
        }
      }
      InputSettings.SetActionMappingApplyInputSettings(t, i, n, true, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "设置Action按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static AddActionMapping(t, i, e, n) {
    if (this.CEe?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "添加Action按键映射", ["actionName", t], ["key", i]);
      }
      this.xEe(t, i, e, n);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "添加Action按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static ugg(t, i, e, n) {
    if (i.length > 0) {
      if (n) {
        var s = UE.NewArray(UE.InputActionKeyMapping);
        for (const o of i) {
          var a = this.xEe(t, o, e, false);
          s.Add(a.ToUeInputActionKeyMapping());
        }
        this.CEe.AddActionMappings(s);
      } else {
        for (const r of i) {
          this.xEe(t, r, e, false);
        }
      }
    }
  }
  static xEe(t, i, e, n) {
    this.TEe(i);
    let s = this.GetInputActionKeyMap(t);
    if (!s) {
      s = new Map();
      this.SEe.set(t, s);
    }
    let a = s.get(e);
    if (!a) {
      a = new Map();
      s.set(e, a);
    }
    e = InputSettings.ngg(t, false, false, false, false, i);
    if (n) {
      this.CEe.AddActionMapping(e.ToUeInputActionKeyMapping());
    }
    a.set(i, e);
    return e;
  }
  static RemoveActionMapping(t, i, e, n, s) {
    var a;
    if (this.CEe?.IsValid()) {
      if (e = this.GetInputActionKeyMapByBindingType(t, e)) {
        if (a = e.get(i)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InputSettings", 10, "删除Action按键映射", ["actionName", t], ["key", i]);
          }
          this.wEe(a, e, n, s);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("InputSettings", 10, "删除Action按键映射时,找不到对应按键", ["actionName", t], ["key", i]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "删除Action按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static wEe(t, i, e, n) {
    var s = t.KeyName;
    if (e) {
      this.CEe.RemoveActionMapping(t.ToUeInputActionKeyMapping(), n);
    }
    i.delete(s);
  }
  static ClearActionMapping(t) {
    if (this.CEe?.IsValid()) {
      this.PEe(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "删除Action所有按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static PEe(t) {
    t = this.GetInputActionKeyMap(t);
    if (t && t.size > 0) {
      var i = UE.NewArray(UE.InputActionKeyMapping);
      for (const e of t.values()) {
        for (const n of e.values()) {
          i.Add(n.ToUeInputActionKeyMapping());
          InputSettings.agg(n);
        }
        e.clear();
      }
      this.CEe.RemoveActionMappings(i);
    }
  }
  static xWf(t, i, e) {
    t = this.GetInputActionKeyMap(t);
    if (t) {
      t = t.get(i);
      if (t) {
        if (e && t.size > 0) {
          var n = UE.NewArray(UE.InputActionKeyMapping);
          for (const s of t.values()) {
            n.Add(s.ToUeInputActionKeyMapping());
            InputSettings.agg(s);
          }
          this.CEe.RemoveActionMappings(n);
        } else {
          for (const a of t.values()) {
            InputSettings.agg(a);
          }
        }
        t.clear();
      }
    }
  }
  static GetInputActionKeyMap(t) {
    return this.SEe.get(t);
  }
  static GetInputActionKeyMapByBindingType(t, i) {
    t = this.SEe.get(t);
    if (t) {
      return t.get(i);
    }
  }
  static GetInputActionKey(t, i, e) {
    t = this.GetInputActionKeyMap(t);
    if (t) {
      t = t.get(e);
      if (t) {
        return t.get(i);
      }
    }
  }
  static GetActionNames() {
    this.CEe.GetActionNames(this.vEe);
    return (0, puerts_1.$unref)(this.vEe);
  }
  static GetActionMappings(t) {
    this.MEe = (0, puerts_1.$ref)(undefined);
    this.CEe.GetActionMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(t), this.MEe);
    return (0, puerts_1.$unref)(this.MEe);
  }
  static BWf(t, i, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "AddInputSettings设置Axis按键映射", ["actionName", t], ["keys", i]);
    }
    var n = this.GetInputAxisKeyMap(t, e);
    if (n) {
      for (const u of n.values()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InputSettings", 10, "AddInputSettings删除原先缓存的数据", ["AxisName", t], ["key", u.KeyName]);
        }
        this.BEe(u, n, false);
      }
    }
    var s;
    var a;
    var o = [];
    for ([s, a] of i) {
      o.push({
        KeyName: s,
        Scale: a
      });
    }
    if (o.length > 0) {
      var r = UE.NewArray(UE.InputAxisKeyMapping);
      for (const g of o) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InputSettings", 10, "AddInputSettings新增不在当前的数据", ["axisName", t], ["key", g.KeyName]);
        }
        var p = this.bEe(t, g.Scale, g.KeyName, e, false);
        r.Add(p.ToUeInputAxisKeyMapping());
      }
      this.CEe.AddAxisMappings(r);
    }
  }
  static kWf(t, i, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "ApplyInputSettings设置Axis按键映射", ["actionName", t], ["keys", i]);
    }
    var n = this.GetInputAxisKeyMap(t, e);
    if (n) {
      var s = [];
      for (const _ of n.values()) {
        var a = _.KeyName;
        if (!i.has(a) || _.Scale !== i.get(a)) {
          s.push(_);
        }
      }
      if (s.length > 0) {
        var o = UE.NewArray(UE.InputAxisKeyMapping);
        for (const I of s) {
          o.Add(I.ToUeInputAxisKeyMapping());
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InputSettings", 10, "ApplyInputSettings删除不在新数据里的数据", ["AxisName", t], ["key", I.KeyName]);
          }
          this.BEe(I, n, false);
        }
        this.CEe.RemoveAxisMappings(o);
      }
    }
    var r;
    var p;
    var u = [];
    for ([r, p] of i) {
      var g = this.GetInputAxisKey(t, r, e);
      if (!g || g.Scale !== i.get(r)) {
        u.push({
          KeyName: r,
          Scale: p
        });
      }
    }
    if (u.length > 0) {
      var c = UE.NewArray(UE.InputAxisKeyMapping);
      for (const f of u) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InputSettings", 10, "ApplyInputSettings新增不在当前的数据", ["axisName", t], ["key", f.KeyName]);
        }
        var h = this.bEe(t, f.Scale, f.KeyName, e, false);
        c.Add(h.ToUeInputAxisKeyMapping());
      }
      this.CEe.AddAxisMappings(c);
    }
  }
  static SetAxisMappingWithoutInputSettings(t, i, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "WithoutInputSettings设置Axis按键映射", ["actionName", t], ["keys", i]);
    }
    var n;
    var s;
    var a = this.GetInputAxisKeyMap(t, e);
    if (a) {
      for (const o of a.values()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InputSettings", 10, "WithoutInputSettings删除原先缓存的数据", ["AxisName", t], ["key", o.KeyName]);
        }
        this.BEe(o, a, false);
      }
    }
    for ([n, s] of i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "WithoutInputSettings新增不在当前的数据", ["axisName", t], ["key", n]);
      }
      this.bEe(t, s, n, e, false);
    }
  }
  static SetAxisMapping(t, i, e, n) {
    if (this.CEe?.IsValid()) {
      if (e !== n) {
        e = this.GetInputAxisKeyMap(t, e);
        if (e && e.size > 0) {
          var s = UE.NewArray(UE.InputAxisKeyMapping);
          for (const a of e.values()) {
            s.Add(a.ToUeInputAxisKeyMapping());
          }
          this.CEe.RemoveAxisMappings(s);
        }
        InputSettings.BWf(t, i, n);
      } else {
        InputSettings.kWf(t, i, n);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "设置Axis按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static bEe(t, i, e, n, s) {
    this.TEe(e);
    let a = this.GetInputAxisKeyMapByBindingType(t);
    if (!a) {
      a = new Map();
      this.yEe.set(t, a);
    }
    let o = a.get(n);
    if (!o) {
      o = new Map();
      a.set(n, o);
    }
    n = InputSettings.hgg(t, i, e);
    if (s) {
      this.CEe.AddAxisMapping(n.ToUeInputAxisKeyMapping(), true);
    }
    o.set(e, n);
    return n;
  }
  static BEe(t, i, e) {
    var n = t.KeyName;
    if (e) {
      this.CEe.RemoveAxisMapping(t.ToUeInputAxisKeyMapping());
    }
    InputSettings._gg(t);
    i.delete(n);
  }
  static ClearAxisMapping(t) {
    if (this.CEe?.IsValid()) {
      var i = this.GetInputAxisKeyMapByBindingType(t);
      if (i) {
        if (i.size > 0) {
          var e = UE.NewArray(UE.InputAxisKeyMapping);
          for (const n of i.values()) {
            for (const s of n.values()) {
              e.Add(s.ToUeInputAxisKeyMapping());
              InputSettings._gg(s);
            }
            n.clear();
          }
          this.CEe.RemoveAxisMappings(e);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InputSettings", 10, "删除Axis所有按键映射", ["axisName", t]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "删除Axis所有按键映射时，InputSetting不可用", ["axisName", t]);
    }
  }
  static GetInputAxisKeyMapByBindingType(t) {
    return this.yEe.get(t);
  }
  static GetInputAxisKeyMap(t, i) {
    t = this.yEe.get(t);
    if (t) {
      return t.get(i);
    }
  }
  static GetInputAxisKey(t, i, e) {
    t = this.yEe.get(t);
    if (t) {
      t = t.get(e);
      if (t) {
        return t.get(i);
      }
    }
  }
  static GetAxisNames() {
    this.CEe.GetAxisNames(this.vEe);
    return (0, puerts_1.$unref)(this.vEe);
  }
  static GetAxisMappings(t) {
    this.EEe = (0, puerts_1.$ref)(undefined);
    this.CEe.GetAxisMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(t), this.EEe);
    return (0, puerts_1.$unref)(this.EEe);
  }
  static GetCombinationActionKeyMap(t) {
    return this.LEe.get(t);
  }
  static GetCombinationActionKey(t, i) {
    t = this.LEe.get(t);
    if (t) {
      return t.get(i);
    }
  }
  static GetCombinationAxisKeyMap(t) {
    return this.REe.get(t);
  }
  static GetCombinationAxisKey(t, i) {
    t = this.REe.get(t);
    if (t) {
      return t.get(i);
    }
  }
  static SetUseMouseForTouch(t) {
    if (this.CEe) {
      this.CEe.bUseMouseForTouch = t;
    }
  }
  static GetKeyboardPrimaryLangId() {
    if (this.CEe) {
      var t = this.CEe.GetKeyboardPrimaryLangId().toString();
      if (t === "French" || t === "Thai") {
        return t;
      }
    }
    return "Default";
  }
}
(exports.InputSettings = InputSettings).CEe = undefined;
InputSettings.UEe = new Map();
InputSettings.SEe = new Map();
InputSettings.yEe = new Map();
InputSettings.LEe = new Map();
InputSettings.REe = new Map();
InputSettings.vEe = (0, puerts_1.$ref)(undefined);
InputSettings.MEe = (0, puerts_1.$ref)(undefined);
InputSettings.EEe = (0, puerts_1.$ref)(undefined);
InputSettings.sgg = [];
InputSettings.lgg = []; //# sourceMappingURL=InputSettings.js.map