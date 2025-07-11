"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalTextConfig = undefined;
const CiacconaGalTextById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalTextById");
class CiacconaGalTextConfig {
  static GetTextId(e) {
    return CiacconaGalTextById_1.configCiacconaGalTextById.GetConfig(e)?.TextId ?? "";
  }
}
exports.CiacconaGalTextConfig = CiacconaGalTextConfig;
//# sourceMappingURL=CiacconaGalTextConfig.js.map