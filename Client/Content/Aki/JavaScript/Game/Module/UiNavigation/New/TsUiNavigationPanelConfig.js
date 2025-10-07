"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiNavigationPanelConfig = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const UiNavigationUtil_1 = require("../UiNavigationUtil");
const FindNavigationResult_1 = require("./FindNavigationResult");
const NavigationGroup_1 = require("./NavigationGroup");
const NavigationPanelHandleCreator_1 = require("./PanelHandle/NavigationPanelHandleCreator");
const UiNavigationModeModule_1 = require("./UiNavigationModeModule");
class TsUiNavigationPanelConfig extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.ViewName = "";
    this.Independent = true;
    this.IsChildPanel = false;
    this.DefaultNavigationActor = undefined;
    this.DynamicListenerConfigMap = new UE.TMap();
    this.NormalGroup = undefined;
    this.BookmarkGroup = undefined;
    this.ScrollBarGroup = undefined;
    this.AllowNavigateInKeyBoard = false;
    this.FirstFindFromSubPanelWhenFindNone = false;
    this.InteractiveTag = "";
    this.TsScrollBarGroup = undefined;
    this.ViewHandle = undefined;
    this.IsInActive = false;
    this.PanelHandle = undefined;
    this.ViewHandleCacheFunctionList = [];
    this.IncId = 0;
    this.FindAction = undefined;
    this.DynamicListenerIndexMap = new Map();
    this.HotKeyItemSet = undefined;
    this.CacheHotKeyStateMap = undefined;
    this.GamepadMouseActor = undefined;
    this.GamepadMouseItemInternal = undefined;
  }
  Constructor() {
    this.TsScrollBarGroup = undefined;
    this.ViewHandle = undefined;
    this.IsInActive = false;
    this.PanelHandle = undefined;
    this.ViewHandleCacheFunctionList = [];
    this.IncId = 0;
    this.FindAction = undefined;
    this.DynamicListenerIndexMap = new Map();
    this.HotKeyItemSet = undefined;
    this.CacheHotKeyStateMap = undefined;
    this.GamepadMouseItemInternal = undefined;
  }
  AwakeBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.InitDefaultParam();
      this.InitDynamicListenerIndexMap();
      this.InitPanelHandle();
    }
  }
  StartBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.NavigationViewCreate();
    }
  }
  OnEnableBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.IsInActive = true;
      this.HandleAddPanel();
      this.HandleUIActivePanel();
      this.HandleChildUIActivePanel();
    }
  }
  OnDisableBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.IsInActive = false;
      this.HandleAddPanel();
      this.HandleUIActivePanel();
      this.HandleChildUIActivePanel();
    }
  }
  HandleUIActivePanel() {
    if (this.Independent) {
      this.HandleViewHandleFunction(() => {
        this.ViewHandle?.SetIsActive(this.IsInActive);
      });
    }
  }
  HandleAddPanel() {
    if (this.IsInActive) {
      this.ViewHandle?.SetCurrentAddPanel(this);
    }
  }
  HandleChildUIActivePanel() {
    if (this.IsChildPanel && this.Independent) {
      this.ViewHandle?.SetIsUsable(this.IsInActive);
    }
  }
  OnDestroyBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.PanelHandle.Clear();
      this.NavigationViewDestroy();
      this.ViewHandle = undefined;
    }
  }
  InitDefaultParam() {
    this.HotKeyItemSet = new Set();
  }
  InitDynamicListenerIndexMap() {
    this.DynamicListenerIndexMap = new Map();
    for (let i = 0, t = this.DynamicListenerConfigMap.Num(); i < t; ++i) {
      var s = this.DynamicListenerConfigMap.GetKey(i);
      var s = this.DynamicListenerConfigMap.Get(s);
      if (s) {
        this.DynamicListenerIndexMap.set(s.Index, s.NeedWaitRegister);
      }
    }
  }
  NavigationViewCreate() {
    this.IncId = ++UiNavigationUtil_1.UiNavigationUtil.IncId;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationViewCreate, this.IncId, this.GetOwner());
  }
  NavigationViewDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationViewDestroy, this.IncId, this.GetOwner());
  }
  GetGroupMap() {
    var s = new Map();
    for (let i = 0, t = this.NormalGroup.Num(); i < t; ++i) {
      var e = this.NormalGroup.Get(i);
      e.GroupType = 0;
      var o = new NavigationGroup_1.NavigationGroup(e);
      s.set(e.GroupName, o);
    }
    for (let i = 0, t = this.BookmarkGroup.Num(); i < t; ++i) {
      var a = this.BookmarkGroup.Get(i);
      a.GroupType = 1;
      var n = new NavigationGroup_1.NavigationGroup(a);
      s.set(a.GroupName, n);
    }
    if (this.ScrollBarGroup) {
      this.ScrollBarGroup.GroupType = 2;
      this.TsScrollBarGroup = new NavigationGroup_1.NavigationGroup(this.ScrollBarGroup);
      s.set(this.ScrollBarGroup.GroupName, this.TsScrollBarGroup);
    }
    return s;
  }
  InitPanelHandle() {
    this.PanelHandle = NavigationPanelHandleCreator_1.NavigationPanelHandleCreator.GetPanelHandle(this.InteractiveTag);
    this.PanelHandle.Init();
    this.PanelHandle.SetGroupMap(this.GetGroupMap());
    this.PanelHandle.SetDefaultNavigationListenerList(this.DefaultNavigationActor);
  }
  HandleViewHandleFunction(i) {
    if (this.ViewHandle) {
      i();
    } else {
      this.ViewHandleCacheFunctionList ||= [];
      this.ViewHandleCacheFunctionList.push(i);
    }
  }
  ExecuteViewHandleFunction() {
    if (this.ViewHandleCacheFunctionList) {
      for (const i of this.ViewHandleCacheFunctionList) {
        i();
      }
      this.ViewHandleCacheFunctionList = [];
    }
  }
  RegisterNavigationListener(i) {
    var t;
    this.PanelHandle.AddListener(i);
    i.GetNavigationComponent().SetPanelHandle(this.PanelHandle);
    i.GetNavigationComponent().Start();
    if (!StringUtils_1.StringUtils.IsEmpty(i.GroupName)) {
      if (t = this.PanelHandle.GetNavigationGroup(i.GroupName)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiNavigation", 10, "加入监听组件到导航组", ["导航组名字", i.GroupName], ["DisplayName", i.RootUIComp.displayName]);
        }
        t.AddListener(i);
        if (t.GroupType === 2) {
          this.HandleViewHandleFunction(() => {
            this.ViewHandle?.MarkRefreshScrollDataDirty();
          });
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiNavigation", 10, "导航监听组件找不到对应的导航组", ["导航组名字", i.GroupName], ["Path", UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(i.RootUIComp.GetOwner())]);
      }
    }
  }
  DynamicListenerConfigHandle(i) {
    var t = i.DynamicTag;
    if (!StringUtils_1.StringUtils.IsBlank(t) && !StringUtils_1.StringUtils.IsBlank(i.GroupName)) {
      if (this.PanelHandle.GetNavigationGroup(i.GroupName)) {
        if (t = this.DynamicListenerConfigMap.Get(t)) {
          if (t.LayoutActor) {
            i.LayoutActor = t.LayoutActor;
          }
          if (t.ScrollActor) {
            i.ScrollViewActor = t.ScrollActor;
          }
          this.PanelHandle.ReplaceDefaultNavigationListener(i, t.Index);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiNavigation", 10, "导航监听组件找不到对应的动态配置", ["导航组名字", i.GroupName], ["ViewName", this.ViewName]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiNavigation", 10, "导航监听组件找不到对应的导航组", ["导航组名字", i.GroupName], ["ViewName", this.ViewName]);
      }
    }
  }
  UnRegisterNavigationListener(s) {
    this.PanelHandle.DeleteListener(s);
    var e = this.PanelHandle.GetNavigationGroup(s.GroupName);
    if (e) {
      for (let i = 0, t = e.ListenerList.length; i < t; ++i) {
        if (e.ListenerList[i].GetOwner() === s.GetOwner()) {
          e.RemoveListenerByIndex(i);
          break;
        }
      }
    }
  }
  SetViewHandle(i) {
    this.ViewHandle = i;
    this.ExecuteViewHandleFunction();
  }
  GetNavigationGroup(i) {
    return this.PanelHandle.GetNavigationGroup(i);
  }
  GetFocusListener() {
    return this.ViewHandle?.GetFocusListener();
  }
  GetPanelHandle() {
    return this.PanelHandle;
  }
  CommonFindNavigationLogic(i) {
    if (this.IsAllowNavigate()) {
      if (this.RootUIComp.IsUIActiveInHierarchy()) {
        if (this.FindAction) {
          this.FindAction.FindNavigation(i);
          if (i.IsFinishFind()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("UiNavigation", 10, "结束导航行为", ["动作", this.FindAction.constructor.name]);
            }
            this.FindAction = undefined;
          }
        } else {
          if (this.ViewHandle?.IsWaitToFindDynamicGrid) {
            var t = this.ViewHandle.GetDynamicScrollViewNavigationContext();
            var s = t.ScrollView;
            if (!s.IsAllDisplayItemUpdateCompleted()) {
              i.Result = 7;
              return;
            }
            var e = UiNavigationModeModule_1.UiNavigationModeModule.FindDynamicScrollViewNavigationComponent(t);
            if (e?.IsCanFocus()) {
              i.Result = 1;
              i.Listener = e;
              s.NavigateScrollToUIItem(e.RootUIComp, t.Reversed, t.WrapMode);
              this.ViewHandle.ClearDynamicScrollViewNavigationContext();
              return;
            }
            if (t.LastListener?.IsCanFocus()) {
              i.Result = 1;
              i.Listener = t.LastListener;
              this.ViewHandle.ClearDynamicScrollViewNavigationContext();
              return;
            }
          }
          i.Result = 0;
        }
      } else {
        i.Result = 2;
      }
    } else {
      i.Result = 2;
    }
  }
  CommonFindNavigationByListener(t, s, i) {
    if (s) {
      let i = s;
      if (s.IsScrollOrLayoutActor()) {
        if (!s.IsScrollOrLayoutActive()) {
          t.Result = 0;
          return;
        }
        if (s.IsInScrollOrLayoutAnimation()) {
          t.Result = 4;
          return;
        }
        if (s.HasDynamicScrollView()) {
          if (!s.ScrollView.IsAllDisplayItemUpdateCompleted()) {
            t.Result = 7;
            return;
          }
        }
        var e = this.PanelHandle.GetLoopOrLayoutListener(s);
        if (!e) {
          t.Result = 0;
          return;
        }
        i = e;
      } else if (s.GetNavigationGroup()?.SuitableListenerByNoDynamic && (e = this.PanelHandle.GetSuitableListenerWithoutLayout(s))) {
        i = e;
      }
      if (i.IsCanFocus()) {
        if (i.IsRegisterToPanelConfig()) {
          t.Result = 1;
          t.Listener = i;
        } else {
          t.Result = 5;
        }
      } else {
        t.Result = 0;
      }
    } else {
      t.Result = i ? 6 : 0;
    }
  }
  FindSuitableNavigation(i) {
    var s = new FindNavigationResult_1.FindNavigationResult();
    this.CommonFindNavigationLogic(s);
    if (s.Result !== 0) {
      this.PanelHandle?.NotifyFindResult(s);
      this.ViewHandle?.NotifySuitableNavigation(s);
    } else {
      var e = this.PanelHandle.GetSuitableNavigationListenerList(i);
      for (let i = 0, t = e.length; i < t; ++i) {
        var o = e[i];
        var a = this.DynamicListenerIndexMap.get(i) ?? true;
        this.CommonFindNavigationByListener(s, o, a);
        if (s.Result !== 0) {
          break;
        }
      }
      if (s.Result === 0) {
        s.Result = 2;
      }
      this.PanelHandle.NotifyFindResult(s);
      this.ViewHandle.NotifySuitableNavigation(s);
    }
  }
  SetFindNavigationAction(i) {
    this.FindAction = i;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "新增导航行为", ["动作", i.constructor.name]);
    }
  }
  CheckReFindCondition() {
    return !!this.ViewHandle && !(!this.IsInActive && this.Independent ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiNavigation", 10, "[ReFindNavigation]独立界面刚刚隐藏,触发导航对象取消不做通知处理"), 1) : this.ViewHandle.HasNavigationButDisActive() ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiNavigation", 10, "[ReFindNavigation]界面已经处于HasNavigationButDisActive状态,触发导航对象取消不做通知处理"), 1) : !this.Independent && !this.ViewHandle.GetIsActive());
  }
  ReFindNavigation() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiNavigation", 10, "触发导航的重新查找");
    }
    if (this.CheckReFindCondition()) {
      this.ViewHandle.MarkRefreshNavigationDirty();
    }
  }
  ReFindScrollbar() {
    if (this.ViewHandle) {
      this.ViewHandle.FindNextScrollData();
    }
  }
  TryFindScrollbar() {
    if (this.ViewHandle) {
      this.ViewHandle.TryFindScrollData();
    }
  }
  FindNavigationInNoneState() {
    if (this.ViewHandle && this.ViewHandle.IsNonNavigation()) {
      this.ViewHandle.MarkResetCurrentPanelDirty();
      this.ViewHandle.MarkRefreshNavigationDirty();
    }
  }
  IsAllowNavigate() {
    var i = Info_1.Info.IsInGamepad() ?? false;
    return this.AllowNavigateInKeyBoard || i;
  }
  AddHotKeyItem(i) {
    this.HotKeyItemSet.add(i);
    this.HandleAsyncHotKeyState(i);
  }
  HandleAsyncHotKeyState(i) {
    for (var [t, s] of this.GetOrCreateCacheHotKeyStateMap()) {
      for (const e of i.GetHotKeyComponentArray()) {
        e.SetVisibleMode(t, s);
        e.RefreshSelfHotKeyState(this.ViewHandle);
        e.RefreshSelfHotKeyText(this.ViewHandle);
      }
    }
  }
  GetOrCreateCacheHotKeyStateMap() {
    this.CacheHotKeyStateMap ||= new Map();
    return this.CacheHotKeyStateMap;
  }
  DeleteKeyItem(i) {
    this.HotKeyItemSet.delete(i);
  }
  SetHotKeyVisibleMode(i, t) {
    this.GetOrCreateCacheHotKeyStateMap().set(i, t);
    if (this.HotKeyItemSet) {
      for (const s of this.HotKeyItemSet) {
        for (const e of s.GetHotKeyComponentArray()) {
          e.SetVisibleMode(i, t);
        }
      }
    }
  }
  NotifyListenerFocus(i) {
    if (this.ViewHandle?.IsListenerCanFocusByPanelConfig && this.IsAllowNavigate()) {
      this.ViewHandle.UpdateFocus(i);
    }
  }
  UpdateHotKeyTextForce(i, t) {
    for (const e of this.HotKeyItemSet) {
      for (const o of e.GetHotKeyComponentArray()) {
        var s = o.GetBindButtonTag();
        if (i.Contains(s)) {
          o.SetHotKeyDescTextForce(t);
        }
      }
    }
  }
  GetListenerListByTag(i) {
    return this.PanelHandle.GetListenerListByTag(i);
  }
  RefreshHotKeyComponents() {
    if (this.HotKeyItemSet) {
      for (const i of this.HotKeyItemSet) {
        for (const t of i.GetHotKeyComponentArray()) {
          t.RefreshSelfHotKeyState(this.ViewHandle);
          t.RefreshSelfHotKeyText(this.ViewHandle);
        }
      }
    }
  }
  RefreshHotKeyTextId() {
    if (this.HotKeyItemSet) {
      for (const i of this.HotKeyItemSet) {
        for (const t of i.GetHotKeyComponentArray()) {
          t.RefreshSelfHotKeyText(this.ViewHandle);
        }
      }
    }
  }
  get IsGamepadControlMouse() {
    return !!this.Independent && !!this.GamepadMouseActor && this.GamepadMouseActor.IsValid();
  }
  get GamepadMouseItem() {
    this.GamepadMouseItemInternal ||= this.GamepadMouseActor?.GetComponentByClass(UE.UIItem.StaticClass());
    return this.GamepadMouseItemInternal;
  }
  MarkToFindDynamicGrid(i) {
    this.ViewHandle?.SetDynamicScrollViewNavigationContext(i);
    this.ViewHandle?.MarkRefreshNavigationDirty();
  }
}
exports.TsUiNavigationPanelConfig = TsUiNavigationPanelConfig;
exports.default = TsUiNavigationPanelConfig; //# sourceMappingURL=TsUiNavigationPanelConfig.js.map