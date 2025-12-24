"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTrialRoleInfoByType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TrialRoleInfo_1 = require("../Config/TrialRoleInfo");
const DB = "db_trial_role.db";
const FILE = "s.试用角色.xlsx";
const TABLE = "TrialRoleInfo";
const COMMAND = "select BinData from `TrialRoleInfo` where Type = ?";
const KEY_PREFIX = "TrialRoleInfoByType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTrialRoleInfoByType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configTrialRoleInfoByType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configTrialRoleInfoByType.GetConfigList(";
exports.configTrialRoleInfoByType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Type", o]) !== 1) {
            break;
          }
          var f = undefined;
          [t, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Type", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          f = TrialRoleInfo_1.TrialRoleInfo.getRootAsTrialRoleInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          a.push(f);
        }
        if (n) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
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
//# sourceMappingURL=TrialRoleInfoByType.js.map