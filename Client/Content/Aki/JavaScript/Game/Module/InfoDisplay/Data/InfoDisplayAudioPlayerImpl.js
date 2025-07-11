"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayAudioPlayerImpl = undefined;
const puerts_1 = require("puerts");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../Core/Common/Log");
const MS_PER_SECOND = 1000;
class InfoDisplayAudioPlayerImpl {
  constructor(i, t) {
    this.brc = undefined;
    this.Lrc = undefined;
    this.Uqe = 0;
    this.$Zt = 1;
    this.Td = false;
    this.Wsi = -0;
    this.Qsi = "";
    this.mQe = false;
    this.wrc = false;
    this.YZt = undefined;
    this.OverrideEndCallBack = undefined;
    this.OnPlay = undefined;
    this.OnPause = undefined;
    this.zsi = (i, t) => {
      if (i === 0 && this.Td) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InfoDisplay", 27, "End");
        }
        AudioController_1.AudioController.StopAudio(this.Lrc);
        if (this.OverrideEndCallBack) {
          this.OverrideEndCallBack();
        } else {
          i = this.Qsi;
          if (AudioController_1.AudioController.GetAudioEvent(i, false)) {
            this.XZi(i);
          }
        }
        this.Uqe = 0;
      }
    };
    this.Lrc = i;
    this.brc = t;
  }
  Start() {
    this.Rrc();
  }
  Stop() {
    this.Release();
  }
  Release() {
    this.oai();
    if (this.YZt) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.zsi);
      this.YZt = undefined;
    }
  }
  SetSpectrumCallBack(i) {}
  async SetAudioClipPathAndLoadAudio(i) {
    if (i) {
      this.Qsi = i;
      await this.Arc();
    }
  }
  OnClickPlayAudioBtn() {
    this.Rrc();
  }
  OnTick(i) {
    if (this.IsPlaying()) {
      this.iai(i);
    }
  }
  IsPlaying() {
    return this.Td && !this.mQe;
  }
  GetMaxDurationInSecond() {
    return this.Wsi;
  }
  GetCurrentRunningTimeInSecond() {
    return this.Uqe / MS_PER_SECOND;
  }
  async Arc() {
    this.oai();
    return new Promise(i => {
      AudioController_1.AudioController.LoadAndAddCallback(this.Qsi, () => {
        if (AudioController_1.AudioController.GetAudioEvent(this.Qsi) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("InfoDisplay", 74, "音频加载失败，请检查配置", ["audioPath:", this.Qsi]);
          }
          this.wrc = false;
          i(false);
        } else {
          this.Wsi = AudioController_1.AudioController.GetAudioEvent(this.Qsi).MaximumDuration;
          this.wrc = true;
          i(true);
        }
      });
    });
  }
  Rrc() {
    if (this.wrc) {
      if (this.Td) {
        if (this.mQe) {
          this.Ysi();
        } else {
          this.Jsi();
        }
      } else {
        this.YZt ||= (0, puerts_1.toManualReleaseDelegate)(this.zsi);
        this.XZi(this.Qsi);
        this.Td = true;
        this.mQe = false;
      }
      this.brc.SetToggleState(this.mQe ? 0 : 1);
      if (this.mQe) {
        if (this.OnPause) {
          this.OnPause();
        }
      } else if (this.OnPlay) {
        this.OnPlay();
      }
    }
  }
  Jsi() {
    this.mQe = true;
    var i = AudioController_1.AudioController.GetAudioEvent(this.Qsi, false);
    AudioController_1.AudioController.ExecuteActionOnEvent(i, 1, this.Lrc);
  }
  Ysi() {
    this.mQe = false;
    var i = AudioController_1.AudioController.GetAudioEvent(this.Qsi, false);
    AudioController_1.AudioController.ExecuteActionOnEvent(i, 2, this.Lrc);
  }
  XZi(i) {
    AudioController_1.AudioController.PlayAudioByEventPath(i, this.Lrc, this.$Zt, this.YZt);
  }
  iai(i) {
    this.Uqe += i;
    if (this.Uqe >= this.Wsi * MS_PER_SECOND) {
      this.Uqe = this.Wsi * MS_PER_SECOND;
    }
  }
  oai() {
    AudioController_1.AudioController.StopAudio(this.Lrc);
    this.Uqe = 0;
    this.Td = false;
    this.wrc = false;
  }
}
exports.InfoDisplayAudioPlayerImpl = InfoDisplayAudioPlayerImpl;
//# sourceMappingURL=InfoDisplayAudioPlayerImpl.js.map