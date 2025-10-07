"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMusicBeatTypeByBeatType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MusicBeatType_1 = require("../Config/MusicBeatType");
const DB = "db_musicbeattype.db";
const FILE = "k.可视化编辑/c.Csv/y.音乐节拍配置/*.csv*";
const TABLE = "MusicBeatType";
const COMMAND = "select BinData from `MusicBeatType` where BeatType=?";
const KEY_PREFIX = "MusicBeatTypeByBeatType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMusicBeatTypeByBeatType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMusicBeatTypeByBeatType.GetConfig");
const CONFIG_STAT_PREFIX = "configMusicBeatTypeByBeatType.GetConfig(";
exports.configMusicBeatTypeByBeatType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var n = `${KEY_PREFIX}#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BeatType", e]) > 0) {
        n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BeatType", e]);
        if (i) {
          const a = MusicBeatType_1.MusicBeatType.getRootAsMusicBeatType(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MusicBeatTypeByBeatType.js.map