"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTeleportInterceptByEntityConfigId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TeleportIntercept_1 = require("../Config/TeleportIntercept");
const DB = "db_download.db";
const FILE = "b.包体管理.xlsx";
const TABLE = "TeleportIntercept";
const COMMAND = "select BinData from `TeleportIntercept` where EntityConfigId = ?";
const KEY_PREFIX = "TeleportInterceptByEntityConfigId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTeleportInterceptByEntityConfigId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configTeleportInterceptByEntityConfigId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configTeleportInterceptByEntityConfigId.GetConfigList(";
exports.configTeleportInterceptByEntityConfigId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var i = `${KEY_PREFIX}#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["EntityConfigId", t]) !== 1) {
            break;
          }
          var r = undefined;
          [e, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EntityConfigId", t]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = TeleportIntercept_1.TeleportIntercept.getRootAsTeleportIntercept(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          C.push(r);
        }
        if (o) {
          i = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TeleportInterceptByEntityConfigId.js.map