"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceUtils = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class SequenceUtils {
  static GetSelectedSequenceInEditor() {
    var e = UE.LevelSequenceEditorBlueprintLibrary.GetCurrentLevelSequence();
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 45, "没有打开的seq");
    }
  }
  static CheckIfUseAudioSeq(e) {
    let o = undefined;
    var t;
    if (e.IsA(UE.BP_BaseRole_Seq_V2_C.StaticClass()) || e.IsA(UE.BP_SeqNPC_C.StaticClass()) || e.IsA(UE.BP_SeqSkeletal_C.StaticClass())) {
      if (o = e) {
        return !!(t = o.SeqAudio_Seq_V2) && !!t.UseAudioSeq || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] result为false, 不继续", ["actor", e.GetName()]), false);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] seqAudio不存在", ["actor", e.GetName()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] 没有找到合适的蓝图类型", ["actor", e.GetName()]);
      }
      return false;
    }
  }
}
exports.SequenceUtils = SequenceUtils;
//# sourceMappingURL=SequenceUtils.js.map