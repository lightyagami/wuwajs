"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardItemCreatorMap = undefined;
const BattleCardComponent_1 = require("./Component/BattleCardComponent");
const CardAllInDeckComponent_1 = require("./Component/CardAllInDeckComponent");
const CardCheckComponent_1 = require("./Component/CardCheckComponent");
const CardCommonComponent_1 = require("./Component/CardCommonComponent");
const CardDisabledComponent_1 = require("./Component/CardDisabledComponent");
const CardLockComponent_1 = require("./Component/CardLockComponent");
const CardReplaceComponent_1 = require("./Component/CardReplaceComponent");
const CardSpineComponent_1 = require("./Component/CardSpineComponent");
const CommonBaseCardComponent_1 = require("./Component/CommonBaseCardComponent");
exports.cardItemCreatorMap = {
  [0]: CommonBaseCardComponent_1.CommonBaseCardComponent,
  1: CardLockComponent_1.CardLockComponent,
  2: BattleCardComponent_1.BattleCardComponent,
  3: CardReplaceComponent_1.CardReplaceComponent,
  4: CardCommonComponent_1.CardCommonComponent,
  5: CardCheckComponent_1.CardCheckComponent,
  6: CardCommonComponent_1.CardCommonComponent,
  7: CardSpineComponent_1.CardSpineComponent,
  8: CardAllInDeckComponent_1.CardAllInDeckComponent,
  9: CardDisabledComponent_1.CardDisabledComponent
};
//# sourceMappingURL=CardItemDefine.js.map