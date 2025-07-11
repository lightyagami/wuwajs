"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFoleySynthConfigByIdWithDefaultId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FoleySynthConfig_1 = require("../Config/FoleySynthConfig");
const DB = "db_entity_audio.db";
const FILE = "y.音频组件配置.xlsx";
const TABLE = "FoleySynthConfig";
const COMMAND = "select BinData from `FoleySynthConfig` where id = ? AND (SELECT count() from `FoleySynthConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `FoleySynthConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "FoleySynthConfigByIdWithDefaultId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFoleySynthConfigByIdWithDefaultId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFoleySynthConfigByIdWithDefaultId.GetConfig");
const CONFIG_STAT_PREFIX = "configFoleySynthConfigByIdWithDefaultId.GetConfig(";
exports.configFoleySynthConfigByIdWithDefaultId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i, t, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var C = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n}#${i}#${t})`);
    C?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (e) {
        var g = `${KEY_PREFIX}#${o}#${n}#${i}#${t})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (d) {
          C?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 4, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Id", n], ["Id", i], ["Id", t]) > 0) {
        g = undefined;
        [f, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Id", n], ["Id", i], ["Id", t]);
        if (f) {
          const d = FoleySynthConfig_1.FoleySynthConfig.getRootAsFoleySynthConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (e) {
            f = `${KEY_PREFIX}#${o}#${n}#${i}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, d);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          C?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    C?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FoleySynthConfigByIdWithDefaultId.js.map