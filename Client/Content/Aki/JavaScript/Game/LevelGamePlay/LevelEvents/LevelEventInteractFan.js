"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventInteractFan = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventInteractFan extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e && (e = e.EntityId, e = EntitySystem_1.EntitySystem.GetComponent(e, 160))) {
      e.ExecuteInteract();
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventInteractFan = LevelEventInteractFan;
//# sourceMappingURL=LevelEventInteractFan.js.map