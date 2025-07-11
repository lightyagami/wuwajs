"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoConfig = undefined;
const DangoById_1 = require("../../../../Core/Define/ConfigQuery/DangoById");
const DangoSkillById_1 = require("../../../../Core/Define/ConfigQuery/DangoSkillById");
const DangoSkillEffectById_1 = require("../../../../Core/Define/ConfigQuery/DangoSkillEffectById");
const DiceById_1 = require("../../../../Core/Define/ConfigQuery/DiceById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class DangoConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetDangoById(e) {
    return DangoById_1.configDangoById.GetConfig(e);
  }
  GetDiceById(e) {
    return DiceById_1.configDiceById.GetConfig(e);
  }
  GetDangoSkillById(e) {
    return DangoSkillById_1.configDangoSkillById.GetConfig(e);
  }
  GetDangoSkillEffectById(e) {
    return DangoSkillEffectById_1.configDangoSkillEffectById.GetConfig(e);
  }
}
exports.DangoConfig = DangoConfig;
//# sourceMappingURL=DangoConfig.js.map