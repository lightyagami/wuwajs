"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryTalentByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryTalent_1 = require("../Config/HonamiStoryTalent");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语局外.xlsx";
const TABLE = "HonamiStoryTalent";
const COMMAND = "select BinData from `HonamiStoryTalent` where ActivityId=?";
const KEY_PREFIX = "HonamiStoryTalentByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryTalentByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryTalentByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryTalentByActivityId.GetConfigList(";
exports.configHonamiStoryTalentByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var e = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", o]) !== 1) {
            break;
          }
          var a = undefined;
          [n, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = HonamiStoryTalent_1.HonamiStoryTalent.getRootAsHonamiStoryTalent(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          r.push(a);
        }
        if (t) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryTalentByActivityId.js.map