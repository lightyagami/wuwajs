"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleCardGroupInfoById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleCardGroupInfo_1 = require("../Config/PhantomBattleCardGroupInfo"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战外围.xlsx",
  TABLE = "PhantomBattleCardGroupInfo",
  COMMAND = "select BinData from `PhantomBattleCardGroupInfo` where Id=?",
  KEY_PREFIX = "PhantomBattleCardGroupInfoById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleCardGroupInfoById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleCardGroupInfoById.GetConfig"),
  CONFIG_STAT_PREFIX = "configPhantomBattleCardGroupInfoById.GetConfig(";
exports.configPhantomBattleCardGroupInfoById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      a = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (t) {
        var e = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", o])) {
        e = void 0;
        if ([a, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]), a) {
          const i = PhantomBattleCardGroupInfo_1.PhantomBattleCardGroupInfo.getRootAsPhantomBattleCardGroupInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          return t && (a = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, i)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleCardGroupInfoById.js.map