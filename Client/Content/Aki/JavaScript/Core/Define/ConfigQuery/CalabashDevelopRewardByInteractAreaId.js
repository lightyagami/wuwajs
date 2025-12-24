"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCalabashDevelopRewardByInteractAreaId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CalabashDevelopReward_1 = require("../Config/CalabashDevelopReward");
const DB = "db_calabash.db";
const FILE = "h.葫芦.xlsx";
const TABLE = "CalabashDevelopReward";
const COMMAND = "select BinData from `CalabashDevelopReward` where InteractAreaId=?";
const KEY_PREFIX = "CalabashDevelopRewardByInteractAreaId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashDevelopRewardByInteractAreaId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashDevelopRewardByInteractAreaId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configCalabashDevelopRewardByInteractAreaId.GetConfigList(";
exports.configCalabashDevelopRewardByInteractAreaId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    a?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var n = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) {
          a?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["InteractAreaId", o]) !== 1) {
            break;
          }
          var i = undefined;
          [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InteractAreaId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            a?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          i = CalabashDevelopReward_1.CalabashDevelopReward.getRootAsCalabashDevelopReward(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          r.push(i);
        }
        if (e) {
          n = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        a?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CalabashDevelopRewardByInteractAreaId.js.map