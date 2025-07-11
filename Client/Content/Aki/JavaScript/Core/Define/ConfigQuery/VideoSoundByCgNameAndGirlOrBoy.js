"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configVideoSoundByCgNameAndGirlOrBoy = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const VideoSound_1 = require("../Config/VideoSound");
const DB = "db_cgvedio.db";
const FILE = "g.过场cg.xlsx";
const TABLE = "VideoSound";
const COMMAND = "select BinData from `VideoSound` where CgName=? AND GirlOrBoy=?";
const KEY_PREFIX = "VideoSoundByCgNameAndGirlOrBoy";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configVideoSoundByCgNameAndGirlOrBoy.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configVideoSoundByCgNameAndGirlOrBoy.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(";
exports.configVideoSoundByCgNameAndGirlOrBoy = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${i})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var C = `${KEY_PREFIX}#${o}#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (r) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["CgName", o], ["GirlOrBoy", i]) !== 1) {
            break;
          }
          var g = undefined;
          [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CgName", o], ["GirlOrBoy", i]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = VideoSound_1.VideoSound.getRootAsVideoSound(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          r.push(g);
        }
        if (n) {
          C = `${KEY_PREFIX}#${o}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(C, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=VideoSoundByCgNameAndGirlOrBoy.js.map