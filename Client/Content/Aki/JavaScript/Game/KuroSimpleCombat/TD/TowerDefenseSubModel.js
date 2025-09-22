"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseSubModel = undefined;
const KscSubModelBase_1 = require("../KscSubModelBase");
class TowerDefenseSubModel extends KscSubModelBase_1.KscSubModelBase {
  GetSkillDtPath() {
    return TowerDefenseSubModel.SkillDtPath;
  }
  GetEntityDtPath() {
    return TowerDefenseSubModel.EntityDtPath;
  }
}
(exports.TowerDefenseSubModel = TowerDefenseSubModel).SkillDtPath = "/Game/Aki/Data/SimpleCombat/2_6TaFang/Player/AssistMachine/SkillComp/DT_KscSkill_AssistMachine.DT_KscSkill_AssistMachine";
TowerDefenseSubModel.EntityDtPath = "/Game/Aki/Data/SimpleCombat/2_6TaFang/Player/DT_KscEntity.DT_KscEntity"; //# sourceMappingURL=TowerDefenseSubModel.js.map