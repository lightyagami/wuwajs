"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventToggleAirWall = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleAirWall extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, o) {
    if (e) {
      if (t) {
        var l = EntitySystem_1.EntitySystem.Get(t.EntityId);
        if (!l?.Valid) {
          if (e.ActorRefs?.length) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 39, "状态控制entity不存在", ["EntityId", t.EntityId], ["ActorRef", e.ActorRefs[0]?.PathName]);
            }
            return;
          } else {
            return undefined;
          }
        }
        if (l.GetComponent(202)?.Owner) {
          if (t = l.GetComponent(163)) {
            t.HandleAirWall(e);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "状态控制actor不存在");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
    }
  }
}
exports.LevelEventToggleAirWall = LevelEventToggleAirWall;
//# sourceMappingURL=LevelEventToggleAirWall.js.map