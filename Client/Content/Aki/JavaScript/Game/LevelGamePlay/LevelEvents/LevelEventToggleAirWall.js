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
      var l = t;
      if (l) {
        var r = EntitySystem_1.EntitySystem.Get(l.EntityId);
        if (!r?.Valid) {
          if (e.ActorRefs?.length) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 39, "状态控制entity不存在", ["EntityId", l.EntityId], ["ActorRef", e.ActorRefs[0]?.PathName]);
            }
            return;
          } else {
            return undefined;
          }
        }
        if (r.GetComponent(214)?.Owner) {
          if (l = r.GetComponent(174)) {
            l.HandleAirWall(e, t);
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