"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryOutDialogByActivityIdAndType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryOutDialog_1 = require("../Config/HonamiStoryOutDialog");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语局外.xlsx";
const TABLE = "HonamiStoryOutDialog";
const COMMAND = "select BinData from `HonamiStoryOutDialog` where ActivityId=? AND Type = ?";
const KEY_PREFIX = "HonamiStoryOutDialogByActivityIdAndType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryOutDialogByActivityIdAndType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryOutDialogByActivityIdAndType.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryOutDialogByActivityIdAndType.GetConfig(";
exports.configHonamiStoryOutDialogByActivityIdAndType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var a = `${KEY_PREFIX}#${o}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (g) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", o], ["Type", i]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", o], ["Type", i]);
        if (e) {
          const g = HonamiStoryOutDialog_1.HonamiStoryOutDialog.getRootAsHonamiStoryOutDialog(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${o}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryOutDialogByActivityIdAndType.js.map