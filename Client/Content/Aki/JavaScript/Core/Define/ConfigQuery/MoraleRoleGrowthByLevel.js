"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configMoraleRoleGrowthByLevel = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MoraleRoleGrowth_1 = require("../Config/MoraleRoleGrowth"),
  DB = "db_moraleplay.db",
  FILE = "c.插旗玩法.xlsx",
  TABLE = "MoraleRoleGrowth",
  COMMAND = "select BinData from `MoraleRoleGrowth` where Level=?",
  KEY_PREFIX = "MoraleRoleGrowthByLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleRoleGrowthByLevel.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleRoleGrowthByLevel.GetConfig"),
  CONFIG_STAT_PREFIX = "configMoraleRoleGrowthByLevel.GetConfig(";
exports.configMoraleRoleGrowthByLevel = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      t = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (e) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), r
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Level", o])) {
        i = void 0;
        if ([t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", o]), t) {
          const r = MoraleRoleGrowth_1.MoraleRoleGrowth.getRootAsMoraleRoleGrowth(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          return e && (t = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(t, r)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), r
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=MoraleRoleGrowthByLevel.js.map