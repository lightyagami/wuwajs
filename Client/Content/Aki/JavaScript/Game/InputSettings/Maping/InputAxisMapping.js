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
    var e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig();
    if (e) {
      for (const i of e) {
        this.NewAxisBinding(i);
      }
    }
  }
  Clear() {
    for (const e of this.XEe.values()) {
      e.Clear();
    }
    this.XEe.clear();
    this.$Ee.clear();
  }
  NewAxisBinding(e) {
    var i = e.AxisName;
    var t = new InputAxisBinding_1.InputAxisBinding();
    t.Initialize(e);
    this.XEe.set(i, t);
    var e = t.GetAxisMappingType();
    let n = this.$Ee.get(e);
    if (!n) {
      n = new Set();
      this.$Ee.set(e, n);
    }
    n.add(t);
  }
  RemoveAxisBinding(e) {
    var i;
    var t = this.XEe.get(e);
    if (t) {
      i = t.GetAxisMappingType();
      this.$Ee.get(i)?.delete(t);
      this.XEe.delete(e);
      t.Clear();
    }
  }
  ClearAllAxisKeys() {
    for (const e of this.XEe.values()) {
      e.ClearAllKeys();
    }
  }
  GetAxisBinding(e) {
    return this.XEe.get(e);
  }
  GetAxisBindingMap() {
    return this.XEe;
  }
  GetAxisBindingByAxisMappingType(e) {
    return this.$Ee.get(e);
  }
  SetKeys(e, i) {
    var t = this.XEe.get(e);
    if (t) {
      t.SetKeys(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedAxisKeys, e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "设置Axis按键时，找不到对应Axis", ["AxisName", e]);
    }
  }
  RefreshKeys(e, i) {
    var t = this.XEe.get(e);
    if (t) {
      t.RefreshKeys(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedAxisKeys, e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "设置Axis按键时，找不到对应Axis", ["AxisName", e]);
    }
  }
  AddKeys(e, i) {
    var t = this.XEe.get(e);
    if (t) {
      t.AddKeys(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedAxisKeys, e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "添加Axis按键时，找不到对应Axis", ["AxisName", e]);
    }
  }
  RemoveKeys(e, i) {
    var t = this.XEe.get(e);
    if (t) {
      t.RemoveKeys(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedAxisKeys, e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "删除Axis按键时，找不到对应Axis", ["AxisName", e]);
    }
  }
  RemoveKeysByCondition(e, i) {
    var t = this.XEe.get(e);
    if (t) {
      t.RemoveKeysByCondition(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangedAxisKeys, e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("InputSettings", 10, "删除Axis中符合条件的按键映射，找不到对应Axis", ["AxisName", e]);
    }
  }
}
exports.InputAxisMapping = InputAxisMapping;
//# sourceMappingURL=InputAxisMapping.js.map