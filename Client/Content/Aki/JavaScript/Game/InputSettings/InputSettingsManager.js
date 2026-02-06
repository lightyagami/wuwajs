"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSettingsManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const KeySettingAll_1 = require("../../Core/Define/ConfigQuery/KeySettingAll");
const Net_1 = require("../../Core/Net/Net");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const Platform_1 = require("../../Launcher/Platform/Platform");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const Global_1 = require("../Global");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
const InputBindingDefine_1 = require("./Binding/InputBindingDefine");
const InputSettings_1 = require("./InputSettings");
const LanguageKeyTransUtils_1 = require("./LanguageKeyTrans/LanguageKeyTransUtils");
const InputActionMapping_1 = require("./Maping/InputActionMapping");
const InputAxisMapping_1 = require("./Maping/InputAxisMapping");
const InputCombinationActionMapping_1 = require("./Maping/InputCombinationActionMapping");
const InputCombinationAxisMapping_1 = require("./Maping/InputCombinationAxisMapping");
const CHECK_COMBINATIONACTIONKEYMAP_SAVE_INTERVAL = 10000;
class InputSettingsManager {
  static get DeviceLang() {
    return this.frh;
  }
  static set DeviceLang(t) {
    if (StringUtils_1.StringUtils.IsBlank(t)) {
      this.frh = "Default";
    } else {
      this.frh = t;
    }
  }
  static Initialize() {
    this.qEe = new InputActionMapping_1.InputActionMapping();
    this.qEe.Initialize();
    this.GEe = new InputAxisMapping_1.InputAxisMapping();
    this.GEe.Initialize();
    this.NEe = new InputCombinationActionMapping_1.InputCombinationActionMapping();
    this.OEe = new InputCombinationAxisMapping_1.InputCombinationAxisMapping();
    this.RefreshAllActionKeys(true);
    this.RefreshAllAxisKeys(true);
    this.dZa();
    this.RefreshCombinationActionKeys(true);
    this.RefreshCombinationAxisKeys();
    this.L_f();
    this.ConvertInputActionSort();
    this.psh();
    this.vsh();
  }
  static Clear() {
    this.Xkn();
    this.$kn();
    this.CZa();
    this.qEe.Clear();
    this.qEe = undefined;
    this.GEe.Clear();
    this.GEe = undefined;
    this.NEe.Clear();
    this.NEe = undefined;
    this.OEe.Clear();
    this.OEe = undefined;
  }
  static get CheckUseFrenchKeyboard() {
    return InputSettings_1.InputSettings.GetKeyboardPrimaryLangId() === "French";
  }
  static gZa() {
    this.fZa.clear();
    this.pZa.clear();
    for (const t of ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigList()) {
      if (!StringUtils_1.StringUtils.IsBlank(t.FrenchKeyName)) {
        this.fZa.set(t.KeyName, t.FrenchKeyName);
        this.pZa.set(t.FrenchKeyName, t.KeyName);
      }
    }
  }
  static dZa() {
    var t;
    if (Platform_1.Platform.IsPcPlatform()) {
      this.CurrentDeviceLang = InputSettings_1.InputSettings.GetKeyboardPrimaryLangId();
      this.frh = this.CurrentDeviceLang;
      this.gZa();
      t = (0, puerts_1.toManualReleaseDelegate)(InputSettingsManager.vZa);
      UE.KuroStaticLibrary.BindDeviceLangChangeDelegate(t);
    } else {
      this.CurrentDeviceLang = "Default";
      this.frh = "Default";
    }
  }
  static CZa() {
    if (Platform_1.Platform.IsPcPlatform()) {
      UE.KuroStaticLibrary.UnBindDeviceLangChangeDelegate();
      (0, puerts_1.releaseManualReleaseDelegate)(InputSettingsManager.vZa);
    }
  }
  static yZa(t, i, n) {
    if (t === "Default" && i === "French") {
      return this.fZa.get(n) || n;
    }
    if (t === "French" && i === "Default") {
      return this.pZa.get(n) || n;
    }
    let e = n;
    if (t !== "Default") {
      t = LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(t);
      e = t.GetOtherToNormalPcKeysMap(n);
    }
    if (i !== "Default") {
      t = LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(i);
      e = t.GetNormalToOtherPcKeysMap(e);
    }
    return e;
  }
  static EZa(i, n) {
    for (const o of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      var e = o.ActionName;
      var t = this.GetActionBinding(e);
      if (t) {
        for (var [a, s] of t.GetCopyKeyNameListToBindingTypeMap()) {
          var r = [];
          let t = false;
          for (const g of s) {
            if (InputSettings_1.InputSettings.GetKey(g)?.IsKeyboardKey) {
              t = true;
              r.push(this.yZa(i, n, g));
            } else {
              r.push(g);
            }
          }
          if (t) {
            InputSettingsManager.SetActionKeysByBindingType(e, r, a);
          }
        }
      }
    }
  }
  static IZa(i, n) {
    for (const p of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      var e = p.AxisName;
      var t = this.GetAxisBinding(e);
      if (t) {
        for (var [a, s] of t.GetCopyKeyNameListToBindingTypeMap()) {
          var r;
          var o;
          var g = new Map();
          let t = false;
          for ([r, o] of s) {
            if (InputSettings_1.InputSettings.GetKey(r)?.IsKeyboardKey) {
              t = true;
              g.set(this.yZa(i, n, r), o);
            } else {
              g.set(r, o);
            }
          }
          if (t) {
            InputSettingsManager.SetAxisKeys(e, g, a);
          }
        }
      }
    }
  }
  static QXm(t, i) {
    var n = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationActionConfig();
    if (n) {
      for (const c of n) {
        var e = c.ActionName;
        var a = this.GetCombinationActionBindingByActionName(e);
        if (a) {
          for (var [s, r] of a.GetCopyKeyMapToBindingTypeMap()) {
            for (var [o, g] of r) {
              var p = InputSettings_1.InputSettings.GetKey(o);
              var u = InputSettings_1.InputSettings.GetKey(g);
              if (p?.IsKeyboardKey || u?.IsKeyboardKey) {
                p = this.yZa(t, i, o);
                u = this.yZa(t, i, g);
                if (p !== o || u !== g) {
                  InputSettingsManager.RemoveCombinationActionKeyMap(e, o, g, s);
                  InputSettingsManager.AddCombinationActionKeyMap(e, p, u, s);
                }
              }
            }
          }
        }
      }
    }
  }
  static ChangeActionAndAxisPcKeys(t) {
    var i;
    if (this.frh !== t && (i = this.frh, Log_1.Log.CheckInfo() && Log_1.Log.Info("InputSettings", 10, "识别到键盘设备切换", ["上次键盘设备语种", i], ["当前键盘设备语种", t]), ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.AddAllowChangeKeyReason("OnDeviceLangChange"), this.frh = t, this.EZa(i, t), this.IZa(i, t), this.QXm(i, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDeviceLangChange), ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.RemoveAllowChangeKeyReason("OnDeviceLangChange"), Net_1.Net.IsServerConnected())) {
      ControllerHolder_1.ControllerHolder.InputSettingsController?.InputSettingUpdateRequest(false);
    }
  }
  static ResetDefaultInputKey() {
    this.ClearAllKeys();
    this.RefreshAllActionKeys(true);
    this.RefreshAllAxisKeys(true);
    this.RefreshCombinationActionKeys(true);
    this.RefreshCombinationAxisKeys();
    InputSettings_1.InputSettings.SaveKeyMappings();
  }
  static ClearAllKeys() {
    this.qEe?.ClearAllActionKeys();
    this.GEe?.ClearAllAxisKeys();
    this.ClearCombinationActionKeyMap();
    this.mrh();
  }
  static RefreshAllActionKeys(t = false) {
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      var i = e.ActionName;
      this.C2g.add(i);
      if (!t) {
        var n = InputSettings_1.InputSettings.GetActionMappings(i);
        if (n.Num() > 0) {
          InputSettingsManager.RefreshActionKeys(i, n, e.ExclusiveType);
          continue;
        }
        n = this.GetActionBinding(i);
        if (n && !n.HasAnyKey()) {
          this.Ksh(i, e, e.ExclusiveType);
          continue;
        }
      }
      this.Ksh(i, e, e.ExclusiveType);
    }
  }
  static Ksh(t, i, n) {
    let e = [];
    e = InputSettingsManager.CheckUseFrenchKeyboard ? i.FrancePcKeys : LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(this.CurrentDeviceLang).GetActionPcKeys(i);
    i = i.GamepadKeys;
    i = e.concat(i);
    InputSettingsManager.SetActionKeysByBindingType(t, i, n);
  }
  static RefreshAllAxisKeys(t = false) {
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      var i = e.AxisName;
      if (!t) {
        var n = InputSettings_1.InputSettings.GetAxisMappings(i);
        if (n.Num() > 0) {
          InputSettingsManager.RefreshAxisKeys(i, n, e.ExclusiveType);
          continue;
        }
        n = this.GetAxisBinding(i);
        if (n && !n.HasAnyKey()) {
          this.$sh(i, e, e.ExclusiveType);
          continue;
        }
      }
      this.$sh(i, e, e.ExclusiveType);
    }
  }
  static $sh(t, i, n) {
    let e = new Map();
    e = InputSettingsManager.CheckUseFrenchKeyboard ? i.FrancePcKeys : LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(this.CurrentDeviceLang).GetAxisPcKeys(i);
    var a;
    var s;
    var r;
    var o;
    var i = i.GamepadKeys;
    var g = new Map();
    for ([a, s] of e) {
      g.set(a, s);
    }
    for ([r, o] of i) {
      g.set(r, o);
    }
    InputSettingsManager.SetAxisKeys(t, g, n);
  }
  static ResetActionKeyByName(t, i) {
    var n = ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(t);
    if (n) {
      this.Ksh(t, n, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 74, "Action按键配置不存在", ["ActionName", t]);
    }
  }
  static ResetAxisKeyByName(t, i) {
    var n = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAxisMappingConfigByAxisName(t);
    if (n) {
      this.$sh(t, n, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 74, "Axis按键配置不存在", ["AxisName", t]);
    }
  }
  static ResetCombinationActionKeyByName(t, i, n) {
    var e;
    var a;
    var s;
    var r;
    for ([e, a] of [...(this.kEe.get(t) ?? [])]) {
      this.RemoveCombinationActionKeyMap(t, e, a, n);
    }
    if (InputSettingsManager.IsOriginalCombinationActionName(t, i)) {
      if (i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionName(t)) {
        s = this.Spm.get(1);
        r = this.Spm.get(2);
        InputSettingsManager.KXm(i, s, r, n);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InputSettings", 74, "组合Action按键配置不存在", ["ActionName", t]);
      }
    }
  }
  static GetBindTypeByExclusiveType(t) {
    return this.P_f.get(t) ?? 0;
  }
  static GetExclusiveTypeByBindingType(t) {
    for (var [i, n] of this.P_f) {
      if (n === t) {
        return i;
      }
    }
    return 0;
  }
  static GetActionBinding(t) {
    return this.qEe.GetActionBinding(t);
  }
  static GetActionBindingMap() {
    return this.qEe.GetActionBindingMap();
  }
  static GetActionBindingByConfigId(t) {
    return this.qEe.GetActionBindingByConfigId(t);
  }
  static CheckGetActionKeyIconPath(t) {
    var i = t.GetCurrentPlatformKey();
    if (i) {
      var n = i.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(n)) {
        return n;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InputSettings", 10, "此按键配置了空的图标路径", ["KeyName", i.GetKeyName()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "Action找不到对应按键", ["ActionName", t.GetActionName()], ["KeyName", undefined]);
    }
  }
  static GetActionBindingByActionMappingType(t) {
    return this.qEe.GetActionBindingByActionMappingType(t);
  }
  static SetActionKeysByBindingType(t, i, n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "设置Action按键", ["actionName", t]);
    }
    this.qEe.SetKeys(t, i, n);
  }
  static SetActionKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "设置Action按键", ["actionName", t]);
    }
    var n = this.qEe.GetActionBinding(t);
    if (n) {
      this.qEe.SetKeys(t, i, n.CurrentBindingType);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "设置Action按键时，找不到对应Action", ["actionName", t]);
    }
  }
  static RefreshActionKeys(t, i, n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "刷新Action按键", ["actionName", t]);
    }
    this.qEe.RefreshKeysByActionMappings(t, i, n);
  }
  static GetAxisBinding(t) {
    return this.GEe.GetAxisBinding(t);
  }
  static GetAxisBindingMap() {
    return this.GEe.GetAxisBindingMap();
  }
  static GetAxisBindingByAxisMappingType(t) {
    return this.GEe.GetAxisBindingByAxisMappingType(t);
  }
  static CheckGetAxisKeyIconPath(t) {
    var i = t.GetCurrentPlatformKey();
    if (i) {
      var n = i.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(n)) {
        return n;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InputSettings", 10, "此按键配置了空的图标路径", ["KeyName", i.KeyName]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "Axis找不到对应按键", ["AxisName", t.GetAxisName()], ["KeyName", undefined]);
    }
  }
  static ContainAxisKeyByType(t, i) {
    for (const n of this.GEe.GetAxisBindingByAxisMappingType(t)) {
      if (n.HasKey(i)) {
        return {
          IsContain: true,
          ContainAxisBinding: n
        };
      }
    }
    return {
      IsContain: false,
      ContainAxisBinding: undefined
    };
  }
  static SetAxisKeys(t, i, n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "设置Axis按键", ["axisName", t]);
    }
    this.GEe.SetKeys(t, i, n);
  }
  static RefreshAxisKeys(t, i, n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "刷新Axis按键", ["axisName", t]);
    }
    this.GEe.RefreshKeys(t, i, n);
  }
  static RefreshCombinationActionKeys(t = false) {
    this.ClearCombinationActionKeyMap();
    this.kEe.clear();
    this.Ykn();
    this.drh();
    if (!t) {
      t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction, undefined);
      if (t) {
        this.kEe = t;
      }
      if (this.kEe && this.kEe.size > 0) {
        for (var [i, n] of this.kEe) {
          for (const s of n) {
            var e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionNameInList(i);
            var a = this._Sl(i, s[0], s[1], e?.ExclusiveType ?? 0);
            if (e) {
              a?.SetKeyboardVersionMap(e.KeyboardVersionMap);
              a?.SetGamepadVersionMap(e.GamepadVersionMap);
            }
          }
        }
      }
    }
  }
  static drh() {
    this.Spm.clear();
    var t = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationActionConfig();
    if (t) {
      var i = new Set();
      var n = new Set();
      for (const e of t) {
        InputSettingsManager.KXm(e, i, n, e.ExclusiveType);
      }
      this.Spm.set(1, i);
      this.Spm.set(2, n);
    }
  }
  static KXm(t, i, n, e) {
    var a;
    var s;
    var r;
    var o;
    var g = t.ActionName;
    let p = new Map();
    for ([a, s] of p = InputSettingsManager.CheckUseFrenchKeyboard ? t.FrancePcKeys : LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(this.CurrentDeviceLang).GetCombinationActionPcKeys(t)) {
      this.AddCombinationActionKeyMap(g, a, s, e)?.SetKeyboardVersionMap(t.KeyboardVersionMap);
      i.add(g);
    }
    for ([r, o] of t.GamepadKeys) {
      this.AddCombinationActionKeyMap(g, r, o, e)?.SetGamepadVersionMap(t.GamepadVersionMap);
      n.add(g);
    }
  }
  static SetCombinationActionKeyboardKeys(t, i, n) {
    var e = this.GetCombinationActionBindingByActionName(t);
    if (e) {
      var a;
      var s;
      var r;
      var o;
      var g = new Map();
      e.GetPcKeyNameMap(g, n);
      for ([a, s] of g) {
        InputSettingsManager.RemoveCombinationActionKeyMap(t, a, s, n);
      }
      for ([r, o] of i) {
        InputSettingsManager.AddCombinationActionKeyMap(t, r, o, n);
      }
      return e;
    }
  }
  static SetOrAddCombinationActionKeyboardKeys(t, i, n) {
    var e;
    var a;
    var s = this.GetCombinationActionBindingByActionName(t);
    if (s) {
      var r;
      var o;
      var g = new Map();
      s.GetPcKeyNameMap(g, n);
      for ([r, o] of g) {
        InputSettingsManager.RemoveCombinationActionKeyMap(t, r, o, n);
      }
    }
    for ([e, a] of i) {
      InputSettingsManager.AddCombinationActionKeyMap(t, e, a, n);
    }
    return s;
  }
  static SetCombinationActionGamepadKeys(t, i, n) {
    var e = this.GetCombinationActionBindingByActionName(t);
    if (e) {
      var a;
      var s;
      var r = new Map();
      e.GetGamepadKeyNameMapByBindingType(r, n);
      for ([a, s] of r) {
        InputSettingsManager.RemoveCombinationActionKeyMap(t, a, s, n);
      }
      if (i.size > 0) {
        for (var [o, g] of i) {
          InputSettingsManager.AddCombinationActionKeyMap(t, o, g, n);
        }
      } else {
        InputSettingsManager.AddCombinationActionKeyMapEmptyData(t, n);
      }
      return e;
    }
  }
  static SetOrAddCombinationActionGamepadKeys(t, i, n) {
    var e;
    var a;
    var s = this.GetCombinationActionBindingByActionName(t);
    if (s) {
      var r;
      var o;
      var g = new Map();
      s.GetGamepadKeyNameMapByBindingType(g, n);
      for ([r, o] of g) {
        InputSettingsManager.RemoveCombinationActionKeyMap(t, r, o, n);
      }
    }
    for ([e, a] of i) {
      InputSettingsManager.AddCombinationActionKeyMap(t, e, a, n);
    }
    return s;
  }
  static ConvertInputActionSort() {
    var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInputActionSort, false);
    if (!t && this.qEe) {
      for (const i of (this.qEe?.GetActionBindingMap()).values()) {
        i.ConvertSort();
      }
      InputSettings_1.InputSettings.SaveKeyMappings();
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInputActionSort, true);
    }
  }
  static psh() {
    if (!LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInput, false)) {
      this.Msh();
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsConvertInput, true);
    }
  }
  static vsh() {
    if (!LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsSavedKeyMappings, false)) {
      InputSettings_1.InputSettings.SaveKeyMappings();
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.IsSavedKeyMappings, true);
    }
  }
  static Msh() {
    var t;
    var i = this.GetActionBinding(InputMappingsDefine_1.actionMappings.幻象2);
    if (i && i.HasKey("Gamepad_LeftTrigger") && (t = this.GetCombinationActionBindingByActionName(InputMappingsDefine_1.actionMappings.幻象2)) && t.HasKey("Gamepad_LeftShoulder", "Gamepad_FaceButton_Left", 0) && (i.RemoveKeys(["Gamepad_LeftTrigger"], 0), (t = this.GetActionBinding(InputMappingsDefine_1.actionMappings.瞄准)) && !t.HasKey("Gamepad_LeftTrigger") && t.AddKeys(["Gamepad_LeftTrigger"], 0), i = this.GetCombinationActionBindingByActionName(InputMappingsDefine_1.actionMappings.瞄准)) && (t = new Map(), i.GetGamepadKeyNameMapByBindingType(t, 0), t.get("Gamepad_LeftShoulder") === "Gamepad_FaceButton_Left")) {
      i.RemoveKey("Gamepad_LeftShoulder", 0);
    }
  }
  static ClearCombinationActionKeyMap() {
    var t;
    var i;
    for ([t, i] of new Map(this.kEe)) {
      var n = this.GetCombinationActionBindingByActionName(t);
      if (n) {
        for (const e of i) {
          InputSettingsManager.RemoveCombinationActionKeyMap(t, e[0], e[1], n.CurrentBindingType);
        }
      }
    }
    this.NEe?.Clear();
    this.kEe.clear();
  }
  static AddCombinationActionKeyMap(t, i, n, e) {
    var a = this.FEe(t, i, n, e);
    var e = this.kEe.get(t);
    var s = [i, n];
    if (e) {
      for (var [r, o] of e) {
        if (r === i && o === n) {
          return a;
        }
      }
      e.push(s);
    } else {
      this.kEe.set(t, [s]);
    }
    this.Ykn();
    return a;
  }
  static AddCombinationActionKeyMapEmptyData(t, i) {
    var n = this.TryGetCombinationActionBinding(t);
    if (n) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "添加组合键按键空数据", ["ActionName", t], ["bindingType", i]);
      }
      n.AddKeyEmptyData(i);
      this.Ykn();
    }
  }
  static _Sl(t, i, n, e) {
    var a;
    var s = this.TryGetCombinationActionBinding(t);
    if (s) {
      if ((a = s.GetSecondaryKeyNameByMainKey(i, e)) && a !== n) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputSettings", 10, "组合键主键已存在,更换旧的组合键数据", ["ActionName", s.GetActionName()], ["mainKeyName", i], ["secondaryKeyName", a]);
        }
        this.RemoveCombinationActionKeyMap(t, i, a, e);
      }
      return this.FEe(t, i, n, e);
    }
  }
  static FEe(t, i, n, e) {
    t = this.TryGetCombinationActionBinding(t);
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "添加组合键按键", ["ActionName", t.GetActionName()], ["mainKeyName", i], ["secondaryKeyName", n], ["bindingType", e]);
      }
      this.NEe?.AddKey(t, i, n, e);
      InputSettings_1.InputSettings.NewInputCombinationActionKey(t.GetActionName(), i, n);
      return t;
    }
  }
  static TryGetCombinationActionBinding(t) {
    let i = this.GetCombinationActionBindingByActionName(t);
    var n;
    if (!i) {
      n = this.C2g.has(t);
      (i = this.NEe.NewCombinationActionBinding(t, 0, !n)).InitializeBindingType(InputSettingsManager.CurrentBindingType);
    }
    return i;
  }
  static RemoveCombinationActionKeyMap(t, i, n, e) {
    this.VEe(t, i, n, e);
    var a = this.kEe.get(t);
    if (a) {
      var s = [];
      for (let t = 0; t < a.length; t++) {
        var r = a[t];
        if (r[0] === i && r[1] === n) {
          s.push(t);
        }
      }
      for (const o of s) {
        a.splice(o, 1);
      }
      if (a.length <= 0) {
        this.kEe.delete(t);
      }
    } else {
      this.kEe.delete(t);
    }
    this.Ykn();
  }
  static VEe(t, i, n, e) {
    t = this.GetCombinationActionBindingByActionName(t);
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "删除组合键按键", ["ActionName", t.GetActionName()], ["RemoveMainKey", i], ["RemoveSecondaryKeyName", n], ["bindingType", e]);
      }
      this.NEe?.RemoveKey(t, i, n, e);
      InputSettings_1.InputSettings.RemoveCombinationActionMapping(t.GetActionName(), i, n);
    }
  }
  static AddCombinationAxisKeyMap(t, i, n, e) {
    return this.A_f(t, i, n, e);
  }
  static A_f(t, i, n, e) {
    var a = this.GetCombinationAxisBindingByAxisName(t);
    if (a) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "添加组合键按键", ["AxisName", t], ["mainKeyName", n], ["secondaryKeyName", i]);
      }
      this.OEe?.AddKeyMap(a, i, n, e);
      InputSettings_1.InputSettings.NewInputCombinationActionKey(t, n, i);
      return a;
    }
  }
  static RemoveCombinationAxisKeyMap(t, i, n, e) {
    this.D_f(t, i, n, e);
  }
  static D_f(t, i, n, e) {
    var a = this.GetCombinationAxisBindingByAxisName(t);
    if (a) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "删除组合键按键", ["AxisName", t], ["RemoveMainKey", n], ["RemoveSecondaryKeyName", i]);
      }
      this.OEe?.RemoveKeyMap(a, i, n, e);
      InputSettings_1.InputSettings.RemoveCombinationAxisMapping(t, n, i);
    }
  }
  static U_f(t, i) {
    var n;
    var e = t.GetActionName();
    var e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(e);
    if (e) {
      n = InputSettingsManager.GetBindTypeByExclusiveType(i.ExclusiveType);
      if (i.InputControllerType === 1 || i.InputControllerType === 0) {
        if (n === 0) {
          t.SetKeyboardKeysWithoutOriginal(e.PcKeys);
        } else {
          t.SetKeyboardKeys(e.PcKeys, n);
        }
      }
      if (i.InputControllerType === 2 || i.InputControllerType === 0) {
        if (n === 0) {
          t.SetGamepadKeysWithoutOriginal(e.GamepadKeys);
        } else {
          t.SetGamepadKeys(e.GamepadKeys, n);
        }
      }
    }
  }
  static x_f(t, i) {
    var n;
    var e = t.GetAxisName();
    var e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAxisMappingConfigByAxisName(e);
    if (e) {
      n = InputSettingsManager.GetBindTypeByExclusiveType(i.ExclusiveType);
      if (i.InputControllerType === 1 || i.InputControllerType === 0) {
        if (n === 0) {
          t.SetKeyboardKeysWithoutOriginal(e.PcKeys);
        } else {
          t.SetKeyboardKeys(e.PcKeys, n);
        }
      }
      if (i.InputControllerType === 2 || i.InputControllerType === 0) {
        if (n === 0) {
          t.SetGamepadKeysWithoutOriginal(e.GamepadKeys);
        } else {
          t.SetGamepadKeys(e.GamepadKeys, n);
        }
      }
    }
  }
  static B_f(t, i, n, e) {
    var a;
    var s;
    var r;
    var o;
    var g = new Map();
    var p = t.GetActionName();
    if (e) {
      t.GetGamepadKeyNameMapByBindingType(g, i);
    } else {
      t.GetPcKeyNameMap(g, i);
    }
    for ([a, s] of g) {
      InputSettingsManager.RemoveCombinationActionKeyMap(p, a, s, i);
    }
    for ([r, o] of n) {
      InputSettingsManager.AddCombinationActionKeyMap(p, r, o, i);
    }
  }
  static k_f(t, i) {
    var n = t.GetActionName();
    var e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionName(n);
    if (e) {
      const a = InputSettingsManager.GetBindTypeByExclusiveType(i.ExclusiveType);
      if (i.InputControllerType === 1 || i.InputControllerType === 0) {
        if (a === 0) {
          for (const a of InputBindingDefine_1.inputBindingTypesArray) {
            if (a !== 0) {
              InputSettingsManager.B_f(t, a, e.PcKeys, false);
            }
          }
        } else {
          InputSettingsManager.B_f(t, a, e.PcKeys, false);
        }
      }
      if (i.InputControllerType === 2 || i.InputControllerType === 0) {
        const i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionName(n);
        if (a === 0) {
          for (const a of InputBindingDefine_1.inputBindingTypesArray) {
            if (a !== 0) {
              InputSettingsManager.B_f(t, a, i.GamepadKeys, true);
            }
          }
        } else {
          InputSettingsManager.B_f(t, a, i.GamepadKeys, true);
        }
      }
    }
  }
  static q_f(t, i, n, e) {
    var a;
    var s;
    var r;
    var o;
    var g = new Map();
    var p = t.GetAxisName();
    if (e) {
      t.GetGamepadKeyNameMap(g, i);
    } else {
      t.GetPcKeyNameMap(g, i);
    }
    for ([a, s] of g) {
      InputSettingsManager.RemoveCombinationAxisKeyMap(p, a, s, i);
    }
    for ([r, o] of n) {
      InputSettingsManager.AddCombinationAxisKeyMap(p, r, o, i);
    }
  }
  static O_f(t, i) {
    var n = t.GetAxisName();
    var e = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationAxisConfigByAxisName(n);
    if (e) {
      const a = InputSettingsManager.GetBindTypeByExclusiveType(i.ExclusiveType);
      if (i.InputControllerType === 1 || i.InputControllerType === 0) {
        if (a === 0) {
          for (const a of InputBindingDefine_1.inputBindingTypesArray) {
            if (a !== 0) {
              InputSettingsManager.q_f(t, a, e.PcKeyMap, false);
            }
          }
        } else {
          InputSettingsManager.q_f(t, a, e.PcKeyMap, false);
        }
      }
      if (i.InputControllerType === 2 || i.InputControllerType === 0) {
        const i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationAxisConfigByAxisName(n);
        if (a === 0) {
          for (const a of InputBindingDefine_1.inputBindingTypesArray) {
            if (a !== 0) {
              InputSettingsManager.q_f(t, a, i.GamepadKeyMap, true);
            }
          }
        } else {
          InputSettingsManager.q_f(t, a, i.GamepadKeyMap, true);
        }
      }
    }
  }
  static L_f() {
    for (const n of KeySettingAll_1.configKeySettingAll.GetConfigList()) {
      var t;
      var i = n.ActionOrAxisName;
      if (!StringUtils_1.StringUtils.IsBlank(i)) {
        if (n.ActionOrAxis === 1) {
          if (t = InputSettingsManager.GetCombinationActionBindingByActionName(i)) {
            InputSettingsManager.k_f(t, n);
          }
          if (t = InputSettingsManager.GetActionBinding(i)) {
            InputSettingsManager.U_f(t, n);
          }
        } else {
          if (t = InputSettingsManager.GetCombinationAxisBindingByAxisName(i)) {
            InputSettingsManager.O_f(t, n);
          }
          if (i = InputSettingsManager.GetAxisBinding(i)) {
            InputSettingsManager.x_f(i, n);
          }
        }
      }
    }
  }
  static GetCombinationActionBindingByKeyName(t, i) {
    return this.NEe.GetCombinationActionBindingByKeyName(t, i);
  }
  static GetCombinationActionBindingByActionName(t) {
    return this.NEe.GetCombinationActionBindingByActionName(t);
  }
  static GetCombinationActionBindingMap() {
    return this.NEe.GetCombinationActionBindingMap();
  }
  static IsCombinationActionMainKey(t) {
    return this.NEe.IsMainKey(t);
  }
  static IsCombinationAction(t, i) {
    var n = this.GetCombinationActionBindingByKeyName(t, i);
    var e = ModelManager_1.ModelManager.InputModel.GetCurrentInputData()?.KeyBindingType ?? 0;
    if (n && !(n.size <= 0)) {
      for (var [, a] of n) {
        if (a.HasKey(t, i, e)) {
          return true;
        }
      }
    }
    return false;
  }
  static RefreshCombinationAxisKeys() {
    var t = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig();
    if (t) {
      for (const i of t) {
        this.OEe?.NewCombinationAxisBinding(i);
      }
    }
  }
  static mrh() {
    this.OEe?.Clear();
  }
  static GetCombinationAxisBindingByKeyName(t, i) {
    return this.OEe.GetCombinationAxisBindingByKeyName(t, i);
  }
  static GetCombinationAxisBindingMapByMainKeyName(t) {
    return this.OEe.GetCombinationAxisBindingMapByMainKeyName(t);
  }
  static GetCombinationAxisBindingByAxisName(t) {
    return this.OEe.GetCombinationAxisBindingByAxisName(t);
  }
  static GetCombinationAxisBindingMap() {
    return this.OEe.GetCombinationAxisBindingMap();
  }
  static IsCombinationAxisMainKey(t) {
    return this.OEe.IsMainKey(t);
  }
  static IsCombinationAxis(t, i) {
    t = this.GetCombinationAxisBindingByKeyName(t, i);
    return !!t && !(t.length <= 0);
  }
  static GetActionKeyDisplayData(t, i) {
    var n = Global_1.Global.CharacterController.GetCurrentPlatformCustomActionKeyNameList(i);
    if (n) {
      t.RefreshInput(i, n);
      return true;
    }
    n = InputSettingsManager.GetCombinationActionBindingByActionName(i);
    if (n) {
      var e = new Map();
      n.GetCurrentPlatformKeyNameMap(e);
      if (e && e.size > 0) {
        t.RefreshCombinationInput(i, e);
        return true;
      }
    }
    n = InputSettingsManager.GetActionBinding(i);
    if (n) {
      e = [];
      n.GetCurrentPlatformKeyNameList(e);
      if (e.length === 1 && e[0] === "Gamepad_Invalid") {
        return false;
      }
      if (e.length > 0) {
        t.RefreshInput(i, e);
        return true;
      }
    }
    return false;
  }
  static GetAxisKeyDisplayData(t, i) {
    var n = InputSettingsManager.GetCombinationAxisBindingByAxisName(i);
    if (n) {
      var e = new Map();
      n.GetCurrentPlatformKeyNameMap(e);
      if (e && e.size > 0) {
        t.RefreshCombinationInput(i, e);
        return true;
      }
    }
    n = InputSettingsManager.GetAxisBinding(i);
    if (n) {
      e = [];
      n.GetCurrentPlatformKeyNameList(e);
      if (e.length > 0) {
        t.RefreshInput(i, e);
        return true;
      }
    }
    return false;
  }
  static SwitchKeysByBindingType(t) {
    InputSettingsManager.CurrentBindingType = t;
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(2);
    InputSettingsManager.mgg.Start();
    this.NEe.SwitchKeysByBindingType(t);
    InputSettingsManager.mgg.Stop();
    InputSettingsManager.fgg.Start();
    this.OEe.SwitchKeysByBindingType(t);
    InputSettingsManager.fgg.Stop();
    InputSettingsManager.cgg.Start();
    this.qEe.SwitchKeysByBindingType(t);
    InputSettingsManager.cgg.Stop();
    InputSettingsManager.dgg.Start();
    this.GEe.SwitchKeysByBindingType(t);
    InputSettingsManager.dgg.Stop();
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(2);
  }
  static IsOriginalCombinationActionName(t, i) {
    i = this.Spm.get(i);
    return !!i && i.has(t);
  }
  static Ykn() {
    this.Jkn = true;
    this.zkn();
  }
  static zkn() {
    if (!this.Zkn()) {
      this.eFn = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        if (this.$kn()) {
          this.Xkn();
        }
      }, CHECK_COMBINATIONACTIONKEYMAP_SAVE_INTERVAL);
    }
  }
  static Xkn() {
    if (this.eFn !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.eFn);
      this.eFn = undefined;
    }
  }
  static Zkn() {
    return this.eFn !== undefined;
  }
  static $kn() {
    return !!this.Jkn && !(LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction, this.kEe), this.Jkn = false);
  }
}
exports.InputSettingsManager = InputSettingsManager;
(_a = InputSettingsManager).qEe = undefined;
InputSettingsManager.GEe = undefined;
InputSettingsManager.NEe = undefined;
InputSettingsManager.OEe = undefined;
InputSettingsManager.kEe = new Map();
InputSettingsManager.Jkn = undefined;
InputSettingsManager.eFn = undefined;
InputSettingsManager.Spm = new Map();
InputSettingsManager.fZa = new Map();
InputSettingsManager.pZa = new Map();
InputSettingsManager.P_f = new Map([[0, 0], [2, 1]]);
InputSettingsManager.frh = "";
InputSettingsManager.CurrentDeviceLang = "Default";
InputSettingsManager.CurrentBindingType = 0;
InputSettingsManager.cgg = Stats_1.Stat.Create("InputSettingsManager.ActionSwitchKeys");
InputSettingsManager.dgg = Stats_1.Stat.Create("InputSettingsManager.AxisSwitchKeys");
InputSettingsManager.mgg = Stats_1.Stat.Create("InputSettingsManager.CombinationActionSwitchKeys");
InputSettingsManager.fgg = Stats_1.Stat.Create("InputSettingsManager.CombinationAxisSwitchKeys");
InputSettingsManager.C2g = new Set();
InputSettingsManager.vZa = () => {
  var t = InputSettings_1.InputSettings.GetKeyboardPrimaryLangId();
  _a.CurrentDeviceLang = t;
  _a.ChangeActionAndAxisPcKeys(t);
}; //# sourceMappingURL=InputSettingsManager.js.map