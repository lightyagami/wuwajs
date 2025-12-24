"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBirthDayByMsgId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BirthDay_1 = require("../Config/BirthDay");
const DB = "db_birthday.db";
const FILE = "s.生日.xlsx";
const TABLE = "BirthDay";
const COMMAND = "select BinData from `BirthDay` where SendShortMessage=?";
const KEY_PREFIX = "BirthDayByMsgId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBirthDayByMsgId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBirthDayByMsgId.GetConfig");
const CONFIG_STAT_PREFIX = "configBirthDayByMsgId.GetConfig(";
exports.configBirthDayByMsgId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["SendShortMessage", o]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SendShortMessage", o]);
        if (i) {
          const a = BirthDay_1.BirthDay.getRootAsBirthDay(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BirthDayByMsgId.js.map