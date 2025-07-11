"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMobileBattleUiSetAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MobileBattleUiSet_1 = require("../Config/MobileBattleUiSet");
const DB = "db_mobile_battle_ui_set.db";
const FILE = "y.移动端主界面键位配置.xlsx";
const TABLE = "MobileBattleUiSet";
const COMMAND = "select BinData from `MobileBattleUiSet`";
const KEY_PREFIX = "MobileBattleUiSetAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMobileBattleUiSetAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMobileBattleUiSetAll.GetConfigList");
exports.configMobileBattleUiSetAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t = true) => {
    var o;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (t) {
        var i = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (n) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return n;
        }
      }
      const n = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!o) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        e = MobileBattleUiSet_1.MobileBattleUiSet.getRootAsMobileBattleUiSet(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
        n.push(e);
      }
      if (t) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, n, n.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return n;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MobileBattleUiSetAll.js.map