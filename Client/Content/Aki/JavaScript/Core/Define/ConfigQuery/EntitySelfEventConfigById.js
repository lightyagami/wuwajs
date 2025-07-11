"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntitySelfEventConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntitySelfEventConfig_1 = require("../Config/EntitySelfEventConfig");
const DB = "db_entityselfeventconfig.db";
const FILE = "k.可视化编辑/c.Csv/s.实体自身事件/*.csv*";
const TABLE = "EntitySelfEventConfig";
const COMMAND = "select BinData from `EntitySelfEventConfig` where Id=?";
const KEY_PREFIX = "EntitySelfEventConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySelfEventConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySelfEventConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configEntitySelfEventConfigById.GetConfig(";
exports.configEntitySelfEventConfigById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (t) {
        var e = `${KEY_PREFIX}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (i) {
          const f = EntitySelfEventConfig_1.EntitySelfEventConfig.getRootAsEntitySelfEventConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntitySelfEventConfigById.js.map