"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBanInfoByTypeAndReason = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BanInfo_1 = require("../Config/BanInfo");
const DB = "db_report.db";
const FILE = "f.封禁处罚.xlsx";
const TABLE = "BanInfo";
const COMMAND = "select BinData from `BanInfo` where BanType=? AND BanReason=?";
const KEY_PREFIX = "BanInfoByTypeAndReason";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBanInfoByTypeAndReason.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBanInfoByTypeAndReason.GetConfig");
const CONFIG_STAT_PREFIX = "configBanInfoByTypeAndReason.GetConfig(";
exports.configBanInfoByTypeAndReason = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    i?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (e) {
        var t = `${KEY_PREFIX}#${n}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BanType", n], ["BanReason", o]) > 0) {
        t = undefined;
        [a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BanType", n], ["BanReason", o]);
        if (a) {
          const f = BanInfo_1.BanInfo.getRootAsBanInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            a = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BanInfoByTypeAndReason.js.map