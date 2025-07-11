"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalScreenaView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const factor = new UE.FName("factor");
const FONTSUFFIX = "</size>";
const LOOP_DIGITAL_SCREEN = "play_ui_digital_screen";
class DigitalScreenaView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.XYt = undefined;
    this.wZi = 0;
    this.BZi = 1;
    this.Dga = 1;
    this.v6t = "";
    this.E6t = "";
    this.Apa = 0;
    this.Upa = "";
    this.xpa = "";
    this.Ppa = "";
    this.wpa = "";
    this.HFo = false;
    this.Bpa = false;
    this.xXt = 0;
    this.bpa = 0;
    this.qpa = "";
    this.Gpa = 0;
    this.LevelSequencePlayer = undefined;
    this.L7a = undefined;
    this.A7a = undefined;
    this.Uv1 = undefined;
    this.Dv1 = i => {
      var t = this.XYt.GetPlayTween();
      var i = Math.round(i * (t.to - t.from)) + t.from;
      if (this.xXt < i) {
        this.xXt = i;
        t = this.qpa + ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(this.bpa, this.xXt) + FONTSUFFIX;
        i = this.qpa + ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(this.bpa, this.xXt) + "_" + FONTSUFFIX;
        if (this.Apa === 1) {
          this.Upa = this.v6t + i;
          this.xpa = this.v6t + t;
          this.GetText(1)?.SetText(this.Upa);
        } else if (this.Apa === 0) {
          this.Ppa = this.E6t + i;
          this.wpa = this.E6t + t;
          this.GetText(2)?.SetText(this.Ppa);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UISprite]];
  }
  OnStart() {
    ModelManager_1.ModelManager.PlotModel.InDigitalScreen = true;
    this.Opa();
    AudioSystem_1.AudioSystem.PostEvent(LOOP_DIGITAL_SCREEN);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.XYt = this.GetText(2).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
    this.LevelSequencePlayer.PlayLevelSequenceByName("Loop");
    if (ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes[0] === 0) {
      this.YZi();
    } else {
      this.A7a = TimerSystem_1.TimerSystem.Delay(() => {
        this.YZi();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes[0] ?? 1));
    }
    this.L7a = TimerSystem_1.TimerSystem.Delay(() => {
      this.CloseMe();
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.DigitalScreenModel?.ExistTime ?? 1));
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.PlotModel.InDigitalScreen = false;
    this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
    AudioSystem_1.AudioSystem.ExecuteAction(LOOP_DIGITAL_SCREEN, 0);
    this.Lfa();
  }
  Lfa() {
    if (this.L7a && TimerSystem_1.TimerSystem.Has(this.L7a)) {
      TimerSystem_1.TimerSystem.Remove(this.L7a);
    }
    if (this.A7a && TimerSystem_1.TimerSystem.Has(this.A7a)) {
      TimerSystem_1.TimerSystem.Remove(this.A7a);
    }
  }
  OnTick(i) {
    if (!this.HFo) {
      this.Gpa += i;
      if (this.Gpa >= 300) {
        if (this.Apa === 0) {
          if (this.Bpa) {
            this.GetText(1)?.SetText(this.xpa);
            this.Bpa = false;
          } else {
            this.GetText(1)?.SetText(this.Upa);
            this.Bpa = true;
          }
        } else if (this.Apa === 1) {
          if (this.Bpa) {
            this.GetText(2)?.SetText(this.wpa);
            this.Bpa = false;
          } else {
            this.GetText(2)?.SetText(this.Ppa);
            this.Bpa = true;
          }
        }
        this.Gpa = 0;
      }
    }
  }
  Opa() {
    this.wZi = -1;
    this.BZi = ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes.length ?? 1;
    this.Dga = 0;
    if (!StringUtils_1.StringUtils.IsBlank(ModelManager_1.ModelManager.DigitalScreenModel.BackgroundPicture)) {
      this.SetTextureByPath(ModelManager_1.ModelManager.DigitalScreenModel.BackgroundPicture, this.GetTexture(3));
    }
    if (ModelManager_1.ModelManager.DigitalScreenModel.ViewType === 0 && !StringUtils_1.StringUtils.IsBlank(ModelManager_1.ModelManager.DigitalScreenModel.LogoIcon)) {
      this.SetSpriteByPath(ModelManager_1.ModelManager.DigitalScreenModel.LogoIcon, this.GetSprite(4), false);
    }
    this.xpa = "";
    this.Upa = "_";
    this.wpa = "";
    this.Ppa = "_";
    this.GetText(2)?.SetText("");
    this.GetText(1)?.SetText("");
    this.GetText(2)?.SetCustomMaterialScalarParameter(factor, ModelManager_1.ModelManager.DigitalScreenModel?.TextFactor ?? 0.2);
    this.GetText(1)?.SetCustomMaterialScalarParameter(factor, ModelManager_1.ModelManager.DigitalScreenModel?.TextFactor ?? 0.2);
  }
  VZi(i, t, e, s) {
    var h = this.XYt.GetPlayTween();
    h.from = i;
    h.to = t;
    h.duration = e;
    h.startDelay = s;
    this.XYt.Play();
    this.Dga = t;
    this.HFo = true;
    var i = h?.GetTweener();
    if (i) {
      this.Uv1 = (0, puerts_1.toManualReleaseDelegate)(this.Dv1);
      i.OnUpdate(this.Uv1);
    }
  }
  oeo() {
    this.A7a = TimerSystem_1.TimerSystem.Delay(() => {
      this.reo();
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.DigitalScreenModel?.DuringTimes[this.wZi] ?? 1));
  }
  reo() {
    var i;
    if (!(this.wZi >= this.BZi)) {
      this.HFo = false;
      if ((i = this.XYt.GetPlayTween()?.GetTweener()) && (i.OnUpdate(undefined), this.Uv1)) {
        (0, puerts_1.releaseManualReleaseDelegate)(this.Dv1);
        this.Uv1 = undefined;
      }
      if (ModelManager_1.ModelManager.DigitalScreenModel?.DelayTimes[this.wZi] === 0) {
        this.YZi();
      } else {
        this.A7a = TimerSystem_1.TimerSystem.Delay(() => {
          this.YZi();
        }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.DigitalScreenModel?.DelayTimes[this.wZi] ?? 1));
      }
    }
  }
  YZi() {
    this.GetText(1)?.SetText(this.xpa);
    this.GetText(2)?.SetText(this.wpa);
    this.wZi = this.wZi + 1;
    if (!(this.wZi >= ModelManager_1.ModelManager.DigitalScreenModel.Size)) {
      this.Apa = ModelManager_1.ModelManager.DigitalScreenModel.ContentPos[this.wZi] === 0 ? 0 : 1;
      this.bpa = this.xXt;
      this.v6t = this.xpa;
      this.E6t = this.wpa;
      this.qpa = "<size=" + ModelManager_1.ModelManager.DigitalScreenModel.Font[this.wZi].toString() + ">";
      this.VZi(this.Dga, this.Dga + ModelManager_1.ModelManager.DigitalScreenModel.TextLength[this.wZi], ModelManager_1.ModelManager.DigitalScreenModel.DuringTimes[this.wZi], 0);
      this.oeo();
    }
  }
  async OnBeforeHideAsync() {
    if (this.OpenParam?.FadeBeforeHide) {
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3);
    }
  }
  OnBeforeDestroy() {
    if (this.Uv1) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.Dv1);
      this.Uv1 = undefined;
    }
  }
}
exports.DigitalScreenaView = DigitalScreenaView;
//# sourceMappingURL=DigitalScreenaView.js.map