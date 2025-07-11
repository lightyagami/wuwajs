"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring25ConfigContext = undefined;
const SpringChatById_1 = require("../../../../../../Core/Define/ConfigQuery/SpringChatById");
const SpringResourceByRoleType_1 = require("../../../../../../Core/Define/ConfigQuery/SpringResourceByRoleType");
const SpringRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/SpringRewardAll");
const SpringSignAll_1 = require("../../../../../../Core/Define/ConfigQuery/SpringSignAll");
const SpringSignById_1 = require("../../../../../../Core/Define/ConfigQuery/SpringSignById");
const Spring25Define_1 = require("../Spring25Define");
class Spring25ConfigContext {
  constructor(e) {
    this.i5l = undefined;
    this.GGl = undefined;
    this.kGl = undefined;
    this.i5l = e;
  }
  get OGl() {
    if (this.GGl === undefined) {
      this.GGl = new Map();
      var e = SpringSignAll_1.configSpringSignAll.GetConfigList();
      if (e) {
        var i = this.i5l.CurrentActivityId;
        for (const t of e) {
          if (i === t.ActivityId) {
            this.GGl.set(t.Id, t);
          }
        }
      }
    }
    return this.GGl;
  }
  get NGl() {
    if (this.kGl === undefined) {
      this.kGl = new Map();
      var e = SpringRewardAll_1.configSpringRewardAll.GetConfigList();
      if (e) {
        var i = this.i5l.CurrentActivityId;
        for (const t of e) {
          if (i === t.ActivityId) {
            this.kGl.set(t.Id, t);
          }
        }
      }
    }
    return this.kGl;
  }
  Dispose() {
    this.kGl?.clear();
    this.kGl = undefined;
    this.GGl?.clear();
    this.GGl = undefined;
  }
  FGl(e) {
    e = this.OGl.get(e)?.ResourceTypeId;
    if (e !== undefined) {
      e = SpringResourceByRoleType_1.configSpringResourceByRoleType.GetConfigList(e);
      if (e !== undefined) {
        return e[0];
      }
    }
  }
  get TaskCfgMap() {
    return this.NGl;
  }
  get SignCfgMap() {
    return this.OGl;
  }
  get TaskCount() {
    return this.TaskCfgMap.size;
  }
  get SignCount() {
    return this.OGl.size;
  }
  StartChatCfgByGender(e) {
    if (e === 1) {
      return SpringChatById_1.configSpringChatById.GetConfig(Spring25Define_1.START_MALE_CHAT_CONFIG_ID);
    } else {
      return SpringChatById_1.configSpringChatById.GetConfig(Spring25Define_1.START_FEMALE_CHAT_CONFIG_ID);
    }
  }
  GetChatConfigBySignId(i, t) {
    i = this.FGl(i);
    if (i !== undefined) {
      i = i.DialogDataList;
      if (!(i.length < 2)) {
        let e = 0;
        e = t === 1 ? i[0] : i[1];
        return SpringChatById_1.configSpringChatById.GetConfig(e);
      }
    }
  }
  GetLetterContentTextIdBySignId(e) {
    return this.FGl(e)?.LetterContent;
  }
  GetLetterTitleTextIdBySignId(e) {
    return this.FGl(e)?.LetterTitle;
  }
  GetLetterTabTextIdBySignId(e) {
    return this.FGl(e)?.LetterTab;
  }
  GetLetterIconBySignId(e) {
    return this.FGl(e)?.MailIcon;
  }
  GetRoleNameTextIdBySignId(e) {
    return this.FGl(e)?.RoleName;
  }
  GetResourceTypeBySignId(e) {
    return SpringSignById_1.configSpringSignById.GetConfig(e)?.ResourceTypeId;
  }
  GetTaskNameTextIdByTaskId(e) {
    return this.NGl.get(e)?.TaskTitle;
  }
  GetTaskThresholdByTaskId(e) {
    return this.NGl.get(e)?.TaskThreshold ?? 0;
  }
}
exports.Spring25ConfigContext = Spring25ConfigContext;
//# sourceMappingURL=Spring25ConfigContext.js.map