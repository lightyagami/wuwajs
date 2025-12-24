"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputActionMapping = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InputActionBinding_1 = require("../Binding/InputActionBinding");
class InputActionMapping {
  constructor() {
    this.WEe = new Map();
    this.KEe = new Map();
    this.QEe = new Map();
  }
  Initialize() {
    var n = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig();
    if (n) {
      for (const t of n) {
        this.NewActionBinding(t);
      }
    }
  }
  Clear() {
    for (const n of this.WEe.values()) {
      n.Clear();
    }
    this.WEe.clear();
    this.KEe.clear();
    this.QEe.clear();
  }
  NewActionBinding(n) {
    var t = n.ActionName;
    var i = new InputActionBinding_1.InputActionBinding();
    i.Initialize(n);
    var n = i.GetConfigId();
    this.WEe.set(t, i);
    this.KEe.set(n, i);
    var t = i.GetActionMappingType();
    let e = this.QEe.get(t);
    if (!e) {
      e = new Set();
      this.QEe.set(t, e);
    }
    e.add(i);
  }
  RemoveActionBinding(n) {
    var t;
    var i;
    var e = this.WEe.get(n);
    if (e) {
      t = e.GetConfigId();
      i = e.GetActionMappingType();
      this.QEe.get(i)?.delete(e);
      this.WEe.delete(n);
      this.KEe.delete(t);
      e.Clear();
    }
  }
  ClearAllActionKeys() {
    for (const n of this.WEe.values()) {
      n.ClearAllKeys();
    }
  }
  GetActionBinding(n) {
    return this.WEe.get(n);
  }
  GetActionBindingMap() {
    return this.WEe;
  }
  GetActionBindingByConfigId(n) {
    return this.KEe.get(n);
  }
  GetActionBindingByActionMappingType(n) {
    return this.QEe.get(n);
  }
  SetKeys(n, t, i) {
    var e = this.WEe.get(n);
    if (e) {
      e.SetKeys(t, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedActionKeys, n, e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "设置Action按键时，找不到对应Action", ["ActionName", n]);
    }
  }
  RefreshKeysByActionMappings(n, t, i) {
    var e = this.WEe.get(n);
    if (e) {
      e.RefreshKeysByActionMappings(t, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedActionKeys, n, e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "设置Action按键时，找不到对应Action", ["ActionName", n]);
    }
  }
  SwitchKeysByBindingType(n) {
    for (const t of this.WEe.values()) {
      t.SwitchKeysByBindingType(n);
    }
  }
}
exports.InputActionMapping = InputActionMapping;
//# sourceMappingURL=InputActionMapping.js.map