"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressRecommendByType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressRecommend_1 = require("../Config/RegressRecommend");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressRecommend";
const COMMAND = "select BinData from `RegressRecommend` where Type=?";
const KEY_PREFIX = "RegressRecommendByType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressRecommendByType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRegressRecommendByType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRegressRecommendByType.GetConfigList(";
exports.configRegressRecommendByType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var t = `${KEY_PREFIX}#${e})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Type", e]) !== 1) {
            break;
          }
          var m = undefined;
          [i, m] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Type", e]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          m = RegressRecommend_1.RegressRecommend.getRootAsRegressRecommend(new byte_buffer_1.ByteBuffer(new Uint8Array(m.buffer)));
          g.push(m);
        }
        if (o) {
          t = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RegressRecommendByType.js.map