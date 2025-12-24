"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardItemCreatorMap = undefined;
const BattleCardComponent_1 = require("./Component/Bvb/BattleCardComponent");
const NewBattleCardComponent_1 = require("./Component/Bvb/NewBattleCardComponent");
const CardAllInDeckComponent_1 = require("./Component/CardAllInDeckComponent");
const CardCheckComponent_1 = require("./Component/CardCheckComponent");
const CardCommonComponent_1 = require("./Component/CardCommonComponent");
const CardDisabledComponent_1 = require("./Component/CardDisabledComponent");
const CardEffectCountComponent_1 = require("./Component/CardEffectCountComponent");
const CardLockComponent_1 = require("./Component/CardLockComponent");
const CardReplaceComponent_1 = require("./Component/CardReplaceComponent");
const CardSkillComponent_1 = require("./Component/CardSkillComponent");
const CardSpineComponent_1 = require("./Component/CardSpineComponent");
const CommonBaseCardComponent_1 = require("./Component/CommonBaseCardComponent");
const NewCommonBaseCardComponent_1 = require("./Component/NewCommonBaseCardComponent");
exports.cardItemCreatorMap = {
  [0]: CommonBaseCardComponent_1.CommonBaseCardComponent,
  1: NewCommonBaseCardComponent_1.NewCommonBaseCardComponent,
  2: CardLockComponent_1.CardLockComponent,
  3: BattleCardComponent_1.BattleCardComponent,
  4: NewBattleCardComponent_1.NewBattleCardComponent,
  5: CardReplaceComponent_1.CardReplaceComponent,
  6: CardCommonComponent_1.CardCommonComponent,
  7: CardCheckComponent_1.CardCheckComponent,
  8: CardCommonComponent_1.CardCommonComponent,
  9: CardSpineComponent_1.CardSpineComponent,
  10: CardAllInDeckComponent_1.CardAllInDeckComponent,
  11: CardDisabledComponent_1.CardDisabledComponent,
  12: CardSkillComponent_1.CardSkillComponent,
  13: CardEffectCountComponent_1.CardEffectCountComponent
};
//# sourceMappingURL=CardItemDefine.js.map