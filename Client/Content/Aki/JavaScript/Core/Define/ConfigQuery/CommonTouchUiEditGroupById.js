"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCommonTouchUiEditGroupById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CommonTouchUiEditGroup_1 = require("../Config/CommonTouchUiEditGroup");
const DB = "db_commontouchuiedit.db";
const FILE = "y.移动端活动玩法主界面键位配置.xlsx";
const TABLE = "CommonTouchUiEditGroup";
const COMMAND = "select BinData from `CommonTouchUiEditGroup` where Id=?";
const KEY_PREFIX = "CommonTouchUiEditGroupById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCommonTouchUiEditGroupById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCommonTouchUiEditGroupById.GetConfig");
const CONFIG_STAT_PREFIX = "configCommonTouchUiEditGroupById.GetConfig(";
exports.configCommonTouchUiEditGroupById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var C = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (m) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        C = undefined;
        [t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const m = CommonTouchUiEditGroup_1.CommonTouchUiEditGroup.getRootAsCommonTouchUiEditGroup(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, m);
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
//# sourceMappingURL=CommonTouchUiEditGroupById.js.map