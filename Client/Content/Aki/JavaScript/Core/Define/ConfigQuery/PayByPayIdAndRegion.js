"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPayByPayIdAndRegion = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Pay_1 = require("../Config/Pay");
const DB = "db_paycurrency.db";
const FILE = "c.充值.xlsx";
const TABLE = "Pay";
const COMMAND = "select BinData from `Pay` where PayId=? AND Region=?";
const KEY_PREFIX = "PayByPayIdAndRegion";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPayByPayIdAndRegion.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPayByPayIdAndRegion.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPayByPayIdAndRegion.GetConfigList(";
exports.configPayByPayIdAndRegion = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var a = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, n, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PayId", o], ["Region", n]) !== 1) {
            break;
          }
          var g = undefined;
          [e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PayId", o], ["Region", n]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = Pay_1.Pay.getRootAsPay(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          C.push(g);
        }
        if (i) {
          a = `${KEY_PREFIX}#${o}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PayByPayIdAndRegion.js.map