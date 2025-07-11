"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSetPlotMode = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const PlotSubtitleView_1 = require("../../Sequence/Subtitle/PlotSubtitleView");
const FlowNetworks_1 = require("../Flow/FlowNetworks");
const PlotController_1 = require("../PlotController");
const FlowActionBase_1 = require("./FlowActionBase");
const GUARANTEED_WAIT_TIME = 3000;
const DEFAULT_FADE_DURATION = 0.5;
const SAFE_DISTANCE_SQAURED = 3000;
class FlowActionSetPlotMode extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.Y$i = false;
    this.J$i = undefined;
    this.z$i = -1;
    this.Z$i = 0;
    this.eYi = undefined;
    this.w9s = undefined;
    this.tYi = e => {
      if (ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning && this.Z$i < GUARANTEED_WAIT_TIME) {
        this.Z$i += e;
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "C级剧情等待交互转身-结束", ["waitTime", this.Z$i]);
        }
        ControllerHolder_1.ControllerHolder.PlotController.RemoveTick(this.z$i);
        this.Z$i = 0;
        this.z$i = -1;
        this.J$i.SetResult();
        this.J$i = undefined;
      }
    };
    this.Ilt = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "剧情前保底传送 -结束");
      }
      var e = this.w9s;
      this.w9s = undefined;
      e.SetResult();
    };
  }
  OnExecute() {
    this.Y$i = this.Context.HasAdjustCamera;
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode(e);
    ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig(this.Y$i);
    this.eYi = e.FastFadeIn;
    this.Context.IsWaitRenderData = !e.NoUiEnterAnimation;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "SetPlotMode", ["Level", e.Mode], ["ChangeRole", e.IsSwitchMainRole], ["DisableAutoFadeOut", e.DisableAutoFadeOut]);
    }
    if (this.Context?.UiParam?.ViewName && !UiManager_1.UiManager.IsViewShow(this.Context.UiParam.ViewName)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "剧情界面所依赖的界面未打开，本段剧情跳过", ["ViewName", this.Context.UiParam.ViewName]);
      }
      this.Context.IsBackground = true;
      this.FinishExecute(true);
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode);
      Promise.all([this.A31(), this.oYi(), this.nYi(), this.b9s(), this.tJ()]).finally(() => {
        this.FinishExecute(true);
      });
    }
  }
  async tJ() {
    if (!ModelManager_1.ModelManager.PlotModel.HasLoadEventType) {
      const e = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_KuroMasterSeqEvent_C", () => {
        ModelManager_1.ModelManager.PlotModel.HasLoadEventType = true;
        e.SetResult();
      });
      await e.Promise;
    }
  }
  async A31() {
    await this.rYi();
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.ShouldSwitchMainRole) {
      await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
      PlotController_1.PlotController.RequestChangeRole();
    }
  }
  async oYi() {
    const t = new CustomPromise_1.CustomPromise();
    PlotController_1.PlotController.OpenCurrentPlotView(e => {
      if (!e) {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("剧情打开界面失败");
      }
      t.SetResult();
    }, this.Context.UiParam);
    await t.Promise;
    await this.Jku();
  }
  async Jku() {
    const o = new Array();
    if (this.Context.NeedPreloadUiSequenceData) {
      for (const t of this.Context.NeedPreloadUiSequenceData) {
        ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(t, UE.BP_SequenceData_C, e => {
          if (e?.GeneratedData?.PreloadUiArray) {
            for (const t of (0, ObjectUtils_1.ueArrayToArray)(e.GeneratedData.PreloadUiArray)) {
              o.push(t);
            }
          }
        });
      }
      this.Context.NeedPreloadUiSequenceData = undefined;
    }
    var e;
    if (o.length !== 0 && (e = PlotController_1.PlotController.GetCurrentViewName(), e = UiManager_1.UiManager.GetViewByName(e)) && e instanceof PlotSubtitleView_1.PlotSubtitleView) {
      await e.PrePreloadOpenBackgroundUi(o);
    }
  }
  async nYi() {
    if (this.eYi) {
      ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, this.eYi?.Ease?.Duration !== undefined ? this.eYi.Ease.Duration : DEFAULT_FADE_DURATION, this.eYi.ScreenType);
    }
  }
  async rYi() {
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" && ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "C级剧情等待交互转身-开始");
      }
      this.J$i = new CustomPromise_1.CustomPromise();
      this.Z$i = 0;
      this.z$i = ControllerHolder_1.ControllerHolder.PlotController.AddTick(this.tYi);
      await this.J$i.Promise;
    }
  }
  async b9s() {
    var e;
    var t;
    if (!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
      if (this.Context?.Pos) {
        t = Vector_1.Vector.Dist(e, this.Context.Pos);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "剧情坐标检查", ["dist", t], ["cur", e], ["target", this.Context.Pos]);
        }
        if (t > SAFE_DISTANCE_SQAURED) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "剧情前保底传送 -开始");
          }
          this.w9s = new CustomPromise_1.CustomPromise();
          FlowNetworks_1.FlowNetworks.RequestSafeTeleport(this.Context.FlowIncId, e => {
            if (e) {
              EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
            } else {
              this.w9s.SetResult();
            }
          });
          await this.w9s.Promise;
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "无剧情保底坐标点", ["curPos", e]);
      }
    }
  }
  OnInterruptExecute() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TeleportComplete, this.Ilt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
      this.Ilt();
    }
  }
  OnBackgroundExecute() {
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode(e);
    ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig(this.Y$i);
    ModelManager_1.ModelManager.PlotModel.IsFadeIn = e.FastFadeIn !== undefined;
    this.FinishExecute(true);
  }
}
exports.FlowActionSetPlotMode = FlowActionSetPlotMode;
//# sourceMappingURL=FlowActionSetPlotMode.js.map