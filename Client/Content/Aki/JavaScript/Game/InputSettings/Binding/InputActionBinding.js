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
class InputActionBinding {
  constructor() {
    this.ZMe = undefined;
    this.Mne = 0;
    this.Lo = undefined;
    this.eEe = 0;
    this.tEe = [];
    this.iEe = [];
    this.rEe = [];
    this.Xih = 0;
    this.Yih = 0;
  }
  Initialize(t) {
    this.ZMe = t.ActionName;
    this.Lo = t;
    this.Mne = this.Lo.Id;
    this.eEe = this.Lo.ActionType;
    this.Xih = t.KeyboardVersion;
    this.Yih = t.GamepadVersion;
  }
  Clear() {
    this.ZMe = undefined;
    this.eEe = 0;
    this.Lo = undefined;
    this.tEe.length = 0;
    this.iEe.length = 0;
    this.rEe.length = 0;
    this.Xih = 0;
    this.Yih = 0;
  }
  GetActionName() {
    return this.ZMe;
  }
  SetKeyboardVersion(t) {
    this.Xih = t;
  }
  GetKeyboardVersion() {
    return this.Xih;
  }
  SetGamepadVersion(t) {
    this.Yih = t;
  }
  GetGamepadVersion() {
    return this.Yih;
  }
  GetInputActionKeyMap() {
    return InputSettings_1.InputSettings.GetInputActionKeyMap(this.ZMe);
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
      return InputSettings_1.InputSettings.GetInputActionKey(this.ZMe, this.tEe[t]);
    }
  }
  GetPcKey() {
    var t = this.tEe[0];
    return InputSettings_1.InputSettings.GetKey(t);
  }
  GetGamepadKeyByIndex(t) {
    if (this.iEe && !(t >= this.iEe.length)) {
      return InputSettings_1.InputSettings.GetInputActionKey(this.ZMe, this.iEe[t]);
    }
  }
  GetGamepadKey() {
    var t = this.iEe[0];
    return InputSettings_1.InputSettings.GetKey(t);
  }
  GetPcKeyNameList(t) {
    for (const e of this.tEe) {
      t.push(e);
    }
  }
  GetPcKeyNameListReadonly() {
    return this.tEe;
  }
  GetGamepadKeyNameList(t) {
    for (const e of this.iEe) {
      t.push(e);
    }
  }
  GetGamepadKeyNameListReadonly() {
    return this.iEe;
  }
  GetKeyNameList(t) {
    for (const e of this.rEe) {
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
    return InputSettings_1.InputSettings.GetInputActionKeyMap(this.ZMe).has(t);
  }
  HasAnyKey() {
    return this.rEe.length > 0;
  }
  SetKeys(t) {
    InputSettings_1.InputSettings.SetActionMapping(this.ZMe, t);
    this.rEe = t;
    this.nEe();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActionKeyChanged, this.ZMe);
  }
  SetKeyboardKeys(t) {
    t = t.concat(this.iEe);
    this.SetKeys(t);
  }
  SetGamepadKeys(t) {
    t = this.tEe.concat(t);
    this.SetKeys(t);
  }
  RefreshKeysByActionMappings(e) {
    this.rEe.length = 0;
    for (let t = e.Num() - 1; t >= 0; t--) {
      var i = e.Get(t).Key.KeyName.toString();
      this.rEe.push(i);
    }
    this.nEe();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActionKeyChanged, this.ZMe);
  }
  AddKeys(t) {
    for (const e of t) {
      InputSettings_1.InputSettings.AddActionMapping(this.ZMe, e);
      this.rEe.push(e);
    }
    this.nEe();
  }
  RemoveKeys(t) {
    for (const i of t) {
      InputSettings_1.InputSettings.RemoveActionMapping(this.ZMe, i);
      var e = this.rEe.indexOf(i);
      this.rEe.splice(e, 1);
    }
    this.nEe();
  }
  RemoveKeysByCondition(t) {
    InputSettings_1.InputSettings.RemoveActionMappingByCondition(this.ZMe, t);
    this.nEe();
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
  nEe() {
    if (this.tEe) {
      this.tEe.length = 0;
    }
    if (this.iEe) {
      this.iEe.length = 0;
    }
    if (this.rEe) {
      for (const e of this.rEe) {
        var t = InputSettings_1.InputSettings.GetKey(e);
        if (t) {
          if (t.IsKeyboardKey || t.IsMouseButton) {
            this.tEe.push(e);
          } else if (t.IsGamepadKey || t.IsPcPsTouchPadKey) {
            this.iEe.push(e);
          }
        }
      }
    }
  }
  ConvertSort() {
    var t = ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(this.ZMe);
    let n = [];
    n = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard ? t.FrancePcKeys : t.PcKeys;
    this.rEe.sort((t, e) => {
      var i = InputSettings_1.InputSettings.IsKeyboardKey(t) || InputSettings_1.InputSettings.IsMouseButton(t);
      var s = InputSettings_1.InputSettings.IsKeyboardKey(e) || InputSettings_1.InputSettings.IsMouseButton(e);
      if (i !== s) {
        if (i) {
          return -1;
        } else {
          return 1;
        }
      }
      if (i === s) {
        i = n.indexOf(t);
        s = n.indexOf(e);
        if (i !== -1 && s !== -1) {
          if (i < s) {
            return -1;
          } else {
            return 1;
          }
        }
      }
      i = InputSettings_1.InputSettings.IsGamepadKey(t);
      if (i !== InputSettings_1.InputSettings.IsGamepadKey(e)) {
        if (i) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    });
    this.SetKeys(this.rEe);
  }
}
exports.InputActionBinding = InputActionBinding;
//# sourceMappingURL=InputActionBinding.js.map