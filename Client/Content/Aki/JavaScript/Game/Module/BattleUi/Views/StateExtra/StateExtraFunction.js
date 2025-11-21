"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtraItemParamsByCreatureData = undefined;
const MoraleMonsterLevelItem_1 = require("../../../Battle/Morale/View/MoraleMonsterLevelItem");
const HonamiStoryMonsterLevelItem_1 = require("../HonamiStory/HonamiStoryMonsterLevelItem");
function getExtraItemParamsByCreatureData(e) {
  var r;
  if (e) {
    if (r = e.GetAttributeComponent()?.MoraleLevel ?? 0) {
      return {
        Type: 1,
        ResourceId: "UiItem_MonsterMoraleLevel",
        MoraleLevel: r,
        Creator: () => {
          var e = new MoraleMonsterLevelItem_1.MoraleMonsterLevelItem();
          e.InitExtraItemType(1);
          return e;
        }
      };
    } else if (r = e.HonamiStoryLevel) {
      return {
        Type: 2,
        ResourceId: "UiItem_HonamiStoryMainTipLevel",
        HonamiStoryLevel: r,
        Creator: () => {
          var e = new HonamiStoryMonsterLevelItem_1.HonamiStoryMonsterLevelItem();
          e.InitExtraItemType(2);
          return e;
        }
      };
    } else {
      return undefined;
    }
  }
}
exports.getExtraItemParamsByCreatureData = getExtraItemParamsByCreatureData;
//# sourceMappingURL=StateExtraFunction.js.map