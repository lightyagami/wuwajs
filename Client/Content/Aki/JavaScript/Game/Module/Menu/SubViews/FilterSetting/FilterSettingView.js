"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FilterSettingView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem"),
  CircleAttachView_1 = require("../../../AutoAttach/CircleAttachView"),
  HelpController_1 = require("../../../Help/HelpController"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MenuDefine_1 = require("../../MenuDefine"),
  FilterSettingViewModel_1 = require("./FilterSettingViewModel");
class FilterSettingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.VmCache = void 0, this.Meu = void 0, this.lqe = void 0, this.p_u = void 0, this.v_u = void 0, this.y_u = void 0, this.S_u = void 0, this.M_u = void 0, this.Eeu = () => {
      this.VmCache?.OnResetClick?.()
    }, this.Ieu = () => {
      this.VmCache?.OnConfirmClick?.()
    }, this.qK_ = () => {
      this.p_u?.AttachToNextItem(-1), this.VmCache?.OnLeftArrowClick?.()
    }, this.OK_ = () => {
      this.p_u?.AttachToNextItem(1), this.VmCache?.OnRightArrowClick?.()
    }, this.Nsu = () => {
      this.VmCache?.OnHideClick?.()
    }, this.lPe = () => {
      this.VmCache?.OnCloseClick?.()
    }, this.XOe = () => {
      HelpController_1.HelpController.OpenHelpById(MenuDefine_1.FILTER_SETTING_HELP_ID)
    }, this.bQi = t => {
      this.VmCache?.OnDragMoved?.(t)
    }, this.Pgt = () => {
      this.VmCache?.OnDragBegin?.()
    }, this.xgt = () => {
      this.VmCache?.OnDragEnded?.()
    }, this.vWi = (t, i) => {
      0 < i && Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 64, "OnInputUiMoveForward", ["axisName", t], ["value", i]), this.VmCache?.OnInputUiMoveForward?.(t, i)
    }, this.MWi = (t, i) => {
      0 < i && Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 64, "OnInputUiMoveRight", ["axisName", t], ["value", i]), this.VmCache?.OnInputUiMoveRight?.(t, i)
    }, this.q8i = (t, i) => {
      this.VmCache?.OnInputUiLookUp?.(t, i)
    }, this.G8i = (t, i) => {
      this.VmCache?.OnInputUiTurn?.(t, i)
    }, this.Uye = (t, i, e) => {
      t = new FilterSettingPixListItem(t);
      return t.ParentViewModel = this.VmCache, t.OffsetCurve = this.M_u?.[0], t.ScaleCurve = this.M_u?.[1], t.AlphaCurve = this.M_u?.[2], t
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
      [12, UE.UIButtonComponent],
      [13, UE.UIButtonComponent],
      [14, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [11, UE.UIItem],
      [15, UE.UIExtendToggle],
      [16, UE.UIItem],
      [17, UE.UIDraggableComponent],
      [18, UE.UIItem],
      [19, UE.UIItem]
    ], this.BtnBindInfo = [
      [9, this.Eeu],
      [10, this.Ieu],
      [13, this.qK_],
      [12, this.OK_],
      [15, this.Nsu]
    ]
  }
  OnBeforeCreate() {
    this.VmCache = this.OpenParam, this.VmCache.OnViewBeforeCreate?.()
  }
  OnStart() {}
  OnBeforeShow() {
    this.VmCache?.OnViewBeforeShow?.(this.Info.Name)
  }
  OnAfterHide() {
    this.VmCache?.OnViewAfterHide?.(this.Info.Name)
  }
  OnAfterDestroy() {}
  async OnBeforeStartAsync() {
    var t;
    void 0 !== this.VmCache && (this.VmCache.OnViewBeforeStart?.(), this.VmCache.UpLeftPos = this.GetItem(1)?.K2_GetComponentLocation(), this.VmCache.UpRightPos = this.GetItem(2)?.K2_GetComponentLocation(), this.VmCache.DownLeftPos = this.GetItem(3)?.K2_GetComponentLocation(), this.GetTexture(0)?.SetRaycastTarget(!0), this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(14)), this.lqe.SetHelpCallBack(this.XOe), this.lqe.SetCloseCallBack(this.lPe), this.lqe.SetTitleLocalText(MenuDefine_1.FILTER_SETTING_TITLE_TEXT_ID), await this.lqe.SetTitleIconByResourceId(MenuDefine_1.FILTER_SETTING_TITLE_ICON_RESOURCE_ID), this.lqe.SetCurrencyItemVisible(!1), this.Meu = new FilterSettingSliderItem, this.Meu.OpenParam = this.OpenParam, await this.Meu.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.M_u = await this.Ykl(), this.p_u = new CircleAttachView_1.CircleAttachView(this.GetItem(19).GetOwner()), this.p_u?.CreateItems(this.GetItem(11).GetOwner(), 0, this.Uye, 0), t = this.VmCache.TexturePathList, this.p_u?.ReloadView(t.length, t, this.VmCache.InitFilterIndex), this.GetItem(11)?.SetUIActive(!1))
  }
  OnBeforeDestroy() {
    this.p_u?.Clear(), this.p_u = void 0, this.VmCache?.OnViewDestroy?.(), this.VmCache = void 0, this.v_u?.CancelAsyncLoad(), this.y_u?.CancelAsyncLoad(), this.S_u?.CancelAsyncLoad(), this.M_u && (this.M_u.length = 0, this.M_u = void 0)
  }
  OnAddEventListener() {
    var t = this.GetDraggable(17);
    t?.OnPointerDragCallBack.Bind(this.bQi), t?.OnPointerBeginDragCallBack.Bind(this.Pgt), t?.OnPointerEndDragCallBack.Bind(this.xgt), t?.OnPointerDownCallBack.Bind(this.Pgt), t?.OnPointerUpCallBack.Bind(this.xgt), InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi), InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi), InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i), InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i)
  }
  OnRemoveEventListener() {
    var t = this.GetDraggable(17);
    t?.OnPointerDragCallBack.Unbind(), t?.OnPointerBeginDragCallBack.Unbind(), t?.OnPointerEndDragCallBack.Unbind(), t?.OnPointerDownCallBack.Unbind(), t?.OnPointerUpCallBack.Unbind(), t?.OnPointerScrollCallBack.Unbind(), InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi), InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi), InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i), InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i)
  }
  OnTick(t) {
    if (void 0 !== this.VmCache) {
      if (this.VmCache.IsHideByClick || this.VmCache.OnPadChangeStop?.(), this.VmCache.PadLock = this.p_u?.MovingState() ?? !1, !this.VmCache.CameraRotationLock && !this.VmCache.PadLock)
        if (LguiEventSystemManager_1.LguiEventSystemManager.GetNowHitComponentName() === MenuDefine_1.TARGET_HIT_ITEM_FOR_FILTER) {
          var i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
          if (i) {
            var e = i.GetWorldPointInPlane();
            switch (i.eventType) {
              case 5:
              case 6:
                this.VmCache.HorizontalReal = e.X, this.VmCache.VerticalReal = e.Z, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Menu", 64, "EPointerEventType.Drag"), this.VmCache.OnPadChanged?.();
                break;
              case 3:
                this.VmCache.HorizontalReal = e.X, this.VmCache.VerticalReal = e.Z, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Menu", 64, "EPointerEventType.Down"), this.VmCache.OnPadChanged?.()
            }
          }
        } this.VmCache.IsDirty && ((this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.HorizontalNormalized) || this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.VerticalNormalized)) && (this.GetTexture(7)?.SetUIWorldLocation(new UE.Vector(MathUtils_1.MathUtils.Lerp(this.VmCache.UpLeftPos?.X ?? 0, this.VmCache.UpRightPos?.X ?? 0, this.VmCache.HorizontalNormalized), 0, MathUtils_1.MathUtils.Lerp(this.VmCache.DownLeftPos?.Z ?? 0, this.VmCache.UpLeftPos?.Z ?? 0, this.VmCache.VerticalNormalized))), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(5), this.VmCache.CoordinateTextId, this.VmCache.HorizontalString, this.VmCache.VerticalString)), this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IntensityNormalized) && (this.Meu?.SetTitleText(this.VmCache.IntensityString), this.Meu?.SetSliderValue(this.VmCache.IntensityNormalized)), this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.FilterNameTextId) && LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(6), this.VmCache.FilterNameTextId), this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.FilterPadTexturePath) && this.TrySetTextureByPath(this.VmCache.FilterPadTexturePath, this.GetTexture(0)), this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsHideByPad) && (this.VmCache.IsHideByPad || AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_click_small"), this.GetItem(14)?.SetUIActive(!this.VmCache.IsHideByPad), this.GetItem(16)?.SetUIActive(!this.VmCache.IsHideByPad), this.GetExtendToggle(15)?.RootUIComp?.SetUIActive(!this.VmCache.IsHideByPad)), this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsHideByClick) && (this.GetItem(14)?.SetUIActive(!this.VmCache.IsHideByClick), this.GetItem(16)?.SetUIActive(!this.VmCache.IsHideByClick), this.GetItem(18)?.SetUIActive(!this.VmCache.IsHideByClick), this.GetExtendToggle(15)?.SetToggleStateForce(this.VmCache.IsHideByClick ? 1 : 0, !1)), this.VmCache.IsPropertyDirty(FilterSettingViewModel_1.FilterSettingViewModel.Flags.IsSliderActive) && this.GetItem(8)?.SetUIActive(this.VmCache.IsSliderActive), this.VmCache.CleanDirty())
    }
  }
  async Ykl() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Offset"),
      t = (this.v_u = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat), ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Scale")),
      t = (this.y_u = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat), ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_FilterSetting_Alpha"));
    return this.S_u = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat), Promise.all([this.v_u.Promise, this.y_u.Promise, this.S_u.Promise])
  }
}
exports.FilterSettingView = FilterSettingView;
class FilterSettingSliderItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Teu = t => {
      void 0 !== this.beu && (this.beu.IntensityNormalized = t, this.beu.OnSliderChanged?.())
    }
  }
  get beu() {
    if (void 0 !== this.OpenParam) return this.OpenParam
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISliderComponent],
      [2, UE.UISprite]
    ]
  }
  async OnBeforeStartAsync() {
    return this.GetSlider(1)?.OnValueChangeCb.Bind(this.Teu), Promise.resolve()
  }
  OnBeforeDestroy() {
    this.GetSlider(1)?.OnValueChangeCb.Unbind()
  }
  SetTitleText(t) {
    this.GetText(0)?.SetText(t)
  }
  SetSliderValue(t) {
    this.GetSlider(1)?.SetValue(t, !1)
  }
}
const INDEXQUARTER = .25,
  INDEXTHREEQUARTER = .75,
  MAXHIERARCHYINDEX = 2,
  MINHIERARCHYINDEX = 1;
class FilterSettingPixListItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments), this.ParentViewModel = void 0, this.OffsetCurve = void 0, this.ScaleCurve = void 0, this.AlphaCurve = void 0
  }
  OnSelect() {
    this.ParentViewModel?.OnIndexChanged?.(this.GetCurrentShowItemIndex())
  }
  OnUnSelect() {}
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    this.Qkl(t), this.Kkl(t), this.Xkl(t)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture]
    ]
  }
  OnRefreshItem(t) {
    this.TrySetTextureByPath(t, this.GetTexture(0))
  }
  Qkl(t) {
    this.ScaleCurve && (t = this.ScaleCurve.GetFloatValue(t), t = new UE.Vector(t, t, t), this.RootItem.SetUIItemScale(t))
  }
  Kkl(t) {
    this.AlphaCurve && (t = this.AlphaCurve.GetFloatValue(t), this.RootItem.SetUIItemAlpha(t))
  }
  Xkl(t) {
    let i = MAXHIERARCHYINDEX;
    (t <= INDEXQUARTER || t >= INDEXTHREEQUARTER) && (i = MINHIERARCHYINDEX), this.RootItem.GetHierarchyIndex() !== i && this.RootItem.SetHierarchyIndex(i)
  }
}
//# sourceMappingURL=FilterSettingView.js.map