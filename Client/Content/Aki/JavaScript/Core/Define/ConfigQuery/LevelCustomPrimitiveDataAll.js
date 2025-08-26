"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelCustomPrimitiveDataAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelCustomPrimitiveData_1 = require("../Config/LevelCustomPrimitiveData");
const DB = "db_levelcustomprimitivedata.db";
const FILE = "UniverseEditor/LevelPlay/CustomPrimitiveData_*";
const TABLE = "LevelCustomPrimitiveData";
const COMMAND = "select BinData from `LevelCustomPrimitiveData`";
const KEY_PREFIX = "LevelCustomPrimitiveDataAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelCustomPrimitiveDataAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configLevelCustomPrimitiveDataAll.GetConfigList");
exports.configLevelCustomPrimitiveDataAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (t) {
        var o = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (n) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return n;
        }
      }
      const n = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        e = LevelCustomPrimitiveData_1.LevelCustomPrimitiveData.getRootAsLevelCustomPrimitiveData(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
        n.push(e);
      }
      if (t) {
        o = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(o, n, n.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return n;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelCustomPrimitiveDataAll.js.map