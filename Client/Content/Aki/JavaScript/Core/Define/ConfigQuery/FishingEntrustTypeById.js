"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFishingEntrustTypeById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FishingEntrustType_1 = require("../Config/FishingEntrustType");
const DB = "db_fishing.db";
const FILE = "b.捕鱼委托.xlsx";
const TABLE = "FishingEntrustType";
const COMMAND = "select BinData from `FishingEntrustType` where Id=?";
const KEY_PREFIX = "FishingEntrustTypeById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFishingEntrustTypeById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFishingEntrustTypeById.GetConfig");
const CONFIG_STAT_PREFIX = "configFishingEntrustTypeById.GetConfig(";
exports.configFishingEntrustTypeById = {
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
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var e = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (t) {
          const g = FishingEntrustType_1.FishingEntrustType.getRootAsFishingEntrustType(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, g);
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
//# sourceMappingURL=FishingEntrustTypeById.js.map