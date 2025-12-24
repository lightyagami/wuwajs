"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSkillVehicleButtonByTemplateId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SkillVehicleButton_1 = require("../Config/SkillVehicleButton");
const DB = "db_skillbutton.db";
const FILE = "j.技能按钮.xlsx";
const TABLE = "SkillVehicleButton";
const COMMAND = "select BinData from `SkillVehicleButton` where TemplateId=?";
const KEY_PREFIX = "SkillVehicleButtonByTemplateId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSkillVehicleButtonByTemplateId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSkillVehicleButtonByTemplateId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSkillVehicleButtonByTemplateId.GetConfigList(";
exports.configSkillVehicleButtonByTemplateId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var n = `${KEY_PREFIX}#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["TemplateId", t]) !== 1) {
            break;
          }
          var l = undefined;
          [e, l] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TemplateId", t]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          l = SkillVehicleButton_1.SkillVehicleButton.getRootAsSkillVehicleButton(new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)));
          C.push(l);
        }
        if (o) {
          n = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SkillVehicleButtonByTemplateId.js.map