"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionDynamicSettlementConfig = exports.unionToUnionDynamicSettlementConfig = exports.UnionDynamicSettlementConfig = undefined;
const battle_settlement_js_1 = require("../fb-action/battle-settlement.js");
const soaring_challenge_settlement_js_1 = require("../fb-action/soaring-challenge-settlement.js");
var UnionDynamicSettlementConfig;
function unionToUnionDynamicSettlementConfig(e, t) {
  switch (UnionDynamicSettlementConfig[e]) {
    case "NONE":
      return;
    case "BattleSettlement":
      return t(new battle_settlement_js_1.BattleSettlement());
    case "SoaringChallengeSettlement":
      return t(new soaring_challenge_settlement_js_1.SoaringChallengeSettlement());
    default:
      return;
  }
}
function unionListToUnionDynamicSettlementConfig(e, t, n) {
  switch (UnionDynamicSettlementConfig[e]) {
    case "NONE":
      return;
    case "BattleSettlement":
      return t(n, new battle_settlement_js_1.BattleSettlement());
    case "SoaringChallengeSettlement":
      return t(n, new soaring_challenge_settlement_js_1.SoaringChallengeSettlement());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.BattleSettlement = 1] = "BattleSettlement";
  e[e.SoaringChallengeSettlement = 2] = "SoaringChallengeSettlement";
})(UnionDynamicSettlementConfig = exports.UnionDynamicSettlementConfig ||= {});
exports.unionToUnionDynamicSettlementConfig = unionToUnionDynamicSettlementConfig;
exports.unionListToUnionDynamicSettlementConfig = unionListToUnionDynamicSettlementConfig; //# sourceMappingURL=union-dynamic-settlement-config.js.map