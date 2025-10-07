"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineModel = exports.onlineDisabledSourceTipsId = exports.onlineContinuingChallengeIcon = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const OnlineHallData_1 = require("./OnlineHallData");
exports.onlineContinuingChallengeIcon = {
  [0]: "ContinuingChallengeAccept",
  1: "ContinuingChallengeRefuse",
  2: "ContinuingChallengePending"
};
exports.onlineDisabledSourceTipsId = {
  [0]: "OnlineDisabledByNonOnlineQuest",
  1: "OnlineDisabledByNonOnlinePlay",
  2: "OnlineDisabledByTrialRole",
  3: "OnlineDisabledByGravity"
};
class OnlineModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ZGi = undefined;
    this.eNi = undefined;
    this.tNi = undefined;
    this.WorldTeamPlayerFightInfo = [];
    this.iNi = Protocol_1.Aki.Protocol.Y8s.Proto_ConfirmJoin;
    this.oNi = undefined;
    this.rNi = 0;
    this.nNi = 0;
    this.sNi = 0;
    this.aNi = 0;
    this.hNi = undefined;
    this.lNi = 3;
    this._Ni = false;
    this.uNi = false;
    this.cNi = undefined;
    this.mNi = new Map();
    this.dNi = -1;
    this.CNi = -1;
    this.gNi = true;
    this.fNi = new Map();
    this.CachePlayerData = undefined;
    this.SingleTipsOpen = false;
    this.HallViewIsShowSearching = false;
    this.Ofa = (e, t) => {
      var i = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
      if (e.PlayerOriginWorldLevel > i && t.PlayerOriginWorldLevel > i || e.PlayerOriginWorldLevel <= i && t.PlayerOriginWorldLevel <= i) {
        return t.PlayerLastOfflineTime - e.PlayerLastOfflineTime;
      } else {
        return e.PlayerOriginWorldLevel - t.PlayerOriginWorldLevel;
      }
    };
    this.$Ga = new Map();
    this.OtherScenePlayerDataList = [];
    this.qh1 = true;
  }
  OnInit() {
    this.ZGi = new Array();
    this.eNi = new Array();
    this.tNi = new Array();
    this.oNi = new Map();
    this.hNi = new Map();
    this.rNi = -1;
    this.aNi = -1;
    this.nNi = CommonParamById_1.configCommonParamById.GetIntConfig("apply_valid_time");
    this.sNi = CommonParamById_1.configCommonParamById.GetIntConfig("world_level_enter_diff");
    this.cNi = new Map();
    return true;
  }
  OnClear() {
    if (this.ZGi) {
      this.ZGi.length = 0;
    }
    this.ZGi = undefined;
    if (this.eNi) {
      this.eNi.length = 0;
    }
    this.eNi = undefined;
    if (this.tNi) {
      this.tNi.length = 0;
    }
    this.tNi = undefined;
    if (this.oNi) {
      this.oNi.clear();
    }
    this.oNi = undefined;
    if (this.hNi) {
      this.hNi.clear();
    }
    this.hNi = undefined;
    this.rNi = undefined;
    this.nNi = undefined;
    this.sNi = undefined;
    this.cNi?.clear();
    this.cNi = undefined;
    if (this.mNi) {
      this.mNi.clear();
    }
    if (this.fNi) {
      this.fNi.clear();
    }
    this.dNi = -1;
    this.CNi = -1;
    return this.gNi = true;
  }
  OnLeaveLevel() {
    if (this.mNi) {
      this.mNi.clear();
    }
    this.dNi = -1;
    this.CNi = -1;
    this.gNi = true;
    this.$Ga.clear();
    return true;
  }
  OnChangeMode() {
    this.$Ga.clear();
    return true;
  }
  ClearOnlineTeamMap() {
    if (this.hNi) {
      this.hNi.clear();
    }
  }
  get StrangerWorld() {
    return this.ZGi;
  }
  get FriendWorld() {
    return this.eNi;
  }
  get SearchResult() {
    return this.tNi;
  }
  get CurrentPermissionsSetting() {
    return this.iNi;
  }
  get CurrentApply() {
    return this.oNi.get(this.rNi);
  }
  get CurrentApplyList() {
    return this.oNi;
  }
  get ApplyCd() {
    return this.nNi;
  }
  get EnterDiff() {
    return this.sNi;
  }
  get OwnerId() {
    return this.aNi;
  }
  get TeamMaxSize() {
    return this.lNi;
  }
  get ShowCanJoin() {
    return this.uNi;
  }
  get ShowFriend() {
    return this._Ni;
  }
  get ChallengeApplyPlayerId() {
    return this.dNi;
  }
  get NextInitiateTime() {
    return this.CNi;
  }
  get NextInitiateLeftTime() {
    return this.CNi - TimeUtil_1.TimeUtil.GetServerTime();
  }
  get AllowInitiate() {
    return this.gNi;
  }
  SetHallShowCanJoin(e) {
    this.uNi = e;
  }
  SetHallShowFriend(e) {
    this._Ni = e;
  }
  SetTeamOwnerId(e) {
    this.aNi = e;
  }
  SetPermissionsSetting(e) {
    this.iNi = e;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti && this.GetIsMyTeam()) {
      e = this.GetGameJoinTypeToPlayStationJoinType();
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SetPlayerSessionJoinAbleUserType(e);
    }
  }
  CleanSearchResultList() {
    this.tNi.length = 0;
  }
  CleanFriendWorldList() {
    this.eNi.length = 0;
  }
  CleanStrangerWorldList() {
    this.ZGi.length = 0;
  }
  CleanCurrentApply() {
    this.oNi.delete(this.rNi);
    this.rNi = -1;
  }
  PushSearchResultList(e) {
    this.tNi.push(e);
  }
  PushFriendWorldList(e) {
    this.eNi.push(e);
  }
  PushStrangerWorldList(e) {
    this.ZGi.push(e);
  }
  SortWorldList(e) {
    (e ? this.eNi : this.ZGi)?.sort(this.Ofa);
  }
  PushCurrentApplyList(e) {
    this.oNi.set(e.PlayerId, e);
    if (this.rNi === -1) {
      this.rNi = e.PlayerId;
    }
  }
  PushCurrentTeamList(e) {
    this.hNi.set(e.PlayerId, e);
  }
  DeleteCurrentApplyListById(t) {
    this.oNi.delete(t);
    if (this.oNi.size < 1) {
      this.rNi = -1;
    } else {
      let e = this.nNi;
      for (const [t, i] of this.oNi) {
        if (i.ApplyTimeLeftTime <= e) {
          e = i.ApplyTimeLeftTime;
          this.rNi = t;
        }
      }
    }
  }
  DeleteCurrentTeamListById(e) {
    this.hNi.delete(e);
  }
  ResetTeamDataPlayer(e) {
    for (const i of this.hNi) {
      var t = i[1];
      if (t.PlayerNumber > e) {
        t.PlayerNumber--;
      }
    }
  }
  GetCurrentApplyListById(e) {
    return this.oNi.get(e);
  }
  GetCurrentTeamListById(e) {
    return this.hNi.get(e);
  }
  GetCurrentApplyList() {
    var e;
    var t;
    var i = new Array();
    for ([e, t] of this.oNi) {
      if (e > 0) {
        i.push(t);
      }
    }
    return i.sort((e, t) => e.ApplyTimeLeftTime - t.ApplyTimeLeftTime);
  }
  GetCurrentApplySize() {
    return this.oNi.size;
  }
  GetCurrentTeamSize() {
    return this.hNi.size;
  }
  GetIsTeamModel() {
    return this.aNi !== -1;
  }
  GetIsMyTeam() {
    return ModelManager_1.ModelManager.OnlineModel.OwnerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
  }
  GetExistOnlineTeam() {
    return ModelManager_1.ModelManager.OnlineModel.OwnerId !== -1;
  }
  GetCanJoinFormStranger() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var t = new Array();
    for (const i of this.ZGi) {
      if (i.WorldLevel <= e + this.EnterDiff) {
        t.push(i);
      }
    }
    return t;
  }
  GetCanJoinFormFriend() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var t = new Array();
    for (const i of this.eNi) {
      if (this.CanJoinOtherWorld(e, i.WorldLevel)) {
        t.push(i);
      }
    }
    return t;
  }
  CanJoinOtherWorld(e, t) {
    return e + this.EnterDiff >= t;
  }
  GetTeamList() {
    var e = new Array();
    for (const t of this.hNi) {
      e.push(t[1]);
    }
    return e.sort((e, t) => e.PlayerNumber - t.PlayerNumber);
  }
  DisableOnline(t, e, i = 0, r = 0) {
    if (e) {
      let e = false;
      for (var [s] of this.cNi) {
        if (s.TreeId === i && s.NodeId === r && s.Type === t) {
          this.cNi?.set(s, t);
          e = true;
        }
      }
      if (!e) {
        this.cNi?.set({
          Type: t,
          TreeId: i,
          NodeId: r
        }, t);
      }
    } else {
      for (var [n] of this.cNi) {
        if (n.TreeId === i && n.NodeId === r && n.Type === t) {
          this.cNi?.delete(n);
        }
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnlineDisableStateChange);
  }
  IsOnlineDisabled() {
    return !!this.cNi && this.cNi.size > 0;
  }
  GetOnlineDisabledSource() {
    return this.cNi;
  }
  ClearWorldTeamPlayerFightInfo() {
    this.WorldTeamPlayerFightInfo.length = 0;
  }
  DeleteWorldTeamPlayerFightInfo(e) {
    for (const t of this.WorldTeamPlayerFightInfo) {
      if (t.PlayerId === e) {
        this.WorldTeamPlayerFightInfo.splice(this.WorldTeamPlayerFightInfo.indexOf(t), 1);
      }
    }
  }
  PushWorldTeamPlayerFightInfo(e) {
    this.WorldTeamPlayerFightInfo.push(e);
  }
  GetWorldTeamPlayerFightInfo(e) {
    for (const t of this.WorldTeamPlayerFightInfo) {
      if (t.PlayerId === e) {
        return t;
      }
    }
  }
  GetAllWorldTeamPlayer() {
    var e = new Array();
    for (const t of this.WorldTeamPlayerFightInfo) {
      e.push(t.PlayerId);
    }
    return e;
  }
  RefreshWorldTeamRoleInfo(e) {
    for (const r of e) {
      var t = this.GetWorldTeamPlayerFightInfo(r.W5n);
      if (t) {
        for (const s of r.kVn) {
          if (s.GVn === -1) {
            var i = new Array();
            for (const n of s.dUs) {
              i.push(new OnlineHallData_1.WorldTeamRoleInfo(n.Q6n, n.eI_, n.F6n));
            }
            t.RoleInfos = i;
          }
        }
      }
    }
  }
  ResetContinuingChallengeConfirmState() {
    this.mNi.clear();
    for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers()) {
      var e = t.GetPlayerId();
      this.mNi.set(e, 2);
    }
  }
  SetContinuingChallengeConfirmState(e, t) {
    this.mNi.set(e, t);
  }
  GetContinuingChallengeConfirmState(e) {
    return this.mNi.get(e);
  }
  SetChallengeApplyPlayerId(e) {
    this.dNi = e;
  }
  RefreshInitiateTime() {
    this.CNi = TimeUtil_1.TimeUtil.GetServerTime() + this.ApplyCd;
  }
  SetAllowInitiate(e) {
    this.gNi = e;
  }
  SetPlayerTeleportState(e, t) {
    this.fNi.set(e, t);
  }
  GetPlayerTeleportState(e) {
    return this.fNi.get(e);
  }
  DeletePlayerTeleportState(e) {
    this.fNi.delete(e);
  }
  ClearPlayerTeleportState() {
    this.fNi.clear();
  }
  SetRoleActivated(t, i) {
    let r = this.$Ga.get(t);
    if (i) {
      if (r) {
        for (const e of r) {
          const s = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)?.Entity;
          if (s?.Valid) {
            s.EnableByKey(0, true);
          }
        }
        this.$Ga.delete(t);
      }
    } else {
      let e = undefined;
      i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
        ParamType: 2,
        IsControl: true
      });
      if ((e = i ? ModelManager_1.ModelManager.CreatureModel.GetEntity(i.GetCreatureDataId())?.Entity : e)?.Valid) {
        if (!r) {
          r = new Set();
          this.$Ga.set(t, r);
        }
        if (!r.has(e.Id)) {
          e.DisableByKey(0, true);
          r.add(e.Id);
        }
      }
    }
  }
  RemovePlayerDisableHandles(e) {
    this.$Ga.delete(e);
  }
  GetGameJoinTypeToPlayStationJoinType() {
    let e = 0;
    switch (ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting) {
      case Protocol_1.Aki.Protocol.Y8s.Proto_ConfirmJoin:
      case Protocol_1.Aki.Protocol.Y8s.Proto_DirectJoin:
        e = 4;
        break;
      case Protocol_1.Aki.Protocol.Y8s.Proto_OnlyFriendJoin:
        e = 2;
        break;
      case Protocol_1.Aki.Protocol.Y8s.Proto_ForbidJoin:
        e = 1;
        break;
      default:
        e = 0;
    }
    return e;
  }
  ClearOtherScenePlayerDataList() {
    this.OtherScenePlayerDataList.length = 0;
  }
  DeleteOtherScenePlayerDataList(e) {
    for (const t of this.OtherScenePlayerDataList) {
      if (t.PlayerId === e) {
        this.OtherScenePlayerDataList.splice(this.OtherScenePlayerDataList.indexOf(t), 1);
      }
    }
  }
  PushOtherScenePlayerDataList(e) {
    this.OtherScenePlayerDataList.push(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScenePlayerChanged);
  }
  GetOtherScenePlayerDataByPlayerId(e) {
    for (const t of this.OtherScenePlayerDataList) {
      if (t.PlayerId === e) {
        return t;
      }
    }
  }
  SetPlayerGravityIsNormal(e) {
    if (e && (e.X !== 0 || e.Y !== 0 || e.Z !== -1)) {
      this.qh1 = false;
    } else {
      this.qh1 = true;
    }
    this.DisableOnline(3, !this.qh1);
  }
  GetMultiInstanceRecommendLevelText(e) {
    let t = "";
    var i = ModelManager_1.ModelManager.OnlineModel.OwnerId;
    var i = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(i).WorldLevel;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(e, i);
    return t = e > 0 ? "-" + StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RecommendLevel") ?? "", e.toString()) : t;
  }
}
exports.OnlineModel = OnlineModel;
//# sourceMappingURL=OnlineModel.js.map