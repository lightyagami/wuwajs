"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieModeController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const MovieModeAspectView_1 = require("./MovieModeAspectView");
const MovieModeUiView_1 = require("./MovieModeUiView");
class MovieModeController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequenceStarted, this.Vug);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequenceEnd, this.Hug);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.jug);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequenceStarted, this.Vug);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequenceEnd, this.Hug);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.jug);
  }
  static AddTick(e) {
    this.UYi++;
    this.PYi.set(this.UYi, e);
    return this.UYi;
  }
  static RemoveTick(e) {
    this.PYi.delete(e);
  }
  static OnTick(t) {
    if (!(this.PYi.size <= 0)) {
      this.PYi.forEach((e, i) => {
        e(t);
      });
    }
  }
  static async EnterMovieMode(e, i) {
    if (this.G2e === 2) {
      this.N1f();
      i?.(false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "进入电影模式,还在取消进入的过程中,黑边反向");
      }
    } else if (this.G2e !== 0) {
      i?.(false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "进入电影模式失败,非电影模式空闲态", ["CurrentState", this.G2e]);
      }
    } else {
      this.G2e = 1;
      await this.V1f(e);
      if (this.G2e !== 1) {
        this.ClearViews();
        i?.(false);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("MovieMode", 87, "进入电影模式失败,已经不在进入状态", ["CurrentState", this.G2e]);
        }
      } else {
        this.Jdg = e.IsAutoExitInFlowSequence ?? false;
        this.G2e = 3;
        this.h0f(e);
        this.ResetMovieModeHideUi(false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MovieModeAspectOffsetApply, true, this.GetAspectOffset());
        i?.(true);
      }
    }
  }
  static async V1f(e) {
    await this.CreateAspectView(e);
    if (this.G2e !== 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "进入电影模式失败,已经不在进入状态", ["CurrentState", this.G2e]);
      }
    } else {
      await this.CreateUiView(e);
    }
  }
  static async ExitMovieMode(e, i) {
    if (this.G2e === 1) {
      if (e.BlendTime === 0) {
        this.ClearViews();
      } else {
        this.j1f();
      }
      i?.(false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "退出电影模式,还在进入的过程中,黑边反向");
      }
    } else if (this.G2e !== 3) {
      i?.(false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "退出电影模式失败,非电影模式激活态", ["CurrentState", this.G2e]);
      }
    } else {
      this.G2e = 4;
      this.ResetMovieModeHideUi(true);
      ModelManager_1.ModelManager.MovieModeModel?.FreezeUi("ExitMovieMode");
      await this.$1f(e);
      ModelManager_1.ModelManager.MovieModeModel?.UnFreezeUi("ExitMovieMode");
      this.G2e = 0;
      this.ResetMovieModeHideUi(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MovieModeAspectOffsetApply, false, this.GetAspectOffset());
      i?.(true);
    }
  }
  static async $1f(e) {
    this.ResetMovieModeHideUi(true);
    var i = [];
    if (e.BlackFadeInTime) {
      i.push(ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3, e.BlackFadeInTime));
    }
    i.push(this.RemoveAspectView(e));
    await Promise.all(i);
    await e.AfterBlackFadeInCallbackAsync?.();
    this.RemoveUiView();
    await this._0f();
    if (e.BlackFadeInTime) {
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
    }
  }
  static async CreateAspectView(e) {
    var i;
    if (this.W1f) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "执行黑边淡入逻辑失败,黑边已存在", ["CurrentState", this.G2e]);
      }
    } else {
      this.W1f = new MovieModeAspectView_1.MovieModeAspectView();
      e.Parent?.AddChild(this.W1f);
      i = {
        IsBanAdaptation: e.IsBanAdaptation ?? false
      };
      this.W1f.OpenParam = i;
      await this.W1f.CreateThenShowByResourceIdAsync("UiView_BlackFadeScreen_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop));
      if (this.G2e !== 1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("MovieMode", 87, "执行黑边淡入逻辑失败,已经不在进入状态", ["CurrentState", this.G2e]);
        }
      } else {
        await this.W1f.Fade(true, e.BlendTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("MovieMode", 87, "电影模式黑边动画完成");
        }
      }
    }
  }
  static async RemoveAspectView(e) {
    if (this.W1f) {
      if (e.BlendTime !== 0 && (await this.W1f.Fade(false, e.BlendTime * CommonDefine_1.MILLIONSECOND_PER_SECOND), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("MovieMode", 87, "电影模式黑边淡出完成");
      }
      this.W1f?.Destroy();
      this.W1f = undefined;
    }
  }
  static async CreateUiView(e) {
    if (this.Q1f) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "打开电影模式UI界面失败,界面已存在", ["CurrentState", this.G2e]);
      }
    } else {
      this.Q1f = new MovieModeUiView_1.MovieModeUiView();
      e.Parent?.AddChild(this.Q1f);
      this.Q1f.OpenParam = e;
      await this.Q1f.CreateThenShowByResourceIdAsync("UiView_MotorcycleMovieMode", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop));
    }
  }
  static RemoveUiView() {
    this.Q1f?.Destroy();
    this.Q1f = undefined;
  }
  static GetAspectOffset() {
    return this.W1f?.GetAspectOffset();
  }
  static j1f() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MovieMode", 87, "取消进入电影模式");
    }
    this.W1f?.FadeReverse();
    this.G2e = 2;
  }
  static N1f() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MovieMode", 87, "重新进入电影模式");
    }
    this.W1f?.FadeReverse();
    this.G2e = 1;
  }
  static h0f(e) {
    if (e?.MovieCameraConfig) {
      if (e.MovieCameraConfig.MovieCameraType.Type === "Common") {
        const i = e.MovieCameraConfig.MovieCameraType.RowName;
        const t = e.MovieCameraConfig.MovieCameraType.SpecElementIndex ?? -1;
        ModelManager_1.ModelManager.CameraModel?.PlayMovieCamera(i, t, e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("MovieMode", 87, "[电影镜头]通过MovieModeController进入常规电影镜头结果", ["success", e], ["RowName", i], ["InitialIndex", t]);
          }
        });
      } else if (e.MovieCameraConfig.MovieCameraType.Type === "Spec") {
        const o = e.MovieCameraConfig.MovieCameraType.RowName;
        ModelManager_1.ModelManager.CameraModel?.PlaySpecialMovieCamera(o, e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("MovieMode", 87, "[电影镜头]通过MovieModeController进入特殊电影镜头结果", ["success", e], ["RowName", o]);
          }
        });
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MovieMode", 87, "进入电影模式没有配置对应电影镜头");
    }
  }
  static async _0f() {
    const i = new CustomPromise_1.CustomPromise();
    ModelManager_1.ModelManager.CameraModel?.StopMovieCamera(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "[电影镜头]通过MovieModeController离开电影镜头结果", ["success", e]);
      }
      i.SetResult();
    }, "电影模式,停止电影镜头");
    await i.Promise;
  }
  static ResumeMovieCamera() {
    ModelManager_1.ModelManager.CameraModel?.ResumeMovieCamera();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MovieMode", 87, "[电影镜头]通过MovieModeController恢复电影镜头播放");
    }
  }
  static async PlaySpecialMovieCamera(i) {
    const t = new CustomPromise_1.CustomPromise();
    ModelManager_1.ModelManager.CameraModel?.PlaySpecialMovieCamera(i, e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MovieMode", 87, "[电影镜头]通过MovieModeController播放特殊电影镜头结果", ["success", e], ["specialRowName", i]);
      }
      t.SetResult();
    });
    await t.Promise;
  }
  static IsPlayingSpecialMovieCamera(e) {
    return ModelManager_1.ModelManager.CameraModel?.IsPlayingSpecialMovieCamera(e) ?? false;
  }
  static ResetMovieModeHideUi(e) {
    if (!ModelManager_1.ModelManager.MovieModeModel?.IsFreezingUi) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MovieModeHideUiChange, e);
      this.Q1f?.ActivateTimer();
    }
  }
  static ClearViews() {
    if (this.W1f) {
      this.W1f.Destroy();
      this.W1f = undefined;
    }
    if (this.Q1f) {
      this.Q1f.Destroy();
      this.Q1f = undefined;
    }
    this.G2e = 0;
  }
  static OnClear() {
    this.ClearViews();
    this.PYi.clear();
    return true;
  }
}
exports.MovieModeController = MovieModeController;
(_a = MovieModeController).IsTickEvenPausedInternal = true;
MovieModeController.W1f = undefined;
MovieModeController.Q1f = undefined;
MovieModeController.UYi = 0;
MovieModeController.PYi = new Map();
MovieModeController.G2e = 0;
MovieModeController.Jdg = false;
MovieModeController.jug = () => {
  _a.W1f?.UpdateTransform();
};
MovieModeController.Vug = () => {
  if (_a.Q1f && (_a.Q1f.SetUiActive(false), Log_1.Log.CheckInfo() && Log_1.Log.Info("MovieMode", 87, "电影模式UI显示状态", ["isActive", false]), _a.Jdg)) {
    _a.ExitMovieMode({
      BlendTime: 0
    });
    _a.Jdg = false;
  }
};
MovieModeController.Hug = () => {
  if (_a.Q1f && (_a.Q1f.SetUiActive(true), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("MovieMode", 87, "电影模式UI显示状态", ["isActive", true]);
  }
}; //# sourceMappingURL=MovieModeController.js.map