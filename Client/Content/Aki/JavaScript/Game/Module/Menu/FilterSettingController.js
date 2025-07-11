"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSettingController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FilterSettingAll_1 = require("../../../Core/Define/ConfigQuery/FilterSettingAll");
const FilterSettingById_1 = require("../../../Core/Define/ConfigQuery/FilterSettingById");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const PhotographDefine_1 = require("../Photograph/PhotographDefine");
const SeamlessTravelController_1 = require("../SeamlessTravel/SeamlessTravelController");
const UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraPhotographerStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraPhotographerStructure");
const MenuDefine_1 = require("./MenuDefine");
const FilterSettingViewModel_1 = require("./SubViews/FilterSetting/FilterSettingViewModel");
class FilterSettingController extends UiControllerBase_1.UiControllerBase {
  static get zfu() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("FilterSettingLeftStickDeadZone") ?? 0;
  }
  static get Jfu() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("FilterSettingLeftStickMoveFactor") ?? 1;
  }
  static Clear() {
    this.dWi();
    return super.Clear();
  }
  static OnLeaveLevel() {
    this.dWi();
    this.$Du(true);
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneLastStepInLoadScene, this.WDu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneLastStepInExitScene, this.QDu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.EUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.XDu);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneLastStepInLoadScene, this.WDu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneLastStepInExitScene, this.QDu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.EUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.XDu);
    this.m$e();
  }
  static async TryOpenExternalPreparedAsync() {
    return !!this.$ha() && this.ocu();
  }
  static $ha() {
    var e;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!t?.Valid && !(ModelManager_1.ModelManager.PlotModel.IsInPlot ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在剧情中"), 1) : !(e = t.Entity.GetComponent(205)) || (e.HasTag(40422668) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在空中"), 1) : e.HasTag(855966206) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在水中"), 1) : e.HasTag(504239013) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在攀爬"), 1) : e.HasTag(1996802261) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在战斗中"), 1) : e.HasTag(-1371021686) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在技能中"), 1) : e.HasTag(525255941) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在驾驶载具"), 1) : UiManager_1.UiManager.IsViewOpen("FilterSettingView") ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:已经在滤镜界面"), 1) : ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在声骸编队"), 1) : !t.Entity.GetComponent(177)?.MainAnimInstance && (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:实体状态机找不到"), 1)));
  }
  static ncu(e) {
    var t;
    var r;
    var i;
    this.EWi = this.yWi();
    if (this.EWi && (this.IWi = this.GetFightCameraActor(), this.IWi)) {
      this.TWi = this.LWi();
      this.DWi().SetIsDitherEffectEnable(false);
      (t = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1);
      t = t?.Mesh.D_GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME);
      r = this.IWi.D_GetTransform();
      i = this.Zfu(t, r.GetRotation(), r.GetScale3D());
      this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE;
      i?.SetPlayerSourceLocation(t);
      i?.SetCameraInitializeTransform(r);
      i?.SetFov(PhotographDefine_1.DEFAULT_FOV);
      e.UiCameraPhotographerStructure = i;
      UiCameraManager_1.UiCameraManager.Get().Enter(0.5);
      this.scu(e);
    }
  }
  static scu(t) {
    for (const i of ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig()) {
      let e = -1;
      var r = i.Type;
      if (r === 0) {
        e = i.DefaultOptionIndex;
      } else if (r === 1) {
        e = i.ValueRange[2];
      }
      this.acu(t, i.ValueType, e);
    }
  }
  static acu(e, t, r) {
    e.PhotographOptionMap.set(t, r);
    switch (t) {
      case 3:
        var i;
        if (r === 1) {
          a = e.PhotographOptionMap.get(4);
          i = e.PhotographOptionMap.get(5);
          this.TWi.FocusSettings.ManualFocusDistance = a;
          this.TWi.CurrentAperture = i;
        } else {
          this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_FOCAL_LENTGH;
          this.TWi.CurrentAperture = PhotographDefine_1.DEFAULT_APERTURE;
        }
        break;
      case 4:
        if (e.PhotographOptionMap.get(3) === 1) {
          this.TWi.FocusSettings.ManualFocusDistance = r;
        }
        break;
      case 5:
        if (e.PhotographOptionMap.get(3) === 1) {
          this.TWi.CurrentAperture = r;
        }
        break;
      case 0:
        var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (r === 1) {
          this.wvl(e, a, true);
        } else {
          this.wvl(e, a, false);
        }
    }
  }
  static wvl(e, t, r) {
    if (t?.Valid && t.Entity?.Valid && t.Entity.Active !== r) {
      if (r) {
        if (e.SetDisableEntity && t.Id === e.SetDisableEntity.Id) {
          t.Entity.Enable(e.EntityDisableId, "FilterSetting.SetEntityEnable");
          e.EntityDisableId = undefined;
          e.SetDisableEntity = undefined;
        } else {
          this.egu(e);
        }
      } else {
        if (e.SetDisableEntity) {
          this.egu(e);
        }
        e.SetDisableEntity = t;
        e.EntityDisableId = t.Entity.Disable("[FilterSetting.SetEntityEnable] bEnable为false");
      }
    }
  }
  static egu(e) {
    if (e.SetDisableEntity) {
      e.SetDisableEntity.Entity?.Enable(e.EntityDisableId, "FilterSetting.ResetEntityEnable");
    }
    e.EntityDisableId = undefined;
    e.SetDisableEntity = undefined;
  }
  static async ocu() {
    this.EWi = this.yWi();
    if (!this.EWi) {
      return false;
    }
    this.IWi = this.GetFightCameraActor();
    if (!this.IWi) {
      return false;
    }
    this.js1();
    this.c$e();
    await this.OMa();
    var e = this.hcu();
    var e = await UiManager_1.UiManager.OpenViewAsync("FilterSettingView", e);
    await this.lcu();
    return e !== undefined;
  }
  static hcu() {
    var e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
    const a = new FilterSettingViewModel_1.FilterSettingViewModel();
    a.InitFilterIndex = ModelManager_1.ModelManager.MenuModel.GetFilterIndexByConfigId(e);
    this.ltu(e, a);
    a.OnHideClick = () => {
      a.IsHideByClick = !a.IsHideByClick;
    };
    a.OnResetClick = () => {
      const i = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
      var e = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(i);
      if (e) {
        e.forEach((e, t, r) => {
          r[t] = this.GetFilterDefaultValue(i, t);
        });
      }
      a.IntensityNormalized = this.GetFilterDefaultValue(i, 2);
      a.HorizontalNormalized = this.GetFilterDefaultValue(i, 0);
      a.VerticalNormalized = this.GetFilterDefaultValue(i, 1);
      this.Fdu(a, i, a.HorizontalNormalized, a.VerticalNormalized, a.IntensityNormalized);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFilterFeatureResetTips");
      a.IsFilterChanged = true;
    };
    a.OnConfirmClick = () => {
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId, ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache);
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues, ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFilterFeatureUseTips");
      a.IsApplyClicked = true;
      ModelManager_1.ModelManager.MenuModel.IsEdited = true;
    };
    a.OnCloseClick = () => {
      var e;
      if (a.IsFilterChanged && !a.IsApplyClicked) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(324)).FunctionMap.set(2, () => {
          this.CloseFilterSettingView();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.CloseFilterSettingView();
      }
    };
    a.OnPadChanged = () => {
      var e;
      var t;
      if (!a.PadLock && (e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache, t = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(e))) {
        t[0] = a.HorizontalNormalized;
        t[1] = a.VerticalNormalized;
        this.Fdu(a, e, t[0], t[1], t[2]);
        a.IsHideByPad = true;
        a.IsFilterChanged = true;
      }
    };
    a.OnPadChangeStop = () => {
      if (!Info_1.Info.IsInGamepad()) {
        a.IsHideByPad = false;
      }
    };
    a.OnSliderChanged = () => {
      var e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
      var t = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(e);
      if (t) {
        t[2] = a.IntensityNormalized;
        this.Fdu(a, e, t[0], t[1], t[2]);
        a.IsFilterChanged = true;
      }
    };
    a.OnViewBeforeCreate = () => {
      this.ncu(a);
    };
    a.OnViewBeforeStart = () => {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroScreenFilterFrame 5");
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, false);
    };
    a.OnViewBeforeShow = e => {
      UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag(e);
    };
    a.OnViewAfterHide = e => {
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag(e);
    };
    a.OnViewDestroy = () => {
      ModelManager_1.ModelManager.MenuModel.CleanFilterCache();
      ModelManager_1.ModelManager.MenuModel.FilterSettingViewModel = undefined;
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, true);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroScreenFilterFrame 60");
      this.ApplyFilterSetting();
    };
    a.OnDragBegin = () => {
      a.CameraRotationLock = true;
    };
    a.OnDragEnded = () => {
      a.LastMoveVector = undefined;
      a.CameraRotationLock = false;
    };
    a.OnDragMoved = e => {
      var t;
      var r;
      if (!(TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1)) {
        e = e.pointerPosition;
        if (a.LastMoveVector) {
          t = (e.Y - a.LastMoveVector.Y) * a.ControlCameraRate;
          r = (a.LastMoveVector.X - e.X) * a.ControlCameraRate;
          a.UiCameraPhotographerStructure?.AddCameraArmPitchInput(-t);
          a.UiCameraPhotographerStructure?.AddCameraArmYawInput(-r);
        }
        a.LastMoveVector = e;
      }
    };
    a.OnInputUiMoveForward = (e, t) => {
      var r;
      if (!Info_1.Info.IsInGamepad() || MathUtils_1.MathUtils.InRangeArray(t, [-this.zfu, this.zfu]) || a.VerticalReal === undefined || a.IsHideByClick || a.IsOtherViewOpen) {
        a.IsLeftStickVerticalMoved = false;
        a.IsHideByPad = a.IsLeftStickHorizontalMoved;
      } else {
        a.VerticalReal += t * this.Jfu;
        t = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
        if (r = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t)) {
          r[1] = a.VerticalNormalized;
          this.Fdu(a, t, r[0], r[1], r[2]);
          a.IsFilterChanged = true;
        }
        a.IsHideByPad = true;
        a.IsLeftStickVerticalMoved = true;
      }
    };
    a.OnInputUiMoveRight = (e, t) => {
      var r;
      if (!Info_1.Info.IsInGamepad() || MathUtils_1.MathUtils.InRangeArray(t, [-this.zfu, this.zfu]) || a.HorizontalReal === undefined || a.IsHideByClick || a.IsOtherViewOpen) {
        a.IsLeftStickHorizontalMoved = false;
        a.IsHideByPad = a.IsLeftStickVerticalMoved;
      } else {
        a.HorizontalReal += t * this.Jfu;
        t = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
        if (r = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t)) {
          r[0] = a.HorizontalNormalized;
          this.Fdu(a, t, r[0], r[1], r[2]);
          a.IsFilterChanged = true;
        }
        a.IsHideByPad = true;
        a.IsLeftStickHorizontalMoved = true;
      }
    };
    a.OnInputUiLookUp = (e, t) => {
      if (!!Info_1.Info.IsInGamepad() && !a.IsOtherViewOpen) {
        if (t !== 0) {
          a.UiCameraPhotographerStructure?.AddCameraArmPitchInput(-t);
        }
      }
    };
    a.OnInputUiTurn = (e, t) => {
      if (!!Info_1.Info.IsInGamepad() && !a.IsOtherViewOpen) {
        if (t !== 0) {
          a.UiCameraPhotographerStructure?.AddCameraArmYawInput(t);
        }
      }
    };
    a.OnIndexChanged = e => {
      e = ModelManager_1.ModelManager.MenuModel.GetFilterConfigIdByIndex(e);
      this.ltu(e, a);
    };
    a.OnLeftArrowClick = () => {
      a.IsFilterChanged = true;
    };
    a.OnRightArrowClick = () => {
      a.IsFilterChanged = true;
    };
    return a;
  }
  static ltu(e, t) {
    ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache = e;
    var r = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache;
    if (FilterSettingAll_1.configFilterSettingAll.GetConfigList() !== undefined) {
      if (r = r.get(e)) {
        t.IntensityNormalized = r[2];
        t.HorizontalNormalized = r[0];
        t.VerticalNormalized = r[1];
        this.Fdu(t, e, r[0], r[1], r[2]);
      }
      r = FilterSettingById_1.configFilterSettingById.GetConfig(e);
      t.FilterPadTexturePath = r?.PadTexturePath;
      t.FilterNameTextId = r?.NameTextId;
      t.IsSliderActive = e !== 1;
    }
  }
  static ApplyFilterSetting() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID;
    var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
    if (t &&= t.get(e)) {
      UE.KuroGISystem.SetKuroScreenFilterInterpolation(GlobalData_1.GlobalData.World, FilterSettingById_1.configFilterSettingById.GetConfig(e).LogicIndex, t[0], t[1], t[2]);
    }
  }
  static Fdu(e, t, r, i, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameSettings", 64, "设置全局滤镜值", ["filterId", t], ["horizontalNormalized", r], ["verticalNormalized", i], ["intensityNormalized", a]);
    }
    UE.KuroGISystem.SetKuroScreenFilterInterpolation(GlobalData_1.GlobalData.World, FilterSettingById_1.configFilterSettingById.GetConfig(t).LogicIndex, r, i, a);
  }
  static js1() {
    if (Global_1.Global.BaseCharacter) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(62)?.InterruptAutoMoving("打开拍照界面");
    }
  }
  static async OMa() {
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(11, 3, 0.5);
  }
  static async lcu() {
    await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(11, 0.5);
    LevelLoadingController_1.LevelLoadingController.CloseLoading(0);
  }
  static dWi() {
    this.x5_();
    this.U5_();
  }
  static async CloseFilterSettingView() {
    if (UiManager_1.UiManager.IsViewOpen("FilterSettingView")) {
      this.x5_();
      await this.OMa();
      this.U5_();
      if (ModelManager_1.ModelManager.PlotModel.IsInPlot) {
        UiManager_1.UiManager.NormalResetToView("BattleView");
      } else if (!UiManager_1.UiManager.GetViewByName("ReviveView")) {
        await UiManager_1.UiManager.NormalResetToViewAsync("BattleView");
      }
      await this.lcu();
    }
  }
  static x5_() {
    this.IWi = undefined;
    this.EWi = undefined;
    this.TWi = undefined;
  }
  static U5_() {
    var e = UiManager_1.UiManager.GetViewByName("FilterSettingView")?.VmCache;
    if (e) {
      this.tgu(e);
      this.egu(e);
      e.PhotographOptionMap.clear();
    }
    this.m$e();
    this.DWi().SetIsDitherEffectEnable(true);
    e = Global_1.Global.BaseCharacter;
    if (e !== undefined && !SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(e.CharacterActorComponent?.Entity)) {
      e?.SetDitherEffect(0, 1);
    }
  }
  static tgu(e) {
    UiCameraManager_1.UiCameraManager.Destroy(PhotographDefine_1.PHOTOGRAPH_CAMERA_BLEND_OUT);
    e.UiCameraPhotographerStructure = undefined;
  }
  static c$e() {
    this.RWi(1996802261, this.UWi);
    this.RWi(40422668, this.UWi);
    this.RWi(855966206, this.UWi);
  }
  static m$e() {
    for (const e of this.AWi) {
      e.EndTask();
    }
    this.AWi.length = 0;
  }
  static RWi(e, t) {
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (r?.Valid && r.Entity?.Valid) {
      r = r.Entity.GetComponent(205).ListenForTagAddOrRemove(e, t);
      this.AWi.push(r);
    }
  }
  static yWi() {
    var e = CameraController_1.CameraController.WidgetCamera;
    if (e) {
      e = e.GetComponent(12);
      if (e.Valid) {
        return e.CineCamera;
      }
    }
  }
  static LWi() {
    var e = this.EWi;
    if (e?.IsValid()) {
      return e.GetCineCameraComponent();
    }
  }
  static GetFightCameraActor() {
    var e = CameraController_1.CameraController.FightCamera;
    if (e) {
      e = e.GetComponent(4);
      if (e.Valid) {
        return e.CameraActor;
      }
    }
  }
  static DWi() {
    var e = CameraController_1.CameraController.FightCamera;
    if (e) {
      return e.GetComponent(5);
    }
  }
  static GetFilterDefaultValue(e, t) {
    if (e === 1 && t === 2) {
      return 1;
    } else {
      return MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
    }
  }
  static Zfu(e, t, r) {
    var i = new UE.TransformDouble();
    i.SetLocation(e);
    i.SetRotation(t);
    i.SetScale3D(r);
    var e = UiCameraManager_1.UiCameraManager.Get();
    var t = e.PushStructure(UiCameraPhotographerStructure_1.UiCameraPhotographerStructure);
    t.SetActorTransform(i);
    e.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent).SetCameraFocalDistance(PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE);
    return t;
  }
  static YDu(e) {
    if (e) {
      UE.KuroSequencePerformanceManager.ExecuteCommandInPerformance("r.Kuro.KuroEnableScreenFilter 0");
    } else {
      UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    }
  }
  static $Du(e) {
    if (e) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroEnableScreenFilter 1");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroEnableScreenFilter 0");
    }
  }
}
exports.FilterSettingController = FilterSettingController;
(_a = FilterSettingController).AWi = [];
FilterSettingController.EWi = undefined;
FilterSettingController.TWi = undefined;
FilterSettingController.IWi = undefined;
FilterSettingController.Jze = e => {
  if (UiManager_1.UiManager.IsViewOpen("FilterSettingView")) {
    _a.CloseFilterSettingView();
  }
};
FilterSettingController.WDu = () => {
  _a.YDu(true);
};
FilterSettingController.QDu = () => {
  _a.YDu(false);
};
FilterSettingController.EUe = () => {
  _a.ApplyFilterSetting();
  _a.$Du(true);
};
FilterSettingController.XDu = () => {
  _a.$Du(false);
};
FilterSettingController.UWi = (e, t) => {
  if (t && UiManager_1.UiManager.IsViewOpen("FilterSettingView")) {
    _a.CloseFilterSettingView();
  }
}; //# sourceMappingURL=FilterSettingController.js.map