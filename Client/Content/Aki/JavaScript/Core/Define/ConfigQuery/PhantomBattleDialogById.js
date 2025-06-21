"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleDialogById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleDialog_1 = require("../Config/PhantomBattleDialog"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战外围.xlsx",
  TABLE = "PhantomBattleDialog",
  COMMAND = "select BinData from `PhantomBattleDialog` where Id=?",
  KEY_PREFIX = "PhantomBattleDialogById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleDialogById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleDialogById.GetConfig"),
  CONFIG_STAT_PREFIX = "configPhantomBattleDialogById.GetConfig(";
exports.configPhantomBattleDialogById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      i = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var a = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", o])) {
        a = void 0;
        if ([i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]), i) {
          const e = PhantomBattleDialog_1.PhantomBattleDialog.getRootAsPhantomBattleDialog(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          return t && (i = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(i, e)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleDialogById.js.map