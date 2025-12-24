"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputAxisMapping = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InputAxisBinding_1 = require("../Binding/InputAxisBinding");
class InputAxisMapping {
  constructor() {
    this.XEe = new Map();
    this.$Ee = new Map();
  }
  Initialize() {
    var i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig();
    if (i) {
      for (const e of i) {
        this.NewAxisBinding(e);
      }
    }
  }
  Clear() {
    for (const i of this.XEe.values()) {
      i.Clear();
    }
    this.XEe.clear();
    this.$Ee.clear();
  }
  NewAxisBinding(i) {
    var e = i.AxisName;
    var n = new InputAxisBinding_1.InputAxisBinding();
    n.Initialize(i);
    this.XEe.set(e, n);
    var i = n.GetAxisMappingType();
    let t = this.$Ee.get(i);
    if (!t) {
      t = new Set();
      this.$Ee.set(i, t);
    }
    t.add(n);
  }
  RemoveAxisBinding(i) {
    var e;
    var n = this.XEe.get(i);
    if (n) {
      e = n.GetAxisMappingType();
      this.$Ee.get(e)?.delete(n);
      this.XEe.delete(i);
      n.Clear();
    }
  }
  ClearAllAxisKeys() {
    for (const i of this.XEe.values()) {
      i.ClearAllKeys();
    }
  }
  GetAxisBinding(i) {
    return this.XEe.get(i);
  }
  GetAxisBindingMap() {
    return this.XEe;
  }
  GetAxisBindingByAxisMappingType(i) {
    return this.$Ee.get(i);
  }
  SetKeys(i, e, n) {
    var t = this.XEe.get(i);
    if (t) {
      t.SetKeys(e, n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedAxisKeys, i, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "设置Axis按键时，找不到对应Axis", ["AxisName", i]);
    }
  }
  RefreshKeys(i, e, n) {
    var t = this.XEe.get(i);
    if (t) {
      t.RefreshKeys(e, n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedAxisKeys, i, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "设置Axis按键时，找不到对应Axis", ["AxisName", i]);
    }
  }
  SwitchKeysByBindingType(i) {
    for (const e of this.XEe.values()) {
      e.SwitchKeysByBindingType(i);
    }
  }
}
exports.InputAxisMapping = InputAxisMapping;
//# sourceMappingURL=InputAxisMapping.js.map