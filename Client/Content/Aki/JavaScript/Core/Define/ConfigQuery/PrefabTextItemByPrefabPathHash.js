"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPrefabTextItemByPrefabPathHash = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PrefabTextItem_1 = require("../Config/PrefabTextItem");
const DB = "db_ui_prefabtextitem.db";
const FILE = "u.UiTextCollect/u.预制体文本收集.csv";
const TABLE = "PrefabTextItem";
const COMMAND = "select BinData from `PrefabTextItem` where PrefabPathHash = ?";
const KEY_PREFIX = "PrefabTextItemByPrefabPathHash";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPrefabTextItemByPrefabPathHash.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPrefabTextItemByPrefabPathHash.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPrefabTextItemByPrefabPathHash.GetConfigList(";
exports.configPrefabTextItemByPrefabPathHash = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    o?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var n = `${KEY_PREFIX}#${t})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindBigInt(handleId, 1, t, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PrefabPathHash", t]) !== 1) {
            break;
          }
          var a = undefined;
          [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PrefabPathHash", t]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = PrefabTextItem_1.PrefabTextItem.getRootAsPrefabTextItem(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          f.push(a);
        }
        if (e) {
          n = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PrefabTextItemByPrefabPathHash.js.map