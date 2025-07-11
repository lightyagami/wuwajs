"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFishingTagById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FishingTag_1 = require("../Config/FishingTag");
const DB = "db_fishing.db";
const FILE = "b.捕鱼相关.xlsx";
const TABLE = "FishingTag";
const COMMAND = "select BinData from `FishingTag` where Id=?";
const KEY_PREFIX = "FishingTagById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFishingTagById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFishingTagById.GetConfig");
const CONFIG_STAT_PREFIX = "configFishingTagById.GetConfig(";
exports.configFishingTagById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var g = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (g) {
      if (n) {
        var t = `${KEY_PREFIX}#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (g = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        t = undefined;
        [g, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (g) {
          const e = FishingTag_1.FishingTag.getRootAsFishingTag(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            g = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(g, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FishingTagById.js.map