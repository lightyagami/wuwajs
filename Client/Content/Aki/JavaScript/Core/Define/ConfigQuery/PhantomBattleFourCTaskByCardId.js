"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleFourCTaskByCardId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleFourCTask_1 = require("../Config/PhantomBattleFourCTask"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战战斗.xlsx",
  TABLE = "PhantomBattleFourCTask",
  COMMAND = "select BinData from `PhantomBattleFourCTask` where CardId=?",
  KEY_PREFIX = "PhantomBattleFourCTaskByCardId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFourCTaskByCardId.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFourCTaskByCardId.GetConfig"),
  CONFIG_STAT_PREFIX = "configPhantomBattleFourCTaskByCardId.GetConfig(";
exports.configPhantomBattleFourCTaskByCardId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      a = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (t) {
        var C = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["CardId", o])) {
        C = void 0;
        if ([a, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CardId", o]), a) {
          const e = PhantomBattleFourCTask_1.PhantomBattleFourCTask.getRootAsPhantomBattleFourCTask(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          return t && (a = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, e)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleFourCTaskByCardId.js.map