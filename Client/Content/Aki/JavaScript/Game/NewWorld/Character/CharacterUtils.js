"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CalabashMeshById_1 = require("../../../Core/Define/ConfigQuery/CalabashMeshById");
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
      var a = r.Entity.GetComponent(0);
      var t = r.Entity.GetComponent(41);
      var o = r.Entity.GetComponent(215);
      let e = undefined;
      r = a.GetMonsterComponent()?.FightConfigId;
      if (r) {
        e = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(r);
      }
      r = a.GetRoleId();
      a = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(r);
      if (e = a ? MonsterBattleConfByRoleId_1.configMonsterBattleConfByRoleId.GetConfig(a) : e) {
        var r = MonsterPerformanceConfById_1.configMonsterPerformanceConfById.GetConfigList(e.MonsterPerformanceId);
        var n = t.CurrentSkill?.SkillId ?? 0;
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
  static SetActorHiddenInGame(e, r, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 67, "CharacterUtils.SetActorHiddenInGame", ["Actor", e.GetName()], ["IsHidden", r], ["Reason", a]);
    }
    e.SetActorHiddenInGame(r);
  }
  static GetHuluModelId(e) {
    var r = CalabashMeshById_1.configCalabashMeshById.GetConfig(e);
    if (r) {
      return r.MeshId;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 28, "势力.xlsx里没有配葫芦模型ID", ["partyId", e]);
      }
      return 0;
    }
  }
}
exports.CharacterUtils = CharacterUtils;
//# sourceMappingURL=CharacterUtils.js.map