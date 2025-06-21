"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GuideFocusItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiNavigationGlobalData_1 = require("../../UiNavigation/New/UiNavigationGlobalData"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GuideFocusItemText_1 = require("./GuideFocusItemText"),
  CANVAS_CLIP_FEATHER = 10;
class GuideFocusItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i) {
    super(), this.Pzt = void 0, this.Owner = void 0, this.xzt = void 0, this.wzt = void 0, this.tYe = void 0, this.RectItem = void 0, this.Config = void 0, this.Bzt = !1, this.bzt = !1, this.qzt = !1, this.Gzt = void 0, this.Nzt = void 0, this.Ozt = void 0, this.Fr = () => {
      GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonClick enter");
      var e = this.Nzt;
      if (this.kzt(), e?.IsInteractable() && this.xzt.bIsUIActive) {
        if (e.IsA(UE.UIExtendButtonComponent.StaticClass())) {
          var t = e;
          if (!t.OnClickCallBack.IsBound() && 0 < t.HelpGroupId) return GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonClick execute parent SetDelegateForHelpClick UIExtendButtonComponent"), void ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t.HelpGroupId)
        }
        e.IsA(UE.UIButtonComponent.StaticClass()) ? (t = e).OnClickCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent OnClickCallBack UIButtonComponent"), t.OnClickCallBack.Execute()) : e.IsA(UE.UISelectableButtonComponent.StaticClass()) ? (t = e).OnClickCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent OnClickCallBack UISelectableButtonComponent"), t.OnClickCallBack.Execute()) : e.IsA(UE.UIToggleComponent.StaticClass()) ? (e.SetState(!e.IsOn, !0), GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent SetState UIToggleComponent")) : e.IsA(UE.UIExtendToggle.StaticClass()) ? (t = e, GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent SetToggleState ETT_Checked UIExtendToggle"), this.Config.EnableAllToggleState ? 0 === t.GetToggleState() ? t.SetToggleState(1, !0) : 1 === t.GetToggleState() && t.SetToggleState(0, !0) : 0 === t.GetToggleState() && t.SetToggleState(1, !0)) : e.IsA(UE.UISliderComponent.StaticClass()) && (t = e).OnValueChangeCb.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent OnValueChangeCb UISliderComponent"), t.OnValueChangeCb.Execute(t.Value))
      }
    }, this.Fzt = () => {
      var e, t;
      this.Bzt || (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack enter"), (e = this.Nzt)?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack execute self"), this.qzt = !0, e.IsA(UE.UIButtonComponent.StaticClass()) ? (t = e).OnPointDownCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack execute parent UIButtonComponent"), t.OnPointDownCallBack.Execute()) : e.IsA(UE.UIExtendToggle.StaticClass()) && (t = e).OnPointDownCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack execute parent UIExtendToggle"), t.OnPointDownCallBack.Execute(1))))
    }, this.Vzt = () => {
      GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack enter");
      var e, t = this.Nzt;
      t?.IsValid() && (this.qzt = !1, GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute self TryFinishByClick"), t.IsA(UE.UIButtonComponent.StaticClass()) ? (e = t).OnPointUpCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute parent UIButtonComponent"), this.kzt(), e.OnPointUpCallBack.Execute()) : t.IsA(UE.UIExtendToggle.StaticClass()) && ((e = t).OnPointUpCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute parent UIExtendToggle"), this.kzt(), e.OnPointUpCallBack.Execute(1)), e.OnPointUpCallBackWithEventData.IsBound()) && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute parent UIExtendToggle"), this.kzt(), e.OnPointUpCallBackWithEventData.Execute(1, void 0)))
    }, this.j71 = () => {
      GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonHover enter");
      var e, t = this.Nzt;
      t?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonHover execute self"), t.IsA(UE.UIButtonComponent.StaticClass()) ? (e = t).OnPointEnterCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonHover execute parent UIButtonComponent"), e.OnPointEnterCallBack.Execute()) : t.IsA(UE.UIExtendToggle.StaticClass()) && (e = t).OnHover && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonHover execute parent UIExtendToggle"), e.OnHover.Broadcast()))
    }, this.H71 = () => {
      GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonUnHover enter");
      var e, t = this.Nzt;
      t?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonUnHover execute self"), t.IsA(UE.UIButtonComponent.StaticClass()) ? (e = t).OnPointExitCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonUnHover execute parent UIButtonComponent"), e.OnPointExitCallBack.Execute()) : t.IsA(UE.UIExtendToggle.StaticClass()) && (e = t).OnUnHover && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonUnHover execute parent UIExtendToggle"), e.OnUnHover.Broadcast()))
    }, this.Hzt = e => {
      var t;
      this.Bzt || (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDownCallBack enter"), (t = this.Gzt)?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDownCallBack execute self"), t.OnPointerDownCallBack.IsBound()) && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDownCallBack execute parent"), t.OnPointerDownCallBack.Execute(e)))
    }, this.jzt = e => {
      var t;
      this.Bzt || (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerBeginDragCallBack enter"), (t = this.Gzt)?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerBeginDragCallBack execute self"), this.bzt = !0, t.OnPointerBeginDragCallBack.IsBound()) && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerBeginDragCallBack execute parent"), t.OnPointerBeginDragCallBack.Execute(e)))
    }, this.Wzt = e => {
      var t;
      this.Bzt || (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDragCallBack enter"), (t = this.Gzt)?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDragCallBack execute self"), this.Ozt = e, t.OnPointerDragCallBack.IsBound()) && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDragCallBack execute parent"), t.OnPointerDragCallBack.Execute(e)))
    }, this.Kzt = e => {
      GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerEndDragCallBack enter");
      var t = this.Gzt;
      t?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerEndDragCallBack execute self"), this.bzt = !1, t.OnPointerEndDragCallBack.IsBound()) && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerEndDragCallBack execute parent"), t.OnPointerEndDragCallBack.Execute(e))
    }, this.Qzt = e => {
      GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack enter");
      var t = this.Gzt;
      t?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack execute self"), t.OnPointerUpCallBack.IsBound()) && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack execute parent"), t.OnPointerUpCallBack.Execute(e), GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack execute TryFinishByClick"), this.kzt())
    }, this.OnTouch = (e, t) => {
      var e = Number(e),
        i = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e)?.GetPointerEventData()?.pressComponent;
      i && i.GetOwner() === this.GetButton(0).GetOwner() && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GuideTouchIdInject, e, this.xzt.GetOwner())
    }, this.Owner = i, this.Config = this.Owner.GetGuideStepInfo().ViewData.ViewConf, this.xzt = e, this.wzt = t
  }
  Init(e) {
    e && this.CreateThenShowByActorAsync(e.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [3, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.Fr]
    ]
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(3);
    this.Pzt = new GuideFocusItemText_1.FocusItemText(this), await this.Pzt.OnlyCreateByActorAsync(e.GetOwner()), this.AddChild(this.Pzt)
  }
  OnStart() {
    var e = LguiUtil_1.LguiUtil.GetChildActorByHierarchyIndex(this.GetOriginalActor()).GetComponentByClass(UE.LGUICanvas.StaticClass());
    this.Config.OnlyFrame ? this.GetItem(3).SetUIActive(!1) : (this.GetItem(3).SetUIActive(!0), this.Pzt.ShowText()), this.Config.OnlyText ? (this.GetItem(2).SetUIActive(!1), e.clipFeatherNew.Bottom = 0, e.clipFeatherNew.Top = 0, e.clipFeatherNew.Left = 0, e.clipFeatherNew.Right = 0) : (this.GetItem(2).SetUIActive(!0), e.clipFeatherNew.Bottom = CANVAS_CLIP_FEATHER, e.clipFeatherNew.Top = CANVAS_CLIP_FEATHER, e.clipFeatherNew.Left = CANVAS_CLIP_FEATHER, e.clipFeatherNew.Right = CANVAS_CLIP_FEATHER), this.tYe = this.GetItem(1), this.RectItem = this.GetItem(2), this.GetItem(1).SetUIActive(this.Config.UseMask), this.Nzt = this.xzt.GetOwner().GetComponentByClass(UE.UISelectableComponent.StaticClass());
    const t = this.GetButton(0),
      i = (t.OnPointDownCallBack.Bind(this.Fzt), t.OnPointUpCallBack.Bind(this.Vzt), this.Config.EnableHover && (t.OnPointEnterCallBack.Bind(this.j71), t.OnPointExitCallBack.Bind(this.H71)), this.GetItem(3));
    i.SetUIActive(!1), this.Config.ClickAnywhere && 0 < (e = this.Config.ClickAnywhereShowTime) && (t.RootUIComp.SetRaycastTarget(!1), TimerSystem_1.TimerSystem.Delay(() => {
      i.SetUIActive(!0), t.RootUIComp.SetRaycastTarget(!0)
    }, e)), this.Gzt = this.xzt.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    e = t.RootUIComp.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    e.OnPointerDownCallBack.Bind(e => {
      this.Hzt(e)
    }), e.OnPointerBeginDragCallBack.Bind(e => {
      this.jzt(e)
    }), e.OnPointerDragCallBack.Bind(e => {
      this.Wzt(e)
    }), e.OnPointerEndDragCallBack.Bind(e => {
      this.Kzt(e)
    }), e.OnPointerUpCallBack.Bind(e => {
      this.Qzt(e)
    }), InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.OnTouch)
  }
  OnBeforeShow() {
    this.Owner?.Config?.UseMask ? (ControllerHolder_1.ControllerHolder.GuideController.CheckHasNewTagInHookNameForShow(this.Owner.Config) ? UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(this.wzt) : UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(this.xzt), UiNavigationGlobalData_1.UiNavigationGlobalData.AddBlockListenerFocusTag("GuideFocus")) : this.Nzt?.FocusListenerDelegate.Bind(() => {
      this.kzt()
    })
  }
  OnAfterHide() {
    this.Owner?.Config?.UseMask ? (UiNavigationGlobalData_1.UiNavigationGlobalData.DeleteBlockListenerFocusTag("GuideFocus"), UiNavigationNewController_1.UiNavigationNewController.ResetNavigationFocusForGuide()) : this.Nzt?.FocusListenerDelegate.Unbind()
  }
  OnAfterShow() {
    this.Owner.ReadyToShow = !0
  }
  kzt() {
    !this.Config.UseClick || this.Bzt || (this.Bzt = !0, GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "TryFinishByClick done"), this.Owner.DoCloseByFinished(), TimerSystem_1.TimerSystem.Next(() => {
      Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "DoCloseByFinished")
    }))
  }
  OnBaseViewCloseWhenFinish() {
    this.Pzt.OnBaseViewCloseWhenFinish()
  }
  OnBeforeDestroy() {
    this.Bzt = !0, this.bzt && (this.Kzt(this.Ozt), this.Qzt(this.Ozt), this.bzt = !1, this.Ozt = void 0), this.qzt && (this.Vzt(), this.qzt = !1), InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.OnTouch)
  }
  OnTick(e) {
    this.IsShowOrShowing && this.RootItem?.IsValid() && this.xzt?.IsValid() && (this.ApplyButtonFollow(), this.ApplyBgFollow(), this.Pzt?.OnTick(e))
  }
  OnDurationChange(e) {
    this.GetActive() && this.Pzt?.OnDurationChange(e)
  }
  ApplyButtonFollow() {
    var e = this.wzt,
      t = e.D_K2_GetComponentScale(),
      t = (this.RootItem.D_K2_SetWorldLocation(e.D_K2_GetComponentLocation(), !1, void 0, !1), this.RootItem.SetPivot(e.GetPivot()), this.RootItem.SetHeight(e.Height * t.Y), this.RootItem.SetWidth(e.Width * t.X), this.xzt),
      i = this.GetButton(0).RootUIComp;
    this.Config.ClickAnywhere ? (i.D_K2_SetWorldLocation(UiLayer_1.UiLayer.UiRootItem.D_K2_GetComponentLocation(), !1, void 0, !1), i.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot()), i.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height), i.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width)) : this.Config.ExpandClickArea ? (i.SetPivot(e.GetPivot()), i.SetHeight(e.Height), i.SetWidth(e.Width), i.D_SetRelativeScale3D(e.D_K2_GetComponentScale()), i.D_K2_SetWorldLocation(e.D_K2_GetComponentLocation(), !1, void 0, !1)) : (i.SetPivot(t.GetPivot()), i.SetHeight(t.Height), i.SetWidth(t.Width), i.D_SetRelativeScale3D(t.D_K2_GetComponentScale()), i.D_K2_SetWorldLocation(t.D_K2_GetComponentLocation(), !1, void 0, !1))
  }
  ApplyBgFollow() {
    var e;
    this.Config.UseMask && ((e = this.tYe).D_K2_SetWorldLocation(UiLayer_1.UiLayer.UiRootItem.D_K2_GetComponentLocation(), !1, void 0, !1), e.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot()), e.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height), e.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width))
  }
}(exports.GuideFocusItem = GuideFocusItem).IsOpenLog = !1;
//# sourceMappingURL=GuideFocusItem.js.map