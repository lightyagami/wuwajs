"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventInteractGravityFlip = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventInteractGravityFlip extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e && (e = e.EntityId, e = EntitySystem_1.EntitySystem.GetComponent(e, 310))) {
      e.ExecuteInteract();
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventInteractGravityFlip = LevelEventInteractGravityFlip;
//# sourceMappingURL=LevelEventInteractGravityFlip.js.map