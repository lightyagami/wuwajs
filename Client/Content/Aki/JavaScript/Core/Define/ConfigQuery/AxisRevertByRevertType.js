"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAxisRevertByRevertType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AxisRevert_1 = require("../Config/AxisRevert");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "AxisRevert";
const COMMAND = "select BinData from `AxisRevert` where RevertType=?";
const KEY_PREFIX = "AxisRevertByRevertType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAxisRevertByRevertType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configAxisRevertByRevertType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configAxisRevertByRevertType.GetConfigList(";
exports.configAxisRevertByRevertType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var n = `${KEY_PREFIX}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RevertType", e]) !== 1) {
            break;
          }
          var r = undefined;
          [i, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RevertType", e]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = AxisRevert_1.AxisRevert.getRootAsAxisRevert(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          C.push(r);
        }
        if (o) {
          n = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AxisRevertByRevertType.js.map