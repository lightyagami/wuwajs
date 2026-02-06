"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputActionBinding = undefined;
const Info_1 = require("../../../Core/Common/Info");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InputSettings_1 = require("../InputSettings");
const InputSettingsManager_1 = require("../InputSettingsManager");
const LanguageKeyTransUtils_1 = require("../LanguageKeyTrans/LanguageKeyTransUtils");
const InputBindingDefine_1 = require("./InputBindingDefine");
class InputActionBinding {
  constructor() {
    this.ZMe = undefined;
    this.Mne = 0;
    this.Lo = undefined;
    this.eEe = 0;
    this.tEe = [];
    this.iEe = [];
    this.rEe = [];
    this.s_f = new Map();
    this.a_f = new Map();
    this.h_f = new Map();
    this.l_f = new Map();
    this.__f = new Map();
    this.UWf = 0;
    this.CurrentBindingType = 0;
  }
  Initialize(t) {
    this.ZMe = t.ActionName;
    this.Lo = t;
    this.Mne = this.Lo.Id;
    this.eEe = this.Lo.ActionType;
    this.CurrentBindingType = t.ExclusiveType;
    this.UWf = t.ExclusiveType;
    for (var [i, e] of t.KeyboardVersionMap) {
      this.s_f.set(i, e);
    }
    for (var [s, n] of t.GamepadVersionMap) {
      this.a_f.set(s, n);
    }
  }
  Clear() {
    this.ZMe = undefined;
    this.eEe = 0;
    this.Lo = undefined;
    this.tEe.length = 0;
    this.iEe.length = 0;
    this.rEe.length = 0;
    this.h_f.clear();
    this.l_f.clear();
    this.__f.clear();
  }
  GetActionName() {
    return this.ZMe;
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
  GetCurrentPlatformKeyByIndex(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      return this.GetPcKeyByIndex(t);
    } else if (Info_1.Info.IsInGamepad()) {
      return this.GetGamepadKeyByIndex(t);
    } else {
      return undefined;
    }
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
  GetPcKeyByIndex(t) {
    if (this.tEe && !(t >= this.tEe.length)) {
      return InputSettings_1.InputSettings.GetInputActionKey(this.ZMe, this.tEe[t], this.CurrentBindingType);
    }
  }
  GetPcKey() {
    var t = this.tEe[0];
    return InputSettings_1.InputSettings.GetKey(t);
  }
  GetGamepadKeyByIndex(t) {
    if (this.iEe && !(t >= this.iEe.length)) {
      return InputSettings_1.InputSettings.GetInputActionKey(this.ZMe, this.iEe[t], this.CurrentBindingType);
    }
  }
  GetGamepadKey() {
    var t = this.iEe[0];
    return InputSettings_1.InputSettings.GetKey(t);
  }
  GetAllPcKeyNameMap(t) {
    for (var [i, e] of this.l_f) {
      t.set(i, e);
    }
  }
  GetPcKeyNameList(t) {
    for (const i of this.tEe) {
      t.push(i);
    }
  }
  GetPcKeyNameListByBindingType(t, i) {
    for (const e of this.l_f.get(i) ?? []) {
      t.push(e);
    }
  }
  GetPcKeyNameListReadonly() {
    return this.tEe;
  }
  GetAllGamepadKeyNameMap(t) {
    for (var [i, e] of this.__f) {
      t.set(i, e);
    }
  }
  GetGamepadKeyNameList(t) {
    for (const i of this.iEe) {
      t.push(i);
    }
  }
  GetGamepadKeyNameListByBindingType(t, i) {
    for (const e of this.__f.get(i) ?? []) {
      t.push(e);
    }
  }
  GetGamepadKeyNameListReadonly() {
    return this.iEe;
  }
  GetKeyNameList(t) {
    for (const i of this.rEe) {
      t.push(i);
    }
  }
  GetKeyNameListByBindingType(t, i) {
    for (const e of this.h_f.get(i) ?? []) {
      t.push(e);
    }
  }
  GetCurrentPlatformKeyNameList(t) {
    if (Info_1.Info.IsInKeyBoard()) {
      this.GetPcKeyNameList(t);
    } else if (Info_1.Info.IsInGamepad()) {
      this.GetGamepadKeyNameList(t);
    }
  }
  HasKey(t) {
    return InputSettings_1.InputSettings.GetInputActionKeyMapByBindingType(this.ZMe, this.CurrentBindingType).has(t);
  }
  HasAnyKey() {
    return this.rEe.length > 0;
  }
  SwitchKeysByBindingType(t) {
    var i = this.l_f.get(t) ?? this.l_f.get(0);
    var e = this.__f.get(t) ?? this.__f.get(0);
    var s = [];
    if (i) {
      for (const n of i) {
        s.push(n);
      }
    }
    if (e) {
      for (const h of e) {
        s.push(h);
      }
    }
    if (s.length > 0) {
      this.CurrentBindingType = t;
      this.SetKeys(s, t);
      this.UWf = this.CurrentBindingType;
    }
  }
  SetKeys(t, i) {
    this.h_f.set(i, t);
    if (this.CurrentBindingType === i) {
      InputSettings_1.InputSettings.SetActionMapping(this.ZMe, t, this.UWf, i);
      this.rEe = t;
      this.nEe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActionKeyChanged, this.ZMe);
    } else {
      InputSettings_1.InputSettings.SetActionMappingApplyInputSettings(this.ZMe, t, i, false, false);
      this.u_f(i);
    }
  }
  SetKeyboardKeys(t, i) {
    var e = this.__f.get(i) ?? [];
    var t = t.concat(e);
    this.SetKeys(t, i);
  }
  SetKeyboardKeysWithoutOriginal(t) {
    for (const i of InputBindingDefine_1.inputBindingTypesArray) {
      if (i !== 0) {
        this.SetKeyboardKeys(t, i);
      }
    }
  }
  SetGamepadKeys(t, i) {
    t = (this.l_f.get(i) ?? []).concat(t);
    this.SetKeys(t, i);
  }
  SetGamepadKeysWithoutOriginal(t) {
    for (const i of this.l_f.keys()) {
      if (i !== 0) {
        this.SetGamepadKeys(t, i);
      }
    }
  }
  RefreshKeysByActionMappings(i, t) {
    var e = this.c_f(t);
    e.length = 0;
    for (let t = i.Num() - 1; t >= 0; t--) {
      var s = i.Get(t).Key.KeyName.toString();
      e.push(s);
    }
    if (this.CurrentBindingType === t) {
      this.rEe = e;
      this.nEe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActionKeyChanged, this.ZMe);
    } else {
      this.u_f(t);
    }
  }
  AddKeys(t, i) {
    var e = this.c_f(i);
    for (const s of t) {
      if (!t.includes(s)) {
        e.push(s);
      }
    }
    if (this.CurrentBindingType === i) {
      for (const n of t) {
        InputSettings_1.InputSettings.AddActionMapping(this.ZMe, n, i, true);
      }
      this.rEe = e;
      this.nEe();
    } else {
      this.u_f(i);
    }
  }
  RemoveKeys(t, i) {
    var e = this.c_f(i);
    for (const s of t) {
      if (e.includes(s)) {
        e.splice(e.indexOf(s), 1);
      }
    }
    if (this.CurrentBindingType === i) {
      for (const n of t) {
        InputSettings_1.InputSettings.RemoveActionMapping(this.ZMe, n, i, true, true);
      }
      this.rEe = e;
      this.nEe();
    } else {
      this.u_f(i);
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
    InputSettings_1.InputSettings.ClearActionMapping(this.ZMe);
  }
  GetActionMappingConfig() {
    return this.Lo;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetActionMappingType() {
    return this.eEe;
  }
  u_f(t) {
    let i = [];
    let e = [];
    var s = this.h_f.get(t) ?? [];
    if (s) {
      for (const h of s) {
        var n = InputSettings_1.InputSettings.GetKey(h);
        if (n) {
          if (n.IsKeyboardKey || n.IsMouseButton) {
            i.push(h);
          } else if (n.IsGamepadKey || n.IsPcPsTouchPadKey) {
            e.push(h);
          }
        }
      }
      if (!this.l_f.has(t) && i.length === 0) {
        i = this.l_f.get(0) ?? [];
      }
      s = this.__f.has(t);
      if (!s && e.length === 0) {
        e = this.__f.get(0) ?? [];
      }
      if (this.CurrentBindingType === t) {
        this.tEe = i;
        this.iEe = e;
      }
      this.l_f.set(t, i);
      this.__f.set(t, e);
    }
  }
  nEe() {
    this.u_f(this.CurrentBindingType);
  }
  ConvertSort() {
    var t = ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(this.ZMe);
    let n = [];
    n = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard ? t.FrancePcKeys : LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(InputSettingsManager_1.InputSettingsManager.CurrentDeviceLang).GetActionPcKeys(t);
    this.rEe.sort((t, i) => {
      var e = InputSettings_1.InputSettings.IsKeyboardKey(t) || InputSettings_1.InputSettings.IsMouseButton(t);
      var s = InputSettings_1.InputSettings.IsKeyboardKey(i) || InputSettings_1.InputSettings.IsMouseButton(i);
      if (e !== s) {
        if (e) {
          return -1;
        } else {
          return 1;
        }
      }
      if (e === s) {
        e = n.indexOf(t);
        s = n.indexOf(i);
        if (e !== -1 && s !== -1) {
          if (e < s) {
            return -1;
          } else {
            return 1;
          }
        }
      }
      e = InputSettings_1.InputSettings.IsGamepadKey(t);
      if (e !== InputSettings_1.InputSettings.IsGamepadKey(i)) {
        if (e) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    });
    this.SetKeys(this.rEe, this.CurrentBindingType);
  }
  GetKeyNameListToBindingTypeMap() {
    return this.h_f;
  }
  GetCopyKeyNameListToBindingTypeMap() {
    return new Map(this.h_f);
  }
  c_f(t) {
    let i = this.h_f.get(t);
    if (!i) {
      i = [];
      this.h_f.set(t, i);
    }
    return i;
  }
}
exports.InputActionBinding = InputActionBinding;
//# sourceMappingURL=InputActionBinding.js.map