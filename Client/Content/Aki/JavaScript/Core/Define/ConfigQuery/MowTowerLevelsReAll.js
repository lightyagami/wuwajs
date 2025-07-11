"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMowTowerLevelsReAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MowTowerLevelsRe_1 = require("../Config/MowTowerLevelsRe");
const DB = "db_activity.db";
const FILE = "g.割草爬塔活动.xlsx";
const TABLE = "MowTowerLevelsRe";
const COMMAND = "select BinData from `MowTowerLevelsRe`";
const KEY_PREFIX = "MowTowerLevelsReAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMowTowerLevelsReAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMowTowerLevelsReAll.GetConfigList");
exports.configMowTowerLevelsReAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var e;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var t = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      const i = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [e, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!e) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = MowTowerLevelsRe_1.MowTowerLevelsRe.getRootAsMowTowerLevelsRe(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        i.push(n);
      }
      if (o) {
        t = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(t, i, i.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return i;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MowTowerLevelsReAll.js.map