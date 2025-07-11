"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGongduolaPassengerVoiceConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GongduolaPassengerVoiceConfig_1 = require("../Config/GongduolaPassengerVoiceConfig");
const DB = "db_gongduolapassengervoiceconfig.db";
const FILE = "k.可视化编辑/c.Csv/g.贡多拉共乘角色语音配置/*.csv*";
const TABLE = "GongduolaPassengerVoiceConfig";
const COMMAND = "select BinData from `GongduolaPassengerVoiceConfig` where Id=?";
const KEY_PREFIX = "GongduolaPassengerVoiceConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGongduolaPassengerVoiceConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGongduolaPassengerVoiceConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configGongduolaPassengerVoiceConfigById.GetConfig(";
exports.configGongduolaPassengerVoiceConfigById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var g = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (t) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        g = undefined;
        [i, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (i) {
          const t = GongduolaPassengerVoiceConfig_1.GongduolaPassengerVoiceConfig.getRootAsGongduolaPassengerVoiceConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GongduolaPassengerVoiceConfigById.js.map