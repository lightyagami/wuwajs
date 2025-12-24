"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayLevelSequence = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayLevelSequence extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var n;
    var o;
    if (e) {
      if (e.LevelSequencePath) {
        if (n = t) {
          if ((o = EntitySystem_1.EntitySystem.Get(n.EntityId))?.Valid) {
            if (o.GetComponent(212)?.Owner) {
              if (o = o.GetComponent(172)) {
                o.HandleSequence(e);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 33, "状态控制actor不存在");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 33, "状态控制entity不存在", ["EntityId", n.EntityId]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "LevelSequence路径为空", ["Context", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
    }
  }
}
exports.LevelEventPlayLevelSequence = LevelEventPlayLevelSequence;
//# sourceMappingURL=LevelEventPlayLevelSequence.js.map