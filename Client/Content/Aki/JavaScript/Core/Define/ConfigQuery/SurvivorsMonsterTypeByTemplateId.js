"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSurvivorsMonsterTypeByTemplateId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SurvivorsMonsterType_1 = require("../Config/SurvivorsMonsterType");
const DB = "db_survivors.db";
const FILE = "x.幸存者_怪物.xlsx";
const TABLE = "SurvivorsMonsterType";
const COMMAND = "select BinData from `SurvivorsMonsterType` where TemplateId=?";
const KEY_PREFIX = "SurvivorsMonsterTypeByTemplateId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsMonsterTypeByTemplateId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsMonsterTypeByTemplateId.GetConfig");
const CONFIG_STAT_PREFIX = "configSurvivorsMonsterTypeByTemplateId.GetConfig(";
exports.configSurvivorsMonsterTypeByTemplateId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TemplateId", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TemplateId", o]);
        if (t) {
          const r = SurvivorsMonsterType_1.SurvivorsMonsterType.getRootAsSurvivorsMonsterType(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SurvivorsMonsterTypeByTemplateId.js.map