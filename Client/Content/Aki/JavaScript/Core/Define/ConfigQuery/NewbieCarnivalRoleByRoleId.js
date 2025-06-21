"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configNewbieCarnivalRoleByRoleId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  NewbieCarnivalRole_1 = require("../Config/NewbieCarnivalRole"),
  DB = "db_newbiecarnival.db",
  FILE = "x.新手嘉年华.xlsx",
  TABLE = "NewbieCarnivalRole",
  COMMAND = "select BinData from `NewbieCarnivalRole` where RoleId=?",
  KEY_PREFIX = "NewbieCarnivalRoleByRoleId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalRoleByRoleId.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalRoleByRoleId.GetConfig"),
  CONFIG_STAT_PREFIX = "configNewbieCarnivalRoleByRoleId.GetConfig(";
exports.configNewbieCarnivalRoleByRoleId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      i = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var t = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["RoleId", o])) {
        t = void 0;
        if ([i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o]), i) {
          const a = NewbieCarnivalRole_1.NewbieCarnivalRole.getRootAsNewbieCarnivalRole(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          return e && (i = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(i, a)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=NewbieCarnivalRoleByRoleId.js.map