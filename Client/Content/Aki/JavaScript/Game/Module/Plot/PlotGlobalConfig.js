"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotGlobalConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
class PlotGlobalConfig {
  constructor() {
    this.EndWaitTimeLevelC = 0;
    this.EndWaitTimeLevelD = 0;
    this.EndWaitTimeInteraction = 0;
    this.EndWaitTimeCenterText = 0;
    this.TextAnimSpeedSeq = 0;
    this.TextAnimSpeedLevelC = 0;
    this.TextAnimSpeedLevelD = 0;
    this.TextAnimSpeedInteraction = 0;
    this.TextAnimSpeedCenterText = 0;
    this.JumpWaitTime = 0;
    this.GuardTime = 0;
    this.AudioDelay = 0;
    this.AudioTransitionDuration = 0;
    this.CenterTextFontSizeSmall = 0;
    this.CenterTextFontSizeMiddle = 0;
    this.CenterTextFontSizeBig = 0;
    this.TemplateCameraShakePath = "";
    this.PlotGoBattleMaterialPath = "";
    this.PlotTemplateCameraExitRotation = new Rotator_1.Rotator();
    this.PlotTemplateLookAtDelay = [300, 1000];
    this.CallShowAudioEvent = "";
    this.CallHideAudioEvent = "";
    this.SequenceEndLeastTime = 0;
    this.DoubleClickInterval = 0;
    this.TipsDuration = 0;
    this.SkipPressingTime = 0;
    this.ClickBufferTime = 0;
    this.DisableFlow = false;
    this.WaitCalmTime = 4000;
    this.DragDist = 100;
    this.SkipTipsOpenTime = 3;
    this.AudioEndWaitTimePrompt = 0;
    this.DefaultDurationPrompt = 0;
    this.ProtectOptionTime = 0;
    this.AudioEndDelay = 0;
    this.BubbleAudioEndDelay = 0;
    this.TransitionPopupTime = 0;
    this.gU = false;
  }
  Init() {
    if (!this.gU) {
      this.EndWaitTimeLevelC = this.xYi("LevelC.EndWaitTime");
      this.EndWaitTimeLevelD = this.xYi("LevelD.EndWaitTime");
      this.EndWaitTimeInteraction = this.xYi("Interaction.EndWaitTime");
      this.EndWaitTimeCenterText = this.xYi("CenterText.EndWaitTime");
      this.TextAnimSpeedSeq = this.xYi("Seq.CharPerSec") / TimeUtil_1.TimeUtil.Minute;
      this.TextAnimSpeedLevelC = this.xYi("LevelC.CharPerSec") / TimeUtil_1.TimeUtil.Minute;
      this.TextAnimSpeedLevelD = this.xYi("LevelD.CharPerSec") / TimeUtil_1.TimeUtil.Minute;
      this.TextAnimSpeedInteraction = this.xYi("Interaction.CharPerSec") / TimeUtil_1.TimeUtil.Minute;
      this.TextAnimSpeedCenterText = this.xYi("CenterText.CharPerSec");
      this.JumpWaitTime = this.xYi("Talk.JumpWaitTime");
      this.GuardTime = this.xYi("Talk.GuardTime");
      this.AudioDelay = this.xYi("Talk.AudioDelay");
      this.AudioTransitionDuration = this.xYi("Talk.AudioTransitionDuration");
      this.CenterTextFontSizeSmall = this.xYi("CenterText.FontSizeSmall");
      this.CenterTextFontSizeMiddle = this.xYi("CenterText.FontSizeMiddle");
      this.CenterTextFontSizeBig = this.xYi("CenterText.FontSizeBig");
      this.TemplateCameraShakePath = this.wYi("PlotTemplate.CameraShake") ?? "";
      this.PlotGoBattleMaterialPath = this.wYi("Plot.GoBattleMaterialPath") ?? "";
      this.BYi();
      this.bYi();
      this.CallShowAudioEvent = this.wYi("PhoneCall.CallShowAudioEvent") ?? "";
      this.CallHideAudioEvent = this.wYi("PhoneCall.CallHideAudioEvent") ?? "";
      this.SequenceEndLeastTime = this.xYi("Sequence.SequenceEndLeastTime");
      this.TipsDuration = this.xYi("Plot.TipsDuration");
      this.SkipPressingTime = this.xYi("Plot.SkipPressingTime");
      this.DoubleClickInterval = this.xYi("Plot.DoubleClickInterval");
      this.ClickBufferTime = this.xYi("Plot.ClickBufferTime");
      this.DisableFlow = this.xYi("Plot.DisableFlow") >= 1;
      this.WaitCalmTime = this.xYi("Plot.WaitCalmTime") * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.DragDist = this.xYi("Plot.DragDist");
      this.AudioEndWaitTimePrompt = this.xYi("Plot.AudioEndWaitTimePrompt");
      this.DefaultDurationPrompt = this.xYi("Plot.DefaultDurationPrompt");
      this.ProtectOptionTime = this.xYi("Plot.ProtectOptionTime") * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.AudioEndDelay = this.xYi("Plot.AudioEndDelay");
      this.BubbleAudioEndDelay = this.xYi("Plot.BubbleAudioEndDelay");
      this.TransitionPopupTime = this.xYi("Plot.TransitionPopupTime");
      this.gU = true;
    }
  }
  BYi() {
    var t = this.wYi("PlotTemplate.LookAtDelay");
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if ((t = t.split(",")).length === 2) {
        this.PlotTemplateLookAtDelay = [parseFloat(t[0]) * CommonDefine_1.MILLIONSECOND_PER_SECOND, parseFloat(t[1]) * CommonDefine_1.MILLIONSECOND_PER_SECOND];
      }
    }
  }
  bYi() {
    var t = this.wYi("PlotTemplate.CameraExitRotation");
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if ((t = t.split(",")).length === 3) {
        this.PlotTemplateCameraExitRotation = Rotator_1.Rotator.Create(parseFloat(t[0]), parseFloat(t[1]), parseFloat(t[2]));
      }
    }
  }
  wYi(t) {
    var i = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(t);
    if (i) {
      return i.Value;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 17, "已经使用的全局配置字段不能乱删！！！", ["被删掉的全局配置字段", t]);
    }
  }
  xYi(t) {
    t = this.wYi(t);
    if (t) {
      return parseFloat(t);
    } else {
      return 0;
    }
  }
}
exports.PlotGlobalConfig = PlotGlobalConfig;
//# sourceMappingURL=PlotGlobalConfig.js.map