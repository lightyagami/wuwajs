"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTemporaryTeleportMarkByMarkId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TemporaryTeleportMark_1 = require("../Config/TemporaryTeleportMark");
const DB = "db_map_mark.db";
const FILE = "d.地图标记.xlsx";
const TABLE = "TemporaryTeleportMark";
const COMMAND = "select BinData from `TemporaryTeleportMark` where MarkId=?";
const KEY_PREFIX = "TemporaryTeleportMarkByMarkId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTemporaryTeleportMarkByMarkId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTemporaryTeleportMarkByMarkId.GetConfig");
const CONFIG_STAT_PREFIX = "configTemporaryTeleportMarkByMarkId.GetConfig(";
exports.configTemporaryTeleportMarkByMarkId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var r = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    r?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (e) {
        var t = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MarkId", o]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MarkId", o]);
        if (n) {
          const a = TemporaryTeleportMark_1.TemporaryTeleportMark.getRootAsTemporaryTeleportMark(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TemporaryTeleportMarkByMarkId.js.map