"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterUtils = undefined;
const MonsterBattleConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const MonsterBattleConfByRoleId_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfByRoleId");
const MonsterPerformanceConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterPerformanceConfById");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class CharacterUtils {
  static IsCharacterMonsterOrSummoned(e) {
    return !!e?.Valid && !!(e = e.Entity.GetComponent(0))?.Valid && (!!e.IsCharacterMonster() || !!e.IsSummonByCharacterMonster());
  }
  static CanCharacterMonsterOrSummonedDisplayEffect(e) {
    var r;
    return !!e?.Valid && !!(r = e.Entity.GetComponent(0))?.Valid && (r.IsCharacterMonster() ? this.Jil(e) : !r.IsSummonByCharacterMonster() || (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r.GetSummonerId()), this.Jil(e)));
  }
  static Jil(r) {
    if (r?.Valid) {
      var t = r.Entity.GetComponent(0);
      var a = r.Entity.GetComponent(40);
      var o = r.Entity.GetComponent(205);
      let e = undefined;
      r = t.GetMonsterComponent()?.FightConfigId;
      if (r) {
        e = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(r);
      }
      r = t.GetRoleId();
      t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(r);
      if (e = t ? MonsterBattleConfByRoleId_1.configMonsterBattleConfByRoleId.GetConfig(t) : e) {
        var r = MonsterPerformanceConfById_1.configMonsterPerformanceConfById.GetConfigList(e.MonsterPerformanceId);
        var n = a.CurrentSkill?.SkillId ?? 0;
        for (const s of r ?? []) {
          if (s.SkillIds.includes(n)) {
            var i = s.Tag;
            if (!i) {
              return true;
            }
            i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
            if (i && o.HasTag(i)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
exports.CharacterUtils = CharacterUtils;
//# sourceMappingURL=CharacterUtils.js.map