"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSurvivorsTalentTreeByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SurvivorsTalentTree_1 = require("../Config/SurvivorsTalentTree");
const DB = "db_survivors.db";
const FILE = "x.幸存者_局外.xlsx";
const TABLE = "SurvivorsTalentTree";
const COMMAND = "select BinData from `SurvivorsTalentTree` where ActivityId=?";
const KEY_PREFIX = "SurvivorsTalentTreeByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsTalentTreeByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsTalentTreeByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSurvivorsTalentTreeByActivityId.GetConfigList(";
exports.configSurvivorsTalentTreeByActivityId = {
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
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const a = new Array();
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
          r = SurvivorsTalentTree_1.SurvivorsTalentTree.getRootAsSurvivorsTalentTree(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          a.push(r);
        }
        if (o) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SurvivorsTalentTreeByActivityId.js.map