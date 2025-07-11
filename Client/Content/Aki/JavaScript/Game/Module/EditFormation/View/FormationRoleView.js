"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationRoleView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MiniElementItem_1 = require("../../Common/MiniElementItem");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const TowerCostItem_1 = require("../../TowerDetailUi/View/TowerCostItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const EditFormationDefine_1 = require("../EditFormationDefine");
const RoleFormationLikeItem_1 = require("../RoleFormationLikeItem");
const UiPanelFormationRoleDangoExtension_1 = require("../UiPanelFormationRoleDangoExtension");
const UiPanelFormationRolePhantomExtension_1 = require("../UiPanelFormationRolePhantomExtension");
class FormationRoleView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.b5t = undefined;
    this.cC = 0;
    this.q5t = undefined;
    this.Mne = undefined;
    this.G5t = undefined;
    this.N5t = undefined;
    this.O5t = undefined;
    this.k5t = undefined;
    this.Nzs = undefined;
    this.PSc = undefined;
    this.VRc = undefined;
    this.SPe = undefined;
    this.F5t = undefined;
    this.V5t = undefined;
    this.G2e = undefined;
    this.H5t = false;
    this.j5t = false;
    this.W5t = () => {
      if (this.b5t) {
        this.b5t(this.cC);
      }
    };
    this.kzs = () => {
      this.Fzs();
    };
    this.Cwc = e => {
      var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      var t = this.q5t !== undefined && this.q5t <= 0 ? t : this.q5t;
      const i = this.Mne;
      if (e.has(t) && e.get(t).findIndex(e => e === i) !== -1) {
        this.DSc();
      }
    };
    this.cC = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UISprite], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [30, UE.UIText], [29, UE.UIItem], [31, UE.UIItem], [32, UE.UIText], [33, UE.UIItem]];
    this.BtnBindInfo = [[0, this.W5t]];
  }
  BindOnSelectRole(e) {
    this.b5t = e;
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.kzs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshFormationDango, this.Cwc);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.kzs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshFormationDango, this.Cwc);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    await this.Vzs();
    await this.xSc();
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.F5t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.V5t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetTexture(6).SetAlpha(0);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    this.Nzs = undefined;
    this.PSc = undefined;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (this.Nzs && e[0].includes("FirstSelf")) {
      if (e.length < 2 || (t = this.Nzs.GetGuideUiItemAndUiItemForShowEx(e)) === undefined) {
        return undefined;
      } else {
        if (e[1] === "G") {
          t[1] = this.GetButton(0).RootUIComp;
        }
        return t;
      }
    } else if (this.PSc && e[0].includes("FirstDangoSlot")) {
      return this.PSc.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
  Refresh(e, t, i, s, o, h, n) {
    if (e && this.Mne !== e) {
      this.GetItem(5).SetUIActive(true);
      this.V5t?.StopSequenceByKey("PlayerOut", false, false);
    }
    this.U5t(e, t, i, s, h);
    this.RefreshTowerCost(e);
    this.RefreshWeeklyRogueTag();
    this.wyt(o, h);
    this.RefreshPlayStationItem(n);
    this.H5t = false;
    this.K5t(false);
    this.Fzs();
    this.DSc();
    this.GetItem(14).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
  }
  RefreshPlayStationItem(e) {
    var t = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId();
    var i = ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon || ModelManager_1.ModelManager.GameModeModel.IsMulti;
    if (t && i) {
      this.GetItem(27)?.SetUIActive(true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 27, "当前第三方信息", ["onlineId", e], ["playStationItem", this.GetItem(27)]);
      }
      if (e !== undefined && e !== "") {
        this.GetText(30)?.SetText(e);
        this.GetText(30)?.SetUIActive(true);
        this.GetItem(29)?.SetUIActive(false);
        this.GetItem(28)?.SetUIActive(true);
      } else {
        this.GetText(30)?.SetUIActive(false);
        this.GetItem(29)?.SetUIActive(true);
        this.GetItem(28)?.SetUIActive(false);
      }
    } else {
      this.GetItem(27)?.SetUIActive(false);
      this.GetText(30)?.SetUIActive(false);
      this.GetItem(29)?.SetUIActive(false);
      this.GetItem(28)?.SetUIActive(false);
    }
  }
  U5t(t, i, s, o, h) {
    this.Mne = t;
    var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    var r = i ? ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i) : undefined;
    if (n) {
      var a = this.GetText(7);
      if (a) {
        if (o === "") {
          a.SetUIActive(false);
        } else {
          a.SetUIActive(true);
          a.SetText(o);
        }
      }
      var a = n.ElementId;
      if (!this.N5t) {
        if (o = this.GetItem(9)) {
          this.N5t = new MiniElementItem_1.MiniElementItem(a, o, o.GetOwner());
        }
      }
      this.N5t?.RefreshMiniElement(a);
      const l = this.GetTexture(6);
      l.SetAlpha(0);
      if (r) {
        this.SetRoleSkinIcon(r.FormationRoleCard, l, i, undefined, () => {
          l.SetAlpha(1);
        });
      } else {
        this.SetRoleIcon(n.FormationRoleCard, l, t, undefined, () => {
          l.SetAlpha(1);
        });
      }
      o = this.GetText(8);
      if (o) {
        LguiUtil_1.LguiUtil.SetLocalText(o, "LevelShow", s);
      }
      this.GetItem(24).SetUIActive(false);
      a = !ModelManager_1.ModelManager.GameModeModel.IsMulti && !ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon && ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t).IsTrialRole();
      this.GetItem(10).SetUIActive(a);
      let e = true;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon) {
        e = h === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      }
      this.j5t = false;
      if (!!e && !a && !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
        this.j5t = ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(t);
      }
      this.GetItem(23).SetUIActive(this.j5t);
    }
  }
  wyt(t, i) {
    var s = t > 0;
    this.GetItem(11).SetUIActive(s);
    this.GetSprite(13).SetUIActive(false);
    if (s) {
      let e = undefined;
      s = i === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      e = s ? EditFormationDefine_1.SELF_ONLINE_INDEX : EditFormationDefine_1.OTHER_ONLINE_INDEX;
      this.SPe.StopSequenceByKey("LocationNotice", false, true);
      if (s && this.q5t !== i) {
        this.SPe.PlayLevelSequenceByName("LocationNotice");
      }
      s = StringUtils_1.StringUtils.Format(e, t.toString());
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
      this.SetSpriteByPath(s, this.GetSprite(12), false);
      s = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(i)?.PingState;
      this.RefreshPing(s);
    }
    this.G5t = t;
    this.q5t = i;
  }
  Reset() {
    this.SPe?.Clear();
    this.SPe = undefined;
    this.b5t = undefined;
    this.ResetRole();
  }
  GetPlayer() {
    return this.q5t;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetOnlineIndex() {
    return this.G5t;
  }
  ResetRole() {
    if (this.Mne) {
      this.F5t?.StopSequenceByKey("PlayerIn", false, false);
      this.V5t?.PlayLevelSequenceByName("PlayerOut");
    } else {
      this.GetItem(5).SetUIActive(false);
    }
    this.q5t = undefined;
    this.Mne = undefined;
    this.G5t = undefined;
    this.H5t = false;
    this.K5t(false);
    this.GetItem(11).SetUIActive(false);
    this.GetSprite(13).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(1).SetUIActive(true);
    this.DSc();
  }
  RefreshPing(e) {
    let t = undefined;
    switch (e) {
      case Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN:
        t = "SP_SignalUnknown";
        break;
      case Protocol_1.Aki.Protocol.r7s.Proto_POOR:
        t = "SP_SignalPoor";
    }
    var i;
    var e = this.GetSprite(13);
    if (t) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetSpriteByPath(i, e, false);
      e.SetUIActive(true);
    } else {
      e.SetUIActive(false);
    }
  }
  SetCanAddRole(e) {
    this.GetItem(3).SetUIActive(e);
    this.GetItem(4).SetUIActive(!e);
  }
  RefreshPrepareState() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon;
    var t = this.GetItem(14);
    var i = this.GetItem(16);
    var s = this.GetItem(23);
    i.SetUIActive(false);
    t.SetUIActive(false);
    if (e) {
      if (!ModelManager_1.ModelManager.EditBattleTeamModel.IsRoleConflict(this.q5t, this.Mne) || TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() || ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState()) {
        s.SetUIActive(this.j5t);
        e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
        if (e) {
          var o = e.qVn;
          var h = this.q5t ?? o;
          switch (ModelManager_1.ModelManager.InstanceDungeonModel.GetPlayerUiState(h)) {
            case Protocol_1.Aki.Protocol.G5s.Proto_Selecting:
              t.SetUIActive(true);
              this.GetItem(15).SetUIActive(true);
              if (this.G2e !== Protocol_1.Aki.Protocol.G5s.Proto_Selecting) {
                this.SPe.PlayLevelSequenceByName("Connecting");
              }
              this.G2e = Protocol_1.Aki.Protocol.G5s.Proto_Selecting;
              break;
            case Protocol_1.Aki.Protocol.G5s.CTs:
              if (h !== o) {
                t.SetUIActive(true);
                this.GetItem(15).SetUIActive(false);
                if (this.G2e !== Protocol_1.Aki.Protocol.G5s.CTs) {
                  this.SPe.PlayLevelSequenceByName("Match");
                }
                this.G2e = Protocol_1.Aki.Protocol.G5s.CTs;
              }
              break;
            default:
              this.G2e = Protocol_1.Aki.Protocol.G5s.Proto_Wait;
          }
        }
      } else {
        s.SetUIActive(false);
        i.SetUIActive(true);
      }
    }
  }
  SetMatchState(e) {
    if (this.H5t !== e) {
      this.H5t = e;
      if (this.Mne) {
        if (e) {
          this.F5t?.StopSequenceByKey("PlayerIn", false, false);
          this.SPe?.StopSequenceByKey("LocationNotice", false, true);
          this.V5t?.PlayLevelSequenceByName("PlayerOut");
        } else {
          this.V5t?.StopSequenceByKey("PlayerOut", false, false);
          this.SPe?.StopSequenceByKey("LocationNotice", false, true);
          if (!this.F5t?.IsPlayingSequence("PlayerIn")) {
            this.F5t?.PlayLevelSequenceByName("PlayerIn");
          }
        }
      }
      this.K5t(e);
    }
  }
  K5t(e) {
    this.GetItem(2).SetUIActive(e);
    this.GetItem(3).SetUIActive(!e);
    this.GetButton(0).SetSelfInteractive(!e);
    if (e) {
      this.F5t?.StopSequenceByKey("PlayerIn", false, true);
      this.SPe?.PlayLevelSequenceByName("Matching");
    } else {
      this.SPe?.StopSequenceByKey("Matching", false, true);
      if (this.Mne && !this.F5t?.IsPlayingSequence("PlayerIn")) {
        this.F5t?.PlayLevelSequenceByName("PlayerIn");
      }
    }
  }
  SetMatchTime(e) {
    this.GetText(22).SetText(TimeUtil_1.TimeUtil.GetTimeString(e));
  }
  RefreshWeeklyRogueTag() {
    if (ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen()) {
      this.GetItem(31).SetUIActive(ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(this.Mne));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(32), "WeeklyRogueTag");
    }
  }
  RefreshTowerCost(e) {
    if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
      var t = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(e, ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties);
      var i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor)?.Cost;
      const s = t < i;
      const o = ModelManager_1.ModelManager.TowerModel.GetFloorIncludeRole(e, ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor);
      e = s && !o;
      this.GetItem(17).SetUIActive(true);
      if (!this.O5t) {
        this.O5t = new TowerCostItem_1.TowerCostItem();
        this.O5t.CreateThenShowByActorAsync(this.GetItem(20).GetOwner()).finally(() => {
          this.O5t.SetUiActive(!s && !o);
        });
      }
      if (!this.k5t) {
        this.k5t = new TowerCostItem_1.TowerCostItem();
        this.k5t.CreateThenShowByActorAsync(this.GetItem(21).GetOwner()).finally(() => {
          this.k5t.SetUiActive(!s || o);
        });
      }
      this.GetItem(18).SetUIActive(e);
      this.GetItem(19).SetUIActive(!e);
      this.O5t.SetUiActive(!s && !o);
      this.k5t.SetUiActive(!s || o);
      if (s || o) {
        if (o) {
          this.k5t.Update(t);
        }
      } else {
        this.O5t.Update(t);
        this.k5t.Update(t - i);
      }
    } else {
      this.GetItem(17).SetUIActive(false);
    }
  }
  async xSc() {
    var e;
    var t = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
    if (t && t.InstSubType === 33) {
      t = this.GetItem(5);
      await (e = new UiPanelFormationRoleDangoExtension_1.UiPanelFormationRoleDangoExtension()).CreateThenShowByActorAsync(t.GetOwner());
      e.SetRelativeUiActive(true);
      this.PSc = e;
      this.VRc = new RoleFormationLikeItem_1.RoleFormationLikeItem();
      await this.VRc.CreateThenShowByActorAsync(this.GetItem(33).GetOwner());
      this.VRc.SetActive(false);
    }
  }
  DSc() {
    var e;
    if (this.PSc && (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId(), e = this.q5t !== undefined && this.q5t <= 0 ? e : this.q5t, this.PSc.Refresh(this.cC, this.Mne ?? 0, e), ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch())) {
      this.VRc?.SetActive(true);
      this.VRc?.Refresh(e);
    }
  }
  async Vzs() {
    var e;
    var t;
    if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()) {
      e = this.GetItem(5);
      await (t = new UiPanelFormationRolePhantomExtension_1.UiPanelFormationRolePhantomExtension(this.RootItem)).CreateThenShowByActorAsync(e.GetOwner());
      t.SetRelativeUiActive(true);
      this.Nzs = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseOnShowPhantomInFormation);
    }
  }
  Fzs() {
    var e;
    var t;
    var i;
    if (this.Nzs) {
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      t = this.q5t !== undefined && this.q5t <= 0 ? e : this.q5t;
      i = this.Mne;
      this.Nzs.PlayerId = t;
      this.Nzs.RoleCfgId = i;
      i = TowerDefenceController_1.TowerDefenseController.BuildTeamPhantomIconData(t, i);
      this.Nzs.SetIcon(i, TowerDefenceController_1.TowerDefenseController.CheckIsSelf(t));
      this.Nzs.SetRedDotActive(e === t && !i);
    }
  }
}
exports.FormationRoleView = FormationRoleView;
//# sourceMappingURL=FormationRoleView.js.map