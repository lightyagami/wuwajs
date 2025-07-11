"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaEntranceGymTabView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
const DragInteractComponent_1 = require("./DragInteractComponent");
const PhantomArenaEntranceGymItem_1 = require("./PhantomArenaEntranceGymItem");
class PhantomArenaEntranceGymTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this.KW1 = 1;
    this.rIu = false;
    this.YAu = new Map();
    this.YCo = undefined;
    this.ZIu = undefined;
    this.XW1 = undefined;
    this.jFo = undefined;
    this.WFo = undefined;
    this.eTu = 0;
    this.Rjc = undefined;
    this.nTu = () => {
      this.oTu();
      var e = this.GetItem(13).GetAnchorOffset();
      this.SetPosition(Vector2D_1.Vector2D.Create(e.X, e.Y), false);
    };
    this.Jj1 = e => {
      var t = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymConfigByLevel(e);
      if (t) {
        if (t.IfRepeat) {
          this.ViewModel.SetTabView("PhantomArenaEntranceRepeatTabView");
        } else {
          UiManager_1.UiManager.OpenView("PhantomArenaMatchView", e);
        }
      }
    };
    this.zAu = e => {
      this.r3o(true);
      e = this.JAu(e);
      this.SetPosition(e, true);
    };
    this.YW1 = e => {
      if (PhantomArenaDefine_1.positionGymLevel[this.KW1 - 1] !== PhantomArenaDefine_1.positionGymLevel[e - 1]) {
        this.KW1 = e;
        this.zW1();
      }
    };
    this.JW1 = e => {};
    this._cr = e => {
      if (e === "AreaSwitch") {
        this.rIu = false;
        this.XW1.RefreshBg(false, this.KW1);
      } else if (e === "Start") {
        this.equ();
      }
    };
    this.ZW1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", {
        ChallengeId: 0,
        OpenView: "PhantomArenaDeckOverviewTabView"
      });
    };
    this.Ath = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMainView", {
        ChallengeId: 0,
        OpenView: "PhantomArenaRoleSelectTabView"
      });
    };
    this.tQ1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaCollectView");
    };
    this.tTu = () => {
      this.r3o(true);
    };
    this.Agt = e => {
      if (this.ZIu) {
        e = Vector2D_1.Vector2D.Create(this.ZIu).AdditionEqual(e);
        this.SetPosition(e, false);
      }
    };
    this.iTu = e => {
      var t = Vector2D_1.Vector2D.Create();
      e.Multiply(PhantomArenaDefine_1.GYM_INERTIA_TWEEN_TIME, t);
      var e = Vector2D_1.Vector2D.Create(this.ZIu).AdditionEqual(t);
      this.SetPosition(e, true);
    };
    this.YFo = e => {
      e = Vector2D_1.Vector2D.Create(e);
      this.SetPosition(e, false);
    };
    this.u7c = () => {
      for (const e of this.YAu.values()) {
        e.RefreshRedDot();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UISprite], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem]];
    this.BtnBindInfo = [[9, this.ZW1], [10, this.Ath], [11, this.tQ1]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    if (ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymLevelList().length !== PhantomArenaDefine_1.GYM_MAX_LEVEL) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 75, "配置的道馆数量与页面资源不符，请检查配表");
      }
    } else {
      for (let e = 0; e < PhantomArenaDefine_1.GYM_MAX_LEVEL - 1; e++) {
        const i = new PhantomArenaEntranceGymItem_1.EntranceGymItem();
        i.Level = e + 1;
        i.CallbackOnClick = this.Jj1;
        i.CallbackOnHover = this.YW1;
        i.CallbackOnFocus = this.zAu;
        i.CallbackOnUnHover = this.JW1;
        this.YAu.set(e + 1, i);
        t.push(i.CreateThenShowByActorAsync(this.GetItem(2 + e).GetOwner()));
      }
      const i = new PhantomArenaEntranceGymItem_1.EntranceGymRepeatItem();
      i.Level = PhantomArenaDefine_1.GYM_MAX_LEVEL;
      i.CallbackOnClick = this.Jj1;
      i.CallbackOnHover = this.YW1;
      i.CallbackOnFocus = this.zAu;
      i.CallbackOnUnHover = this.JW1;
      this.YAu.set(PhantomArenaDefine_1.GYM_MAX_LEVEL, i);
      t.push(i.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
      this.XW1 = new EntranceBackgroundPanel();
      t.push(this.XW1.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
      await Promise.all(t);
    }
  }
  OnStart() {
    this.GetItem(1).SetWidth(this.GetItem(13).GetWidth());
    var e = {
      Draggable: this.GetDraggable(0),
      CallbackOnDown: this.tTu,
      CallbackOnDrag: this.Agt,
      CallbackOnInertia: this.iTu
    };
    this.WFo = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
    this.YCo = new DragInteractComponent_1.DragInteractComponent(e);
    this.SequencePlayer.BindOnEndSequenceEvent(this._cr);
    var e = this.GetItem(14).GetAnchorOffset();
    this.ZIu = Vector2D_1.Vector2D.Create(e.X, e.Y);
  }
  OnBeforeShow() {
    this.YCo.Enable();
    this.K8e();
    this.zW1();
    this.cy1();
  }
  OnAfterShow() {
    this.oTu();
  }
  OnBeforeHide() {
    this.Ovt();
    this.YCo.Disable();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.nTu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.u7c);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.nTu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, this.u7c);
  }
  OnBeforeDestroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
    if (this.Rjc && TimerSystem_1.TimerSystem.Has(this.Rjc)) {
      TimerSystem_1.TimerSystem.Remove(this.Rjc);
      this.Rjc = undefined;
    }
  }
  zW1() {
    if (this.rIu) {
      this.SequencePlayer.StopPrevSequence(true, true);
    }
    this.XW1.RefreshBg(true, this.KW1);
    this.rIu = true;
    this.SequencePlayer.PlaySequence("AreaSwitch", false, 1.6);
  }
  cy1() {
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10090);
    this.SetButtonUiActive(9, e);
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10089);
    this.SetButtonUiActive(10, t);
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10088);
    this.SetButtonUiActive(11, i);
    this.GetSprite(15).SetUIActive(e || t || i);
  }
  equ() {
    for (const e of this.YAu.values()) {
      e.PlayUnlock();
    }
  }
  JAu(e) {
    e = this.YAu.get(e).GetAnchorOffsetX() - PhantomArenaDefine_1.GYM_GYM_OFFSET_MIDDLE;
    e = PhantomArenaDefine_1.GYM_BG_OFFSET_MAX - e;
    return Vector2D_1.Vector2D.Create(e, 0);
  }
  SetPosition(t, i) {
    if (t) {
      let e = Vector2D_1.Vector2D.Create();
      if (t instanceof Vector2D_1.Vector2D) {
        e.DeepCopy(t);
      }
      var t = Vector2D_1.Vector2D.Create(e.X, e.Y);
      e = this.n3o(t);
      var t = this.ZIu.ToUeVector2D();
      var n = e.ToUeVector2D();
      var a = this.Elh(this.ZIu.X, n.X);
      if (!i || a) {
        i = e.ToUeVector2D();
        a = Vector2D_1.Vector2D.Create(e.X * 0.85, e.Y).ToUeVector2D();
        this.GetItem(14).SetAnchorOffset(a);
        this.GetItem(13).SetAnchorOffset(i);
        this.ZIu = e;
      } else {
        this.r3o();
        this.jFo = UE.LTweenBPLibrary.Vector2To(GlobalData_1.GlobalData.World, this.WFo, t, n, PhantomArenaDefine_1.GYM_INERTIA_TWEEN_TIME, 0, 2);
      }
    }
  }
  Elh(e, t) {
    return MathUtils_1.MathUtils.IsNearlyEqual(e, t);
  }
  n3o(e) {
    e.X;
    e = MathCommon_1.MathCommon.Clamp(e.X, this.eTu, PhantomArenaDefine_1.GYM_BG_OFFSET_MAX);
    return Vector2D_1.Vector2D.Create(e, 0);
  }
  r3o(e) {
    if (this.jFo?.IsValid()) {
      this.jFo.Kill(e);
      this.jFo = undefined;
    }
  }
  oTu() {
    var e = this.GetItem(13).Width;
    var t = this.GetItem(13).GetParentAsUIItem().Width;
    this.eTu = t - e;
  }
  K8e() {
    this.Ovt();
    RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaCollect", this.GetItem(18));
    RedDotController_1.RedDotController.BindRedDot("RedDotPhantomArenaRole", this.GetItem(17));
    this.GetItem(16).SetUIActive(false);
    for (const e of this.YAu.values()) {
      e.RefreshRedDot();
    }
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaCollect", this.GetItem(18));
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomArenaRole", this.GetItem(17));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (e && e.length !== 0 && e[0] === "GuideHook" && !(e.length < 2) && (e = e[1], t = this.GetGuideUiItem(e), e === "1" && (this.Rjc = TimerSystem_1.TimerSystem.Delay(() => {
      this.zAu(PhantomArenaDefine_1.GYM_MAX_LEVEL);
    }, 1000)), t)) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaEntranceGymTabView = PhantomArenaEntranceGymTabView;
class EntranceBackgroundPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UITexture]];
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
        this.SetRight(e);
    }
  }
  nIu(e, t) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureByPath(e, t);
  }
  SetLeft(e) {
    var t = e ? this.GetTexture(3) : this.GetTexture(0);
    var i = e ? this.GetTexture(4) : this.GetTexture(1);
    var e = e ? this.GetTexture(5) : this.GetTexture(2);
    this.nIu(PhantomArenaDefine_1.GYM_BG_LEFT_COLOR, t);
    this.nIu(PhantomArenaDefine_1.GYM_BG_MIDDLE_WHITE, i);
    this.nIu(PhantomArenaDefine_1.GYM_BG_RIGHT_GRAY, e);
  }
  SetMiddle(e) {
    var t = e ? this.GetTexture(3) : this.GetTexture(0);
    var i = e ? this.GetTexture(4) : this.GetTexture(1);
    var e = e ? this.GetTexture(5) : this.GetTexture(2);
    this.nIu(PhantomArenaDefine_1.GYM_BG_LEFT_WHITE, t);
    this.nIu(PhantomArenaDefine_1.GYM_BG_MIDDLE_COLOR, i);
    this.nIu(PhantomArenaDefine_1.GYM_BG_RIGHT_GRAY, e);
  }
  SetRight(e) {
    var t = e ? this.GetTexture(3) : this.GetTexture(0);
    var i = e ? this.GetTexture(4) : this.GetTexture(1);
    var e = e ? this.GetTexture(5) : this.GetTexture(2);
    this.nIu(PhantomArenaDefine_1.GYM_BG_LEFT_GRAY, t);
    this.nIu(PhantomArenaDefine_1.GYM_BG_MIDDLE_WHITE, i);
    this.nIu(PhantomArenaDefine_1.GYM_BG_RIGHT_COLOR, e);
  }
}
//# sourceMappingURL=PhantomArenaEntranceGymTabView.js.map