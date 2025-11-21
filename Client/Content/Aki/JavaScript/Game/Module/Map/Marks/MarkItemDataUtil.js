"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemDataUtil = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class MarkItemDataUtil {
  static TransformMarkTypeToClient(o) {
    return this.pNa.get(o) ?? 0;
  }
  static GetMarkIcon(o) {
    var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o);
    if (r) {
      switch (r.ObjectType) {
        case 10:
        case 19:
          var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(r.RelativeId);
          if (!e || e.IsClose) {
            return r.LockMarkPic;
          } else {
            return r.UnlockMarkPic;
          }
        case 39:
        case 40:
          if (ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(o)) {
            return r.UnlockMarkPic;
          } else {
            return r.LockMarkPic;
          }
        default:
          return r.LockMarkPic;
      }
    }
  }
}
(exports.MarkItemDataUtil = MarkItemDataUtil).pNa = new Map([[Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_None, 0], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_Custom, 9], [Protocol_1.Aki.Protocol.w5s.ENUMS.aTs, 12], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TemporaryTeleport, 15], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_SoundBox, 16], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HookLockSoundBox, 16], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint, 17], [Protocol_1.Aki.Protocol.w5s.ENUMS.O7n, 18], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_CalmingWindBell, 21], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_EnrichmentArea, 22], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_EnrichmentAreaChild, 23], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HonamiStory, 39], [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HonamiStoryChild, 40]]);
//# sourceMappingURL=MarkItemDataUtil.js.map