"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBlackCoastThemeTaskReByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BlackCoastThemeTaskRe_1 = require("../Config/BlackCoastThemeTaskRe");
const DB = "db_activity.db";
const FILE = "h.黑海岸主题活动.xlsx";
const TABLE = "BlackCoastThemeTaskRe";
const COMMAND = "select BinData from `BlackCoastThemeTaskRe` where TaskId=?";
const KEY_PREFIX = "BlackCoastThemeTaskReByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBlackCoastThemeTaskReByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBlackCoastThemeTaskReByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configBlackCoastThemeTaskReByTaskId.GetConfig(";
exports.configBlackCoastThemeTaskReByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    a?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var n = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", o]) > 0) {
        n = undefined;
        [t, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", o]);
        if (t) {
          const i = BlackCoastThemeTaskRe_1.BlackCoastThemeTaskRe.getRootAsBlackCoastThemeTaskRe(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BlackCoastThemeTaskReByTaskId.js.map