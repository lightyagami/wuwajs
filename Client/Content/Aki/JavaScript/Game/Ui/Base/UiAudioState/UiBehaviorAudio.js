"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviorAudio = undefined;
const AudioFilterController_1 = require("../../../../Core/Audio/AudioFilterController");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiAudioModel_1 = require("../../UiAudioModel");
const AudioStateData_1 = require("./AudioStateData");
class UiBehaviorAudio {
  constructor(i) {
    this.Dja = 0;
    this.D_r = undefined;
    this.bne = undefined;
    this.OQt = undefined;
    this.LAe = undefined;
    this.AudioFilter = undefined;
    this.LoopAudioEvent = undefined;
    this.OQt = i;
    if (this.OQt && this.OQt.Info) {
      this.LAe = this.OQt.Info;
      this.LoopAudioEvent = this.OQt.GetLoopAudioEvent();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 75, "BehaviorAudio 缺少UiViewInfo");
    }
  }
  OnAfterUiStart() {
    var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(this.LAe.Name);
    this.AudioFilter = i.AudioFilter;
    if (this.AudioFilter && this.AudioFilter.length > 0 && this.Dja === 0) {
      this.Dja = AudioFilterController_1.AudioFilterController.PushUiFilterState(this.AudioFilter, this.LAe.Name);
    }
    this.D_r ||= this.OQt.GetUiAudioComponent();
    if (this.LAe.OpenAudioEvent) {
      AudioSystem_1.AudioSystem.PostEvent(this.LAe.OpenAudioEvent);
    }
  }
  OnAfterUiShow() {
    if (this.D_r && this.D_r.bAudioCoverEnable) {
      this.R_r();
      UiAudioModel_1.UiAudioModel.AddAudioStateData(this.bne);
      UiAudioModel_1.UiAudioModel.SetRtpcLevelOpening(this.bne.Level);
      UiAudioModel_1.UiAudioModel.CalculateRtpcValueAndApply();
    }
    if (this.LoopAudioEvent && this.OQt.GetLoopAudioEventSwitch()) {
      UiAudioModel_1.UiAudioModel.SetLoopAudioEventShow(this.OQt.GetViewId(), this.OQt.GetRootActor(), this.LoopAudioEvent);
    } else if (this.LAe.KeepLoopEvent) {
      UiAudioModel_1.UiAudioModel.KeepLoopAudioEventShow(this.OQt.GetViewId(), this.OQt.GetRootActor());
    }
  }
  OnBeforeUiHide() {
    if (this.D_r && this.D_r.bAudioCoverEnable) {
      UiAudioModel_1.UiAudioModel.SetRtpcLevelClosing(this.bne.Level);
      UiAudioModel_1.UiAudioModel.RemoveAudioStateData(this.bne);
      UiAudioModel_1.UiAudioModel.CalculateRtpcValueAndApply();
    }
    if (this.LoopAudioEvent && this.OQt.GetLoopAudioEventSwitch()) {
      UiAudioModel_1.UiAudioModel.SetLoopAudioEventHide(this.OQt.GetViewId(), this.OQt.GetRootActor(), this.LoopAudioEvent);
    } else if (this.LAe.KeepLoopEvent) {
      UiAudioModel_1.UiAudioModel.KeepLoopAudioEventHide(this.OQt.GetViewId(), this.OQt.GetRootActor());
    }
  }
  OnBeforeDestroy() {
    this.D_r = undefined;
    if (this.LoopAudioEvent && this.OQt.GetLoopAudioEventSwitch()) {
      UiAudioModel_1.UiAudioModel.SetLoopAudioEventDestroy(this.OQt.GetViewId(), this.OQt.GetRootActor(), this.LoopAudioEvent);
    } else if (this.LAe.KeepLoopEvent) {
      UiAudioModel_1.UiAudioModel.KeepLoopAudioEventDestroy(this.OQt.GetViewId(), this.OQt.GetRootActor());
    }
    if (this.LAe.CloseAudioEvent) {
      AudioSystem_1.AudioSystem.PostEvent(this.LAe.CloseAudioEvent);
    }
    if (this.AudioFilter && this.AudioFilter.length > 0 && this.Dja !== 0) {
      AudioFilterController_1.AudioFilterController.RemoveUiFilterState(this.Dja, this.LAe.Name);
      this.Dja = 0;
    }
  }
  R_r() {
    this.bne = new AudioStateData_1.AudioStateData();
    this.bne.Level = this.D_r.AudioUiCover;
    this.bne.Alpha = this.D_r.AudioUiAlpha;
  }
}
exports.UiBehaviorAudio = UiBehaviorAudio;
//# sourceMappingURL=UiBehaviorAudio.js.map