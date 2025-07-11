"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSignalDecodeGamePlayById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SignalDecodeGamePlay_1 = require("../Config/SignalDecodeGamePlay");
const DB = "db_signaldecodegameplay.db";
const FILE = "k.可视化编辑/c.Csv/x.信号破译玩法配置/*.csv*";
const TABLE = "SignalDecodeGamePlay";
const COMMAND = "select BinData from `SignalDecodeGamePlay` where Id=?";
const KEY_PREFIX = "SignalDecodeGamePlayById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSignalDecodeGamePlayById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSignalDecodeGamePlayById.GetConfig");
const CONFIG_STAT_PREFIX = "configSignalDecodeGamePlayById.GetConfig(";
exports.configSignalDecodeGamePlayById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var a = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        a = undefined;
        [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (i) {
          const t = SignalDecodeGamePlay_1.SignalDecodeGamePlay.getRootAsSignalDecodeGamePlay(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SignalDecodeGamePlayById.js.map