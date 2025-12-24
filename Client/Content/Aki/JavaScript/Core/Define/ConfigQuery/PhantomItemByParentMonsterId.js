"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomItemByParentMonsterId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomItem_1 = require("../Config/PhantomItem");
const DB = "db_phantom.db";
const FILE = "h.幻象.xlsx";
const TABLE = "PhantomItem";
const COMMAND = "select BinData from `PhantomItem` where ParentMonsterId=?";
const KEY_PREFIX = "PhantomItemByParentMonsterId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomItemByParentMonsterId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomItemByParentMonsterId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPhantomItemByParentMonsterId.GetConfigList(";
exports.configPhantomItemByParentMonsterId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var i = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (m) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ParentMonsterId", o]) !== 1) {
            break;
          }
          var a = undefined;
          [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ParentMonsterId", o]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = PhantomItem_1.PhantomItem.getRootAsPhantomItem(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          m.push(a);
        }
        if (t) {
          i = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomItemByParentMonsterId.js.map