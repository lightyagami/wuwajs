"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryPluginBoxItemByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryPluginBoxItem_1 = require("../Config/HonamiStoryPluginBoxItem");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语道具.xlsx";
const TABLE = "HonamiStoryPluginBoxItem";
const COMMAND = "select BinData from `HonamiStoryPluginBoxItem` where ActivityId=?";
const KEY_PREFIX = "HonamiStoryPluginBoxItemByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryPluginBoxItemByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryPluginBoxItemByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryPluginBoxItemByActivityId.GetConfigList(";
exports.configHonamiStoryPluginBoxItemByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var e = `${KEY_PREFIX}#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", o]) !== 1) {
            break;
          }
          var m = undefined;
          [n, m] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          m = HonamiStoryPluginBoxItem_1.HonamiStoryPluginBoxItem.getRootAsHonamiStoryPluginBoxItem(new byte_buffer_1.ByteBuffer(new Uint8Array(m.buffer)));
          g.push(m);
        }
        if (i) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryPluginBoxItemByActivityId.js.map