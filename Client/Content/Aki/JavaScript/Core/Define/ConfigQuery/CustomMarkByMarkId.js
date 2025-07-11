"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCustomMarkByMarkId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CustomMark_1 = require("../Config/CustomMark");
const DB = "db_map_mark.db";
const FILE = "d.地图标记.xlsx";
const TABLE = "CustomMark";
const COMMAND = "select BinData from `CustomMark` where MarkId=?";
const KEY_PREFIX = "CustomMarkByMarkId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCustomMarkByMarkId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCustomMarkByMarkId.GetConfig");
const CONFIG_STAT_PREFIX = "configCustomMarkByMarkId.GetConfig(";
exports.configCustomMarkByMarkId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var C = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MarkId", o]) > 0) {
        C = undefined;
        [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MarkId", o]);
        if (i) {
          const a = CustomMark_1.CustomMark.getRootAsCustomMark(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
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
//# sourceMappingURL=CustomMarkByMarkId.js.map