"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInstanceDungeonEntranceByMarkId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InstanceDungeonEntrance_1 = require("../Config/InstanceDungeonEntrance");
const DB = "db_instance_dungeon.db";
const FILE = "f.副本.xlsx";
const TABLE = "InstanceDungeonEntrance";
const COMMAND = "select BinData from `InstanceDungeonEntrance` where MarkId=?";
const KEY_PREFIX = "InstanceDungeonEntranceByMarkId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInstanceDungeonEntranceByMarkId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInstanceDungeonEntranceByMarkId.GetConfig");
const CONFIG_STAT_PREFIX = "configInstanceDungeonEntranceByMarkId.GetConfig(";
exports.configInstanceDungeonEntranceByMarkId = {
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
        var a = `${KEY_PREFIX}#${n})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MarkId", n]) > 0) {
        a = undefined;
        [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MarkId", n]);
        if (t) {
          const i = InstanceDungeonEntrance_1.InstanceDungeonEntrance.getRootAsInstanceDungeonEntrance(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InstanceDungeonEntranceByMarkId.js.map