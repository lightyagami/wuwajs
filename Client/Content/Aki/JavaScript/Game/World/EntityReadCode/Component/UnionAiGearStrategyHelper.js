"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAiGearStrategyHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbRaceStrategy_1 = require("./FbRaceStrategy");
const FbRenjuStrategy_1 = require("./FbRenjuStrategy");
class UnionAiGearStrategyHelper {
  static GetUnionAiGearStrategyObject(e) {
    switch (e) {
      case fb_component_1.UnionAiGearStrategy.RaceStrategy:
        return new fb_component_1.RaceStrategy();
      case fb_component_1.UnionAiGearStrategy.RenjuStrategy:
        return new fb_component_1.RenjuStrategy();
      default:
        return;
    }
  }
  static ReadUnionAiGearStrategy(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionAiGearStrategy.RaceStrategy:
          return FbRaceStrategy_1.FbRaceStrategy.Create(t);
        case fb_component_1.UnionAiGearStrategy.RenjuStrategy:
          return FbRenjuStrategy_1.FbRenjuStrategy.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionAiGearStrategyHelper = UnionAiGearStrategyHelper;
//# sourceMappingURL=UnionAiGearStrategyHelper.js.map