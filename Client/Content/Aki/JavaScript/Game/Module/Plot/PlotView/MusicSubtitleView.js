"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicSubtitleView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const HIDE_TRANSLATION_LABEL = "{KeepOrigin}";
const AUDIO_SYNC_TIME = 1000;
const LAG_TIME = 100;
class SubtitleConfigProxy {
  constructor() {
    this.StartTime = 0;
    this.EndTime = 0;
    this.OriginSubtitleId = "";
    this.TranslationSubtitleId = "";
    this.HideTranslationSubtitle = false;
  }
}
class MusicSubtitleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.gdg = [];
    this.EFc = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.Cce = 0;
    this.Cdg = undefined;
    this.pdg = 0;
    this.sye = false;
    this.Bln = undefined;
    this.vdg = false;
    this.ydg = () => {
      var i = UiManager_1.UiManager.GetViewByName("VideoView");
      if (!this.vdg && i) {
        i = i.GetRootItem();
        this.GetOriginalItem().SetUIParent(i);
        this.vdg = true;
      }
    };
    this.Sdg = i => {
      if (this.vdg) {
        this.GetOriginalItem().SetUIParent(UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Float));
        this.vdg = false;
      }
      if (!i) {
        if (this.EFc !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.EFc, 0);
          this.EFc = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
        }
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.GetText(0).SetUIActive(false);
    this.GetText(1).SetUIActive(false);
    var i = this.OpenParam;
    var t = i.MusicSubtitleGroupTag;
    this.Bln = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent);
    if (t && this.Bln) {
      i = ConfigManager_1.ConfigManager.MusicSubtitleConfig.GetMusicSubtitle(t);
      if (i) {
        for (const s of i) {
          var e = new SubtitleConfigProxy();
          e.StartTime = s.AppearTime * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          e.EndTime = s.EndTime * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          e.OriginSubtitleId = PublicUtil_1.PublicUtil.GetConfigIdByTable(5, s.Id);
          e.TranslationSubtitleId = PublicUtil_1.PublicUtil.GetConfigIdByTable(6, s.Id);
          e.HideTranslationSubtitle = e.TranslationSubtitleId === HIDE_TRANSLATION_LABEL;
          this.gdg.push(e);
        }
        this.gdg.sort((i, t) => i.StartTime - t.StartTime);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Plot", 26, "[MusicSubtitle] 找不到音乐字幕配置", ["id", t]);
        }
        this.CloseMe();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 26, "[MusicSubtitle] 音乐字幕配置错误", ["id", t], ["akEvent", this.Bln]);
      }
      this.CloseMe();
    }
  }
  OnAfterShow() {
    var i;
    this.ydg();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VideoViewShow, this.ydg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VideoViewHide, this.Sdg);
    if (this.EFc === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      this.EFc = AudioSystem_1.AudioSystem.PostEvent(this.Bln, undefined, {
        CallbackHandler: (i, t) => {
          if (i === 0) {
            this.EFc = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Plot", 26, "[MusicSubtitle] 音乐字幕播放结束", ["akEvent", this.Bln]);
            }
            this.CloseMe();
          } else if (i === 3) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Plot", 26, "[MusicSubtitle] 音乐字幕播放开始", ["akEvent", this.Bln]);
            }
            this.sye = true;
          }
        },
        CallbackMask: 1048585
      });
    } else if ((i = AudioSystem_1.AudioSystem.GetSourcePlayPosition(this.EFc)) !== undefined) {
      this.Cce = i;
      this.sye = true;
    } else {
      this.EFc = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
    if (this.EFc !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 56, "[MusicSubtitle][Game.Action] PostEvent", ["Event", this.Bln]);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[MusicSubtitle] 音乐字幕播放失败", ["akEvent", this.Bln]);
      }
      this.CloseMe();
    }
  }
  OnAfterHide() {
    if (this.vdg) {
      this.GetOriginalItem().SetUIParent(UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Float));
      this.vdg = false;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VideoViewShow, this.ydg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VideoViewHide, this.Sdg);
    this.sye = false;
  }
  OnTick(i) {
    var t;
    var e;
    if (this.sye && (this.Cce += i, this.pdg += i, (this.pdg > AUDIO_SYNC_TIME || i > LAG_TIME) && void (this.pdg = 0) !== (i = AudioSystem_1.AudioSystem.GetSourcePlayPosition(this.EFc)) && (this.Cce = i), i = this.GetText(0), t = this.GetText(1), e = this.Mdg(this.Cce), this.Cdg !== e && e && (this.Cdg = e, i.SetUIActive(true), i.ShowTextNew(e.OriginSubtitleId), e.HideTranslationSubtitle ? t.SetUIActive(false) : (t.SetUIActive(true), t.ShowTextNew(e.TranslationSubtitleId)), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Plot", 26, "[MusicSubtitle] 显示字幕", ["CurrentTime", this.Cce * CommonDefine_1.SECOND_PER_MILLIONSECOND], ["text", i.GetText()]), !e) && this.Cdg && (i.SetUIActive(false), t.SetUIActive(false), this.Cdg = undefined, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 26, "[MusicSubtitle] 隐藏字幕", ["CurrentTime", this.Cce * CommonDefine_1.SECOND_PER_MILLIONSECOND]);
    }
  }
  Mdg(i) {
    for (const t of this.gdg) {
      if (i >= t.StartTime && i < t.EndTime) {
        return t;
      }
    }
  }
}
exports.MusicSubtitleView = MusicSubtitleView;
//# sourceMappingURL=MusicSubtitleView.js.map