"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntrustFinishDialogByEntrustIdAndLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntrustFinishDialog_1 = require("../Config/EntrustFinishDialog");
const DB = "db_moonchasing.db";
const FILE = "z.追月节.xlsx";
const TABLE = "EntrustFinishDialog";
const COMMAND = "select BinData from `EntrustFinishDialog` where EntrustId=? AND Level=?";
const KEY_PREFIX = "EntrustFinishDialogByEntrustIdAndLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntrustFinishDialogByEntrustIdAndLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntrustFinishDialogByEntrustIdAndLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configEntrustFinishDialogByEntrustIdAndLevel.GetConfig(";
exports.configEntrustFinishDialogByEntrustIdAndLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var g = `${KEY_PREFIX}#${n}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (r) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["EntrustId", n], ["Level", o]) > 0) {
        g = undefined;
        [e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EntrustId", n], ["Level", o]);
        if (e) {
          const r = EntrustFinishDialog_1.EntrustFinishDialog.getRootAsEntrustFinishDialog(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntrustFinishDialogByEntrustIdAndLevel.js.map