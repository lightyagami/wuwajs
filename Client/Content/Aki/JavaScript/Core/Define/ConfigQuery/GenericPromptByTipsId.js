"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGenericPromptByTipsId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GenericPrompt_1 = require("../Config/GenericPrompt");
const DB = "db_generic_tips.db";
const FILE = "t.通用提示.xlsx";
const TABLE = "GenericPrompt";
const COMMAND = "select BinData from `GenericPrompt` where TipsId=?";
const KEY_PREFIX = "GenericPromptByTipsId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGenericPromptByTipsId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGenericPromptByTipsId.GetConfig");
const CONFIG_STAT_PREFIX = "configGenericPromptByTipsId.GetConfig(";
exports.configGenericPromptByTipsId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TipsId", o]) > 0) {
        t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TipsId", o]);
        if (e) {
          const r = GenericPrompt_1.GenericPrompt.getRootAsGenericPrompt(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o})`;
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
//# sourceMappingURL=GenericPromptByTipsId.js.map