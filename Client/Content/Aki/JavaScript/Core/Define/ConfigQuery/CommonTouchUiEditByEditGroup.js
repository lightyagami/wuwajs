"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCommonTouchUiEditByEditGroup = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CommonTouchUiEdit_1 = require("../Config/CommonTouchUiEdit");
const DB = "db_commontouchuiedit.db";
const FILE = "y.移动端活动玩法主界面键位配置.xlsx";
const TABLE = "CommonTouchUiEdit";
const COMMAND = "select BinData from `CommonTouchUiEdit` where EditGroup=?";
const KEY_PREFIX = "CommonTouchUiEditByEditGroup";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCommonTouchUiEditByEditGroup.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configCommonTouchUiEditByEditGroup.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configCommonTouchUiEditByEditGroup.GetConfigList(";
exports.configCommonTouchUiEditByEditGroup = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var C = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const e = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["EditGroup", o]) !== 1) {
            break;
          }
          var m = undefined;
          [n, m] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EditGroup", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          m = CommonTouchUiEdit_1.CommonTouchUiEdit.getRootAsCommonTouchUiEdit(new byte_buffer_1.ByteBuffer(new Uint8Array(m.buffer)));
          e.push(m);
        }
        if (i) {
          C = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(C, e, e.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return e;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CommonTouchUiEditByEditGroup.js.map