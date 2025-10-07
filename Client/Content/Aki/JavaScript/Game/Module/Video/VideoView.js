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
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
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
    this.VNo = true;
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
    this.HNo = () => {
      ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("UI点击跳过(VideoView)");
    };
    this.Bra = i => {
      this.OpenParam = i;
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
      var i = this.OpenParam.RemainViewWhenEnd;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Video", 38, "开始关闭VideoView", ["bRemain", i]);
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
      if (i) {
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
        var i;
        var e;
        var t;
        var o;
        var s;
        if (r) {
          i = r.Aspect;
          e = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
          t = ModelManager_1.ModelManager.PlotModel.LastPlotAspect;
          o = ModelManager_1.ModelManager.PlotModel.LastPlotColor;
          s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation);
          if (e > 1 && t !== PlotModel_1.INVALID_NUM && i > 2.3 != t > 2.3 && o === PlotModel_1.COLOR_WHITE && this.b3c === IAction_1.EMovieBackgroundType.White && s) {
            this.YCl = i;
            if (this.YCl < 2.3) {
              this.YCl = e;
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
      this.hgl = false;
      this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(t.CgFile, UE.MediaSource, i => {
        if (i) {
          this.MUe = ResourceSystem_1.ResourceSystem.InvalidId;
          if (this.wNo.OpenSource(i)) {
            AudioController_1.AudioController.SetState(AudioDefine_1.PLOT_VIDEO_GROUP, AudioDefine_1.PLOT_VIDEO);
            this.ONo = t.CgName;
            this.RTn = false;
            i = !ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 && (ModelManager_1.ModelManager.PlotModel.IsGmCanSkip || t.CanSkip);
            ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(i);
            this.BNo = [...ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptions(this.ONo, LanguageSystem_1.LanguageSystem.PackageAudio)];
            this.BNo.sort((i, e) => e.ShowMoment - i.ShowMoment);
            this._hc = [...ConfigManager_1.ConfigManager.VideoConfig.GetVideoQte(this.ONo, LanguageSystem_1.LanguageSystem.PackageAudio)];
            this._hc.sort((i, e) => e.ShowMoment - i.ShowMoment);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Video", 26, "字幕语言", ["", LanguageSystem_1.LanguageSystem.PackageAudio]);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VideoStart, this.ONo);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Video", 38, "MediaPlayer开始5秒倒计时检查");
            }
            const e = Time_1.Time.Frame;
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
              if (Time_1.Time.Frame - e >= 30) {
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
        for (const e of ConfigManager_1.ConfigManager.VideoConfig.GetVideoSounds(this.ONo)) {
          var i = e.EventPath;
          AudioController_1.AudioController.PostEventByUi(i, VideoLauncher_1.VideoLauncher.AudioEventResult);
        }
      }
      this.YNo();
    };
    this.YNo = () => {
      var i;
      var e = this.wNo.GetVideoTrackAspectRatio(0, 0);
      var t = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
      var o = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation);
      if (e < t) {
        i = UiLayer_1.UiLayer.UiRootItem.GetWidth() / e;
        this.xNo.SetHeight(i);
        this.xNo.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth());
        if (t > 2.38 && o) {
          i = UiLayer_1.UiLayer.UiRootItem.GetHeight() * e;
          this.xNo.SetWidth(i);
          this.xNo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight());
        }
      } else if (t < e) {
        i = UiLayer_1.UiLayer.UiRootItem.GetHeight() * e;
        this.xNo.SetWidth(i);
        this.xNo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight());
      }
      if (e > 2.3 && o) {
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
      ModelManager_1.ModelManager.PlotModel.LastPlotAspect = e;
      if (o) {
        BlackScreenFadeController_1.BlackScreenFadeController.ChangeAspect(ModelManager_1.ModelManager.PlotModel.LastPlotAspect, true);
      }
      ModelManager_1.ModelManager.PlotModel.LastPlotColor = this.b3c === IAction_1.EMovieBackgroundType.White ? PlotModel_1.COLOR_WHITE : PlotModel_1.COLOR_BLACK;
    };
    this.JEl = i => {
      this.wNo?.SetRate(1);
      if (i) {
        this.fkl.delete(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIButtonComponent]];
  }
  OnStart() {
    this.GetButton(1).RootUIComp.SetUIActive(false);
    this.deo = new PlotSkipComponent_1.PlotSkipComponent(this.GetButton(1), this.HNo, undefined, this);
    this.deo.AddEventListener();
    this.deo.EnableSkipButton(false);
    this.xNo = this.GetButton(0).GetOwner().GetComponentByClass(UE.UITexture.StaticClass());
    if (this.xNo) {
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
      if (ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor) {
        this.b3c = ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor;
      } else {
        this.b3c = this.OpenParam?.BackgroundColor?.FadeInBackgroundType ?? IAction_1.EMovieBackgroundType.Black;
      }
      let i = undefined;
      i = this.b3c === IAction_1.EMovieBackgroundType.White ? new UE.LinearColor(1, 1, 1, 1) : (IAction_1.EMovieBackgroundType.Black, new UE.LinearColor(0, 0, 0, 1));
      e.ClearColor = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Video", 26, "改变CG界面底色", ["color", this.b3c]);
      }
      e = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
      if (ModelManager_1.ModelManager.PlotModel.LastPlotAspect !== PlotModel_1.INVALID_NUM && e > 1) {
        this.zCl = ModelManager_1.ModelManager.PlotModel.LastPlotAspect;
        if (this.zCl < 2.3) {
          this.zCl = e;
        }
        this.ZCl(this.zCl);
      }
      this.sgl = CommonParamById_1.configCommonParamById.GetIntConfig("VideoViewLerpFullTime") ?? 4000;
      this.agl = CommonParamById_1.configCommonParamById.GetIntConfig("VideoViewLerpWaitTime") ?? 1000;
      this.fkl.clear();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Video", 38, "获取CgTexture异常！！");
    }
  }
  ZCl(i) {
    var e;
    var t = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
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
  async OnPlayingStartSequenceAsync() {
    const i = new CustomPromise_1.CustomPromise();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 26, "VideoView界面隐藏");
    }
    this.SetUiActive(false);
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Video", 26, "VideoView界面显示");
      }
      this.SetUiActive(true);
      i.SetResult();
    }, 100);
    await i.Promise;
  }
  OnAfterShow() {
    ResourceSystem_1.ResourceSystem.SetForceLoadModeInGame(GlobalData_1.GlobalData.World, true);
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
    AudioController_1.AudioController.StopEvent(VideoLauncher_1.VideoLauncher.AudioEventResult, !this.FNo);
    AudioController_1.AudioController.SetState(AudioDefine_1.PLOT_VIDEO_GROUP, AudioDefine_1.PLOT_NOT_VIDEO);
    this.RTn = false;
    this.deo?.OnClear();
    this.deo?.RemoveEventListener();
    this.deo = undefined;
  }
  OnBeforeHide() {
    this.fkl.forEach(i => {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(i.HandleId);
    });
    this.fkl.clear();
    ResourceSystem_1.ResourceSystem.SetForceLoadModeInGame(GlobalData_1.GlobalData.World, false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 16, "VideoView OnBeforeHide");
    }
    this.deo.EnableSkipButton(false);
    ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor = undefined;
    ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor = undefined;
    this.b3c = undefined;
  }
  OnBeforeDestroy() {
    this.bra();
    (0, this.OpenParam?.VideoCloseCb)?.();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 16, "VideoView callback done");
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
  JNo(e) {
    if (this.BNo?.length) {
      let i = undefined;
      while (this.BNo.length > 0) {
        if (!(((i = this.BNo[this.BNo.length - 1]).ShowMoment + i.Duration) * VideoDefine_1.VideoUtils.MillisecondPerFrame < e)) {
          break;
        }
        this.BNo.pop();
        if (this.RTn) {
          this.RTn = false;
          this.GetText(2).SetUIActive(false);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Video", 26, "CG字幕关闭", ["id", i.CaptionId], ["frame", e * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", i.ShowMoment + i.Duration]);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Video", 26, "CG字幕废弃", ["id", i.CaptionId]);
        }
        i = undefined;
      }
      var t;
      var o;
      if (!!i && !this.RTn && !(e < i.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame)) {
        this.RTn = true;
        t = this.GetText(2);
        o = ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(i);
        t.SetUIActive(true);
        t.SetText(o);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Video", 26, "CG字幕", ["text", o], ["frame", e * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", i.ShowMoment], ["id", i.CaptionId]);
        }
      }
    }
  }
  chc(i) {
    if (this._hc?.length) {
      while (this._hc.length > 0) {
        var e = this._hc[this._hc.length - 1];
        if (!(e.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame <= i)) {
          break;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Video", 26, "CG QTE", ["qteId", e.QteId], ["frame", i * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", e.ShowMoment]);
        }
        var e = ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(e.QteId, this.JEl, this.JEl, 3);
        if (e) {
          this.fkl.add(e);
          e = e.Config.BaseConfig.TimeDilation;
          this.wNo.SetRate(e);
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
    let i = undefined;
    let e = true;
    switch (this.b3c) {
      case IAction_1.EMovieBackgroundType.White:
        i = new UE.LinearColor(1, 1, 1, 1);
        e = ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(IAction_1.EFadeInScreenShowType.White);
        break;
      case IAction_1.EMovieBackgroundType.Black:
        i = new UE.LinearColor(0, 0, 0, 1);
        e = ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(IAction_1.EFadeInScreenShowType.Black);
        break;
      default:
        i = new UE.LinearColor(0, 0, 0, 1);
    }
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Video", 26, "[VideoView] 当前未开启黑幕界面，继承颜色失败");
      }
    }
    this.xNo.GetTexture().ClearColor = i;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Video", 26, "改变CG界面底色", ["color", this.b3c]);
    }
  }
  OnTick(i) {
    var e;
    if (this.VNo) {
      e = UE.KismetMathLibrary.GetTotalMilliseconds(this.wNo.GetTime());
      this.JNo(e);
      this.chc(e);
    }
    if (this.hgl && (this.lgl += i, this.lgl > this.agl)) {
      e = MathUtils_1.MathUtils.GetRangePct(0, this.sgl - this.agl, this.lgl - this.agl);
      i = this.zCl + (this.YCl - this.zCl) * e;
      this.ZCl(i);
    }
  }
}
exports.VideoView = VideoView;
//# sourceMappingURL=VideoView.js.map