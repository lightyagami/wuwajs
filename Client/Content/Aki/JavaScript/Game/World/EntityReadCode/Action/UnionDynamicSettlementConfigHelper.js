"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionDynamicSettlementConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbBattleSettlement_1 = require("./FbBattleSettlement");
const FbSoaringChallengeSettlement_1 = require("./FbSoaringChallengeSettlement");
class UnionDynamicSettlementConfigHelper {
  static GetUnionDynamicSettlementConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionDynamicSettlementConfig.BattleSettlement:
        return new fb_action_1.BattleSettlement();
      case fb_action_1.UnionDynamicSettlementConfig.SoaringChallengeSettlement:
        return new fb_action_1.SoaringChallengeSettlement();
      default:
        return;
    }
  }
  static ReadUnionDynamicSettlementConfig(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionDynamicSettlementConfig.BattleSettlement:
          return FbBattleSettlement_1.FbBattleSettlement.Create(t);
        case fb_action_1.UnionDynamicSettlementConfig.SoaringChallengeSettlement:
          return FbSoaringChallengeSettlement_1.FbSoaringChallengeSettlement.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionDynamicSettlementConfigHelper = UnionDynamicSettlementConfigHelper;
//# sourceMappingURL=UnionDynamicSettlementConfigHelper.js.map