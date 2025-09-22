"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherScenePlayerData = exports.WorldTeamRoleInfo = exports.WorldTeamPlayerFightInfo = exports.OnlineTeamData = exports.OnlineApplyData = exports.OnlineHallData = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class OnlineHallData {
  constructor(t) {
    this.CardUnlockList = [];
    this.OGi = 0;
    for (const e of (this.kGi = t).SSs) {
      this.CardUnlockList.push(new PersonalDefine_1.PersonalCardData(e, true, true));
    }
  }
  SetApplyTime(t) {
    if (!(t <= 0)) {
      this.OGi = t;
    }
  }
  get ApplyTimeLeftTime() {
    return this.OGi - TimeUtil_1.TimeUtil.GetServerTime();
  }
  get PlayerId() {
    return this.kGi.W5n;
  }
  get HeadId() {
    return this.kGi.dSs;
  }
  get Level() {
    return this.kGi.F6n;
  }
  get PlayerCount() {
    return this.kGi.vSs;
  }
  get WorldLevel() {
    return this.kGi.cSs;
  }
  get Name() {
    return this.kGi.H8n;
  }
  get PlayerName() {
    return this.kGi.H8n;
  }
  get Signature() {
    return this.kGi.zVn;
  }
  get PlayerCard() {
    return this.kGi.ESs;
  }
  get PlayerTitleId() {
    return this.kGi.tnc;
  }
  get PlayerTitleStarLevel() {
    return this.kGi.inc;
  }
  get Sex() {
    return this.kGi.v7n;
  }
  get PlayerDetails() {
    return this.kGi;
  }
  get PlayerOriginWorldLevel() {
    return this.kGi.uSs;
  }
  get Deactivation() {
    return this.kGi.jSd;
  }
  get PlayerLastOfflineTime() {
    return MathUtils_1.MathUtils.LongToNumber(this.kGi.fSs);
  }
  get PlayerPsAccountId() {
    return this.kGi.ywa;
  }
  GetIfCanShowInHallList(t = undefined) {
    return (!PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.PlayOnly() || this.PlayerPsAccountId !== "") && (!t || t.get(this.PlayerPsAccountId) === undefined);
  }
}
exports.OnlineHallData = OnlineHallData;
class OnlineApplyData {
  constructor(t, e, r, i, s, n) {
    this.PlayStationOnlineId = "";
    this.FGi = t;
    this.VGi = e;
    this.OGi = r;
    this.HGi = i;
    this.jGi = s;
    this.PlayStationOnlineId = n;
  }
  get ApplyTimeLeftTime() {
    return Number(MathUtils_1.MathUtils.LongToBigInt(this.OGi)) - TimeUtil_1.TimeUtil.GetServerTime();
  }
  get PlayerId() {
    return this.VGi;
  }
  get RefuseTimestamp() {
    return this.OGi;
  }
  get Level() {
    return this.jGi;
  }
  get Name() {
    return this.FGi;
  }
  get HeadId() {
    return this.HGi;
  }
}
exports.OnlineApplyData = OnlineApplyData;
class OnlineTeamData {
  constructor(t, e, r, i, s, n, a, h, l, o, u, g) {
    this.Jmc = 0;
    this.Zmc = 0;
    this.Ru1 = 0;
    this.CardUnlockList = [];
    this.WGi = 0;
    this.$Md = 1;
    this.FGi = t;
    this.VGi = e;
    this.jGi = r;
    this.HGi = i;
    this.KGi = s;
    this.PlayerNumber = n;
    this.kGi = a;
    this.QGi = Protocol_1.Aki.Protocol.r7s.Proto_GREAT;
    this.Jmc = l;
    this.Zmc = o;
    this.Ru1 = u;
    this.$Md = g;
    for (const d of a.SSs) {
      this.CardUnlockList.push(new PersonalDefine_1.PersonalCardData(d, true, true));
    }
  }
  get PlayerId() {
    return this.VGi;
  }
  get HeadId() {
    return this.HGi;
  }
  set HeadId(t) {
    this.HGi = t;
  }
  get Level() {
    return this.jGi;
  }
  set Level(t) {
    this.jGi = t;
  }
  get Name() {
    return this.GetFormationName();
  }
  set Name(t) {
    this.FGi = t;
  }
  get PlayerTitleId() {
    return this.Jmc;
  }
  get PlayerTitleStarLevel() {
    return this.Zmc;
  }
  get Sex() {
    return this.Ru1;
  }
  set Sex(t) {
    this.Ru1 = t;
  }
  get WorldLevel() {
    return this.$Md;
  }
  SetPlayerTitleInfo(t) {
    if (t.length !== 0) {
      t = t.split("_");
      this.Jmc = parseInt(t[0]);
      t = t.length === 2 ? parseInt(t[1]) : 0;
      this.Zmc = t;
    }
  }
  get PlayerName() {
    return this.GetFormationName();
  }
  GetRawName() {
    return this.FGi;
  }
  GetOnlineName() {
    return this.PlayerDetails.Qxa;
  }
  GetFormationName() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      var t = this.PlayerDetails.Qxa;
      if (t !== undefined && t !== "") {
        return t;
      }
    }
    return this.FGi;
  }
  get Signature() {
    return this.KGi;
  }
  set Signature(t) {
    this.KGi = t;
  }
  get PlayerNumber() {
    return this.WGi;
  }
  set PlayerNumber(t) {
    this.WGi = t;
  }
  get IsSelf() {
    return this.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
  }
  get PingState() {
    return this.QGi;
  }
  set PingState(t) {
    this.QGi = t;
  }
  get PlayerDetails() {
    return this.kGi;
  }
  set PlayerDetails(t) {
    this.kGi = t;
  }
  GetIfCanShowInHallList(t = undefined) {
    return !t || t.get(this.kGi.ywa) === undefined;
  }
}
exports.OnlineTeamData = OnlineTeamData;
class WorldTeamPlayerFightInfo {
  constructor(t, e, r, i, s, n) {
    this.FGi = t;
    this.VGi = e;
    this.XGi = n;
    this.$Gi = r;
    this.dIl = s;
    this.bSl = i;
  }
  get PlayerId() {
    return this.VGi;
  }
  get CurRoleId() {
    return this.$Gi;
  }
  set CurRoleId(t) {
    this.$Gi = t;
  }
  get RoleInfos() {
    return this.XGi;
  }
  set RoleInfos(t) {
    this.XGi = t;
  }
  GetRoleInfoByConfigId(t) {
    for (const e of this.XGi) {
      if (e.RoleId === t) {
        return e;
      }
    }
  }
  get Name() {
    return this.FGi;
  }
  set Name(t) {
    this.FGi = t;
  }
  get ThirdPartyOnlineName() {
    return this.bSl;
  }
  get ThirdPartyAccountId() {
    return this.dIl;
  }
}
exports.WorldTeamPlayerFightInfo = WorldTeamPlayerFightInfo;
class WorldTeamRoleInfo {
  constructor(t, e, r) {
    this.JGi = 0;
    this.aTl = 0;
    this.zGi = 0;
    this.JGi = t;
    this.aTl = e;
    this.zGi = r;
  }
  get RoleId() {
    return this.JGi;
  }
  get RoleSkinId() {
    return this.aTl;
  }
  get RoleLevel() {
    return this.zGi;
  }
}
exports.WorldTeamRoleInfo = WorldTeamRoleInfo;
class OtherScenePlayerData {
  constructor(t, e, r) {
    this.PlayerId = 0;
    this.MapId = 0;
    this.Location = undefined;
    this.PlayerId = t;
    this.MapId = e;
    this.Location = Vector_1.Vector.Create(r);
  }
  SetLocation(t) {
    this.Location?.Set(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
  }
}
exports.OtherScenePlayerData = OtherScenePlayerData;
//# sourceMappingURL=OnlineHallData.js.map