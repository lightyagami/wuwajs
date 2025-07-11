"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPlayerStateRestrictionById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PlayerStateRestriction_1 = require("../Config/PlayerStateRestriction");
const DB = "db_playerstaterestriction.db";
const FILE = "k.可视化编辑/c.Csv/w.玩家状态限制/*.csv*";
const TABLE = "PlayerStateRestriction";
const COMMAND = "select BinData from `PlayerStateRestriction` where Id=?";
const KEY_PREFIX = "PlayerStateRestrictionById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPlayerStateRestrictionById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPlayerStateRestrictionById.GetConfig");
const CONFIG_STAT_PREFIX = "configPlayerStateRestrictionById.GetConfig(";
exports.configPlayerStateRestrictionById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var n = `${KEY_PREFIX}#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (i) {
          const a = PlayerStateRestriction_1.PlayerStateRestriction.getRootAsPlayerStateRestriction(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PlayerStateRestrictionById.js.map