"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadControlMouse = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const TsUiNavigationBehaviorListener_1 = require("../New/TsUiNavigationBehaviorListener");
const UiNavigationGlobalData_1 = require("../New/UiNavigationGlobalData");
const MOVE_SPEED_INTERVAL = 20;
const TWEEN_TIME = 0.3;
const BASE_FPS = 60;
class GamepadControlMouse {
  constructor(t, i) {
    this.fIa = undefined;
    this.pIa = undefined;
    this.fLt = undefined;
    this.vIa = undefined;
    this.MIa = 0;
    this.SIa = 0;
    this.wpm = 0;
    this.Lpm = 0;
    this.EIa = 0;
    this.yIa = 0;
    this.IIa = false;
    this.u3i = false;
    this.TIa = undefined;
    this.$pt = undefined;
    this.U9_ = 1;
    this.AdsorbedListener = undefined;
    this.HitListener = undefined;
    this.GuideUiListener = undefined;
    this.IsDragging = false;
    this.ViewportPosition = Vector2D_1.Vector2D.Create();
    this.LockUseDrag = false;
    this.LIa = Vector2D_1.Vector2D.Create();
    this.TCa = undefined;
    this.uGo = undefined;
    this.DIa = Vector2D_1.Vector2D.Create();
    this.y0m = Vector2D_1.Vector2D.Create();
    this.YFo = t => {
      this.DIa.Set(t.X, t.Y);
      this.Q_t.Set(this.DIa.X, this.DIa.Y);
      this.RIa();
    };
    this.lqt = () => {
      var t = Info_1.Info.IsInGamepad();
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SetIsOverrideMousePosition(t);
      this.vIa.SetAlpha(t ? 1 : 0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "UiNavigation:GamepadControlMouse 输入类型方式变化", ["是否开启", t], ["当前操作类型", Info_1.Info.InputControllerType]);
      }
    };
    this.vIa = t;
    this.vIa.SetAlpha(Info_1.Info.IsInGamepad() ? 1 : 0);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(t);
    this.TIa = i;
    this.pIa = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
    this.fLt = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    this.U9_ = this.fLt.Canvas.GetCanvasScale();
    this.MIa = UiLayer_1.UiLayer.UiRootItem.GetWidth() / 2;
    this.SIa = UiLayer_1.UiLayer.UiRootItem.GetHeight() / 2;
    t = UiLayer_1.UiLayer.UiRootItem.GetRenderCanvas().GetViewportSize();
    this.wpm = t.X;
    this.Lpm = t.Y;
    this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
  }
  get Q_t() {
    var t;
    if (!this.fIa) {
      t = this.pIa.pointerPosition;
      this.fIa = Vector2D_1.Vector2D.Create(t.X, t.Y);
    }
    return this.fIa;
  }
  get AIa() {
    return this.EIa !== 0 || this.yIa !== 0;
  }
  UIa() {
    var t;
    if (this.fLt) {
      t = this.fLt.ConvertPositionFromViewportToLGUICanvas(this.Q_t.ToUeVector2D());
      return Vector2D_1.Vector2D.Create(t.X - this.MIa, t.Y - this.SIa);
    } else {
      return this.Q_t;
    }
  }
  RIa() {
    var t = this.UIa();
    let i = 0;
    let e = 0;
    if (t.X > this.MIa) {
      i = t.X - this.MIa;
      t.X = this.MIa;
      this.Q_t.X = MathUtils_1.MathUtils.Clamp(this.Q_t.X - this.yIa, 0, this.wpm);
    } else if (t.X < -this.MIa) {
      i = t.X + this.MIa;
      t.X = -this.MIa;
      this.Q_t.X = MathUtils_1.MathUtils.Clamp(this.Q_t.X - this.yIa, 0, this.wpm);
    }
    if (t.Y > this.SIa) {
      e = t.Y - this.SIa;
      t.Y = this.SIa;
      this.Q_t.Y = MathUtils_1.MathUtils.Clamp(this.Q_t.Y + this.EIa, 0, this.Lpm);
    } else if (t.Y < -this.SIa) {
      e = t.Y + this.SIa;
      t.Y = -this.SIa;
      this.Q_t.Y = MathUtils_1.MathUtils.Clamp(this.Q_t.Y + this.EIa, 0, this.Lpm);
    }
    this.vIa.SetAnchorOffset(t.ToUeVector2D());
    LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.OverrideMousePosition(this.Q_t.ToUeVector2D());
    if (i !== 0 || e !== 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GamepadMoveOverScreen, i, e);
    }
  }
  bKl() {
    var t = this.vIa.GetPositionInViewPort(true);
    this.pIa.pointerPosition = new UE.Vector(t.X, t.Y, 0);
  }
  D9_(t) {
    if (this.AIa) {
      t = TimeUtil_1.TimeUtil.InverseMillisecond / t;
      t = BASE_FPS / t;
      this.EIa *= t;
      this.yIa *= t;
      (t = this.pIa?.pointerPosition ?? Vector2D_1.Vector2D.Create()).Y -= this.EIa;
      t.X += this.yIa;
      this.Q_t.Set(t.X, t.Y);
    }
  }
  xIa() {
    if (this.AIa) {
      this.xCa();
      this.IIa = false;
      this.RIa();
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SwitchToNavigationInputType();
    }
  }
  ELm() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetNowHitComponent();
    let i = undefined;
    if (t &&= t.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass())) {
      i = t;
    }
    if (this.HitListener !== i) {
      this.TIa.MarkRefreshHotKeyDirty();
    }
    this.HitListener = i;
  }
  xCa() {
    if (this.TCa) {
      this.TCa.Kill();
      this.TCa = undefined;
    }
  }
  PIa(t, i) {
    var e = i.RootUIComp.GetPositionInViewportWithPivot(true, i.AdsorbedPivot);
    var s = this.fLt.ConvertPositionFromViewportToLGUICanvas(e);
    this.LIa.Set(e.X, e.Y);
    this.y0m.Set(s.X, s.Y);
    return !(Math.abs(this.y0m.X - t.X) > i.AdsorbedDistance) && !(Math.abs(this.y0m.Y - t.Y) > i.AdsorbedDistance) && !(Vector2D_1.Vector2D.Distance(this.y0m, t) > i.AdsorbedDistance);
  }
  wIa(t) {
    var i = Vector2D_1.Vector2D.Create(t);
    for (const e of this.TIa.GetPanelConfigMap().values()) {
      for (const s of e.GetPanelHandle().GetListenerSet().values()) {
        if (s.OpenAdsorbed && s.IsCanFocus() && s.IsInLoopScrollDisplayByGridActor() && s.IsInDynScrollDisplay() && this.PIa(i, s)) {
          return s;
        }
      }
    }
  }
  fLm(t) {
    if (t && t.IsUseDrag) {
      for (const i of this.TIa.GetPanelConfigMap().values()) {
        if (i.GetPanelHandle().GetListenerSet().has(t)) {
          return true;
        }
      }
    }
    return false;
  }
  BIa() {
    var t;
    if (!this.AIa && !this.IIa) {
      this.IIa = true;
      t = this.fLt.ConvertPositionFromViewportToLGUICanvas(this.Q_t.ToUeVector2D());
      if ((t = this.wIa(t)) !== this.AdsorbedListener) {
        this.AdsorbedListener = t;
        this.TIa.MarkRefreshHotKeyDirty();
      }
      if (this.AdsorbedListener) {
        this.xCa();
        this.TCa = UE.LTweenBPLibrary.Vector2To(GlobalData_1.GlobalData.World, this.uGo, this.Q_t.ToUeVector2D(), this.LIa.ToUeVector2D(true), TWEEN_TIME);
      }
    }
  }
  MoveForwardByGamepad(t) {
    this.EIa = t * MOVE_SPEED_INTERVAL * this.U9_;
  }
  MoveRightByGamepad(t) {
    this.yIa = t * MOVE_SPEED_INTERVAL * this.U9_;
  }
  TriggerByGamepad(t) {
    if (t) {
      this.$pt.StopSequenceByKey("Release");
      this.$pt.PlaySequencePurely("Press");
    } else {
      this.$pt.StopSequenceByKey("Press");
      this.$pt.PlaySequencePurely("Release");
    }
  }
  CanOverridePosition(t) {
    var i = t && Info_1.Info.IsInGamepad();
    LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SetIsOverrideMousePosition(i);
    this.vIa.SetAlpha(i ? 1 : 0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "UiNavigation:GamepadControlMouse 手柄控制鼠标功能", ["是否开启", i], ["当前操作类型", Info_1.Info.InputControllerType]);
    }
    if (this.u3i !== t) {
      if (this.u3i = t) {
        this.bKl();
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
      } else {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
      }
    }
  }
  UpdateMousePositionByItem(t) {
    t = t.GetPositionInViewportWithPivot(true, new UE.Vector2D(0.5, 0.5));
    this.Q_t.Set(t.X, t.Y);
    this.xCa();
    this.RIa();
    LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SwitchToNavigationInputType();
  }
  UpdateMousePositionForGuide(t) {
    this.GuideUiListener = t.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass());
    this.UpdateMousePositionByItem(t);
    this.TIa.MarkRefreshHotKeyDirty();
  }
  ResetNavigationFocusForGuide() {
    this.GuideUiListener = undefined;
  }
  IsNearlyListenerUseDrag() {
    return !this.LockUseDrag && !!this.fLm(this.HitListener);
  }
  SetLockUseDragState(t) {
    this.LockUseDrag = t;
  }
  GetHitComponentListener() {
    return this.HitListener;
  }
  GetGuideUiListener() {
    return this.GuideUiListener;
  }
  GetAdsorbedListener() {
    return this.AdsorbedListener;
  }
  NotifyNavigationMousePositionDragState(t) {
    if (this.IsDragging !== t) {
      this.TIa.MarkRefreshHotKeyDirty();
    }
    this.IsDragging = t;
  }
  IsNavigationMousePositionDragging() {
    return this.IsDragging;
  }
  GetMouseViewportPosition() {
    this.ViewportPosition.FromUeVector2D(this.vIa.GetPositionInViewPort(true));
    return this.ViewportPosition;
  }
  Clear() {
    this.CanOverridePosition(false);
    this.xCa();
    this.$pt.Clear();
    (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
  }
  Tick(t) {
    if (!!Info_1.Info.IsInGamepad() && !UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation) {
      this.D9_(t);
      this.xIa();
      this.BIa();
      this.ELm();
    }
  }
}
exports.GamepadControlMouse = GamepadControlMouse;
//# sourceMappingURL=GamepadControlMouse.js.map