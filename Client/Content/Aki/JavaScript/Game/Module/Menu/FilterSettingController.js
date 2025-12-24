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
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../GameSettings/GameSettingsUtils");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const BattleUiControl_1 = require("../BattleUi/BattleUiControl");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const MenuDefine_1 = require("./MenuDefine");
const FilterCameraComponent_1 = require("./SubViews/FilterSetting/FilterCameraComponent");
const FilterSettingViewModel_1 = require("./SubViews/FilterSetting/FilterSettingViewModel");
class FilterSettingController extends UiControllerBase_1.UiControllerBase {
  static get Wgu() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("FilterSettingLeftStickDeadZone") ?? 0;
  }
  static get Qgu() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("FilterSettingLeftStickMoveFactor") ?? 1;
  }
  static Clear() {
    this.CameraComponent?.ClosePhotograph();
    return super.Clear();
  }
  static OnLeaveLevel() {
    this.CameraComponent?.ClosePhotograph();
    this.SwitchFilter(true);
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneLastStepInLoadScene, this.EBu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneLastStepInExitScene, this.IBu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LogOut, this.bBu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.THd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.bHd);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneLastStepInLoadScene, this.EBu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneLastStepInExitScene, this.IBu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LogOut, this.bBu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.THd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.bHd);
    if (this.CameraComponent) {
      this.CameraComponent?.RemoveEntityEvents();
    }
  }
  static async TryOpenExternalPreparedAsync() {
    this.yil = this.$cu();
    if (this.yil) {
      this.CameraComponent = new FilterCameraComponent_1.FilterCameraComponent(async () => FilterSettingController.Ncu(), "FilterSettingView");
    }
    return await this.CameraComponent.TryOpenPhotograph();
  }
  static async Ncu() {
    return (await UiManager_1.UiManager.OpenViewAsync("FilterSettingView", this.yil)) !== undefined;
  }
  static $cu() {
    var e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
    const r = new FilterSettingViewModel_1.FilterSettingViewModel();
    r.InitFilterIndex = ModelManager_1.ModelManager.MenuModel.GetFilterIndexByConfigId(e);
    this.Btu(e, r);
    r.OnHideClick = () => {
      r.IsHideByClick = !r.IsHideByClick;
    };
    r.OnResetClick = () => {
      const n = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
      var e = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(n);
      if (e) {
        e.forEach((e, t, i) => {
          i[t] = this.GetFilterDefaultValue(n, t);
        });
      }
      r.IntensityNormalized = this.GetFilterDefaultValue(n, 2);
      r.HorizontalNormalized = this.GetFilterDefaultValue(n, 0);
      r.VerticalNormalized = this.GetFilterDefaultValue(n, 1);
      r.IsSeniorParamRefresh = true;
      this.ANd(r, n, e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12]);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFilterFeatureResetTips");
      r.IsFilterChanged = true;
    };
    r.OnConfirmClick = () => {
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId, ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache);
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues, ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFilterFeatureUseTips");
      r.IsApplyClicked = true;
      ModelManager_1.ModelManager.MenuModel.IsEdited = true;
    };
    r.OnCloseClick = () => {
      var e;
      if (r.IsFilterChanged && !r.IsApplyClicked) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(324)).FunctionMap.set(2, () => {
          this.CloseViewAndReturnWorld();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.CloseViewAndReturnWorld();
      }
    };
    r.OnPadChanged = () => {
      var e;
      var t;
      if (!r.PadLock && (e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache, t = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(e))) {
        t[0] = r.HorizontalNormalized;
        t[1] = r.VerticalNormalized;
        this.pmu(r, e, t[0], t[1], t[2]);
        r.IsHideByPad = true;
        r.IsFilterChanged = true;
      }
    };
    r.OnPadChangeStop = () => {
      if (!Info_1.Info.IsInGamepad()) {
        r.IsHideByPad = false;
      }
    };
    r.OnSliderChanged = () => {
      var e = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
      var t = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(e);
      if (t) {
        t[2] = r.IntensityNormalized;
        this.pmu(r, e, t[0], t[1], t[2]);
        r.IsFilterChanged = true;
      }
    };
    r.OnSeniorSliderChanged = (e, t) => {
      var i = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
      var n = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(i);
      if (n) {
        n[e] = t;
        this.ANd(r, i, n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11], n[12]);
        r.IsFilterChanged = true;
      }
    };
    r.OnViewBeforeCreate = () => {};
    r.OnViewBeforeStart = () => {};
    r.OnViewBeforeShow = e => {};
    r.OnViewAfterHide = e => {};
    r.OnViewDestroy = () => {
      ModelManager_1.ModelManager.MenuModel.CleanFilterCache();
    };
    r.OnDragBegin = () => {
      this.CameraComponent?.OnDragBegin();
    };
    r.OnDragEnded = () => {
      this.CameraComponent?.OnDragEnded();
    };
    r.OnDragMoved = e => {
      this.CameraComponent?.OnDragMoved(e);
    };
    r.OnInputUiMoveForward = (e, t) => {
      var i;
      if (!Info_1.Info.IsInGamepad() || MathUtils_1.MathUtils.InRangeArray(t, [-this.Wgu, this.Wgu]) || r.VerticalReal === undefined || r.IsHideByClick || r.IsOtherViewOpen) {
        r.IsLeftStickVerticalMoved = false;
        r.IsHideByPad = r.IsLeftStickHorizontalMoved;
      } else {
        r.VerticalReal += t * this.Qgu;
        t = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
        if (i = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t)) {
          i[1] = r.VerticalNormalized;
          this.pmu(r, t, i[0], i[1], i[2]);
          r.IsFilterChanged = true;
        }
        r.IsHideByPad = true;
        r.IsLeftStickVerticalMoved = true;
      }
    };
    r.OnInputUiMoveRight = (e, t) => {
      var i;
      if (!Info_1.Info.IsInGamepad() || MathUtils_1.MathUtils.InRangeArray(t, [-this.Wgu, this.Wgu]) || r.HorizontalReal === undefined || r.IsHideByClick || r.IsOtherViewOpen) {
        r.IsLeftStickHorizontalMoved = false;
        r.IsHideByPad = r.IsLeftStickVerticalMoved;
      } else {
        r.HorizontalReal += t * this.Qgu;
        t = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
        if (i = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t)) {
          i[0] = r.HorizontalNormalized;
          this.pmu(r, t, i[0], i[1], i[2]);
          r.IsFilterChanged = true;
        }
        r.IsHideByPad = true;
        r.IsLeftStickHorizontalMoved = true;
      }
    };
    r.OnInputUiLookUp = (e, t) => {
      this.CameraComponent?.OnInputUiLookUp(e, t);
    };
    r.OnInputUiTurn = (e, t) => {
      this.CameraComponent?.OnInputUiTurn(e, t);
    };
    r.OnIndexChanged = e => {
      e = ModelManager_1.ModelManager.MenuModel.GetFilterConfigIdByIndex(e);
      this.Btu(e, r);
    };
    r.OnLeftArrowClick = () => {
      r.IsFilterChanged = true;
    };
    r.OnRightArrowClick = () => {
      r.IsFilterChanged = true;
    };
    return r;
  }
  static Btu(e, t) {
    ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache = e;
    var i = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache;
    if (FilterSettingAll_1.configFilterSettingAll.GetConfigList() !== undefined) {
      if (i = i.get(e)) {
        t.IntensityNormalized = i[2];
        t.HorizontalNormalized = i[0];
        t.VerticalNormalized = i[1];
        this.pmu(t, e, i[0], i[1], i[2]);
      }
      i = FilterSettingById_1.configFilterSettingById.GetConfig(e);
      t.FilterPadTexturePath = i?.PadTexturePath;
      t.FilterNameTextId = i?.NameTextId;
      t.IsSliderActive = e !== 1;
      t.IsSeniorParamRefresh = true;
    }
  }
  static ApplyFilterSetting() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID;
    var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
    if (t) {
      if (t = t.get(e)) {
        UE.KuroGISystem.SetKuroAdvancedModeScreenFilter(GlobalData_1.GlobalData.World, FilterSettingById_1.configFilterSettingById.GetConfig(e).LogicIndex, t[0], t[1], t[2], t[3] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[4] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[5] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[6] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[7] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[8] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[9] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[10] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[11] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, t[12] ?? MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE);
      }
    } else {
      this.SetDefaultFilterSetting();
    }
  }
  static SetDefaultFilterSetting() {
    UE.KuroGISystem.SetKuroAdvancedModeScreenFilter(GlobalData_1.GlobalData.World, FilterSettingById_1.configFilterSettingById.GetConfig(MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID).LogicIndex, MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SETTING_INTENSITY_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE, MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE);
  }
  static pmu(e, t, i, n, r) {
    var a = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t);
    if (a) {
      this.ANd(e, t, i, n, r, a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12]);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameSettings", 71, "未找到当前滤镜id相关的参数值", ["filterId", t]);
    }
  }
  static ANd(e, t, i, n, r, a, o, l, _, s, g, M, u, S, f) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameSettings", 71, "设置全局滤镜值", ["filterId", t], ["horizontalNormalized", i], ["verticalNormalized", n], ["intensityNormalized", r], ["sharpenIntensity", a], ["brightness", o], ["contrast", l], ["colorTemperature", _], ["saturation", s], ["bloom", g], ["gamma", M], ["shadowIntensity", u], ["noiseIntensity", S], ["halation", f]);
    }
    UE.KuroGISystem.SetKuroAdvancedModeScreenFilter(GlobalData_1.GlobalData.World, FilterSettingById_1.configFilterSettingById.GetConfig(t).LogicIndex, i, n, r, a, o, l, _, s, g, M, u, S, f);
  }
  static async CloseViewAndReturnWorld() {
    await this.OpenBlackScreen();
    var e = BattleUiControl_1.BattleUiControl.GetMainViewName();
    await UiManager_1.UiManager.NormalResetToViewAsync(e);
    await this.CloseBlackScreen();
  }
  static async OpenBlackScreen() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(11, 3, 0.5);
  }
  static async CloseBlackScreen() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(11, 0.5);
    ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
  }
  static GetFilterDefaultValue(e, t) {
    if (e === 1 && t === 2) {
      return 1;
    } else if (t <= 2) {
      return MenuDefine_1.DEFAULT_FILTER_SETTING_VALUE;
    } else {
      return MenuDefine_1.DEFAULT_FILTER_SENIOR_SETTING_VALUE;
    }
  }
  static RBu(e) {
    if (e) {
      UE.KuroSequencePerformanceManager.ExecuteCommandInPerformance("r.Kuro.KuroEnableScreenFilter 0");
      UE.KuroSequencePerformanceManager.ExecuteCommandInPerformance("r.BlueLightFilter.Disable 1");
      UE.KuroSequencePerformanceManager.ExecuteCommandInPerformance("r.Tonemapper.BrightnessAndTextureDisable 1");
    } else {
      UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    }
  }
  static IsFilterSettingChange() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId);
    if (e) {
      if (e !== MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID) {
        return true;
      }
      var t = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingValues);
      if (t) {
        var i = t.get(e);
        if (i) {
          for (const n of MenuDefine_1.filterSettingParams) {
            if (i[n] && i[n] !== this.GetFilterDefaultValue(e, n)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  static SwitchFilter(e) {
    if (e) {
      e = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.ImageDisplayMode);
      GameSettingsUtils_1.GameSettingsUtils.ApplyImageDisplayMode(e);
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroEnableScreenFilter 0");
    }
  }
}
exports.FilterSettingController = FilterSettingController;
(_a = FilterSettingController).CameraComponent = undefined;
FilterSettingController.yil = undefined;
FilterSettingController.Jze = e => {
  if (UiManager_1.UiManager.IsViewOpen("FilterSettingView")) {
    UiManager_1.UiManager.CloseView("FilterSettingView");
  }
};
FilterSettingController.THd = () => {
  if (ModelManager_1.ModelManager.PlotModel.IsInOverLevel("LevelC")) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroEnableScreenFilter 0");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Tonemapper.BrightnessAndTextureDisable 1");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.BlueLightFilter.Disable 1");
  }
};
FilterSettingController.bHd = () => {
  if (ModelManager_1.ModelManager.PlotModel.IsInOverLevel("LevelC")) {
    _a.SwitchFilter(true);
  }
};
FilterSettingController.EBu = () => {
  _a.RBu(true);
};
FilterSettingController.IBu = () => {
  _a.RBu(false);
};
FilterSettingController.bBu = () => {
  _a.SwitchFilter(false);
}; //# sourceMappingURL=FilterSettingController.js.map