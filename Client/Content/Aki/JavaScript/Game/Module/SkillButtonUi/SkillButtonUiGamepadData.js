"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonUiGamepadData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const InputEnums_1 = require("../../Input/InputEnums");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
const BehaviorButtonData_1 = require("./BehaviorButtonData");
const GamepadSwitchInteractData_1 = require("./GamepadSwitchInteractData");
const mainKeys = ["Gamepad_FaceButton_Top", "Gamepad_FaceButton_Left", "Gamepad_FaceButton_Bottom", "Gamepad_FaceButton_Right"];
const MAIN_HALF_NUM = 4;
const dPadKeys = ["Gamepad_DPad_Up", "Gamepad_DPad_Left", "Gamepad_DPad_Down", "Gamepad_DPad_Right"];
const DPAD_KEY_NUM = 4;
const subKeys = ["Gamepad_LeftTrigger", "Gamepad_RightTrigger", "Gamepad_LeftShoulder", "Gamepad_RightShoulder"];
const SUB_KEY_NUM = 3;
const actionNameToButtonTypeMap = new Map([[InputMappingsDefine_1.actionMappings.跳跃, 1], [InputMappingsDefine_1.actionMappings.攀爬, 2], [InputMappingsDefine_1.actionMappings.攻击, 4], [InputMappingsDefine_1.actionMappings.闪避, 5], [InputMappingsDefine_1.actionMappings.技能1, 6], [InputMappingsDefine_1.actionMappings.幻象1, 7], [InputMappingsDefine_1.actionMappings.大招, 8], [InputMappingsDefine_1.actionMappings.幻象2, 9], [InputMappingsDefine_1.actionMappings.瞄准, 101], [InputMappingsDefine_1.actionMappings.通用交互, 104], [InputMappingsDefine_1.actionMappings.任务追踪, 105]]);
const initActionNames = [InputMappingsDefine_1.actionMappings.跳跃, InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避, InputMappingsDefine_1.actionMappings.技能1, InputMappingsDefine_1.actionMappings.幻象1, InputMappingsDefine_1.actionMappings.大招, InputMappingsDefine_1.actionMappings.幻象2, InputMappingsDefine_1.actionMappings.瞄准, InputMappingsDefine_1.actionMappings.通用交互];
const mainSecondButtonTypeSet = new Set([1, 2, 4, 5, 6, 8, 7, 9, 101, 104]);
const subButtonTypeSet = new Set([1, 2, 4, 6, 8, 7, 9, 11, 101, 104]);
const phantomRoleButtonTypeSet = new Set([101, 104]);
class SkillButtonUiGamepadData {
  constructor() {
    this.Byo = [];
    this.byo = new Map();
    this.AllowChangeKeyReasonSet = new Set();
    this._oh = new Set();
    this.NoneIcon = "";
    this.SwimIcon = "";
    this.ButtonKeyList = [];
    this.qyo = new Map();
    this.Gyo = new Map();
    this.CurButtonTypeList = [];
    this.CombineButtonKey = "";
    this.MainSkillButtonTypeList = [];
    this.MainSkillCombineButtonTypeList = [];
    this.DpadSkillButtonTypeList = [];
    this.DpadSkillCombineButtonTypeList = [];
    this.SubSkillButtonTypeList = [];
    this.SubSkillCombineButtonTypeList = [];
    this.SubAimSkillButtonTypeList = [];
    this.Nyo = 1;
    this.Oyo = undefined;
    this.Fyo = undefined;
    this.Vyo = undefined;
    this.Hyo = undefined;
    this.l4d = undefined;
    this.jyo = false;
    this.IsShowCombineButton = false;
    this.VRn = false;
    this.Wyo = false;
    this.Qyo = false;
    this.Xyo = false;
    this.Climbing = false;
    this.CurStateTagId = 0;
    this.StateButtonTypeList = undefined;
    this.IsPhantomRole = false;
    this.PhantomRoleButtonTypeList = undefined;
    this.ControlCameraByMoveAxis = false;
    this.Iqa = new Map();
    this.RouletteKey = undefined;
    this.RouletteMainKey = undefined;
    this.RouletteSecondKey = undefined;
    this.SwitchInteractData = new GamepadSwitchInteractData_1.GamepadSwitchInteractData();
  }
  Init() {
    this.jyo = false;
    this.$yo();
    this.Yyo();
    this.Jyo();
    this.SwitchInteractData.Init();
    this.RefreshBaseConfigByUserSetting();
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid) {
      this.mHs();
      this.RefreshAimButtonVisible();
      this.hIo();
      this.vEa();
      this.ChangeSkillOnAimStateChange();
    }
    this.RefreshSwitchInteractOpen(true);
    this.RefreshButtonData();
  }
  Clear() {
    this.ControlCameraByMoveAxis = false;
    this.ClearInputAxis();
  }
  $yo() {
    this.Byo.length = 0;
    for (var [t] of actionNameToButtonTypeMap) {
      this.Byo.push(t);
    }
    this.Byo.push(InputMappingsDefine_1.actionMappings.手柄主攻击);
    this.Byo.push(InputMappingsDefine_1.actionMappings.手柄副攻击);
  }
  GetAllActionNameList() {
    return this.Byo;
  }
  Yyo() {
    this.NoneIcon = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconXboxNoneIcon");
    this.SwimIcon = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconSwimming");
  }
  Jyo() {
    this.zyo(InputMappingsDefine_1.actionMappings.瞄准, InputEnums_1.EInputAction.瞄准);
    this.zyo(InputMappingsDefine_1.actionMappings.通用交互, InputEnums_1.EInputAction.通用交互);
  }
  zyo(t, i) {
    var t = actionNameToButtonTypeMap.get(t);
    var e = new BehaviorButtonData_1.BehaviorButtonData();
    e.Refresh(t, i, undefined, undefined);
    this.byo.set(t, e);
    return e;
  }
  RefreshBaseConfigByUserSetting() {
    this.CombineButtonKey = "Gamepad_LeftShoulder";
    let t = 0;
    for (const r of mainKeys) {
      this.ButtonKeyList[t] = r;
      t++;
    }
    for (const o of dPadKeys) {
      this.ButtonKeyList[t] = o;
      t++;
    }
    for (const _ of subKeys) {
      if (_ !== this.CombineButtonKey) {
        if (_ === "Gamepad_RightTrigger") {
          this.Nyo = t - MAIN_HALF_NUM - DPAD_KEY_NUM;
        }
        this.ButtonKeyList[t] = _;
        t++;
      }
    }
    this.ButtonKeyList[t] = "Gamepad_RightThumbstick";
    this.Oyo = undefined;
    this.Fyo = undefined;
    this.Vyo = undefined;
    this.Hyo = undefined;
    this.qyo.clear();
    for (const f of initActionNames) {
      var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(f);
      if (i) {
        var e = [];
        i.GetKeyNameList(e);
        if (e) {
          for (const u of e) {
            if (this.ButtonKeyList.includes(u) && (this.qyo.set(u, f), u === "Gamepad_RightTrigger")) {
              this.Oyo = f;
              this.Fyo = e.concat();
              this.Fyo.splice(this.Fyo.indexOf(u), 1);
              this.Fyo.push("Gamepad_RightThumbstick");
            }
          }
          if (f === InputMappingsDefine_1.actionMappings.攻击) {
            this.Vyo = e.concat();
            this.Hyo = this.Vyo.concat();
            this.Hyo.push("Gamepad_RightTrigger");
          }
        }
      }
    }
    var s;
    if (this.Oyo === InputMappingsDefine_1.actionMappings.攻击) {
      s = [];
      InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.攀爬)?.GetKeyNameList(s);
      this.l4d = s;
    } else {
      this.l4d = undefined;
    }
    this.Gyo.clear();
    for (const g of initActionNames) {
      var n = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(g);
      if (n) {
        var a;
        var h;
        var p = new Map();
        n.GetKeyMap(p);
        for ([a, h] of p) {
          if (a === this.CombineButtonKey && this.ButtonKeyList.includes(h)) {
            this.Gyo.set(h, g);
          }
        }
      }
    }
    this.Zyo();
    this.Oah();
    this.eIo();
    this.KWa();
  }
  Oah() {
    this.RouletteKey = undefined;
    this.RouletteMainKey = undefined;
    this.RouletteSecondKey = undefined;
    var t = InputMappingsDefine_1.actionMappings.幻象探索选择界面;
    var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t)?.GetGamepadKeyNameListReadonly();
    if (i?.length && i[0] !== "Gamepad_Invalid") {
      this.RouletteKey = i[0];
    } else {
      i = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(t);
      if (i?.HasGamepadCombinationAction()) {
        var e;
        var s;
        var t = new Map();
        i.GetGamepadKeyNameMap(t);
        for ([e, s] of t) {
          this.RouletteMainKey = e;
          this.RouletteSecondKey = s;
          return;
        }
      }
    }
  }
  Zyo() {
    var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.手柄主攻击);
    var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.攻击);
    var e = [];
    var s = [];
    t?.GetGamepadKeyNameList(e);
    i?.GetGamepadKeyNameList(s);
    if (!this.tIo(e, s)) {
      let t = [];
      if (t = t.concat(s)) {
        InputSettingsManager_1.InputSettingsManager.SetActionKeys(InputMappingsDefine_1.actionMappings.手柄主攻击, t);
      } else {
        InputSettingsManager_1.InputSettingsManager.SetActionKeys(InputMappingsDefine_1.actionMappings.手柄主攻击, []);
      }
    }
    t = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(InputMappingsDefine_1.actionMappings.手柄主攻击);
    i = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(InputMappingsDefine_1.actionMappings.攻击);
    e = new Map();
    s = new Map();
    t?.GetGamepadKeyNameMap(e);
    i?.GetGamepadKeyNameMap(s);
    if (!this.iIo(e, s)) {
      if (e) {
        for (var [n, a] of e) {
          InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(InputMappingsDefine_1.actionMappings.手柄主攻击, n, a);
        }
      }
      if (s) {
        for (var [h, p] of s) {
          InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(InputMappingsDefine_1.actionMappings.手柄主攻击, h, p);
        }
      }
    }
  }
  tIo(i, e) {
    if (i !== e) {
      if (!i || !e) {
        return false;
      }
      if (i.length !== e.length) {
        return false;
      }
      for (let t = 0; t < i.length; t++) {
        if (i[t] !== e[t]) {
          return false;
        }
      }
    }
    return true;
  }
  iIo(t, i) {
    if (t !== i) {
      if (!t || !i) {
        return false;
      }
      if (t.size !== i.size) {
        return false;
      }
      for (var [e, s] of t) {
        if (i.get(e) !== s) {
          return false;
        }
      }
    }
    return true;
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
    this.SubAimSkillButtonTypeList.length = SUB_KEY_NUM + 1;
    for (let t = 0; t < SUB_KEY_NUM; t++) {
      this.SubAimSkillButtonTypeList[t] = this.SubSkillButtonTypeList[t];
    }
    this.SubAimSkillButtonTypeList[this.Nyo] = 11;
    this.SubAimSkillButtonTypeList[SUB_KEY_NUM] = this.SubSkillButtonTypeList[this.Nyo];
  }
  KWa() {
    for (const t of this.MainSkillCombineButtonTypeList) {
      if (t !== 0) {
        this.IsShowCombineButton = true;
        return;
      }
    }
    for (const i of this.SubSkillCombineButtonTypeList) {
      if (i !== 0) {
        this.IsShowCombineButton = true;
        return;
      }
    }
    this.IsShowCombineButton = false;
  }
  oIo(t, i) {
    let e = undefined;
    t = this.ButtonKeyList[t];
    return (e = (i ? this.Gyo : this.qyo).get(t)) && actionNameToButtonTypeMap.get(e) || 0;
  }
  RefreshSwitchInteractOpen(t = false) {
    this.SwitchInteractData.RefreshSwitchInteractOpen(t);
  }
  RefreshButtonData() {
    this.rIo();
    this.CurButtonTypeList.length = 0;
    if (this.jyo) {
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        var i = this.$Wa(this.MainSkillCombineButtonTypeList, t);
        if (this.MainSkillCombineButtonTypeList[t] !== 0) {
          this.CurButtonTypeList.push(i);
        } else {
          this.CurButtonTypeList.push(this.$Wa(this.MainSkillButtonTypeList, t));
        }
      }
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        this.CurButtonTypeList.push(this.$Wa(this.MainSkillCombineButtonTypeList, t, true));
      }
      for (let t = 0; t < DPAD_KEY_NUM; t++) {
        var e = this.$Wa(this.DpadSkillCombineButtonTypeList, t);
        if (this.DpadSkillCombineButtonTypeList[t] !== 0) {
          this.CurButtonTypeList.push(e);
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
      if (this.Wyo) {
        for (let t = 0; t < SUB_KEY_NUM + 1; t++) {
          if (!this.jyo || this.SubAimSkillButtonTypeList[t] !== 11) {
            this.aIo(this.SubAimSkillButtonTypeList[t]);
          }
        }
      } else {
        for (let t = 0; t < SUB_KEY_NUM; t++) {
          this.aIo(this.SubSkillButtonTypeList[t]);
        }
        this.CurButtonTypeList.push(undefined);
      }
    }
    var t;
    if (this.Climbing && (t = this.CurButtonTypeList.indexOf(4)) !== -1) {
      this.CurButtonTypeList[t] = 2;
    }
    if (ModelManager_1.ModelManager.SkillButtonUiModel.GetButtonTypeList().includes(12) && (t = this.CurButtonTypeList.indexOf(101)) >= 0) {
      this.CurButtonTypeList[t] = 12;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "RefreshGamepadButton", ["", this.CurButtonTypeList]);
    }
  }
  $Wa(t, i, e = false) {
    t = t[i];
    if ((t === 101 || this.nIo(t)) && this.sIo(t, e)) {
      return t;
    } else {
      return 0;
    }
  }
  sIo(t, i = false) {
    if (this.IsPhantomRole) {
      return !!phantomRoleButtonTypeSet.has(t) || !!this.PhantomRoleButtonTypeList?.includes(t);
    } else {
      return (this.CurStateTagId === 0 || !this.StateButtonTypeList || !!this.StateButtonTypeList.includes(t)) && (!i || !!mainSecondButtonTypeSet.has(t));
    }
  }
  nIo(t) {
    var i;
    return !!t && ((i = ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(t)) ? i.IsVisible() : this.GetBehaviorButtonDataByButtonType(t)?.IsVisible);
  }
  aIo(t) {
    if (this.IsPhantomRole || this.CurStateTagId !== 0) {
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
      var i = t.Entity.CheckGetComponent(206);
      this.Climbing = i.HasTag(504239013);
      this.CurStateTagId = 0;
      this.StateButtonTypeList = undefined;
      var t = ModelManager_1.ModelManager.SkillButtonUiModel?.CurSkillButtonIndexData?.ButtonIndexConfig?.GamepadButtonTypeMap;
      if (t) {
        for (var [e, s] of t) {
          if (i.HasTag(e)) {
            this.CurStateTagId = e;
            this.StateButtonTypeList = s.ArrayInt;
            return;
          }
        }
      }
    }
  }
  GetButtonTypeByActionName(t) {
    return actionNameToButtonTypeMap.get(t);
  }
  IsAim() {
    return this.GetBehaviorButtonDataByButtonType(101)?.State === 1 || this.VRn;
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
    return this.byo.get(t);
  }
  RefreshSkillButtonData(t) {
    if (t === 1) {
      this.mHs();
      this.RefreshAimButtonVisible();
      this.hIo();
      this.vEa();
      this.ChangeSkillOnAimStateChange();
      this.RefreshButtonData();
    }
  }
  mHs() {
    this.IsPhantomRole = false;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid && (t = t.Entity.GetComponent(0)) && (t = t.GetRoleConfig(), this.IsPhantomRole = t.RoleType === 2, this.IsPhantomRole)) {
      t = ModelManager_1.ModelManager.SkillButtonUiModel;
      this.PhantomRoleButtonTypeList = t?.GetCurSkillButtonEntityData()?.SkillButtonIndexConfig?.DesktopButtonTypeList;
    }
  }
  RefreshAimState() {
    var t = this.hIo() || this.vEa();
    if (t) {
      this.ChangeSkillOnAimStateChange();
      this.RefreshButtonData();
    }
    return t;
  }
  hIo() {
    var t;
    var i;
    var e = this.GetBehaviorButtonDataByButtonType(101);
    return !!e && !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid && (t = t.Entity.GetComponent(176).DirectionState, i = e.State, t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection ? e.State = 1 : e.State = 0, i !== e.State);
  }
  vEa() {
    var t = ModelManager_1.ModelManager.BattleUiModel.FormationData.GetFollowerAiming();
    return this.VRn !== t && (this.VRn = t, true);
  }
  RefreshAimButtonVisible() {
    var t;
    var i = this.GetBehaviorButtonDataByButtonType(101);
    if (i) {
      if (t = ModelManager_1.ModelManager.SkillButtonUiModel.GetCurSkillButtonEntityData()) {
        i.RefreshIsVisible(t.GameplayTagComponent, t.RoleConfig);
      } else {
        i.IsVisible = false;
      }
    }
  }
  ChangeSkillOnAimStateChange() {
    if (this.IsAim() !== this.Wyo) {
      this.lIo();
    }
  }
  lIo() {
    if (!this.Xyo) {
      this.Xyo = true;
      this.Wyo = !this.Wyo;
      var t = Global_1.Global.CharacterController;
      if (this.Wyo) {
        if (this.Oyo === InputMappingsDefine_1.actionMappings.攻击) {
          if (this.Hyo) {
            t.SetActionEnable(InputMappingsDefine_1.actionMappings.攻击, false);
            for (const i of this.Hyo) {
              t.SetCustomAction(i, InputMappingsDefine_1.actionMappings.攻击);
            }
            t.SetCustomAction("Gamepad_RightThumbstick", InputMappingsDefine_1.actionMappings.攻击);
            t.SetActionEnable(InputMappingsDefine_1.actionMappings.攀爬, false);
            if (this.l4d) {
              for (const e of this.l4d) {
                if (e !== "Gamepad_RightTrigger") {
                  t.SetCustomAction(e, InputMappingsDefine_1.actionMappings.攀爬);
                }
              }
            }
            t.SetCustomAction("Gamepad_RightThumbstick", InputMappingsDefine_1.actionMappings.攀爬);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "攻击输入没有绑定任何按键，瞄准时使RT键生效");
          }
        } else {
          if (this.Oyo) {
            t.SetActionEnable(this.Oyo, false);
            for (const s of this.Fyo) {
              t.SetCustomAction(s, this.Oyo);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "手柄RT没有绑定任何输入，瞄准时不需要更换原有按键绑定");
          }
          if (this.Hyo) {
            t.SetActionEnable(InputMappingsDefine_1.actionMappings.攻击, false);
            for (const n of this.Hyo) {
              t.SetCustomAction(n, InputMappingsDefine_1.actionMappings.攻击);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 17, "攻击输入没有绑定任何按键，瞄准时使RT键生效");
          }
        }
      } else if (this.Oyo === InputMappingsDefine_1.actionMappings.攻击) {
        t.SetActionEnable(InputMappingsDefine_1.actionMappings.攀爬, true);
        t.SetActionEnable(InputMappingsDefine_1.actionMappings.攻击, true);
        for (const a of this.Hyo) {
          t.ResetAllCustomAction(a);
        }
        if (this.l4d) {
          for (const h of this.l4d) {
            if (h !== "Gamepad_RightTrigger") {
              t.ResetAllCustomAction(h);
            }
          }
        }
        t.ResetAllCustomAction("Gamepad_RightThumbstick");
      } else {
        if (this.Oyo) {
          t.SetActionEnable(this.Oyo, true);
          for (const p of this.Fyo) {
            t.ResetAllCustomAction(p);
          }
        }
        t.SetActionEnable(InputMappingsDefine_1.actionMappings.攻击, true);
        for (const r of this.Hyo) {
          t.ResetAllCustomAction(r);
        }
      }
      this.Xyo = false;
    }
  }
  RefreshInteractBehaviorData() {
    var t = this.GetBehaviorButtonDataByButtonType(104);
    var i = UiManager_1.UiManager.IsViewOpen("InteractionHintView");
    t.IsEnable = i;
    this.SwitchInteractData.SetInteractExist(i, 0);
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
    if (this._oh.size === 0 && this.Wyo) {
      this.lIo();
    }
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
    if (this._oh.size === 0 && (this.Qyo && (this.Qyo = false, this.RefreshBaseConfigByUserSetting()), this.IsAim() !== this.Wyo && this.lIo(), this.RefreshButtonData(), Info_1.Info.IsInGamepad())) {
      ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData()?.RefreshSkillButtonData(2);
    }
  }
  CacheInputAxis(t, i) {
    this.Iqa.set(t, i);
  }
  GetInputAxis(t) {
    return this.Iqa.get(t) ?? 0;
  }
  ClearInputAxis() {
    this.Iqa.clear();
  }
}
exports.SkillButtonUiGamepadData = SkillButtonUiGamepadData;
//# sourceMappingURL=SkillButtonUiGamepadData.js.map