"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoView = undefined;
const UE = require("ue");
const Application_1 = require("../../../Core/Application/Application");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const AudioDefine_1 = require("../../../Core/Audio/AudioDefine");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const LoadModeManager_1 = require("../../../Core/Performance/LoadMode/LoadModeManager");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../GameSettings/GameSettingsUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation");
const UiLayer_1 = require("../../Ui/UiLayer");
const BlackScreenFadeController_1 = require("../BlackScreen/BlackScreenFadeController");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const PlotModel_1 = require("../Plot/PlotModel");
const PlotSkipComponent_1 = require("../Plot/PlotView/PlotSkipComponent");
const VideoDefine_1 = require("./VideoDefine");
const VideoLauncher_1 = require("./VideoLauncher");
class VideoView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.xNo = undefined;
    this.wNo = undefined;
    this.BNo = undefined;
    this._hc = undefined;
    this.bNo = undefined;
    this.ONo = undefined;
    this.kNo = undefined;
    this.deo = undefined;
    this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
    this.RTn = false;
    this.FNo = false;
    this.VNo = false;
    this.$ul = undefined;
    this.Xul = undefined;
    this.ngl = undefined;
    this.Pbn = true;
    this.sgl = 4000;
    this.agl = 1000;
    this.lgl = 0;
    this.hgl = false;
    this.YCl = 0;
    this.zCl = 0;
    this.b3c = IAction_1.EMovieBackgroundType.Black;
    this.fkl = new Set();
    this.Oxg = 0;
    this.Mp4FadeOutTime = 0;
    this.BlackBorderFadeOutTime = 0;
    this.ORf = false;
    this.GRf = 0;
    this.HNo = () => {
      ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("UI点击跳过(VideoView)");
    };
    this.Bra = e => {
      this.OpenParam = e;
      this.OnStart();
      this.Pbn = false;
      this.XNo();
    };
    this.jNo = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Video", 27, "UE.EApplicationDelegate.ApplicationHasReactivatedDelegate", ["this.VideoPauseTime", this.kNo]);
      }
      this.VNo = true;
      if (this.kNo) {
        if (Info_1.Info.PlatformType !== 2 && Info_1.Info.PlatformType !== 8) {
          this.wNo?.Seek(this.kNo);
        }
        this.wNo?.Play();
        this.kNo = undefined;
      }
      if (this.ONo && this.kNo && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 55, "[VideoView] ResumeVideo 当前只绑定返回应用，全部音频已在CPP的返回应用时处理，跳过此处的音频 Resume"), this.bNo !== undefined) && TimerSystem_1.GameplayTimerSystem.IsPause(this.bNo)) {
        TimerSystem_1.GameplayTimerSystem.Resume(this.bNo);
      }
    };
    this.WNo = () => {
      this.kNo = this.wNo?.GetTime();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Video", 27, "UE.EApplicationDelegate.ApplicationWillDeactivateDelegate", ["this.VideoPauseTime", this.kNo]);
      }
      this.VNo = false;
      if (Info_1.Info.PlatformType !== 2 && Info_1.Info.PlatformType !== 8) {
        this.wNo?.Pause();
      }
      if (this.ONo && VideoLauncher_1.VideoLauncher.AudioEventResult.PlayingIds.length !== 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 55, "[VideoView] PauseVideo 当前只绑定切换后台，全部音频已在CPP的切换后台时处理，跳过此处的音频 Pause");
        }
        if (this.bNo !== undefined && !TimerSystem_1.GameplayTimerSystem.IsPause(this.bNo)) {
          TimerSystem_1.GameplayTimerSystem.Pause(this.bNo);
        }
      }
    };
    this.wbn = () => {
      var e = this.OpenParam.RemainViewWhenEnd;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Video", 38, "开始关闭VideoView", ["bRemain", e]);
      }
      if (!this.ORf) {
        this._jm(false);
        this.Z2g();
      }
      if (this.$ul) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Video", 38, "MediaPlayer还在倒计时检查状态中,提前移除TimeTimer");
        }
        this.$ul.Remove();
        this.$ul = undefined;
      }
      if (this.Xul) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Video", 38, "MediaPlayer还在倒计时检查状态中,提前移除FrameTimer");
        }
        this.Xul.Remove();
        this.Xul = undefined;
      }
      if (this.ngl) {
        this.ngl.Remove();
        this.ngl = undefined;
      }
      this.hVs();
      if (e) {
        this.bra();
        (0, this.OpenParam?.VideoCloseCb)?.();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Video", 16, "VideoView callback done");
        }
      } else {
        if (!this.Pbn) {
          this.CloseMe();
        }
        this.Pbn = true;
        LevelLoadingController_1.LevelLoadingController.CloseLoading(18);
      }
    };
    this.KNo = () => {
      this.FNo = true;
      this.wbn();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Video", 27, "视频播放结束", ["视频名称", this.ONo]);
      }
    };
    this.QNo = () => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Video", 38, "视频文件打开失败,可能需要修复修复系统文件");
      }
      this.wbn();
    };
    this.XNo = () => {
      if (this.ONo) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Video", 38, "必须等上个视频放完才能放下一个");
        }
        this.wbn();
      } else {
        const r = this.OpenParam.VideoDataConf;
        var e;
        var i;
        var t;
        var o;
        var s;
        if (r) {
          e = r.Aspect;
          i = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
          t = ModelManager_1.ModelManager.PlotModel.LastPlotAspect;
          o = ModelManager_1.ModelManager.PlotModel.LastPlotColor;
          s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation);
          if (i > 1 && t !== PlotModel_1.INVALID_NUM && e > 2.3 != t > 2.3 && o === PlotModel_1.COLOR_WHITE && this.b3c === IAction_1.EMovieBackgroundType.White && s) {
            this.YCl = e;
            if (this.YCl < 2.3) {
              this.YCl = i;
            }
            this.hgl = true;
            this.lgl = 0;
            this.ngl = TimerSystem_1.GameplayTimerSystem.Delay(() => {
              this.ngl = undefined;
              this._gl(r);
            }, this.sgl);
          } else {
            this._gl(r);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Video", 38, "事件被错误触发了", ["名称", EventDefine_1.EEventName.ShowVideo]);
          }
          this.wbn();
        }
      }
    };
    this._gl = t => {
      if (ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon) {
        LevelLoadingController_1.LevelLoadingController.OpenLoading(0, 3, undefined, 1, ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor === IAction_1.EMovieBackgroundType.White ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black, false, false, undefined, true);
      }
      this._jm(true);
      this.hgl = false;
      this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(t.CgFile, UE.MediaSource, e => {
        if (e) {
          this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
          if (this.wNo.OpenSource(e)) {
            AudioController_1.AudioController.SetState(AudioDefine_1.PLOT_VIDEO_GROUP, AudioDefine_1.PLOT_VIDEO);
            this.ONo = t.CgName;
            this.RTn = false;
            e = !ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 && (ModelManager_1.ModelManager.PlotModel.IsGmCanSkip || t.CanSkip);
            ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(e);
            this.BNo = [...ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptions(this.ONo, LanguageSystem_1.LanguageSystem.PackageAudio)];
            this.BNo.sort((e, i) => i.ShowMoment - e.ShowMoment);
            this._hc = [...ConfigManager_1.ConfigManager.VideoConfig.GetVideoQte(this.ONo, LanguageSystem_1.LanguageSystem.PackageAudio)];
            this._hc.sort((e, i) => i.ShowMoment - e.ShowMoment);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Video", 26, "字幕语言", ["", LanguageSystem_1.LanguageSystem.PackageAudio]);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VideoStart, this.ONo);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Video", 38, "MediaPlayer开始5秒倒计时检查");
            }
            const i = Time_1.Time.Frame;
            this.$ul = TimerSystem_1.GameplayTimerSystem.Delay(() => {
              this.$ul?.Remove();
              this.$ul = undefined;
              if (this.wNo) {
                if (this.wNo.IsPlaying() || this.wNo.IsPaused()) {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("Video", 38, "MediaPlayer状态检查通过");
                  }
                  if (!this.Xul) {
                    this.hVs();
                  }
                } else if (!this.Xul) {
                  if (Log_1.Log.CheckWarn()) {
                    Log_1.Log.Warn("Video", 45, "MediaPlayer加载了5秒超时，强制关闭CG界面", ["配置名称", t.CgName], ["视频路径", t.CgFile]);
                  }
                  this.wbn();
                }
              } else if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Video", 38, "MediaPlayer已经没有了");
              }
            }, 5000);
            this.Xul = TimerSystem_1.GameplayTimerSystem.Forever(() => {
              if (Time_1.Time.Frame - i >= 30) {
                this.Xul?.Remove();
                this.Xul = undefined;
                if (this.wNo) {
                  if (this.wNo.IsPlaying() || this.wNo.IsPaused()) {
                    if (Log_1.Log.CheckDebug()) {
                      Log_1.Log.Debug("Video", 38, "MediaPlayer状态检查通过");
                    }
                    if (!this.$ul) {
                      this.hVs();
                    }
                  } else if (!this.$ul) {
                    if (Log_1.Log.CheckWarn()) {
                      Log_1.Log.Warn("Video", 45, "MediaPlayer加载了5秒超时，强制关闭CG界面", ["配置名称", t.CgName], ["视频路径", t.CgFile]);
                    }
                    this.wbn();
                  }
                } else if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Video", 38, "MediaPlayer已经没有了");
                }
              }
            }, 1000);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Video", 38, "打开视频失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]);
            }
            this.wbn();
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Video", 38, "mediaSource加载失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]);
          }
          this.wbn();
        }
      });
      if (this.MUe < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Video", 38, "mediaSource加载失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]);
        }
        this.wbn();
      }
    };
    this.UVu = () => {
      if (this.ONo) {
        for (const i of ConfigManager_1.ConfigManager.VideoConfig.GetVideoSounds(this.ONo)) {
          var e = i.EventPath;
          AudioController_1.AudioController.PostEventByUi(e, VideoLauncher_1.VideoLauncher.AudioEventResult);
        }
      }
      this.YNo();
      this.Oxg = UE.KismetMathLibrary.GetTotalMilliseconds(this.wNo.GetDuration());
      this.GRf = this.xNo.GetWidth() / this.xNo.GetHeight();
      this.VNo = true;
    };
    this.YNo = () => {
      var e;
      var i = this.wNo.GetVideoTrackAspectRatio(0, 0);
      var t = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
      var o = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation);
      if (i < t) {
        e = UiLayer_1.UiLayer.UiRootItem.GetWidth() / i;
        this.xNo.SetHeight(e);
        this.xNo.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth());
        if (t > 2.38 && o) {
          e = UiLayer_1.UiLayer.UiRootItem.GetHeight() * i;
          this.xNo.SetWidth(e);
          this.xNo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight());
        }
      } else if (t < i) {
        e = UiLayer_1.UiLayer.UiRootItem.GetHeight() * i;
        this.xNo.SetWidth(e);
        this.xNo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight());
      }
      if (i > 2.3 && o) {
        if (i < t) {
          e = UiLayer_1.UiLayer.UiRootItem.GetHeight() * i;
          this.xNo.SetWidth(e);
          this.xNo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight());
        } else if (t < i) {
          e = UiLayer_1.UiLayer.UiRootItem.GetWidth() / i;
          this.xNo.SetHeight(e);
          this.xNo.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth());
        }
      }
      ModelManager_1.ModelManager.PlotModel.LastPlotAspect = i;
      if (o) {
        BlackScreenFadeController_1.BlackScreenFadeController.ChangeAspect(ModelManager_1.ModelManager.PlotModel.LastPlotAspect, true);
      }
      ModelManager_1.ModelManager.PlotModel.LastPlotColor = this.b3c === IAction_1.EMovieBackgroundType.White ? PlotModel_1.COLOR_WHITE : PlotModel_1.COLOR_BLACK;
    };
    this.JEl = e => {
      this.wNo?.SetRate(1);
      if (e) {
        this.fkl.delete(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIButtonComponent]];
  }
  async OnBeforeStartAsync() {
    this.xNo = this.GetButton(0).GetOwner().GetComponentByClass(UE.UITexture.StaticClass());
    if (this.xNo) {
      var e = this.OpenParam;
      var i = (e?.Mp4FadeOutTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      var t = (e?.BlackBorderFadeOutTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      const o = new CustomPromise_1.CustomPromise();
      if (e.ProgramSpecialConfig?.Type === IAction_1.EPlayMovieProgramSpecialConfigType.Mp4UiReplaceMaterial) {
        ResourceSystem_1.ResourceSystem.LoadAsync(e.ProgramSpecialConfig.Mp4UiReplaceMaterial, UE.MaterialInterface, e => {
          if (e) {
            this.xNo.SetCustomUIMaterial(e);
          }
          o.SetResult();
        }, 102, this.MemoryTag);
      } else {
        o.SetResult();
      }
      if (i > 0 || t > 0) {
        await ControllerHolder_1.ControllerHolder.PlotController.CreateAspectTransformView();
      }
      await o.Promise;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Video", 38, "获取CgTexture异常！！");
    }
  }
  OnStart() {
    this.GetButton(1).RootUIComp.SetUIActive(false);
    this.deo = new PlotSkipComponent_1.PlotSkipComponent(this.GetButton(1), this.HNo, undefined, this);
    this.deo.AddEventListener();
    this.deo.EnableSkipButton(false);
    var e = this.xNo.GetTexture();
    this.wNo = e?.GetMediaPlayer();
    if (!this.wNo) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Video", 38, "获取MediaPlayer异常！！");
      }
    }
    this.wNo.OnEndReached.Add(this.KNo);
    this.wNo.OnMediaOpened.Add(this.UVu);
    this.wNo.OnMediaOpenFailed.Add(this.QNo);
    this.GetText(2).SetUIActive(false);
    this.b3c = undefined;
    var i = this.OpenParam;
    this.Mp4FadeOutTime = (i?.Mp4FadeOutTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.BlackBorderFadeOutTime = (i?.BlackBorderFadeOutTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    if (i?.Mp4BlendAnim) {
      ControllerHolder_1.ControllerHolder.PlotBlendController.SetupInfo(i.Mp4BlendAnim, i.VideoDataConf.CgName);
    }
    if (ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor) {
      this.b3c = ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor;
    } else {
      this.b3c = i?.BackgroundColor?.FadeInBackgroundType ?? IAction_1.EMovieBackgroundType.Black;
    }
    let t = undefined;
    t = this.b3c === IAction_1.EMovieBackgroundType.White ? new UE.LinearColor(1, 1, 1, 1) : (IAction_1.EMovieBackgroundType.Black, new UE.LinearColor(0, 0, 0, 1));
    e.ClearColor = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 26, "改变CG界面底色", ["color", this.b3c]);
    }
    i = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
    if (ModelManager_1.ModelManager.PlotModel.LastPlotAspect !== PlotModel_1.INVALID_NUM && i > 1) {
      this.zCl = ModelManager_1.ModelManager.PlotModel.LastPlotAspect;
      if (this.zCl < 2.3) {
        this.zCl = i;
      }
      this.ZCl(this.zCl);
    }
    this.sgl = CommonParamById_1.configCommonParamById.GetIntConfig("VideoViewLerpFullTime") ?? 4000;
    this.agl = CommonParamById_1.configCommonParamById.GetIntConfig("VideoViewLerpWaitTime") ?? 1000;
    this.fkl.clear();
    this.ORf = false;
  }
  ZCl(e) {
    var i;
    var t = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
    if (e < t) {
      i = UiLayer_1.UiLayer.UiRootItem.GetHeight() * e;
      this.xNo.SetWidth(i);
      this.xNo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight());
    } else if (t < e) {
      i = UiLayer_1.UiLayer.UiRootItem.GetWidth() / e;
      this.xNo.SetHeight(i);
      this.xNo.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth());
    }
  }
  async OnPlayingStartSequenceAsync() {
    const e = new CustomPromise_1.CustomPromise();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 26, "VideoView界面隐藏");
    }
    this.SetUiActive(false);
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Video", 26, "VideoView界面显示");
      }
      this.SetUiActive(true);
      e.SetResult();
    }, 100);
    await e.Promise;
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VideoViewShow);
    LoadModeManager_1.LoadModeManager.SetLoadModeByReason("ForceInGame", "VideoView");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 27, "VideoView OnShow");
    }
    this.Pbn = false;
    this.XNo();
  }
  bra() {
    if (this.bNo !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.bNo);
      this.bNo = undefined;
    }
    if (this.MUe !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MUe);
      this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    this.ONo = undefined;
    this.wNo?.OnEndReached.Remove(this.KNo);
    this.wNo?.OnMediaOpened.Remove(this.UVu);
    this.wNo?.OnMediaOpenFailed.Remove(this.QNo);
    this.wNo?.Close();
    this.wNo = undefined;
    this.BNo = undefined;
    this.kNo = undefined;
    this.VNo = false;
    AudioController_1.AudioController.StopEvent(VideoLauncher_1.VideoLauncher.AudioEventResult, !this.FNo);
    AudioController_1.AudioController.SetState(AudioDefine_1.PLOT_VIDEO_GROUP, AudioDefine_1.PLOT_NOT_VIDEO);
    this.RTn = false;
    this.deo?.OnClear();
    this.deo?.RemoveEventListener();
    this.deo = undefined;
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VideoViewHide, this.FNo);
    this.fkl.forEach(e => {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(e.HandleId);
    });
    this.fkl.clear();
    LoadModeManager_1.LoadModeManager.ResetLoadModeByReason("VideoView");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 16, "VideoView OnBeforeHide");
    }
    this.deo.EnableSkipButton(false);
    ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor = undefined;
    ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor = undefined;
    this.b3c = undefined;
  }
  OnBeforeDestroy() {
    if (!this.Pbn) {
      this._jm(false);
      this.Z2g();
    }
    this.bra();
    (0, this.OpenParam?.VideoCloseCb)?.();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 16, "VideoView callback done");
    }
  }
  async OnPlayingCloseSequenceAsync() {
    if (!(this.BlackBorderFadeOutTime <= 0) && this.ORf) {
      const e = new CustomPromise_1.CustomPromise();
      ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView.ManualBlendOut(this.BlackBorderFadeOutTime, this.GRf, () => {
        e.SetResult();
      });
      await e.Promise;
    }
  }
  OnAfterDestroy() {
    if (this.ORf) {
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("VideoView.TriggerBlendOut");
    }
  }
  OnAddEventListener() {
    Application_1.Application.AddApplicationHandler(1, this.jNo);
    Application_1.Application.AddApplicationHandler(0, this.WNo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayVideo, this.Bra);
  }
  OnRemoveEventListener() {
    Application_1.Application.RemoveApplicationHandler(1, this.jNo);
    Application_1.Application.RemoveApplicationHandler(0, this.WNo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayVideo, this.Bra);
  }
  JNo(i) {
    if (this.BNo?.length) {
      let e = undefined;
      while (this.BNo.length > 0) {
        if (!(((e = this.BNo[this.BNo.length - 1]).ShowMoment + e.Duration) * VideoDefine_1.VideoUtils.MillisecondPerFrame < i)) {
          break;
        }
        this.BNo.pop();
        if (this.RTn) {
          this.RTn = false;
          this.GetText(2).SetUIActive(false);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Video", 26, "CG字幕关闭", ["id", e.CaptionId], ["frame", i * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", e.ShowMoment + e.Duration]);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Video", 26, "CG字幕废弃", ["id", e.CaptionId]);
        }
        e = undefined;
      }
      var t;
      var o;
      if (!!e && !this.RTn && !(i < e.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame)) {
        this.RTn = true;
        t = this.GetText(2);
        o = ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(e);
        t.SetUIActive(true);
        t.SetText(o);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Video", 26, "CG字幕", ["text", o], ["frame", i * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", e.ShowMoment], ["id", e.CaptionId]);
        }
      }
    }
  }
  chc(e) {
    if (this._hc?.length) {
      while (this._hc.length > 0) {
        var i = this._hc[this._hc.length - 1];
        if (!(i.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame <= e)) {
          break;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Video", 26, "CG QTE", ["qteId", i.QteId], ["frame", e * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", i.ShowMoment]);
        }
        var i = ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(i.QteId, this.JEl, this.JEl, 3);
        if (i) {
          this.fkl.add(i);
          i = i.Config.BaseConfig.TimeDilation;
          this.wNo.SetRate(i);
        }
        this._hc.pop();
      }
    }
  }
  hVs() {
    if (ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor) {
      this.b3c = ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor;
    } else {
      this.b3c = this.OpenParam?.BackgroundColor?.FadeOutBackgroundType;
    }
    let e = undefined;
    let i = true;
    switch (this.b3c) {
      case IAction_1.EMovieBackgroundType.White:
        e = new UE.LinearColor(1, 1, 1, 1);
        i = ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(IAction_1.EFadeInScreenShowType.White);
        break;
      case IAction_1.EMovieBackgroundType.Black:
        e = new UE.LinearColor(0, 0, 0, 1);
        i = ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(IAction_1.EFadeInScreenShowType.Black);
        break;
      default:
        e = new UE.LinearColor(0, 0, 0, 1);
    }
    if (!i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Video", 26, "[VideoView] 当前未开启黑幕界面，继承颜色失败");
      }
    }
    this.xNo.GetTexture().ClearColor = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 26, "改变CG界面底色", ["color", this.b3c]);
    }
  }
  OnTick(e) {
    var i;
    if (this.VNo) {
      i = UE.KismetMathLibrary.GetTotalMilliseconds(this.wNo.GetTime());
      this.JNo(i);
      this.chc(i);
      if (this.Mp4FadeOutTime > 0 && this.Oxg - i <= this.Mp4FadeOutTime) {
        this.FRf();
        this.GetRootItem().SetAlpha(MathUtils_1.MathUtils.GetRangePct(0, this.Mp4FadeOutTime, this.Oxg - i));
      }
      VideoLauncher_1.VideoLauncher.OnCheckFrameEvent?.(i);
    }
    if (this.hgl && (this.lgl += e, this.lgl > this.agl)) {
      i = MathUtils_1.MathUtils.GetRangePct(0, this.sgl - this.agl, this.lgl - this.agl);
      e = this.zCl + (this.YCl - this.zCl) * i;
      this.ZCl(e);
    }
  }
  FRf() {
    if (!this.ORf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Video", 26, "VideoView TriggerBlendOut");
      }
      this.ORf = true;
      ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView.SetAspectRatio(this.GRf);
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelAllPerformanceLimit();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VideoTriggerBlendOut, this.ONo);
      this._jm(false);
      this.Z2g();
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, () => {
        UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("VideoView.TriggerBlendOut");
      }, 0);
    }
  }
  Z2g() {
    var e;
    if (ControllerHolder_1.ControllerHolder.PlotBlendController.HasBlendInfo) {
      e = this.OpenParam;
      ControllerHolder_1.ControllerHolder.PlotBlendController.TryExecuteBlend(e?.VideoDataConf?.CgName);
    }
  }
  _jm(e) {
    var i = !!GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.RayTracing) && GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.RayTracing) > 0;
    if (e) {
      if (i) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedGI(0);
        GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedReflection(0);
        GameSettingsUtils_1.GameSettingsUtils.ApplyRayTracedShadow(0);
      }
    } else if (i) {
      GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.RayTracedGI);
      GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.RayTracedReflection);
      GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.RayTracedShadow);
    }
  }
}
exports.VideoView = VideoView;
//# sourceMappingURL=VideoView.js.map