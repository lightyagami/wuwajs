"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceRenderSettings = exports.PlotSubtitleConfig = exports.SequenceEntityInfo = exports.MAX_FRAME = exports.DEFAULT_LAST_SUBTITLE_TIME = exports.PLOT_WAIT_ENTITY_TIME = exports.FEMALE_SEQ_MODEL_ID = exports.MALE_SEQ_MODEL_ID = exports.ABP_Mouth_Slot_Name = exports.ABP_Seq_Slot_Name = exports.ABP_Base_Name = exports.FREEATTACH_TAG = exports.TALK_NPC_TAG = exports.CAMERA_TAG = exports.BOSS_TAG = exports.HERO_TAG = exports.FEMALE_TAG = exports.MALE_TAG = exports.FRAME_PER_MILLISECOND = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
exports.FRAME_PER_MILLISECOND = 0.03;
exports.MALE_TAG = new UE.FName("Male");
exports.FEMALE_TAG = new UE.FName("Female");
exports.HERO_TAG = new UE.FName("Player");
exports.BOSS_TAG = new UE.FName("BOSS");
exports.CAMERA_TAG = new UE.FName("SequenceCamera");
exports.TALK_NPC_TAG = new UE.FName("TalkNPC");
exports.FREEATTACH_TAG = new UE.FName("FreeAttach");
exports.ABP_Base_Name = new UE.FName("ABP_Base");
exports.ABP_Seq_Slot_Name = new UE.FName("KuroSequenceSlot");
exports.ABP_Mouth_Slot_Name = new UE.FName("SeqMouth");
exports.MALE_SEQ_MODEL_ID = 110004;
exports.FEMALE_SEQ_MODEL_ID = 110006;
exports.PLOT_WAIT_ENTITY_TIME = -1;
exports.DEFAULT_LAST_SUBTITLE_TIME = 1;
exports.MAX_FRAME = 9999999;
class SequenceEntityInfo {
  constructor(t = -1, e = -1, s = 0, o = false, r = Vector_1.Vector.Create(), i = Rotator_1.Rotator.Create(), n = false) {
    this.MoveCompDisableHandle = t;
    this.UeMoveCompDisableHandle = e;
    this.CacheMovementMode = s;
    this.CacheMovementSync = o;
    this.CacheLocation = r;
    this.CacheRotation = i;
    this.CacheAiEnable = n;
  }
}
exports.SequenceEntityInfo = SequenceEntityInfo;
class PlotSubtitleConfig {
  constructor() {
    this.Subtitles = undefined;
    this.GuardTime = 0;
    this.AudioDelay = 0;
    this.AudioTransitionDuration = 0;
    this.AutoPlayDelay = 0;
  }
  CopyFrom(t) {
    this.Subtitles = t.Subtitles;
    this.GuardTime = t.GuardTime;
    this.AudioDelay = t.AudioDelay;
    this.AudioTransitionDuration = t.AudioTransitionDuration;
    this.AutoPlayDelay = t.AutoPlayDelay;
  }
  Clear() {
    this.Subtitles = undefined;
    this.GuardTime = 0;
    this.AudioDelay = 0;
    this.AudioTransitionDuration = 0;
    this.AutoPlayDelay = 0;
  }
}
exports.PlotSubtitleConfig = PlotSubtitleConfig;
class SequenceRenderSettings {
  static SetupSequenceSetting() {
    this.Rnu.set(0, true);
    this.Rnu.set(1, true);
    this.Rnu.set(2, true);
    this.Rnu.set(3, true);
    this.Rnu.set(4, true);
    this.Lnu.set(0, false);
    this.Lnu.set(1, true);
    this.Lnu.set(2, true);
    this.Lnu.set(3, true);
    this.Lnu.set(4, true);
    this.wnu.set(0, false);
    this.wnu.set(1, true);
    this.wnu.set(2, true);
    this.wnu.set(3, true);
    this.wnu.set(4, true);
    this.Anu.set(0, true);
    this.Anu.set(1, true);
    this.Anu.set(2, true);
    this.Anu.set(3, true);
    this.Anu.set(4, true);
  }
  static GetTexureStreamingEnable(t) {
    if (Info_1.Info.IsPcPlatform()) {
      return this.Lnu.get(t) ?? true;
    } else if (Info_1.Info.IsAndroidPlatform()) {
      return !UE.KuroStaticLibrary.IsLowMemoryDevice() && (this.Rnu.get(t) ?? true);
    } else if (Info_1.Info.IsIosPlatform()) {
      return !UE.KuroStaticLibrary.IsLowMemoryDevice() && (this.wnu.get(t) ?? true);
    } else {
      return !Info_1.Info.IsGamepadPlatform() || (this.Anu.get(t) ?? true);
    }
  }
}
(exports.SequenceRenderSettings = SequenceRenderSettings).Lnu = new Map();
SequenceRenderSettings.Rnu = new Map();
SequenceRenderSettings.wnu = new Map();
SequenceRenderSettings.Anu = new Map(); //# sourceMappingURL=SequenceDefine.js.map