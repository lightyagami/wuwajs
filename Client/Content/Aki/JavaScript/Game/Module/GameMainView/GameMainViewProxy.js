"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMainViewProxy = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TouchUiEditApplyHelper_1 = require("../../InputSettings/TouchUiEdit/TouchUiEditApplyHelper");
const UiManager_1 = require("../../Ui/UiManager");
const PositionPanel_1 = require("../BattleUi/Views/BattleChildViewPanel/PositionPanel");
const JoystickPanel_1 = require("./CommonChildPanel/JoystickPanel");
class GameMainViewProxy {
  constructor() {
    this.View = undefined;
    this.ChildPanelMap = new Map();
    this.TickPanelList = [];
    this.JoystickPanel = undefined;
    this.JoystickPanelOriginalIndex = 0;
    this.PositionPanel = undefined;
    this.IsFirstShow = false;
    this.PanelResIdMap = new Map();
    this.TouchUiEditGroup = undefined;
    this.XBo = () => {
      this.I6u();
      this.OnInputControllerChange();
    };
    this.FJe = t => {
      if (Info_1.Info.IsInTouch() && this.JoystickPanel && (t ? (this.JoystickPanelOriginalIndex = this.JoystickPanel.GetOriginalItem().GetHierarchyIndex(), this.JoystickPanel.GetOriginalItem().SetUIParent(this.View.GetRootItem())) : (this.JoystickPanel.GetOriginalItem().SetUIParent(this.View.GetContentPanel()), this.JoystickPanel.GetOriginalItem().SetHierarchyIndex(this.JoystickPanelOriginalIndex), this.JoystickPanelOriginalIndex = 0), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("CommonGameMainView", 10, "轮盘界面显隐，调整摇杆面板层级", ["visible", t]);
      }
      this.View.SetMaskItemActive(t);
      this.OnRouletteViewVisibleChangedInner(t);
    };
  }
  RegisterView(t) {
    this.View = t;
  }
  async BeforeStartAsync() {
    await Promise.all([this.T6u(), this.OnBeforeStartAsync()]);
  }
  Start() {
    this.LNd();
    this.OnStart();
    this.LVd();
  }
  BeforeShow() {
    for (const t of this.ChildPanelMap.values()) {
      if (t.CheckBattleChildViewPanelShowCondition()) {
        t.ShowBattleChildViewPanel();
      }
    }
    this.OnBeforeShow(!this.IsFirstShow);
    this.IsFirstShow = true;
  }
  AfterShow() {
    this.RCd();
    this.OnAfterShow();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActiveBattleView);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotStart);
  }
  BeforeHide() {
    this.OnBeforeHide();
    this.HideViewOperation();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DisActiveBattleView);
  }
  AfterHide() {
    for (const t of this.ChildPanelMap.values()) {
      t.HideBattleChildViewPanel();
    }
    this.OnAfterHide();
  }
  LVd() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    this.OnAddEventListenerByStart();
  }
  PVd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    this.OnRemoveEventListenerForStart();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    this.OnAddEventListener();
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    this.OnRemoveEventListener();
  }
  BeforeDestroy() {
    this.PVd();
    this.mrt();
    this.PanelResIdMap.clear();
    this.OnBeforeDestroy();
  }
  Tick(t) {
    for (const e of this.TickPanelList) {
      if (e.GetVisible()) {
        e.OnTickBattleChildViewPanel(t);
      }
    }
    this.OnTick(t);
  }
  AfterTick(t) {
    for (const e of this.TickPanelList) {
      if (e.GetVisible()) {
        e.OnAfterTickBattleChildViewPanel(t);
      }
    }
    this.OnAfterTick(t);
  }
  async T6u() {
    await Promise.all([this.I6u(), this.$Pd()]);
  }
  LNd() {
    if (this.JoystickPanel) {
      this.JoystickPanel.GetOriginalItem().SetAsFirstHierarchy();
    }
  }
  async I6u() {
    if (!!Info_1.Info.IsInTouch() && !this.JoystickPanel) {
      await this.A6u();
    }
  }
  async A6u() {
    this.JoystickPanel = await this.CreateChildPanel("PnlJoystick", this.View.GetContentPanel(), JoystickPanel_1.JoystickPanel, true, true, 27);
  }
  async $Pd() {
    this.PositionPanel = await this.CreateChildPanel("PnlPosition", this.View.GetContentPanel(), PositionPanel_1.PositionPanel, true, true, 43);
  }
  mrt() {
    for (const t of this.ChildPanelMap.values()) {
      if (t !== undefined) {
        t.Reset();
      }
    }
    this.ChildPanelMap.clear();
    this.TickPanelList.length = 0;
  }
  RCd() {
    if (this.TouchUiEditGroup !== undefined && Info_1.Info.IsInTouch()) {
      for (var [t, e] of this.PanelResIdMap.entries()) {
        TouchUiEditApplyHelper_1.TouchUiEditApplyHelper.ApplyCommonTouchUiEditData(this.TouchUiEditGroup, e, t);
      }
    }
  }
  async CreateChildPanel(t, e, i, s = true, n = false, o = 0) {
    var r = new i();
    r.OpenParam = o;
    if (s) {
      await r.CreateThenShowByResourceIdAsync(t, e);
    } else {
      await r.CreateByResourceIdAsync(t, e);
    }
    this.ChildPanelMap.set(i, r);
    if (n) {
      this.TickPanelList.push(r);
    }
    this.PanelResIdMap.set(t, r);
    return r;
  }
  async OnBeforeStartAsync() {}
  OnStart() {}
  OnBeforeShow(t) {}
  OnAfterShow() {}
  OnBeforeHide() {}
  OnAfterHide() {}
  OnAddEventListenerByStart() {}
  OnRemoveEventListenerForStart() {}
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeDestroy() {}
  OnTick(t) {}
  OnAfterTick(t) {}
  OnInputControllerChange() {}
  OnRouletteViewVisibleChangedInner(t) {}
  HideViewOperation() {
    if (UiManager_1.UiManager.IsViewOpen("PhantomExploreView")) {
      UiManager_1.UiManager.CloseView("PhantomExploreView");
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    var i;
    if (!(t.length < 2)) {
      i = t[0];
      e = t[1];
      i = this.PanelResIdMap.get(i);
      if (e === "-1") {
        return i?.GetGuideUiItemAndUiItemForShowEx(t);
      } else if (t = i?.GetGuideUiItem(e)) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.GameMainViewProxy = GameMainViewProxy;
//# sourceMappingURL=GameMainViewProxy.js.map