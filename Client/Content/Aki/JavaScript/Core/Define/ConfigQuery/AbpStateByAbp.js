"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configAbpStateByAbp = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AbpState_1 = require("../Config/AbpState"),
  DB = "db_abpstate.db",
  FILE = "k.可视化编辑/c.Csv/a.ABP状态定义/*.csv*",
  TABLE = "AbpState",
  COMMAND = "select BinData from `AbpState` where Abp=?",
  KEY_PREFIX = "AbpStateByAbp",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAbpStateByAbp.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAbpStateByAbp.GetConfig"),
  CONFIG_STAT_PREFIX = "configAbpStateByAbp.GetConfig(";
exports.configAbpStateByAbp = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${t})`),
      e = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var i = KEY_PREFIX + `#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
      }
      if (e = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, t, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Abp", t])) {
        i = void 0;
        if ([e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Abp", t]), e) {
          const a = AbpState_1.AbpState.getRootAsAbpState(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          return o && (e = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(e, a)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=AbpStateByAbp.js.map