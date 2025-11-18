"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDownLoadSubPackageAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DownLoadSubPackage_1 = require("../Config/DownLoadSubPackage");
const DB = "db_download.db";
const FILE = "b.包体管理.xlsx";
const TABLE = "DownLoadSubPackage";
const COMMAND = "select BinData from `DownLoadSubPackage`";
const KEY_PREFIX = "DownLoadSubPackageAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDownLoadSubPackageAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configDownLoadSubPackageAll.GetConfigList");
exports.configDownLoadSubPackageAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var t = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      const a = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        i = DownLoadSubPackage_1.DownLoadSubPackage.getRootAsDownLoadSubPackage(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        a.push(i);
      }
      if (o) {
        t = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DownLoadSubPackageAll.js.map