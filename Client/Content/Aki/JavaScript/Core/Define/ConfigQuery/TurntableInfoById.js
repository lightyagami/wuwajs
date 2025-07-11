"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTurntableInfoById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TurntableInfo_1 = require("../Config/TurntableInfo");
const DB = "db_activity.db";
const FILE = "z.转盘活动.xlsx";
const TABLE = "TurntableInfo";
const COMMAND = "select BinData from `TurntableInfo` where Id=?";
const KEY_PREFIX = "TurntableInfoById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTurntableInfoById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTurntableInfoById.GetConfig");
const CONFIG_STAT_PREFIX = "configTurntableInfoById.GetConfig(";
exports.configTurntableInfoById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (i) {
          const f = TurntableInfo_1.TurntableInfo.getRootAsTurntableInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TurntableInfoById.js.map