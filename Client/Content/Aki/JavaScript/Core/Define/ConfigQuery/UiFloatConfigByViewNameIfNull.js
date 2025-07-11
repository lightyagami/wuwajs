"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUiFloatConfigByViewNameIfNull = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiFloatConfig_1 = require("../Config/UiFloatConfig");
const DB = "db_ui.db";
const FILE = "u.UiFloat层级配置.csv";
const TABLE = "UiFloatConfig";
const COMMAND = "select BinData from `UiFloatConfig` where ViewName = ? AND (SELECT count(0) from `UiFloatConfig` WHERE ViewName = ?) > 0 OR ViewName = \"DefaultView\" AND (SELECT count(0) from `UiFloatConfig` WHERE ViewName = ?) <= 0";
const KEY_PREFIX = "UiFloatConfigByViewNameIfNull";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configUiFloatConfigByViewNameIfNull.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configUiFloatConfigByViewNameIfNull.GetConfig");
const CONFIG_STAT_PREFIX = "configUiFloatConfigByViewNameIfNull.GetConfig(";
exports.configUiFloatConfigByViewNameIfNull = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i}#${n})`);
    t?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (e) {
        var C = `${KEY_PREFIX}#${o}#${i}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ViewName", o], ["ViewName", i], ["ViewName", n]) > 0) {
        C = undefined;
        [a, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ViewName", o], ["ViewName", i], ["ViewName", n]);
        if (a) {
          const f = UiFloatConfig_1.UiFloatConfig.getRootAsUiFloatConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (e) {
            a = `${KEY_PREFIX}#${o}#${i}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, f);
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
//# sourceMappingURL=UiFloatConfigByViewNameIfNull.js.map