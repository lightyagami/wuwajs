"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipConfig = undefined;
const KingShipAttributeById_1 = require("../../../Core/Define/ConfigQuery/KingShipAttributeById");
const KingShipBuffById_1 = require("../../../Core/Define/ConfigQuery/KingShipBuffById");
const ReignsById_1 = require("../../../Core/Define/ConfigQuery/ReignsById");
const ReignsCardById_1 = require("../../../Core/Define/ConfigQuery/ReignsCardById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class KingShipConfig extends ConfigBase_1.ConfigBase {
  GetKingShipAttribute(e) {
    return KingShipAttributeById_1.configKingShipAttributeById.GetConfig(e);
  }
  GetKingShipBuff(e) {
    return KingShipBuffById_1.configKingShipBuffById.GetConfig(e);
  }
  GetReigns(e) {
    return ReignsById_1.configReignsById.GetConfig(e);
  }
  GetReignsCallCard(e) {
    return ReignsCardById_1.configReignsCardById.GetConfig(e);
  }
}
exports.KingShipConfig = KingShipConfig;
//# sourceMappingURL=KingShipConfig.js.map