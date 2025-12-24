"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBirthDayTextByDateAndType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BirthDayText_1 = require("../Config/BirthDayText");
const DB = "db_birthday.db";
const FILE = "s.生日.xlsx";
const TABLE = "BirthDayText";
const COMMAND = "select BinData from `BirthDayText` where Date=? And DateType=?";
const KEY_PREFIX = "BirthDayTextByDateAndType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBirthDayTextByDateAndType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBirthDayTextByDateAndType.GetConfig");
const CONFIG_STAT_PREFIX = "configBirthDayTextByDateAndType.GetConfig(";
exports.configBirthDayTextByDateAndType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var a = `${KEY_PREFIX}#${t}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Date", t], ["DateType", o]) > 0) {
        a = undefined;
        [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Date", t], ["DateType", o]);
        if (i) {
          const C = BirthDayText_1.BirthDayText.getRootAsBirthDayText(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${t}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BirthDayTextByDateAndType.js.map