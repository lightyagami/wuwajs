"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFunctionMenuByFunctionId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FunctionMenu_1 = require("../Config/FunctionMenu");
const DB = "db_function.db";
const FILE = "g.功能开启.xlsx";
const TABLE = "FunctionMenu";
const COMMAND = "select BinData from `FunctionMenu` where FunctionId=?";
const KEY_PREFIX = "FunctionMenuByFunctionId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFunctionMenuByFunctionId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFunctionMenuByFunctionId.GetConfig");
const CONFIG_STAT_PREFIX = "configFunctionMenuByFunctionId.GetConfig(";
exports.configFunctionMenuByFunctionId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["FunctionId", n]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["FunctionId", n]);
        if (t) {
          const C = FunctionMenu_1.FunctionMenu.getRootAsFunctionMenu(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FunctionMenuByFunctionId.js.map