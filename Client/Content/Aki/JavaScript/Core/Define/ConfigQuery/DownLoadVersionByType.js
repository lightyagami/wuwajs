"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDownLoadVersionByType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DownLoadVersion_1 = require("../Config/DownLoadVersion");
const DB = "db_download.db";
const FILE = "b.包体管理.xlsx";
const TABLE = "DownLoadVersion";
const COMMAND = "select BinData from `DownLoadVersion` where Type=?";
const KEY_PREFIX = "DownLoadVersionByType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDownLoadVersionByType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configDownLoadVersionByType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configDownLoadVersionByType.GetConfigList(";
exports.configDownLoadVersionByType = {
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
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Type", o]) !== 1) {
            break;
          }
          var a = undefined;
          [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Type", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = DownLoadVersion_1.DownLoadVersion.getRootAsDownLoadVersion(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          C.push(a);
        }
        if (n) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DownLoadVersionByType.js.map