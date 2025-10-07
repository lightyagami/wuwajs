"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSettings = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../Manager/ConfigManager");
const InputKeyUtils_1 = require("./InputKeyUtils");
const InputActionKey_1 = require("./Key/InputActionKey");
const InputAxisKey_1 = require("./Key/InputAxisKey");
const InputCombinationActionKey_1 = require("./Key/InputCombinationActionKey");
const InputCombinationAxisKey_1 = require("./Key/InputCombinationAxisKey");
const InputKey_1 = require("./Key/InputKey");
class InputSettings {
  static Initialize() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InputSettings", 10, "初始化InputSettings");
    }
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
          for (let t = 0; t < s.Num(); t++) {
            var a = s.Get(t);
            this.CEe.RemoveActionMapping(a);
          }
          continue;
        }
      }
      let i = this.SEe.get(n);
      if (!i) {
        i = new Map();
        this.SEe.set(n, i);
      }
      for (let t = 0; t < s.Num(); t++) {
        var o = s.Get(t);
        var r = o.Key.KeyName.toString();
        this.TEe(r);
        if (!i.get(r)?.IsEqual(o)) {
          o = InputActionKey_1.InputActionKey.NewByInputActionKeyMapping(o);
          i.set(r, o);
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
          for (let t = 0; t < s.Num(); t++) {
            var a = s.Get(t);
            this.CEe.RemoveAxisMapping(a);
          }
          continue;
        }
      }
      let i = this.yEe.get(n);
      if (!i) {
        i = new Map();
        this.yEe.set(n, i);
      }
      for (let t = 0; t < s.Num(); t++) {
        var o = s.Get(t);
        var r = o.Key.KeyName.toString();
        this.TEe(r);
        if (!i.get(r)?.IsEqual(o)) {
          o = InputAxisKey_1.InputAxisKey.NewByInputAxisKeyMapping(o);
          i.set(r, o);
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
    var i = this.GetKey(t);
    if (i) {
      if (i.IsKeyboardKey || i.IsMouseButton) {
        return InputKeyUtils_1.InputKeyUtils.GetPcKeyIconPathByCurrentPlatform(t);
      } else if (!i.IsGamepadKey || (i = InputKeyUtils_1.InputKeyUtils.GetGamepadKeyIconPath(t), StringUtils_1.StringUtils.IsBlank(i))) {
        return undefined;
      } else {
        return i;
      }
    }
  }
  static SetActionMapping(t, i) {
    if (this.CEe?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "设置Action按键映射", ["actionName", t], ["keys", i]);
      }
      this.PEe(t);
      for (const e of i) {
        this.xEe(t, e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "设置Action按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static AddActionMapping(t, i) {
    if (this.CEe?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "添加Action按键映射", ["actionName", t], ["key", i]);
      }
      this.xEe(t, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "添加Action按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static xEe(t, i) {
    this.TEe(i);
    let e = this.GetInputActionKeyMap(t);
    if (!e) {
      e = new Map();
      this.SEe.set(t, e);
    }
    t = InputActionKey_1.InputActionKey.New(t, false, false, false, false, i);
    this.CEe.AddActionMapping(t.ToUeInputActionKeyMapping());
    e.set(i, t);
  }
  static RemoveActionMappingByCondition(t, i) {
    if (i) {
      if (this.CEe?.IsValid()) {
        var e = this.GetInputActionKeyMap(t);
        if (e) {
          var n = [];
          for (const s of e.values()) {
            if (i(s.KeyName)) {
              n.push(s);
            }
          }
          for (const a of n) {
            this.wEe(a, e);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InputSettings", 10, "删除Action按键映射时，InputSetting不可用", ["actionName", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "请使用RemoveActionMapping");
    }
  }
  static RemoveActionMapping(t, i) {
    var e;
    var n;
    if (this.CEe?.IsValid()) {
      if (e = this.GetInputActionKeyMap(t)) {
        if (n = e.get(i)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InputSettings", 10, "删除Action按键映射", ["actionName", t], ["key", i]);
          }
          this.wEe(n, e);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("InputSettings", 10, "删除Action按键映射时,找不到对应按键", ["actionName", t], ["key", i]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "删除Action按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static wEe(t, i) {
    var e = t.KeyName;
    this.CEe.RemoveActionMapping(t.ToUeInputActionKeyMapping());
    i.delete(e);
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
    if (t) {
      for (const i of t.values()) {
        this.CEe.RemoveActionMapping(i.ToUeInputActionKeyMapping());
      }
      t.clear();
    }
  }
  static GetInputActionKeyMap(t) {
    return this.SEe.get(t);
  }
  static GetInputActionKey(t, i) {
    t = this.SEe.get(t);
    if (t) {
      return t.get(i);
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
  static SetAxisMapping(t, i) {
    if (this.CEe?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "设置Axis按键映射", ["actionName", t], ["keys", i]);
      }
      var e;
      var n;
      var s = this.GetInputAxisKeyMap(t);
      if (s) {
        var a = [];
        for (const p of s.values()) {
          var o = p.KeyName;
          if (!i.has(o) || p.Scale !== i.get(o)) {
            a.push(p);
          }
        }
        for (const g of a) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InputSettings", 10, "删除不在新数据里的数据", ["AxisName", t], ["key", g.KeyName]);
          }
          this.BEe(g, s);
        }
      }
      for ([e, n] of i) {
        var r = this.GetInputAxisKey(t, e);
        if (!r || r.Scale !== i.get(e)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InputSettings", 10, "新增不在当前的数据", ["axisName", t], ["key", e]);
          }
          this.bEe(t, n, e);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "设置Axis按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static AddAxisMapping(t, i, e) {
    if (this.CEe?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "添加Axis按键映射", ["axisName", t], ["key", i], ["scale", e]);
      }
      this.bEe(t, e, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "添加Axis按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static bEe(t, i, e) {
    this.TEe(e);
    let n = this.GetInputAxisKeyMap(t);
    if (!n) {
      n = new Map();
      this.yEe.set(t, n);
    }
    t = InputAxisKey_1.InputAxisKey.New(t, i, e);
    this.CEe.AddAxisMapping(t.ToUeInputAxisKeyMapping());
    n.set(e, t);
  }
  static RemoveAxisMappingByCondition(t, i) {
    if (i) {
      if (this.CEe?.IsValid()) {
        var e = this.GetInputAxisKeyMap(t);
        if (e) {
          var n = [];
          for (const s of e.values()) {
            if (i(s.KeyName)) {
              n.push(s);
            }
          }
          for (const a of n) {
            this.BEe(a, e);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InputSettings", 10, "删除Action按键映射时，InputSetting不可用", ["actionName", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "请使用RemoveActionMapping");
    }
  }
  static RemoveAxisMapping(t, i) {
    var e;
    var n;
    if (this.CEe?.IsValid()) {
      if (e = this.GetInputAxisKeyMap(t)) {
        if (n = e.get(i)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InputSettings", 10, "删除Axis按键映射", ["axisName", t], ["key", i]);
          }
          this.BEe(n, e);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("InputSettings", 10, "删除Axis按键映射,找不到对应按键", ["actionName", t], ["key", i]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "添加Axis按键映射时，InputSetting不可用", ["actionName", t]);
    }
  }
  static BEe(t, i) {
    var e = t.KeyName;
    this.CEe.RemoveAxisMapping(t.ToUeInputAxisKeyMapping());
    i.delete(e);
  }
  static ClearAxisMapping(t) {
    var i = this.GetInputAxisKeyMap(t);
    if (i) {
      for (const e of i.values()) {
        this.CEe.RemoveAxisMapping(e.ToUeInputAxisKeyMapping());
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "删除Axis所有按键映射", ["axisName", t]);
      }
      i.clear();
    }
  }
  static GetInputAxisKeyMap(t) {
    return this.yEe.get(t);
  }
  static GetInputAxisKey(t, i) {
    t = this.yEe.get(t);
    if (t) {
      return t.get(i);
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
      if (t === "French") {
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
InputSettings.EEe = (0, puerts_1.$ref)(undefined); //# sourceMappingURL=InputSettings.js.map