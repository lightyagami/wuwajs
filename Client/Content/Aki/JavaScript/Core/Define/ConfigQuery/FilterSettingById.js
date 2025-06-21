"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configFilterSettingById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FilterSetting_1 = require("../Config/FilterSetting"),
  DB = "db_menu.db",
  FILE = "s.设置系统.xlsx",
  TABLE = "FilterSetting",
  COMMAND = "select BinData from `FilterSetting` where Id=?",
  KEY_PREFIX = "FilterSettingById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFilterSettingById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFilterSettingById.GetConfig"),
  CONFIG_STAT_PREFIX = "configFilterSettingById.GetConfig(";
exports.configFilterSettingById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (t, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${t})`),
      i = (o?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var e = KEY_PREFIX + `#${t})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) return o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), g
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", t])) {
        e = void 0;
        if ([i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]), i) {
          const g = FilterSetting_1.FilterSetting.getRootAsFilterSetting(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          return n && (i = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(i, g)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), g
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=FilterSettingById.js.map