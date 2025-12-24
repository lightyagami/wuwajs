"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressRecommendByActivityGroup = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressRecommend_1 = require("../Config/RegressRecommend");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressRecommend";
const COMMAND = "select BinData from `RegressRecommend` where ActivityGroup=?";
const KEY_PREFIX = "RegressRecommendByActivityGroup";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressRecommendByActivityGroup.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRegressRecommendByActivityGroup.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRegressRecommendByActivityGroup.GetConfigList(";
exports.configRegressRecommendByActivityGroup = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var n = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (m) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityGroup", o]) !== 1) {
            break;
          }
          var r = undefined;
          [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityGroup", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = RegressRecommend_1.RegressRecommend.getRootAsRegressRecommend(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          m.push(r);
        }
        if (e) {
          n = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RegressRecommendByActivityGroup.js.map