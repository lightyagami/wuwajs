"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAdvertisingTabRegionById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdvertisingTabRegion_1 = require("../Config/AdvertisingTabRegion");
const DB = "db_advertisingpage.db";
const FILE = "x.下一版本核心内容展示.xlsx";
const TABLE = "AdvertisingTabRegion";
const COMMAND = "select BinData from `AdvertisingTabRegion` where Id=?";
const KEY_PREFIX = "AdvertisingTabRegionById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabRegionById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabRegionById.GetConfig");
const CONFIG_STAT_PREFIX = "configAdvertisingTabRegionById.GetConfig(";
exports.configAdvertisingTabRegionById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var t = `${KEY_PREFIX}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (e) {
          const g = AdvertisingTabRegion_1.AdvertisingTabRegion.getRootAsAdvertisingTabRegion(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AdvertisingTabRegionById.js.map