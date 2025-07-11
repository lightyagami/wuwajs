"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSettingView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const CircleAttachView_1 = require("../../../AutoAttach/CircleAttachView");
const HelpController_1 = require("../../../Help/HelpController");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MenuDefine_1 = require("../../MenuDefine");
const FilterSettingViewModel_1 = require("./FilterSettingViewModel");
class FilterSettingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.VmCache = undefined;
    this.gtu = undefined;
    this.lqe = undefined;
    this.m0u = undefined;
    this.f0u = undefined;
    this.g0u = undefined;
    this.C0u = undefined;
    this.p0u = undefined;
    this.Ctu = () => {
      this.VmCache?.OnResetClick?.();
    };
    this.ptu = () => {
      this.VmCache?.OnConfirmClick?.();
    };
    this.qK_ = () => {
      this.m0u?.AttachToNextItem(-1);
      this.VmCache?.OnLeftArrowClick?.();
    };
    this.OK_ = () => {
      this.m0u?.AttachToNextItem(1);
      this.VmCache?.OnRightArrowClick?.();
    };
    this.ucu = () => {
      this.VmCache?.OnHideClick?.();
    };
    this.lPe = () => {
      this.VmCache?.OnCloseClick?.();
    };
    this.XOe = () => {
      HelpController_1.HelpController.OpenHelpById(MenuDefine_1.FILTER_SETTING_HELP_ID);
    };
    this.bQi = t => {
      this.VmCache?.OnDragMoved?.(t);
    };
    this.Pgt = () => {
      this.VmCache?.OnDragBegin?.();
    };
    this.xgt = () => {
      this.VmCache?.OnDragEnded?.();
    };
    this.vWi = (t, i) => {
      if (i > 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 64, "OnInputUiMoveForward", ["axisName", t], ["value", i]);
      }
      this.VmCache?.OnInputUiMoveForward?.(t, i);
    };
    this.MWi = (t, i) => {
      if (i > 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 64, "OnInputUiMoveRight", ["axisName", t], ["value", i]);
      }
      this.VmCache?.OnInputUiMoveRight?.(t, i);
    };
    this.q8i = (t, i) => {
      this.VmCache?.OnInputUiLookUp?.(t, i);
    };
    this.G8i = (t, i) => {
      this.VmCache?.OnInputUiTurn?.(t, i);
    };
    this.Uye = (t, i, e) => {
      t = new FilterSettingPixListItem(t);
      t.ParentViewModel = this.VmCache;
      t.OffsetCurve = this.p0u?.[0];
      t.ScaleCurve = this.p0u?.[1];
      t.AlphaCurve = this.p0u?.[2];
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [11, UE.UIItem], [15, UE.UIExtendToggle], [16, UE.UIItem], [17, UE.UIDraggableComponent], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[9, this.Ctu], [10, this.ptu], [13, this.qK_], [12, this.OK_], [15, this.ucu]];
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
  OnAfterDestroy() {}
  async OnBeforeStartAsync() {
    var t;
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
      this.gtu = new FilterSettingSliderItem();
      this.gtu.OpenParam = this.OpenParam;
      await this.gtu.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
      this.p0u = await this.Ykl();
      this.m0u = new CircleAttachView_1.CircleAttachView(this.GetItem(19).GetOwner());
      this.m0u?.CreateItems(this.GetItem(11).GetOwner(), 0, this.Uye, 0);
      t = this.VmCache.TexturePathList;
      this.m0u?.ReloadView(t.length, t, this.VmCache.InitFilterIndex);
      this.GetItem(11)?.SetUIActive(false);
    }
  }
  OnBeforeDestroy() {
    this.m0u?.Clear();
    this.m0u = undefined;
    this.VmCache?.OnViewDestroy?.();
    this.VmCache = undefined;
    this.f0u?.CancelAsyncLoad();
    this.g0u?.CancelAsyncLoad();
    this.C0u?.CancelAsyncLoad();
    if (this.p0u) {
      this.p0u.length = 0;
      this.p0u = undefined;
    }
  }
  OnAddEventListener() {
    var t = this.GetDraggable(17);
    t?.OnPointerDragCallBack.Bind(this.bQi);
    t?.OnPointerBeginDragCallBack.Bind(this.Pgt);
    t?.OnPointerEndDragCallBack.Bind(this.xgt);
    t?.OnPointerDownCallBack.Bind(this.Pgt);
    t?.OnPointerUpCallBack.Bind(this.xgt);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
  }
  OnRemoveEventListener() {
    var t = this.GetDraggable(17);
    t?.OnPointerDragCallBack.Unbind();
    t?.OnPointerBeginDragCallBack.Unbind();
    t?.OnPointerEndDragCallBack.Unbind();
    t?.OnPointerDownCallBack.Unbind();
    t?.OnPointerUpCallBack.Unbind();
    t?.OnPointerScrollCallBack.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
  }
  OnTick(t) {
    if (this.VmCache !== undefined) {
      if (!this.VmCache.IsHideByClick) {
        this.VmCache.OnPadChangeStop?.();
      }
      this.VmCache.PadLock = this.m0u?.MovingState() ?? false;
      if (!this.VmCache.CameraRotationLock && !this.VmCache.PadLock) {
        if (LguiEventSystemManager_1.LguiEventSystemManager.GetNowHitComponentName() === MenuDefine_1.TARGET_HIT_ITEM_FOR_FILTER) {
          var i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
          if (i) {
            var e = i.GetWorldPointInPlane();
            switch (i.eventType) {
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
          this.gtu?.SetTitleText(this.VmCache.IntensityString);
          this.gtu?.SetSliderValue(this.VmCache.IntensityNormalized);
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
          this.GetExtendToggle(15)?.RootUIComp?.SetUIActive(!this.VmCache.IsHideByPad);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsHideByClick)) {
          this.GetItem(14)?.SetUIActive(!this.VmCache.IsHideByClick);
          this.GetItem(16)?.SetUIActive(!this.VmCache.IsHideByClick);
          this.GetItem(18)?.SetUIActive(!this.VmCache.IsHideByClick);
          this.GetExtendToggle(15)?.SetToggleStateForce(this.VmCache.IsHideByClick ? 1 : 0, false);
        }
        if (this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsSliderActive)) {
          this.GetItem(8)?.SetUIActive(this.VmCache.IsSliderActive);
        }
        this.VmCache.CleanDirty();
      }
    }
  }
  async Ykl() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Offset");
    this.f0u = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Scale");
    this.g0u = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Alpha");
    this.C0u = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    return Promise.all([this.f0u.Promise, this.g0u.Promise, this.C0u.Promise]);
  }
}
exports.FilterSettingView = FilterSettingView;
class FilterSettingSliderItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.vtu = t => {
      if (this.ytu !== undefined) {
        this.ytu.IntensityNormalized = t;
        this.ytu.OnSliderChanged?.();
      }
    };
  }
  get ytu() {
    if (this.OpenParam !== undefined) {
      return this.OpenParam;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISliderComponent], [2, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.GetSlider(1)?.OnValueChangeCb.Bind(this.vtu);
    return Promise.resolve();
  }
  OnBeforeDestroy() {
    this.GetSlider(1)?.OnValueChangeCb.Unbind();
  }
  SetTitleText(t) {
    this.GetText(0)?.SetText(t);
  }
  SetSliderValue(t) {
    this.GetSlider(1)?.SetValue(t, false);
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
  }
  OnUnSelect() {}
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    this.Qkl(t);
    this.Kkl(t);
    this.Xkl(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnRefreshItem(t) {
    this.TrySetTextureByPath(t, this.GetTexture(0));
  }
  Qkl(t) {
    if (this.ScaleCurve) {
      t = this.ScaleCurve.GetFloatValue(t);
      t = new UE.Vector(t, t, t);
      this.RootItem.SetUIItemScale(t);
    }
  }
  Kkl(t) {
    if (this.AlphaCurve) {
      t = this.AlphaCurve.GetFloatValue(t);
      this.RootItem.SetUIItemAlpha(t);
    }
  }
  Xkl(t) {
    let i = MAXHIERARCHYINDEX;
    if (t <= INDEXQUARTER || t >= INDEXTHREEQUARTER) {
      i = MINHIERARCHYINDEX;
    }
    if (this.RootItem.GetHierarchyIndex() !== i) {
      this.RootItem.SetHierarchyIndex(i);
    }
  }
}
//# sourceMappingURL=FilterSettingView.js.map