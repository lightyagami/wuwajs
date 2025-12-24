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
    this.Vhf = new Map();
    this.Hhf = new Map();
    this.jhf = new Map();
    this.$hf = new Map();
    this.Whf = new Map();
    this.r5f = 0;
    this.CurrentBindingType = 0;
  }
  Initialize(t) {
    this.ZMe = t.ActionName;
    this.Lo = t;
    this.Mne = this.Lo.Id;
    this.eEe = this.Lo.ActionType;
    this.CurrentBindingType = t.ExclusiveType;
    this.r5f = t.ExclusiveType;
    for (var [i, e] of t.KeyboardVersionMap) {
      this.Vhf.set(i, e);
    }
    for (var [s, n] of t.GamepadVersionMap) {
      this.Hhf.set(s, n);
    }
  }
  Clear() {
    this.ZMe = undefined;
    this.eEe = 0;
    this.Lo = undefined;
    this.tEe.length = 0;
    this.iEe.length = 0;
    this.rEe.length = 0;
    this.jhf.clear();
    this.$hf.clear();
    this.Whf.clear();
  }
  GetActionName() {
    return this.ZMe;
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
    for (var [i, e] of this.$hf) {
      t.set(i, e);
    }
  }
  GetPcKeyNameList(t) {
    for (const i of this.tEe) {
      t.push(i);
    }
  }
  GetPcKeyNameListByBindingType(t, i) {
    for (const e of this.$hf.get(i) ?? []) {
      t.push(e);
    }
  }
  GetPcKeyNameListReadonly() {
    return this.tEe;
  }
  GetAllGamepadKeyNameMap(t) {
    for (var [i, e] of this.Whf) {
      t.set(i, e);
    }
  }
  GetGamepadKeyNameList(t) {
    for (const i of this.iEe) {
      t.push(i);
    }
  }
  GetGamepadKeyNameListByBindingType(t, i) {
    for (const e of this.Whf.get(i) ?? []) {
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
    for (const e of this.jhf.get(i) ?? []) {
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
    var i = this.$hf.get(t) ?? this.$hf.get(0);
    var e = this.Whf.get(t) ?? this.Whf.get(0);
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
      this.r5f = this.CurrentBindingType;
    }
  }
  SetKeys(t, i) {
    this.jhf.set(i, t);
    if (this.CurrentBindingType === i) {
      InputSettings_1.InputSettings.SetActionMapping(this.ZMe, t, this.r5f, i);
      this.rEe = t;
      this.nEe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActionKeyChanged, this.ZMe);
    } else {
      InputSettings_1.InputSettings.SetActionMappingApplyInputSettings(this.ZMe, t, i, false, false);
      this.Qhf(i);
    }
  }
  SetKeyboardKeys(t, i) {
    var e = this.Whf.get(i) ?? [];
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
    t = (this.$hf.get(i) ?? []).concat(t);
    this.SetKeys(t, i);
  }
  SetGamepadKeysWithoutOriginal(t) {
    for (const i of this.$hf.keys()) {
      if (i !== 0) {
        this.SetGamepadKeys(t, i);
      }
    }
  }
  RefreshKeysByActionMappings(i, t) {
    var e = this.Khf(t);
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
      this.Qhf(t);
    }
  }
  AddKeys(t, i) {
    var e = this.Khf(i);
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
      this.Qhf(i);
    }
  }
  RemoveKeys(t, i) {
    var e = this.Khf(i);
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
      this.Qhf(i);
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
  Qhf(t) {
    let i = [];
    let e = [];
    var s = this.jhf.get(t) ?? [];
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
      if (!this.$hf.has(t) && i.length === 0) {
        i = this.$hf.get(0) ?? [];
      }
      s = this.Whf.has(t);
      if (!s && e.length === 0) {
        e = this.Whf.get(0) ?? [];
      }
      if (this.CurrentBindingType === t) {
        this.tEe = i;
        this.iEe = e;
      }
      this.$hf.set(t, i);
      this.Whf.set(t, e);
    }
  }
  nEe() {
    this.Qhf(this.CurrentBindingType);
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
    return this.jhf;
  }
  GetCopyKeyNameListToBindingTypeMap() {
    return new Map(this.jhf);
  }
  Khf(t) {
    let i = this.jhf.get(t);
    if (!i) {
      i = [];
      this.jhf.set(t, i);
    }
    return i;
  }
}
exports.InputActionBinding = InputActionBinding;
//# sourceMappingURL=InputActionBinding.js.map