"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const CursorData_1 = require("./Data/CursorData");
const UiNavigationGlobalData_1 = require("./New/UiNavigationGlobalData");
class UiNavigationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.yBo = new CursorData_1.Cursor();
    this.IsOpenLog = false;
    this.Nqo = new Map();
    this.Oqo = new Map();
    this.kqo = new Set();
    this.Fqo = undefined;
  }
  InputControllerModeChange() {
    for (const t of this.Nqo.values()) {
      for (const e of t) {
        e.RefreshMode();
      }
    }
    for (const i of this.Oqo.values()) {
      for (const r of i) {
        r.RefreshMode();
      }
    }
    for (const o of this.kqo) {
      o.ChangeAlpha();
    }
  }
  OnClear() {
    this.ClearCursor();
    UiNavigationGlobalData_1.UiNavigationGlobalData.ClearBlockListener();
    return true;
  }
  SetCursorFollowItem(t) {
    this.yBo.SetFollowItem(t);
  }
  SetIsUseMouse(t) {
    this.yBo.SetIsUseMouse(t);
  }
  MarkMoveInstantly() {
    this.yBo.IsMoveInstantly = true;
  }
  SetCursorActiveDelayTime(t) {
    this.yBo.SetCursorActiveDelayTime(t);
  }
  TrySetCursorActive(t) {
    this.yBo.TrySetUseItemUiActive(t);
  }
  RefreshCursorActive() {
    this.yBo.RefreshCursorActive();
  }
  RepeatMove() {
    this.yBo.RepeatMove();
  }
  ClearCursor() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "清理光标");
    }
    this.yBo.Clear();
  }
  OnLeaveLevel() {
    this.ClearCursor();
    return true;
  }
  Tick(t) {
    this.yBo.Tick(t);
  }
  AddActionHotKeyComponent(t, e) {
    this.Nqo.set(t, e);
  }
  GetActionHotKeyComponentSet(t) {
    return this.Nqo.get(t);
  }
  GetOrAddActionHotKeyComponentSet(t) {
    let e = this.Nqo.get(t);
    if (!e) {
      e = new Set();
      this.AddActionHotKeyComponent(t, e);
    }
    return e;
  }
  Vqo(t, e) {
    var i = new Set(e[0]);
    var t = this.egd(t);
    if (t) {
      e = e[1];
      if (e === t[1]) {
        if (e) {
          var r = new Set();
          for (const o of t[0]) {
            if (i.has(o)) {
              r.add(o);
            }
          }
          if (r.size === i.size) {
            return Array.from(r);
          }
        } else {
          for (const s of t[0]) {
            if (i.has(s)) {
              return [s];
            }
          }
        }
      }
    }
  }
  rNa(t, e) {
    var i = [];
    InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t).GetCurrentPlatformKeyNameList(i);
    for (const r of i) {
      if (e.has(r)) {
        return r;
      }
    }
  }
  egd(t) {
    var e = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(t);
    if (e) {
      var i = [];
      e.GetCurrentPlatformKeyNameList(i);
      if (i.length > 0) {
        return [i, true];
      }
    }
    e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
    if (e) {
      i = [];
      e.GetCurrentPlatformKeyNameList(i);
      if (i.length > 0) {
        return [i, false];
      }
    }
  }
  oNa(t) {
    var t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t);
    if (t) {
      t.GetCurrentPlatformKeyNameList(t = []);
      return t;
    }
  }
  CheckActionNameListInNavigation(t) {
    var e = this.egd(t);
    if (e) {
      for (var [i, r] of this.Nqo) {
        if (t !== i) {
          var o = this.Vqo(i, e);
          if (o) {
            for (const s of r) {
              if (s.IsHotKeyActive() && s.IsOccupancyFightInput()) {
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("UiNavigation", 10, "非导航输入被导航输入占用", ["非导航输入", t], ["导航输入", i], ["交集的KeyName", o]);
                }
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  CheckAxisNameListInNavigation(t) {
    var e = this.oNa(t);
    if (e) {
      var i;
      var r;
      var o = new Set(e);
      for ([i, r] of this.Oqo) {
        if (t !== i) {
          if (this.rNa(i, o)) {
            for (const s of r) {
              if (s.IsHotKeyActive() && s.GetHotKeyFunctionType() !== "ShowOnly") {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  AddAxisHotKeyComponent(t, e) {
    this.Oqo.set(t, e);
  }
  GetAxisHotKeyComponentSet(t) {
    return this.Oqo.get(t);
  }
  GetOrAddAxisHotKeyComponentsSet(t) {
    let e = this.Oqo.get(t);
    if (!e) {
      e = new Set();
      this.AddAxisHotKeyComponent(t, e);
    }
    return e;
  }
  AddPlatformListener(t) {
    this.kqo.add(t);
  }
  RemovePlatformListener(t) {
    this.kqo.delete(t);
  }
  get GuideFocusListener() {
    return this.Fqo;
  }
  SetGuideFocusListener(t) {
    this.Fqo = t;
  }
  ResetGuideFocusListener() {
    this.Fqo = undefined;
  }
}
exports.UiNavigationModel = UiNavigationModel;
//# sourceMappingURL=UiNavigationModel.js.map