"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAnimalStandbyMontageByBp = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AnimalStandbyMontage_1 = require("../Config/AnimalStandbyMontage");
const DB = "db_animalstandbymotnageconfig.db";
const FILE = "k.可视化编辑/c.Csv/d.动物待机动作/*.csv*";
const TABLE = "AnimalStandbyMontage";
const COMMAND = "select BinData from `AnimalStandbyMontage` where Bp=?";
const KEY_PREFIX = "AnimalStandbyMontageByBp";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAnimalStandbyMontageByBp.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configAnimalStandbyMontageByBp.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configAnimalStandbyMontageByBp.GetConfigList(";
exports.configAnimalStandbyMontageByBp = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var a = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (g) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Bp", n]) !== 1) {
            break;
          }
          var e = undefined;
          [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Bp", n]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          e = AnimalStandbyMontage_1.AnimalStandbyMontage.getRootAsAnimalStandbyMontage(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          g.push(e);
        }
        if (o) {
          a = `${KEY_PREFIX}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AnimalStandbyMontageByBp.js.map