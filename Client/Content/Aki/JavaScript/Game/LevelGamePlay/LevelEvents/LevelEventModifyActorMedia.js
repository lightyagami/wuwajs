"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventModifyActorMedia = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventModifyActorMedia extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var o;
    if (e) {
      if (t = t) {
        if ((o = EntitySystem_1.EntitySystem.Get(t.EntityId))?.Valid) {
          if (o = o.GetComponent(174)) {
            o.HandleActorMedia(e);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 58, "状态控制entity不存在", ["EntityId", t.EntityId]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 58, "此LevelEvent只能配置在SceneActorRefComponent中");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 58, "参数类型错误");
    }
  }
}
exports.LevelEventModifyActorMedia = LevelEventModifyActorMedia;
//# sourceMappingURL=LevelEventModifyActorMedia.js.map