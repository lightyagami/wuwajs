"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventBreakWeakness = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventBreakWeakness extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (t.Type === 1 && (t = EntitySystem_1.EntitySystem.Get(t.EntityId))?.Valid) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MonsterBeginBroken, t.Id);
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventBreakWeakness = LevelEventBreakWeakness;
//# sourceMappingURL=LevelEventBreakWeakness.js.map