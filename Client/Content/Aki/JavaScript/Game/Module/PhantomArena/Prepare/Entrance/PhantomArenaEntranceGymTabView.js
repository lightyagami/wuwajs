"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaEntranceGymTabView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase"),
  DragInteractComponent_1 = require("./DragInteractComponent"),
  PhantomArenaEntranceGymItem_1 = require("./PhantomArenaEntranceGymItem");
class PhantomArenaEntranceGymTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments), this.uW1 = 1, this.Fuu = !1, this.imu = new Map, this.YCo = void 0, this.Bcu = void 0, this.cW1 = void 0, this.jFo = void 0, this.WFo = void 0, this.kcu = 0, this.vCu = void 0, this.Ncu = () => {
      this.Fcu();
      var e = this.GetItem(13).GetAnchorOffset();
      this.SetPosition(Vector2D_1.Vector2D.Create(e.X, e.Y), !1)
    }, this.Cj1 = e => {
      var t = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymConfigByLevel(e);
      t && (t.IfRepeat ? this.ViewModel.SetTabView("PhantomArenaEntranceRepeatTabView") : UiManager_1.UiManager.OpenView("PhantomArenaMatchView", e))
    }, this.rmu = e => {
      this.r3o(!0);
      e = this.omu(e);
      this.SetPosition(e, !0)
    }, this.dW1 = e => {
      PhantomArenaDefine_1.positionGymLevel[this.uW1 - 1] !== PhantomArenaDefine_1.positionGymLevel[e - 1] && (this.uW1 = e, this.mW1())
    }, this.fW1 = e => {}, this._cr = e => {
      "AreaSwitch" === e ? (this.Fuu = !1, this.cW1.RefreshBg(!1, this.uW1)) : "Start" === e && this.Qfu()
    }, this.gW1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", {
        ChallengeId: 0,
        OpenView: "PhantomArenaDeckOverviewTabView"
      })
    }, this.Ath = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", {
        ChallengeId: 0,
        OpenView: "PhantomArenaRoleSelectTabView"
      })
    }, this.pW1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaCollectView")
    }, this.Ocu = () => {
      this.r3o(!0)
    }, this.Agt = e => {
      this.Bcu && (e = Vector2D_1.Vector2D.Create(this.Bcu).AdditionEqual(e), this.SetPosition(e, !1))
    }, this.qcu = e => {
      var t = Vector2D_1.Vector2D.Create(),
        e = (e.Multiply(PhantomArenaDefine_1.GYM_INERTIA_TWEEN_TIME, t), Vector2D_1.Vector2D.Create(this.Bcu).AdditionEqual(t));
      this.SetPosition(e, !0)
    }, this.YFo = e => {
      e = Vector2D_1.Vector2D.Create(e);
      this.SetPosition(e, !1)
    }, this.Dgu = () => {
      for (const e of this.imu.values()) e.RefreshRedDot()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDraggableComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UIButtonComponent],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UISprite],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem]
    ], this.BtnBindInfo = [
      [9, this.gW1],
      [10, this.Ath],
      [11, this.pW1]
    ]
  }
  async OnBeforeStartAsync() {
    var t = [];
    if (ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymLevelList().length !== PhantomArenaDefine_1.GYM_MAX_LEVEL) Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "配置的道馆数量与页面资源不符，请检查配表");
    else {
      for (let e = 0; e < PhantomArenaDefine_1.GYM_MAX_LEVEL - 1; e++) {
        const i = new PhantomArenaEntranceGymItem_1.EntranceGymItem;
        i.Level = e + 1, i.CallbackOnClick = this.Cj1, i.CallbackOnHover = this.dW1, i.CallbackOnFocus = this.rmu, i.CallbackOnUnHover = this.fW1, this.imu.set(e + 1, i), t.push(i.CreateThenShowByActorAsync(this.GetItem(2 + e).GetOwner()))
      }
      const i = new PhantomArenaEntranceGymItem_1.EntranceGymRepeatItem;
      i.Level = PhantomArenaDefine_1.GYM_MAX_LEVEL, i.CallbackOnClick = this.Cj1, i.CallbackOnHover = this.dW1, i.CallbackOnFocus = this.rmu, i.CallbackOnUnHover = this.fW1, this.imu.set(PhantomArenaDefine_1.GYM_MAX_LEVEL, i), t.push(i.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())), this.cW1 = new EntranceBackgroundPanel, t.push(this.cW1.CreateThenShowByActorAsync(this.GetItem(12).GetOwner())), await Promise.all(t)
    }
  }
  OnStart() {
    this.GetItem(1).SetWidth(this.GetItem(13).GetWidth());
    var e = {
        Draggable: this.GetDraggable(0),
        CallbackOnDown: this.Ocu,
        CallbackOnDrag: this.Agt,
        CallbackOnInertia: this.qcu
      },
      e = (this.WFo = (0, puerts_1.toManualReleaseDelegate)(this.YFo), this.YCo = new DragInteractComponent_1.DragInteractComponent(e), this.SequencePlayer.BindOnEndSequenceEvent(this._cr), this.GetItem(14).GetAnchorOffset());
    this.Bcu = Vector2D_1.Vector2D.Create(e.X, e.Y)
  }
  OnBeforeShow() {
    this.YCo.Enable(), this.K8e(), this.mW1(), this.Nv1()
  }
  OnAfterShow() {
    this.Fcu()
  }
  OnBeforeHide() {
    this.Ovt(), this.YCo.Disable()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Ncu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.Dgu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Ncu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.Dgu)
  }
  OnBeforeDestroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.YFo), this.vCu && TimerSystem_1.TimerSystem.Has(this.vCu) && (TimerSystem_1.TimerSystem.Remove(this.vCu), this.vCu = void 0)
  }
  mW1() {
    this.Fuu && this.SequencePlayer.StopPrevSequence(!0, !0), this.cW1.RefreshBg(!0, this.uW1), this.Fuu = !0, this.SequencePlayer.PlaySequence("AreaSwitch", !1, 1.6)
  }
  Nv1() {
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10090),
      t = (this.SetButtonUiActive(9, e), ModelManager_1.ModelManager.FunctionModel.IsOpen(10089)),
      i = (this.SetButtonUiActive(10, t), ModelManager_1.ModelManager.FunctionModel.IsOpen(10088));
    this.SetButtonUiActive(11, i), this.GetSprite(15).SetUIActive(e || t || i)
  }
  Qfu() {
    for (const e of this.imu.values()) e.PlayUnlock()
  }
  omu(e) {
    e = this.imu.get(e).GetAnchorOffsetX() - PhantomArenaDefine_1.GYM_GYM_OFFSET_MIDDLE, e = PhantomArenaDefine_1.GYM_BG_OFFSET_MAX - e;
    return Vector2D_1.Vector2D.Create(e, 0)
  }
  SetPosition(t, i) {
    if (t) {
      let e = Vector2D_1.Vector2D.Create();
      t instanceof Vector2D_1.Vector2D && e.DeepCopy(t);
      var t = Vector2D_1.Vector2D.Create(e.X, e.Y),
        t = (e = this.n3o(t), this.Bcu.ToUeVector2D()),
        n = e.ToUeVector2D(),
        a = this.Elh(this.Bcu.X, n.X);
      !i || a ? (i = e.ToUeVector2D(), a = Vector2D_1.Vector2D.Create(.85 * e.X, e.Y).ToUeVector2D(), this.GetItem(14).SetAnchorOffset(a), this.GetItem(13).SetAnchorOffset(i), this.Bcu = e) : (this.r3o(), this.jFo = UE.LTweenBPLibrary.Vector2To(GlobalData_1.GlobalData.World, this.WFo, t, n, PhantomArenaDefine_1.GYM_INERTIA_TWEEN_TIME, 0, 2))
    }
  }
  Elh(e, t) {
    return MathUtils_1.MathUtils.IsNearlyEqual(e, t)
  }
  n3o(e) {
    e.X;
    e = MathCommon_1.MathCommon.Clamp(e.X, this.kcu, PhantomArenaDefine_1.GYM_BG_OFFSET_MAX);
    return Vector2D_1.Vector2D.Create(e, 0)
  }
  r3o(e) {
    this.jFo?.IsValid() && (this.jFo.Kill(e), this.jFo = void 0)
  }
  Fcu() {
    var e = this.GetItem(13).Width,
      t = this.GetItem(13).GetParentAsUIItem().Width;
    this.kcu = t - e
  }
  K8e() {
    this.Ovt(), RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaCollect", this.GetItem(18)), RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaRole", this.GetItem(17)), this.GetItem(16).SetUIActive(!1);
    for (const e of this.imu.values()) e.RefreshRedDot()
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaCollect", this.GetItem(18)), RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaRole", this.GetItem(17))
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    return e && 0 !== e.length && "GuideHook" === e[0] && !(e.length < 2) && (e = e[1], t = this.GetGuideUiItem(e), "1" === e && (this.vCu = TimerSystem_1.TimerSystem.Delay(() => {
      this.rmu(PhantomArenaDefine_1.GYM_MAX_LEVEL)
    }, 1e3)), t) ? [t, t] : void 0
  }
}
exports.PhantomArenaEntranceGymTabView = PhantomArenaEntranceGymTabView;
class EntranceBackgroundPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UITexture]
    ]
  }
  RefreshBg(e, t) {
    switch (PhantomArenaDefine_1.positionGymLevel[t - 1]) {
      case "left":
        this.SetLeft(e);
        break;
      case "middle":
        this.SetMiddle(e);
        break;
      case "right":
        this.SetRight(e)
    }
  }
  Vuu(e, t) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureByPath(e, t)
  }
  SetLeft(e) {
    var t = e ? this.GetTexture(3) : this.GetTexture(0),
      i = e ? this.GetTexture(4) : this.GetTexture(1),
      e = e ? this.GetTexture(5) : this.GetTexture(2);
    this.Vuu(PhantomArenaDefine_1.GYM_BG_LEFT_COLOR, t), this.Vuu(PhantomArenaDefine_1.GYM_BG_MIDDLE_WHITE, i), this.Vuu(PhantomArenaDefine_1.GYM_BG_RIGHT_GRAY, e)
  }
  SetMiddle(e) {
    var t = e ? this.GetTexture(3) : this.GetTexture(0),
      i = e ? this.GetTexture(4) : this.GetTexture(1),
      e = e ? this.GetTexture(5) : this.GetTexture(2);
    this.Vuu(PhantomArenaDefine_1.GYM_BG_LEFT_WHITE, t), this.Vuu(PhantomArenaDefine_1.GYM_BG_MIDDLE_COLOR, i), this.Vuu(PhantomArenaDefine_1.GYM_BG_RIGHT_GRAY, e)
  }
  SetRight(e) {
    var t = e ? this.GetTexture(3) : this.GetTexture(0),
      i = e ? this.GetTexture(4) : this.GetTexture(1),
      e = e ? this.GetTexture(5) : this.GetTexture(2);
    this.Vuu(PhantomArenaDefine_1.GYM_BG_LEFT_GRAY, t), this.Vuu(PhantomArenaDefine_1.GYM_BG_MIDDLE_WHITE, i), this.Vuu(PhantomArenaDefine_1.GYM_BG_RIGHT_COLOR, e)
  }
}
//# sourceMappingURL=PhantomArenaEntranceGymTabView.js.map