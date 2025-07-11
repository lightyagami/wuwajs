"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBlackCoastThemeTaskReByStageId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BlackCoastThemeTaskRe_1 = require("../Config/BlackCoastThemeTaskRe");
const DB = "db_activity.db";
const FILE = "h.黑海岸主题活动.xlsx";
const TABLE = "BlackCoastThemeTaskRe";
const COMMAND = "select BinData from `BlackCoastThemeTaskRe` where StageId=?";
const KEY_PREFIX = "BlackCoastThemeTaskReByStageId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBlackCoastThemeTaskReByStageId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configBlackCoastThemeTaskReByStageId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configBlackCoastThemeTaskReByStageId.GetConfigList(";
exports.configBlackCoastThemeTaskReByStageId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    e?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (t) {
        var n = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["StageId", o]) !== 1) {
            break;
          }
          var i = undefined;
          [a, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["StageId", o]);
          if (!a) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          i = BlackCoastThemeTaskRe_1.BlackCoastThemeTaskRe.getRootAsBlackCoastThemeTaskRe(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          C.push(i);
        }
        if (t) {
          n = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BlackCoastThemeTaskReByStageId.js.map