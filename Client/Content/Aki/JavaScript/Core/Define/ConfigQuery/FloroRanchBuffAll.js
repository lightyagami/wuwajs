"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFloroRanchBuffAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FloroRanchBuff_1 = require("../Config/FloroRanchBuff");
const DB = "db_flororanchbuff.db";
const FILE = "f.弗洛洛牧场_buff.xlsx";
const TABLE = "FloroRanchBuff";
const COMMAND = "select BinData from `FloroRanchBuff`";
const KEY_PREFIX = "FloroRanchBuffAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFloroRanchBuffAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFloroRanchBuffAll.GetConfigList");
exports.configFloroRanchBuffAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var t = KEY_PREFIX + ")";
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      const f = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        i = FloroRanchBuff_1.FloroRanchBuff.getRootAsFloroRanchBuff(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        f.push(i);
      }
      if (o) {
        t = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(t, f, f.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return f;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FloroRanchBuffAll.js.map