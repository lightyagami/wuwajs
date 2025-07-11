"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTravelPhantomQuestByMapMarkId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TravelPhantomQuest_1 = require("../Config/TravelPhantomQuest");
const DB = "db_activitymaptravel.db";
const FILE = "d.地图主题活动.xlsx";
const TABLE = "TravelPhantomQuest";
const COMMAND = "select BinData from `TravelPhantomQuest` where MapMarkId=?";
const KEY_PREFIX = "TravelPhantomQuestByMapMarkId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTravelPhantomQuestByMapMarkId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTravelPhantomQuestByMapMarkId.GetConfig");
const CONFIG_STAT_PREFIX = "configTravelPhantomQuestByMapMarkId.GetConfig(";
exports.configTravelPhantomQuestByMapMarkId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (t) {
        var e = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MapMarkId", o]) > 0) {
        e = undefined;
        [a, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapMarkId", o]);
        if (a) {
          const i = TravelPhantomQuest_1.TravelPhantomQuest.getRootAsTravelPhantomQuest(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            a = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TravelPhantomQuestByMapMarkId.js.map