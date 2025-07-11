"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMobileBattleUiSetByPanelIndex = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MobileBattleUiSet_1 = require("../Config/MobileBattleUiSet");
const DB = "db_mobile_battle_ui_set.db";
const FILE = "y.移动端主界面键位配置.xlsx";
const TABLE = "MobileBattleUiSet";
const COMMAND = "select BinData from `MobileBattleUiSet` where PanelIndex=?";
const KEY_PREFIX = "MobileBattleUiSetByPanelIndex";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMobileBattleUiSetByPanelIndex.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMobileBattleUiSetByPanelIndex.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMobileBattleUiSetByPanelIndex.GetConfigList(";
exports.configMobileBattleUiSetByPanelIndex = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    o?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var n = `${KEY_PREFIX}#${t})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (l) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const l = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PanelIndex", t]) !== 1) {
            break;
          }
          var a = undefined;
          [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PanelIndex", t]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = MobileBattleUiSet_1.MobileBattleUiSet.getRootAsMobileBattleUiSet(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          l.push(a);
        }
        if (e) {
          n = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, l, l.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return l;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MobileBattleUiSetByPanelIndex.js.map