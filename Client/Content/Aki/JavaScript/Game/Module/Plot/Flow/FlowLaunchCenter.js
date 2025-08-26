"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowLaunchCenter = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiManager_1 = require("../../../Ui/UiManager");
const UiModel_1 = require("../../../Ui/UiModel");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const PlotData_1 = require("../PlotData");
const FlowController_1 = require("./FlowController");
const FlowData_1 = require("./FlowData");
class FlowLaunchCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.t$i = false;
    this.i$i = 0;
    this.Cgo = new Array();
    this.Axn = 8;
    this.StartPlotNetworkPending = () => {
      var e;
      if (!ModelManager_1.ModelManager.PlotModel.IsInPlot) {
        if (ModelManager_1.ModelManager.PlotModel.PlotPendingList.length !== 0) {
          e = ModelManager_1.ModelManager.PlotModel.PlotPendingList[0];
          if (this.r$i(e)) {
            ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift();
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Plot", 26, "开始缓存的剧情", ["FlowIncId", e.FlowIncId], ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["StateID", e.StateId]);
            }
            this.n$i(e);
          } else {
            this.t$i = true;
          }
        }
      }
    };
    this.Uxn = (e, o) => !ModelManager_1.ModelManager.LoadingModel.IsLoading && !!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed || (o.FadeBegin && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 26, "Loading期间准备播剧情，提前打开黑幕"), ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, undefined, 0, o.FadeBegin, false, false), o.FadeBegin = undefined), false);
    this.o$i = new Set(["PlotView", "PlotSubtitleView"]);
    this.Rxn = (e, o) => {
      if (o.UiParam?.ViewName) {
        const t = o.UiParam.ViewName === "BattleView" ? UiModel_1.UiModel.MainViewName : o.UiParam.ViewName;
        if (UiManager_1.UiManager.IsViewShow(t)) {
          return true;
        } else {
          return !!o.CanBeAbandoned && (o.IsBreakdown = true, Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 26, "剧情检查条件不通过，且允许被舍弃，丢了", ["incId", o.FlowIncId], ["flowListName", o.FlowListName], ["flowId", o.FlowId], ["stateId", o.StateId]), true);
        }
      }
      const t = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Plot)?.Info?.Name ?? UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)?.Info?.Name;
      return !!t && (this.o$i.has(t) ? UiManager_1.UiManager.IsViewShow(t) : !!UiManager_1.UiManager.CheckIfCanShowPlotView() || !!ControllerHolder_1.ControllerHolder.BlackScreenFadeController.GetIsFadeIn() && !!ControllerHolder_1.ControllerHolder.BlackScreenFadeController.CheckIfInCommon() || !!ModelManager_1.ModelManager.ScreenEffectModel?.GetIsGeneralScreenEffectActive());
    };
    this.xxn = (e, o) => !ModelManager_1.ModelManager.TeleportModel.IsTeleport;
    this.Pxn = (e, o) => !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid();
    this.wxn = (e, o) => {
      var t;
      return !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem) && !t.IsDead();
    };
    this.Bxn = (e, o) => !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady;
    this.bxn = (e, o) => {
      return !!ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode() || o.PlotLevel !== "LevelC" && !o.IsWaitAnim || !(this.i$i > ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.WaitCalmTime ? this.i$i = 0 : (o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.CheckGetComponent(206))?.Valid ? o.HasTag(-1371021686) ? (this.i$i += e, 1) : this.i$i = 0 : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "开始剧情检查人物站立时拿不到BaseTagComponent"), this.i$i = 0));
    };
    this.eI1 = (e, o) => !o.CheckPreload || !ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.CheckIsLoading(o.FormatId);
    this.Sld = new Set(["剧情_2_6_狄斯台地主线_上半_1,25,1"]);
  }
  OnDestroy() {}
  OnInit() {
    this.Cgo.push([0, "场景未加载完", this.Uxn]);
    this.Cgo.push([1, "界面检查不通过", this.Rxn]);
    this.Cgo.push([2, "传送未完成", this.xxn]);
    this.Cgo.push([3, "死亡或者队伍没人", this.Pxn]);
    this.Cgo.push([4, "当前角色死亡", this.wxn]);
    this.Cgo.push([5, "编队未准备好", this.Bxn]);
    this.Cgo.push([6, "人物动作还没回正", this.bxn]);
    this.Cgo.push([7, "预加载未完成", this.eI1]);
    this.Cgo.forEach((e, o) => {
      if (e[0] !== o && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 26, "剧情开始检查队列顺序错误", ["index", o]);
      }
    });
  }
  StartFlow(e, o, t, r = undefined, l = FlowController_1.LOCAL_FLOWINCID, a = false, n = false, i, _ = false, s = false, g) {
    var M;
    var d;
    var h;
    var L = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e, o, t);
    if (L) {
      l = a ? l : FlowLaunchCenter.s$i--;
      r = r ? LevelGeneralContextDefine_1.GeneralContext.Copy(r) : undefined;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 17, "StartFlow", ["FLowIncId", l], ["FlowListName", e], ["FlowId", o], ["StateId", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartFlow);
      M = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateKeepMusic(e, o, t);
      if (d = ConfigManager_1.ConfigManager.FlowConfig.GetFlowNeedLoad(e, o, t)) {
        ControllerHolder_1.ControllerHolder.PreloadControllerNew.PreloadPlot(e, o, t, 999);
      }
      (h = PlotData_1.PlotInfo.Create()).Init(a, l, e, o, t, L, M, r, n, i, _, s, g, d);
      if (this.r$i(h)) {
        this.n$i(h);
      } else {
        ModelManager_1.ModelManager.PlotModel.PendingPlot(h);
        this.t$i = true;
        ControllerHolder_1.ControllerHolder.FlowController.CheckDisableInput(h.PlotLevel);
      }
      return l;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 26, "[StartFlow] 无法找到对应剧情的状态", ["FlowListName", e], ["FlowId", o], ["FlowId", o], ["StateId", t]);
      }
      return 0;
    }
  }
  Tick(e) {
    var o;
    if (this.t$i) {
      if (o = ModelManager_1.ModelManager.PlotModel.PlotPendingList.length >= 0 ? ModelManager_1.ModelManager.PlotModel.PlotPendingList[0] : undefined) {
        if (this.r$i(o, e)) {
          ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "开始缓存的剧情", ["FlowIncId", o.FlowIncId], ["FlowListName", o.FlowListName], ["FlowId", o.FlowId], ["StateID", o.StateId]);
          }
          this.t$i = false;
          this.n$i(o);
        }
      } else {
        this.t$i = false;
      }
    }
  }
  r$i(e, o = 0) {
    if (!e.IsBreakdown) {
      if (this.Axn !== 8 && !this.Cgo[this.Axn][2](o, e)) {
        return false;
      }
      for (const t of this.Cgo) {
        if (t[0] !== this.Axn && !t[2](o, e)) {
          this.Axn = t[0];
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "剧情开始检查不通过", ["reason", t[1]], ["IncId", e.FlowIncId]);
          }
          return false;
        }
      }
    }
    this.Axn = 8;
    return true;
  }
  n$i(e) {
    if (ModelManager_1.ModelManager.PlotModel.IsInInteraction) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 17, "交互中进剧情，直接结束交互");
      }
      ControllerHolder_1.ControllerHolder.PlotController.EndInteraction(true);
    }
    if (ModelManager_1.ModelManager.PlotModel.CheckCanPlayNow(e)) {
      ControllerHolder_1.ControllerHolder.PlotController.OnStartPlotNetwork(e);
      var o = ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot || e.IsBackground;
      if (o && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "剧情开始时被跳过", ["IsInLogicTreeGmMode", ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()], ["IsMuteAllPlot", ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot], ["IsBackground", e.IsBackground]);
      }
      const t = FlowData_1.FlowContext.Create();
      t.Init(e.IsServerNotify, e.FlowListName, e.FlowIncId, e.FlowId, e.StateId, o, e.IsBreakdown, e.Context, e.IsAsync, e.UiParam, e.Pos, e.KeepMainRolePose, e.Seamless, e.EndSeamlessShowTalkId, e.PreloadSequenceUiData);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "剧情行为组开始", ["id", t.FormatId], ["num", e.StateActions.length]);
      }
      if (this.Sld.has(t.FormatId)) {
        ControllerHolder_1.ControllerHolder.PlotController.TogglePlotStreamingSource(true);
      }
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteActions(e.StateActions, t, () => {
        if (this.Sld.has(t.FormatId)) {
          ControllerHolder_1.ControllerHolder.PlotController.TogglePlotStreamingSource(false);
        }
        ControllerHolder_1.ControllerHolder.PlotController.OnEndPlotNetwork();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "EndFlow", ["incId", t.FlowIncId], ["id", t.FormatId], ["IsSkip", t.IsBackground]);
        }
        t.Recycle();
        this.StartPlotNetworkPending();
      });
      e.Recycle();
    }
  }
}
(exports.FlowLaunchCenter = FlowLaunchCenter).s$i = -1;
//# sourceMappingURL=FlowLaunchCenter.js.map