"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSurvivorsItemByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SurvivorsItem_1 = require("../Config/SurvivorsItem");
const DB = "db_survivors.db";
const FILE = "x.幸存者_局外.xlsx";
const TABLE = "SurvivorsItem";
const COMMAND = "select BinData from `SurvivorsItem` where ActivityId=?";
const KEY_PREFIX = "SurvivorsItemByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsItemByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsItemByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSurvivorsItemByActivityId.GetConfigList(";
exports.configSurvivorsItemByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var e = `${KEY_PREFIX}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", i]) !== 1) {
            break;
          }
          var r = undefined;
          [n, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = SurvivorsItem_1.SurvivorsItem.getRootAsSurvivorsItem(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          C.push(r);
        }
        if (o) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SurvivorsItemByActivityId.js.map