"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoLevelData = undefined;
const PhotoFightActivityById_1 = require("../../../../../../Core/Define/ConfigQuery/PhotoFightActivityById");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class FightPhotoLevelData {
  constructor(t) {
    this.Lo = undefined;
    this.Wke = [];
    this.qFd = undefined;
    this.P4e = false;
    this.jqc = false;
    this.Lo = t;
  }
  set IsUnLock(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.LevelGroupData.IsUnLock && this.P4e;
  }
  set IsFinished(t) {
    this.jqc = t;
  }
  get IsFinished() {
    return this.jqc;
  }
  set LevelGroupData(t) {
    this.qFd = t;
  }
  get LevelGroupData() {
    return this.qFd;
  }
  SetRoleIdList(t) {
    if (t.length === 0) {
      var e = this.LevelGroupData.TargetRoleId;
      for (const i of this.TrialRoleList) {
        if (ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i).ParentId === e) {
          this.Wke = [i];
          break;
        }
      }
    } else {
      this.Wke = t;
    }
  }
  GetRoleIdList() {
    return this.Wke;
  }
  GetRoleIdListIncludeZero() {
    for (var t = [...this.Wke]; t.length < 3;) {
      t.push(0);
    }
    return t;
  }
  get HasRedDot() {
    return !!this.IsUnLock && !this.IsFinished && !(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FightPhotoLevelRedDot) ?? new Set()).has(this.LevelId);
  }
  ReadRedDot() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FightPhotoLevelRedDot) ?? new Set();
    t.add(this.LevelId);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FightPhotoLevelRedDot, t);
  }
  get LevelId() {
    return this.Lo.Id;
  }
  get Name() {
    return this.Lo.LevelName;
  }
  get PreLevelName() {
    var t = this.Lo.PreInstId;
    return PhotoFightActivityById_1.configPhotoFightActivityById.GetConfig(t).LevelName;
  }
  get IsDifficulty() {
    return this.Lo.IsDifficulty;
  }
  get RoleBigTexture() {
    return this.Lo.RoleBigTexture;
  }
  get TaskTargetText() {
    return this.Lo.TaskDescriptionText;
  }
  get TrialRoleList() {
    return this.Lo.TrailRole;
  }
  get InstanceId() {
    return this.Lo.InstId;
  }
  get NpcHeadIcon() {
    return this.Lo.NpcHeadIcon;
  }
  get NpcDialogue() {
    return this.Lo.NpcDialogue;
  }
  get LoadingId() {
    return this.Lo.LoadingId;
  }
}
exports.FightPhotoLevelData = FightPhotoLevelData;
//# sourceMappingURL=FightPhotoLevelData.js.map