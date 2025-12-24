"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandFactory = undefined;
const SurvivorsRogueCommandAdditionRewardGot_1 = require("./SurvivorsRogueCommandAdditionRewardGot");
const SurvivorsRogueCommandEvolve_1 = require("./SurvivorsRogueCommandEvolve");
const SurvivorsRogueCommandResultSettle_1 = require("./SurvivorsRogueCommandResultSettle");
const SurvivorsRogueCommandRewardGot_1 = require("./SurvivorsRogueCommandRewardGot");
const SurvivorsRogueCommandRewardSelect_1 = require("./SurvivorsRogueCommandRewardSelect");
const SurvivorsRogueCommandShop_1 = require("./SurvivorsRogueCommandShop");
const SurvivorsRogueCommandWeaponSelect_1 = require("./SurvivorsRogueCommandWeaponSelect");
class SurvivorsRogueCommandFactory {
  static Create(o) {
    let e = undefined;
    switch (o.R5n) {
      case "jTd":
        e = 0;
        break;
      case "HTd":
        e = 1;
        break;
      case "$Td":
        e = 2;
        break;
      case "WTd":
        e = 3;
        break;
      case "QTd":
        e = 4;
        break;
      case "KTd":
        e = 5;
        break;
      case "RJd":
        e = 6;
    }
    if (e !== undefined) {
      return new this.TypeCommandClassCtorMap[e](e);
    }
  }
}
(exports.SurvivorsRogueCommandFactory = SurvivorsRogueCommandFactory).TypeCommandClassCtorMap = {
  [0]: SurvivorsRogueCommandRewardGot_1.SurvivorsRogueCommandRewardGot,
  1: SurvivorsRogueCommandRewardSelect_1.SurvivorsRogueCommandRewardSelect,
  2: SurvivorsRogueCommandWeaponSelect_1.SurvivorsRogueCommandWeaponSelect,
  3: SurvivorsRogueCommandShop_1.SurvivorsRogueCommandShop,
  4: SurvivorsRogueCommandEvolve_1.SurvivorsRogueCommandEvolve,
  5: SurvivorsRogueCommandResultSettle_1.SurvivorsRogueCommandResultSettle,
  6: SurvivorsRogueCommandAdditionRewardGot_1.SurvivorsRogueCommandAdditionRewardGot
};
//# sourceMappingURL=SurvivorsRogueCommandFactory.js.map