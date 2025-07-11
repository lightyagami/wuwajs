"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const ActorAssistant_1 = require("./Assistant/ActorAssistant");
const CameraAssistant_1 = require("./Assistant/CameraAssistant");
const FlowAssistant_1 = require("./Assistant/FlowAssistant");
const FunctionAssistant_1 = require("./Assistant/FunctionAssistant");
const RenderAssistant_1 = require("./Assistant/RenderAssistant");
const SequenceAssistant_1 = require("./Assistant/SequenceAssistant");
const UiAssistant_1 = require("./Assistant/UiAssistant");
const SequenceDefine_1 = require("./SequenceDefine");
class SequenceController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var t = super.OnInit();
    this.jio = ModelManager_1.ModelManager.SequenceModel;
    SequenceDefine_1.SequenceRenderSettings.SetupSequenceSetting();
    return t;
  }
  static OnClear() {
    this.jio = undefined;
    return super.OnClear();
  }
  static OnTick(t) {
    if (this.jio.DisableMotionBlurFrame > 0 && (this.jio.DisableMotionBlurFrame--, this.jio.DisableMotionBlurFrame === 0)) {
      this.Wio.SetMotionBlurState(true);
    }
    if (this.jio.BeginSwitchFrame > 0 && (this.jio.BeginSwitchFrame--, this.jio.BeginSwitchFrame === 0) && (this.Kio ? this.Kio.EndSwitchPose() : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 38, "SwitchPose 失败!"), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 38, "SwitchPose 结束");
    }
    this.FlushDialogueState();
    if (this.Xio) {
      this.CheckSeqStreamingData();
    }
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new SequenceAssistant_1.SequenceAssistant());
    this.AddAssistant(1, new ActorAssistant_1.ActorAssistant());
    this.AddAssistant(2, new FunctionAssistant_1.FunctionAssistant());
    this.AddAssistant(3, new CameraAssistant_1.CameraAssistant());
    this.AddAssistant(4, new RenderAssistant_1.RenderAssistant());
    this.AddAssistant(5, new FlowAssistant_1.FlowAssistant());
    this.AddAssistant(6, new UiAssistant_1.UiAssistant());
  }
  static get Qio() {
    return this.Assistants.get(0);
  }
  static get Kio() {
    return this.Assistants.get(1);
  }
  static get $io() {
    return this.Assistants.get(2);
  }
  static get Yio() {
    return this.Assistants.get(3);
  }
  static get Wio() {
    return this.Assistants.get(4);
  }
  static get Jio() {
    return this.Assistants.get(5);
  }
  static get zio() {
    return this.Assistants.get(6);
  }
  static Play(t, s, i, e = true, h = true, r = false, a = 1, n = false) {
    if (this.jio.IsPlaying) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("重复播放剧情Sequence，当前一次只能播放一段");
      i(false);
    } else if (t) {
      if (s && s.length > 0) {
        this.Kio.PreLoadMouthAssetName = s;
      } else {
        this.Kio.PreLoadMouthAssetName.length = 0;
      }
      this.jio.Config = t;
      this.jio.IsViewTargetControl = e;
      this.jio.IsSubtitleUiUse = h;
      this.jio.IsWaitRenderData = r;
      this.jio.PlayRate = a;
      this.jio.IsSeamless = n;
      this.jio.FinishCallback = i;
      this.un(t => {
        if (!this.jio.IsEnding) {
          if (t) {
            this.Zio(t => {
              if (!this.jio.IsEnding) {
                if (t) {
                  this.eoo(t => {
                    if (!this.jio.IsEnding) {
                      if (t) {
                        this.too(t => {
                          if (!this.jio.IsEnding) {
                            if (!t) {
                              this.ioo();
                            }
                            this.jio.Reset();
                            this.Bto(t);
                          }
                        });
                      } else {
                        this.ioo();
                        this.Bto(false);
                      }
                    }
                  });
                } else {
                  this.ioo();
                  this.Bto(false);
                }
              }
            });
          } else {
            ControllerHolder_1.ControllerHolder.FlowController.LogError("资源加载失败，不播放Sequence");
            this.ioo();
            this.Bto(false);
          }
        }
      });
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("播放剧情Sequence配置为空");
      i(false);
    }
  }
  static LoadData(t, s) {
    this.jio.State = 1;
    this.jio.Config = t;
    this.Qio.LoadNecessaryData(s);
  }
  static ManualFinish() {
    if (this.jio.State === 0 || this.jio.State === 4 || this.jio.State === 5) {
      this.jio.FinishCallback = undefined;
    } else {
      ModelManager_1.ModelManager.SequenceModel.IsSeamless = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "剧情Sequence强制停止");
      }
      this.ioo();
      this.jio.Reset();
    }
  }
  static un(s) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[剧情加载等待] Sequence加载-开始");
    }
    var t = this.jio.Config.Path;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      this.jio.State = 1;
      var t = this.zio.LoadPromise();
      var i = this.Kio.BeginLoadMouthAssetPromise();
      const e = new CustomPromise_1.CustomPromise();
      const h = new CustomPromise_1.CustomPromise();
      this.Qio.Load(t => {
        if (t) {
          this.zio.PreloadUi(h);
          this.Kio.Load(t => {
            if (t) {
              this.$io.Load(t => {
                if (t) {
                  if (this.jio.IsWaitRenderData) {
                    this.Xio = e;
                    if (Log_1.Log.CheckDebug()) {
                      Log_1.Log.Debug("Plot", 38, "检查手动流送：开始检查完成");
                    }
                    this.CheckSeqStreamingData();
                  } else {
                    if (Log_1.Log.CheckDebug()) {
                      Log_1.Log.Debug("Plot", 38, "检查手动流送：不检查完成");
                    }
                    this.CheckSeqStreamingData();
                    e.SetResult(true);
                  }
                } else {
                  e.SetResult(false);
                }
              });
            } else {
              e.SetResult(false);
            }
          });
        } else {
          e.SetResult(false);
          h.SetResult(false);
        }
      });
      Promise.all([t, i, e.Promise, h.Promise]).then(t => {
        t = t[0] && t[1] && t[2] && t[3];
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "[剧情加载等待] Sequence加载-完成", ["result", t]);
        }
        s(t);
      });
    }
  }
  static Zio(i) {
    this.jio.State = 2;
    this.Jio.PreAllPlay();
    this.Qio.PreAllPlay();
    this.zio.PreAllPlay();
    this.Kio.PreAllPlay(t => {
      var s = () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 38, "开始演出");
        }
        if (t) {
          this.Wio.PreAllPlay();
          this.Yio.PreAllPlay();
          this.$io.PreAllPlay();
          i(t);
        } else {
          i(false);
        }
      };
      if (this.jio.HasPlayedBefore) {
        this.jio.TwiceAnimFlag = true;
        s();
        this.jio.TwiceAnimFlag = false;
        if (!this.jio.IsSeamless) {
          this.jio.HasPlayedBefore = false;
        }
      } else {
        TimerSystem_1.TimerSystem.Next(s);
        if (this.jio.IsSeamless) {
          this.jio.HasPlayedBefore = true;
        }
      }
    });
  }
  static eoo(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotSequencePlay, this.jio.SequenceData.相机过渡时间);
    this.Kio.CheckHideBattleCharacter();
    this.jio.State = 3;
    this.ooo(t);
  }
  static ooo(t) {
    this.Jio.PreEachPlay();
    this.Qio.PreEachPlay();
    this.Kio.PreEachPlay();
    this.Wio.PreEachPlay();
    this.Yio.PreEachPlay();
    this.Qio.Play(() => {
      this.Wio.EachStop();
      this.Qio.EachStop();
      this.zio.EachStop();
      this.Jio.EachStop();
      this.Yio.EachStop();
      if (this.jio.IsFinish()) {
        t(true);
      } else {
        this.ooo(t);
      }
    });
  }
  static too(s) {
    this.jio.State = 4;
    this.$io.AllStop();
    this.Wio.AllStop();
    this.Jio.AllStop();
    this.zio.AllStop();
    var t = this.Kio.AllStopPromise();
    this.Yio.AllStop();
    t.then(t => {
      if (t) {
        this.Qio.AllStop();
        this.ioo();
        s(true);
      } else {
        s(false);
      }
    });
  }
  static ioo() {
    if (!this.jio.IsEnding) {
      this.jio.State = 5;
      this.Wio.End();
      this.Qio.End();
      this.Kio.End();
      this.zio.End();
      this.$io.End();
      this.Jio.End();
      this.Yio.End();
      var t = (0, puerts_1.$ref)(UE.NewArray(UE.KuroPostProcessVolume));
      UE.GameplayStatics.GetAllActorsOfClass(GlobalData_1.GlobalData.World, UE.KuroPostProcessVolume.StaticClass(), t);
      var s = (0, puerts_1.$unref)(t);
      var i = s.Num();
      var e = new UE.FName("SequencePostProcess");
      for (let t = 0; t < i; t++) {
        var h = s.Get(t);
        if (h.ActorHasTag(e)) {
          h.Settings = new UE.PostProcessSettings();
        }
      }
      this.jio.State = 0;
    }
  }
  static Bto(t) {
    var s;
    if (this.jio.FinishCallback) {
      s = this.jio.FinishCallback;
      this.jio.FinishCallback = undefined;
      s(t);
    }
  }
  static get Event() {
    return this.zio.Event;
  }
  static SelectOption(t, s) {
    this.zio.HandleSelectedOption(t, s);
  }
  static FinishSubtitle(t) {
    this.zio.HandlePlotSubtitleEnd(t, true);
  }
  static JumpToNextSubtitleOrChildSeq() {
    this.Qio.JumpToNextSubtitleOrChildSeq();
  }
  static PauseSequence(t) {
    this.Qio.PauseSequence(t);
  }
  static ResumeSequence(t) {
    this.Qio.ResumeSequence(t);
  }
  static SetNextSequenceIndex(t) {
    this.Jio.SetNextSequenceIndex(t);
  }
  static CheckSeqStreamingData() {
    if (this.Wio.CheckSeqStreamingData() && this.Xio) {
      this.Xio.SetResult(true);
      this.Xio = undefined;
    }
  }
  static FlushDialogueState() {
    this.zio.TriggerAllSubtitle();
  }
  static TryApplyMouthAnim(t, s) {
    this.Kio.TryApplyMouthAnim(t, s);
  }
  static StopMouthAnim() {
    if (this.Kio) {
      this.Kio.StopMouthAnim();
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 45, "StopMouthAnim失败,this.ActorAssistant为空");
    }
  }
  static TempHideAllShouanren() {
    this.Kio.TempHideAllShouanren();
  }
  static RunSequenceFrameEvents(t) {
    this.$io.RunSequenceFrameEvents(t);
  }
  static TriggerCutChange() {
    this.jio.DisableMotionBlurFrame = 2;
    this.Wio.SetMotionBlurState(false);
    if (this.jio.Type === 0 && this.Qio.ReadNeedHidePlayer()) {
      this.Kio.PlayerHide();
    }
    this.Yio.CalcPreloadLocation();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.InvalidSeveralFrameOcculusion 5");
  }
  static ShowLogo(t) {
    this.$io.ShowLogo(t);
  }
  static OpenUiView(t, s, i = true) {
    this.$io.OpenBackgroundImage(t, s, i);
  }
  static OpenUiViewForArray(t, s) {
    this.$io.OpenBackgroundImageInArray(t, s);
  }
  static PlayUiLevelSequence(t) {
    this.$io.PlayUiLevelSequence(t);
  }
  static CloseUiView() {
    this.$io.CloseBackgroundImage();
  }
  static PlaySpineAnim(t, s = true) {
    this.$io.PlaySpineAnim(t, s);
  }
  static PlaySpineAnimInArray(t) {
    this.$io.PlaySpineAnimInArray(t);
  }
  static CloseSpineAnim(t) {
    this.$io.CloseSpineAnimation(t);
  }
  static CloseSpineAnimInArray(t) {
    this.$io.CloseSpineAnimationInArray(t);
  }
  static DisableMotionBlurAwhile() {
    this.jio.DisableMotionBlurFrame = 2;
    this.Wio.SetMotionBlurState(false);
  }
  static AdditionSeqPlay(t, s, i, e) {
    this.$io.AdditionSeqPlay(t, s, i, e);
  }
  static AdditionSeqEnd() {
    this.$io.AdditionSeqEnd();
  }
}
(exports.SequenceController = SequenceController).IsTickEvenPausedInternal = true;
SequenceController.Xio = undefined;
SequenceController.jio = undefined; //# sourceMappingURL=SequenceController.js.map