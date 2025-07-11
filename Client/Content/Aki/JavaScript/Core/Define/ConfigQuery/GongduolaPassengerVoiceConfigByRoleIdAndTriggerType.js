"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GongduolaPassengerVoiceConfig_1 = require("../Config/GongduolaPassengerVoiceConfig");
const DB = "db_gongduolapassengervoiceconfig.db";
const FILE = "k.可视化编辑/c.Csv/g.贡多拉共乘角色语音配置/*.csv*";
const TABLE = "GongduolaPassengerVoiceConfig";
const COMMAND = "select BinData from `GongduolaPassengerVoiceConfig` where RoleId=? And TriggerType=?";
const KEY_PREFIX = "GongduolaPassengerVoiceConfigByRoleIdAndTriggerType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.GetConfigList(";
exports.configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n})`);
    i?.Start();
    var g = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (g) {
      if (e) {
        var t = `${KEY_PREFIX}#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (g = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o], ["TriggerType", n]) !== 1) {
            break;
          }
          var r = undefined;
          [g, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o], ["TriggerType", n]);
          if (!g) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = GongduolaPassengerVoiceConfig_1.GongduolaPassengerVoiceConfig.getRootAsGongduolaPassengerVoiceConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          a.push(r);
        }
        if (e) {
          t = `${KEY_PREFIX}#${o}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GongduolaPassengerVoiceConfigByRoleIdAndTriggerType.js.map