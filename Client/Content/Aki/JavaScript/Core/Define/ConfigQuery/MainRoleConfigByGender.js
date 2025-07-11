"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMainRoleConfigByGender = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MainRoleConfig_1 = require("../Config/MainRoleConfig");
const DB = "db_main_role_change.db";
const FILE = "z.主角切换.xlsx";
const TABLE = "MainRoleConfig";
const COMMAND = "select BinData from `MainRoleConfig` where Gender = ?";
const KEY_PREFIX = "MainRoleConfigByGender";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMainRoleConfigByGender.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMainRoleConfigByGender.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMainRoleConfigByGender.GetConfigList(";
exports.configMainRoleConfigByGender = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Gender", o]) !== 1) {
            break;
          }
          var C = undefined;
          [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Gender", o]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = MainRoleConfig_1.MainRoleConfig.getRootAsMainRoleConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          f.push(C);
        }
        if (n) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MainRoleConfigByGender.js.map