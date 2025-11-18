"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryLifeSupportByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryLifeSupport_1 = require("../Config/HonamiStoryLifeSupport");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语装备栏.xlsx";
const TABLE = "HonamiStoryLifeSupport";
const COMMAND = "select BinData from `HonamiStoryLifeSupport` where ActivityId=?";
const KEY_PREFIX = "HonamiStoryLifeSupportByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLifeSupportByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLifeSupportByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryLifeSupportByActivityId.GetConfigList(";
exports.configHonamiStoryLifeSupportByActivityId = {
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
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", o]) !== 1) {
            break;
          }
          var r = undefined;
          [n, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = HonamiStoryLifeSupport_1.HonamiStoryLifeSupport.getRootAsHonamiStoryLifeSupport(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          f.push(r);
        }
        if (i) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryLifeSupportByActivityId.js.map