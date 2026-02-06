"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const GuessJokerAiConfigAll_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerAiConfigAll");
const GuessJokerAiConfigById_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerAiConfigById");
const GuessJokerAiConfigByNpcId_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerAiConfigByNpcId");
const GuessJokerAIPlotConfigAll_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerAIPlotConfigAll");
const GuessJokerLevelAll_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerLevelAll");
const GuessJokerLevelById_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerLevelById");
const GuessJokerParamByKey_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerParamByKey");
const GuessJokerPlotConfigById_1 = require("../../../../Core/Define/ConfigQuery/GuessJokerPlotConfigById");
const JokerDeckById_1 = require("../../../../Core/Define/ConfigQuery/JokerDeckById");
const JokerSkillById_1 = require("../../../../Core/Define/ConfigQuery/JokerSkillById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../../Manager/ModelManager");
class GuessJokerConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.$Vg = [];
  }
  GetJokerLevelById(e) {
    var r = GuessJokerLevelById_1.configGuessJokerLevelById.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerLevel表无效id", ["id", e]);
    }
  }
  GetJokerLevelList() {
    var e = GuessJokerLevelAll_1.configGuessJokerLevelAll.GetConfigList();
    if (e === undefined) {
      return [];
    } else {
      return e;
    }
  }
  GetNpcAndChairMatchInfo() {
    if (!(this.$Vg.length > 0)) {
      var e = [];
      var r = GuessJokerAiConfigAll_1.configGuessJokerAiConfigAll.GetConfigList();
      if (r === undefined) {
        return [];
      }
      for (const o of r) {
        e.push({
          NpcId: o.NpcId,
          ChairId: o.ChairId
        });
      }
      this.$Vg = e;
    }
    return this.$Vg;
  }
  GetJokerDeck(e) {
    var r = JokerDeckById_1.configJokerDeckById.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "JokerDeck表无效id", ["id", e]);
    }
  }
  GetJokerLevelByNpcId(e) {
    var r = GuessJokerLevelAll_1.configGuessJokerLevelAll.GetConfigList();
    if (r !== undefined) {
      for (const i of r) {
        var o = i.AiRole;
        if (this.GetJokerAiConfigByRoleId(o)?.NpcId === e) {
          return i;
        }
      }
    }
  }
  GetJokerSkill(e) {
    var r = JokerSkillById_1.configJokerSkillById.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "JokerSkill表无效id", ["id", e]);
    }
  }
  GetJokerAiConfigByRoleId(e) {
    var r = GuessJokerAiConfigById_1.configGuessJokerAiConfigById.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerAiConfig表无效roleId", ["roleId", e]);
    }
  }
  GetJokerAiConfigByEntityId(e) {
    var r = GuessJokerAiConfigByNpcId_1.configGuessJokerAiConfigByNpcId.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerAiConfig表无效entityId", ["entityId", e]);
    }
  }
  GetJokerAiPlotConfig(e, r, o = 0) {
    var i = e === 1 ? ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetRoleId() : 0;
    var e = GuessJokerAIPlotConfigAll_1.configGuessJokerAIPlotConfigAll.GetConfigList();
    if (e !== undefined) {
      for (const s of e) {
        if (s.RoleId === i && s.State === r && s.ExtraParam === o) {
          return s;
        }
      }
    }
  }
  GetJokerPlotConfig(e) {
    var r = GuessJokerPlotConfigById_1.configGuessJokerPlotConfigById.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerPlotConfig表无效id", ["id", e]);
    }
  }
  GetJokerParam(e) {
    var r = GuessJokerParamByKey_1.configGuessJokerParamByKey.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerParam表无效key", ["key", e]);
    }
  }
}
exports.GuessJokerConfig = GuessJokerConfig;
//# sourceMappingURL=GuessJokerConfig.js.map