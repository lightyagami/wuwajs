"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const MobileSwitchInputController_1 = require("../../Ui/Input/Moblie/MobileSwitchInputController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
const CommonInputViewController_1 = require("../Common/InputView/Controller/CommonInputViewController");
const ConfirmBoxController_1 = require("../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const MenuDefine_1 = require("./MenuDefine");
class MenuController extends UiControllerBase_1.UiControllerBase {
  static get aOc() {
    if (Info_1.Info.IsMacPlatform()) {
      return MenuDefine_1.makeImageQualityCustomSetForMac;
    } else {
      return MenuDefine_1.makeImageQualityCustomSet;
    }
  }
  static OnInit() {
    MenuController.MFe();
    MenuController.cXa();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Menu", 64, "设置系统Controller初始化");
    }
    return true;
  }
  static OnClear() {
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ControllerConnectChange, MenuController.lWa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, MenuController.cbc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSdkFocusStateChange, this.sTu);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ControllerConnectChange, MenuController.lWa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, MenuController.cbc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSdkFocusStateChange, this.sTu);
  }
  static HandleFireSaveMenuChange(e, t) {
    var n = e.FunctionId;
    var i = this.NeedRedMagicFpsConfirmBox(t);
    if (n === GameSettingsDefine_1.EFunction.IMAGEQUALITY) {
      ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom = false;
    } else if (this.aOc.has(n)) {
      ModelManager_1.ModelManager.MenuModel.IsImageQualityCustom = true;
    }
    GameSettingsManager_1.GameSettingsManager.HandleValueChange(n, t, 1);
    this.fac(e);
    this.KNa(e);
    this.pMa(e, t);
    if (MenuDefine_1.noticeConfigSet.has(n)) {
      if (n === GameSettingsDefine_1.EFunction.HIGHESTFPS) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ConfigLoadChange, !i);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ConfigLoadChange, true);
      }
    }
    ModelManager_1.ModelManager.MenuModel.IsEdited = true;
  }
  static fac(e) {
    const t = e.FunctionId;
    if (t === GameSettingsDefine_1.EFunction.IMAGEQUALITY) {
      var n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t);
      if (n === undefined) {
        return;
      }
      n = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(n);
      if (n !== undefined) {
        for (const [t, i] of GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(n)) {
          if ((t !== GameSettingsDefine_1.EFunction.MOBILERESOLUTION || !!Info_1.Info.IsMobilePlatform()) && (t !== GameSettingsDefine_1.EFunction.PCVSYNC || !!Info_1.Info.IsPcOrGamepadPlatform()) && (t !== GameSettingsDefine_1.EFunction.NPCDENSITY || !UE.KuroStaticLibrary.IsLowMemoryDevice())) {
            GameSettingsManager_1.GameSettingsManager.HandleValueChange(t, i, 1);
          }
        }
      }
    }
    if (this.aOc.has(t)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, GameSettingsDefine_1.EFunction.IMAGEQUALITY);
    }
    if (t === GameSettingsDefine_1.EFunction.RayTracing && ModelManager_1.ModelManager.MenuModel.NeedRayTracingSubChange && (n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t)) !== undefined) {
      if (GameSettingsManager_1.GameSettingsManager.IsValid(GameSettingsDefine_1.EFunction.RayTracedGI)) {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.RayTracedGI, n > 0 ? 1 : 0, 1);
      } else {
        GameSettingsManager_1.GameSettingsManager.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedGI, n > 0 ? 1 : 0);
      }
      if (GameSettingsManager_1.GameSettingsManager.IsValid(GameSettingsDefine_1.EFunction.RayTracedReflection)) {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.RayTracedReflection, n > 0 ? 1 : 0, 1);
      } else {
        GameSettingsManager_1.GameSettingsManager.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedReflection, n > 0 ? 1 : 0);
      }
      if (GameSettingsManager_1.GameSettingsManager.IsValid(GameSettingsDefine_1.EFunction.RayTracedGI)) {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.RayTracedShadow, n > 0 ? 1 : 0, 1);
      } else {
        GameSettingsManager_1.GameSettingsManager.ForceSaveValue(GameSettingsDefine_1.EFunction.RayTracedShadow, n > 0 ? 1 : 0);
      }
    }
    if (t === GameSettingsDefine_1.EFunction.NVIDIADLSS && (n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t)) !== undefined && n === 0) {
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.NVIDIADLSSFG, 0, 1);
    }
    const i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t);
    if (i !== undefined && e.CanAffectedFunction(i)) {
      for (var [a, r] of e.AffectedFunction) {
        if (GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap.has(a)) {
          GameSettingsManager_1.GameSettingsManager.HandleValueChange(a, r, 1);
        }
      }
    }
  }
  static KNa(e) {
    var t = e.FunctionId;
    if (e.HasDisableFunction) {
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t);
      if (t !== undefined) {
        for (const n of e.DisableFunction) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, n);
        }
      }
    }
  }
  static pMa(e, t) {
    var n;
    var i;
    var a;
    var r = e.FunctionId;
    if (r === GameSettingsDefine_1.EFunction.NVIDIADLSSFG || r === GameSettingsDefine_1.EFunction.RESOLUTION || r === GameSettingsDefine_1.EFunction.DISPLAYMODE) {
      a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.DISPLAYMODE);
      i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.RESOLUTION);
      n = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NVIDIADLSSFG);
      if (a === undefined || i === undefined || n === undefined) {
        return undefined;
      } else {
        a = a === 0 ? 0 : i;
        i = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(a);
        if (n > 0 && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsNvidia4060() && i.X >= 3840 && i.Y >= 2160) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Change4KWarning_Text");
        }
        return;
      }
    }
    if (r === GameSettingsDefine_1.EFunction.RayTracing) {
      if (t > 0 && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDriverNeedUpdateForRayTracing()) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("UpdateGraphicsCardDriver_Text");
      }
    } else if ((a = e.ValueTipsMap.get(t)) !== undefined) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(a);
    }
  }
  static cXa() {
    var e;
    var t;
    if (Info_1.Info.IsMobileInputModel()) {
      e = ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached();
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.MobileGamepadMode, e ? 1 : 0, 1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MobileInputSwitch", 10, "初始化手柄连接状态", ["isGamepadAttach", e], ["MobileGamepadMode", GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MobileGamepadMode)]);
      }
      if (e) {
        t = ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceInputController();
        Info_1.Info.SwitchInputControllerType(t, "InitGamepadConnect");
        LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LastGamepadEnum, Info_1.Info.InputControllerType);
      }
      ModelManager_1.ModelManager.PlatformModel.LastGamepadAttachedState = e;
    }
  }
  static RefreshGamepadConnect() {
    var e;
    var t;
    if (Info_1.Info.IsMobileInputModel()) {
      e = ModelManager_1.ModelManager.PlatformModel.IsGamepadAttached();
      t = ModelManager_1.ModelManager.PlatformModel.LastGamepadAttachedState;
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.MobileGamepadMode, e ? 1 : 0, 1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MobileInputSwitch", 10, "刷新手柄连接状态", ["isGamepadAttach", e], ["lastState", t], ["MobileGamepadMode", GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MobileGamepadMode)]);
      }
      if (!!e || !t || !(Log_1.Log.CheckInfo() && Log_1.Log.Info("MobileInputSwitch", 10, "手柄重置回触屏模式,手柄断联"), !MobileSwitchInputController_1.MobileSwitchInputController.SwitchToTouchByDisconnectGamepad())) {
        ModelManager_1.ModelManager.PlatformModel.LastGamepadAttachedState = e;
      }
    }
  }
  static GetMainTypeList() {
    return ModelManager_1.ModelManager.MenuModel.GetMainTypeList();
  }
  static GetTargetMainInfo(e) {
    return ModelManager_1.ModelManager.MenuModel.GetTargetMainInfo(e);
  }
  static GetTargetBaseConfigData(e) {
    return ModelManager_1.ModelManager.MenuModel.GetTargetConfigData(e);
  }
  static GetTargetConfig(e) {
    var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
    if (t === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Menu", 64, "Menu中获取选项值失败，返回缺省值0", ["functionId", e]);
      }
      return 0;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Menu", 64, "Menu中获取选项值", ["functionId", e], ["result", t]);
      }
      return t;
    }
  }
  static zxi() {
    var e;
    if (Info_1.Info.IsMobilePlatform()) {
      return this.GetTargetConfig(GameSettingsDefine_1.EFunction.MOBILERESOLUTION).toString();
    } else {
      e = this.GetTargetConfig(GameSettingsDefine_1.EFunction.RESOLUTION);
      return GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionByList(e).ToString();
    }
  }
  static ReportSettingMenuLogEvent() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Menu", 64, "上报设置系统埋点数据[Start]");
    }
    var e = new LogReportDefine_1.SettingMenuLogEvent();
    e.i_image_quality = this.GetTargetConfig(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
    e.i_display_mode = this.GetTargetConfig(GameSettingsDefine_1.EFunction.DISPLAYMODE);
    e.s_resolution = this.zxi();
    e.i_brightness = this.GetTargetConfig(GameSettingsDefine_1.EFunction.BRIGHTNESS);
    e.i_highest_fps = this.GetTargetConfig(GameSettingsDefine_1.EFunction.HIGHESTFPS);
    e.i_shadow_quality = this.GetTargetConfig(GameSettingsDefine_1.EFunction.SHADOWQUALITY);
    e.i_niagara_quality = this.GetTargetConfig(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
    e.i_fsr = this.GetTargetConfig(GameSettingsDefine_1.EFunction.FSR);
    e.i_image_detail = this.GetTargetConfig(GameSettingsDefine_1.EFunction.IMAGEDETAIL);
    e.i_scene_ao = this.GetTargetConfig(GameSettingsDefine_1.EFunction.SCENEAO);
    e.i_volume_Fog = this.GetTargetConfig(GameSettingsDefine_1.EFunction.VOLUMEFOG);
    e.i_volume_light = this.GetTargetConfig(GameSettingsDefine_1.EFunction.VOLUMELIGHT);
    e.i_motion_blur = this.GetTargetConfig(GameSettingsDefine_1.EFunction.MOTIONBLUR);
    e.i_anti_aliasing = this.GetTargetConfig(GameSettingsDefine_1.EFunction.ANTIALISING);
    e.i_pcv_sync = this.GetTargetConfig(GameSettingsDefine_1.EFunction.PCVSYNC);
    e.i_horizontal_view_sensitivity = this.GetTargetConfig(GameSettingsDefine_1.EFunction.HorizontalViewSensitivity);
    e.i_vertical_view_sensitivity = this.GetTargetConfig(GameSettingsDefine_1.EFunction.VerticalViewSensitivity);
    e.i_aim_horizontal_view_sensitivity = this.GetTargetConfig(GameSettingsDefine_1.EFunction.AimHorizontalViewSensitivity);
    e.i_aim_vertical_view_sensitivity = this.GetTargetConfig(GameSettingsDefine_1.EFunction.AimVerticalViewSensitivity);
    e.f_camera_shake_strength = this.GetTargetConfig(GameSettingsDefine_1.EFunction.CameraShakeStrength);
    e.i_common_spring_arm_length = this.GetTargetConfig(GameSettingsDefine_1.EFunction.CommonSpringArmLength);
    e.i_fight_spring_arm_length = this.GetTargetConfig(GameSettingsDefine_1.EFunction.FightSpringArmLength);
    e.i_reset_focus_enable = this.GetTargetConfig(GameSettingsDefine_1.EFunction.ResetFocusEnable);
    e.i_side_step_camera_enable = this.GetTargetConfig(GameSettingsDefine_1.EFunction.IsSidestepCameraEnable);
    e.i_soft_lock_camera_enable = this.GetTargetConfig(GameSettingsDefine_1.EFunction.IsSoftLockCameraEnable);
    e.i_joystick_shake_strength = this.GetTargetConfig(GameSettingsDefine_1.EFunction.JoystickShakeStrength);
    e.i_joystick_shake_type = this.GetTargetConfig(GameSettingsDefine_1.EFunction.JoystickShakeType);
    e.f_walk_or_run_rate = this.GetTargetConfig(GameSettingsDefine_1.EFunction.WalkOrRunRate);
    e.i_advice_setting = this.GetTargetConfig(GameSettingsDefine_1.EFunction.ADVICESETTING);
    e.i_enemy_id = this.GetTargetConfig(GameSettingsDefine_1.EFunction.SkillLockEnemyMode);
    var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? -1;
    var n = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues)?.get(t);
    e.i_filter_list = `id:${t}-intense:${n ? n[2] : -1}-x:${n ? n[0] : -1}-y:${n ? n[1] : -1}`;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Menu", 64, "上报设置系统埋点数据[Data Collect Done]");
    }
    LogReportController_1.LogReportController.LogReport(e);
  }
  static BeforeViewClose() {
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.NVIDIADLSSQUALITY, 1);
  }
  static MFe() {
    this.OpenViewFuncMap.set("LogUploadView", this.ewi);
    this.OpenViewFuncMap.set("CdKeyInputView", this.twi);
    this.OpenViewFuncMap.set("MobileSwitchInputView", this._Wa);
    this.OpenViewFuncMap.set("ResDownLoadView", this.UF1);
    this.OpenViewFuncMap.set("FilterSettingView", this.OpenFilterSettingView);
  }
  static IsInputControllerTypeIncludeKey(e, t) {
    switch (e) {
      case 1:
        return InputSettings_1.InputSettings.IsKeyboardKey(t) || InputSettings_1.InputSettings.IsMouseButton(t);
      case 2:
        return InputSettings_1.InputSettings.IsGamepadKey(t);
      default:
        return false;
    }
  }
  static OpenChangeLockView() {
    var e;
    var t;
    var n;
    var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.锁定目标);
    if (i) {
      t = [];
      i.GetPcKeyNameList(e = []);
      i.GetGamepadKeyNameList(t);
      i = e[0];
      e = t[0];
      i = {
        RowSpriteResourceId: "SP_SwitchType1",
        DescriptionA: "LockEnemyModeText_1",
        DescriptionParametersA: [`<texture=${t = InputSettings_1.InputSettings.GetKeyIconPath(i)}/>`],
        DescriptionB: "LockEnemyModeText_3",
        DescriptionParametersB: [`<texture=${t}/>`]
      };
      t = {
        RowSpriteResourceId: "SP_SwitchType2",
        DescriptionA: "LockEnemyModeText_2",
        DescriptionParametersA: [`<texture=${t}/>`],
        DescriptionB: "LockEnemyModeText_4"
      };
      n = {
        RowSpriteResourceId: "SP_SwitchType1",
        DescriptionA: "LockEnemyModeText_1",
        DescriptionParametersA: [`<texture=${e = InputSettings_1.InputSettings.GetKeyIconPath(e)}/>`],
        DescriptionB: "LockEnemyModeText_3",
        DescriptionParametersB: [`<texture=${e}/>`]
      };
      e = {
        RowSpriteResourceId: "SP_SwitchType2",
        DescriptionA: "LockEnemyModeText_2",
        DescriptionParametersA: [`<texture=${e}/>`],
        DescriptionB: "LockEnemyModeText_6"
      };
      i = {
        GroupName: "LockEnemyModeType_1",
        DefaultKeyModeRowIndex: GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode) ?? 0,
        ChangeKeyModeRowList: [i, t]
      };
      t = {
        GroupName: "LockEnemyModeType_2",
        DefaultKeyModeRowIndex: GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.GamepadLockEnemyMode) ?? 0,
        ChangeKeyModeRowList: [n, e]
      };
      n = {
        TitleName: "LockEnemyModeTitle",
        DefaultGroupIndex: ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType === 2 ? 1 : 0,
        ChangeKeyModeGroupList: [i, t],
        OnConfirmCallback: this.ita
      };
      UiManager_1.UiManager.OpenView("ChangeModeTipsView", n);
    }
  }
  static OpenImageOverloadConfirmBox() {
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.AutoAdjustImageQuality);
    if (e !== undefined) {
      if (e === 1) {
        this.OpenImageQualityOverloadConfirmBox();
      } else {
        this.wKa();
      }
    }
  }
  static wKa() {
    let t = false;
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(221);
    e.HasToggle = true;
    e.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MenuConfig_145_Set_Tips");
    e.IsEscViewTriggerCallBack = false;
    e.SetToggleFunction(e => {
      t = e;
    });
    e.FunctionMap.set(2, () => {
      if (t) {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.AutoAdjustImageQuality, 1, 1);
      } else {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.AutoAdjustImageQuality, 0, 1);
      }
    });
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static OpenImageQualityOverloadConfirmBox() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(215);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static NeedRedMagicFpsConfirmBox(e) {
    return GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsRedMagic() && GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameIndexByList(90) === e && GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.Vulkan) === 0;
  }
}
exports.MenuController = MenuController;
(_a = MenuController).lWa = (e, t, n) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("MobileInputSwitch", 10, "刷新手柄连接状态", ["bIsConnected", e], ["platformUserId", t], ["controllerId", n]);
  }
  _a.RefreshGamepadConnect();
};
MenuController.cbc = () => {
  if (Info_1.Info.IsInGamepad()) {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LastGamepadEnum, Info_1.Info.InputControllerType);
  }
};
MenuController.sTu = e => {
  if (!e) {
    _a.RefreshGamepadConnect();
  }
};
MenuController.OpenViewFuncMap = new Map();
MenuController.ewi = () => {
  UiManager_1.UiManager.OpenView("LogUploadView", 2);
};
MenuController.twi = () => {
  CommonInputViewController_1.CommonInputViewController.OpenCdKeyInputView();
};
MenuController._Wa = () => {
  MobileSwitchInputController_1.MobileSwitchInputController.SwitchToGamepadByMenuSetting();
};
MenuController.UF1 = () => {
  UiManager_1.UiManager.OpenView("ResDownLoadView", 2);
};
MenuController.ita = e => {
  for (var [t, n] of e) {
    if (t === 0) {
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode, n, 1);
    } else if (t === 1) {
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(GameSettingsDefine_1.EFunction.GamepadLockEnemyMode, n, 1);
    }
  }
};
MenuController.OpenFilterSettingView = () => {
  ControllerHolder_1.ControllerHolder.FilterSettingController.TryOpenExternalPreparedAsync();
}; //# sourceMappingURL=MenuController.js.map