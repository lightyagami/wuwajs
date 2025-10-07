"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueSubModel = undefined;
const KscSubModelBase_1 = require("../KscSubModelBase");
class SurvivorsRogueSubModel extends KscSubModelBase_1.KscSubModelBase {
  constructor() {
    super(...arguments);
    this.BulletDataTable = undefined;
    this.HNu = new Map();
    this.WeaponKscEntities = [];
    this.GoldNum = 0;
    this.KillComboStage = 0;
  }
  GetSkillDtPath() {
    return SurvivorsRogueSubModel.SkillDtPath;
  }
  GetEntityDtPath() {
    return SurvivorsRogueSubModel.EntityDtPath;
  }
  GetEntity(t) {
    return this.HNu.get(t);
  }
  GetAllEntities(e) {
    e.length = 0;
    this.HNu.forEach(t => {
      e.push(t);
    });
  }
  TryAddEntity(t) {
    var e;
    if (t && t.IsValid()) {
      e = t.Uid;
      if (this.HNu.has(e)) {
        return "实体数据已存在";
      } else {
        this.HNu.set(e, t);
        return;
      }
    } else {
      return "实体数据无效";
    }
  }
  RemoveEntity(t) {
    var e = this.HNu.get(t);
    if (e) {
      this.HNu.delete(t);
    }
    return e;
  }
  OnClear() {
    this.HNu.clear();
    this.WeaponKscEntities.length = 0;
    this.GoldNum = 0;
    return !(this.KillComboStage = 0);
  }
}
(exports.SurvivorsRogueSubModel = SurvivorsRogueSubModel).SkillDtPath = "/Game/Aki/Data/SimpleCombat/2_7XingCunZhe/Player/DT_KscSkill.DT_KscSkill";
SurvivorsRogueSubModel.EntityDtPath = "/Game/Aki/Data/SimpleCombat/2_7XingCunZhe/Player/DT_KscEntity.DT_KscEntity";
SurvivorsRogueSubModel.BulletDtPath = "/Game/Aki/Data/SimpleCombat/2_7XingCunZhe/CDT_KuroBulletData_XCZ.CDT_KuroBulletData_XCZ"; //# sourceMappingURL=SurvivorsRogueSubModel.js.map