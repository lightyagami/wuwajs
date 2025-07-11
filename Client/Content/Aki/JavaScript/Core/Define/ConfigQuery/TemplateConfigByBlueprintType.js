"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTemplateConfigByBlueprintType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TemplateConfig_1 = require("../Config/TemplateConfig");
const DB = "db_template.db";
const FILE = "UniverseEditor/Entity/Template.csv";
const TABLE = "TemplateConfig";
const COMMAND = "select BinData from `TemplateConfig` where BlueprintType=?";
const KEY_PREFIX = "TemplateConfigByBlueprintType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTemplateConfigByBlueprintType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTemplateConfigByBlueprintType.GetConfig");
const CONFIG_STAT_PREFIX = "configTemplateConfigByBlueprintType.GetConfig(";
exports.configTemplateConfigByBlueprintType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var i = `${KEY_PREFIX}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BlueprintType", e]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BlueprintType", e]);
        if (t) {
          const C = TemplateConfig_1.TemplateConfig.getRootAsTemplateConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TemplateConfigByBlueprintType.js.map