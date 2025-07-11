"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntitySkillPreloadByActorBlueprintAndSkillId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntitySkillPreload_1 = require("../Config/EntitySkillPreload");
const DB = "db_entity_skill_preload.db";
const FILE = "Preload/EntitySkillPreload.csv";
const TABLE = "EntitySkillPreload";
const COMMAND = "select BinData from `EntitySkillPreload` where ActorBlueprint=? AND SkillId=?";
const KEY_PREFIX = "EntitySkillPreloadByActorBlueprintAndSkillId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySkillPreloadByActorBlueprintAndSkillId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySkillPreloadByActorBlueprintAndSkillId.GetConfig");
const CONFIG_STAT_PREFIX = "configEntitySkillPreloadByActorBlueprintAndSkillId.GetConfig(";
exports.configEntitySkillPreloadByActorBlueprintAndSkillId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i})`);
    n?.Start();
    var l = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (l) {
      if (t) {
        var e = `${KEY_PREFIX}#${o}#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (l = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActorBlueprint", o], ["SkillId", i]) > 0) {
        e = undefined;
        [l, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActorBlueprint", o], ["SkillId", i]);
        if (l) {
          const r = EntitySkillPreload_1.EntitySkillPreload.getRootAsEntitySkillPreload(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            l = `${KEY_PREFIX}#${o}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(l, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntitySkillPreloadByActorBlueprintAndSkillId.js.map