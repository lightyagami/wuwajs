"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonUiMotorcycleGamepadData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
const SkillButtonUiGamepadDataBase_1 = require("./SkillButtonUiGamepadDataBase");
const mainKeys = ["Gamepad_FaceButton_Top", "Gamepad_FaceButton_Left", "Gamepad_FaceButton_Bottom", "Gamepad_FaceButton_Right"];
const MAIN_HALF_NUM = 4;
const dPadKeys = ["Gamepad_DPad_Up", "Gamepad_DPad_Left", "Gamepad_DPad_Down", "Gamepad_DPad_Right"];
const DPAD_KEY_NUM = 4;
const subKeys = ["Gamepad_LeftTrigger", "Gamepad_RightTrigger", "Gamepad_LeftShoulder", "Gamepad_RightShoulder"];
const SUB_KEY_NUM = 3;
const axisToActionKey = new Map([["Gamepad_LeftTriggerAxis", "Gamepad_LeftTrigger"], ["Gamepad_RightTriggerAxis", "Gamepad_RightTrigger"]]);
const actionNameToButtonTypeMap = new Map([[InputMappingsDefine_1.actionMappings.载具漂移, 1], [InputMappingsDefine_1.actionMappings.载具氮气, 5], [InputMappingsDefine_1.actionMappings.载具子弹跳, 6], [InputMappingsDefine_1.actionMappings.载具辅助机攻击, 4], [InputMappingsDefine_1.actionMappings.载具探索工具, 7], [InputMappingsDefine_1.actionMappings.载具退场技和下车, 8], [InputMappingsDefine_1.actionMappings.通用交互, 104], [InputMappingsDefine_1.actionMappings.载具视角切换, 101]]);
const axisNameToButtonTypeMap = new Map([[InputMappingsDefine_1.axisMappings.MotorMoveForward, [201, 202]]]);
const initActionNames = [InputMappingsDefine_1.actionMappings.载具漂移, InputMappingsDefine_1.actionMappings.载具氮气, InputMappingsDefine_1.actionMappings.载具子弹跳, InputMappingsDefine_1.actionMappings.载具探索工具, InputMappingsDefine_1.actionMappings.载具退场技和下车, InputMappingsDefine_1.actionMappings.通用交互, InputMappingsDefine_1.actionMappings.载具视角切换];
const initAxisNames = [InputMappingsDefine_1.axisMappings.MotorMoveForward];
const mainSecondButtonTypeSet = new Set([1, 5, 6, 8, 7, 104, 101, 201, 202]);
const subButtonTypeSet = new Set([1, 5, 6, 8, 7, 104, 101, 201, 202]);
const musicActionNames = [InputMappingsDefine_1.actionMappings.载具音乐上一首, InputMappingsDefine_1.actionMappings.载具音乐下一首, InputMappingsDefine_1.actionMappings.载具音乐播放暂停];
class SkillButtonUiMotorcycleGamepadData extends SkillButtonUiGamepadDataBase_1.SkillButtonUiGamepadDataBase {
  constructor() {
    super(...arguments);
    this.Byo = [];
    this.AllowChangeKeyReasonSet = new Set();
    this._oh = new Set();
    this.qyo = new Map();
    this.Gyo = new Map();
    this.dsf = new Map();
    this.jyo = false;
    this.IsShowCombineButton = false;
    this.Qyo = false;
    this.Xyo = false;
    this.ShootEnable = false;
    this.CurStateTagId = 0;
    this.StateButtonTypeList = undefined;
    this.Iqa = new Map();
    this.MusicSubKeyList = [];
  }
  Init() {
    this.GamepadDataType = 1;
    this.jyo = false;
    this.$yo();
    this.Yyo();
    this.SwitchInteractData.Init(1, InputMappingsDefine_1.actionMappings.载具探索工具);
    this.RefreshBaseConfigByUserSetting();
    this.RefreshSwitchInteractOpen(true);
    this.RefreshButtonData();
  }
  Clear() {
    this.ControlCameraByMoveAxis = false;
    this.ClearInputAxis();
  }
  $yo() {
    for (var [t] of actionNameToButtonTypeMap) {
      this.Byo.push(t);
    }
  }
  GetAllActionNameList() {
    return this.Byo;
  }
  GetAllAxisNameList() {
    return initAxisNames;
  }
  Yyo() {
    this.NoneIcon = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconXboxNoneIcon");
  }
  RefreshBaseConfigByUserSetting() {
    this.CombineButtonKey = "Gamepad_LeftShoulder";
    let t = 0;
    for (const _ of mainKeys) {
      this.ButtonKeyList[t] = _;
      t++;
    }
    for (const u of dPadKeys) {
      this.ButtonKeyList[t] = u;
      t++;
    }
    for (const f of subKeys) {
      if (f !== this.CombineButtonKey) {
        this.ButtonKeyList[t] = f;
        t++;
      }
    }
    this.ButtonKeyList[t] = "Gamepad_RightThumbstick";
    this.qyo.clear();
    for (const M of initActionNames) {
      var e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(M);
      if (e) {
        var i = [];
        e.GetKeyNameList(i);
        for (const g of i) {
          if (this.ButtonKeyList.includes(g)) {
            this.qyo.set(g, M);
          }
        }
      }
    }
    this.Gyo.clear();
    for (const l of initActionNames) {
      var s = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(l);
      if (s) {
        var n;
        var a;
        var o = new Map();
        s.GetKeyMap(o);
        for ([n, a] of o) {
          if (n === this.CombineButtonKey && this.ButtonKeyList.includes(a)) {
            this.Gyo.set(a, l);
          }
        }
      }
    }
    this.dsf.clear();
    for (const m of initAxisNames) {
      var h = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(m);
      if (h) {
        for (let t = 0; t < 2; t++) {
          var r;
          var p = h.GetGamepadKeyByIndex(t);
          if (p && (r = axisToActionKey.get(p.KeyName) ?? p.KeyName) && this.ButtonKeyList.includes(r)) {
            this.dsf.set(r, {
              AxisName: m,
              KeyName: r,
              Scale: p.Scale
            });
          }
        }
      }
    }
    this.Oah();
    this.dJm();
    this.eIo();
    this.KWa();
  }
  Oah() {
    this.RouletteKey = undefined;
    this.RouletteMainKey = undefined;
    this.RouletteSecondKey = undefined;
    var t = InputMappingsDefine_1.actionMappings.幻象探索选择界面;
    var e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t)?.GetGamepadKeyNameListReadonly();
    if (e?.length && e[0] !== "Gamepad_Invalid") {
      this.RouletteKey = e[0];
    } else {
      e = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(t);
      if (e?.HasGamepadCombinationAction()) {
        var i;
        var s;
        var t = new Map();
        e.GetGamepadKeyNameMap(t);
        for ([i, s] of t) {
          this.RouletteMainKey = i;
          this.RouletteSecondKey = s;
          return;
        }
      }
    }
  }
  dJm() {
    this.MusicSubKeyList.length = 0;
    for (const n of musicActionNames) {
      var t = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(n);
      if (t) {
        var e;
        var i;
        var s = new Map();
        t.GetKeyMap(s);
        for ([e, i] of s) {
          if (e === this.CombineButtonKey && (this.MusicSubKeyList.push(i), this.ButtonKeyList.includes(i))) {
            this.Gyo.set(i, n);
          }
        }
      }
    }
  }
  eIo() {
    this.MainSkillButtonTypeList.length = MAIN_HALF_NUM;
    for (let t = 0; t < MAIN_HALF_NUM; t++) {
      this.MainSkillButtonTypeList[t] = this.oIo(t, false);
      this.MainSkillCombineButtonTypeList[t] = this.oIo(t, true);
    }
    this.DpadSkillButtonTypeList.length = DPAD_KEY_NUM;
    this.DpadSkillCombineButtonTypeList.length = DPAD_KEY_NUM;
    for (let t = 0; t < DPAD_KEY_NUM; t++) {
      this.DpadSkillButtonTypeList[t] = this.oIo(MAIN_HALF_NUM + t, false);
      this.DpadSkillCombineButtonTypeList[t] = this.oIo(MAIN_HALF_NUM + t, true);
    }
    this.SubSkillButtonTypeList.length = SUB_KEY_NUM;
    for (let t = 0; t < SUB_KEY_NUM; t++) {
      this.SubSkillButtonTypeList[t] = this.oIo(MAIN_HALF_NUM + DPAD_KEY_NUM + t, false);
      this.SubSkillCombineButtonTypeList[t] = this.oIo(MAIN_HALF_NUM + DPAD_KEY_NUM + t, true);
    }
  }
  KWa() {
    for (const t of this.MainSkillCombineButtonTypeList) {
      if (t !== 0) {
        this.IsShowCombineButton = true;
        return;
      }
    }
    for (const e of this.SubSkillCombineButtonTypeList) {
      if (e !== 0) {
        this.IsShowCombineButton = true;
        return;
      }
    }
    this.IsShowCombineButton = false;
  }
  oIo(t, e) {
    let i = undefined;
    t = this.ButtonKeyList[t];
    if (i = (e ? this.Gyo : this.qyo).get(t)) {
      return actionNameToButtonTypeMap.get(i) || 0;
    }
    if (!e) {
      e = this.dsf.get(t);
      if (e) {
        t = axisNameToButtonTypeMap.get(e.AxisName);
        if (t) {
          if (e.Scale === 1) {
            return t[0];
          } else {
            return t[1];
          }
        }
      }
    }
    return 0;
  }
  RefreshSwitchInteractOpen(t = false) {
    this.SwitchInteractData.RefreshSwitchInteractOpen(t);
  }
  RefreshButtonData() {
    this.rIo();
    var t = this.CurButtonTypeList;
    this.CurButtonTypeList = this.LastButtonTypeList;
    this.LastButtonTypeList = t;
    this.CurButtonTypeList.length = 0;
    if (this.jyo) {
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        var e = this.$Wa(this.MainSkillCombineButtonTypeList, t);
        if (this.MainSkillCombineButtonTypeList[t] !== 0) {
          this.CurButtonTypeList.push(e);
        } else {
          this.CurButtonTypeList.push(this.$Wa(this.MainSkillButtonTypeList, t));
        }
      }
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        this.CurButtonTypeList.push(this.$Wa(this.MainSkillCombineButtonTypeList, t, true));
      }
      for (let t = 0; t < DPAD_KEY_NUM; t++) {
        var i = this.$Wa(this.DpadSkillCombineButtonTypeList, t);
        if (this.DpadSkillCombineButtonTypeList[t] !== 0) {
          this.CurButtonTypeList.push(i);
        } else {
          this.CurButtonTypeList.push(this.$Wa(this.DpadSkillButtonTypeList, t));
        }
      }
      for (let t = 0; t < SUB_KEY_NUM; t++) {
        this.aIo(this.SubSkillCombineButtonTypeList[t]);
      }
    } else {
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        this.CurButtonTypeList.push(this.$Wa(this.MainSkillButtonTypeList, t));
      }
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        this.CurButtonTypeList.push(this.$Wa(this.MainSkillCombineButtonTypeList, t, true));
      }
      for (let t = 0; t < DPAD_KEY_NUM; t++) {
        this.CurButtonTypeList.push(this.$Wa(this.DpadSkillButtonTypeList, t));
      }
      for (let t = 0; t < SUB_KEY_NUM; t++) {
        this.aIo(this.SubSkillButtonTypeList[t]);
      }
      this.CurButtonTypeList.push(undefined);
    }
    if (this.ShootEnable && (t = this.CurButtonTypeList.indexOf(1)) !== -1) {
      this.CurButtonTypeList[t] = 4;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[Motorcycle]RefreshGamepadButton", ["", this.CurButtonTypeList]);
    }
    var s = this.CurButtonTypeList.length;
    for (let t = 0; t < s; t++) {
      if (this.CurButtonTypeList[t] !== this.LastButtonTypeList[t]) {
        return true;
      }
    }
    return false;
  }
  $Wa(t, e, i = false) {
    t = t[e];
    if ((t === 101 || this.nIo(t)) && this.sIo(t, i)) {
      return t;
    } else {
      return 0;
    }
  }
  sIo(t, e = false) {
    return (this.CurStateTagId === 0 || !this.StateButtonTypeList || !!this.StateButtonTypeList.includes(t)) && (!e || !!mainSecondButtonTypeSet.has(t));
  }
  nIo(t) {
    var e;
    var i;
    return !!t && ((i = (e = ModelManager_1.ModelManager.SkillButtonUiModel).GetSkillButtonDataByButton(t)) ? i.IsVisible() : e.GetBehaviorButtonDataByButton(t)?.IsVisible());
  }
  aIo(t) {
    if (this.CurStateTagId !== 0) {
      if (this.sIo(t)) {
        this.CurButtonTypeList.push(t);
      } else {
        this.CurButtonTypeList.push(undefined);
      }
    } else if (subButtonTypeSet.has(t)) {
      this.CurButtonTypeList.push(t);
    } else {
      this.CurButtonTypeList.push(undefined);
    }
  }
  rIo() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid) {
      var e = t.Entity.CheckGetComponent(215);
      this.ShootEnable = e.HasTag(-1785184580);
      this.CurStateTagId = 0;
      this.StateButtonTypeList = undefined;
      var t = ModelManager_1.ModelManager.SkillButtonUiModel?.CurSkillButtonIndexData?.ButtonIndexConfig?.GamepadButtonTypeMap;
      if (t) {
        for (var [i, s] of t) {
          if (e.HasTag(i)) {
            this.CurStateTagId = i;
            this.StateButtonTypeList = s.ArrayInt;
            return;
          }
        }
      }
    }
  }
  GetButtonTypeByActionName(t) {
    return actionNameToButtonTypeMap.get(t) ?? 0;
  }
  GetButtonTypeByAxisName(t, e) {
    t = axisNameToButtonTypeMap.get(t);
    if (t) {
      if (e > 0) {
        return t[0];
      } else {
        return t[1];
      }
    } else {
      return 0;
    }
  }
  SetIsPressCombineButton(t) {
    if (this.jyo !== t) {
      this.jyo = t;
      this.RefreshButtonData();
    }
  }
  GetIsPressCombineButton() {
    return this.jyo;
  }
  GetBehaviorButtonDataByButtonType(t) {
    return ModelManager_1.ModelManager.SkillButtonUiModel.GetBehaviorButtonDataByButton(t);
  }
  RefreshSkillButtonData(t) {
    if (t === 1) {
      this.RefreshButtonData();
    }
  }
  RefreshInteractBehaviorData() {
    var t = this.GetBehaviorButtonDataByButtonType(104);
    var e = UiManager_1.UiManager.IsViewOpen("InteractionHintView");
    t.SetEnable(e);
    this.SwitchInteractData.SetInteractExist(e, 0);
  }
  OnActionKeyChanged(t) {
    if (t === InputMappingsDefine_1.actionMappings.幻象探索选择界面) {
      this.Oah();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiRouletteKeyChanged);
    } else if (!(this.AllowChangeKeyReasonSet.size > 0)) {
      if (this._oh.size > 0) {
        if (this.Qyo) {
          return undefined;
        } else {
          if (initActionNames.includes(t)) {
            this.Qyo = true;
          }
          return;
        }
      } else {
        if (!this.Xyo) {
          if (initActionNames.includes(t) && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "在未知情况下触发了改键");
          }
        }
        return;
      }
    }
  }
  AddChangeKeyReason(t) {
    this._oh.add(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "添加手柄改键原因", ["EGamepadChangeKeyReason", t]);
    }
  }
  RemoveChangeKeyReason(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "移除手柄改键原因", ["EGamepadChangeKeyReason", t]);
    }
    this._oh.delete(t);
    if (this._oh.size === 0 && (this.Qyo && (this.Qyo = false, this.RefreshBaseConfigByUserSetting()), this.RefreshButtonData(), Info_1.Info.IsInGamepad())) {
      ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData()?.RefreshSkillButtonData(3);
    }
  }
  AddAllowChangeKeyReason(t) {
    this.AllowChangeKeyReasonSet.add(t);
  }
  RemoveAllowChangeKeyReason(t) {
    this.AllowChangeKeyReasonSet.delete(t);
  }
  CacheInputAxis(t, e) {
    this.Iqa.set(t, e);
  }
  GetInputAxis(t) {
    return this.Iqa.get(t) ?? 0;
  }
  ClearInputAxis() {
    this.Iqa.clear();
  }
}
exports.SkillButtonUiMotorcycleGamepadData = SkillButtonUiMotorcycleGamepadData;
//# sourceMappingURL=SkillButtonUiMotorcycleGamepadData.js.map