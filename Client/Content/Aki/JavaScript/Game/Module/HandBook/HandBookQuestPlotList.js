"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookQuestPlotTalkAudioUtil = exports.HandBookQuestPlotList = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const Log_1 = require("../../../Core/Common/Log");
const ExternalSourceSettingById_1 = require("../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const PlotAudioModel_1 = require("../Plot/PlotAudioModel");
const PlotTextLogic_1 = require("../Plot/PlotView/PlotTextLogic");
const HandBookDefine_1 = require("./HandBookDefine");
class HandBookQuestPlotList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Fxn = undefined;
    this.Vxn = undefined;
    this.KBn = undefined;
    this.eVs = undefined;
    this.Hxn = undefined;
    this.QBn = undefined;
    this.OptionData = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  async WZt() {
    this.Fxn = new HandBookQuestPlotTalkItem();
    this.Vxn = new HandBookQuestPlotOption();
    this.KBn = new HandBookQuestPlotNode();
    this.eVs = new HandBookQuestPlotOptionTalker();
    this.AddChild(this.Fxn);
    this.AddChild(this.Vxn);
    var t = this.GetItem(0);
    t.SetUIActive(false);
    var i = this.GetItem(1);
    i.SetUIActive(false);
    var s = this.GetItem(2);
    s.SetUIActive(false);
    var e = this.GetItem(3);
    e.SetUIActive(false);
    await Promise.all([this.Fxn.CreateByActorAsync(t.GetOwner()), this.Vxn.CreateByActorAsync(i.GetOwner()), this.KBn.CreateByActorAsync(s.GetOwner()), this.eVs.CreateByActorAsync(e.GetOwner())]);
    this.Vxn.BindClickToggleBack(this.Hxn);
  }
  GetUsingItem(t) {
    return (t.TalkOption ? this.GetItem(1) : t.OptionTalker ? this.GetItem(3) : t.NodeText ? this.GetItem(2) : this.GetItem(0)).GetOwner();
  }
  Update(t, i) {
    var s;
    var e;
    this.OptionData = t;
    this.Fxn?.SetUiActive(false);
    this.Vxn?.SetUiActive(false);
    this.KBn?.SetUiActive(false);
    this.eVs?.SetUiActive(false);
    if (t.NodeText) {
      this.KBn?.SetUiActive(true);
      this.KBn?.RefreshByNodeText(t.NodeText);
    } else if (t.TalkOption) {
      this.Vxn?.SetUiActive(true);
      this.Vxn.RefreshByOption(t.TalkOption, t.PlotId, t.TalkItemId, t.OptionIndex ?? 0, t.IsChoseOption ?? false);
    } else if (t.OptionTalker) {
      this.eVs?.SetUiActive(true);
      s = ModelManager_1.ModelManager.FunctionModel?.GetPlayerName();
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ColonTag") ?? "";
      this.eVs?.RefreshByText(s !== "" ? s + e + " " : "");
    } else {
      this.Fxn?.SetUiActive(true);
      this.Fxn.Refresh(t.TalkOwnerName, t.TalkText, t.PlotAudio);
    }
    if (this.QBn) {
      this.QBn(t.BelongToNode);
    }
  }
  ClearItem() {
    this.Destroy();
  }
  BindClickOptionToggleBack(t) {
    this.Hxn = t;
  }
  BindOnRefreshNode(t) {
    this.QBn = t;
  }
  GetOptionToggle() {
    return this.Vxn?.Toggle;
  }
}
exports.HandBookQuestPlotList = HandBookQuestPlotList;
class HandBookQuestPlotTalkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.jxn = false;
    this.Wxn = undefined;
    this.Kxn = () => {
      if (this.Wxn) {
        if (this.jxn) {
          HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
        } else {
          HandBookQuestPlotTalkAudioUtil.PlayAudio(this.Wxn, this.Qxn);
        }
        this.jxn = !this.jxn;
      }
    };
    this.Qxn = t => {
      if (!t || t !== this.Wxn?.Id) {
        this.GetExtendToggle(3)?.SetToggleState(0);
        this.jxn = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIExtendToggle]];
    this.BtnBindInfo = [[3, this.Kxn]];
  }
  Refresh(t, i, s) {
    this.Wxn = s;
    this.GetText(0)?.SetText(t ?? "");
    s = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i);
    this.GetText(1)?.SetText(s ?? "");
    const e = !!this.Wxn;
    this.GetItem(2)?.SetUIActive(e);
    t = this.GetExtendToggle(3);
    t?.CanExecuteChange.Bind(() => e);
    this.jxn = e && HandBookQuestPlotTalkAudioUtil.IsPlayingAudio(this.Wxn?.Id);
    if (this.jxn) {
      HandBookQuestPlotTalkAudioUtil.ResetPlayEndCallBack(this.Qxn);
    }
    t?.SetToggleStateForce(this.jxn ? 1 : 0);
  }
}
class HandBookQuestPlotOption extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Toggle = undefined;
    this.Ezi = -1;
    this.$xn = -1;
    this.Yxn = 0;
    this.Jxn = undefined;
    this.N8e = t => {
      if (this.Jxn && t === 1) {
        this.Jxn(this.$xn, this.Ezi, this.Yxn, this.Toggle);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.Toggle = this.GetExtendToggle(1);
    this.Toggle?.OnStateChange.Add(this.N8e);
  }
  RefreshByOption(t, i, s, e, o) {
    this.$xn = i;
    this.Ezi = s;
    this.Yxn = e;
    i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalkOption);
    s = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i);
    this.GetText(0)?.SetText(s);
    this.SetToggleState(o ? 1 : 0);
    this.SelectShow(o);
  }
  SetToggleState(t) {
    this.Toggle?.SetToggleStateForce(t, false, false);
  }
  SelectShow(t) {
    if (t) {
      this.GetText(0)?.SetColor(HandBookDefine_1.selectColor);
      this.GetItem(2)?.SetAlpha(1);
      this.GetItem(3)?.SetAlpha(1);
    } else {
      this.GetText(0)?.SetColor(HandBookDefine_1.noSelectColor);
      this.GetItem(2)?.SetAlpha(0);
      this.GetItem(3)?.SetAlpha(0);
    }
  }
  BindClickToggleBack(t) {
    this.Jxn = t;
  }
}
class HandBookQuestPlotNode extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshByNodeText(t) {
    t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t).replace("{q_count}", "0").replace("{q_countMax}", "-");
    this.GetText(0)?.SetText(t);
  }
}
class HandBookQuestPlotOptionTalker extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshByText(t) {
    this.GetText(0)?.SetText(t);
  }
}
const BREAK_TIME = 1000;
const MAX_LOAD_AUDIO_TIME = 3000;
class HandBookQuestPlotTalkAudioUtil {
  static PlayAudio(i, s) {
    this.YZt.Init(t => {
      this.aZi();
      if (this.zxn) {
        this.Zxn(true, i.Id);
      }
      this.UPn = s;
      this.XBn = i.Id;
      this.zxn = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.Zxn();
      }, t);
    });
    this.YZt.Enable();
    var t = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(i.ExternalSourceSetting);
    var e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(i);
    AudioController_1.AudioController.PostEventByExternalSourcesByUi(t.SubtitleEvent, e, t.SubtitleSrc, this.lZi, undefined, PlotTextLogic_1.PLAY_FLAG, this.YZt.AudioDelegate);
    this._Zi = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 5, "加载剧情音频超时");
      }
      this.ClearCurPlayAudio();
    }, MAX_LOAD_AUDIO_TIME);
  }
  static ClearCurPlayAudio() {
    this.XBn = "";
    this.YZt.Disable();
    AudioController_1.AudioController.StopEvent(this.lZi, true, BREAK_TIME);
    this.aZi();
    this.Zxn(false);
  }
  static aZi() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this._Zi)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this._Zi);
    }
    this._Zi = undefined;
  }
  static Zxn(t = true, i) {
    if (this.UPn && t) {
      this.UPn(i);
      this.UPn = undefined;
    }
    if (TimerSystem_1.GameplayTimerSystem.Has(this.zxn)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.zxn);
    }
    this.XBn = "";
    this.zxn = undefined;
  }
  static IsPlayingAudio(t) {
    return this.XBn === t;
  }
  static ResetPlayEndCallBack(t) {
    this.UPn = t;
  }
}
(exports.HandBookQuestPlotTalkAudioUtil = HandBookQuestPlotTalkAudioUtil).lZi = new AudioController_1.PlayResult();
HandBookQuestPlotTalkAudioUtil.YZt = new PlotTextLogic_1.PlotAudioDelegate();
HandBookQuestPlotTalkAudioUtil._Zi = undefined;
HandBookQuestPlotTalkAudioUtil.zxn = undefined;
HandBookQuestPlotTalkAudioUtil.XBn = "";
HandBookQuestPlotTalkAudioUtil.UPn = undefined; //# sourceMappingURL=HandBookQuestPlotList.js.map