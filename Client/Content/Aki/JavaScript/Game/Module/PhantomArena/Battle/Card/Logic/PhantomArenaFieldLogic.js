"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaFieldLogic = undefined;
const PhantomArenaCardLogic_1 = require("./PhantomArenaCardLogic");
class PhantomArenaFieldLogic extends PhantomArenaCardLogic_1.PhantomArenaCardLogic {
  CheckFunctionalSettingCondition(t) {
    if (t) {
      return [false, ""];
    } else {
      return [true, ""];
    }
  }
  CheckMonsterSettingCondition(t) {
    return [false, "PhantomBattle_1134"];
  }
  OnCheckRecycleSettingConditionFromHead() {
    return [false, "PhantomBattle_1135"];
  }
  OnCheckRecycleSettingConditionFromFunctional() {
    return [false, "PhantomBattle_1135"];
  }
}
exports.PhantomArenaFieldLogic = PhantomArenaFieldLogic;
//# sourceMappingURL=PhantomArenaFieldLogic.js.map