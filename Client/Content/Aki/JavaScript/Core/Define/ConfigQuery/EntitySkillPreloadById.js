"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntitySkillPreloadById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntitySkillPreload_1 = require("../Config/EntitySkillPreload");
const DB = "db_entity_skill_preload.db";
const FILE = "Preload/EntitySkillPreload.csv";
const TABLE = "EntitySkillPreload";
const COMMAND = "select BinData from `EntitySkillPreload` where Id=?";
const KEY_PREFIX = "EntitySkillPreloadById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySkillPreloadById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySkillPreloadById.GetConfig");
const CONFIG_STAT_PREFIX = "configEntitySkillPreloadById.GetConfig(";
exports.configEntitySkillPreloadById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var e = `${KEY_PREFIX}#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (l) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (n) {
          const l = EntitySkillPreload_1.EntitySkillPreload.getRootAsEntitySkillPreload(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, l);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntitySkillPreloadById.js.map