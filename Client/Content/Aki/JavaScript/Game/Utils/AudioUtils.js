"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioUtils = undefined;
const Log_1 = require("../../Core/Common/Log");
const ModelManager_1 = require("../Manager/ModelManager");
class AudioUtils {
  static HandleAudioBoxUpdate(e, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 39, "[AudioBox] 更新音频盒子队列", ["Type", o], ["Box", e]);
    }
    var e = ModelManager_1.ModelManager.AudioModel.UpdateAudioBoxQueue(e, o);
    if (e && (o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.PbDataId)) && (e = o.Entity.GetComponent(132))) {
      e.PostAudioBoxEvent();
    }
  }
}
exports.AudioUtils = AudioUtils;
//# sourceMappingURL=AudioUtils.js.map