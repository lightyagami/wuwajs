"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiManager = undefined;
const cpp_1 = require("cpp");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Time_1 = require("../../Core/Common/Time");
const EventCSharpBridge_1 = require("../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController");
const UiCameraAnimationController_1 = require("../Module/UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../Module/UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../Module/UiComponent/UiSceneManager");
const UiNavigationViewManager_1 = require("../Module/UiNavigation/New/UiNavigationViewManager");
const LguiUtil_1 = require("../Module/Util/LguiUtil");
const UiPopFrameView_1 = require("./Base/UiPopFrameView");
const UiTimeDilation_1 = require("./Base/UiTimeDilation");
const UiViewFloatContainer_1 = require("./Container/Float/UiViewFloatContainer");
const UiViewListContainer_1 = require("./Container/UiViewListContainer");
const UiViewPlotStackContainer_1 = require("./Container/UiViewPlotStackContainer");
const UiViewSetContainer_1 = require("./Container/UiViewSetContainer");
const UiViewStackContainer_1 = require("./Container/UiViewStackContainer");
const CsUiDefine_1 = require("./CsUiProxy/Define/CsUiDefine");
const CsUiLife_1 = require("./CsUiProxy/Define/CsUiLife");
const UiConfig_1 = require("./Define/UiConfig");
const UiLayerType_1 = require("./Define/UiLayerType");
const LguiEventSystemManager_1 = require("./LguiEventSystem/LguiEventSystemManager");
const UiActorPool_1 = require("./UiActorPool");
const UIGlobalMaterialParam_1 = require("./UIGlobalMaterialParam");
const UiLayer_1 = require("./UiLayer");
const UiModel_1 = require("./UiModel");
class UiManager {
  static get IsInited() {
    return UiManager.Ife === 2;
  }
  static pF_(i, e = undefined, a, r, n = true, o = 0, t = false) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenViewBegined, i);
    UiManager.OpenViewAsync(i, e, a, n, o, t).then(e => {
      if (e !== undefined) {
        r?.(true, e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "[OpenView]流程执行成功", ["ViewName", i], ["ViewId", e]);
        }
      } else {
        r?.(false, 0);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenViewFail, i);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "[OpenView]流程执行失败", ["ViewName", i]);
        }
      }
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 16, "[OpenView]流程执行异常", e, ["error", e.message], ["ViewName", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[OpenView]流程执行异常", ["ViewName", i], ["error", e]);
      }
      r?.(false, 0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenViewFail, i);
    });
  }
  static OpenView(e, i = undefined, a) {
    UiManager.pF_(e, i, undefined, a);
  }
  static OpenViewWithLayer(e, i, a = undefined, r) {
    UiManager.pF_(e, a, i, r);
  }
  static OpenViewByPlot(e, i = undefined, a) {
    if ((UiConfig_1.UiConfig.TryGetViewInfo(e).Type & UiLayerType_1.NORMAL_PLOT_CONTAINER_TYPE) > 0) {
      UiManager.OpenViewWithLayer(e, UiLayerType_1.ELayerType.Plot, i, a);
    } else {
      UiManager.OpenView(e, i, a);
    }
  }
  static async OpenViewAsync(e, i = undefined, a, r = true, n = 0, o = false) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[OpenViewAsync]请求打开界面", ["界面名称", e]);
    }
    var t = !!i && i?.IsMultipleView;
    if (UiManager.iVe(e, t, i)) {
      t = UiManager.BCr(e, i, a, o);
      if (r) {
        o = t.GetViewId() - 1;
        EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.OpenViewRedirectToCs, e, o, n, a ?? 0);
      }
      if (t) {
        t.OpenParam = i;
        t.OpenPromise = new CustomPromise_1.CustomPromise();
        r = await Promise.all([UiManager.bCr.get(t.Info.GetContainerLayerType()).OpenViewAsync(t), t.OpenPromise.Promise]);
        t.OpenPromise = undefined;
        if (r[1]) {
          t.TryEmitInterruptOpExitView();
          if (t.Info?.IsFullScreen === true) {
            cpp_1.FKuroPerfSightHelper.BeginExtTag(`UiViewInFullScreen[${t.Info.Name}]`);
          } else if (t.Info?.IsFullScreen === false) {
            cpp_1.FKuroPerfSightHelper.BeginExtTag(`UiViewInWindow[${t.Info.Name}]`);
          }
          return t.GetViewId();
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "[OpenViewAsync]打开界面失败, 界面在缓存队列中被清理", ["name", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[OpenViewAsync]打开界面失败, 注册界面失败", ["name", e]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[OpenViewAsync]打开界面失败, 不满足界面打开条件", ["界面名称", e]);
    }
  }
  static CloseView(i, a, e = true) {
    UiManager.CloseViewAsync(i, e).then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "[CloseView]流程执行成功", ["ViewName", i]);
      }
      a?.(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 16, "[CloseView]流程执行异常", e, ["error", e.message], ["ViewName", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[CloseView]流程执行异常", ["ViewName", i], ["error", e]);
      }
      a?.(false);
    });
  }
  static async CloseViewAsync(e, i = true) {
    var a = this.Ncr.get(e);
    if (!a) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[CloseViewAsync]关闭界面失败, 界面不存在", ["界面名称", e]);
      }
      return false;
    }
    const r = [];
    a.forEach(e => r.push(UiManager.CloseViewImplementAsync(e, i)));
    return (await Promise.all(r)).every(e => e);
  }
  static CloseViewById(i, a) {
    UiManager.CloseViewByIdAsync(i).then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "[CloseViewById]流程执行成功", ["viewId", i]);
      }
      a?.(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 16, "[CloseViewById]流程执行异常", e, ["error", e.message], ["viewId", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[CloseViewById]流程执行异常", ["viewId", i], ["error", e]);
      }
      a?.(false);
    });
  }
  static async CloseViewByIdAsync(e) {
    var i = this.qCr.get(e);
    if (i) {
      return UiManager.CloseViewImplementAsync(i);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[CloseViewByIdAsync]关闭界面失败, 界面不存在", ["viewId", e]);
      }
      return false;
    }
  }
  static async CloseViewImplementAsync(e, i = true, a = false) {
    var r = e.Info;
    if (i) {
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.CloseViewRedirectToCs, r.Name, e.GetViewId(), a);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[CloseViewAsync]请求关闭界面", ["界面名称", r.Name], ["ViewId", e.GetViewId()]);
    }
    if (e.OpenPromise) {
      e.OpenPromise.SetResult(true);
    }
    e.ClosePromise ||= new CustomPromise_1.CustomPromise();
    await UiManager.bCr.get(e.Info.GetContainerLayerType()).CloseViewAsync(e);
    await e.ClosePromise?.Promise;
    e.ClosePromise = undefined;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[CloseViewAsync]关闭界面成功", ["界面名称", r.Name], ["ViewId", e.GetViewId()]);
    }
    if (e.Info?.IsFullScreen === true) {
      cpp_1.FKuroPerfSightHelper.EndExtTag(`UiViewInFullScreen[${e.Info.Name}]`);
    } else if (e.Info?.IsFullScreen === false) {
      cpp_1.FKuroPerfSightHelper.EndExtTag(`UiViewInWindow[${e.Info.Name}]`);
    }
    return true;
  }
  static CloseAndOpenView(i, a, e = undefined, r, n = true) {
    UiManager.CloseAndOpenViewAsync(i, a, e, n).then(() => {
      r?.(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 16, "[CloseAndOpenView]流程执行异常", e, ["error", e.message], ["closeViewName", i], ["openViewName", a]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[CloseAndOpenView]流程执行异常", ["closeViewName", i], ["openViewName", a], ["error", e]);
      }
      r?.(false);
    });
  }
  static async CloseAndOpenViewAsync(e, i, a, r = true) {
    var n;
    var o;
    if (UiConfig_1.UiConfig.TryGetViewInfo(i).Type !== UiLayerType_1.ELayerType.Normal) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[CloseAndOpenViewAsync]非栈容器的界面不允许使用该接口");
      }
      return false;
    } else if (n = UiManager.GCr(e)) {
      o = !!a && a?.IsMultipleView;
      if (UiManager.iVe(i, o, a)) {
        (o = UiManager.BCr(i, a)).OpenParam = a;
        a = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal);
        if (r) {
          r = o.GetViewId() - 1;
          EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.CloseAndOpenRedirectToCs, e, i, r);
        }
        await a.CloseAndOpenNewAsync(n, o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "[CloseAndOpenView]流程执行成功", ["closeViewName", e], ["openViewName", i]);
        }
        return true;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "[CloseAndOpenView]流程执行失败, 不满足界面打开条件", ["closeViewName", e], ["openViewName", i]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[CloseAndOpenViewAsync]未找到待关闭界面", ["closeViewName", e]);
      }
      return false;
    }
  }
  static async PreOpenViewAsync(e, i = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[OpenViewAsync]请求预打开界面", ["界面名称", e]);
    }
    var a = UiManager.BCr(e);
    if (a) {
      if (i) {
        EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.PreOpenViewAsyncRedirectToCs, e, a.GetViewId() - 1);
      }
      a.OnPreOpen();
      UiManager.NCr.set(a.GetViewId(), a);
      await UiManager.bCr.get(a.Info.GetContainerLayerType()).PreOpenViewAsync(a);
      return a.GetViewId();
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 16, "[OpenViewAsync]打开界面失败, 注册界面失败", ["name", e]);
    }
  }
  static async OpenViewAfterPreOpenedAsync(e, i, a = true) {
    var r;
    var n;
    var o = UiManager.NCr.get(e);
    return !!o && !(r = o.Info.Name, Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 16, "[OpenViewAfterPreOpenedAsync](已预打开过)请求打开界面", ["界面名称", r]), n = !!i && i?.IsMultipleView, UiManager.iVe(r, n, i) ? (a && EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.OpenViewAfterPreOpenedAsyncToCs, e), o.OpenParam = i, o.OpenPromise = new CustomPromise_1.CustomPromise(), UiManager.RemovePreOpenView(e), await Promise.all([UiManager.bCr.get(o.Info.GetContainerLayerType()).OpenViewAfterPreOpenedAsync(o), o.OpenPromise.Promise]), o.OpenPromise = undefined) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 16, "[OpenViewAfterPreOpenedAsync](已预打开过)打开界面失败, 不满足界面打开条件", ["界面名称", r]), 1));
  }
  static RemovePreOpenView(e) {
    UiManager.NCr.delete(e);
  }
  static hPn() {
    for (const e of UiManager.NCr.values()) {
      try {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "[Clear] 尝试执行销毁的界面", ["Name", e.constructor.name], ["ComponentId", e.ComponentId]);
        }
        e.OnOpenAfterPreOpened();
        e.ClearAsync();
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 10, "界面同步关闭异常,业务变量可能未初始化完成,需要关注", e, ["error", e.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 10, "界面同步关闭异常,业务变量可能未初始化完成,需要关注", ["error", e]);
        }
      }
    }
    UiManager.NCr.clear();
  }
  static IsViewShow(e) {
    e = UiManager.Ncr.get(e);
    if (e) {
      for (const i of e) {
        if (i.IsPreOpening) {
          return false;
        }
        if (i.IsShowOrShowing) {
          return true;
        }
      }
    }
    return false;
  }
  static IsViewOpen(e) {
    e = UiManager.Ncr.get(e);
    if (e) {
      for (const i of e) {
        if (i.IsPreOpening) {
          return false;
        }
        if (i.WaitToDestroy) {
          return false;
        }
        if (!i.IsDestroyOrDestroying && !i.IsHideOrHiding) {
          return true;
        }
      }
    }
    return false;
  }
  static IsViewCreating(e) {
    e = UiManager.Ncr.get(e);
    if (e) {
      for (const i of e) {
        if (i.IsCreating) {
          return true;
        }
      }
    }
    return false;
  }
  static IsViewDestroying(e) {
    e = UiManager.Ncr.get(e);
    if (e) {
      for (const i of e) {
        if (i.IsDestroying) {
          return true;
        }
      }
    }
    return false;
  }
  static IsViewHide(e) {
    e = UiManager.Ncr.get(e);
    if (e) {
      for (const i of e) {
        if (i.IsHideOrHiding) {
          return true;
        }
      }
    }
    return false;
  }
  static OCr() {
    UiManager.bCr.clear();
    UiManager.bCr.set(UiLayerType_1.ELayerType.HUD, new UiViewSetContainer_1.UiViewSetContainer(UiModel_1.UiModel.HudMap));
    var e = new UiViewStackContainer_1.UiViewStackContainer(UiModel_1.UiModel.NormalStack);
    UiManager.bCr.set(UiLayerType_1.ELayerType.Normal, e);
    UiManager.bCr.set(UiLayerType_1.ELayerType.CG, e);
    UiManager.bCr.set(UiLayerType_1.ELayerType.Plot, new UiViewPlotStackContainer_1.UiViewPlotContainer(UiModel_1.UiModel.PlotNormalStack));
    UiManager.bCr.set(UiLayerType_1.ELayerType.Pop, new UiViewListContainer_1.UiViewListContainer(UiModel_1.UiModel.PopList));
    UiManager.bCr.set(UiLayerType_1.ELayerType.Float, new UiViewFloatContainer_1.UiViewFloatContainer(UiModel_1.UiModel.FloatQueueMap, UiModel_1.UiModel.ShowViewMap, UiModel_1.UiModel.HideViewMap));
    UiManager.bCr.set(UiLayerType_1.ELayerType.Guide, new UiViewListContainer_1.UiViewListContainer(UiModel_1.UiModel.GuideList));
    UiManager.bCr.set(UiLayerType_1.ELayerType.Loading, new UiViewSetContainer_1.UiViewSetContainer(UiModel_1.UiModel.LoadingMap));
    UiManager.bCr.set(UiLayerType_1.ELayerType.NetWork, new UiViewListContainer_1.UiViewListContainer(UiModel_1.UiModel.NetWorkList));
    if (!Info_1.Info.IsBuildShipping) {
      UiManager.bCr.set(UiLayerType_1.ELayerType.Debug, new UiViewSetContainer_1.UiViewSetContainer(UiModel_1.UiModel.DebugMap));
    }
  }
  static dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ExitNormalQueueState, UiManager.FCr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, UiManager.VCr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, UiManager.HCr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenViewRedirectToTs, UiManager.CsNotifyOpenTsView);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseViewRedirectToTs, UiManager.CsNotifyCloseTsView);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideViewRedirectToTs, UiManager.CsNotifyHideTsView);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PreOpenViewAsyncRedirectToTs, UiManager.sEm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsViewOnCreateAsync, UiManager.aEm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsBeforeStartAsync, UiManager.hEm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsOnBeforeHideAsync, UiManager.lEm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsOnPlayingStartSequenceAsync, UiManager._Em);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsOnPlayingCloseSequenceAsync, UiManager.uEm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsOnBeforeShowAsyncImplementImplement, UiManager.cEm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestTsOpenView, this.dEm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetToViewRedirectToTs, this.CsNotifyResetToView);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseAndOpenRedirectToTs, this.CloseAndOpenRedirectToTs);
  }
  static ResetToBattleView(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "重置回到主界面");
    }
    UiManager.bCr.get(UiLayerType_1.ELayerType.Pop).CloseAllView();
    UiManager.NormalResetToView(UiModel_1.UiModel.MainViewName, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResetToBattleView);
  }
  static NormalResetToView(i, a, e = true) {
    UiManager.NormalResetToViewAsync(i, e).then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "[NormalResetToView]流程执行成功", ["ViewName", i]);
      }
      a?.(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 16, "[NormalResetToView]流程执行异常", e, ["error", e.message], ["ViewName", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[NormalResetToView]流程执行异常", ["ViewName", i], ["error", e]);
      }
      a?.(false);
    });
  }
  static async NormalResetToViewAsync(e, i = true) {
    if (i) {
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.ResetToViewRedirectToCs, e);
    }
    var i = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal);
    var a = UiManager.GCr(e);
    if (a) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "[NormalResetToView]重置到界面", ["viewName", e]);
      }
      await i.ResetToViewAsync(a);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiCore", 16, "未找到待重置界面", ["viewName", e]);
    }
  }
  static CloseHistoryRingView(i, a) {
    UiManager.CloseHistoryRingViewAsync(i).then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "[CloseHistoryRingView]流程执行成功", ["ViewName", i]);
      }
      a?.(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 16, "[CloseHistoryRingView]流程执行异常", e, ["error", e.message], ["ViewName", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "[CloseHistoryRingView]流程执行异常", ["ViewName", i], ["error", e]);
      }
      a?.(false);
    });
  }
  static async CloseHistoryRingViewAsync(e) {
    var i = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal);
    if (i !== undefined) {
      await i.CloseHistoryRingViewAsync(e);
    }
  }
  static AddTickView(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[AddTickView] 添加界面Tick", ["name", e.constructor.name]);
    }
    UiManager.jCr.add(e);
  }
  static RemoveTickView(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[RemoveTickView] 移除界面Tick", ["name", e.constructor.name]);
    }
    UiManager.jCr.delete(e);
  }
  static BCr(i, a, r, n = false) {
    var o = UiConfig_1.UiConfig.TryGetViewInfo(i);
    if (o) {
      o.SetContainerLayerType(r);
      let e = CsUiDefine_1.CsUiDefine.IsRedirectToCs(i);
      if (n) {
        e = true;
      }
      var r = UiConfig_1.UiConfig.GetCsViewProxyInfo();
      var n = new (e ? r : o).Ctor(o);
      if (e) {
        n.CsUiLife = new CsUiLife_1.CsUiLife();
        n.IsCsViewProxy = true;
      }
      UiConfig_1.UiConfig.RewritePath(o, n, a);
      UiConfig_1.UiConfig.RewritePopFrameType(o, n, a);
      n.InitRootActorLoadInfo();
      if (o.CommonPopBg > 0 && !e) {
        r = new UiPopFrameView_1.UiPopFrameView(o);
        n.ChildPopView = r;
        n.AddChild(r);
      }
      UiManager.WCr(n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateViewInstance, n);
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 16, "界面信息viewInfo获取失败", ["name", i]);
    }
  }
  static KCr() {
    UiManager.bCr.get(UiLayerType_1.ELayerType.Float).StartWaitingNormalView();
  }
  static GCr(e) {
    e = this.Ncr.get(e);
    if (e && e.size !== 0) {
      for (const i of e.values()) {
        return i;
      }
    }
  }
  static async Initialize() {
    if (GlobalData_1.GlobalData.World) {
      if (UiManager.Ife === 0) {
        UiManager.IsClear = false;
        UiManager.Ife = 1;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "[Initialize]初始化UiManager");
        }
        await Promise.all([UiLayer_1.UiLayer.Initialize(), LguiEventSystemManager_1.LguiEventSystemManager.Initialize()]);
        await UiActorPool_1.UiActorPool.Init();
        UiManager.OCr();
        UiNavigationViewManager_1.UiNavigationViewManager.Initialize();
        await UIGlobalMaterialParam_1.UiGlobalMaterialParam.InitAsync();
        UiManager.dde();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiManagerInit);
        EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.OnTsUiManagerInit);
        UiManager.Ife = 2;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 16, "游戏世界不存在");
    }
  }
  static LockOpen() {
    LguiUtil_1.LguiUtil.SetActorIsPermanent(UiLayer_1.UiLayer.UiRoot, true, true);
    UiManager.QCr = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[UIManager.UnLockOpen] 禁止打开界面");
    }
  }
  static UnLockOpen() {
    UiManager.QCr = false;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[UIManager.UnLockOpen] 恢复打开界面");
    }
  }
  static get IsLockOpen() {
    return UiManager.QCr;
  }
  static async J$_(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[UIManager.ClearAsync] ClearNonNormalAndPlotContainerView");
    }
    for (var [i, a] of UiManager.bCr) {
      if (!((i & UiLayerType_1.NORMAL_PLOT_CONTAINER_TYPE) > 0)) {
        a.ClearContainer(e);
      }
    }
    var r = [];
    for (const n of UiManager.qCr.values()) {
      if (!n.IsCsViewProxy && !n.Info?.IsPermanent && !((n.Info.Type & UiLayerType_1.NORMAL_PLOT_CONTAINER_TYPE) > 0)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "[UIManager.ClearAsync] 需要等待销毁的界面-非stack plot容器", ["Name", n.constructor.name], ["ComponentId", n.ComponentId]);
        }
        r.push(n.DeadPromise?.Promise);
      }
    }
    await Promise.all(r);
  }
  static async Z$_(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[UIManager.ClearAsync] ClearNormalAndPlotContainerView");
    }
    var i = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal);
    if (UiModel_1.UiModel.PlotNormalStack.Size > 0) {
      UiManager.ResumeNormalContainerInClear();
    }
    UiManager.hPn();
    await i.BeforeClearContainerAsync(e);
    UiManager.bCr.get(UiLayerType_1.ELayerType.Plot).ClearContainer(e);
    i.ClearContainer(e);
    var a = [];
    for (const r of UiManager.qCr.values()) {
      if (!r.IsCsViewProxy && !r.Info.IsPermanent && !((r.Info.Type & UiLayerType_1.NORMAL_PLOT_CONTAINER_TYPE) <= 0) && (!e || !UiModel_1.UiModel.SeamlessStackWhileList.has(r.Info.Name))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "[UIManager.ClearAsync] 需要等待销毁的界面-Stack和Plot容器", ["Name", r.constructor.name], ["ComponentId", r.ComponentId]);
        }
        a.push(r.DeadPromise?.Promise);
      }
    }
    await Promise.all(a);
  }
  static async eW_(e) {
    if ((e &&= UiModel_1.UiModel.NormalStack.Peek()) && e.IsHideOrHiding) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 10, "[UIManager.ClearAsync] ResumeNormalViewInClear", ["ViewName", e.Info?.Name]);
      }
      await UiManager.bCr.get(UiLayerType_1.ELayerType.Normal).ShowViewByPlot();
    }
  }
  static tW_() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[UIManager.ClearAsync] ClearUiCameraAnimation");
    }
    try {
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Game", 3, "[Game.LeaveLevel] 调用UiCameraAnimationManager.ResetUiCameraAnimationManager异常。", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 3, "[Game.LeaveLevel] 调用UiCameraAnimationManager.ResetUiCameraAnimationManager异常。", ["error", e]);
      }
    }
  }
  static async ClearAsync(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[UIManager.ClearAsync] 清理UIManager 开始");
    }
    await this.J$_(e);
    await this.Z$_(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUiManagerClearAsync);
    UiActorPool_1.UiActorPool.ClearPool();
    UiSceneManager_1.UiSceneManager.Clear();
    this.tW_();
    UiManager.eW_(e);
    UiManager.IsClear = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[UIManager.ClearAsync] 清理UIManager 完成");
    }
  }
  static Tick(e) {
    UiManager.fbo.Start();
    var i = e * (Time_1.Time.InverseSelfCenteredTimeDilation ?? 1);
    for (const a of this.jCr) {
      a.Tick(i);
    }
    UiActorPool_1.UiActorPool.Tick(i);
    UiManager.fbo.Stop();
  }
  static AfterTick(e) {
    for (const i of this.jCr) {
      i.AfterTick(e);
    }
  }
  static iVe(e, i = false, a = undefined) {
    if (GlobalData_1.GlobalData.IsSceneClearing && !UiConfig_1.UiConfig.CanOpenWhileClearSceneViewNameSet.has(e)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[CanOpenView] 退出场景清理时不允许打开UI界面", ["ViewName", e]);
      }
      return false;
    }
    if (UiManager.QCr) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[CanOpenView] 无缝加载期间不允许打开UI界面", ["ViewName", e]);
      }
      return false;
    }
    var r = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (!r) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[CanOpenView] 界面配置不存在", ["ViewName", e]);
      }
      return false;
    }
    var n = (r.Type & UiLayerType_1.MULTIPLE_VIEW_TYPE) > 0;
    if (!n && !i && UiManager.IsViewOpen(e)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[CanOpenView] 界面重复打开", ["ViewName", e]);
      }
      return false;
    }
    if (r.ScenePointTag) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[CanOpenView] ScenePointTag不允许配置", ["ViewName", e]);
      }
      return false;
    }
    if (r.BeObstructView.length > 0) {
      for (const o of r.BeObstructView) {
        if (UiManager.IsViewShow(o)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 16, "[CanOpenView] 检测到表格配置了界面互斥", ["ViewName", e], ["ViewOpenCheck", o]);
          }
          return false;
        }
      }
    }
    if (r.FunctionCondition !== 0 && !ModelManager_1.ModelManager.FunctionModel.IsOpen(r.FunctionCondition)) {
      if ((n = ModelManager_1.ModelManager.FunctionModel.GetFunctionHitTextId(r.FunctionCondition)) && n.length > 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(n);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_200440_Text");
      }
      return false;
    }
    if (UiManager.XCr(e, false, a)) {
      return !!UiManager.XCr(e, true, a) || (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 16, "[CanOpenView] 外部注册的全局界面OpenView检查函数不通过", ["viewName", e]), false);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "[CanOpenView] 外部注册的单个界面OpenView检查函数不通过", ["viewName", e]);
      }
      return false;
    }
  }
  static AddOpenViewCheckFunction(e, i, a) {
    let r = UiManager.$Cr.get(e);
    if (!r) {
      r = new Map();
      UiManager.$Cr.set(e, r);
    }
    r.set(i, a);
  }
  static RemoveOpenViewCheckFunction(e, i) {
    var a = UiManager.$Cr.get(e);
    if (a && (a.delete(i), a.size === 0)) {
      UiManager.$Cr.delete(e);
    }
  }
  static XCr(e, i = false, a = undefined) {
    i = UiManager.$Cr.get(i ? "All" : e);
    if (i && i.size > 0) {
      for (var [r, n] of i) {
        if (!r(e, a)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 16, "外部注册的OpenView检查函数不通过", ["viewName", e], ["reason", n]);
          }
          return false;
        }
      }
    }
    return true;
  }
  static GetViewByName(e) {
    return UiManager.GCr(e);
  }
  static GetView(e) {
    return this.qCr.get(e);
  }
  static WCr(e) {
    UiManager.qCr.set(e.GetViewId(), e);
    var i = e.Info.Name;
    let a = UiManager.Ncr.get(i);
    if (!a) {
      a = new Set();
      UiManager.Ncr.set(i, a);
    }
    a.add(e);
  }
  static RemoveView(e) {
    var i;
    var a = UiManager.qCr.get(e);
    if (a && (UiManager.qCr.delete(e), e = a.Info.Name, i = UiManager.Ncr.get(e))) {
      i.delete(a);
      if (!i.size) {
        UiManager.Ncr.delete(e);
      }
    }
  }
  static RefreshByPureModeChanged() {
    var e = UiManager.bCr.get(UiLayerType_1.ELayerType.Float);
    if (e) {
      e.RefreshByPureModeChanged();
    }
  }
  static GmClearFloatContainer() {
    UiManager.bCr.get(UiLayerType_1.ELayerType.Float).ClearContainer();
  }
  static async PauseNormalContainer(e, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[OpenView]指定Plot层级打开界面,暂停Normal层级的表现");
    }
    var a = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal);
    await a.WaitSwitchToPlotPending();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[OpenView]指定Plot层级创建界面");
    }
    await e();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[OpenView]指定pop,normal层级隐藏界面");
    }
    var e = UiManager.bCr.get(UiLayerType_1.ELayerType.Pop);
    await Promise.all([e.HideView(), a.HideViewByPlot()]);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[OpenView]指定Plot层级显示界面");
    }
    UiTimeDilation_1.UiTimeDilation.TemporarySaveData();
    await i();
    UiCameraAnimationController_1.UiCameraAnimationController.ExitUiCameraMode();
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Normal, false);
  }
  static async ResumeNormalContainer(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[CloseView]指定Plot层级关闭界面,恢复Normal层级的表现");
    }
    UiTimeDilation_1.UiTimeDilation.RestoreSaveData();
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Normal, true);
    var i = UiManager.bCr.get(UiLayerType_1.ELayerType.Normal);
    UiCameraAnimationController_1.UiCameraAnimationController.EnterUiCameraMode();
    await i.ShowViewByPlot(e);
    UiManager.bCr.get(UiLayerType_1.ELayerType.Pop).ShowView();
  }
  static ResumeNormalContainerInClear() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "[UIManager.ClearAsync]ResumeNormalContainerInClear");
    }
    UiTimeDilation_1.UiTimeDilation.RestoreSaveData();
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Normal, true);
    UiManager.bCr.get(UiLayerType_1.ELayerType.Normal).TryUnlock();
  }
  static CheckIfCanShowPlotView() {
    var e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal);
    return !!e && (e = e.Info.Name, UiModel_1.UiModel.CanShowPlotViewWhiteList.has(e)) && this.IsViewShow(e);
  }
  static IsNormalContainerEmpty() {
    return UiManager.bCr.get(UiLayerType_1.ELayerType.Normal).IsViewPendingListEmpty();
  }
}
exports.UiManager = UiManager;
(_a = UiManager).Ife = 0;
UiManager.IsClear = false;
UiManager.bCr = new Map();
UiManager.$Cr = new Map();
UiManager.fbo = Stats_1.Stat.Create("UiManger");
UiManager.qCr = new Map();
UiManager.Ncr = new Map();
UiManager.jCr = new Set();
UiManager.NCr = new Map();
UiManager.CsNotifyOpenTsView = e => {
  UiManager.pF_(e, undefined, undefined, undefined, false);
};
UiManager.sEm = e => {
  UiManager.PreOpenViewAsync(e, false);
};
UiManager.CsNotifyCloseTsView = (e, i, a) => {
  if (a) {
    if (a = _a.GetView(i)) {
      _a.CloseViewImplementAsync(a, false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 16, "[CsNotifyCloseTsView]关闭界面失败, 界面不存在", ["viewId", i]);
    }
  } else {
    UiManager.CloseView(e, undefined, false);
  }
};
UiManager.CsNotifyHideTsView = (e, i) => {
  i = _a.GetView(i);
  if (i && (i.IsCreateOrCreating || i.IsShowOrShowing || i.IsStartOrStarting)) {
    i.HideAsync();
  }
};
UiManager.CsNotifyResetToView = e => {
  UiManager.NormalResetToView(e, undefined, false);
};
UiManager.CloseAndOpenRedirectToTs = (e, i) => {
  UiManager.CloseAndOpenView(e, i, undefined, undefined, false);
};
UiManager.aEm = (e, i) => {
  i = _a.GetView(i);
  if (i && i.CsUiLife) {
    i.CsUiLife.OnCreateAsyncPromise ||= new CustomPromise_1.CustomPromise();
    i.CsUiLife.OnCreateAsyncPromise.SetResult();
  }
};
UiManager.hEm = (e, i) => {
  i = _a.GetView(i);
  if (i && i.CsUiLife) {
    i.CsUiLife.OnBeforeStartAsyncPromise ||= new CustomPromise_1.CustomPromise();
    i.CsUiLife.OnBeforeStartAsyncPromise.SetResult();
  }
};
UiManager.lEm = (e, i) => {
  i = _a.GetView(i);
  if (i && i.CsUiLife) {
    i.CsUiLife.OnBeforeHideAsyncPromise ||= new CustomPromise_1.CustomPromise();
    i.CsUiLife.OnBeforeHideAsyncPromise.SetResult();
  }
};
UiManager._Em = (e, i) => {
  i = _a.GetView(i);
  if (i && i.CsUiLife) {
    i.CsUiLife.OnPlayingStartSequenceAsyncPromise ||= new CustomPromise_1.CustomPromise();
    i.CsUiLife.OnPlayingStartSequenceAsyncPromise.SetResult();
  }
};
UiManager.uEm = (e, i) => {
  i = _a.GetView(i);
  if (i && i.CsUiLife) {
    i.CsUiLife.OnPlayingCloseSequenceAsyncPromise ||= new CustomPromise_1.CustomPromise();
    i.CsUiLife.OnPlayingCloseSequenceAsyncPromise.SetResult();
  }
};
UiManager.cEm = (e, i) => {
  i = _a.GetView(i);
  if (i && i.CsUiLife) {
    i.CsUiLife.OnBeforeShowAsyncImplementImplementPromise ||= new CustomPromise_1.CustomPromise();
    i.CsUiLife.OnBeforeShowAsyncImplementImplementPromise.SetResult();
  }
};
UiManager.dEm = (e, i, a) => {
  _a.pF_(e, undefined, undefined, undefined, true, i, a);
};
UiManager.FCr = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("UiCore", 16, "退出队列状态,重置回到主界面");
  }
  UiManager.KCr();
};
UiManager.VCr = () => {
  UiModel_1.UiModel.IsInMainView = true;
  UiManager.bCr.get(UiLayerType_1.ELayerType.Float).ShowFloatTips();
};
UiManager.HCr = () => {
  UiModel_1.UiModel.IsInMainView = false;
  UiManager.bCr.get(UiLayerType_1.ELayerType.Float).HideFloatTips();
};
UiManager.QCr = false; //# sourceMappingURL=UiManager.js.map