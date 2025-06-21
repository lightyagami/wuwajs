"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configRoleMorphByRoleId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleMorph_1 = require("../Config/RoleMorph"),
  DB = "db_role.db",
  FILE = "j.角色.xlsx",
  TABLE = "RoleMorph",
  COMMAND = "select BinData from `RoleMorph` where RoleId=?",
  KEY_PREFIX = "RoleMorphByRoleId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleMorphByRoleId.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRoleMorphByRoleId.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configRoleMorphByRoleId.GetConfigList(";
exports.configRoleMorphByRoleId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      e = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) return i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["RoleId", o])) break;
          var r = void 0;
          if ([e, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o]), !e) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          r = RoleMorph_1.RoleMorph.getRootAsRoleMorph(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          C.push(r)
        }
        return n && (t = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=RoleMorphByRoleId.js.map