"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideFocusItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiNavigationGlobalData_1 = require("../../UiNavigation/New/UiNavigationGlobalData");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GuideFocusItemText_1 = require("./GuideFocusItemText");
const CANVAS_CLIP_FEATHER = 10;
class GuideFocusItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i) {
    super();
    this.Pzt = undefined;
    this.Owner = undefined;
    this.xzt = undefined;
    this.wzt = undefined;
    this.tYe = undefined;
    this.RectItem = undefined;
    this.Config = undefined;
    this.Bzt = false;
    this.bzt = false;
    this.qzt = false;
    this.Gzt = undefined;
    this.Nzt = undefined;
    this.Ozt = undefined;
    this.Iwm = new UE.Vector2D(0, 0);
    this.Twm = new UE.Vector(0, 0, 0);
    this.l9g = false;
    this.Fr = () => {
      if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "OnButtonClick enter");
      }
      var e = this.Nzt;
      this.kzt();
      if (this.l9g) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 95, "引导框连点，不重复执行点击回调");
        }
      } else {
        this.l9g = true;
        if (e?.IsInteractable() && this.xzt.bIsUIActive) {
          if (e.IsA(UE.UIExtendButtonComponent.StaticClass())) {
            var t = e;
            if (!t.OnClickCallBack.IsBound() && t.HelpGroupId > 0) {
              if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Guide", 74, "OnButtonClick execute parent SetDelegateForHelpClick UIExtendButtonComponent");
              }
              ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t.HelpGroupId);
              return;
            }
          }
          if (e.IsA(UE.UIButtonComponent.StaticClass())) {
            if ((t = e).OnClickCallBack.IsBound()) {
              if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent OnClickCallBack UIButtonComponent");
              }
              t.OnClickCallBack.Execute();
            }
          } else if (e.IsA(UE.UISelectableButtonComponent.StaticClass())) {
            if ((t = e).OnClickCallBack.IsBound()) {
              if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent OnClickCallBack UISelectableButtonComponent");
              }
              t.OnClickCallBack.Execute();
            }
          } else if (e.IsA(UE.UIToggleComponent.StaticClass())) {
            e.SetState(!e.IsOn, true);
            if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent SetState UIToggleComponent");
            }
          } else if (e.IsA(UE.UIExtendToggle.StaticClass())) {
            t = e;
            if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent SetToggleState ETT_Checked UIExtendToggle");
            }
            if (this.Config.EnableAllToggleState) {
              if (t.GetToggleState() === 0) {
                t.SetToggleState(1, true);
              } else if (t.GetToggleState() === 1) {
                t.SetToggleState(0, true);
              }
            } else if (t.GetToggleState() === 0) {
              t.SetToggleState(1, true);
            }
            if (t.GetToggleState() === 2 && t.OnUndeterminedClicked && GuideFocusItem.IsOpenLog) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Guide", 95, "OnButtonClick execute parent OnUndeterminedClicked UIExtendToggle");
              }
              t.OnUndeterminedClicked.Broadcast();
            }
          } else if (e.IsA(UE.UISliderComponent.StaticClass()) && (t = e).OnValueChangeCb.IsBound()) {
            if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 16, "OnButtonClick execute parent OnValueChangeCb UISliderComponent");
            }
            t.OnValueChangeCb.Execute(t.Value);
          }
        }
      }
    };
    this.Fzt = () => {
      var e;
      var t;
      if (!this.Bzt) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack enter");
        }
        if ((e = this.Nzt)?.IsValid()) {
          if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack execute self");
          }
          this.qzt = true;
          if (e.IsA(UE.UIButtonComponent.StaticClass())) {
            if ((t = e).OnPointDownCallBack.IsBound()) {
              if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack execute parent UIButtonComponent");
              }
              t.OnPointDownCallBack.Execute();
            }
          } else if (e.IsA(UE.UIExtendToggle.StaticClass()) && (t = e).OnPointDownCallBack.IsBound()) {
            if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 16, "OnButtonPointerDownCallBack execute parent UIExtendToggle");
            }
            t.OnPointDownCallBack.Execute(1);
          }
        }
      }
    };
    this.Vzt = () => {
      if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack enter");
      }
      var e;
      var t = this.Nzt;
      if (t?.IsValid()) {
        this.qzt = false;
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute self TryFinishByClick");
        }
        if (t.IsA(UE.UIButtonComponent.StaticClass())) {
          if ((e = t).OnPointUpCallBack.IsBound()) {
            if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute parent UIButtonComponent");
            }
            this.kzt();
            e.OnPointUpCallBack.Execute();
          }
        } else if (t.IsA(UE.UIExtendToggle.StaticClass()) && ((e = t).OnPointUpCallBack.IsBound() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute parent UIExtendToggle"), this.kzt(), e.OnPointUpCallBack.Execute(1)), e.OnPointUpCallBackWithEventData.IsBound())) {
          if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 16, "OnButtonPointerUpCallBack execute parent UIExtendToggle");
          }
          this.kzt();
          e.OnPointUpCallBackWithEventData.Execute(1, undefined);
        }
      }
    };
    this.b91 = () => {
      if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 74, "OnButtonHover enter");
      }
      var e;
      var t = this.Nzt;
      if (t?.IsValid()) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 74, "OnButtonHover execute self");
        }
        if (t.IsA(UE.UIButtonComponent.StaticClass())) {
          if ((e = t).OnPointEnterCallBack.IsBound()) {
            if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 74, "OnButtonHover execute parent UIButtonComponent");
            }
            e.OnPointEnterCallBack.Execute();
          }
        } else if (t.IsA(UE.UIExtendToggle.StaticClass()) && ((e = t).OnHover && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonHover execute parent UIExtendToggle"), e.OnHover.Broadcast()), e.OnPointEnterCallBack.IsBound())) {
          if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 74, "OnButtonHover execute parent UIExtendToggle");
          }
          t = e.GetToggleState();
          e.OnPointEnterCallBack.Execute(t);
        }
      }
    };
    this.R91 = () => {
      if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 74, "OnButtonUnHover enter");
      }
      var e;
      var t = this.Nzt;
      if (t?.IsValid()) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 74, "OnButtonUnHover execute self");
        }
        if (t.IsA(UE.UIButtonComponent.StaticClass())) {
          if ((e = t).OnPointExitCallBack.IsBound()) {
            if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 74, "OnButtonUnHover execute parent UIButtonComponent");
            }
            e.OnPointExitCallBack.Execute();
          }
        } else if (t.IsA(UE.UIExtendToggle.StaticClass()) && ((e = t).OnUnHover && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 74, "OnButtonUnHover execute parent UIExtendToggle"), e.OnUnHover.Broadcast()), e.OnPointExitCallBack.IsBound())) {
          if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 74, "OnButtonUnHover execute parent UIButtonComponent");
          }
          t = e.GetToggleState();
          e.OnPointExitCallBack.Execute(t);
        }
      }
    };
    this.Hzt = e => {
      var t;
      if (!this.Bzt) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDownCallBack enter");
        }
        if ((t = this.Gzt)?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDownCallBack execute self"), t.OnPointerDownCallBack.IsBound())) {
          if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDownCallBack execute parent");
          }
          t.OnPointerDownCallBack.Execute(e);
        }
      }
    };
    this.jzt = e => {
      var t;
      if (!this.Bzt) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnDraggablePointerBeginDragCallBack enter");
        }
        if ((t = this.Gzt)?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerBeginDragCallBack execute self"), this.bzt = true, t.OnPointerBeginDragCallBack.IsBound())) {
          if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 16, "OnDraggablePointerBeginDragCallBack execute parent");
          }
          t.OnPointerBeginDragCallBack.Execute(e);
        }
      }
    };
    this.Wzt = e => {
      var t;
      if (!this.Bzt) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDragCallBack enter");
        }
        if ((t = this.Gzt)?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDragCallBack execute self"), this.Ozt = e, t.OnPointerDragCallBack.IsBound())) {
          if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 16, "OnDraggablePointerDragCallBack execute parent");
          }
          t.OnPointerDragCallBack.Execute(e);
        }
      }
    };
    this.Kzt = e => {
      if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "OnDraggablePointerEndDragCallBack enter");
      }
      var t = this.Gzt;
      if (t?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerEndDragCallBack execute self"), this.bzt = false, t.OnPointerEndDragCallBack.IsBound())) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnDraggablePointerEndDragCallBack execute parent");
        }
        t.OnPointerEndDragCallBack.Execute(e);
      }
    };
    this.Qzt = e => {
      if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack enter");
      }
      var t = this.Gzt;
      if (t?.IsValid() && (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack execute self"), t.OnPointerUpCallBack.IsBound())) {
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack execute parent");
        }
        t.OnPointerUpCallBack.Execute(e);
        if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "OnDraggablePointerUpCallBack execute TryFinishByClick");
        }
        this.kzt();
      }
    };
    this.OnTouch = (e, t) => {
      var e = Number(e);
      var i = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e)?.GetPointerEventData()?.pressComponent;
      if (i && i.GetOwner() === this.GetButton(0).GetOwner()) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GuideTouchIdInject, e, this.xzt.GetOwner());
      }
    };
    this.Owner = i;
    this.Config = this.Owner.GetGuideStepInfo().ViewData.ViewConf;
    this.xzt = e;
    this.wzt = t;
  }
  Init(e) {
    if (e) {
      this.CreateThenShowByActorAsync(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(3);
    this.Pzt = new GuideFocusItemText_1.FocusItemText(this);
    await this.Pzt.OnlyCreateByActorAsync(e.GetOwner());
    this.AddChild(this.Pzt);
  }
  OnStart() {
    var e = LguiUtil_1.LguiUtil.GetChildActorByHierarchyIndex(this.GetOriginalActor()).GetComponentByClass(UE.LGUICanvas.StaticClass());
    if (this.Config.OnlyFrame) {
      this.GetItem(3).SetUIActive(false);
    } else {
      this.GetItem(3).SetUIActive(true);
      this.Pzt.ShowText();
    }
    if (this.Config.OnlyText) {
      this.GetItem(2).SetUIActive(false);
      e.clipFeatherNew.Bottom = 0;
      e.clipFeatherNew.Top = 0;
      e.clipFeatherNew.Left = 0;
      e.clipFeatherNew.Right = 0;
    } else {
      this.GetItem(2).SetUIActive(true);
      e.clipFeatherNew.Bottom = CANVAS_CLIP_FEATHER;
      e.clipFeatherNew.Top = CANVAS_CLIP_FEATHER;
      e.clipFeatherNew.Left = CANVAS_CLIP_FEATHER;
      e.clipFeatherNew.Right = CANVAS_CLIP_FEATHER;
    }
    this.tYe = this.GetItem(1);
    this.RectItem = this.GetItem(2);
    this.GetItem(1).SetUIActive(this.Config.UseMask);
    this.Nzt = this.xzt.GetOwner().GetComponentByClass(UE.UISelectableComponent.StaticClass());
    const t = this.GetButton(0);
    t.OnPointDownCallBack.Bind(this.Fzt);
    t.OnPointUpCallBack.Bind(this.Vzt);
    if (this.Config.EnableHover) {
      t.OnPointEnterCallBack.Bind(this.b91);
      t.OnPointExitCallBack.Bind(this.R91);
    }
    const i = this.GetItem(3);
    i.SetUIActive(false);
    if (this.Config.ClickAnywhere && (e = this.Config.ClickAnywhereShowTime) > 0) {
      t.RootUIComp.SetRaycastTarget(false);
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        i.SetUIActive(true);
        t.RootUIComp.SetRaycastTarget(true);
      }, e);
    }
    this.Gzt = this.xzt.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    e = t.RootUIComp.GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    e.OnPointerDownCallBack.Bind(e => {
      this.Hzt(e);
    });
    e.OnPointerBeginDragCallBack.Bind(e => {
      this.jzt(e);
    });
    e.OnPointerDragCallBack.Bind(e => {
      this.Wzt(e);
    });
    e.OnPointerEndDragCallBack.Bind(e => {
      this.Kzt(e);
    });
    e.OnPointerUpCallBack.Bind(e => {
      this.Qzt(e);
    });
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.OnTouch);
  }
  OnBeforeShow() {
    if (this.Owner?.Config?.UseMask) {
      if (ControllerHolder_1.ControllerHolder.GuideController.CheckHasNewTagInHookNameForShow(this.Owner.Config)) {
        UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(this.wzt);
      } else {
        UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(this.xzt);
      }
      UiNavigationGlobalData_1.UiNavigationGlobalData.AddBlockListenerFocusTag("GuideFocus");
    } else {
      this.Nzt?.FocusListenerDelegate.Bind(() => {
        this.kzt();
      });
    }
  }
  OnAfterHide() {
    if (this.Owner?.Config?.UseMask) {
      UiNavigationGlobalData_1.UiNavigationGlobalData.DeleteBlockListenerFocusTag("GuideFocus");
      UiNavigationNewController_1.UiNavigationNewController.ResetNavigationFocusForGuide();
    } else {
      this.Nzt?.FocusListenerDelegate.Unbind();
    }
  }
  OnAfterShow() {
    this.Owner.ReadyToShow = true;
  }
  kzt() {
    if (!!this.Config.UseClick && !this.Bzt) {
      this.Bzt = true;
      if (GuideFocusItem.IsOpenLog && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "TryFinishByClick done");
      }
      this.Owner.DoCloseByFinished();
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "DoCloseByFinished");
        }
      });
    }
  }
  OnBaseViewCloseWhenFinish() {
    this.Pzt.OnBaseViewCloseWhenFinish();
  }
  OnBeforeDestroy() {
    this.Bzt = true;
    if (this.bzt) {
      this.Kzt(this.Ozt);
      this.Qzt(this.Ozt);
      this.bzt = false;
      this.Ozt = undefined;
    }
    if (this.qzt) {
      this.Vzt();
      this.qzt = false;
    }
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.OnTouch);
  }
  OnTick(e) {
    if (this.IsShowOrShowing && this.RootItem?.IsValid() && this.xzt?.IsValid()) {
      this.ApplyButtonFollow();
      this.ApplyBgFollow();
      this.Pzt?.OnTick(e);
    }
  }
  OnDurationChange(e) {
    if (this.GetActive()) {
      this.Pzt?.OnDurationChange(e);
    }
  }
  ApplyButtonFollow() {
    var e = this.wzt;
    var t = e.D_K2_GetComponentScale();
    if (this.Owner.GetGuideStepInfo().ViewData.IsMultiAttach) {
      var i = [10000, 10000];
      var o = [0, 0];
      for (const g of this.Owner.GetGuideStepInfo().ViewData.GetMultiAttachItems() ?? []) {
        var [n, s, u, a] = this.bwm(g);
        i[0] = Math.min(i[0], n);
        i[1] = Math.min(i[1], s);
        o[0] = Math.max(o[0], u);
        o[1] = Math.max(o[1], a);
      }
      this.RootItem.SetPivot(this.Iwm);
      this.Twm.X = i[1];
      this.Twm.Y = i[0];
      this.RootItem.SetLGUISpaceAbsolutePosition(this.Twm);
      this.RootItem.SetHeight(o[0] - i[0]);
      this.RootItem.SetWidth(o[1] - i[1]);
    } else {
      this.RootItem.D_K2_SetWorldLocation(e.D_K2_GetComponentLocation(), false, undefined, false);
      this.RootItem.SetPivot(e.GetPivot());
      this.RootItem.SetHeight(e.Height * t.Y);
      this.RootItem.SetWidth(e.Width * t.X);
    }
    var t = this.xzt;
    var r = this.GetButton(0).RootUIComp;
    if (this.Config.ClickAnywhere) {
      r.D_K2_SetWorldLocation(UiLayer_1.UiLayer.UiRootItem.D_K2_GetComponentLocation(), false, undefined, false);
      r.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot());
      r.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height);
      r.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width);
    } else if (this.Config.ExpandClickArea) {
      r.SetPivot(e.GetPivot());
      r.SetHeight(e.Height);
      r.SetWidth(e.Width);
      r.D_SetRelativeScale3D(e.D_K2_GetComponentScale());
      r.D_K2_SetWorldLocation(e.D_K2_GetComponentLocation(), false, undefined, false);
    } else {
      r.SetPivot(t.GetPivot());
      r.SetHeight(t.Height);
      r.SetWidth(t.Width);
      r.D_SetRelativeScale3D(t.D_K2_GetComponentScale());
      r.D_K2_SetWorldLocation(t.D_K2_GetComponentLocation(), false, undefined, false);
    }
  }
  ApplyBgFollow() {
    var e;
    if (this.Config.UseMask) {
      (e = this.tYe).D_K2_SetWorldLocation(UiLayer_1.UiLayer.UiRootItem.D_K2_GetComponentLocation(), false, undefined, false);
      e.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot());
      e.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height);
      e.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width);
    }
  }
  bwm(e) {
    var t = e.GetLGUISpaceCenterAbsolutePosition();
    var i = e.D_K2_GetComponentScale();
    var o = e.Width * i.X;
    var e = e.Height * i.Y;
    var i = t.Y - e / 2;
    var e = t.Y + e / 2;
    return [i, t.X - o / 2, e, t.X + o / 2];
  }
}
(exports.GuideFocusItem = GuideFocusItem).IsOpenLog = false;
//# sourceMappingURL=GuideFocusItem.js.map