"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendData = exports.RecentlyTeamData = exports.FriendApplyData = exports.FriendBlackListData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class FriendBlackListData {
  constructor() {
    this.j6t = undefined;
  }
  async InitializeFriendBlackListData(t) {
    this.j6t = new FriendData();
    await this.j6t.SetPlayerBasicInfo(t);
  }
  get GetBlockedPlayerData() {
    return this.j6t;
  }
  set GetBlockedPlayerData(t) {
    this.j6t = t;
  }
}
exports.FriendBlackListData = FriendBlackListData;
class FriendApplyData {
  constructor() {
    this.j6t = undefined;
    this.W6t = -0;
    this.Fresh = true;
    this.jra = 0;
  }
  async InitializeFriendApply(t) {
    this.j6t = new FriendData();
    await this.j6t.SetPlayerBasicInfo(t.YVn);
    this.W6t = Number(MathUtils_1.MathUtils.LongToBigInt(t.wUs));
  }
  get ApplyCreatedTime() {
    return this.W6t;
  }
  set ApplyCreatedTime(t) {
    this.W6t = t;
  }
  get ApplyPlayerData() {
    return this.j6t;
  }
  set ApplyPlayerData(t) {
    this.j6t = t;
  }
  get ApplyTimeLeftTime() {
    return this.jra - TimeUtil_1.TimeUtil.GetServerTime();
  }
  set ApplyTimeLeftTime(t) {
    this.jra = t + ModelManager_1.ModelManager.FriendModel.ApplyCdTime;
  }
}
exports.FriendApplyData = FriendApplyData;
class RecentlyTeamData {
  constructor() {
    this.PlayerData = new FriendData();
    this.TeamTime = -0;
  }
  async InitData(t) {
    await this.PlayerData.SetPlayerBasicInfo(t.YVn);
    this.TeamTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.GUs));
  }
  GetOfflineDay() {
    var t = this.TeamTime;
    return TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(t, false);
  }
}
exports.RecentlyTeamData = RecentlyTeamData;
class FriendData {
  constructor() {
    this.xe = 0;
    this.he = "";
    this.B8 = 0;
    this.K6t = 0;
    this.Q6t = 0;
    this.WVt = 0;
    this.$ac = 0;
    this.bu1 = 0;
    this.X6t = false;
    this.$6t = 0;
    this.Y6t = undefined;
    this.Debug = false;
    this.WorldLevel = 0;
    this.TeamMemberCount = 0;
    this.Signature = "";
    this.CurCard = 0;
    this.RoleShowList = [];
    this.CardShowList = [];
    this.Birthday = 0;
    this.IsBirthdayDisplay = false;
    this.CardUnlockList = [];
    this.$xa = "";
    this.Xxa = "";
    this.Yxa = false;
    this.zxa = "";
  }
  async SetFriendDataAttribute(t) {
    await this.SetPlayerBasicInfo(t.YVn);
    this.Y6t = t.JVn;
    if (!this.Y6t) {
      t = ModelManager_1.ModelManager.FriendModel.GetFriendById(t.YVn.W5n);
      this.Y6t = t?.Y6t;
    }
  }
  async SetPlayerBasicInfo(e) {
    this.xe = e.W5n;
    this.he = e.H8n;
    this.B8 = e.F6n;
    this.K6t = e.dSs;
    this.Q6t = e.mSs;
    this.WVt = e.tnc;
    this.$ac = e.inc;
    this.bu1 = e.v7n;
    this.X6t = e.CSs;
    this.$6t = Number(MathUtils_1.MathUtils.LongToBigInt(e.fSs));
    if (!this.Y6t) {
      t = ModelManager_1.ModelManager.FriendModel.GetFriendById(e.W5n);
      this.Y6t = t?.Y6t;
    }
    this.WorldLevel = e.cSs;
    this.TeamMemberCount = e.vSs;
    var t = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedLimitUserInfoWhenSocialLimit();
    if (t) {
      t = e.$4l;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Friend", 27, "FriendSdkData", ["limitState", t], ["id", e.Jxa]);
      }
      this.Signature = t === 1 ? "" : e.zVn;
    } else {
      this.Signature = e.zVn;
    }
    this.CurCard = e.ESs;
    if (this.CurCard === 0) {
      this.CurCard = ConfigManager_1.ConfigManager.FriendConfig.GetDefaultBackgroundCardId();
    }
    this.RoleShowList = [];
    var i = e.MSs.length;
    for (let t = 0; t < i; t++) {
      var s = e.MSs[t];
      this.RoleShowList.push(new PersonalDefine_1.RoleShowEntry(s.Q6n, s.F6n));
    }
    this.CardShowList = e.SSs;
    this.CardUnlockList = [];
    e.SSs.forEach(t => {
      this.CardUnlockList.push(new PersonalDefine_1.PersonalCardData(t, true, true));
    });
    this.Birthday = e.ZVn;
    this.IsBirthdayDisplay = e.ySs;
    if (e.Jxa) {
      this.$xa = e.Jxa;
      this.Xxa = e.Qxa;
      this.zxa = e.ywa;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Friend", 27, "FriendSdkData", ["SdkUserId", this.$xa], ["SdkOnlineId", this.Xxa], ["this.SdkAccountId", this.zxa]);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(this.$xa)) {
        await this.RefreshSdkBlockState();
      }
    }
  }
  async RefreshSdkBlockState() {
    var t = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
    if ((t &&= t.get(this.zxa)) && (this.Yxa = t, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Friend", 27, "BlockBySdk", ["state", this.Yxa]);
    }
  }
  get PlayerId() {
    return this.xe;
  }
  set PlayerId(t) {
    this.xe = t;
  }
  get PlayerName() {
    return this.he;
  }
  set PlayerName(t) {
    this.he = t;
  }
  get PlayerLevel() {
    return this.B8;
  }
  set PlayerLevel(t) {
    this.B8 = t;
  }
  get PlayerHeadPhoto() {
    return this.K6t;
  }
  get PlayerHeadFrame() {
    return this.Q6t;
  }
  get PlayerTitleId() {
    return this.WVt;
  }
  get PlayerTitleStarLevel() {
    return this.$ac;
  }
  get PlayerSex() {
    return this.bu1;
  }
  get PlayerIsOnline() {
    return this.X6t;
  }
  set PlayerIsOnline(t) {
    this.X6t = t;
  }
  get PlayerLastOfflineTime() {
    return this.$6t;
  }
  set PlayerLastOfflineTime(t) {
    this.$6t = t;
  }
  GetOfflineDay() {
    var t = this.PlayerLastOfflineTime;
    return TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(t, false);
  }
  get FriendRemark() {
    return this.Y6t;
  }
  set FriendRemark(t) {
    this.Y6t = t;
  }
  GetSdkOnlineId() {
    return this.Xxa;
  }
  GetSdkUserId() {
    return this.$xa;
  }
  GetAccountId() {
    return this.zxa;
  }
  IfSdkCanShowFriend() {
    var t = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkFriendOnlyState();
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.PlayOnly();
    return !t && !e || this.$xa !== "";
  }
  GetBlockBySdk() {
    return this.Yxa;
  }
  CanShowInFriendList() {
    return !this.GetBlockBySdk() && this.IfSdkCanShowFriend();
  }
}
exports.FriendData = FriendData;
//# sourceMappingURL=FriendData.js.map