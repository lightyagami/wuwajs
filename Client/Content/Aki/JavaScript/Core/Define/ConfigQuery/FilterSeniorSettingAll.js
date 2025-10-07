"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFilterSeniorSettingAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FilterSeniorSetting_1 = require("../Config/FilterSeniorSetting");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "FilterSeniorSetting";
const COMMAND = "select BinData from `FilterSeniorSetting`";
const KEY_PREFIX = "FilterSeniorSettingAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFilterSeniorSettingAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFilterSeniorSettingAll.GetConfigList");
exports.configFilterSeniorSettingAll = {
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
        var n = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (e) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      const e = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var o = undefined;
        [i, o] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        o = FilterSeniorSetting_1.FilterSeniorSetting.getRootAsFilterSeniorSetting(new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)));
        e.push(o);
      }
      if (t) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, e, e.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return e;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FilterSeniorSettingAll.js.map