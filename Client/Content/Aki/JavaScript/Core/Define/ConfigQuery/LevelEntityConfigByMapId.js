"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configLevelEntityConfigByMapId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LevelEntityConfig_1 = require("../Config/LevelEntityConfig"),
  DB = "db_level_entity.db",
  FILE = "UniverseEditor/Entity/LevelEntity.csv",
  TABLE = "LevelEntityConfig",
  COMMAND = "select BinData from `LevelEntityConfig` where MapId=?",
  KEY_PREFIX = "LevelEntityConfigByMapId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByMapId.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByMapId.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configLevelEntityConfigByMapId.GetConfigList(";
exports.configLevelEntityConfigByMapId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${n})`),
      t = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var e = KEY_PREFIX + `#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) return i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), f
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair)) {
        const f = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["MapId", n])) break;
          var C = void 0;
          if ([t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", n]), !t) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          C = LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          f.push(C)
        }
        return o && (e = KEY_PREFIX + `#${n})`, ConfigCommon_1.ConfigCommon.SaveConfig(e, f, f.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), f
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=LevelEntityConfigByMapId.js.map