"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cardItemCreatorMap = void 0;
const BattleCardComponent_1 = require("./Component/BattleCardComponent"),
  CardAllInDeckComponent_1 = require("./Component/CardAllInDeckComponent"),
  CardCheckComponent_1 = require("./Component/CardCheckComponent"),
  CardCommonComponent_1 = require("./Component/CardCommonComponent"),
  CardDisabledComponent_1 = require("./Component/CardDisabledComponent"),
  CardLockComponent_1 = require("./Component/CardLockComponent"),
  CardReplaceComponent_1 = require("./Component/CardReplaceComponent"),
  CardSpineComponent_1 = require("./Component/CardSpineComponent"),
  CommonBaseCardComponent_1 = require("./Component/CommonBaseCardComponent");
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