"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhoneMessageAttachmentById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhoneMessageAttachment_1 = require("../Config/PhoneMessageAttachment");
const DB = "db_phonemessageattachment.db";
const FILE = "k.可视化编辑/c.Csv/s.手机短信附件/*.csv*";
const TABLE = "PhoneMessageAttachment";
const COMMAND = "select BinData from `PhoneMessageAttachment` where Id=?";
const KEY_PREFIX = "PhoneMessageAttachmentById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhoneMessageAttachmentById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhoneMessageAttachmentById.GetConfig");
const CONFIG_STAT_PREFIX = "configPhoneMessageAttachmentById.GetConfig(";
exports.configPhoneMessageAttachmentById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    t?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (n) {
        var i = `${KEY_PREFIX}#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        i = undefined;
        [o, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (o) {
          const a = PhoneMessageAttachment_1.PhoneMessageAttachment.getRootAsPhoneMessageAttachment(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            o = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhoneMessageAttachmentById.js.map