"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSubtitleTextByRowNameAndDatatableName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SubtitleText_1 = require("../Config/SubtitleText");
const DB = "db_subtitle_text.db";
const FILE = "k.可视化编辑/j.剧情/字幕*";
const TABLE = "SubtitleText";
const COMMAND = "select BinData from `SubtitleText` where RowName = ? AND DatatableName = ?";
const KEY_PREFIX = "SubtitleTextByRowNameAndDatatableName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSubtitleTextByRowNameAndDatatableName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSubtitleTextByRowNameAndDatatableName.GetConfig");
const CONFIG_STAT_PREFIX = "configSubtitleTextByRowNameAndDatatableName.GetConfig(";
exports.configSubtitleTextByRowNameAndDatatableName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t}#${e})`);
    n?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (o) {
        var i = `${KEY_PREFIX}#${t}#${e})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (m) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["RowName", t], ["DatatableName", e]) > 0) {
        i = undefined;
        [a, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RowName", t], ["DatatableName", e]);
        if (a) {
          const m = SubtitleText_1.SubtitleText.getRootAsSubtitleText(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            a = `${KEY_PREFIX}#${t}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SubtitleTextByRowNameAndDatatableName.js.map