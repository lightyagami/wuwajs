"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGenericPromptTypesByTypeId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GenericPromptTypes_1 = require("../Config/GenericPromptTypes");
const DB = "db_generic_tips.db";
const FILE = "t.通用提示.xlsx";
const TABLE = "GenericPromptTypes";
const COMMAND = "select BinData from `GenericPromptTypes` where TypeId=?";
const KEY_PREFIX = "GenericPromptTypesByTypeId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGenericPromptTypesByTypeId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGenericPromptTypesByTypeId.GetConfig");
const CONFIG_STAT_PREFIX = "configGenericPromptTypesByTypeId.GetConfig(";
exports.configGenericPromptTypesByTypeId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var t = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TypeId", o]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TypeId", o]);
        if (i) {
          const r = GenericPromptTypes_1.GenericPromptTypes.getRootAsGenericPromptTypes(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GenericPromptTypesByTypeId.js.map