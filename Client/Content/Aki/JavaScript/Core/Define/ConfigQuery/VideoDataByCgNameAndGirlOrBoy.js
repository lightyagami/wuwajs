"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configVideoDataByCgNameAndGirlOrBoy = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const VideoData_1 = require("../Config/VideoData");
const DB = "db_cgvedio.db";
const FILE = "g.过场cg.xlsx";
const TABLE = "VideoData";
const COMMAND = "select BinData from `VideoData` where CgName=? AND GirlOrBoy=?";
const KEY_PREFIX = "VideoDataByCgNameAndGirlOrBoy";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configVideoDataByCgNameAndGirlOrBoy.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configVideoDataByCgNameAndGirlOrBoy.GetConfig");
const CONFIG_STAT_PREFIX = "configVideoDataByCgNameAndGirlOrBoy.GetConfig(";
exports.configVideoDataByCgNameAndGirlOrBoy = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var a = `${KEY_PREFIX}#${o}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["CgName", o], ["GirlOrBoy", i]) > 0) {
        a = undefined;
        [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CgName", o], ["GirlOrBoy", i]);
        if (t) {
          const C = VideoData_1.VideoData.getRootAsVideoData(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=VideoDataByCgNameAndGirlOrBoy.js.map