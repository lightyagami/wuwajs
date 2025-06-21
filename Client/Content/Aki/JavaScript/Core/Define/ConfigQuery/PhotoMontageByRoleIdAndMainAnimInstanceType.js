"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhotoMontageByRoleIdAndMainAnimInstanceType = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhotoMontage_1 = require("../Config/PhotoMontage"),
  DB = "db_photograph.db",
  FILE = "p.拍照.xlsx",
  TABLE = "PhotoMontage",
  COMMAND = "select BinData from `PhotoMontage` where RoleId=? And MainAnimInstanceType=?",
  KEY_PREFIX = "PhotoMontageByRoleIdAndMainAnimInstanceType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoMontageByRoleIdAndMainAnimInstanceType.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoMontageByRoleIdAndMainAnimInstanceType.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configPhotoMontageByRoleIdAndMainAnimInstanceType.GetConfigList(";
exports.configPhotoMontageByRoleIdAndMainAnimInstanceType = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (o, n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o}#${n})`),
      e = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (t) {
        var a = KEY_PREFIX + `#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) return i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const C = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["RoleId", o], ["MainAnimInstanceType", n])) break;
          var g = void 0;
          if ([e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o], ["MainAnimInstanceType", n]), !e) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          g = PhotoMontage_1.PhotoMontage.getRootAsPhotoMontage(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          C.push(g)
        }
        return t && (a = KEY_PREFIX + `#${o}#${n})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhotoMontageByRoleIdAndMainAnimInstanceType.js.map