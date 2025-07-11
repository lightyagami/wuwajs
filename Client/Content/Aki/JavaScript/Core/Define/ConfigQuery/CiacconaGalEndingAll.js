"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCiacconaGalEndingAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CiacconaGalEnding_1 = require("../Config/CiacconaGalEnding");
const DB = "db_ciacconagal.db";
const FILE = "x.夏空活动.xlsx";
const TABLE = "CiacconaGalEnding";
const COMMAND = "select BinData from `CiacconaGalEnding`";
const KEY_PREFIX = "CiacconaGalEndingAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCiacconaGalEndingAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configCiacconaGalEndingAll.GetConfigList");
exports.configCiacconaGalEndingAll = {
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
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      const a = new Array();
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
        t = CiacconaGalEnding_1.CiacconaGalEnding.getRootAsCiacconaGalEnding(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        a.push(t);
      }
      if (n) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, a, a.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CiacconaGalEndingAll.js.map