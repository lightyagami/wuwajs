"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBattleTeamView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityManager_1 = require("../../Activity/ActivityManager");
const BuffItemControl_1 = require("../../BuffItem/BuffItemControl");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MiniElementItem_1 = require("../../Common/MiniElementItem");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle");
const EditFormationTabItem_1 = require("../../Common/TabComponent/TabItem/EditFormationTabItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const ExitSkillView_1 = require("../../EditFormation/View/ExitSkill/ExitSkillView");
const FormationRoleView_1 = require("../../EditFormation/View/FormationRoleView");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const OnlineController_1 = require("../../Online/OnlineController");
const QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView");
const TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView");
const RoleDefine_1 = require("../../RoleUi/RoleDefine");
const SceneTeamDefine_1 = require("../../SceneTeam/SceneTeamDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const TowerController_1 = require("../../TowerDetailUi/TowerController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const EditBattleTeamController_1 = require("../EditBattleTeamController");
class EditBattleTeamView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.l4t = [];
    this._4t = [];
    this.u4t = [25, 26, 27];
    this.c4t = 0;
    this.Ivt = undefined;
    this.SPe = undefined;
    this.m4t = false;
    this.d4t = false;
    this.C4t = e => {
      this.g4t();
      this.RefreshEnterButton();
      this.f4t();
      this.p4t();
    };
    this.v4t = e => {
      var t = ModelManager_1.ModelManager.EditBattleTeamModel;
      return !t.IsInEditBattleTeam(e) && t.CanAddRoleToEditTeam(e);
    };
    this.M4t = e => this.E4t(e);
    this.S4t = e => {
      var t;
      var o;
      var r;
      var n;
      if (this.E4t(e)) {
        BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e);
        return false;
      } else {
        o = (t = ModelManager_1.ModelManager.EditBattleTeamModel).GetCurrentEditRoleSlotData;
        r = this.K4t(e = e);
        n = t.GetParentRolePositionInEditBattleTeam(e);
        if (r !== 2 && n !== -1 && n !== o.GetPosition) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SameRole");
          return false;
        } else {
          return !t.IsMultiInstanceDungeon || o?.GetRoleConfigId !== e || !(t.GetPlayerRoleNumber(o?.GetRoleData?.PlayerId) < 2) || !(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BattleTeamCanNotDownAllRole"), 1);
        }
      }
    };
    this.y4t = e => {
      this.RefreshEnterButton();
    };
    this.I4t = e => {
      this.RefreshEnterButton();
      this.f4t();
      this.T4t(e);
    };
    this.lze = r => {
      var n = r.TargetPlayerId;
      if (!ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(n) && r.IsVisible) {
        var i = r.ContentChatRoomType === 1;
        let e = r.SenderPlayerName;
        if (i && (n = ModelManager_1.ModelManager.FriendModel.GetFriendById(n))) {
          e = n.PlayerName;
        }
        if (!this.m4t) {
          this.GetItem(9).SetUIActive(true);
          this.SPe.PlayLevelSequenceByName("NoticeIn");
          this.m4t = true;
        }
        this.SPe.PlayLevelSequenceByName("NewMassageIn");
        var n = this.GetText(10);
        var a = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === r.SenderPlayerId;
        let t = undefined;
        let o = r.Content;
        if (r.ContentType === Protocol_1.Aki.Protocol.p8n.DIs) {
          t = i ? a ? "Text_TalkToFriend_Text" : "Text_FriendTalkToMe_Text" : "Text_TeamTalk_Text";
        } else if (r.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
          var r = Number(r.Content);
          var l = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(r);
          if (!l) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Formation", 48, "表情缺少配置", ["表情Id", r]);
            }
            return;
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(n, l.Name);
          o = n.GetText();
          t = i ? a ? "Text_TalkToFriend_Text_Match" : "Text_FriendTalkToMe_Text_Match" : "Text_TeamTalk_Text_Match";
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, t, e, o);
      }
    };
    this.cF1 = () => {
      this.f4t();
    };
    this.Ozs = () => {
      this.f4t();
    };
    this.L4t = () => {
      var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime;
      for (const t of this.l4t) {
        t.SetMatchTime(e);
      }
    };
    this.D4t = (e, t) => {
      this.RefreshEnterButton();
      this.f4t();
    };
    this.R4t = e => {
      for (const t of this.l4t) {
        if ((t.GetPlayer() ?? -1) === e || e === ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo().qVn) {
          t.RefreshPrepareState();
        }
      }
    };
    this.U4t = () => {
      var e = ModelManager_1.ModelManager.EditBattleTeamModel;
      var t = e.GetLeaderIsSelf;
      var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      var r = e.GetOwnRoleCountInRoleSlot;
      if (r === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NoRole");
      } else if (e.IsInLimitRoleCount(r)) {
        if (e.IsMultiInstanceDungeon) {
          if (t) {
            if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EditBattleTeamMatching) {
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(false);
              this.RefreshEnterButton();
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SetMatchTeamMatchFlagRequest(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EditBattleTeamMatching);
            } else if (e.GetIsAllReady) {
              if (!e.HasSameRole || TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() || ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState()) {
                if (e.GetAllRoleCanAddToTeam().CanAdd) {
                  if (e.IsAllRoleDie) {
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("AllRoleDie");
                  } else if (ModelManager_1.ModelManager.InstanceDungeonModel.MatchingPlayerCount() <= 2) {
                    if (ModelManager_1.ModelManager.EditBattleTeamModel.IsMatchingTeamLackConfirmBoxCanEnterInstance) {
                      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(102)).FunctionMap.set(2, () => {
                        this.A4t();
                      });
                      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
                    } else {
                      t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(269);
                      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
                    }
                  } else {
                    this.A4t();
                  }
                } else {
                  r = e.GetCurrentFightFormation.Content;
                  t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
                }
              } else {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SameRole");
              }
            } else {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NoReady");
            }
          } else if ((r = e.GetSelfIsReady) || !e.HasSameRole || TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() || ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Formation", 48, "[EditBattleTeam]玩家{PlayerId} 请求准备游戏,是否准备:{SelfIsReady}", ["{PlayerId}", o], ["{SelfIsReady}", !r]);
            }
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeReadyRequest(!r);
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SameRole");
          }
        } else if (e.GetIsAllReady) {
          if (e.HasSameRole) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SameRole");
          } else if (!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && e.IsAllRoleDie) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("AllRoleDie");
          } else if (e.GetAllRoleCanAddToTeam().CanAdd) {
            if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
              TowerController_1.TowerController.TowerStartRequest(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor, ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0]);
            } else if (ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen()) {
              t = ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly);
              o = ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0];
              t?.RogueWeeklyStartRequest(o);
            } else {
              this.$oh();
            }
          } else {
            r = e.GetCurrentFightFormation.Content;
            t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NoReady");
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LimitCount");
      }
    };
    this.P4t = () => {
      this.g4t();
      if (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon && ModelManager_1.ModelManager.EditBattleTeamModel.GetLeaderPlayerId) {
        OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EditBattleTeamMatching ? Protocol_1.Aki.Protocol.G5s.Proto_Matching : Protocol_1.Aki.Protocol.G5s.Proto_Wait);
      }
    };
    this.x4t = () => {
      var e;
      var t = ModelManager_1.ModelManager.EditBattleTeamModel;
      if (t.IsMultiInstanceDungeon) {
        let e = 6;
        if (t.GetLeaderIsSelf) {
          e = 7;
        }
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
        t.FunctionMap.set(2, () => {
          EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        t = ModelManager_1.ModelManager.TowerModel.CheckInTower();
        e = UiManager_1.UiManager.GetViewByName("TowerFloorView");
        if (t && !e) {
          t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor);
          UiManager_1.UiManager.OpenView("TowerFloorView", t.AreaNum);
        }
        EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam();
      }
    };
    this.w4t = () => {
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(true);
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SetMatchTeamMatchFlagRequest(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EditBattleTeamMatching);
    };
    this.B4t = () => {
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      if (e - this.c4t > ModelManager_1.ModelManager.OnlineModel.ApplyCd) {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchInviteRequest();
        this.c4t = e;
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("HaveMatched");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchingInviteCd");
      }
    };
    this.b4t = () => {
      if (ModelManager_1.ModelManager.EditBattleTeamModel.IsEditBattleTeamForMowingInstance()) {
        UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId);
      } else {
        UiManager_1.UiManager.OpenView("TowerFloorDetailView");
      }
    };
    this.q4t = () => {
      TowerController_1.TowerController.TowerFormationRecommendRequest(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor).finally(() => {
        UiManager_1.UiManager.OpenView("TowerRecommendView");
      });
    };
    this.G4t = () => {
      if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
        var e = ModelManager_1.ModelManager.EditBattleTeamModel;
        var t = new Array();
        var o = e.GetAllRoleSlotData;
        if (o) {
          for (const n of o) {
            var r = n.GetRoleData;
            if (r) {
              t.push(r.ConfigId);
            }
          }
        }
        o = e.GetRoleList();
        e = new QuickRoleSelectView_1.QuickRoleSelectViewData(this.GetUseWay(), t, o);
        e.OnConfirm = this.N4t;
        e.CanConfirm = this.M1a;
        e.OnBack = this.O4t;
        e.OnHideFinish = this.P4t;
        UiManager_1.UiManager.OpenView("QuickRoleSelectView", e, (e, t) => {
          if (e) {
            this.AddChildViewById(t);
          }
        });
        this.k4t(false);
      }
    };
    this.N4t = t => {
      this.k4t(true);
      var o = ModelManager_1.ModelManager.EditBattleTeamModel;
      for (const e of o.SelfRoleSlotDataRoleIdList) {
        if (!t.includes(e)) {
          ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(e);
        }
      }
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var r;
        var n = o.GetRoleSlotData(e);
        if (n.IsProhibit) {
          n.ResetRoleData();
        } else if (e > t.length) {
          n.ResetRoleData();
        } else {
          r = t[e - 1];
          r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
          r = o.CreateRoleDataFromRoleInstance(r);
          n.SetRoleData(r);
        }
      }
      this.f4t();
    };
    this.M1a = e => {
      var t = ModelManager_1.ModelManager.EditBattleTeamModel;
      for (const r of e) {
        if (t.IsTrialRole(r)) {
          var o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(r).ParentId;
          for (const n of e) {
            if (o === n) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SameRole");
              return false;
            }
          }
        }
      }
      return true;
    };
    this.F4t = () => {
      if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
        var e = new ExitSkillView_1.ExitSkillViewData();
        for (const n of this.l4t) {
          var t = n.GetConfigId();
          var o = n.GetOnlineIndex();
          var r = n.GetPlayer();
          e.AddData(t, o, r);
        }
        UiManager_1.UiManager.OpenView("ExitSkillView", e);
      }
    };
    this.V4t = () => {
      if (!UiManager_1.UiManager.IsViewShow("ChatView")) {
        UiManager_1.UiManager.OpenView("ChatView");
      }
    };
    this.H4t = e => {
      var t = ModelManager_1.ModelManager.EditBattleTeamModel;
      if (t.GetCurrentFightFormation.ChooseRole) {
        t.SetCurrentEditPosition(e);
        var o;
        var r = t.GetRoleSlotData(e);
        if (r) {
          const n = r?.GetRoleData;
          if (n) {
            if (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon && ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() && !n.IsSelf) {
              (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(101)).FunctionMap.set(2, () => {
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.KickMatchTeamPlayerRequest(n.PlayerId);
              });
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
              return;
            }
            if (!r.CanEditRoleSlot) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BattleTeamNotMyRole");
              return;
            }
            if (!t.GetLeaderIsSelf && n?.IsReady) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BattleTeamReadyRole");
              return;
            }
          } else {
            if (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon && !ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BattleTeamNotMyRole");
              return;
            }
            if (r.IsProhibit) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BattleTeamPositionCanNotEdit");
              return;
            }
          }
          this.j4t(e);
          this.k4t(false);
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NoChangeRole");
      }
    };
    this.W4t = e => {
      var t = ModelManager_1.ModelManager.EditBattleTeamModel;
      var o = t.GetCurrentEditRoleSlotData.GetRoleData;
      if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID) {
        return false;
      }
      switch (this.K4t(e)) {
        case 2:
        case 1:
          return true;
        case 3:
          return !!o;
        default:
          return true;
      }
    };
    this.Q4t = e => {
      if (e) {
        if (this.E4t(e)) {
          return "EditBattleTeamRevive";
        }
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        var o = t.GetCurrentEditRoleSlotData;
        if (!t.CanAddRoleToEditTeam(e) && e <= RoleDefine_1.ROBOT_DATA_MIN_ID) {
          return "JoinText";
        }
        switch (this.K4t(e)) {
          case 2:
            return "GoDownText";
          case 1:
            if (o.HasRole) {
              return "ChangeText";
            } else {
              return "JoinText";
            }
          case 3:
            return "ChangeText";
          default:
            return "JoinText";
        }
      }
    };
    this.X4t = e => {
      var t = ModelManager_1.ModelManager.EditBattleTeamModel;
      var o = t.GetCurrentEditRoleSlotData;
      var r = o.GetRoleData;
      if (r && !r.IsSelf) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Formation", 48, "[EditBattleTeam]无法改变别的玩家的角色");
        }
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamLastRole");
      } else {
        this.k4t(true);
        var n = e;
        const _ = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
        if (_ && (_.IsTrialRole() || t.CanAddRoleToEditTeam(n))) {
          switch (this.K4t(n)) {
            case 2:
              if (r) {
                ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(r.ConfigId);
              }
              o.ResetRoleData();
              break;
            case 3:
              if (o) {
                var i = t.GetSlotDataByConfigId(n);
                if (!i) {
                  return;
                }
                var a = i.GetRoleData;
                if (!a) {
                  return;
                }
                var l = o.GetRoleData;
                if (!l) {
                  i.ResetRoleData();
                  return;
                }
                i.SetRoleData(l);
                o.SetRoleData(a);
                break;
              }
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("IsInTeam");
              return;
            case 4:
              return;
            default:
              {
                const _ = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
                i = _.GetLevelData();
                let e = o.GetRoleData;
                if (e) {
                  ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(e.ConfigId);
                } else {
                  e = t.CreateRoleDataFromRoleInstance(_);
                }
                e.ConfigId = n;
                e.Level = i.GetLevel();
                e.SkinId = _.GetRoleSkinId();
                o.SetRoleData(e);
                break;
              }
          }
          if (t.IsMultiInstanceDungeon) {
            e = t.GetOwnRoleConfigIdList;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Formation", 48, "[EditBattleTeam]请求改变战前编队角色:RoleConfigList", ["RoleConfigList", e]);
            }
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(t.GetOwnRoleConfigIdList[0]);
          } else {
            this.f4t();
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "点击确认编队时（选人界面）");
          }
        }
      }
    };
    this.O4t = () => {
      this.k4t(true);
    };
    this.R6e = (e, t) => {
      return new EditFormationTabItem_1.EditFormationTabItem();
    };
    this.yqe = e => {
      var t = EditFormationDefine_1.FORMATION_SPRITES[e];
      var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      var e = e + 1;
      var o = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TeamText");
      var t = new CommonTabData_1.CommonTabData(t, new CommonTabTitleData_1.CommonTabTitleData(o, e));
      t.SetSmallIcon(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TeamTitle"));
      return t;
    };
    this.$4t = e => {
      if (this.d4t) {
        this.d4t = false;
      } else {
        var e = e + 1;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Formation", 5, "当点击编队按钮时", ["formationId", e]);
        }
        var t = ModelManager_1.ModelManager.EditBattleTeamModel;
        var o = ModelManager_1.ModelManager.RoleModel;
        var r = ModelManager_1.ModelManager.EditFormationModel.GetFormationData(e)?.GetRoleIdList;
        for (const a of t.SelfRoleSlotDataRoleIdList) {
          ModelManager_1.ModelManager.TowerDefenseModel.ResetPhantomOwnerDataByConfigId(a);
        }
        for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var n;
          var i = t.GetRoleSlotData(e);
          if (r) {
            if (!i.IsProhibit && (n = r[e - 1])) {
              n = o.GetRoleDataById(n);
              n = t.CreateRoleDataFromRoleInstance(n);
              i.SetRoleData(n);
            } else {
              i.ResetRoleData();
            }
          } else {
            i.ResetRoleData();
          }
        }
        this.g4t();
        this.f4t();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "单机切换队伍时");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [4, UE.UIButtonComponent], [3, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIText], [7, UE.UIButtonComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIText], [17, UE.UISprite], [18, UE.UIButtonComponent], [19, UE.UIText], [20, UE.UIButtonComponent], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UISpriteTransition], [26, UE.UISpriteTransition], [27, UE.UISpriteTransition]];
    this.BtnBindInfo = [[4, this.U4t], [3, this.x4t], [6, this.w4t], [7, this.B4t], [14, this.b4t], [15, this.q4t], [18, this.F4t], [8, this.V4t], [20, this.G4t]];
  }
  GetExtraResourceId() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
    if (e !== undefined && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 33) {
      return "UiView_CelebrationBattleTeam";
    }
    return "UiView_BattleTeam";
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel;
    e.InitAllRoleSlotData();
    var e = e.IsMultiInstanceDungeon;
    var t = ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation();
    var o = ModelManager_1.ModelManager.EditBattleTeamModel.IsEditBattleTeamForMowingInstance();
    this.vy1();
    this.GetButton(8).RootUIComp.SetUIActive(e);
    this.GetItem(12).SetUIActive(!e && !t && !o);
    this.GetButton(14).RootUIComp.SetUIActive(t || o);
    this.GetButton(15).RootUIComp.SetUIActive(t);
    this.GetItem(13).SetUIActive(t || o);
    if (e) {
      this.GetItem(12).SetUIActive(false);
      this.GetItem(9).SetUIActive(false);
    } else if (t) {
      this.GetItem(12).SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(19), "EditBattleTeamTitle");
    } else {
      this.d4t = true;
      await this.Y4t();
    }
    this.k4t(true);
    await this.Uua();
    this.g4t();
    this.f4t();
    this.RefreshEnterButton();
    this.mGe(t);
    this.Ore();
    this.p4t();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  vy1() {
    var e = this.GetButton(20);
    if (e) {
      var t = ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
      if (t !== undefined) {
        if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)?.InstSubType === 33) {
          e.RootUIComp.SetUIActive(false);
          return;
        }
      }
      e.RootUIComp.SetUIActive(!ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon);
    }
  }
  OnBeforeDestroy() {
    for (const t of this.l4t) {
      t.Destroy();
    }
    this.l4t.length = 0;
    for (const o of this._4t) {
      o.Destroy();
    }
    this._4t.splice(0, this._4t.length);
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(false);
    var e = ModelManager_1.ModelManager.InstanceDungeonModel?.GetMatchTeamInfo();
    if (e && e.P9n !== Protocol_1.Aki.Protocol.B5s.Proto_EnterInstStart) {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveMatchTeamRequest();
    }
    var e = ModelManager_1.ModelManager.TowerModel.CheckInTower();
    if (!ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon && !e) {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep();
      ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(undefined);
    }
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.OnEditBattleViewClose();
    ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter &&= false;
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    this.kre();
    this.SPe?.Clear();
    this.SPe = undefined;
    this.d4t = false;
    if (ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction) {
      ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction = false;
      InstanceDungeonController_1.InstanceDungeonController.TeleportDungeonRequest([], false);
    }
  }
  OnStart() {
    var e;
    if (this.Ivt) {
      e = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId - 1;
      this.Ivt.SelectToggleByIndex(e);
      this.Ivt.ScrollToToggleByIndex(e);
      this.Ivt.GetTabItemByIndex(e).ShowTeamBattleTips();
    }
  }
  OnBeforeShow() {
    if (UiManager_1.UiManager.IsViewOpen("OnlineInstanceMatchTips")) {
      UiManager_1.UiManager.CloseView("OnlineInstanceMatchTips");
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1)) {
      var e = t[0];
      if (e.includes("FirstSelf")) {
        var o = ModelManager_1.ModelManager.EditBattleTeamModel;
        for (let e = 0; e < 3; e++) {
          if (o.GetRoleSlotData(e + 1)?.GetRoleData?.IsSelf) {
            return this.l4t[e]?.GetGuideUiItemAndUiItemForShowEx(t);
          }
        }
      }
      if (e.includes("FirstDangoSlot")) {
        return this.l4t[0]?.GetGuideUiItemAndUiItemForShowEx(t);
      } else {
        return undefined;
      }
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, this.C4t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshEditBattleRoleReady, this.D4t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshPlayerUiState, this.R4t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerLeaveScene, this.y4t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MatchTeamFlagChange, this.I4t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPushChatRowData, this.lze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.Ozs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssDangoSelect, this.cF1);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, this.C4t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshEditBattleRoleReady, this.D4t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshPlayerUiState, this.R4t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerLeaveScene, this.y4t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MatchTeamFlagChange, this.I4t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPushChatRowData, this.lze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.Ozs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssDangoSelect, this.cF1);
  }
  j4t(e) {
    e = this.z4t(e);
    if (e && !UiManager_1.UiManager.IsViewShow("TeamRoleSelectView")) {
      if (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon) {
        OnlineController_1.OnlineController.MatchChangePlayerUiStateRequest(Protocol_1.Aki.Protocol.G5s.Proto_Selecting);
      }
      UiManager_1.UiManager.OpenView("TeamRoleSelectView", e);
    }
  }
  GetUseWay() {
    let e = 4;
    if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
      e = 29;
    } else if (ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen()) {
      e = 39;
    }
    return e;
  }
  z4t(e) {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel;
    var o = t.GetRoleList();
    var r = t.GetRoleSlotData(e)?.GetRoleData?.ConfigId;
    var r = new TeamRoleSelectView_1.TeamRoleSelectViewData(this.GetUseWay(), r, o, this.X4t, this.O4t, e);
    r.SetGetConfirmButtonEnableFunction(this.W4t);
    r.SetGetConfirmButtonTextFunction(this.Q4t);
    r.SetHideFinishCallBack(this.P4t);
    if (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon) {
      r.SetOtherTeamSlotData(ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData);
    }
    r.SetConfirmCheckFunction(this.S4t);
    r.IsNeedRevive = this.M4t;
    r.CanJoinTeam = this.v4t;
    var n = new Array();
    for (const a of t.GetAllRoleSlotData) {
      var i = a.GetRoleData;
      if (!!i && (!t.IsMultiInstanceDungeon || i.PlayerId === ModelManager_1.ModelManager.CreatureModel.GetPlayerId())) {
        n.push(i.ConfigId);
      }
    }
    r.FormationRoleList = n;
    return r;
  }
  T4t(e) {
    if (e) {
      var e = ModelManager_1.ModelManager.EditBattleTeamModel;
      var o = e.GetAllRoleSlotData;
      var r = new Array();
      var n = e.GetLeaderPlayerId;
      let t = false;
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var i = o[e - 1];
        var a = this.Z4t(e);
        if (i && a) {
          if (i = i.GetRoleData) {
            if (i.PlayerId === n) {
              if (t) {
                r.push(a);
              } else {
                t = true;
              }
            }
          } else {
            r.push(a);
          }
        }
      }
      var l = ModelManager_1.ModelManager.InstanceDungeonModel.GetNeedMatchSize();
      const M = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
      var _ = M.MatchingTime;
      for (let e = 0; e < l; e++) {
        var s = r.pop();
        s?.SetMatchState(true);
        s?.SetMatchTime(_);
      }
      M.MatchingTime = 0;
      M.OnStopTimer = () => !M.EditBattleTeamMatching;
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(this.L4t);
    } else {
      for (const t of this.l4t) {
        t.SetMatchState(false);
      }
    }
  }
  $oh() {
    var e;
    if (ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance) {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
    } else {
      ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance = true;
      e = ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0];
      if (ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction) {
        ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction = false;
        InstanceDungeonController_1.InstanceDungeonController.TeleportDungeonRequest(e);
      } else {
        InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, e, 0, 0, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption, ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(e));
      }
    }
  }
  A4t() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "[EditBattleTeam]队长{PlayerId} 请求进入副本", ["{PlayerId}", ModelManager_1.ModelManager.PlayerInfoModel.GetId()]);
    }
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterMatchInstRequest().then(e => {
      if (e) {
        EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
      }
    }, () => {});
  }
  RefreshEnterButton() {
    var e = this.GetText(5);
    var t = this.GetButton(6).RootUIComp;
    var o = this.GetButton(7).RootUIComp;
    var r = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (r.IsMultiInstanceDungeon) {
      var n = ModelManager_1.ModelManager.InstanceDungeonModel;
      if (n.IsMatchTeamHost()) {
        var i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EditBattleTeamMatching;
        const a = i ? "EditBattleTeamCancelMatch" : "MatchingButtonLeader";
        LguiUtil_1.LguiUtil.SetLocalText(e, a);
        i = n.IsTeamNotFull() && !i;
        t.SetUIActive(i);
        i = !n.IsAllPlayerInMatchTeam();
        o.SetUIActive(i);
      } else {
        const a = r.GetSelfIsReady ? "MatchingButtonMemberCancel" : "MatchingButtonMember";
        LguiUtil_1.LguiUtil.SetLocalText(e, a);
        t.SetUIActive(false);
        o.SetUIActive(false);
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingButtonLeader");
      t.SetUIActive(false);
      o.SetUIActive(false);
    }
  }
  async Uua() {
    var e = this.GetItem(0);
    var t = this.GetItem(1);
    var o = this.GetItem(2);
    await this.e5t(e, 1);
    await this.e5t(t, 2);
    await this.e5t(o, 3);
    this.GetButton(18).RootUIComp.SetUIActive(false);
  }
  async e5t(e, t) {
    var o = new FormationRoleView_1.FormationRoleView(t);
    o.BindOnSelectRole(this.H4t);
    await o.CreateThenShowByActorAsync(e.GetOwner());
    this.l4t.push(o);
    this.t5t(t);
    o.SetCanAddRole(true);
  }
  g4t() {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel;
    t.RefreshAllEmptySlotData();
    var o = this.GetButton(18).RootUIComp;
    var r = t.GetAllRoleSlotData;
    if (r) {
      let e = false;
      for (const g of r) {
        if (g.GetRoleData) {
          e = true;
          break;
        }
      }
      o.SetUIActive(e);
      for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var n;
        var i;
        var a;
        var l;
        var _;
        var s;
        var M = r[e - 1];
        if (M && (n = this.Z4t(e))) {
          if (M.IsProhibit) {
            this.t5t(e);
            n.SetCanAddRole(false);
          } else {
            n.SetCanAddRole(true);
            i = ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon;
            if (M = M.GetRoleData) {
              a = M.ConfigId;
              l = M.Level;
              _ = M.SkinId;
              s = ModelManager_1.ModelManager.RoleModel.GetRoleName(a);
              if (i) {
                this.t5t(e, a, _, l, M.GetName(), M.OnlineIndex ?? 1, M.PlayerId);
                this.LXa(e, M.ThirdPartyOnlineId);
                n.RefreshPrepareState();
              } else {
                this.t5t(e, a, _, l, s, 0, 0);
              }
            } else {
              this.t5t(e);
              if (i) {
                n.RefreshPrepareState();
              }
            }
          }
        }
      }
      t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EditBattleTeamMatching;
      this.T4t(t);
      this.p4t();
    } else {
      o.SetUIActive(false);
    }
  }
  LXa(e, t) {
    e = this.Z4t(e);
    if (e) {
      e.RefreshPlayStationItem(t);
    }
  }
  t5t(t, o = 0, r = 0, n = 0, i = "", a = 0, l = 0) {
    var _ = t - 1;
    var t = this.Z4t(t);
    if (t) {
      _ = this.GetUiSpriteTransition(this.u4t[_]);
      let e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TeamRoleSkillNone");
      if (o) {
        t.Refresh(o, r, n, i, a, l, "");
        r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o)?.SkillId;
        if (r) {
          for (const s of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(r)) {
            if (s.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
              e = s.Icon;
              break;
            }
          }
        }
      } else {
        t.ResetRole();
      }
      this.SetSpriteTransitionByPath(e, _);
    }
  }
  f4t() {
    var e;
    var t = this.GetButton(4);
    var o = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (o.IsMultiInstanceDungeon && ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost()) {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EditBattleTeamMatching) {
        t.SetSelfInteractive(true);
      } else if (o.GetIsAllReady) {
        if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() && !TowerDefenceController_1.TowerDefenseController.CheckAllPhantomsReady()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 64, "[EditBattleTeam] 塔防队伍声骸数不足");
          }
          t.SetSelfInteractive(false);
          return;
        }
        if (ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState() && !ModelManager_1.ModelManager.DangoAbyssModel.CheckAllDangoReady()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 27, "[EditBattleTeam] 团子深渊队伍团子数不足");
          }
          t.SetSelfInteractive(false);
          return;
        }
        t.SetSelfInteractive(true);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Formation", 48, "[EditBattleTeam] 有玩家未准备");
        }
        t.SetSelfInteractive(false);
      }
    } else if (!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && o.IsAllRoleDie) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 48, "[EditBattleTeam] 全角色已死亡");
      }
      t.SetSelfInteractive(false);
    } else if (o.GetAllRoleCanAddToTeam()) {
      e = o.GetRoleCountInRoleSlot();
      if (!o.IsMultiInstanceDungeon && !TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() || o.IsInLimitRoleCount(e)) {
        if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() && !TowerDefenceController_1.TowerDefenseController.CheckAllPhantomsReady()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 64, "[EditBattleTeam] 塔防队伍声骸数不足");
          }
          t.SetSelfInteractive(false);
        } else if (ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState() && !ModelManager_1.ModelManager.DangoAbyssModel.CheckAllDangoReady()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 27, "[EditBattleTeam] 团子深渊队伍团子数不足");
          }
          t.SetSelfInteractive(false);
        } else {
          t.SetSelfInteractive(true);
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Formation", 48, "[EditBattleTeam] 角色人数不符合要求");
        }
        t.SetSelfInteractive(false);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 48, "[EditBattleTeam] 未通过副本条件检测");
      }
      t.SetSelfInteractive(false);
    }
  }
  k4t(e) {
    var t = this.GetButton(3).GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    if (t) {
      t.SetUIActive(e);
    }
  }
  Z4t(e) {
    if (!(e > this.l4t.length)) {
      return this.l4t[e - 1];
    }
  }
  K4t(e) {
    var t;
    if (e) {
      if (t = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentEditRoleSlotData) {
        if (t.GetRoleConfigId === e) {
          return 2;
        } else if (ModelManager_1.ModelManager.EditBattleTeamModel.HasSameConfigIdInAnyOwnRoleSlot(e)) {
          return 3;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    } else {
      return 4;
    }
  }
  Rd1() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
    if (e !== undefined && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 33) {
      return true;
    }
    e = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentFightFormation;
    return ModelManager_1.ModelManager.GameModeModel.IsMulti || !e.ChooseRole;
  }
  async Y4t() {
    var e;
    var t = this.GetItem(11);
    if (this.Rd1()) {
      this.GetItem(12).SetUIActive(false);
    } else {
      e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.$4t, this.yqe);
      this.Ivt = new TabComponentWithTitle_1.TabComponentWithTitle(t, e);
      await this.Ivt.RefreshTabItemAsync(EditFormationDefine_1.MAX_FORMATION_ID);
    }
  }
  E4t(e) {
    var t;
    return !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !!ModelManager_1.ModelManager.GameModeModel.IsMulti && !(t = ModelManager_1.ModelManager.EditBattleTeamModel.IsInEditBattleTeam(e), ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.IsTrialRole()) && !t && !!ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e);
  }
  mGe(t) {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel;
    var o = this.GetText(16);
    let r = undefined;
    if (t) {
      var t = ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor;
      var n = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(t);
      var t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "Text_TowerAreaFloor_Text", t, n.Floor);
      r = n.RecommendElement;
    } else {
      t = e.GetCurrentDungeonConfig;
      if (t) {
        let e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.MapName) ?? "";
        r = t.RecommendElement;
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
          e += ModelManager_1.ModelManager.OnlineModel.GetMultiInstanceRecommendLevelText(t.Id);
        }
        o?.SetText(e);
      }
    }
    n = this.GetItem(23);
    if (!r || r.length <= 0) {
      n.SetUIActive(false);
    } else {
      n.SetUIActive(true);
      var i = this.GetItem(21);
      var a = this.GetItem(22);
      for (const _ of r) {
        var l = LguiUtil_1.LguiUtil.CopyItem(a, i);
        var l = new MiniElementItem_1.MiniElementItem(_, l, l.GetOwner());
        this._4t.push(l);
      }
      a.SetUIActive(false);
    }
  }
  p4t() {
    var e = this.GetItem(24);
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (!t || ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor !== -1 || ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon) {
      e.SetUIActive(false);
    } else {
      t = ModelManager_1.ModelManager.InstanceDungeonModel.CheckPrewarFormationAverageLowLevel(t);
      e.SetUIActive(t);
    }
  }
}
exports.EditBattleTeamView = EditBattleTeamView;
//# sourceMappingURL=EditBattleTeamView.js.map