"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUiNormalConfigByViewNameIfNull = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiNormalConfig_1 = require("../Config/UiNormalConfig");
const DB = "db_ui.db";
const FILE = "u.UiNormal层级队列配置.csv";
const TABLE = "UiNormalConfig";
const COMMAND = "select BinData from `UiNormalConfig` where ViewName = ? AND (SELECT count(0) from `UiNormalConfig` WHERE ViewName = ?) > 0 OR ViewName = \"DefaultView\" AND (SELECT count(0) from `UiNormalConfig` WHERE ViewName = ?) <= 0";
const KEY_PREFIX = "UiNormalConfigByViewNameIfNull";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configUiNormalConfigByViewNameIfNull.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configUiNormalConfigByViewNameIfNull.GetConfig");
const CONFIG_STAT_PREFIX = "configUiNormalConfigByViewNameIfNull.GetConfig(";
exports.configUiNormalConfigByViewNameIfNull = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i}#${n})`);
    a?.Start();
    var m = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (m) {
      if (e) {
        var C = `${KEY_PREFIX}#${o}#${i}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (m = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ViewName", o], ["ViewName", i], ["ViewName", n]) > 0) {
        C = undefined;
        [m, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ViewName", o], ["ViewName", i], ["ViewName", n]);
        if (m) {
          const f = UiNormalConfig_1.UiNormalConfig.getRootAsUiNormalConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (e) {
            m = `${KEY_PREFIX}#${o}#${i}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(m, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=UiNormalConfigByViewNameIfNull.js.map