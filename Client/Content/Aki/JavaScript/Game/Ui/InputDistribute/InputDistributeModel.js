"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDistributeModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Game/Manager/ConfigManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputActionHandle_1 = require("./InputActionHandle");
const InputAxisHandle_1 = require("./InputAxisHandle");
const InputDistributeDefine_1 = require("./InputDistributeDefine");
const InputDistributeDelay_1 = require("./InputDistributeDelay");
const InputDistributeSetupDefine_1 = require("./InputDistributeSetupDefine");
const InputDistributeTag_1 = require("./InputDistributeTag");
const InputKeyHandle_1 = require("./InputKeyHandle");
const InputTouchHandle_1 = require("./InputTouchHandle");
const EMIT_EVENT_AXIS_DELTA = 0.05;
class InputDistributeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Ymr = [];
    this.Z6a = [];
    this.Jmr = new Set();
    this.zmr = [];
    this.Zmr = new Map();
    this.edr = new Map();
    this.tdr = new Map();
    this.idr = new Map();
    this.odr = new Map();
    this.rdr = new Map();
    this.ndr = new Set();
    this.sdr = undefined;
    this.hdr = undefined;
    this.e8a = new Map();
    this.ldr = 0;
  }
  OnInit() {
    this._dr();
    this.udr();
    this.cdr();
    this.mdr();
    this.ddr();
    this.Cdr();
    this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
    return true;
  }
  OnClear() {
    this.ClearAllNotAllowFightInputViewNames();
    this.Zmr.clear();
    this.zmr.length = 0;
    for (const t of this.idr.values()) {
      t.Reset();
    }
    this.idr.clear();
    for (const i of this.odr.values()) {
      i.Reset();
    }
    this.odr.clear();
    for (const e of this.tdr.values()) {
      e.Reset();
    }
    this.tdr.clear();
    this.e8a.clear();
    return true;
  }
  Cdr() {
    for (const i of InputDistributeSetupDefine_1.inputDistributeSetups) {
      var t = new i();
      this.zmr.push(t);
    }
  }
  RefreshInputDistributeTag() {
    for (const t of this.zmr) {
      if (t.OnRefresh()) {
        return;
      }
    }
  }
  udr() {
    for (var [t, i] of InputDistributeDefine_1.actionTagMap) {
      this.gdr(t, i);
    }
  }
  cdr() {
    for (var [t, i] of InputDistributeDefine_1.axisTagMap) {
      this.fdr(t, i);
    }
  }
  mdr() {
    for (var [t, i] of InputDistributeDefine_1.touchTagMap) {
      this.pdr(t, i);
    }
  }
  ddr() {
    for (var [t, i] of InputDistributeDefine_1.keyTagMap) {
      this.vdr(t, i);
    }
  }
  IsActionInPress(t) {
    t = this.Mdr(t);
    return !!t && t.GetIsPress();
  }
  IsAxisInPress(t) {
    t = this.ydr(t);
    return !!t && t.GetCacheAxisValue() !== 0;
  }
  InputAction(i, e) {
    var t = this.Mdr(i);
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Input", 10, "输入Action时，没有对应的ActionHandle", ["actionName", i]);
      }
      return false;
    }
    var n = ModelManager_1.ModelManager.InputModel?.GetCurrentInputData();
    if (n && !n.CheckActionInAllowFightActionNameList(i, t)) {
      return false;
    }
    t.SetIsPress(e);
    if (InputDistributeDelay_1.delayInput.includes(i)) {
      let t = undefined;
      if (this.edr.has(i)) {
        t = this.edr.get(i);
      } else {
        t = new InputDistributeDelay_1.InputDistributeDelay();
        this.edr.set(i, t);
      }
      if (t.CheckCondition(i, e)) {
        t.StartDelay(ConfigManager_1.ConfigManager.LevelGamePlayConfig.InteractInputCacheTime, e);
      }
    }
    if (this.HasActionLimitSet()) {
      if (!this.IsActionInLimitSet(i)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GuideLimitActionInput, i, e);
        return false;
      }
    } else {
      n = t.GetInputDistributeTag();
      if (n && !this.IsTagMatchAnyCurrentInputTag(n)) {
        t.InputActionIgnoreLimit(e);
        return false;
      }
      if (!this.nNa(i, n)) {
        return false;
      }
    }
    t.InputAction(e);
    t.InputActionIgnoreLimit(e);
    if (e) {
      this.sdr = i;
    } else {
      this.sdr &&= undefined;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputChangeForCond);
    return true;
  }
  nNa(t, i) {
    var i = this.GetInputDistributeTag(i);
    return !i || !!i.MatchTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag) || !!i.MatchTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag) || !(i = ModelManager_1.ModelManager.UiNavigationModel) || !i.CheckActionNameListInNavigation(t);
  }
  sNa(t, i) {
    var i = this.GetInputDistributeTag(i);
    return !i || !!i.MatchTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag) || !!i.MatchTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag) || !(i = ModelManager_1.ModelManager.UiNavigationModel) || !i.CheckAxisNameListInNavigation(t);
  }
  GetCurrentActionName() {
    return this.sdr;
  }
  InputCacheAxisValue(t, i) {
    t = this.ydr(t);
    if (t) {
      t.InputCacheAxisValue(i);
    }
  }
  InputAxis(t, i, e = false) {
    var n = this.ydr(t);
    if (n) {
      var s = ModelManager_1.ModelManager.InputModel?.GetCurrentInputData();
      if (!s || s.CheckAxisInAllowFightAxisNameList(t, n)) {
        if (this.HasActionLimitSet()) {
          if (!this.IsActionInLimitSet(t)) {
            if (Info_1.Info.AxisInputOptimize && (n.GetCacheAxisValue() !== 0 || e)) {
              n.InputAxis(0);
              n.InputAxisIgnoreLimit(0);
              return;
            } else {
              n.InputAxisIgnoreLimit(i);
              return;
            }
          }
        } else {
          s = n.GetInputDistributeTag();
          if (s && !this.IsTagMatchAnyCurrentInputTag(s)) {
            if (Info_1.Info.AxisInputOptimize && (n.GetCacheAxisValue() !== 0 || e)) {
              n.InputAxis(0);
              n.InputAxisIgnoreLimit(0);
              return;
            } else {
              n.InputAxisIgnoreLimit(i);
              return;
            }
          }
          if (!this.sNa(t, s)) {
            if (Info_1.Info.AxisInputOptimize && (n.GetCacheAxisValue() !== 0 || e)) {
              n.InputAxis(0);
              n.InputAxisIgnoreLimit(0);
              return;
            } else {
              n.InputAxisIgnoreLimit(i);
              return;
            }
          }
        }
        n.InputAxis(i);
        n.InputAxisIgnoreLimit(i);
        this.Idr(t, i);
        if (Math.abs(i) > 0) {
          this.hdr = t;
        } else {
          this.hdr &&= undefined;
        }
      }
    }
  }
  Idr(t, i) {
    if (this.sdr !== t) {
      this.ldr = 0;
    }
    if (Math.abs(i) && Math.abs(i - this.ldr) > EMIT_EVENT_AXIS_DELTA) {
      this.sdr = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputChangeForCond);
      this.ldr = i;
    }
  }
  GetCurrentAxisName() {
    return this.hdr;
  }
  InputTouch(t, i) {
    var e;
    var n = this.Tdr(t);
    if (n) {
      if (!(e = n.GetInputDistributeTag()) || !!this.IsTagMatchAnyCurrentInputTag(e)) {
        n.InputTouch(i);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "输入Action时，没有对应的ActionHandle", ["touchId", t]);
    }
  }
  BindAction(t, i) {
    var e = this.Mdr(t);
    if (e) {
      e.BindAction(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "绑定Action回调时，没有对应的ActionHandle", ["actionName", t]);
    }
  }
  ExecuteDelayInputAction(t) {
    var i = this.Mdr(t);
    if (i && this.edr.has(t) && this.edr.get(t).IsInputActive(false)) {
      i.InputAction(false);
    }
  }
  BindActions(t, i) {
    for (const e of t) {
      this.BindAction(e, i);
    }
  }
  UnBindAction(t, i) {
    var e = this.Mdr(t);
    if (e) {
      e.UnBindAction(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "取消绑定Action回调时，没有对应的ActionHandle", ["actionName", t]);
    }
  }
  UnBindActions(t, i) {
    for (const e of t) {
      this.UnBindAction(e, i);
    }
  }
  BindActionIgnoreLimit(t, i) {
    var e = this.Mdr(t);
    if (e) {
      e.BindActionIgnoreLimit(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "绑定Action回调时，没有对应的ActionHandle", ["actionName", t]);
    }
  }
  UnBindActionIgnoreLimit(t, i) {
    var e = this.Mdr(t);
    if (e) {
      e.UnBindActionIgnoreLimit(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "取消绑定Action回调时，没有对应的ActionHandle", ["actionName", t]);
    }
  }
  gdr(t, i) {
    i = new InputActionHandle_1.InputActionHandle(i, t);
    this.idr.set(t, i);
    return i;
  }
  Mdr(t) {
    return this.idr.get(t);
  }
  BindAxis(t, i) {
    var e = this.ydr(t);
    if (e) {
      e.BindAxis(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "绑定Axis回调时，没有对应的ActionHandle", ["axisName", t]);
    }
  }
  BindAxes(t, i) {
    for (const e of t) {
      this.BindAxis(e, i);
    }
  }
  GetAxisValue(t) {
    t = this.ydr(t);
    if (t) {
      return t.GetCacheAxisValue();
    } else {
      return 0;
    }
  }
  UnBindAxis(t, i) {
    var e = this.ydr(t);
    if (e) {
      e.UnBindAxis(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "取消绑定Action回调时，没有对应的ActionHandle", ["axisName", t]);
    }
  }
  UnBindAxes(t, i) {
    for (const e of t) {
      this.UnBindAxis(e, i);
    }
  }
  BindAxisIgnoreLimit(t, i) {
    var e = this.ydr(t);
    if (e) {
      e.BindAxisIgnoreLimit(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "绑定Axis回调时，没有对应的ActionHandle", ["axisName", t]);
    }
  }
  UnBindAxisIgnoreLimit(t, i) {
    var e = this.ydr(t);
    if (e) {
      e.UnBindAxisIgnoreLimit(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "取消绑定Axis回调时，没有对应的ActionHandle", ["axisName", t]);
    }
  }
  BindTouch(t, i) {
    var e = this.Tdr(t);
    if (e) {
      e.BindTouch(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "绑定Touch回调时，没有对应的ActionHandle", ["axisName", t]);
    }
  }
  BindTouches(t, i) {
    for (const e of t) {
      this.BindTouch(e, i);
    }
  }
  UnBindTouch(t, i) {
    var e = this.Tdr(t);
    if (e) {
      e.UnBindTouch(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "取消绑定Touch回调时，没有对应的ActionHandle", ["axisName", t]);
    }
  }
  UnBindTouches(t, i) {
    for (const e of t) {
      this.UnBindTouch(e, i);
    }
  }
  fdr(t, i) {
    i = new InputAxisHandle_1.InputAxisHandle(i, t);
    this.odr.set(t, i);
    return i;
  }
  ydr(t) {
    return this.odr.get(t);
  }
  pdr(t, i) {
    i = new InputTouchHandle_1.InputTouchHandle(i, t.toString());
    this.rdr.set(t, i);
    return i;
  }
  Tdr(t) {
    return this.rdr.get(t);
  }
  vdr(t, i) {
    i = new InputKeyHandle_1.InputKeyHandle(i, t);
    this.tdr.set(t, i);
    return i;
  }
  Ldr(t) {
    return this.tdr.get(t);
  }
  BindKey(t, i) {
    var e = this.Ldr(t);
    if (e) {
      e.BindAction(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "绑定Key回调时，没有对应的KeyHandle", ["keyName", t]);
    }
  }
  UnBindKey(t, i) {
    var e = this.Ldr(t);
    if (e) {
      e.UnBindAction(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Input", 10, "取消绑定Key回调时，没有对应的KeyHandle", ["keyName", t]);
    }
  }
  InputKey(t, i) {
    var e;
    var t = this.Ldr(t);
    if (!!t && (!(e = t.GetInputDistributeTag()) || !!this.IsTagMatchAnyCurrentInputTag(e))) {
      t.InputKey(i);
    }
  }
  HasAnyNotAllowFightInputViewIsOpen() {
    return this.ndr.size > 0;
  }
  HasNotAllowFightInputViewIsOpen(t) {
    return this.ndr.has(t);
  }
  AddNotAllowFightInputViewName(t) {
    this.ndr.add(t);
  }
  RemoveNotAllowFightInputViewName(t) {
    this.ndr.delete(t);
  }
  ClearAllNotAllowFightInputViewNames() {
    this.ndr.clear();
  }
  GetNotAllowFightInputViewNameSet() {
    return this.ndr;
  }
  _dr() {
    for (const e of InputDistributeDefine_1.initializeInputDistributeTagDefine) {
      var t = e.Tag;
      var i = e.ParentTag;
      var i = this.GetInputDistributeTag(i);
      this.Ddr(t, i);
    }
  }
  Ddr(t, i) {
    i = new InputDistributeTag_1.InputDistributeTag(t, i);
    this.Zmr.set(t, i);
    return i;
  }
  GetInputDistributeTag(t) {
    return this.Zmr.get(t);
  }
  MatchTag(t, i, e = false) {
    t = this.GetInputDistributeTag(t);
    return !!i && t.MatchTag(i.TagName, e);
  }
  IsTagMatchAnyCurrentInputTag(t, i = false) {
    return this.IsTagMatchAnyInputDistributeTags(t, this.Ymr, i);
  }
  IsAnyInputDistributeTagsMatchTag(t, i, e = false) {
    for (const n of t) {
      if (n.MatchTag(i, e)) {
        return true;
      }
    }
    return false;
  }
  IsTagMatchAnyInputDistributeTags(t, i, e = false) {
    var n = this.GetInputDistributeTag(t);
    for (const s of i) {
      if (n.MatchTag(s.TagName, e)) {
        return true;
      }
    }
    return false;
  }
  IsTagMatchInputDistributeTags(t, i, e = false) {
    var n = this.GetInputDistributeTag(t);
    for (const s of i) {
      if (n.MatchTag(s, e)) {
        return true;
      }
    }
    return false;
  }
  AddToLimitInputDistributeActions(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "[InputDistribute]设置输入分发限制Action", ["actionName", t]);
    }
    this.Jmr.add(t);
  }
  ClearLimitInputDistributeActions() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "[InputDistribute]清除输入分发限制Action");
    }
    this.Jmr.clear();
  }
  HasActionLimitSet() {
    return this.Jmr.size > 0;
  }
  IsActionInLimitSet(t) {
    return this.Jmr.has(t);
  }
  AddInputDistributeTag(t) {
    if (this.Rdr(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputDistribute]添加输入分发Tag", ["tagName", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.Ymr);
      this.xMe();
    }
  }
  Rdr(t) {
    t = this.GetInputDistributeTag(t);
    return !!t && (this.Ymr.push(t), true);
  }
  SetInputDistributeTag(t) {
    var i = this.GetInputDistributeTag(t);
    if (i) {
      this.Ymr = [i];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputDistribute]设置输入分发Tag", ["tagName", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.Ymr);
      this.xMe();
    }
  }
  SetInputDistributeTags(t) {
    this.ClearInputDistributeTag();
    for (const i of t) {
      this.Rdr(i);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "[InputDistribute]设置输入分发Tag", ["tagNames", t]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.Ymr);
    this.xMe();
  }
  RemoveInputDistributeTag(t, i = false) {
    var e = this.GetInputDistributeTag(t);
    if (e) {
      if (i) {
        var n = [];
        for (const r of this.Ymr) {
          if (r.MatchTag(e.TagName)) {
            n.push(r);
          }
        }
        for (const u of n) {
          var s = this.Ymr.indexOf(u);
          if (!(s < 0)) {
            this.Ymr.splice(s, 1);
          }
        }
      } else {
        t = this.Ymr.indexOf(e);
        if (!(t < 0)) {
          this.Ymr.splice(t, 1);
        }
      }
    }
  }
  ClearInputDistributeTag() {
    this.Ymr.length = 0;
  }
  xMe() {
    for (const n of this.e8a.keys()) {
      var t = this.e8a.get(n);
      if (!t || t.size === 0) {
        return;
      }
      var i = this.IsTagMatchAnyInputDistributeTags(n, this.Z6a);
      var e = this.IsTagMatchAnyInputDistributeTags(n, this.Ymr);
      if (i !== e) {
        this.t8a(t, n, e);
      }
    }
    this.Z6a = [...this.Ymr];
  }
  t8a(t, i, e) {
    for (const n of t) {
      try {
        n(i, e);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Input", 37, "[InputDistribute]Tag事件回调执行异常", t, ["tag", i], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Input", 37, "[InputDistribute]Tag事件回调执行异常", ["tag", i], ["error", t]);
        }
      }
    }
  }
  AddInputDistributeTagChangedListener(i, e) {
    if (i && e) {
      let t = this.e8a.get(i);
      if (!t) {
        this.e8a.set(i, t = new Set());
      }
      if (!t.has(e)) {
        t.add(e);
      }
    }
  }
  RemoveInputDistributeTagChangedListener(t, i) {
    var e = this.e8a.get(t);
    if (e && (e.delete(i), e.size === 0)) {
      this.e8a.delete(t);
    }
  }
  IsAllowFightInput() {
    return this.IsAnyInputDistributeTagsMatchTag(this.Ymr, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
  }
  IsAllowFightMoveInput() {
    return this.IsTagMatchAnyInputDistributeTags(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag, this.Ymr);
  }
  IsAllowFightActionInput() {
    return this.IsTagMatchAnyInputDistributeTags(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInputTag, this.Ymr);
  }
  IsAllowFightCameraRotationInput() {
    return this.IsTagMatchAnyInputDistributeTags(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraRotationTag, this.Ymr);
  }
  IsAllowFightCameraZoomInput() {
    return this.IsTagMatchAnyInputDistributeTags(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraZoomTag, this.Ymr);
  }
  IsAllowHeadRotation() {
    return this.IsAllowFightInput() || this.IsTagMatchAnyInputDistributeTags(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, this.Ymr);
  }
  IsAllowUiInput() {
    return this.IsTagMatchAnyInputDistributeTags(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag, this.Ymr);
  }
  GetActionInputDistributeTagName(t) {
    return InputDistributeDefine_1.actionTagMap.get(t);
  }
}
exports.InputDistributeModel = InputDistributeModel;
//# sourceMappingURL=InputDistributeModel.js.map