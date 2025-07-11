"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapSoundBoxSfxMgr = undefined;
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const MapLogger_1 = require("../../../Misc/MapLogger");
const SOUND_MARK_INRANGE_DISTANCE_SQUARE = 434850964;
class MapSoundBoxSfxMgr {
  OnMarkItemBecomeVisible(e, r) {
    var a;
    var M;
    if (e.MarkType === 16 || e.MarkType === 21) {
      a = e.MarkId;
      if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
        ModelManager_1.ModelManager.WorldMapModel.SetPlaySoundMarkSfxForbidden(a, false);
      } else if (!((r = Vector_1.Vector.DistSquared(r, e.WorldPosition)) >= SOUND_MARK_INRANGE_DISTANCE_SQUARE) && !(e = ModelManager_1.ModelManager.WorldMapModel.IsSoundMarkSfxForbidden(a), M = ModelManager_1.ModelManager.WorldMapModel.IsSoundMarkSfxCoolingDown(a), ModelManager_1.ModelManager.WorldMapModel.SetPlaySoundMarkSfxForbidden(a, true), e) && !M) {
        MapLogger_1.MapLogger.Debug(63, "[地图系统] 地图声匣子音效 播放 ->OnMarkItemBecomeVisible And PlaySfx", ["MarkId", a], ["distSquare", r]);
        ModelManager_1.ModelManager.WorldMapModel.RecordPlaySoundMarkSfx(a);
        AudioSystem_1.AudioSystem.PostEvent("play_ui_find_shengxia");
      }
    }
  }
  OnMarkItemBecomeInvisible(e) {
    var r = e.MarkId;
    if (e.MarkType === 16 || e.MarkType === 21) {
      MapLogger_1.MapLogger.Debug(63, "[地图系统] 地图声匣子音效 ->OnMarkItemBecomeInvisible", ["MarkId", r]);
      ModelManager_1.ModelManager.WorldMapModel.SetPlaySoundMarkSfxForbidden(r, false);
    }
  }
}
exports.MapSoundBoxSfxMgr = MapSoundBoxSfxMgr;
//# sourceMappingURL=MapSoundBoxSfxMgr.js.map