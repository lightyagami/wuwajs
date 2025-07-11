"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomBattleMasterTitleAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomBattleMasterTitle_1 = require("../Config/PhantomBattleMasterTitle");
const DB = "db_phantombattle.db";
const FILE = "s.声骸大作战外围.xlsx";
const TABLE = "PhantomBattleMasterTitle";
const COMMAND = "select BinData from `PhantomBattleMasterTitle`";
const KEY_PREFIX = "PhantomBattleMasterTitleAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleMasterTitleAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleMasterTitleAll.GetConfigList");
exports.configPhantomBattleMasterTitleAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t = true) => {
    var o;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (t) {
        var n = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      const i = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!o) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        e = PhantomBattleMasterTitle_1.PhantomBattleMasterTitle.getRootAsPhantomBattleMasterTitle(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
        i.push(e);
      }
      if (t) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, i, i.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return i;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomBattleMasterTitleAll.js.map