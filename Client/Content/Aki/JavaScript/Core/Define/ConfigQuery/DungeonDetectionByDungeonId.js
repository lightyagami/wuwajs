"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDungeonDetectionByDungeonId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DungeonDetection_1 = require("../Config/DungeonDetection");
const DB = "db_adventure_detect.db";
const FILE = "k.开拓探测.xlsx";
const TABLE = "DungeonDetection";
const COMMAND = "select BinData from `DungeonDetection` where DungeonId=?";
const KEY_PREFIX = "DungeonDetectionByDungeonId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDungeonDetectionByDungeonId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDungeonDetectionByDungeonId.GetConfig");
const CONFIG_STAT_PREFIX = "configDungeonDetectionByDungeonId.GetConfig(";
exports.configDungeonDetectionByDungeonId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var i = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (g) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["DungeonId", n]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["DungeonId", n]);
        if (t) {
          const g = DungeonDetection_1.DungeonDetection.getRootAsDungeonDetection(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DungeonDetectionByDungeonId.js.map