"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRedDotByRelativeName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RedDot_1 = require("../Config/RedDot");
const DB = "db_reddot.db";
const FILE = "h.红点.xlsx";
const TABLE = "RedDot";
const COMMAND = "select BinData from `RedDot` where RelativeName IS NOT NULL";
const KEY_PREFIX = "RedDotByRelativeName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRedDotByRelativeName.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRedDotByRelativeName.GetConfigList");
exports.configRedDotByRelativeName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var t;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (n) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return n;
        }
      }
      const n = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!t) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        i = RedDot_1.RedDot.getRootAsRedDot(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        n.push(i);
      }
      if (o) {
        e = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(e, n, n.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return n;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RedDotByRelativeName.js.map