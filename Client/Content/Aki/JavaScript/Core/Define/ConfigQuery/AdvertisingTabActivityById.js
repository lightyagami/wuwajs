"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAdvertisingTabActivityById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdvertisingTabActivity_1 = require("../Config/AdvertisingTabActivity");
const DB = "db_advertisingpage.db";
const FILE = "x.下一版本核心内容展示.xlsx";
const TABLE = "AdvertisingTabActivity";
const COMMAND = "select BinData from `AdvertisingTabActivity` where Id=?";
const KEY_PREFIX = "AdvertisingTabActivityById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabActivityById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabActivityById.GetConfig");
const CONFIG_STAT_PREFIX = "configAdvertisingTabActivityById.GetConfig(";
exports.configAdvertisingTabActivityById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    n?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (t) {
        var e = `${KEY_PREFIX}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (o) {
          const g = AdvertisingTabActivity_1.AdvertisingTabActivity.getRootAsAdvertisingTabActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            o = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AdvertisingTabActivityById.js.map