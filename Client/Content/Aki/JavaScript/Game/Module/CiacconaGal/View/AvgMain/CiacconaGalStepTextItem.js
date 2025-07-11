"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepTextItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PlotAudioModel_1 = require("../../../Plot/PlotAudioModel");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
const CiacconaGalUtils_1 = require("../../CiacconaGalUtils");
class CiacconaGalTextAnimHandler {
  constructor(i) {
    this.mu1 = i;
    this.Pe = undefined;
    this.r1t = 0;
    this.ae = 0;
  }
  get oRe() {
    if (this.mu1 && this.mu1.IsValid()) {
      return this.mu1;
    }
  }
  SetData(i) {
    this.Pe = i;
  }
  Play() {
    this.Q2c();
    var i;
    var t = PlotAudioById_1.configPlotAudioById.GetConfig(this.Pe.TalkTid);
    if (t) {
      t = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(t);
      i = CiacconaGalDefine_1.CIACCONA_VOICE_AUDIO_EVENT;
      CiacconaGalTextAnimHandler.zRc = AudioSystem_1.AudioSystem.PostEvent(i, undefined, {
        ExternalSourceName: CiacconaGalDefine_1.CIACCONA_VOICE_EXTN_SRC_NAME,
        ExternalSourceMediaName: t,
        CallbackMask: 8,
        CallbackHandler: (i, t) => {
          var e;
          if (i === 3) {
            i = t.Duration;
            this.r1t = i;
            t = this.oRe.GetPlayTween();
            e = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgTextAnimShortenTime();
            t.duration = Math.max(i / MathUtils_1.MathUtils.SecondToMillisecond - e, 1);
            t.from = 0.9;
            t.to = 0.05;
            this.oRe.Play();
            this.ae = Time_1.Time.NowSeconds;
          }
        }
      });
    } else {
      this.pxc();
    }
  }
  pxc() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CiacconaGal", 74, "剧情步骤没有语音配置，使用默认速率播放", ["StepId", this.Pe.Id]);
    }
    var i = this.Pe.TextAnimDefaultDuration;
    this.r1t = i;
    this.oRe.GetPlayTween().duration = i;
    this.oRe.Play();
    this.ae = TimeUtil_1.TimeUtil.GetServerTime();
  }
  Stop() {
    this.Q2c();
    this.oRe?.GetPlayTween()?.GetTweener()?.Kill();
  }
  Skip() {
    var i;
    var t;
    var e;
    var s = this.oRe.GetPlayTween().GetTweener();
    if (s) {
      e = Time_1.Time.NowSeconds - this.ae;
      e = this.r1t * TimeUtil_1.TimeUtil.Millisecond - e;
      i = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgSkippingTime();
      t = s.GetSpeed();
      e = Math.max(e / i, 1);
      s.SetSpeed(t * e);
    }
  }
  Q2c() {
    if (CiacconaGalTextAnimHandler.zRc) {
      AudioSystem_1.AudioSystem.ExecuteAction(CiacconaGalTextAnimHandler.zRc, 0, {
        TransitionDuration: CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION
      });
      CiacconaGalTextAnimHandler.zRc = 0;
    }
  }
}
CiacconaGalTextAnimHandler.zRc = 0;
class CiacconaGalStepTextItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.oRe = undefined;
    this.gLc = undefined;
    this.CLc = undefined;
    this.pLc = undefined;
    this.vLc = undefined;
    this.KL1 = undefined;
    this.Olc = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnAnimEnd();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.gLc = this.GetText(0);
    this.oRe = this.gLc.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.CLc = (0, puerts_1.toManualReleaseDelegate)(this.Olc);
    this.pLc = this.oRe.GetPlayTween().RegisterOnComplete(this.CLc);
    this.vLc = new CiacconaGalTextAnimHandler(this.oRe);
  }
  OnBeforeDestroy() {
    this.oRe?.GetPlayTween()?.UnregisterOnComplete(this.pLc);
    (0, puerts_1.releaseManualReleaseDelegate)(this.Olc);
    this.pLc = undefined;
    this.oRe?.Stop();
    if (this.KL1 && TimerSystem_1.TimerSystem.Has(this.KL1)) {
      TimerSystem_1.TimerSystem.Remove(this.KL1);
      this.KL1 = undefined;
    }
  }
  Refresh(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.gLc, i.TalkTid);
    if (i.Id === ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId) {
      this.gLc.SetChangeColor(false, this.gLc.changeColor);
      if (!ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.HasPlayedStepAnim(i.Id)) {
        this.gLc.SetUIActive(false);
        this.vLc.SetData(i);
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.SetAnimHandler(this.vLc);
        this.vLc.Play();
        if (this.KL1 && TimerSystem_1.TimerSystem.Has(this.KL1)) {
          TimerSystem_1.TimerSystem.Remove(this.KL1);
          this.KL1 = undefined;
        }
        this.KL1 = TimerSystem_1.TimerSystem.Delay(() => {
          if (this.gLc && this.gLc.IsValid()) {
            this.gLc.SetUIActive(true);
          }
        }, CiacconaGalDefine_1.DELAY_SHOW_FOR_TEXT_ANIM);
      }
    } else {
      this.gLc.SetUIActive(true);
      this.gLc.SetChangeColor(true, this.gLc.changeColor);
    }
  }
}
exports.CiacconaGalStepTextItem = CiacconaGalStepTextItem;
//# sourceMappingURL=CiacconaGalStepTextItem.js.map