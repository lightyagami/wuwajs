"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSkillLevelBySkillLevelGroupIdAndSkillId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillLevel_1 = require("../Config/SkillLevel");
const DB = "db_skill.db";
const FILE = "j.技能.xlsx";
const TABLE = "SkillLevel";
const COMMAND = "select BinData from `SkillLevel` where SkillLevelGroupId = ? AND SkillId = ?";
const KEY_PREFIX = "SkillLevelBySkillLevelGroupIdAndSkillId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSkillLevelBySkillLevelGroupIdAndSkillId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig");
const CONFIG_STAT_PREFIX = "configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig(";
exports.configSkillLevelBySkillLevelGroupIdAndSkillId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, l, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${l})`);
    e?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var t = `${KEY_PREFIX}#${o}#${l})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, l, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["SkillLevelGroupId", o], ["SkillId", l]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SkillLevelGroupId", o], ["SkillId", l]);
        if (n) {
          const C = SkillLevel_1.SkillLevel.getRootAsSkillLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            n = `${KEY_PREFIX}#${o}#${l})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SkillLevelBySkillLevelGroupIdAndSkillId.js.map