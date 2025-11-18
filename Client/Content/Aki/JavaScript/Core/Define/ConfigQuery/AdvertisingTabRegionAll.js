"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAdvertisingTabRegionAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdvertisingTabRegion_1 = require("../Config/AdvertisingTabRegion");
const DB = "db_advertisingpage.db";
const FILE = "x.下一版本核心内容展示.xlsx";
const TABLE = "AdvertisingTabRegion";
const COMMAND = "select BinData from `AdvertisingTabRegion`";
const KEY_PREFIX = "AdvertisingTabRegionAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabRegionAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabRegionAll.GetConfigList");
exports.configAdvertisingTabRegionAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (i) {
        var o = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (e) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      const e = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = AdvertisingTabRegion_1.AdvertisingTabRegion.getRootAsAdvertisingTabRegion(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        e.push(t);
      }
      if (i) {
        o = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(o, e, e.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return e;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AdvertisingTabRegionAll.js.map