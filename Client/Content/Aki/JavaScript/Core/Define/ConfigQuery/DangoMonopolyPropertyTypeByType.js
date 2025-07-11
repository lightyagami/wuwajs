"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDangoMonopolyPropertyTypeByType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DangoMonopolyPropertyType_1 = require("../Config/DangoMonopolyPropertyType");
const DB = "db_dangomonopoly.db";
const FILE = "t.团子大富翁.xlsx";
const TABLE = "DangoMonopolyPropertyType";
const COMMAND = "select BinData from `DangoMonopolyPropertyType` where PropertyType=?";
const KEY_PREFIX = "DangoMonopolyPropertyTypeByType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDangoMonopolyPropertyTypeByType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDangoMonopolyPropertyTypeByType.GetConfig");
const CONFIG_STAT_PREFIX = "configDangoMonopolyPropertyTypeByType.GetConfig(";
exports.configDangoMonopolyPropertyTypeByType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var i = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["PropertyType", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PropertyType", o]);
        if (t) {
          const r = DangoMonopolyPropertyType_1.DangoMonopolyPropertyType.getRootAsDangoMonopolyPropertyType(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DangoMonopolyPropertyTypeByType.js.map