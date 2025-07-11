"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLongPressConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LongPressConfig_1 = require("../Config/LongPressConfig");
const DB = "db_longpress_config.db";
const FILE = "c.长按组件配置.xlsx";
const TABLE = "LongPressConfig";
const COMMAND = "select BinData from `LongPressConfig` where Id = ?";
const KEY_PREFIX = "LongPressConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLongPressConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLongPressConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configLongPressConfigById.GetConfig(";
exports.configLongPressConfigById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var g = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (t) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        g = undefined;
        [e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (e) {
          const t = LongPressConfig_1.LongPressConfig.getRootAsLongPressConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LongPressConfigById.js.map