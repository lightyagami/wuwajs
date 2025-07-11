"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFlowTextByIdAndFlowListId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FlowText_1 = require("../Config/FlowText");
const DB = "db_flow_text.db";
const FILE = "k.可视化编辑/j.剧情/Text_剧情*";
const TABLE = "FlowText";
const COMMAND = "select BinData from `FlowText` where Id=? AND FlowListId=?";
const KEY_PREFIX = "FlowTextByIdAndFlowListId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFlowTextByIdAndFlowListId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFlowTextByIdAndFlowListId.GetConfig");
const CONFIG_STAT_PREFIX = "configFlowTextByIdAndFlowListId.GetConfig(";
exports.configFlowTextByIdAndFlowListId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${t})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var C = `${KEY_PREFIX}#${o}#${t})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["FlowListId", t]) > 0) {
        C = undefined;
        [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["FlowListId", t]);
        if (e) {
          const f = FlowText_1.FlowText.getRootAsFlowText(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FlowTextByIdAndFlowListId.js.map