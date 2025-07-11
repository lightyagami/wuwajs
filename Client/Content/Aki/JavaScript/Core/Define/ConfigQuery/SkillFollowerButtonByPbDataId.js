"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSkillFollowerButtonByPbDataId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillFollowerButton_1 = require("../Config/SkillFollowerButton");
const DB = "db_skillbutton.db";
const FILE = "j.技能按钮.xlsx";
const TABLE = "SkillFollowerButton";
const COMMAND = "select BinData from `SkillFollowerButton` where PbDataId=?";
const KEY_PREFIX = "SkillFollowerButtonByPbDataId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSkillFollowerButtonByPbDataId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSkillFollowerButtonByPbDataId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSkillFollowerButtonByPbDataId.GetConfigList(";
exports.configSkillFollowerButtonByPbDataId = {
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
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (t) {
        var e = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PbDataId", o]) !== 1) {
            break;
          }
          var l = undefined;
          [i, l] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PbDataId", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          l = SkillFollowerButton_1.SkillFollowerButton.getRootAsSkillFollowerButton(new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)));
          a.push(l);
        }
        if (t) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SkillFollowerButtonByPbDataId.js.map