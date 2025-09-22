"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoLevelGroupData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class FightPhotoLevelGroupData {
  constructor(t) {
    this.Lo = undefined;
    this.$Rd = [];
    this.NAu = 0;
    this.Lo = t;
  }
  PushFightPhotoLevel(t) {
    this.$Rd.push(t);
  }
  get LevelIdList() {
    return this.Lo.Difficulty;
  }
  get LevelDataList() {
    return this.$Rd;
  }
  set UnlockTime(t) {
    this.NAu = t / TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  get UnlockTime() {
    return this.NAu;
  }
  IsReachUnlockTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.NAu === 0 || this.UnlockTime < t;
  }
  get IsUnLock() {
    return this.IsReachUnlockTime();
  }
  get IsFinished() {
    for (const t of this.$Rd) {
      if (!t.IsFinished) {
        return false;
      }
    }
    return true;
  }
  get FirstUnFinishedLevelData() {
    return this.$Rd.find(t => t.IsUnLock && !t.IsFinished) ?? this.$Rd.find(t => !t.IsUnLock) ?? this.$Rd[this.$Rd.length - 1];
  }
  get HasRedDot() {
    for (const t of this.$Rd) {
      if (t.HasRedDot) {
        return true;
      }
    }
    return false;
  }
  get Id() {
    return this.Lo.Id;
  }
  get SortId() {
    return this.Lo.SortId;
  }
  get ThemeName() {
    return this.Lo.ThemeName;
  }
  get RoleTextureLight() {
    return this.Lo.RoleTextureLight;
  }
  get RoleTextureDark() {
    return this.Lo.RoleTextureDark;
  }
  get NumTexture() {
    return this.Lo.NumSprite;
  }
  get NumTexture2() {
    return this.Lo.NumTextureAdd;
  }
  get TargetRoleName() {
    var t = this.Lo.TargetRole;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    if (e) {
      return e.Name;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FightPhotograph", 71, "关卡组拍照目标不存在", ["levelGroupId", this.Lo.Id], ["roleId", t]);
      }
      return "";
    }
  }
  get TargetRoleId() {
    return this.Lo.TargetRole;
  }
}
exports.FightPhotoLevelGroupData = FightPhotoLevelGroupData;
//# sourceMappingURL=FightPhotoLevelGroupData.js.map