"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPrefabTextItemAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PrefabTextItem_1 = require("../Config/PrefabTextItem");
const DB = "db_ui_prefabtextitem.db";
const FILE = "u.UiTextCollect/u.预制体文本收集.csv";
const TABLE = "PrefabTextItem";
const COMMAND = "select BinData from `PrefabTextItem`";
const KEY_PREFIX = "PrefabTextItemAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPrefabTextItemAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPrefabTextItemAll.GetConfigList");
exports.configPrefabTextItemAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t = true) => {
    var e;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
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
        var i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!e) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        i = PrefabTextItem_1.PrefabTextItem.getRootAsPrefabTextItem(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        n.push(i);
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
//# sourceMappingURL=PrefabTextItemAll.js.map