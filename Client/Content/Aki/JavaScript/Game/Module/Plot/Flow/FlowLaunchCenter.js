"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowLaunchCenter = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
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
    this.Uxn = (e, _) => !ModelManager_1.ModelManager.LoadingModel.IsLoading && !!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed || (_.FadeBegin && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 26, "Loading期间准备播剧情，提前打开黑幕"), ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, undefined, 0, _.FadeBegin, false, false), _.FadeBegin = undefined), false);
    this.o$i = new Set(["PlotView", "PlotSubtitleView"]);
    this.Rxn = (e, _) => {
      if (_.UiParam?.ViewName) {
        const o = _.UiParam.ViewName === "BattleView" ? UiModel_1.UiModel.MainViewName : _.UiParam.ViewName;
        if (UiManager_1.UiManager.IsViewShow(o)) {
          return true;
        } else {
          return !!_.CanBeAbandoned && (_.IsBreakdown = true, Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 26, "剧情检查条件不通过，且允许被舍弃，丢了", ["incId", _.FlowIncId], ["flowListName", _.FlowListName], ["flowId", _.FlowId], ["stateId", _.StateId]), true);
        }
      }
      const o = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Plot)?.Info?.Name ?? UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)?.Info?.Name;
      return !!o && (this.o$i.has(o) ? UiManager_1.UiManager.IsViewShow(o) : !!UiManager_1.UiManager.CheckIfCanShowPlotView() || !!ControllerHolder_1.ControllerHolder.BlackScreenFadeController.GetIsFadeIn() && !!ControllerHolder_1.ControllerHolder.BlackScreenFadeController.CheckIfInCommon() || !!ModelManager_1.ModelManager.ScreenEffectModel?.GetIsGeneralScreenEffectActive());
    };
    this.xxn = (e, _) => !ModelManager_1.ModelManager.TeleportModel.IsTeleport;
    this.Pxn = (e, _) => !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid();
    this.wxn = (e, _) => {
      var o;
      return !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || !!(o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem) && !o.IsDead();
    };
    this.Bxn = (e, _) => !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady;
    this.bxn = (e, _) => {
      return !!ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode() || _.PlotLevel !== "LevelC" && !_.IsWaitAnim || !(this.i$i > ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.WaitCalmTime ? this.i$i = 0 : (_ = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.CheckGetComponent(209))?.Valid ? _.HasTag(-1371021686) ? (this.i$i += e, 1) : this.i$i = 0 : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "开始剧情检查人物站立时拿不到BaseTagComponent"), this.i$i = 0));
    };
    this.eI1 = (e, _) => !_.CheckPreload || !ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.CheckIsLoading(_.FormatId);
    this.Agd = new Set(["剧情_2_6_狄斯台地主线_上半_1,25,1"]);
    this.Jbm = new Set(["剧情_2_7_狄斯台地主线_上半_巡游天国,33,1", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,2", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,3", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,4", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,5", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,6", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,7", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,8", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,9", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,11", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,12", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,13", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,14", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,15", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,16", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,17", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,18", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,22", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,23", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,24", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,25", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,26", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,27"]);
    this.Zbm = undefined;
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
    this.Cgo.forEach((e, _) => {
      if (e[0] !== _ && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 26, "剧情开始检查队列顺序错误", ["index", _]);
      }
    });
  }
  StartFlow(e, _, o, t = undefined, r = FlowController_1.LOCAL_FLOWINCID, l = false, i = false, a, n = false, s = false, d) {
    var g;
    var M;
    var h;
    var L = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e, _, o);
    if (L) {
      r = l ? r : FlowLaunchCenter.s$i--;
      t = t ? LevelGeneralContextDefine_1.GeneralContext.Copy(t) : undefined;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 17, "StartFlow", ["FLowIncId", r], ["FlowListName", e], ["FlowId", _], ["StateId", o]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartFlow);
      g = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateKeepMusic(e, _, o);
      if (M = ConfigManager_1.ConfigManager.FlowConfig.GetFlowNeedLoad(e, _, o)) {
        ControllerHolder_1.ControllerHolder.PreloadControllerNew.PreloadPlot(e, _, o, 999);
      }
      (h = PlotData_1.PlotInfo.Create()).Init(l, r, e, _, o, L, g, t, i, a, n, s, d, M);
      if (this.r$i(h)) {
        this.n$i(h);
      } else {
        ModelManager_1.ModelManager.PlotModel.PendingPlot(h);
        this.t$i = true;
        ControllerHolder_1.ControllerHolder.FlowController.CheckDisableInput(h.PlotLevel);
      }
      return r;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 26, "[StartFlow] 无法找到对应剧情的状态", ["FlowListName", e], ["FlowId", _], ["FlowId", _], ["StateId", o]);
      }
      return 0;
    }
  }
  Tick(e) {
    var _;
    if (this.t$i) {
      if (_ = ModelManager_1.ModelManager.PlotModel.PlotPendingList.length >= 0 ? ModelManager_1.ModelManager.PlotModel.PlotPendingList[0] : undefined) {
        if (this.r$i(_, e)) {
          ModelManager_1.ModelManager.PlotModel.PlotPendingList.shift();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "开始缓存的剧情", ["FlowIncId", _.FlowIncId], ["FlowListName", _.FlowListName], ["FlowId", _.FlowId], ["StateID", _.StateId]);
          }
          this.t$i = false;
          this.n$i(_);
        }
      } else {
        this.t$i = false;
      }
    }
  }
  r$i(e, _ = 0) {
    if (!e.IsBreakdown) {
      if (this.Axn !== 8 && !this.Cgo[this.Axn][2](_, e)) {
        return false;
      }
      for (const o of this.Cgo) {
        if (o[0] !== this.Axn && !o[2](_, e)) {
          this.Axn = o[0];
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "剧情开始检查不通过", ["reason", o[1]], ["IncId", e.FlowIncId]);
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
      var _ = ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot || e.IsBackground;
      if (_ && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "剧情开始时被跳过", ["IsInLogicTreeGmMode", ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()], ["IsMuteAllPlot", ModelManager_1.ModelManager.PlotModel.IsMuteAllPlot], ["IsBackground", e.IsBackground]);
      }
      const o = FlowData_1.FlowContext.Create();
      o.Init(e, _);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "剧情行为组开始", ["id", o.FormatId], ["num", e.StateActions.length]);
      }
      if (this.Agd.has(o.FormatId)) {
        ControllerHolder_1.ControllerHolder.PlotController.TogglePlotStreamingSource(true);
      }
      if (this.Jbm.has(o.FormatId)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "DebugProtectedPlot", ["id", o.FormatId]);
        }
        this.Zbm = TimerSystem_1.TimerSystem.Delay(() => {
          ControllerHolder_1.ControllerHolder.PlotController.CloseAllUi();
          ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("DebugProtectedPlot");
        }, 30000);
      }
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteActions(e.StateActions, o, () => {
        if (this.Agd.has(o.FormatId)) {
          ControllerHolder_1.ControllerHolder.PlotController.TogglePlotStreamingSource(false);
        }
        this.Zbm?.Remove();
        this.Zbm = undefined;
        ControllerHolder_1.ControllerHolder.PlotController.OnEndPlotNetwork();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "EndFlow", ["incId", o.FlowIncId], ["id", o.FormatId], ["IsSkip", o.IsBackground]);
        }
        o.Recycle();
        this.StartPlotNetworkPending();
      });
      e.Recycle();
    }
  }
}
(exports.FlowLaunchCenter = FlowLaunchCenter).s$i = -1;
//# sourceMappingURL=FlowLaunchCenter.js.map