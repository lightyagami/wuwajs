"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationViewHandle = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const GamepadControlMouse_1 = require("../Module/GamepadControlMouse");
const UiNavigationUtil_1 = require("../UiNavigationUtil");
const NavigationScrollbarData_1 = require("./NavigationScrollbarData");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationLogic_1 = require("./UiNavigationLogic");
const UiNavigationNewController_1 = require("./UiNavigationNewController");
const UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationViewHandle {
  constructor(i, t) {
    this.TagId = 0;
    this.ViewName = "";
    this.hbo = new Map();
    this.MainPanel = undefined;
    this.lbo = undefined;
    this._bo = undefined;
    this.ubo = undefined;
    this.cbo = true;
    this.dce = true;
    this.mbo = true;
    this.dbo = undefined;
    this.Cbo = "None";
    this.Vgl = false;
    this.fbo = Stats_1.Stat.Create("UiNavigationViewHandle");
    this.pbo = false;
    this.vbo = false;
    this.Mbo = false;
    this.Ebo = false;
    this.wgd = 0;
    this.Gfa = undefined;
    this.bIa = undefined;
    this.Oud = undefined;
    this.TagId = i;
    this.ViewName = t.ViewName;
    this.MainPanel = t;
    this.lbo = t;
    this.dbo = new NavigationScrollbarData_1.NavigationScrollbarData();
    this.qIa();
  }
  set State(i) {
    if (this.Cbo !== i && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiNavigation", 10, "当前界面句柄状态发生变更", ["当前状态", i], ["之前状态", this.Cbo]);
    }
    this.Cbo = i;
  }
  get State() {
    return this.Cbo;
  }
  Sbo() {
    this.State = "None";
    if (this.ubo !== undefined) {
      UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(undefined);
    }
    for (const i of this.hbo.values()) {
      i.GetPanelHandle().ResetGroupConfigMemory();
    }
  }
  GetDepth() {
    if (this.lbo.IsValid() && this.lbo.RootUIComp.IsValid()) {
      return this.lbo.RootUIComp.flattenHierarchyIndex;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "查找对象深度索引异常,对象无效", ["ViewName", this.ViewName]);
      }
      return 0;
    }
  }
  ybo() {
    return this.State === "HasNavigation";
  }
  Ibo() {
    return this.State === "NavigateNext" || this.State === "None";
  }
  HasNavigationButDisActive() {
    return this.State === "HasNavigationButDisActive";
  }
  IsNonNavigation() {
    return this.State === "NonNavigation";
  }
  SetIsInController(i) {
    if (this.cbo !== i && !(this.cbo = i, this.UpdateAllHotKeyVisibleMode(), i)) {
      this.Tbo();
    }
  }
  ResetStateIfNullFocus() {
    if (this.ubo === undefined && this.IsNonNavigation()) {
      this.State = "None";
    }
  }
  SetIsUsable(i) {
    if (!(this.mbo = i)) {
      this.Sbo();
    }
    UiNavigationViewManager_1.UiNavigationViewManager.MarkCalculateCurrentPanelDirty();
  }
  GetIsUsable() {
    return this.mbo;
  }
  SetIsActive(i) {
    if (this.dce !== i) {
      this.dce = i;
      UiNavigationViewManager_1.UiNavigationViewManager.MarkCalculateCurrentPanelDirty();
    }
  }
  GetIsActive() {
    return this.dce;
  }
  GetFocusListener() {
    return this.ubo;
  }
  GetActiveListenerListByTag(i) {
    var t = [];
    for (const e of this.hbo.values()) {
      for (const s of e.GetListenerListByTag(i)) {
        if (s.IsListenerActive()) {
          t.push(s);
        }
      }
    }
    return t;
  }
  GetActiveListenerByTag(i) {
    if (i === HotKeyViewDefine_1.EXIT_TAG) {
      return this.UQ_();
    } else {
      return this.DQ_(i);
    }
  }
  DQ_(i) {
    for (const t of this.hbo.values()) {
      for (const e of t.GetListenerListByTag(i)) {
        if (e.IsListenerActive()) {
          return e;
        }
      }
    }
  }
  UQ_() {
    var i = [];
    for (const t of this.hbo.values()) {
      for (const e of t.GetPanelHandle().GetListenerSet()) {
        if (e.IsListenerActive() && e.TagArray.Contains(HotKeyViewDefine_1.EXIT_TAG)) {
          i.push(e);
        }
      }
    }
    i.sort((i, t) => i.ExitTagPriority < t.ExitTagPriority ? -1 : 1);
    if (i.length > 0) {
      return i[0];
    } else {
      return undefined;
    }
  }
  GetActiveNavigationGroupByNameCheckAll(i) {
    let t = undefined;
    for (const e of this.hbo.values()) {
      t = e.GetNavigationGroup(i);
      if (UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(t)) {
        return t;
      }
    }
    return t;
  }
  GetNavigationGroupByName(i) {
    return this.lbo?.GetNavigationGroup(i);
  }
  Lbo() {
    for (const i of this.hbo.values()) {
      if (i.IsInActive) {
        this.lbo = i;
        break;
      }
    }
  }
  AddPanelConfig(i, t) {
    t.SetViewHandle(this);
    this.hbo.set(i, t);
    this.UpdateHotKeyVisibleMode(t);
    this.SetCurrentAddPanel(t);
  }
  DeletePanelConfig(i) {
    var t = this.hbo.get(i);
    if (t) {
      this.hbo.delete(i);
      if (this.lbo === t) {
        this.lbo = undefined;
        this.ubo = undefined;
        this.FindSuitableNavigation(false);
      }
      if (this._bo === t && (this._bo = undefined, this.ubo?.PanelConfig === t)) {
        this.ubo = undefined;
        this.FindSuitableNavigation(false);
      }
      t.SetViewHandle(undefined);
      this.Dbo(t.TsScrollBarGroup);
    }
  }
  GetPanelConfigMap() {
    return this.hbo;
  }
  GetPanelConfigByType(i) {
    for (const t of this.hbo.values()) {
      if (t.GetPanelHandle().GetType() === i) {
        return t;
      }
    }
  }
  GetCurrentPanel() {
    return this.lbo;
  }
  ClearPanelConfig() {
    this.hbo.clear();
    this.bIa?.Clear();
    this.lbo = undefined;
  }
  SetCurrentAddPanel(i) {
    this._bo = i;
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshPanelId = this.TagId;
  }
  HasAnyPanelActive() {
    let i = false;
    for (const t of this.hbo.values()) {
      if (t.IsInActive) {
        i = true;
        break;
      }
    }
    return i;
  }
  Rbo() {
    this.dbo.ResumeLastListener();
    var i = this.cXn();
    if (i) {
      this.State = "HasNavigation";
      UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(i);
    } else {
      this.State = "None";
      this.ubo = undefined;
    }
  }
  cXn() {
    if (this.ubo?.IsValid()) {
      if (this.ubo.IsInScrollOrLayoutCanFocus()) {
        return this.ubo;
      }
      var e = this.ubo.GetNavigationGroup();
      var s = this.ubo.GetScrollOrLayoutActor();
      for (let i = 0, t = e.ListenerList.length; i < t; ++i) {
        var a = e.ListenerList[i];
        if (a.IsScrollOrLayoutActor() && (!s || a.GetScrollOrLayoutActor() === s) && a.IsInScrollOrLayoutCanFocus()) {
          return a;
        }
      }
      if (this.ubo.IsListenerActive()) {
        return this.ubo;
      } else {
        return undefined;
      }
    }
  }
  Tbo() {
    if (this.ybo()) {
      this.State = "HasNavigationButDisActive";
      ModelManager_1.ModelManager.UiNavigationModel?.SetCursorFollowItem(undefined);
    }
  }
  FindDefaultNavigation() {
    if (this.HasNavigationButDisActive()) {
      this.Rbo();
    } else if (this.Ibo()) {
      this.FindSuitableNavigation(true);
    }
  }
  FindSuitableNavigation(i) {
    if (!this.MainPanel?.IsGamepadControlMouse) {
      if (!this.lbo || !!this.Vgl) {
        this.Vgl = false;
        this.Lbo();
      }
      if (this.lbo) {
        if (this.ubo) {
          this.State = "HasNavigation";
        } else {
          this.lbo.FindSuitableNavigation(i);
          if (this.IsNonNavigation()) {
            this.MarkRefreshHotKeyDirty();
            this.Ubo(this.lbo, i);
          }
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "找不到合适的导航面板", ["ViewName", this.ViewName]);
      }
    }
  }
  FindAddPanelConfigNavigation() {
    if (this.IsNonNavigation() && this._bo && (this._bo.FindSuitableNavigation(false), this.IsNonNavigation())) {
      this.Ubo(this._bo, false);
    }
  }
  Ubo(i, t) {
    if (i.FirstFindFromSubPanelWhenFindNone) {
      for (const e of this.hbo.values()) {
        if (e !== i && e !== this.MainPanel) {
          if (!this.IsNonNavigation()) {
            break;
          }
          e.FindSuitableNavigation(t);
        }
      }
      if (this.IsNonNavigation()) {
        this.MainPanel?.FindSuitableNavigation(t);
      }
    } else {
      for (const s of this.hbo.values()) {
        if (s !== i) {
          if (!this.IsNonNavigation()) {
            break;
          }
          s.FindSuitableNavigation(t);
        }
      }
    }
  }
  NotifySuitableNavigation(i) {
    if (i.IsFindNavigation()) {
      this.State = "HasNavigation";
      UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(i.Listener);
    } else if (i.IsNotFindNavigation()) {
      if (this.mbo) {
        this.State = "NonNavigation";
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(i.Listener);
      } else {
        this.Sbo();
      }
    } else {
      if (this.ubo) {
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(i.Listener);
      }
      this.State = "NavigateNext";
    }
  }
  MarkRefreshScrollDataDirty() {
    this.pbo = true;
  }
  Nfa() {
    if (this.pbo) {
      this.pbo = false;
      var i = [];
      for (const t of this.hbo.values()) {
        if (t.TsScrollBarGroup) {
          i.push(t.TsScrollBarGroup);
        }
      }
      this.Abo(i);
      this.MarkRefreshHotKeyDirty();
    }
  }
  Abo(i) {
    this.dbo.AddScrollbar(i);
  }
  Dbo(i) {
    this.dbo.DeleteScrollbar(i);
  }
  FindNextScrollData() {
    this.dbo?.FindNextScrollbar();
  }
  TryFindScrollData() {
    this.dbo?.TryFindScrollbar();
  }
  GetScrollbarData() {
    return this.dbo;
  }
  UpdateFocus(i) {
    var t;
    if (!this.HasGamepadControlMouse()) {
      t = this.ubo === i;
      if (this.ubo && !t) {
        this.ubo.ResetNavigationState();
      }
      if (this.ubo = i) {
        this.lbo = i.PanelConfig;
      }
      if (this.cbo && (ModelManager_1.ModelManager.UiNavigationModel?.IsOpenLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("UiNavigation", 10, "设置当前的导航对象", ["DisplayName", i?.RootUIComp.displayName], ["ViewName", this.ViewName], ["Path", i ? UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(i.GetOwner()) : ""]), UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(i), i)) {
        this.State = "HasNavigation";
        i.ActiveNavigationState(t);
      }
      this.MarkRefreshHotKeyDirty();
    }
  }
  ResetNavigationListener() {
    this.Sbo();
    this.MarkResetCurrentPanelDirty();
    this.ClearDynamicScrollViewNavigationContext();
  }
  MarkResetCurrentPanelDirty() {
    this.Vgl = true;
  }
  get IsListenerCanFocusByPanelConfig() {
    return UiNavigationViewManager_1.UiNavigationViewManager.CanFocusViewHandle(this);
  }
  UpdateHotKeyVisibleMode(i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiNavigation", 10, "界面句柄刷新快捷键表现", ["是否激活", this.cbo], ["名字", this.ViewName]);
    }
    if (this.cbo) {
      i.SetHotKeyVisibleMode(4, true);
    } else {
      i.SetHotKeyVisibleMode(4, false);
    }
    this.MarkRefreshHotKeyDirty();
  }
  UpdateAllHotKeyVisibleMode() {
    for (const i of this.hbo.values()) {
      this.UpdateHotKeyVisibleMode(i);
    }
  }
  Pbo() {
    if (this.vbo) {
      this.vbo = false;
      for (const i of this.hbo.values()) {
        i.RefreshHotKeyComponents();
      }
    }
  }
  MarkRefreshHotKeyDirty() {
    this.vbo = true;
  }
  xbo() {
    if (this.Mbo) {
      this.Mbo = false;
      for (const i of this.hbo.values()) {
        i.RefreshHotKeyTextId();
      }
    }
  }
  MarkRefreshHotKeyTextIdDirty() {
    this.Mbo = true;
  }
  wbo() {
    if (this.Ebo) {
      this.Ebo = false;
      this.Sbo();
      this.FindSuitableNavigation(false);
    }
  }
  MarkRefreshNavigationDirty(i = 0) {
    this.wgd = i;
    this.Ebo = true;
  }
  ResetNavigationDirty(i = 0) {
    if (this.wgd === 0 || i === 0 || this.wgd === i) {
      this.Ebo = false;
    }
  }
  Ffa() {
    if (this.Gfa !== undefined) {
      if (this.Gfa.IsValid()) {
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(this.Gfa);
      }
      this.Gfa = undefined;
    }
  }
  MarkSwitchNavigationFocusDirty(i) {
    this.Gfa = i;
  }
  qIa() {
    if (this.HasGamepadControlMouse() && (this.bIa = new GamepadControlMouse_1.GamepadControlMouse(this.MainPanel.GamepadMouseItem, this), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("UiNavigation", 10, "UiNavigation:GamepadControlMouse 初始化手柄控制鼠标", ["ViewName", this.ViewName]);
    }
  }
  GIa(i) {
    this.bIa?.Tick(i);
  }
  HasGamepadControlMouse() {
    return this.MainPanel?.IsGamepadControlMouse ?? false;
  }
  CanOverridePositionByGamepad(i) {
    this.bIa?.CanOverridePosition(i);
  }
  SetGamepadMouseMoveForward(i) {
    this.bIa?.MoveForwardByGamepad(i);
  }
  SetGamepadMouseMoveRight(i) {
    this.bIa?.MoveRightByGamepad(i);
  }
  SetGamepadMouseTrigger(i) {
    this.bIa?.TriggerByGamepad(i);
  }
  UpdateMousePositionByItem(i) {
    this.bIa?.UpdateMousePositionByItem(i);
  }
  SetDynamicScrollViewNavigationContext(i) {
    this.Oud ||= i;
  }
  ClearDynamicScrollViewNavigationContext() {
    this.Oud = undefined;
  }
  get IsWaitToFindDynamicGrid() {
    return this.Oud !== undefined;
  }
  GetDynamicScrollViewNavigationContext() {
    return this.Oud;
  }
  TickViewHandle(i) {
    this.fbo.Start();
    this.wbo();
    this.Pbo();
    this.xbo();
    this.Nfa();
    this.Ffa();
    this.GIa(i);
    this.fbo.Stop();
  }
}
exports.UiNavigationViewHandle = UiNavigationViewHandle;
//# sourceMappingURL=UiNavigationViewHandle.js.map