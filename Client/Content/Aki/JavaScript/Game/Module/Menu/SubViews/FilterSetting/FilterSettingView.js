"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSettingView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const FilterSeniorSettingAll_1 = require("../../../../../Core/Define/ConfigQuery/FilterSeniorSettingAll");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const CircleAttachView_1 = require("../../../AutoAttach/CircleAttachView");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../../Help/HelpController");
const LogReportController_1 = require("../../../LogReport/LogReportController");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MenuDefine_1 = require("../../MenuDefine");
const FilterSeniorParamSliderItem_1 = require("./FilterSeniorParamSliderItem");
const FilterSettingViewModel_1 = require("./FilterSettingViewModel");
class FilterSettingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.VmCache = undefined;
    this.IsColorPalette = true;
    this.Vtu = undefined;
    this.lqe = undefined;
    this.cpu = undefined;
    this.sqd = undefined;
    this.dpu = undefined;
    this.mpu = undefined;
    this.fpu = undefined;
    this.gpu = undefined;
    this.aqd = () => {
      var i = new FilterSeniorParamSliderItem_1.FilterSeniorParamSliderItem();
      i.ParentViewModel = this.VmCache;
      return i;
    };
    this.jtu = () => {
      this.VmCache?.OnResetClick?.();
    };
    this.hqd = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(379);
      i.FunctionMap.set(2, () => {
        this.cpu?.AttachToIndex(0);
        this.VmCache?.OnIndexChanged?.(0);
        this.jtu();
        var i = new LogReportDefine_1.DefaultFilterLogEvent();
        LogReportController_1.LogReportController.LogReport(i);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.Htu = () => {
      this.VmCache?.OnConfirmClick?.();
      this.GetButton(10).SetSelfInteractive(false);
      this.cpu?.RefreshItems();
    };
    this.qK_ = () => {
      this.cpu?.AttachToNextItem(-1);
      this.VmCache?.OnLeftArrowClick?.();
    };
    this.OK_ = () => {
      this.cpu?.AttachToNextItem(1);
      this.VmCache?.OnRightArrowClick?.();
    };
    this.Kcu = () => {
      this.VmCache?.OnHideClick?.();
    };
    this.lPe = () => {
      this.VmCache?.OnCloseClick?.();
    };
    this.XOe = () => {
      HelpController_1.HelpController.OpenHelpById(MenuDefine_1.FILTER_SETTING_HELP_ID);
    };
    this.lqd = () => {
      this._qd(true);
    };
    this.uqd = () => {
      this._qd(false);
    };
    this.bQi = i => {
      this.VmCache?.OnDragMoved?.(i);
    };
    this.Pgt = () => {
      this.VmCache?.OnDragBegin?.();
    };
    this.xgt = () => {
      this.VmCache?.OnDragEnded?.();
    };
    this.vWi = (i, t) => {
      if (t > 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 64, "OnInputUiMoveForward", ["axisName", i], ["value", t]);
      }
      if (this.IsColorPalette) {
        this.VmCache?.OnInputUiMoveForward?.(i, t);
      }
    };
    this.MWi = (i, t) => {
      if (t > 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 64, "OnInputUiMoveRight", ["axisName", i], ["value", t]);
      }
      if (this.IsColorPalette) {
        this.VmCache?.OnInputUiMoveRight?.(i, t);
      }
    };
    this.q8i = (i, t) => {
      this.VmCache?.OnInputUiLookUp?.(i, t);
    };
    this.G8i = (i, t) => {
      this.VmCache?.OnInputUiTurn?.(i, t);
    };
    this.Uye = (i, t, e) => {
      i = new FilterSettingPixListItem(i);
      i.ParentViewModel = this.VmCache;
      i.OffsetCurve = this.gpu?.[0];
      i.ScaleCurve = this.gpu?.[1];
      i.AlphaCurve = this.gpu?.[2];
      return i;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [11, UE.UIItem], [15, UE.UIExtendToggle], [16, UE.UIItem], [17, UE.UIDraggableComponent], [18, UE.UIItem], [19, UE.UIItem], [21, UE.UIExtendToggle], [22, UE.UIExtendToggle], [23, UE.UIItem], [24, UE.UIVerticalLayout], [26, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.jtu], [10, this.Htu], [13, this.qK_], [12, this.OK_], [15, this.Kcu], [21, this.lqd], [22, this.uqd], [26, this.hqd]];
  }
  OnBeforeCreate() {
    this.VmCache = this.OpenParam;
    this.VmCache.OnViewBeforeCreate?.();
  }
  OnStart() {}
  OnBeforeShow() {
    this.VmCache?.OnViewBeforeShow?.(this.Info.Name);
  }
  OnAfterHide() {
    this.VmCache?.OnViewAfterHide?.(this.Info.Name);
  }
  OnAfterDestroy() {
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, true);
    ControllerHolder_1.ControllerHolder.FilterSettingController?.CameraComponent?.ClosePhotograph();
    ControllerHolder_1.ControllerHolder.FilterSettingController?.SwitchFilter(true);
    ControllerHolder_1.ControllerHolder.FilterSettingController?.ApplyFilterSetting();
  }
  async OnBeforeStartAsync() {
    var i;
    if (this.VmCache !== undefined) {
      this.VmCache.OnViewBeforeStart?.();
      this.VmCache.UpLeftPos = this.GetItem(1)?.K2_GetComponentLocation();
      this.VmCache.UpRightPos = this.GetItem(2)?.K2_GetComponentLocation();
      this.VmCache.DownLeftPos = this.GetItem(3)?.K2_GetComponentLocation();
      this.GetTexture(0)?.SetRaycastTarget(true);
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(14));
      this.lqe.SetHelpCallBack(this.XOe);
      this.lqe.SetCloseCallBack(this.lPe);
      this.lqe.SetTitleLocalText(MenuDefine_1.FILTER_SETTING_TITLE_TEXT_ID);
      await this.lqe.SetTitleIconByResourceId(MenuDefine_1.FILTER_SETTING_TITLE_ICON_RESOURCE_ID);
      this.lqe.SetCurrencyItemVisible(false);
      this.Vtu = new FilterSettingSliderItem();
      this.Vtu.OpenParam = this.OpenParam;
      await this.Vtu.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
      this.gpu = await this.Ykl();
      this.cpu = new CircleAttachView_1.CircleAttachView(this.GetItem(19).GetOwner());
      this.cpu?.CreateItems(this.GetItem(11).GetOwner(), 0, this.Uye, 0);
      i = this.VmCache.FilterList;
      this.cpu?.ReloadView(i.length, i, this.VmCache.InitFilterIndex);
      this.GetItem(11)?.SetUIActive(false);
      this.sqd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(24), this.aqd);
      i = [...FilterSeniorSettingAll_1.configFilterSeniorSettingAll.GetConfigList()].sort((i, t) => i.SortId - t.SortId);
      await this.sqd.RefreshByDataAsync(i, true);
    }
  }
  OnBeforeDestroy() {
    this.cpu?.Clear();
    this.cpu = undefined;
    this.sqd?.ClearChildren();
    this.sqd = undefined;
    this.VmCache?.OnViewDestroy?.();
    this.VmCache = undefined;
    this.dpu?.CancelAsyncLoad();
    this.mpu?.CancelAsyncLoad();
    this.fpu?.CancelAsyncLoad();
    if (this.gpu) {
      this.gpu.length = 0;
      this.gpu = undefined;
    }
  }
  OnAddEventListener() {
    var i = this.GetDraggable(17);
    i?.OnPointerDragCallBack.Bind(this.bQi);
    i?.OnPointerBeginDragCallBack.Bind(this.Pgt);
    i?.OnPointerEndDragCallBack.Bind(this.xgt);
    i?.OnPointerDownCallBack.Bind(this.Pgt);
    i?.OnPointerUpCallBack.Bind(this.xgt);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
  }
  OnRemoveEventListener() {
    var i = this.GetDraggable(17);
    i?.OnPointerDragCallBack.Unbind();
    i?.OnPointerBeginDragCallBack.Unbind();
    i?.OnPointerEndDragCallBack.Unbind();
    i?.OnPointerDownCallBack.Unbind();
    i?.OnPointerUpCallBack.Unbind();
    i?.OnPointerScrollCallBack.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
  }
  OnTick(i) {
    if (this.VmCache !== undefined) {
      if (!this.VmCache.IsHideByClick) {
        this.VmCache.OnPadChangeStop?.();
      }
      this.VmCache.PadLock = this.cpu?.MovingState() ?? false;
      if (!this.VmCache.CameraRotationLock && !this.VmCache.PadLock) {
        if (LguiEventSystemManager_1.LguiEventSystemManager.GetNowHitComponentName() === MenuDefine_1.TARGET_HIT_ITEM_FOR_FILTER) {
          var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
          if (t) {
            var e = t.GetWorldPointInPlane();
            switch (t.eventType) {
              case 5:
              case 6:
                this.VmCache.HorizontalReal = e.X;
                this.VmCache.VerticalReal = e.Z;
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Menu", 64, "EPointerEventType.Drag");
                }
                this.VmCache.OnPadChanged?.();
                break;
              case 3:
                this.VmCache.HorizontalReal = e.X;
                this.VmCache.VerticalReal = e.Z;
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Menu", 64, "EPointerEventType.Down");
                }
                this.VmCache.OnPadChanged?.();
            }
          }
        }
      }
      if (this.VmCache.IsDirty) {
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.HorizontalNormalized) || this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.VerticalNormalized)) {
          this.GetTexture(7)?.SetUIWorldLocation(new UE.Vector(MathUtils_1.MathUtils.Lerp(this.VmCache.UpLeftPos?.X ?? 0, this.VmCache.UpRightPos?.X ?? 0, this.VmCache.HorizontalNormalized), 0, MathUtils_1.MathUtils.Lerp(this.VmCache.DownLeftPos?.Z ?? 0, this.VmCache.UpLeftPos?.Z ?? 0, this.VmCache.VerticalNormalized)));
          LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(5), this.VmCache.CoordinateTextId, this.VmCache.HorizontalString, this.VmCache.VerticalString);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IntensityNormalized)) {
          this.Vtu?.SetTitleText(this.VmCache.IntensityString);
          this.Vtu?.SetSliderValue(this.VmCache.IntensityNormalized);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.FilterNameTextId)) {
          LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(6), this.VmCache.FilterNameTextId);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.FilterPadTexturePath)) {
          this.TrySetTextureByPath(this.VmCache.FilterPadTexturePath, this.GetTexture(0));
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsHideByPad)) {
          if (!this.VmCache.IsHideByPad) {
            AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_click_small");
          }
          this.GetItem(14)?.SetUIActive(!this.VmCache.IsHideByPad);
          this.GetItem(16)?.SetUIActive(!this.VmCache.IsHideByPad);
          this.GetButton(26)?.RootUIComp.SetUIActive(!this.VmCache.IsHideByPad);
          this.GetExtendToggle(15)?.RootUIComp?.SetUIActive(!this.VmCache.IsHideByPad);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsHideByClick)) {
          if (FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsHideByClick) {
            this.GetItem(18)?.SetUIActive(false);
            this.GetItem(23)?.SetUIActive(false);
          } else {
            this._qd(this.IsColorPalette);
          }
          this.GetItem(14)?.SetUIActive(!this.VmCache.IsHideByClick);
          this.GetItem(16)?.SetUIActive(!this.VmCache.IsHideByClick);
          this.GetButton(26)?.RootUIComp.SetUIActive(!this.VmCache.IsHideByClick);
          this.GetExtendToggle(15)?.SetToggleStateForce(this.VmCache.IsHideByClick ? 1 : 0, false);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsSliderActive)) {
          this.GetItem(8)?.SetUIActive(this.VmCache.IsSliderActive);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsSeniorParamRefresh)) {
          this.sqd?.RefreshWithoutDataSync();
        }
        this.VmCache.CleanDirty();
      }
      this.GetButton(10).SetSelfInteractive(this.VmCache.IsFilterChanged && !this.VmCache.IsApplyClicked);
    }
  }
  async Ykl() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Offset");
    this.dpu = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Scale");
    this.mpu = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Alpha");
    this.fpu = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat);
    return Promise.all([this.dpu.Promise, this.mpu.Promise, this.fpu.Promise]);
  }
  OnDestroy() {}
  _qd(i) {
    this.IsColorPalette = i;
    this.GetItem(18)?.SetUIActive(i);
    this.GetItem(23)?.SetUIActive(!i);
    this.GetExtendToggle(21)?.SetToggleStateForce(i ? 1 : 0);
    this.GetExtendToggle(22)?.SetToggleStateForce(i ? 0 : 1);
  }
}
exports.FilterSettingView = FilterSettingView;
class FilterSettingSliderItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$tu = i => {
      if (this.Wtu !== undefined) {
        this.Wtu.IntensityNormalized = i;
        this.Wtu.OnSliderChanged?.();
      }
    };
  }
  get Wtu() {
    if (this.OpenParam !== undefined) {
      return this.OpenParam;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISliderComponent], [2, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.GetSlider(1)?.OnValueChangeCb.Bind(this.$tu);
    return Promise.resolve();
  }
  OnBeforeDestroy() {
    this.GetSlider(1)?.OnValueChangeCb.Unbind();
  }
  SetTitleText(i) {
    this.GetText(0)?.SetText(i);
  }
  SetSliderValue(i) {
    this.GetSlider(1)?.SetValue(i, false);
  }
}
const INDEXQUARTER = 0.25;
const INDEXTHREEQUARTER = 0.75;
const MAXHIERARCHYINDEX = 2;
const MINHIERARCHYINDEX = 1;
class FilterSettingPixListItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.ParentViewModel = undefined;
    this.OffsetCurve = undefined;
    this.ScaleCurve = undefined;
    this.AlphaCurve = undefined;
  }
  OnSelect() {
    this.ParentViewModel?.OnIndexChanged?.(this.GetCurrentShowItemIndex());
    this.GetExtendToggle(1)?.RootUIComp.SetUIActive(true);
  }
  OnUnSelect() {
    this.GetExtendToggle(1)?.RootUIComp.SetUIActive(false);
  }
  OnMoveItem() {
    var i = this.GetCurrentMovePercentage();
    this.Qkl(i);
    this.Kkl(i);
    this.Xkl(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIExtendToggle]];
  }
  OnRefreshItem(i) {
    this.TrySetTextureByPath(i.SpritePath, this.GetTexture(0));
    i = (LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.FilterSettingId) ?? MenuDefine_1.FILTER_SETTING_DEFAULT_FILTER_ID) === i.Id ? 1 : 0;
    this.GetExtendToggle(1)?.SetToggleStateForce(i);
  }
  Qkl(i) {
    if (this.ScaleCurve) {
      i = this.ScaleCurve.GetFloatValue(i);
      i = new UE.Vector(i, i, i);
      this.RootItem.SetUIItemScale(i);
    }
  }
  Kkl(i) {
    if (this.AlphaCurve) {
      i = this.AlphaCurve.GetFloatValue(i);
      this.RootItem.SetUIItemAlpha(i);
    }
  }
  Xkl(i) {
    let t = MAXHIERARCHYINDEX;
    if (i <= INDEXQUARTER || i >= INDEXTHREEQUARTER) {
      t = MINHIERARCHYINDEX;
    }
    if (this.RootItem.GetHierarchyIndex() !== t) {
      this.RootItem.SetHierarchyIndex(t);
    }
  }
}
//# sourceMappingURL=FilterSettingView.js.map