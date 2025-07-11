"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueRoomShowConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueRoomShowConfig_1 = require("../Config/RogueRoomShowConfig");
const DB = "db_rogue.db";
const FILE = "r.肉鸽.xlsx";
const TABLE = "RogueRoomShowConfig";
const COMMAND = "select BinData from `RogueRoomShowConfig` where BehaviorTree=?";
const KEY_PREFIX = "RogueRoomShowConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueRoomShowConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRogueRoomShowConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configRogueRoomShowConfigById.GetConfig(";
exports.configRogueRoomShowConfigById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var g = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (t) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BehaviorTree", o]) > 0) {
        g = undefined;
        [e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BehaviorTree", o]);
        if (e) {
          const t = RogueRoomShowConfig_1.RogueRoomShowConfig.getRootAsRogueRoomShowConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RogueRoomShowConfigById.js.map