"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceRenderSettings = exports.PlotSubtitleConfig = exports.SequenceEntityInfo = exports.FEMALE_DEFAULT = exports.MALE_DEFAULT = exports.MAX_FRAME = exports.DEFAULT_LAST_SUBTITLE_TIME = exports.PLOT_WAIT_ENTITY_TIME = exports.FEMALE_SEQ_MODEL_ID = exports.MALE_SEQ_MODEL_ID = exports.DEFAULT_SEQ_SLOT = exports.MOTOR_TAG = exports.FINAL_POS_TAG = exports.SeqStreamingSourceProxy_TAG = exports.ABP_Mouth_Slot_Name = exports.ABP_Seq_Slot_Name = exports.ABP_Base_Name = exports.FREEATTACH_TAG = exports.TALK_NPC_TAG = exports.CAMERA_TAG = exports.BOSS_TAG = exports.HERO_TAG = exports.FEMALE_TAG = exports.MALE_TAG = exports.FRAME_PER_MILLISECOND = undefined;
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
exports.SeqStreamingSourceProxy_TAG = new UE.FName("StreamingSource");
exports.FINAL_POS_TAG = new UE.FName("FinalPos");
exports.MOTOR_TAG = new UE.FName("Motor");
exports.DEFAULT_SEQ_SLOT = new UE.FName("KuroSequenceSlot");
exports.MALE_SEQ_MODEL_ID = 110004;
exports.FEMALE_SEQ_MODEL_ID = 110006;
exports.PLOT_WAIT_ENTITY_TIME = -1;
exports.DEFAULT_LAST_SUBTITLE_TIME = 1;
exports.MAX_FRAME = 9999999;
exports.MALE_DEFAULT = "/Game/Aki/Character/Role/MaleM/Nanzhu/Seq/BP_Nanzhu_Seq_V2.BP_Nanzhu_Seq_V2_C";
exports.FEMALE_DEFAULT = "/Game/Aki/Character/Role/FemaleM/Nvzhu/Seq/BP_Nvzhu_Seq_V2.BP_Nvzhu_Seq_V2_C";
class SequenceEntityInfo {
  constructor(e = -1, t = -1, s = 0, o = false, r = Vector_1.Vector.Create(), i = Rotator_1.Rotator.Create(), n = false) {
    this.MoveCompDisableHandle = e;
    this.UeMoveCompDisableHandle = t;
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
  CopyFrom(e) {
    this.Subtitles = e.Subtitles;
    this.GuardTime = e.GuardTime;
    this.AudioDelay = e.AudioDelay;
    this.AudioTransitionDuration = e.AudioTransitionDuration;
    this.AutoPlayDelay = e.AutoPlayDelay;
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
    this.Znu.set(0, true);
    this.Znu.set(1, true);
    this.Znu.set(2, true);
    this.Znu.set(3, true);
    this.Znu.set(4, true);
    this.Znu.set(5, true);
    this.esu.set(0, false);
    this.esu.set(1, true);
    this.esu.set(2, true);
    this.esu.set(3, true);
    this.esu.set(4, true);
    this.esu.set(5, true);
    this.tsu.set(0, false);
    this.tsu.set(1, true);
    this.tsu.set(2, true);
    this.tsu.set(3, true);
    this.tsu.set(4, true);
    this.tsu.set(5, true);
    this.isu.set(0, true);
    this.isu.set(1, true);
    this.isu.set(2, true);
    this.isu.set(3, true);
    this.isu.set(4, true);
    this.isu.set(5, true);
  }
  static GetTexureStreamingEnable(e) {
    if (Info_1.Info.IsPcPlatform()) {
      return this.esu.get(e) ?? true;
    } else if (Info_1.Info.IsAndroidPlatform()) {
      return !UE.KuroStaticLibrary.IsLowMemoryDevice() && (this.Znu.get(e) ?? true);
    } else if (Info_1.Info.IsIosPlatform()) {
      return !UE.KuroStaticLibrary.IsLowMemoryDevice() && (this.tsu.get(e) ?? true);
    } else {
      return !Info_1.Info.IsGamepadPlatform() || (this.isu.get(e) ?? true);
    }
  }
}
(exports.SequenceRenderSettings = SequenceRenderSettings).esu = new Map();
SequenceRenderSettings.Znu = new Map();
SequenceRenderSettings.tsu = new Map();
SequenceRenderSettings.isu = new Map(); //# sourceMappingURL=SequenceDefine.js.map