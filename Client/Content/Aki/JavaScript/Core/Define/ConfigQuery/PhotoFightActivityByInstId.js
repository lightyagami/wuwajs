"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhotoFightActivityByInstId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhotoFightActivity_1 = require("../Config/PhotoFightActivity");
const DB = "db_fightphotograph.db";
const FILE = "p.拍照战斗活动.xlsx";
const TABLE = "PhotoFightActivity";
const COMMAND = "select BinData from `PhotoFightActivity` where InstId=?";
const KEY_PREFIX = "PhotoFightActivityByInstId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoFightActivityByInstId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhotoFightActivityByInstId.GetConfig");
const CONFIG_STAT_PREFIX = "configPhotoFightActivityByInstId.GetConfig(";
exports.configPhotoFightActivityByInstId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var g = `${KEY_PREFIX}#${t})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (e) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["InstId", t]) > 0) {
        g = undefined;
        [n, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InstId", t]);
        if (n) {
          const e = PhotoFightActivity_1.PhotoFightActivity.getRootAsPhotoFightActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhotoFightActivityByInstId.js.map