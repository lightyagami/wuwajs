"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTrainRoleDialogByRoleIdAndTrainType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TrainRoleDialog_1 = require("../Config/TrainRoleDialog");
const DB = "db_moonchasing.db";
const FILE = "z.追月节.xlsx";
const TABLE = "TrainRoleDialog";
const COMMAND = "select BinData from `TrainRoleDialog` where RoleId=? AND TrainType=?";
const KEY_PREFIX = "TrainRoleDialogByRoleIdAndTrainType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTrainRoleDialogByRoleIdAndTrainType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTrainRoleDialogByRoleIdAndTrainType.GetConfig");
const CONFIG_STAT_PREFIX = "configTrainRoleDialogByRoleIdAndTrainType.GetConfig(";
exports.configTrainRoleDialogByRoleIdAndTrainType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    e?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (i) {
        var t = `${KEY_PREFIX}#${o}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["RoleId", o], ["TrainType", n]) > 0) {
        t = undefined;
        [a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o], ["TrainType", n]);
        if (a) {
          const g = TrainRoleDialog_1.TrainRoleDialog.getRootAsTrainRoleDialog(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            a = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TrainRoleDialogByRoleIdAndTrainType.js.map