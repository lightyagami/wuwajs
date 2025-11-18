"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryPropById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryProp_1 = require("../Config/HonamiStoryProp");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语道具.xlsx";
const TABLE = "HonamiStoryProp";
const COMMAND = "select BinData from `HonamiStoryProp` where Id=?";
const KEY_PREFIX = "HonamiStoryPropById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryPropById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryPropById.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryPropById.GetConfig(";
exports.configHonamiStoryPropById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var r = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (e) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        r = undefined;
        [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const e = HonamiStoryProp_1.HonamiStoryProp.getRootAsHonamiStoryProp(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryPropById.js.map