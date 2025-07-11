"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntitySelfEventConfigByKey = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntitySelfEventConfig_1 = require("../Config/EntitySelfEventConfig");
const DB = "db_entityselfeventconfig.db";
const FILE = "k.可视化编辑/c.Csv/s.实体自身事件/*.csv*";
const TABLE = "EntitySelfEventConfig";
const COMMAND = "select BinData from `EntitySelfEventConfig` where Key=?";
const KEY_PREFIX = "EntitySelfEventConfigByKey";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySelfEventConfigByKey.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntitySelfEventConfigByKey.GetConfig");
const CONFIG_STAT_PREFIX = "configEntitySelfEventConfigByKey.GetConfig(";
exports.configEntitySelfEventConfigByKey = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var i = `${KEY_PREFIX}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Key", n]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Key", n]);
        if (e) {
          const f = EntitySelfEventConfig_1.EntitySelfEventConfig.getRootAsEntitySelfEventConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, f);
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
//# sourceMappingURL=EntitySelfEventConfigByKey.js.map