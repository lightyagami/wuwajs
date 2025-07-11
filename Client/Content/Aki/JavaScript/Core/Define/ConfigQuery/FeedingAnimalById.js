"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFeedingAnimalById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FeedingAnimal_1 = require("../Config/FeedingAnimal");
const DB = "db_feedinganimal.db";
const FILE = "t.投喂动物.xlsx";
const TABLE = "FeedingAnimal";
const COMMAND = "select BinData from `FeedingAnimal` where Id=?";
const KEY_PREFIX = "FeedingAnimalById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFeedingAnimalById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFeedingAnimalById.GetConfig");
const CONFIG_STAT_PREFIX = "configFeedingAnimalById.GetConfig(";
exports.configFeedingAnimalById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var t = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (e) {
          const g = FeedingAnimal_1.FeedingAnimal.getRootAsFeedingAnimal(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            e = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FeedingAnimalById.js.map