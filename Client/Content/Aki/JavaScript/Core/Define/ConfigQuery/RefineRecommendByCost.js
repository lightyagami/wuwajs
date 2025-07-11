"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRefineRecommendByCost = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RefineRecommend_1 = require("../Config/RefineRecommend");
const DB = "db_visionrecommend.db";
const FILE = "h.幻象推荐.xlsx";
const TABLE = "RefineRecommend";
const COMMAND = "select BinData from `RefineRecommend` where Cost=?";
const KEY_PREFIX = "RefineRecommendByCost";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRefineRecommendByCost.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRefineRecommendByCost.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRefineRecommendByCost.GetConfigList(";
exports.configRefineRecommendByCost = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Cost", o]) !== 1) {
            break;
          }
          var m = undefined;
          [i, m] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Cost", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          m = RefineRecommend_1.RefineRecommend.getRootAsRefineRecommend(new byte_buffer_1.ByteBuffer(new Uint8Array(m.buffer)));
          C.push(m);
        }
        if (n) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RefineRecommendByCost.js.map