"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GongduolaPassengerVoiceConfig_1 = require("../Config/GongduolaPassengerVoiceConfig");
const DB = "db_gongduolapassengervoiceconfig.db";
const FILE = "k.可视化编辑/c.Csv/g.贡多拉共乘角色语音配置/*.csv*";
const TABLE = "GongduolaPassengerVoiceConfig";
const COMMAND = "select BinData from `GongduolaPassengerVoiceConfig` where RoleId=? And TriggerType=? And VehicleType=?";
const KEY_PREFIX = "GongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configGongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configGongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType.GetConfigList(";
exports.configGongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, e, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var g = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${e}#${n})`);
    g?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var r = `${KEY_PREFIX}#${o}#${e}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (C) {
          g?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o], ["TriggerType", e], ["VehicleType", n]) !== 1) {
            break;
          }
          var a = undefined;
          [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o], ["TriggerType", e], ["VehicleType", n]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            g?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = GongduolaPassengerVoiceConfig_1.GongduolaPassengerVoiceConfig.getRootAsGongduolaPassengerVoiceConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          C.push(a);
        }
        if (i) {
          r = `${KEY_PREFIX}#${o}#${e}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        g?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    g?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType.js.map