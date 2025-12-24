"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NONE_FILTER_TYPE = exports.LordGymChallengeRecord = exports.THRID_VIES_PARAM = exports.THRID_ENTRANCE_ID = exports.LORD_GYM_THIRD_AUDIO_LOAD = exports.LORD_GYM_THIRD_AUDIO_BOSS = exports.LORD_GYM_THIRD_AUDIO_START = exports.LORD_GYM_THIRD_SEQUENCE_PATH = exports.LORD_GYM_BOSS_SPRITE_PATH = exports.ROME_ICON_PATH = undefined;
exports.ROME_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
exports.LORD_GYM_BOSS_SPRITE_PATH = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity30/LordGym/SP_BossNum0{0}.SP_BossNum0{1}";
exports.LORD_GYM_THIRD_SEQUENCE_PATH = "/Game/Aki/Sequence/LevelA_Seq/POI/03/P0038/P0038_Cam001.P0038_Cam001";
exports.LORD_GYM_THIRD_AUDIO_START = "play_ui_daoguan_3_0_efx_start";
exports.LORD_GYM_THIRD_AUDIO_BOSS = "play_ui_daoguan_3_0_efx_boss";
exports.LORD_GYM_THIRD_AUDIO_LOAD = "play_ui_daoguan_3_0_loading_percent";
exports.THRID_ENTRANCE_ID = 3924;
exports.THRID_VIES_PARAM = 200103;
class LordGymChallengeRecord {
  constructor() {
    this.Uc = new Map();
  }
  GetLordChallengeRecord(e, o) {
    if (this.Uc.has(e)) {
      return this.Uc.get(e)[o];
    }
  }
}
exports.LordGymChallengeRecord = LordGymChallengeRecord;
exports.NONE_FILTER_TYPE = 0; //# sourceMappingURL=LordGymDefine.js.map