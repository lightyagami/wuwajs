"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSettingsManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
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
const InputSettings_1 = require("./InputSettings");
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
    this.RefreshAllActionKeys();
    this.RefreshAllAxisKeys();
    this.dZa();
    this.RefreshCombinationActionKeys();
    this.RefreshCombinationAxisKeys();
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
      this.frh = InputSettings_1.InputSettings.GetKeyboardPrimaryLangId();
      this.gZa();
      t = (0, puerts_1.toManualReleaseDelegate)(InputSettingsManager.vZa);
      UE.KuroStaticLibrary.BindDeviceLangChangeDelegate(t);
    } else {
      this.frh = "Default";
    }
  }
  static CZa() {
    if (Platform_1.Platform.IsPcPlatform()) {
      UE.KuroStaticLibrary.UnBindDeviceLangChangeDelegate();
      (0, puerts_1.releaseManualReleaseDelegate)(InputSettingsManager.vZa);
    }
  }
  static yZa(t, i) {
    if (t === "French") {
      const e = this.fZa.get(i);
      if (e) {
        return e;
      } else {
        return i;
      }
    }
    const e = this.pZa.get(i);
    return e || i;
  }
  static EZa(e) {
    for (const i of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      var t = i.ActionName;
      var n = InputSettings_1.InputSettings.GetActionMappings(t);
      if (!(n.Num() <= 0)) {
        var a = [];
        let i = false;
        for (let t = n.Num() - 1; t >= 0; t--) {
          var s = n.Get(t).Key.KeyName.toString();
          if (InputSettings_1.InputSettings.GetKey(s)?.IsKeyboardKey) {
            i = true;
            a.push(this.yZa(e, s));
          } else {
            a.push(s);
          }
        }
        if (i) {
          InputSettingsManager.SetActionKeys(t, a);
        }
      }
    }
  }
  static IZa(e) {
    for (const i of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      var t = i.AxisName;
      var n = InputSettings_1.InputSettings.GetAxisMappings(t);
      if (!(n.Num() <= 0)) {
        var a = new Map();
        let i = false;
        for (let t = n.Num() - 1; t >= 0; t--) {
          var s = n.Get(t);
          var o = s.Key.KeyName.toString();
          var s = s.Scale;
          if (InputSettings_1.InputSettings.GetKey(o)?.IsKeyboardKey) {
            i = true;
            a.set(this.yZa(e, o), s);
          } else {
            a.set(o, s);
          }
        }
        if (i) {
          InputSettingsManager.SetAxisKeys(t, a);
        }
      }
    }
  }
  static ChangeActionAndAxisPcKeys(t) {
    if (this.frh !== t && (Log_1.Log.CheckInfo() && Log_1.Log.Info("InputSettings", 10, "识别到键盘设备切换", ["键盘设备语种", t]), ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.AllowChangeKeyReasonSet.add("OnDeviceLangChange"), this.frh = t, this.EZa(t), this.IZa(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDeviceLangChange), ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.AllowChangeKeyReasonSet.delete("OnDeviceLangChange"), Net_1.Net.IsServerConnected())) {
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
    for (const n of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      var i = n.ActionName;
      if (!t) {
        var e = InputSettings_1.InputSettings.GetActionMappings(i);
        if (e.Num() > 0) {
          InputSettingsManager.RefreshActionKeys(i, e);
          continue;
        }
        e = this.GetActionBinding(i);
        if (e && !e.HasAnyKey()) {
          this.Ksh(i, n);
          continue;
        }
      }
      this.Ksh(i, n);
    }
  }
  static Ksh(t, i) {
    let e = [];
    e = InputSettingsManager.CheckUseFrenchKeyboard ? i.FrancePcKeys : i.PcKeys;
    i = i.GamepadKeys;
    i = e.concat(i);
    InputSettingsManager.SetActionKeys(t, i);
  }
  static RefreshAllAxisKeys(t = false) {
    for (const n of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      var i = n.AxisName;
      if (!t) {
        var e = InputSettings_1.InputSettings.GetAxisMappings(i);
        if (e.Num() > 0) {
          InputSettingsManager.RefreshAxisKeys(i, e);
          continue;
        }
        e = this.GetAxisBinding(i);
        if (e && !e.HasAnyKey()) {
          this.$sh(i, n);
          continue;
        }
      }
      this.$sh(i, n);
    }
  }
  static $sh(t, i) {
    let e = new Map();
    e = InputSettingsManager.CheckUseFrenchKeyboard ? i.FrancePcKeys : i.PcKeys;
    var n;
    var a;
    var s;
    var o;
    var i = i.GamepadKeys;
    var r = new Map();
    for ([n, a] of e) {
      r.set(n, a);
    }
    for ([s, o] of i) {
      r.set(s, o);
    }
    InputSettingsManager.SetAxisKeys(t, r);
  }
  static ResetActionKeyByName(t) {
    var i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetActionMappingConfigByActionName(t);
    if (i) {
      this.Ksh(t, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 74, "Action按键配置不存在", ["ActionName", t]);
    }
  }
  static ResetAxisKeyByName(t) {
    var i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAxisMappingConfigByAxisName(t);
    if (i) {
      this.$sh(t, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 74, "Axis按键配置不存在", ["AxisName", t]);
    }
  }
  static ResetCombinationActionKeyByName(t) {
    var i;
    var e;
    var n;
    var a;
    var s;
    var o;
    var r = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionName(t);
    if (r) {
      for ([i, e] of [...(this.kEe.get(t) ?? [])]) {
        this.RemoveCombinationActionKeyMap(t, i, e);
      }
      for ([n, a] of r.PcKeys) {
        this.AddCombinationActionKeyMap(t, n, a)?.SetKeyboardVersion(r.KeyboardVersion);
      }
      for ([s, o] of r.GamepadKeys) {
        this.AddCombinationActionKeyMap(t, s, o)?.SetGamepadVersion(r.GamepadVersion);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 74, "组合Action按键配置不存在", ["ActionName", t]);
    }
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
      var e = i.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(e)) {
        return e;
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
  static SetActionKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "设置Action按键", ["actionName", t]);
    }
    this.qEe.SetKeys(t, i);
  }
  static RefreshActionKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "刷新Action按键", ["actionName", t]);
    }
    this.qEe.RefreshKeysByActionMappings(t, i);
  }
  static AddActionKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "添加Action按键", ["actionName", t]);
    }
    this.qEe.AddKeys(t, i);
  }
  static RemoveActionKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "删除按键", ["actionName", t]);
    }
    this.qEe.RemoveKeys(t, i);
  }
  static RemoveActionKeysByCondition(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "删除Action中符合条件的按键映射", ["actionName", t]);
    }
    this.qEe.RemoveKeysByCondition(t, i);
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
      var e = i.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(e)) {
        return e;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InputSettings", 10, "此按键配置了空的图标路径", ["KeyName", i.KeyName]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InputSettings", 10, "Axis找不到对应按键", ["AxisName", t.GetAxisName()], ["KeyName", undefined]);
    }
  }
  static ContainAxisKeyByType(t, i) {
    for (const e of this.GEe.GetAxisBindingByAxisMappingType(t)) {
      if (e.HasKey(i)) {
        return {
          IsContain: true,
          ContainAxisBinding: e
        };
      }
    }
    return {
      IsContain: false,
      ContainAxisBinding: undefined
    };
  }
  static SetAxisKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "设置Axis按键", ["axisName", t]);
    }
    this.GEe.SetKeys(t, i);
  }
  static RefreshAxisKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "刷新Axis按键", ["axisName", t]);
    }
    this.GEe.RefreshKeys(t, i);
  }
  static AddAxisKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "添加Axis按键", ["actionName", t]);
    }
    this.GEe.AddKeys(t, i);
  }
  static RemoveAxisKeys(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "删除按键", ["axisName", t]);
    }
    this.GEe.RemoveKeys(t, i);
  }
  static RemoveAxisKeysByCondition(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "删除Axis中符合条件的按键映射", ["axisName", t]);
    }
    this.GEe.RemoveKeysByCondition(t, i);
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
        for (var [i, e] of this.kEe) {
          for (const s of e) {
            var n = this._Sl(i, s[0], s[1]);
            var a = ConfigManager_1.ConfigManager.InputSettingsConfig.GetCombinationActionConfigByActionNameInList(i);
            if (a) {
              n?.SetKeyboardVersion(a.KeyboardVersion);
              n?.SetGamepadVersion(a.GamepadVersion);
            }
          }
        }
      }
    }
  }
  static drh() {
    var t = ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationActionConfig();
    if (t) {
      for (const o of t) {
        var i;
        var e;
        var n;
        var a;
        var s = o.ActionName;
        for ([i, e] of o.PcKeys) {
          this.AddCombinationActionKeyMap(s, i, e)?.SetKeyboardVersion(o.KeyboardVersion);
        }
        for ([n, a] of o.GamepadKeys) {
          this.AddCombinationActionKeyMap(s, n, a)?.SetGamepadVersion(o.GamepadVersion);
        }
      }
    }
  }
  static SetCombinationActionKeyboardKeys(t, i) {
    var e = this.GetCombinationActionBindingByActionName(t);
    if (e) {
      var n;
      var a;
      var s;
      var o;
      var r = new Map();
      e.GetPcKeyNameMap(r);
      for ([n, a] of r) {
        InputSettingsManager.RemoveCombinationActionKeyMap(t, n, a);
      }
      for ([s, o] of i) {
        InputSettingsManager.AddCombinationActionKeyMap(t, s, o);
      }
      return e;
    }
  }
  static SetCombinationActionGamepadKeys(t, i) {
    var e = this.GetCombinationActionBindingByActionName(t);
    if (e) {
      var n;
      var a;
      var s;
      var o;
      var r = new Map();
      e.GetGamepadKeyNameMap(r);
      for ([n, a] of r) {
        InputSettingsManager.RemoveCombinationActionKeyMap(t, n, a);
      }
      for ([s, o] of i) {
        InputSettingsManager.AddCombinationActionKeyMap(t, s, o);
      }
      return e;
    }
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
    if (i && i.HasKey("Gamepad_LeftTrigger") && (t = this.GetCombinationActionBindingByActionName(InputMappingsDefine_1.actionMappings.幻象2)) && t.HasKey("Gamepad_LeftShoulder", "Gamepad_FaceButton_Left") && (i.RemoveKeys(["Gamepad_LeftTrigger"]), (t = this.GetActionBinding(InputMappingsDefine_1.actionMappings.瞄准)) && !t.HasKey("Gamepad_LeftTrigger") && t.AddKeys(["Gamepad_LeftTrigger"]), i = this.GetCombinationActionBindingByActionName(InputMappingsDefine_1.actionMappings.瞄准)) && (t = new Map(), i.GetGamepadKeyNameMap(t), t.get("Gamepad_LeftShoulder") === "Gamepad_FaceButton_Left")) {
      i.RemoveKey("Gamepad_LeftShoulder");
    }
  }
  static ClearCombinationActionKeyMap() {
    this.NEe?.Clear();
    this.kEe.clear();
  }
  static AddCombinationActionKeyMap(t, i, e) {
    var n = this.FEe(t, i, e);
    var a = this.kEe.get(t);
    var s = [i, e];
    if (a) {
      for (var [o, r] of a) {
        if (o === i && r === e) {
          return n;
        }
      }
      a.push(s);
    } else {
      this.kEe.set(t, [s]);
    }
    this.Ykn();
    return n;
  }
  static _Sl(t, i, e) {
    var n;
    var a = this.TryGetCombinationActionBinding(t);
    if (a) {
      if ((n = a.GetSecondaryKeyNameByMainKey(i)) && n !== e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputSettings", 10, "组合键主键已存在,删除旧的组合键数据", ["ActionName", a.GetActionName()], ["mainKeyName", i], ["secondaryKeyName", n]);
        }
        this.RemoveCombinationActionKeyMap(t, i, n);
      }
      return this.FEe(t, i, e);
    }
  }
  static FEe(t, i, e) {
    var n = this.TryGetCombinationActionBinding(t);
    if (n) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "添加组合键按键", ["ActionName", n.GetActionName()], ["mainKeyName", i], ["secondaryKeyName", e]);
      }
      this.NEe?.AddKey(n, i, e);
      InputSettings_1.InputSettings.NewInputCombinationActionKey(n.GetActionName(), i, e);
      this.PrintCurrentCombinationActionBinding(t);
      return n;
    }
  }
  static TryGetCombinationActionBinding(t) {
    let i = this.GetCombinationActionBindingByActionName(t);
    return i = i || this.NEe.NewCombinationActionBinding(t, 0);
  }
  static RemoveCombinationActionKeyMap(t, i, e) {
    this.VEe(t, i, e);
    var n = this.kEe.get(t);
    if (n) {
      var a = [];
      for (let t = 0; t < n.length; t++) {
        var s = n[t];
        if (s[0] === i && s[1] === e) {
          a.push(t);
        }
      }
      for (const o of a) {
        n.splice(o, 1);
      }
      if (n.length <= 0) {
        this.kEe.delete(t);
      }
    } else {
      this.kEe.delete(t);
    }
    this.Ykn();
    this.PrintCurrentCombinationActionBinding(t);
  }
  static VEe(t, i, e) {
    t = this.GetCombinationActionBindingByActionName(t);
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "删除组合键按键", ["ActionName", t.GetActionName()], ["RemoveMainKey", i], ["RemoveSecondaryKeyName", e]);
      }
      this.NEe?.RemoveKey(t, i, e);
      InputSettings_1.InputSettings.RemoveCombinationActionMapping(t.GetActionName(), i, e);
    }
  }
  static PrintCurrentCombinationActionBinding(t, i = 0) {
    var e = new Map();
    var n = new Map();
    var a = new Map();
    var t = this.NEe?.GetCombinationActionBindingByActionName(t);
    t?.GetKeyMap(e);
    t?.GetPcKeyNameMap(n);
    t?.GetGamepadKeyNameMap(a);
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
    t = this.GetCombinationActionBindingByKeyName(t, i);
    return !!t && !(t.size <= 0);
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
    var e = Global_1.Global.CharacterController.GetCurrentPlatformCustomActionKeyNameList(i);
    if (e) {
      t.RefreshInput(i, e);
      return true;
    }
    e = InputSettingsManager.GetCombinationActionBindingByActionName(i);
    if (e) {
      var n = new Map();
      e.GetCurrentPlatformKeyNameMap(n);
      if (n && n.size > 0) {
        t.RefreshCombinationInput(i, n);
        return true;
      }
    }
    e = InputSettingsManager.GetActionBinding(i);
    if (e) {
      n = [];
      e.GetCurrentPlatformKeyNameList(n);
      if (n.length > 0) {
        t.RefreshInput(i, n);
        return true;
      }
    }
    return false;
  }
  static GetAxisKeyDisplayData(t, i) {
    var e = InputSettingsManager.GetCombinationAxisBindingByAxisName(i);
    if (e) {
      var n = new Map();
      e.GetCurrentPlatformKeyNameMap(n);
      if (n && n.size > 0) {
        t.RefreshCombinationInput(i, n);
        return true;
      }
    }
    e = InputSettingsManager.GetAxisBinding(i);
    if (e) {
      n = [];
      e.GetCurrentPlatformKeyNameList(n);
      if (n.length > 0) {
        t.RefreshInput(i, n);
        return true;
      }
    }
    return false;
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
InputSettingsManager.fZa = new Map();
InputSettingsManager.pZa = new Map();
InputSettingsManager.frh = "";
InputSettingsManager.SkipGlobalSdkCheck = false;
InputSettingsManager.vZa = () => {
  var t = InputSettings_1.InputSettings.GetKeyboardPrimaryLangId();
  _a.ChangeActionAndAxisPcKeys(t);
}; //# sourceMappingURL=InputSettingsManager.js.map