"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SequenceRenderSettings = exports.PlotSubtitleConfig = exports.SequenceEntityInfo = exports.MAX_FRAME = exports.DEFAULT_LAST_SUBTITLE_TIME = exports.PLOT_WAIT_ENTITY_TIME = exports.FEMALE_SEQ_MODEL_ID = exports.MALE_SEQ_MODEL_ID = exports.ABP_Mouth_Slot_Name = exports.ABP_Seq_Slot_Name = exports.ABP_Base_Name = exports.FREEATTACH_TAG = exports.TALK_NPC_TAG = exports.CAMERA_TAG = exports.BOSS_TAG = exports.HERO_TAG = exports.FEMALE_TAG = exports.MALE_TAG = exports.FRAME_PER_MILLISECOND = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector");
exports.FRAME_PER_MILLISECOND = .03, exports.MALE_TAG = new UE.FName("Male"), exports.FEMALE_TAG = new UE.FName("Female"), exports.HERO_TAG = new UE.FName("Player"), exports.BOSS_TAG = new UE.FName("BOSS"), exports.CAMERA_TAG = new UE.FName("SequenceCamera"), exports.TALK_NPC_TAG = new UE.FName("TalkNPC"), exports.FREEATTACH_TAG = new UE.FName("FreeAttach"), exports.ABP_Base_Name = new UE.FName("ABP_Base"), exports.ABP_Seq_Slot_Name = new UE.FName("KuroSequenceSlot"), exports.ABP_Mouth_Slot_Name = new UE.FName("SeqMouth"), exports.MALE_SEQ_MODEL_ID = 110004, exports.FEMALE_SEQ_MODEL_ID = 110006, exports.PLOT_WAIT_ENTITY_TIME = -1, exports.DEFAULT_LAST_SUBTITLE_TIME = 1, exports.MAX_FRAME = 9999999;
class SequenceEntityInfo {
  constructor(e = -1, t = -1, s = 0, o = !1, r = Vector_1.Vector.Create(), i = Rotator_1.Rotator.Create(), n = !1) {
    this.MoveCompDisableHandle = e, this.UeMoveCompDisableHandle = t, this.CacheMovementMode = s, this.CacheMovementSync = o, this.CacheLocation = r, this.CacheRotation = i, this.CacheAiEnable = n
  }
}
exports.SequenceEntityInfo = SequenceEntityInfo;
class PlotSubtitleConfig {
  constructor() {
    this.Subtitles = void 0, this.GuardTime = 0, this.AudioDelay = 0, this.AudioTransitionDuration = 0
  }
  CopyFrom(e) {
    this.Subtitles = e.Subtitles, this.GuardTime = e.GuardTime, this.AudioDelay = e.AudioDelay, this.AudioTransitionDuration = e.AudioTransitionDuration
  }
  Clear() {
    this.Subtitles = void 0, this.GuardTime = 0, this.AudioDelay = 0, this.AudioTransitionDuration = 0
  }
}
exports.PlotSubtitleConfig = PlotSubtitleConfig;
class SequenceRenderSettings {
  static SetupSequenceSetting() {
    this.uiu.set(0, !0), this.uiu.set(1, !0), this.uiu.set(2, !0), this.uiu.set(3, !0), this.uiu.set(4, !0), this.ciu.set(0, !1), this.ciu.set(1, !0), this.ciu.set(2, !0), this.ciu.set(3, !0), this.ciu.set(4, !0), this.diu.set(0, !1), this.diu.set(1, !0), this.diu.set(2, !0), this.diu.set(3, !0), this.diu.set(4, !0), this.miu.set(0, !0), this.miu.set(1, !0), this.miu.set(2, !0), this.miu.set(3, !0), this.miu.set(4, !0)
  }
  static GetTexureStreamingEnable(e) {
    return Info_1.Info.IsPcPlatform() ? this.ciu.get(e) ?? !0 : Info_1.Info.IsAndroidPlatform() ? !UE.KuroStaticLibrary.IsLowMemoryDevice() && (this.uiu.get(e) ?? !0) : Info_1.Info.IsIosPlatform() ? !UE.KuroStaticLibrary.IsLowMemoryDevice() && (this.diu.get(e) ?? !0) : !Info_1.Info.IsGamepadPlatform() || (this.miu.get(e) ?? !0)
  }
}(exports.SequenceRenderSettings = SequenceRenderSettings).ciu = new Map, SequenceRenderSettings.uiu = new Map, SequenceRenderSettings.diu = new Map, SequenceRenderSettings.miu = new Map;
//# sourceMappingURL=SequenceDefine.js.map