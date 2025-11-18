"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAdvertisingTabStoryById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AdvertisingTabStory_1 = require("../Config/AdvertisingTabStory");
const DB = "db_advertisingpage.db";
const FILE = "x.下一版本核心内容展示.xlsx";
const TABLE = "AdvertisingTabStory";
const COMMAND = "select BinData from `AdvertisingTabStory` where Id=?";
const KEY_PREFIX = "AdvertisingTabStoryById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabStoryById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAdvertisingTabStoryById.GetConfig");
const CONFIG_STAT_PREFIX = "configAdvertisingTabStoryById.GetConfig(";
exports.configAdvertisingTabStoryById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var e = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const r = AdvertisingTabStory_1.AdvertisingTabStory.getRootAsAdvertisingTabStory(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AdvertisingTabStoryById.js.map