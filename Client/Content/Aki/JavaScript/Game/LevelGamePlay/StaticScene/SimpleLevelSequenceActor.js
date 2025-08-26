"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const UiManager_1 = require("../../Ui/UiManager");
const CAMERA_TAG = new UE.FName("SequenceCamera");
class SimpleLevelSequenceActor {
  constructor(t) {
    this.bPe = undefined;
    this.qPe = undefined;
    this.GPe = UE.NewArray(UE.Actor);
    this.NPe = 0;
    this.OPe = 0;
    this.kPe = 0;
    this.FPe = 0;
    this.VPe = 0;
    this.HPe = 0;
    this.jPe = 0;
    this.WPe = 0;
    this.KPe = false;
    this.QPe = false;
    this.XPe = false;
    this.$Pe = "";
    this.QWu = "";
    this.rT1 = false;
    this.oT1 = -1;
    this.nT1 = 1;
    this.sT1 = undefined;
    this.aT1 = 0;
    this.YPe = false;
    this.JPe = false;
    this.zPe = 0;
    this.exe = undefined;
    this.txe = false;
    this.ixe = 0;
    this.oxe = 0;
    this.rxe = false;
    this.nxe = 1;
    this.sxe = false;
    this.KWu = undefined;
    this.uIn = undefined;
    this.hT1 = () => {
      if (ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.GetComponent(10)?.GetIsInCinematic()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 45, "DoPlayToMark在Cinematic因此跳过");
        }
        this.XPe = true;
        this.PlayLevelSequence();
      } else if (this.sxe) {
        this.PlayLevelSequence();
      } else if (this.XPe || !this.hxe) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 45, "DoPlayToMark为JumpToEnd或者没有camera轨道", ["CameraMode", ModelManager_1.ModelManager.CameraModel?.CameraMode]);
        }
        this.PlayLevelSequence();
      } else {
        if (this.YPe) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 45, "DoPlayToMark非首次绑定", ["CameraMode", ModelManager_1.ModelManager.CameraModel?.CameraMode]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 45, "DoPlayToMark首次绑定", ["CameraMode", ModelManager_1.ModelManager.CameraModel?.CameraMode]);
        }
        if (this.jPe === 1) {
          this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
            this._xe();
          }, () => {
            this.PlayLevelSequence();
          });
        } else {
          this._xe(() => {
            this.PlayLevelSequence();
          });
        }
      }
    };
    this.B_e = () => {
      this.exe = undefined;
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(this);
      this.rxe = false;
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(8);
      if (!this.JPe && !ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi) {
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(true);
      }
    };
    if ((this.bPe = t).HasBindingTag(CAMERA_TAG, true)) {
      this.hxe = true;
    }
    this.mxe();
  }
  AddOnPauseCallback(t) {
    this.KWu = t;
  }
  ClearOnPausedCallback() {
    this.KWu = undefined;
  }
  AddOnStopCallback(t) {
    this.uIn = t;
  }
  ClearOnStopCallback() {
    this.uIn = undefined;
  }
  UpdateSettings(t) {
    this.JPe = t ?? false;
  }
  GetPlayer() {
    return this.qPe?.SequencePlayer;
  }
  IsPlaying() {
    return this.GetPlayer()?.IsPlaying() ?? false;
  }
  ForceSwitchSceneCamera(t) {
    if (this.qPe?.IsValid()) {
      if (this.hxe) {
        this.sxe = true;
        if (t) {
          this.txe = true;
          this._xe(() => {
            UiManager_1.UiManager.OpenView("TimeTrackControlView", undefined, t => {
              if (t) {
                if (!ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()) {
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，IsToSceneCameraMode");
                  }
                  TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                  ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
                  UiManager_1.UiManager.GetViewByName("TimeTrackControlView")?.CloseMe();
                  ControllerHolder_1.ControllerHolder.TimeTrackController.FinishCallback(false);
                }
              } else {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，OpenView(EUiViewName.TimeTrackControlView");
                }
                TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
                ControllerHolder_1.ControllerHolder.TimeTrackController.FinishCallback(false);
              }
            });
          });
        } else {
          this.txe = false;
          this.dxe();
        }
        return true;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，!this.HasCameraTrack");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，!this.Director?.IsValid()");
      }
      return false;
    }
  }
  PlayToMarkOld(t, i, s, e) {
    if (this.Cxe(t)) {
      this.$Pe = t;
      this.NPe = i;
      this.FPe = s;
      this.XPe = e;
      this.zPe = 0;
      this.gxe();
    }
  }
  PlayToMark(t, i, s, e, h) {
    if (this.Cxe(t)) {
      this.$Pe = t;
      if (i) {
        this.jPe = i.TransitType;
        switch (this.jPe) {
          case 0:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.Duration ?? 0;
            this.OPe = 0;
            this.KPe = i.IsValid ?? false;
            break;
          case 1:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.TransitFadeIn ?? 0;
            this.OPe = i.TransitFadeOut ?? 0;
            this.KPe = i.IsValid ?? false;
            this.ixe = i.Mask;
        }
      }
      if (s) {
        this.WPe = s.TransitType;
        switch (this.WPe) {
          case 0:
            this.HPe = s.Duration ?? 0;
            this.kPe = 0;
            this.FPe = s.Duration ?? 0;
            this.QPe = s.IsValid ?? false;
            break;
          case 1:
            this.HPe = s.Duration ?? 0;
            this.kPe = s.TransitFadeIn ?? 0;
            this.FPe = s.TransitFadeOut ?? 0;
            this.QPe = s.IsValid ?? false;
            this.oxe = s.Mask;
        }
      }
      this.XPe = h;
      this.sT1 = e;
      this.zPe = 0;
      this.gxe();
    }
  }
  PlayLoopBetweenMarks(t, i, s, e, h, r) {
    this.QWu = i ? t.RightMark : t.LeftMark;
    this.$Pe = i ? t.LeftMark : t.RightMark;
    if (s) {
      this.jPe = s.TransitType;
      switch (this.jPe) {
        case 0:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.Duration ?? 0;
          this.OPe = 0;
          this.KPe = s.IsValid ?? false;
          break;
        case 1:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.TransitFadeIn ?? 0;
          this.OPe = s.TransitFadeOut ?? 0;
          this.KPe = s.IsValid ?? false;
          this.ixe = s.Mask;
      }
    }
    if (e) {
      this.WPe = e.TransitType;
      switch (this.WPe) {
        case 0:
          this.HPe = e.Duration ?? 0;
          this.kPe = 0;
          this.FPe = e.Duration ?? 0;
          this.QPe = e.IsValid ?? false;
          break;
        case 1:
          this.HPe = e.Duration ?? 0;
          this.kPe = e.TransitFadeIn ?? 0;
          this.FPe = e.TransitFadeOut ?? 0;
          this.QPe = e.IsValid ?? false;
          this.oxe = e.Mask;
      }
    }
    this.sT1 = h;
    this.XPe = r;
    this.zPe = 3;
    this.gxe();
  }
  PlayLoop(t, i, s, e, h) {
    this.$Pe = "";
    if (s) {
      this.jPe = s.TransitType;
      switch (this.jPe) {
        case 0:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.Duration ?? 0;
          this.OPe = 0;
          this.KPe = s.IsValid ?? false;
          break;
        case 1:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.TransitFadeIn ?? 0;
          this.OPe = s.TransitFadeOut ?? 0;
          this.KPe = s.IsValid ?? false;
          this.ixe = s.Mask;
      }
    }
    if (e) {
      this.WPe = e.TransitType;
      switch (this.WPe) {
        case 0:
          this.HPe = e.Duration ?? 0;
          this.kPe = 0;
          this.FPe = e.Duration ?? 0;
          this.QPe = e.IsValid ?? false;
          break;
        case 1:
          this.HPe = e.Duration ?? 0;
          this.kPe = e.TransitFadeIn ?? 0;
          this.FPe = e.TransitFadeOut ?? 0;
          this.QPe = e.IsValid ?? false;
          this.oxe = e.Mask;
      }
    }
    this.sT1 = h;
    this.rT1 = t;
    this.oT1 = i;
    this.zPe = 2;
    this.gxe();
  }
  gxe() {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
      this.hT1();
    } else if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1);
    }
  }
  PlayLevelSequence() {
    switch (this.zPe) {
      case 0:
      case 1:
        this.lT1(this.$Pe, this.XPe);
        break;
      case 2:
        this._T1(this.rT1, this.oT1);
        break;
      case 3:
        this.XWu(this.XPe);
    }
  }
  lT1(t, i) {
    if (this.qPe?.IsValid()) {
      this.qPe.bOverrideInstanceData = true;
      var s = this.qPe.SequencePlayer;
      if (s?.IsValid()) {
        if (this.aT1) {
          UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1);
          this.aT1 = 0;
        }
        if (i) {
          s.Play();
          s.SetPlaybackPosition(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, t, 2, 1));
          this.nT1 = this.sT1?.PlayRateAbs ?? 1;
          this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1);
          s.Pause();
        } else {
          switch (this.zPe) {
            case 0:
              s.PlayTo(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, t, 2, 0));
              this.nT1 = this.sT1?.PlayRateAbs ?? 1;
              if (this.sT1?.EaseDuration) {
                this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent);
              } else {
                this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1);
              }
              break;
            case 1:
              s.PlayTo_Circle(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, t, 2, 0), true);
              this.nT1 = this.sT1?.PlayRateAbs ?? 1;
              if (this.sT1?.EaseDuration) {
                this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent);
              } else {
                this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1);
              }
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Interaction", 33, "LevelSequence播放至对应mark", ["levelSequence", this.bPe.GetName()], ["mark", t]);
        }
      }
    }
  }
  _T1(t, i) {
    var s;
    if (this.qPe?.IsValid() && (this.qPe.bOverrideInstanceData = true, (s = this.qPe.SequencePlayer)?.IsValid()) && (this.aT1 && (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1), this.aT1 = 0), this.zPe === 2 && (t ? s.PlayReverseLooping(i) : s.PlayLooping(i), this.nT1 = this.sT1?.PlayRateAbs ?? 1, this.sT1?.EaseDuration ? this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent) : this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1)), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Interaction", 39, "LevelSequence循环播放", ["levelSequence", this.bPe.GetName()], ["bReverse", t], ["numLoops", i]);
    }
  }
  XWu(t) {
    if (this.qPe?.IsValid()) {
      this.qPe.bOverrideInstanceData = true;
      const h = this.qPe.SequencePlayer;
      var i;
      var s;
      var e;
      if (h?.IsValid() && (this.aT1 && (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1), this.aT1 = 0), this.nT1 = this.sT1?.PlayRateAbs ?? 1, this.sT1?.EaseDuration ? this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent) : this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1), e = this.GetMarkValue(this.QWu), i = this.GetMarkValue(this.$Pe), e !== undefined) && i !== undefined && e !== i) {
        s = this.GetCurrentFrame();
        if (this.XPe || e < i && i < s || i < e && s < i) {
          this.AddOnPauseCallback(() => {
            this.ClearOnPausedCallback();
            h.PlayTo_Loop(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, this.$Pe, 2, 0), this.QWu);
          });
          e = new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, this.QWu, 2, 1);
          if (this.XPe) {
            h.Play();
            h.SetPlaybackPosition(e);
            h.Pause();
          } else {
            h.PlayTo(e);
          }
        } else {
          h.PlayTo_Loop(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, this.$Pe, 2, 0), this.QWu);
        }
      }
    }
  }
  mxe() {
    var t = new UE.MovieSceneSequencePlaybackSettings();
    t.bDisableMovementInput = false;
    t.bDisableLookAtInput = false;
    this.qPe = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined, false);
    this.qPe.PlaybackSettings = t;
    this.qPe.SetSequence(this.bPe);
    var t = this.qPe.SequencePlayer;
    if (t?.IsValid()) {
      t.OnPause.Add(this.pxe.bind(this));
      t.OnStop.Add(this.vxe.bind(this));
      t.OnFinished.Add(this.Mxe.bind(this));
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 45, "SimpleLevelSequenceActor 没找到Player");
    }
  }
  vxe() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 33, "SimpleLevelSequenceActor OnSequenceStop", ["levelSequence", this.bPe.GetName()]);
    }
    this.uIn?.();
  }
  pxe() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 33, "SimpleLevelSequenceActor OnSequencePause", ["levelSequence", this.bPe.GetName()]);
    }
    this.KWu?.();
    if (!this.XPe) {
      if (this.WPe !== 1 || this.sxe) {
        this.Exe();
      } else {
        this.lxe(this.oxe, this.HPe, this.kPe, this.FPe, () => {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, undefined, this.WPe);
        }, () => {
          this.Exe();
        });
      }
    }
  }
  Mxe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 33, "SimpleLevelSequenceActor OnSequenceFinish", ["levelSequence", this.bPe.GetName()]);
    }
    if (!this.XPe) {
      if (this.WPe !== 1 || this.sxe) {
        this.Exe();
      } else {
        this.lxe(this.oxe, this.HPe, this.kPe, this.FPe, () => {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, undefined, this.WPe);
        }, () => {
          this.Exe();
        });
      }
    }
  }
  Exe() {
    Global_1.Global.CharacterCameraManager.FadeAmount = 0;
    if (!!this.hxe && (!ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera || !this.txe) && !this.sxe) {
      this.dxe();
    }
  }
  Cxe(i) {
    var s = this.bPe.GetMovieScene();
    let e = false;
    if (s) {
      for (let t = 0; t < s.MarkedFrames.Num(); t++) {
        if (s.MarkedFrames.Get(t).Label === i) {
          e = true;
          break;
        }
      }
    }
    return !!e || (Log_1.Log.CheckError() && Log_1.Log.Error("Interaction", 33, "mark配置不合法", ["levelSequence", this.bPe.GetName()], ["mark", i]), false);
  }
  _xe(t = () => {}) {
    var i;
    if (this.qPe?.IsValid()) {
      if (ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Camera", 45, "SimpleLevelSeqeunce:演出中触发了场景镜头切换 请检查配置");
        }
        t();
      } else {
        i = this.qPe.SequencePlayer.IsPlaying();
        if (!this.JPe && !ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi && !i) {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(false);
        }
        if (!this.exe?.IsBinding) {
          this.exe = ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.GetUnBoundSceneCamera(0);
          this.exe.IsKeepUi = this.JPe;
          if (this.KPe) {
            this.exe.FadeIn = this.NPe !== 0 ? this.NPe : this.VPe;
          } else {
            this.exe.FadeIn = 0;
          }
          if (this.QPe) {
            this.exe.FadeOut = this.FPe !== 0 ? this.FPe : this.HPe;
          } else {
            this.exe.FadeOut = 0;
          }
        }
        this.GPe.Empty();
        this.GPe.Add(this.exe.Camera);
        this.qPe.SetBindingByTag(CAMERA_TAG, this.GPe, true);
        if (ModelManager_1.ModelManager.CameraModel.CameraMode === 3) {
          this.YPe = true;
          this.exe.IsBinding = true;
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterSceneSubCamera(this.exe);
          t();
        } else if (this.sxe) {
          if (this.jPe === 1) {
            this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
              ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, 0, 0, 0, () => {
                if (ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()) {
                  t();
                } else {
                  TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                  ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
                }
              }, true);
            });
          } else {
            ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, this.NPe ?? 1, 0, 0, () => {
              if (ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()) {
                t();
              } else {
                TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
              }
            }, true);
          }
        } else {
          ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, this.jPe === 1 ? 0 : this.NPe ?? 1, 0, 0);
          t();
          this.YPe = true;
          this.exe.IsBinding = true;
        }
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 45, "SimpleLevelSeqeunce:EnterSceneCamera Director为空");
      }
      t();
    }
  }
  dxe() {
    this.qPe.ResetBindings();
    this.YPe = false;
    if (this.exe?.IsBinding) {
      if (this.sxe) {
        if (this.WPe === 1) {
          this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
            this.exe.FadeOut = 0;
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, this.B_e, this.WPe);
          });
        } else {
          this.exe.FadeOut = this.FPe !== 0 ? this.FPe : this.HPe;
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, this.B_e, this.WPe);
        }
      } else if (this.WPe === 1) {
        this.B_e();
      } else {
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, this.B_e, this.WPe);
      }
    } else {
      this.B_e();
    }
  }
  lxe(t, i, s, e, h = () => {}, r = () => {}) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Lock(this);
    this.rxe = true;
    ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(8, 3, () => {
      if (h) {
        h();
      }
      if (i <= 0) {
        if (r) {
          r();
        }
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(8, undefined, e ?? 0);
      } else {
        TimerSystem_1.TimerSystem.Delay(() => {
          if (r) {
            r();
          }
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(8, undefined, e ?? 0);
        }, (i ?? 0) * 1000);
      }
    }, s ?? 0, t === 0 ? IAction_1.EFadeInScreenShowType.Black : IAction_1.EFadeInScreenShowType.White);
  }
  SetSequenceData(t) {
    if (t !== this.bPe) {
      this.bPe = t;
      this.qPe.SetSequence(t);
    }
  }
  Clear() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1);
    }
    if (this.exe) {
      if (this.exe.IsBinding) {
        if (!this.JPe && !ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi && !this.txe) {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(true);
        }
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe);
      }
      ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.RemoveBoundSceneCamera(this.exe);
    }
    if (this.aT1) {
      UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1);
      this.aT1 = 0;
    }
    if (this.qPe?.IsValid()) {
      const t = this.qPe;
      t.SequencePlayer?.Stop();
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("SimpleLevelSequenceActor.Clear", t);
      });
      this.qPe = undefined;
    }
    if (this.rxe) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(this);
      this.rxe = false;
    }
    this.ClearOnPausedCallback();
  }
  PlayToMarkByCheckWay(t, i, s, e, h) {
    if (this.Cxe(t)) {
      this.$Pe = t;
      if (i) {
        this.jPe = i.TransitType;
        switch (this.jPe) {
          case 0:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.Duration ?? 0;
            this.OPe = 0;
            this.KPe = i.IsValid ?? false;
            break;
          case 1:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.TransitFadeIn ?? 0;
            this.OPe = i.TransitFadeOut ?? 0;
            this.KPe = i.IsValid ?? false;
            this.ixe = i.Mask;
        }
      }
      if (s) {
        this.WPe = s.TransitType;
        switch (this.WPe) {
          case 0:
            this.HPe = s.Duration ?? 0;
            this.kPe = 0;
            this.FPe = s.Duration ?? 0;
            this.QPe = s.IsValid ?? false;
            break;
          case 1:
            this.HPe = s.Duration ?? 0;
            this.kPe = s.TransitFadeIn ?? 0;
            this.FPe = s.TransitFadeOut ?? 0;
            this.QPe = s.IsValid ?? false;
            this.oxe = s.Mask;
        }
      }
      this.XPe = h;
      this.sT1 = e;
      this.CheckLatestWay();
      this.gxe();
    }
  }
  GetMarkValue(i) {
    var s = this.bPe.GetMovieScene();
    for (let t = 0; t < s.MarkedFrames.Num(); t++) {
      if (s.MarkedFrames.Get(t).Label === i) {
        return this.Sxe(s.MarkedFrames.Get(t).FrameNumber.Value);
      }
    }
  }
  CheckLatestWay() {
    var t;
    var i;
    var s;
    var e;
    if (this.bPe.GetMovieScene()) {
      e = this.qPe.SequencePlayer;
      t = this.GetMarkValue(this.$Pe);
      i = e.GetStartTime().Time.FrameNumber.Value;
      s = e.GetEndTime().Time.FrameNumber.Value;
      e = e.GetCurrentTime().Time.FrameNumber.Value;
      if (Math.abs(t - e) > Math.abs(s - i - Math.abs(t - e))) {
        this.zPe = 1;
      } else {
        this.zPe = 0;
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 45, "检查最短路径，但movieScene为空");
    }
  }
  Sxe(t) {
    var i = this.bPe.GetMovieScene();
    return t * i.DisplayRate.Numerator / i.TickResolution.Numerator;
  }
  SetTimeDilation(t) {
    if (this.nxe !== t) {
      this.nxe = t;
      this.yxe();
    }
  }
  yxe() {
    if (this.aT1) {
      UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1);
      this.aT1 = 0;
    }
    this.qPe.SequencePlayer.SetPlayRate(this.nxe * this.nT1);
  }
  GetCurrentFrame() {
    if (this.qPe) {
      return this.qPe.SequencePlayer.GetCurrentTime().Time.FrameNumber.Value;
    } else {
      return 0;
    }
  }
  IsReversePlay() {
    return this.rT1;
  }
}
exports.default = SimpleLevelSequenceActor;
//# sourceMappingURL=SimpleLevelSequenceActor.js.map