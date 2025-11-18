"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAdvertisingTabInfoAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdvertisingTabInfo_1 = require("../Config/AdvertisingTabInfo");
const DB = "db_advertisingpage.db";
const FILE = "x.下一版本核心内容展示.xlsx";
const TABLE = "AdvertisingTabInfo";
const COMMAND = "select BinData from `AdvertisingTabInfo`";
const KEY_PREFIX = "AdvertisingTabInfoAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabInfoAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabInfoAll.GetConfigList");
exports.configAdvertisingTabInfoAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n = true) => {
    var o;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (n) {
        var i = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
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
        [o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!o) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = AdvertisingTabInfo_1.AdvertisingTabInfo.getRootAsAdvertisingTabInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        e.push(t);
      }
      if (n) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, e, e.length);
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
//# sourceMappingURL=AdvertisingTabInfoAll.js.map