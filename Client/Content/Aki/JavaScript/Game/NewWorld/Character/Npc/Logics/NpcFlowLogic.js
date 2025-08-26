"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcFlowLogic = exports.AudioDelegate = undefined;
const puerts_1 = require("puerts");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../../Core/Common/Log");
const ExternalSourceSettingById_1 = require("../../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../../UniverseEditor/Interface/IAction");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PlotAudioModel_1 = require("../../../../Module/Plot/PlotAudioModel");
const CharacterFlowLogic_1 = require("../../Common/Component/Flow/CharacterFlowLogic");
const NpcRedDotFlowLogic_1 = require("./NpcRedDotFlowLogic");
const DEFAULT_WAIT_TIME = 3;
const LOAD_AUDIO_TIME = 1;
const PLAY_FLAG = 8;
const BREAK_TIME = 1;
class AudioDelegate {
  constructor() {
    this.AudioDelegate = undefined;
    this.AudioDelegateEnable = false;
    this.Callback = undefined;
    this.Entity = undefined;
    this.Config = undefined;
    this.ExtraDuration = 0;
    this.sZi = (i, t) => {
      if (this.AudioDelegateEnable) {
        if (i === 3) {
          this.Callback(t.Duration + this.ExtraDuration, this.Entity, this.Config);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 26, "冒泡音频回调没移除成功");
      }
    };
  }
  Init(i, t, e, o = 0) {
    this.Callback = i;
    this.Entity = t;
    this.Config = e;
    this.ExtraDuration = o;
  }
  Clear() {
    this.Disable();
    this.Callback = undefined;
    this.Entity = undefined;
    this.Config = undefined;
  }
  Enable() {
    if (!this.AudioDelegateEnable) {
      this.AudioDelegate = (0, puerts_1.toManualReleaseDelegate)(this.sZi);
      this.AudioDelegateEnable = true;
    }
  }
  Disable() {
    if (this.AudioDelegate !== undefined) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.sZi);
      this.AudioDelegate = undefined;
    }
    this.AudioDelegateEnable = false;
  }
  ManualExec(i) {
    this.Callback(i, this.Entity, this.Config);
  }
}
exports.AudioDelegate = AudioDelegate;
class NpcFlowLogic extends CharacterFlowLogic_1.CharacterFlowLogic {
  constructor() {
    super(...arguments);
    this.Per = new AudioController_1.PlayResult();
    this.YZt = new AudioDelegate();
    this.xer = false;
    this.wer = undefined;
    this.lei = (i, t, e) => {
      this.xer = false;
      this.WaitSecondsRemain = i > 0 ? TimeUtil_1.TimeUtil.SetTimeSecond(i) : DEFAULT_WAIT_TIME;
      i = this.GetFlowText(e.TidTalk);
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        e = e.WaitTime && e.WaitTime > 0 ? e.WaitTime + 0.05 : this.WaitSecondsRemain + 0.05;
        t = t.GetComponent(82);
        this.IsWaitForDialogueUi = true;
        t.SetDialogueText(i, e).finally(() => {
          this.IsWaitForDialogueUi = false;
        });
      }
    };
  }
  get RedDotLogic() {
    this.wer ||= new NpcRedDotFlowLogic_1.NpcRedDotFlowLogic();
    return this.wer;
  }
  ResetFlowState() {
    super.ResetFlowState();
    this.RedDotLogic.ManualControlRedDotActive(false, false);
  }
  PlayTalk(i) {
    if (i < this.CurrentTalkItems.length && this.DynamicFlowData && this.DynamicFlowData.RedDot !== undefined) {
      this.RedDotLogic.ManualControlRedDotActive(true, this.DynamicFlowData.RedDot);
    }
    super.PlayTalk(i);
  }
  HandleTalkAction(i, t) {
    if (!i) {
      return false;
    }
    this.MZi(t?.TalkAkEvent);
    this.xer = false;
    if (t.Montage) {
      i.GetComponent(186)?.TryPlayMontage(t.Montage.ActionMontage.Path);
    }
    var e = t.PlayVoice ? PlotAudioById_1.configPlotAudioById.GetConfig(t.TidTalk) : undefined;
    if (e) {
      this.Ber(e, t, i);
    } else {
      if (t.UniversalTone) {
        var e = t.UniversalTone.UniversalToneId;
        var o = t.UniversalTone.TimberId || i.GetComponent(186)?.GetTimberId();
        if (o && e) {
          var s = InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(o, e);
          if (s) {
            this.ber(s, t, i);
            return true;
          }
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Plot", 26, "通用语气配置无法获取，策划检查配置捏", ["entity", i.Id], ["timberId", o], ["universalToneId", e]);
        }
      }
      s = this.GetFlowText(t.TidTalk);
      this.WaitSecondsRemain = this.GetWaitSeconds(t);
      o = this.WaitSecondsRemain + 0.05;
      this.IsWaitForDialogueUi = true;
      i.GetComponent(82).SetDialogueText(s, o, this.RedDotLogic.GetRedDotActive()).finally(() => {
        this.IsWaitForDialogueUi = false;
      });
    }
    return true;
  }
  Ber(i, t, e) {
    this.xer = true;
    this.WaitSecondsRemain = LOAD_AUDIO_TIME;
    var o = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(i.ExternalSourceSetting);
    var s = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(i);
    this.YZt.Init(this.lei, e, t, i.TailTime < 0 ? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.BubbleAudioEndDelay : i.TailTime);
    this.YZt.Enable();
    AudioController_1.AudioController.PostEventByExternalSources(o.BubbleEvent, this.ActorComp?.Owner, s, o.BubbleSrc, this.Per, undefined, PLAY_FLAG, this.YZt.AudioDelegate);
  }
  ber(i, t, e) {
    this.xer = true;
    this.WaitSecondsRemain = LOAD_AUDIO_TIME;
    this.YZt.Init(this.lei, e, t);
    this.YZt.Enable();
    AudioController_1.AudioController.PostEvent(i.AkEvent, this.ActorComp?.Owner, this.Per, PLAY_FLAG, this.YZt.AudioDelegate);
  }
  MZi(i) {
    var t;
    var e;
    var o;
    if (i) {
      if (i.Type === IAction_1.EPostAkEvent.Global) {
        t = i.AkEvent;
        AudioController_1.AudioController.PostEvent(t, undefined);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Event", 26, "[NpcFlowLogic][FlowAudio][Global]", ["AkEvent", i?.AkEvent]);
        }
      } else if (i.Type === IAction_1.EPostAkEvent.Target) {
        t = i.AkEvent;
        e = i.EntityId;
        if (!(o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", e]);
          }
        }
        if ((o = o.Entity.GetComponent(1)?.Owner)?.IsValid()) {
          AudioController_1.AudioController.PostEvent(t, o);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Event", 26, "[NpcFlowLogic][FlowAudio][Entity]", ["EntityID", e], ["AkEvent", i?.AkEvent]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", e]);
        }
      }
    }
  }
  Tick(i) {
    if (!!this.EnableUpdate && !this.IsWaitForDialogueUi) {
      this.WaitSecondsRemain -= i;
      if (this.WaitSecondsRemain <= 0) {
        if (this.xer) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 26, "冒泡音频加载超时");
          }
          this.xer = false;
          this.ClearAudio();
          this.YZt.ManualExec(0);
        } else if (this.IsExecuteFlowEnd) {
          if (this.IsPause) {
            this.EnableUpdate = false;
          } else {
            this.StartFlow();
          }
        } else {
          this.PlayTalk(this.CurrentTalkId + 1);
        }
      }
    }
  }
  ClearAudio() {
    this.xer = false;
    if (this.YZt) {
      this.YZt.Disable();
    }
    if (this.Per) {
      AudioController_1.AudioController.StopEvent(this.Per, true, BREAK_TIME * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
}
exports.NpcFlowLogic = NpcFlowLogic;
//# sourceMappingURL=NpcFlowLogic.js.map