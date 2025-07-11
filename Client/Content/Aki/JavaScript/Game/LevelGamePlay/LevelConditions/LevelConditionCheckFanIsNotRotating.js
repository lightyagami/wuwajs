"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFanIsNotRotating = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFanIsNotRotating extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t) {
    return !!e && (e = e.EntityId, !!(e = EntitySystem_1.EntitySystem.GetComponent(e, 151))) && !e.IsRotating;
  }
}
exports.LevelConditionCheckFanIsNotRotating = LevelConditionCheckFanIsNotRotating;
//# sourceMappingURL=LevelConditionCheckFanIsNotRotating.js.map