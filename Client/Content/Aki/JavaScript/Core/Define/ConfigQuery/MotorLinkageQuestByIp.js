"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorLinkageQuestByIp = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorLinkageQuest_1 = require("../Config/MotorLinkageQuest");
const DB = "db_motorlinkage.db";
const FILE = "m.摩托车IP联动活动.xlsx";
const TABLE = "MotorLinkageQuest";
const COMMAND = "select BinData from `MotorLinkageQuest` where Ip=?";
const KEY_PREFIX = "MotorLinkageQuestByIp";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorLinkageQuestByIp.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMotorLinkageQuestByIp.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMotorLinkageQuestByIp.GetConfigList(";
exports.configMotorLinkageQuestByIp = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (t) {
        var e = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Ip", o]) !== 1) {
            break;
          }
          var g = undefined;
          [i, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Ip", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = MotorLinkageQuest_1.MotorLinkageQuest.getRootAsMotorLinkageQuest(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          a.push(g);
        }
        if (t) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorLinkageQuestByIp.js.map