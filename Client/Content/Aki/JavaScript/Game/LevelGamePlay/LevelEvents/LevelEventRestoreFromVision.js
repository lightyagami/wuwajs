"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRestoreFromVision = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestoreFromVision extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, s) {
    if (e) {
      const r = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
      e = r?.GetComponent(41);
      if (e && r) {
        var o = r.GetComponent(59)?.FollowIds;
        if (o) {
          for (const i of o) {
            const r = EntitySystem_1.EntitySystem.Get(i);
            if (r) {
              r.GetComponent(215)?.AddTag(-2042072030);
              return;
            }
          }
          e.EndOwnerAndFollowSkills();
        }
      }
    }
  }
}
exports.LevelEventRestoreFromVision = LevelEventRestoreFromVision;
//# sourceMappingURL=LevelEventRestoreFromVision.js.map