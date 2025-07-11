"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionIsPlayer = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionIsPlayer extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    var r;
    return !!e.LimitParams && !!l && (r = Global_1.Global.BaseCharacter, e.LimitParams.get("IsPlayer") === StringUtils_1.ONE_STRING ? r === l : r !== l);
  }
}
exports.LevelConditionIsPlayer = LevelConditionIsPlayer;
//# sourceMappingURL=LevelConditionIsPlayer.js.map