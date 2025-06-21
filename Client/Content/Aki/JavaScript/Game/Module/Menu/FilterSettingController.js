"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FilterSettingController = void 0;
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  FilterSettingAll_1 = require("../../../Core/Define/ConfigQuery/FilterSettingAll"),
  FilterSettingById_1 = require("../../../Core/Define/ConfigQuery/FilterSettingById"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  PhotographDefine_1 = require("../Photograph/PhotographDefine"),
  SeamlessTravelController_1 = require("../SeamlessTravel/SeamlessTravelController"),
  UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  UiCameraPhotographerStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraPhotographerStructure"),
  MenuDefine_1 = require("./MenuDefine"),
  FilterSettingViewModel_1 = require("./SubViews/FilterSetting/FilterSettingViewModel");
class FilterSettingController extends UiControllerBase_1.UiControllerBase {
  static get olu() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("FilterSettingLeftStickDeadZone") ?? 0
  }
  static get nlu() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("FilterSettingLeftStickMoveFactor") ?? 1
  }
  static Clear() {
    return this.dWi(), super.Clear()
  }
  static OnLeaveLevel() {
    return this.dWi(), this.Fmu(!0), !0
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.Jze), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneLastStepInLoadScene, this.Nmu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneLastStepInExitScene, this.Vmu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.EUe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.Hmu)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.Jze), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneLastStepInLoadScene, this.Nmu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneLastStepInExitScene, this.Vmu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.EUe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.Hmu), this.m$e()
  }
  static async TryOpenExternalPreparedAsync() {
    return !!this.$ha() && this.Dsu()
  }
  static $ha() {
    var e, t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !(!t?.Valid || (ModelManager_1.ModelManager.PlotModel.IsInPlot ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在剧情中"), 1) : !(e = t.Entity.GetComponent(205)) || (e.HasTag(40422668) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在空中"), 1) : e.HasTag(855966206) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在水中"), 1) : e.HasTag(504239013) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在攀爬"), 1) : e.HasTag(1996802261) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在战斗中"), 1) : e.HasTag(-1371021686) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在技能中"), 1) : e.HasTag(525255941) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在驾驶载具"), 1) : UiManager_1.UiManager.IsViewOpen("FilterSettingView") ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:已经在滤镜界面"), 1) : ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在声骸编队"), 1) : !t.Entity.GetComponent(177)?.MainAnimInstance && (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:实体状态机找不到"), 1))))
  }
  static Bsu(e) {
    var t, r, i;
    this.EWi = this.yWi(), this.EWi && (this.IWi = this.GetFightCameraActor(), this.IWi) && (this.TWi = this.LWi(), this.DWi().SetIsDitherEffectEnable(!1), (t = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1), t = t?.Mesh.D_GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME), r = this.IWi.D_GetTransform(), i = this.slu(t, r.GetRotation(), r.GetScale3D()), this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE, i?.SetPlayerSourceLocation(t), i?.SetCameraInitializeTransform(r), i?.SetFov(PhotographDefine_1.DEFAULT_FOV), e.UiCameraPhotographerStructure = i, UiCameraManager_1.UiCameraManager.Get().Enter(.5), this.ksu(e))
  }
  static ksu(t) {
    for (const i of ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig()) {
      let e = -1;
      var r = i.Type;
      0 === r ? e = i.DefaultOptionIndex : 1 === r && (e = i.ValueRange[2]), this.Osu(t, i.ValueType, e)
    }
  }
  static Osu(e, t, r) {
    switch (e.PhotographOptionMap.set(t, r), t) {
      case 3:
        var i;
        1 === r ? (a = e.PhotographOptionMap.get(4), i = e.PhotographOptionMap.get(5), this.TWi.FocusSettings.ManualFocusDistance = a, this.TWi.CurrentAperture = i) : (this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_FOCAL_LENTGH, this.TWi.CurrentAperture = PhotographDefine_1.DEFAULT_APERTURE);
        break;
      case 4:
        1 === e.PhotographOptionMap.get(3) && (this.TWi.FocusSettings.ManualFocusDistance = r);
        break;
      case 5:
        1 === e.PhotographOptionMap.get(3) && (this.TWi.CurrentAperture = r);
        break;
      case 0:
        var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        1 === r ? this.wvl(e, a, !0) : this.wvl(e, a, !1)
    }
  }
  static wvl(e, t, r) {
    t?.Valid && t.Entity?.Valid && t.Entity.Active !== r && (r ? e.SetDisableEntity && t.Id === e.SetDisableEntity.Id ? (t.Entity.Enable(e.EntityDisableId, "FilterSetting.SetEntityEnable"), e.EntityDisableId = void 0, e.SetDisableEntity = void 0) : this.alu(e) : (e.SetDisableEntity && this.alu(e), e.SetDisableEntity = t, e.EntityDisableId = t.Entity.Disable("[FilterSetting.SetEntityEnable] bEnable为false")))
  }
  static alu(e) {
    e.SetDisableEntity && e.SetDisableEntity.Entity?.Enable(e.EntityDisableId, "FilterSetting.ResetEntityEnable"), e.EntityDisableId = void 0, e.SetDisableEntity = void 0
  }
  static async Dsu() {
    if (this.EWi = this.yWi(), !this.EWi) return !1;
    if (this.IWi = this.GetFightCameraActor(), !this.IWi) return !1;
    this.Ss1(), this.c$e(), await this.OMa();
    var e = this.qsu(),
      e = await UiManager_1.UiManager.OpenViewAsync("FilterSettingView", e);
    return await this.Gsu(), void 0 !== e
  }
  static qsu() {
    var e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
    const a = new FilterSettingViewModel_1.FilterSettingViewModel;
    return a.InitFilterIndex = ModelManager_1.ModelManager.MenuModel.GetFilterIndexByConfigId(e), this.feu(e, a), a.OnHideClick = () => {
      a.IsHideByClick = !a.IsHideByClick
    }, a.OnResetClick = () => {
      const i = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
      var e = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(i);
      e && e.forEach((e, t, r) => {
        r[t] = this.GetFilterDefaultValue(i, t)
      }), a.IntensityNormalized = this.GetFilterDefaultValue(i, 2), a.HorizontalNormalized = this.GetFilterDefaultValue(i, 0), a.VerticalNormalized = this.GetFilterDefaultValue(i, 1), this.Bau(a, i, a.HorizontalNormalized, a.VerticalNormalized, a.IntensityNormalized), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFilterFeatureResetTips"), a.IsFilterChanged = !0
    }, a.OnConfirmClick = () => {
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId, ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache), LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues, ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFilterFeatureUseTips"), a.IsApplyClicked = !0
    }, a.OnCloseClick = () => {
      var e;
      a.IsFilterChanged && !a.IsApplyClicked ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(324)).FunctionMap.set(2, () => {
        this.CloseFilterSettingView()
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)) : this.CloseFilterSettingView()
    }, a.OnPadChanged = () => {
      var e, t;
      !a.PadLock && (e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache, t = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(e)) && (t[0] = a.HorizontalNormalized, t[1] = a.VerticalNormalized, this.Bau(a, e, t[0], t[1], t[2]), a.IsHideByPad = !0, a.IsFilterChanged = !0)
    }, a.OnPadChangeStop = () => {
      Info_1.Info.IsInGamepad() || (a.IsHideByPad = !1)
    }, a.OnSliderChanged = () => {
      var e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache,
        t = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(e);
      t && (t[2] = a.IntensityNormalized, this.Bau(a, e, t[0], t[1], t[2]), a.IsFilterChanged = !0)
    }, a.OnViewBeforeCreate = () => {
      this.Bsu(a)
    }, a.OnViewBeforeStart = () => {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroScreenFilterFrame 5"), UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !1)
    }, a.OnViewBeforeShow = e => {
      UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag(e)
    }, a.OnViewAfterHide = e => {
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag(e)
    }, a.OnViewDestroy = () => {
      ModelManager_1.ModelManager.MenuModel.CleanFilterCache(), ModelManager_1.ModelManager.MenuModel.FilterSettingViewModel = void 0, UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !0), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroScreenFilterFrame 60"), this.ApplyFilterSetting()
    }, a.OnDragBegin = () => {
      a.CameraRotationLock = !0
    }, a.OnDragEnded = () => {
      a.LastMoveVector = void 0, a.CameraRotationLock = !1
    }, a.OnDragMoved = e => {
      var t, r;
      1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() || (e = e.pointerPosition, a.LastMoveVector && (t = (e.Y - a.LastMoveVector.Y) * a.ControlCameraRate, r = (a.LastMoveVector.X - e.X) * a.ControlCameraRate, a.UiCameraPhotographerStructure?.AddCameraArmPitchInput(-t), a.UiCameraPhotographerStructure?.AddCameraArmYawInput(-r)), a.LastMoveVector = e)
    }, a.OnInputUiMoveForward = (e, t) => {
      var r;
      !Info_1.Info.IsInGamepad() || MathUtils_1.MathUtils.InRangeArray(t, [-this.olu, this.olu]) || void 0 === a.VerticalReal || a.IsHideByClick || a.IsOtherViewOpen ? (a.IsLeftStickVerticalMoved = !1, a.IsHideByPad = a.IsLeftStickHorizontalMoved) : (a.VerticalReal += t * this.nlu, t = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache, (r = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t)) && (r[1] = a.VerticalNormalized, this.Bau(a, t, r[0], r[1], r[2]), a.IsFilterChanged = !0), a.IsHideByPad = !0, a.IsLeftStickVerticalMoved = !0)
    }, a.OnInputUiMoveRight = (e, t) => {
      var r;
      !Info_1.Info.IsInGamepad() || MathUtils_1.MathUtils.InRangeArray(t, [-this.olu, this.olu]) || void 0 === a.HorizontalReal || a.IsHideByClick || a.IsOtherViewOpen ? (a.IsLeftStickHorizontalMoved = !1, a.IsHideByPad = a.IsLeftStickVerticalMoved) : (a.HorizontalReal += t * this.nlu, t = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache, (r = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t)) && (r[0] = a.HorizontalNormalized, this.Bau(a, t, r[0], r[1], r[2]), a.IsFilterChanged = !0), a.IsHideByPad = !0, a.IsLeftStickHorizontalMoved = !0)
    }, a.OnInputUiLookUp = (e, t) => {
      !Info_1.Info.IsInGamepad() || a.IsOtherViewOpen || 0 !== t && a.UiCameraPhotographerStructure?.AddCameraArmPitchInput(-t)
    }, a.OnInputUiTurn = (e, t) => {
      !Info_1.Info.IsInGamepad() || a.IsOtherViewOpen || 0 !== t && a.UiCameraPhotographerStructure?.AddCameraArmYawInput(t)
    }, a.OnIndexChanged = e => {
      e = ModelManager_1.ModelManager.MenuModel.GetFilterConfigIdByIndex(e);
      this.feu(e, a)
    }, a.OnLeftArrowClick = () => {
      a.IsFilterChanged = !0
    }, a.OnRightArrowClick = () => {
      a.IsFilterChanged = !0
    }, a
  }
  static feu(e, t) {
    ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache = e;
    var r = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache;
    void 0 !== FilterSettingAll_1.configFilterSettingAll.GetConfigList() && ((r = r.get(e)) && (t.IntensityNormalized = r[2], t.HorizontalNormalized = r[0], t.VerticalNormalized = r[1], this.Bau(t, e, r[0], r[1], r[2])), r = FilterSettingById_1.configFilterSettingById.GetConfig(e), t.FilterPadTexturePath = r?.PadTexturePath, t.FilterNameTextId = r?.NameTextId, t.IsSliderActive = 1 !== e)
  }
  static ApplyFilterSetting() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID,
      t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
    t && (t = t.get(e)) && UE.KuroGISystem.SetKuroScreenFilterInterpolation(GlobalData_1.GlobalData.World, FilterSettingById_1.configFilterSettingById.GetConfig(e).LogicIndex, t[0], t[1], t[2])
  }
  static Bau(e, t, r, i, a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("GameSettings", 64, "设置全局滤镜值", ["filterId", t], ["horizontalNormalized", r], ["verticalNormalized", i], ["intensityNormalized", a]), UE.KuroGISystem.SetKuroScreenFilterInterpolation(GlobalData_1.GlobalData.World, FilterSettingById_1.configFilterSettingById.GetConfig(t).LogicIndex, r, i, a)
  }
  static Ss1() {
    Global_1.Global.BaseCharacter && ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(62)?.InterruptAutoMoving("打开拍照界面")
  }
  static async OMa() {
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(11, 3, .5)
  }
  static async Gsu() {
    await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(11, .5), LevelLoadingController_1.LevelLoadingController.CloseLoading(0)
  }
  static dWi() {
    this.x5_(), this.U5_()
  }
  static async CloseFilterSettingView() {
    UiManager_1.UiManager.IsViewOpen("FilterSettingView") && (this.x5_(), await this.OMa(), this.U5_(), ModelManager_1.ModelManager.PlotModel.IsInPlot ? UiManager_1.UiManager.NormalResetToView("BattleView") : UiManager_1.UiManager.GetViewByName("ReviveView") || await UiManager_1.UiManager.NormalResetToViewAsync("BattleView"), await this.Gsu())
  }
  static x5_() {
    this.IWi = void 0, this.EWi = void 0, this.TWi = void 0
  }
  static U5_() {
    var e = UiManager_1.UiManager.GetViewByName("FilterSettingView")?.VmCache;
    e && (this.hlu(e), this.alu(e), e.PhotographOptionMap.clear()), this.m$e();
    this.DWi().SetIsDitherEffectEnable(!0);
    e = Global_1.Global.BaseCharacter;
    void 0 === e || SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(e.CharacterActorComponent?.Entity) || e?.SetDitherEffect(0, 1)
  }
  static hlu(e) {
    UiCameraManager_1.UiCameraManager.Destroy(PhotographDefine_1.PHOTOGRAPH_CAMERA_BLEND_OUT), e.UiCameraPhotographerStructure = void 0
  }
  static c$e() {
    this.RWi(1996802261, this.UWi), this.RWi(40422668, this.UWi), this.RWi(855966206, this.UWi)
  }
  static m$e() {
    for (const e of this.AWi) e.EndTask();
    this.AWi.length = 0
  }
  static RWi(e, t) {
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    r?.Valid && r.Entity?.Valid && (r = r.Entity.GetComponent(205).ListenForTagAddOrRemove(e, t), this.AWi.push(r))
  }
  static yWi() {
    var e = CameraController_1.CameraController.WidgetCamera;
    if (e) {
      e = e.GetComponent(12);
      if (e.Valid) return e.CineCamera
    }
  }
  static LWi() {
    var e = this.EWi;
    if (e?.IsValid()) return e.GetCineCameraComponent()
  }
  static GetFightCameraActor() {
    var e = CameraController_1.CameraController.FightCamera;
    if (e) {
      e = e.GetComponent(4);
      if (e.Valid) return e.CameraActor
    }
  }
  static DWi() {
    var e = CameraController_1.CameraController.FightCamera;
    if (e) return e.GetComponent(5)
  }
  static GetFilterDefaultValue(e, t) {
    return 1 === e && 2 === t ? 1 : MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE
  }
  static slu(e, t, r) {
    var i = new UE.TransformDouble,
      e = (i.SetLocation(e), i.SetRotation(t), i.SetScale3D(r), UiCameraManager_1.UiCameraManager.Get()),
      t = e.PushStructure(UiCameraPhotographerStructure_1.UiCameraPhotographerStructure);
    return t.SetActorTransform(i), e.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent).SetCameraFocalDistance(PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE), t
  }
  static $mu(e) {
    e ? UE.KuroSequencePerformanceManager.ExecuteCommandInPerformance("r.Kuro.KuroEnableScreenFilter 0") : UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode()
  }
  static Fmu(e) {
    e ? UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroEnableScreenFilter 1") : UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroEnableScreenFilter 0")
  }
}
exports.FilterSettingController = FilterSettingController, (_a = FilterSettingController).AWi = [], FilterSettingController.EWi = void 0, FilterSettingController.TWi = void 0, FilterSettingController.IWi = void 0, FilterSettingController.Jze = e => {
  UiManager_1.UiManager.IsViewOpen("FilterSettingView") && _a.CloseFilterSettingView()
}, FilterSettingController.Nmu = () => {
  _a.$mu(!0)
}, FilterSettingController.Vmu = () => {
  _a.$mu(!1)
}, FilterSettingController.EUe = () => {
  _a.ApplyFilterSetting(), _a.Fmu(!0)
}, FilterSettingController.Hmu = () => {
  _a.Fmu(!1)
}, FilterSettingController.UWi = (e, t) => {
  t && UiManager_1.UiManager.IsViewOpen("FilterSettingView") && _a.CloseFilterSettingView()
};
//# sourceMappingURL=FilterSettingController.js.map