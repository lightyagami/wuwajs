"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowLaunchCenter = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../../GameSettings/GameSettingsUtils");
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
const FlowLaunchResCheckHardCodingList_1 = require("./FlowLaunchResCheckHardCodingList");
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
        const t = _.UiParam.ViewName === "BattleView" ? UiModel_1.UiModel.MainViewName : _.UiParam.ViewName;
        if (UiManager_1.UiManager.IsViewShow(t)) {
          return true;
        } else {
          return !!_.CanBeAbandoned && (_.IsBreakdown = true, Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 26, "剧情检查条件不通过，且允许被舍弃，丢了", ["incId", _.FlowIncId], ["flowListName", _.FlowListName], ["flowId", _.FlowId], ["stateId", _.StateId]), true);
        }
      }
      const t = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Plot)?.Info?.Name ?? UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)?.Info?.Name;
      if (t) {
        if (this.o$i.has(t)) {
          if (!(_ = UiManager_1.UiManager.IsViewShow(t))) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 26, "界面未显示", ["viewName", t]);
            }
          }
          return _;
        }
        if (UiManager_1.UiManager.CheckIfCanShowPlotView()) {
          return true;
        }
        if (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.GetIsFadeIn() && ControllerHolder_1.ControllerHolder.BlackScreenFadeController.CheckIfInCommon()) {
          return true;
        }
        if (ModelManager_1.ModelManager.ScreenEffectModel?.GetIsGeneralScreenEffectActive()) {
          return true;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "有别的界面", ["viewName", t]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "viewName为空");
      }
      return false;
    };
    this.xxn = (e, _) => !ModelManager_1.ModelManager.TeleportModel.IsTeleport;
    this.Pxn = (e, _) => !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid();
    this.wxn = (e, _) => {
      var t;
      return !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem) && !t.IsDead();
    };
    this.Bxn = (e, _) => !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady;
    this.bxn = (e, _) => {
      return !!ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode() || _.PlotLevel !== "LevelC" && !_.IsWaitAnim || !(this.i$i > ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.WaitCalmTime ? this.i$i = 0 : (_ = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.CheckGetComponent(217))?.Valid ? _.HasTag(-1371021686) ? (this.i$i += e, 1) : this.i$i = 0 : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "开始剧情检查人物站立时拿不到BaseTagComponent"), this.i$i = 0));
    };
    this.eI1 = (e, _) => !_.CheckPreload || !ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.CheckIsLoading(_.FormatId);
    this.Agd = new Set(["剧情_2_6_狄斯台地主线_上半_1,25,1", "剧情_2_0_黎那汐塔主线_第一幕,1,1"]);
    this.JVf = new Map([["剧情_2_5_隐海试验场_声骸培养场,1,23", Vector_1.Vector.Create(194400, 155500, -165850)], ["剧情_2_5_隐海试验场_声骸培养场,1,9", Vector_1.Vector.Create(161705, 133164, -166068)], ["剧情_2_5_隐海试验场_声骸培养场,6,1", Vector_1.Vector.Create(345600, -6581, -165980)]]);
    this.HOg = new Set(["剧情_3_0_主线_拉海洛主线_上半_1,35,1"]);
    this.$Wm = new Set(["剧情_2_7_狄斯台地主线_上半_巡游天国,33,1", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,2", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,3", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,4", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,5", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,6", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,7", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,8", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,9", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,11", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,12", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,13", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,14", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,15", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,16", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,17", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,18", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,22", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,23", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,24", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,25", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,26", "剧情_2_7_狄斯台地主线_上半_巡游天国,33,27", "剧情_2.8_穗波怪异物语（战中语音对话文本）,1,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,1,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,1,3", "剧情_2.8_穗波怪异物语（战中语音对话文本）,1,4", "剧情_2.8_穗波怪异物语（战中语音对话文本）,2,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,2,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,3,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,3,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,4,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,4,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,5,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,5,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,6,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,6,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,6,3", "剧情_2.8_穗波怪异物语（战中语音对话文本）,6,4", "剧情_2.8_穗波怪异物语（战中语音对话文本）,7,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,7,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,8,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,8,2", "剧情_2.8_穗波怪异物语（战中语音对话文本）,9,1", "剧情_2.8_穗波怪异物语（战中语音对话文本）,9,2"]);
    this.WWm = undefined;
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
  StartFlow(e, _, t, o = undefined, r = FlowController_1.LOCAL_FLOWINCID, i = false, a = false, n, l = false, s = false, g, d) {
    var M;
    var h;
    var L;
    var m = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e, _, t);
    if (m) {
      r = i ? r : FlowLaunchCenter.s$i--;
      o = o ? LevelGeneralContextDefine_1.GeneralContext.Copy(o) : undefined;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 17, "StartFlow", ["FLowIncId", r], ["FlowListName", e], ["FlowId", _], ["StateId", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartFlow);
      M = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateKeepMusic(e, _, t);
      if (h = ConfigManager_1.ConfigManager.FlowConfig.GetFlowNeedLoad(e, _, t)) {
        ControllerHolder_1.ControllerHolder.PreloadControllerNew.PreloadPlot(e, _, t, 999);
      }
      (L = PlotData_1.PlotInfo.Create()).Init(i, r, e, _, t, m, M, o, a, n, l, s, g, h, d);
      if (this.r$i(L)) {
        this.n$i(L);
      } else {
        ModelManager_1.ModelManager.PlotModel.PendingPlot(L);
        this.t$i = true;
        ControllerHolder_1.ControllerHolder.FlowController.CheckDisableInput(L.PlotLevel);
      }
      return r;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 26, "[StartFlow] 无法找到对应剧情的状态", ["FlowListName", e], ["FlowId", _], ["FlowId", _], ["StateId", t]);
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
      for (const t of this.Cgo) {
        if (t[0] !== this.Axn && !t[2](_, e)) {
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
  static ApplyTemporaryLowQuality() {
    GameSettingsUtils_1.GameSettingsUtils.ApplyImageQualityOnly(0);
    GameSettingsUtils_1.GameSettingsUtils.ApplyVegetationDensity(0);
    GameSettingsUtils_1.GameSettingsUtils.ApplySkinDamageMode(0);
    GameSettingsUtils_1.GameSettingsUtils.ApplyBloomEnable(0);
    GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(0);
    GameSettingsUtils_1.GameSettingsUtils.ApplyNiagaraQuality(0);
    GameSettingsUtils_1.GameSettingsUtils.ApplyMobileResolution(0);
  }
  static ReApplyTemporaryLowQuality() {
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.VegetationDensity);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.SkinDamageMode);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.BLOOM);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.IMAGEDETAIL);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.SHADOWQUALITY);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.MOBILERESOLUTION);
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
      const t = FlowData_1.FlowContext.Create();
      t.Init(e, _);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "剧情行为组开始", ["id", t.FormatId], ["num", e.StateActions.length]);
      }
      if (this.Agd.has(t.FormatId)) {
        ControllerHolder_1.ControllerHolder.PlotController.TogglePlotStreamingSource(true);
      }
      if (this.JVf.has(t.FormatId) && (_ = this.JVf.get(t.FormatId))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 70, "使用独立流源Start", ["id", t.FormatId], ["pos", _]);
        }
        ControllerHolder_1.ControllerHolder.PlotController.TogglePlotIndependentStreaming(true, _);
      }
      if (FlowLaunchResCheckHardCodingList_1.FlowLaunchResCheckHardCodingList.TempDisableWorldOffsetZ.has(t.FormatId)) {
        ControllerHolder_1.ControllerHolder.WorldController.SetEnableZAxisOffset(false, "剧情流程开始");
      }
      if (Info_1.Info.IsLowMemoryDevice && this.HOg.has(t.FormatId)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "LowQualityPlot", ["id", t.FormatId]);
        }
        FlowLaunchCenter.ApplyTemporaryLowQuality();
      }
      if (this.$Wm.has(t.FormatId)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "DebugProtectedPlot", ["id", t.FormatId]);
        }
        this.WWm = TimerSystem_1.TimerSystem.Delay(() => {
          ControllerHolder_1.ControllerHolder.PlotController.CloseAllUi();
          ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("DebugProtectedPlot");
        }, 30000);
      }
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteActions(e.StateActions, t, () => {
        if (this.Agd.has(t.FormatId)) {
          ControllerHolder_1.ControllerHolder.PlotController.TogglePlotStreamingSource(false);
        }
        if (this.JVf.has(t.FormatId) && (ControllerHolder_1.ControllerHolder.PlotController.TogglePlotIndependentStreaming(false), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Plot", 70, "使用独立流源End", ["id", t.FormatId]);
        }
        if (FlowLaunchResCheckHardCodingList_1.FlowLaunchResCheckHardCodingList.TempDisableWorldOffsetZ.has(t.FormatId)) {
          ControllerHolder_1.ControllerHolder.WorldController.SetEnableZAxisOffset(true, "剧情流程结束");
        }
        if (Info_1.Info.IsLowMemoryDevice && this.HOg.has(t.FormatId)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "LowQualityPlot恢复", ["id", t.FormatId]);
          }
          FlowLaunchCenter.ReApplyTemporaryLowQuality();
        }
        this.WWm?.Remove();
        this.WWm = undefined;
        ControllerHolder_1.ControllerHolder.PlotController.OnEndPlotNetwork();
        if (t.Callback && (t.Callback(), t.Callback = undefined, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Plot", 45, "执行了flowContext的Callback", ["incId", t.FlowIncId], ["id", t.FormatId], ["IsSkip", t.IsBackground]);
        }
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