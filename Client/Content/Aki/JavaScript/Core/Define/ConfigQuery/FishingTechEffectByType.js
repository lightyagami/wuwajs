"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFishingTechEffectByType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FishingTechEffect_1 = require("../Config/FishingTechEffect");
const DB = "db_fishing.db";
const FILE = "b.捕鱼船坞.xlsx";
const TABLE = "FishingTechEffect";
const COMMAND = "select BinData from `FishingTechEffect` where Type=?";
const KEY_PREFIX = "FishingTechEffectByType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFishingTechEffectByType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFishingTechEffectByType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configFishingTechEffectByType.GetConfigList(";
exports.configFishingTechEffectByType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var e = `${KEY_PREFIX}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Type", i]) !== 1) {
            break;
          }
          var f = undefined;
          [t, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Type", i]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          f = FishingTechEffect_1.FishingTechEffect.getRootAsFishingTechEffect(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          g.push(f);
        }
        if (o) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FishingTechEffectByType.js.map