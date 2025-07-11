"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownLogicCreator = undefined;
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const LanguageLogic_1 = require("./LanguageLogic");
const SkillLockEnemyLogic_1 = require("./SkillLockEnemyLogic");
class DropDownLogicCreator {
  static GetDropDownLogic(e) {
    return this.lPi.get(e);
  }
}
(exports.DropDownLogicCreator = DropDownLogicCreator).lPi = new Map([[GameSettingsDefine_1.EFunction.TEXTLANGUAGE, new LanguageLogic_1.LanguageLogic()], [GameSettingsDefine_1.EFunction.SkillLockEnemyMode, new SkillLockEnemyLogic_1.SkillLockEnemyLogic()]]);
//# sourceMappingURL=DropDownLogicCreator.js.map