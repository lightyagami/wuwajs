"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushConfig = undefined;
const BossRushActivityByActivityIdAndInstanceId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushActivityByActivityIdAndInstanceId");
const BossRushActivityById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushActivityById");
const BossRushBuffById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushBuffById");
const BossRushBuffDescById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushBuffDescById");
const BossRushMapMarkByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushMapMarkByActivityId");
const BossRushScoreById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushScoreById");
const BossRushTaskConfigAll_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskConfigAll");
const BossRushTaskConfigByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskConfigByTaskId");
const BossRushTaskTabAll_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskTabAll");
const BossRushTaskTabByTabId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskTabByTabId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class BossRushConfig extends ConfigBase_1.ConfigBase {
  GetBossRushActivityConfigById(s) {
    return BossRushActivityById_1.configBossRushActivityById.GetConfig(s);
  }
  GetBossRushByActivityIdAndInstanceId(s, e) {
    s = BossRushActivityByActivityIdAndInstanceId_1.configBossRushActivityByActivityIdAndInstanceId.GetConfigList(s, e);
    if (s !== undefined && s.length !== 0) {
      return s[0];
    }
  }
  GetBossRushBuffConfigById(s) {
    return BossRushBuffById_1.configBossRushBuffById.GetConfig(s);
  }
  GetBossRushScoreConfigById(s) {
    return BossRushScoreById_1.configBossRushScoreById.GetConfig(s);
  }
  GetBossRushMarkTypeByActivityId(s) {
    return 0;
  }
  GetBossRushMarkByActivityId(s) {
    return BossRushMapMarkByActivityId_1.configBossRushMapMarkByActivityId.GetConfig(s).MarkId;
  }
  GetBossRushTaskConfig(s) {
    return BossRushTaskConfigByTaskId_1.configBossRushTaskConfigByTaskId.GetConfig(s);
  }
  GetBossRushTabListByActivityId(e) {
    var s = BossRushTaskTabAll_1.configBossRushTaskTabAll.GetConfigList();
    var o = BossRushTaskConfigAll_1.configBossRushTaskConfigAll.GetConfigList();
    if (s === undefined || o === undefined) {
      return [];
    } else {
      return s.filter(s => s.ActivityId === e);
    }
  }
  GetBossRushTabByTabId(s) {
    return BossRushTaskTabByTabId_1.configBossRushTaskTabByTabId.GetConfig(s);
  }
  GetBossRushBuffDescByClassLevel(s, e) {
    var s = this.GetBossRushBuffConfigById(s).PopDescIdList;
    if (s.length > e) {
      s = s[e];
      return BossRushBuffDescById_1.configBossRushBuffDescById.GetConfig(s);
    }
  }
}
exports.BossRushConfig = BossRushConfig;
//# sourceMappingURL=BossRushConfig.js.map