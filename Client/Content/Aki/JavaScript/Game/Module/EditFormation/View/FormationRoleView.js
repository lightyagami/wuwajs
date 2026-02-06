"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationRoleView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MiniElementItem_1 = require("../../Common/MiniElementItem");
const RoleUtils_1 = require("../../RoleUi/RoleUtils");
const RoleTrialLabelItem_1 = require("../../RoleUi/View/RoleTrialLabelItem");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const TowerCostItem_1 = require("../../TowerDetailUi/View/TowerCostItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const EditFormationDefine_1 = require("../EditFormationDefine");
const RoleFormationLikeItem_1 = require("../RoleFormationLikeItem");
const UiPanelFormationRoleDangoExtension_1 = require("../UiPanelFormationRoleDangoExtension");
const UiPanelFormationRolePhantomExtension_1 = require("../UiPanelFormationRolePhantomExtension");
const FormationRoleDragStateItem_1 = require("./FormationRoleDragStateItem");
const HEALTH_ID = 3;
class FormationRoleView extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.b5t = undefined;
    this.OnPointDown = undefined;
    this.OnGamePadDown = undefined;
    this.OnDragStart = undefined;
    this.OnDragMove = undefined;
    this.OnDragEnd = undefined;
    this.cC = 0;
    this.q5t = undefined;
    this.Mne = undefined;
    this.BIl = undefined;
    this.G5t = undefined;
    this.N5t = undefined;
    this.O5t = undefined;
    this.k5t = undefined;
    this.Nzs = undefined;
    this.PSc = undefined;
    this.VRc = undefined;
    this.SPe = undefined;
    this.S6g = undefined;
    this.M6g = undefined;
    this.F5t = undefined;
    this.V5t = undefined;
    this.G2e = undefined;
    this.H5t = false;
    this.j5t = false;
    this.DOf = undefined;
    this.jLg = undefined;
    this.W5t = () => {
      if (!ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex) {
        if (this.b5t) {
          this.b5t(this.cC);
        }
      }
    };
    this.x3_ = undefined;
    this._fe = false;
    this.vlm = false;
    this.WLg = 0;
    this.GFo = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "FormationRoleView-OnPointerUp");
      }
      if (ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex === this.cC) {
        ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = 0;
        this._fe = false;
        this.EndShowDragItem();
        this.QLg();
      }
    };
    this.Ngo = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "FormationRoleView-OnPointerDown");
      }
      if (this.Mne && this.q5t === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
        if (ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 5, "FormationRoleView-CanDragStart-false");
          }
        } else {
          ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = this.cC;
          this._fe = true;
          this.WLg = 0;
          this.OnPointDown?.(t, this.Mne ?? 0, this.BIl ?? 0, this.cC);
        }
      }
    };
    this.GamePadPress = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "FormationRoleView-GamePadPress");
      }
      if (this.Mne && this.q5t === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
        this._fe = true;
        this.WLg = 0;
        this.OnGamePadDown?.(this.RootItem, this.Mne ?? 0, this.BIl ?? 0, this.cC);
      }
    };
    this.GamePadRelease = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "FormationRoleView-GamePadRelease");
      }
      if (this.vlm) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Formation", 5, "FormationRoleView-GamePad-DragLogic");
        }
      } else {
        if (this.b5t) {
          this.b5t(this.cC);
        }
        this.GamePadUp();
      }
    };
    this.GamePadUp = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "FormationRoleView-GamePadUp");
      }
      if (this.Mne) {
        this._fe = false;
        this.EndShowDragItem();
        this.QLg(t);
      }
    };
    this.vKe = t => {
      if (t && this.vlm) {
        this.OnDragMove?.(t);
      }
    };
    this.w$g = false;
    this.E6g = false;
    this.kzs = () => {
      this.Fzs();
    };
    this.Cwc = t => {
      var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      var i = this.q5t !== undefined && this.q5t <= 0 ? i : this.q5t;
      const e = this.Mne;
      if (t.has(i) && t.get(i).findIndex(t => t === e) !== -1) {
        this.DSc();
      }
    };
    this.rAt = (t, i) => {
      if (this.vlm && t && !Info_1.Info.IsInGamepad()) {
        this.MouseCancelDrag();
      }
    };
    this.cC = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.SpineSkeletonAnimationComponent], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UISprite], [14, UE.UISprite], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIText], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [31, UE.UIText], [30, UE.UIItem], [32, UE.UIItem], [33, UE.UIText], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UIItem], [37, UE.UIDraggableComponent], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIItem]];
    this.BtnBindInfo = [[0, this.W5t]];
  }
  BindOnSelectRole(t) {
    this.b5t = t;
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.kzs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshFormationDango, this.Cwc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.kzs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshFormationDango, this.Cwc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(super.OnBeforeStartAsync());
    t.push(this.Vzs());
    t.push(this.xSc());
    t.push(this.UOf());
    this.jLg = new FormationRoleDragStateItem_1.FormationRoleDragStateItem();
    t.push(this.jLg.CreateThenShowByActorAsync(this.GetItem(38).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.F5t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.V5t = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.S6g = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.M6g = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(7).SetAlpha(0);
    var t = this.GetDraggable(37);
    t.OnPointerCancelCallBack.Bind(this.GFo);
    t.OnPointerUpCallBack.Bind(this.GFo);
    t.OnPointerDownCallBack.Bind(this.Ngo);
    t.OnPointerDragCallBack.Bind(this.vKe);
    this.x3_ = this.GetItem(5);
  }
  MouseCancelDrag() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Formation", 5, "FormationRoleView-MouseCancelDrag");
    }
    if (this.Mne) {
      ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = 0;
      this._fe = false;
      this.EndShowDragItem();
      this.QLg(true);
    }
  }
  OnTick(t) {
    if (this._fe) {
      this.WLg += t;
      if (this.WLg > EditFormationDefine_1.FORMATION_DRAG_START_MOVE_TIME) {
        this.KLg();
      } else if (this.WLg > EditFormationDefine_1.FORMATION_DRAG_START_SHOW_TIME) {
        this.XLg();
      }
    }
  }
  XLg() {
    if (this.E6g) {
      this.S6g?.StopCurrentSequence();
      this.M6g?.PlaySequencePurely("CircleOut");
      this.E6g = false;
    }
    if (!this.w$g) {
      ControllerHolder_1.ControllerHolder.FormationDragController.SetCustomShield(false);
      this.w$g = true;
    }
    this.GetItem(40).SetUIActive(false);
    this.jLg?.SetBarFill((this.WLg - EditFormationDefine_1.FORMATION_DRAG_START_SHOW_TIME) / (EditFormationDefine_1.FORMATION_DRAG_START_MOVE_TIME - EditFormationDefine_1.FORMATION_DRAG_START_SHOW_TIME));
  }
  EndShowDragItem() {
    if (this.E6g) {
      this.S6g?.StopCurrentSequence();
      this.M6g?.PlaySequencePurely("CircleOut");
      this.E6g = false;
    }
    if (this.w$g) {
      ControllerHolder_1.ControllerHolder.FormationDragController.SetCustomShield(true);
      this.w$g = false;
    }
    this.GetItem(40).SetUIActive(false);
    this.jLg?.SetBarFill(0);
  }
  KLg() {
    if (!this.vlm) {
      this.vlm = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "FormationRoleView-StartMove");
      }
      this.EndShowDragItem();
      this.OnDragStart?.();
      this.x3_.SetUIActive(false);
      this.GetItem(1).SetUIActive(true);
      this.GetItem(1).SetAlpha(1);
      this.GetItem(3).SetUIActive(false);
    }
  }
  QLg(t) {
    if (this.Mne && this.vlm) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "FormationRoleView-StopMove");
      }
      this.vlm = false;
      this.x3_.SetUIActive(true);
      this.GetItem(1).SetAlpha(0);
      this.GetItem(3).SetUIActive(true);
      this.OnDragEnd?.(t);
    }
  }
  ShowOtherItemUpState() {
    (ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.q5t ? (this.E6g || this.vlm || (this.S6g?.PlaySequencePurely("CircleIn"), this.E6g = true), this.GetItem(40)) : this.GetItem(39)).SetUIActive(true);
  }
  RefreshLockItemState(t) {
    if (t) {
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      if ((this.Mne ?? 0) <= 0 || t !== this.q5t) {
        this.GetItem(39).SetUIActive(true);
        this.GetItem(3).SetUIActive(false);
      }
    } else {
      this.GetItem(39).SetUIActive(false);
      this.GetItem(3).SetUIActive(true);
    }
  }
  GetPlayerId() {
    return this.q5t ?? 0;
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    this.Nzs = undefined;
    this.PSc = undefined;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (this.Nzs && t[0].includes("FirstSelf")) {
      if (t.length < 2 || (i = this.Nzs.GetGuideUiItemAndUiItemForShowEx(t)) === undefined) {
        return undefined;
      } else {
        if (t[1] === "G") {
          i[1] = this.GetButton(0).RootUIComp;
        }
        return i;
      }
    } else if (this.PSc && t[0].includes("FirstDangoSlot")) {
      return this.PSc.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
  Refresh(t, i, e, s, o, h, r, n = true) {
    if (t && this.Mne !== t) {
      this.GetItem(5).SetUIActive(true);
      this.V5t?.StopSequenceByKey("PlayerOut", false, false);
    }
    this.U5t(t, i, e, s, h, n);
    this.RefreshTowerCost(t);
    this.RefreshWeeklyRogueTag();
    this.wyt(o, h);
    this.RefreshPlayStationItem(r);
    this.H5t = false;
    this.K5t(false);
    this.Fzs();
    this.DSc();
    this.GetItem(15).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
  }
  RefreshPlayStationItem(t) {
    var i = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId();
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon || ModelManager_1.ModelManager.GameModeModel.IsMulti;
    if (i && e) {
      this.GetItem(28)?.SetUIActive(true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 27, "当前第三方信息", ["onlineId", t], ["playStationItem", this.GetItem(28)]);
      }
      if (t !== undefined && t !== "") {
        this.GetText(31)?.SetText(t);
        this.GetText(31)?.SetUIActive(true);
        this.GetItem(30)?.SetUIActive(false);
        this.GetItem(29)?.SetUIActive(true);
      } else {
        this.GetText(31)?.SetUIActive(false);
        this.GetItem(30)?.SetUIActive(true);
        this.GetItem(29)?.SetUIActive(false);
      }
    } else {
      this.GetItem(28)?.SetUIActive(false);
      this.GetText(31)?.SetUIActive(false);
      this.GetItem(30)?.SetUIActive(false);
      this.GetItem(29)?.SetUIActive(false);
    }
  }
  U5t(i, e, s, o, h, r) {
    this.Mne = i;
    this.BIl = e;
    var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    var e = e ? ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(e) : undefined;
    if (n) {
      var a = this.GetText(8);
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
        if (o = this.GetItem(10)) {
          this.N5t = new MiniElementItem_1.MiniElementItem(a, o, o.GetOwner());
        }
      }
      this.N5t?.RefreshMiniElement(a);
      const l = this.GetItem(7);
      const _ = this.GetSpine(6);
      l.SetAlpha(0);
      o = (e || n).FormationSpineAtlas;
      a = (e || n).FormationSpineSkeletonData;
      const d = e ? e.SpineParam : [0, 0, 1];
      this.SetSpineAssetByPath(o, a, _).then(() => {
        l.SetAlpha(1);
        _.SetAnimation(0, "idle", true);
        l.SetAnchorOffsetX(d[0]);
        l.SetAnchorOffsetY(d[1]);
        l.SetUIItemScale(new UE.Vector(d[2], d[2], d[2]));
      });
      n = this.GetText(9);
      if (n) {
        LguiUtil_1.LguiUtil.SetLocalText(n, "LevelShow", s);
      }
      this.GetItem(25).SetUIActive(false);
      e = !ModelManager_1.ModelManager.GameModeModel.IsMulti && !ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon && ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i).IsTrialRole();
      let t = true;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon) {
        t = h === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      }
      this.j5t = false;
      if (!!t && !e && !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !ControllerHolder_1.ControllerHolder.LordGymController.IsInLordGymDungeon()) {
        this.j5t = ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(i);
        if (this.j5t) {
          o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i)?.GetAttributeData()?.GetAttrValueById(HEALTH_ID) ?? 0;
          this.j5t = o <= 0;
        }
      }
      this.GetItem(24).SetUIActive(this.j5t);
      this.xOf(i);
      this.CZf(i, r);
    }
  }
  wyt(i, e) {
    var s = i > 0;
    this.GetItem(12).SetUIActive(s);
    this.GetSprite(14).SetUIActive(false);
    if (s) {
      let t = undefined;
      s = e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      t = s ? EditFormationDefine_1.SELF_ONLINE_INDEX : EditFormationDefine_1.OTHER_ONLINE_INDEX;
      this.SPe.StopSequenceByKey("LocationNotice", false, true);
      if (s && this.q5t !== e) {
        this.SPe.PlayLevelSequenceByName("LocationNotice");
      }
      s = StringUtils_1.StringUtils.Format(t, i.toString());
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
      this.SetSpriteByPath(s, this.GetSprite(13), false);
      s = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)?.PingState;
      this.RefreshPing(s);
    }
    this.G5t = i;
    this.q5t = e;
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
    this.GetItem(12).SetUIActive(false);
    this.GetSprite(14).SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(1).SetUIActive(true);
    this.DSc();
  }
  RefreshPing(t) {
    let i = undefined;
    switch (t) {
      case Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN:
        i = "SP_SignalUnknown";
        break;
      case Protocol_1.Aki.Protocol.r7s.Proto_POOR:
        i = "SP_SignalPoor";
    }
    var e;
    var t = this.GetSprite(14);
    if (i) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      this.SetSpriteByPath(e, t, false);
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
  }
  SetCanAddRole(t) {
    this.GetItem(3).SetUIActive(t);
    this.GetItem(4).SetUIActive(!t);
  }
  RefreshPrepareState() {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon;
    var i = this.GetItem(15);
    var e = this.GetItem(17);
    var s = this.GetItem(24);
    e.SetUIActive(false);
    i.SetUIActive(false);
    if (t) {
      if (!ModelManager_1.ModelManager.EditBattleTeamModel.IsRoleConflict(this.q5t, this.Mne) || TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() || ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyssEditFormationState()) {
        s.SetUIActive(this.j5t);
        t = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
        if (t) {
          var o = t.qVn;
          var h = this.q5t ?? o;
          switch (ModelManager_1.ModelManager.InstanceDungeonModel.GetPlayerUiState(h)) {
            case Protocol_1.Aki.Protocol.G5s.Proto_Selecting:
              i.SetUIActive(true);
              this.GetItem(16).SetUIActive(true);
              if (this.G2e !== Protocol_1.Aki.Protocol.G5s.Proto_Selecting) {
                this.SPe.PlayLevelSequenceByName("Connecting");
              }
              this.G2e = Protocol_1.Aki.Protocol.G5s.Proto_Selecting;
              break;
            case Protocol_1.Aki.Protocol.G5s.CTs:
              if (h !== o) {
                i.SetUIActive(true);
                this.GetItem(16).SetUIActive(false);
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
        e.SetUIActive(true);
      }
    }
  }
  SetMatchState(t) {
    if (this.H5t !== t) {
      this.H5t = t;
      if (this.Mne) {
        if (t) {
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
      this.K5t(t);
    }
  }
  K5t(t) {
    this.GetItem(2).SetUIActive(t);
    this.GetItem(3).SetUIActive(!t);
    this.GetButton(0).SetSelfInteractive(!t);
    if (t) {
      this.F5t?.StopSequenceByKey("PlayerIn", false, true);
      this.SPe?.PlayLevelSequenceByName("Matching");
    } else {
      this.SPe?.StopSequenceByKey("Matching", false, true);
      if (this.Mne && !this.F5t?.IsPlayingSequence("PlayerIn")) {
        this.F5t?.PlayLevelSequenceByName("PlayerIn");
      }
    }
  }
  SetMatchTime(t) {
    this.GetText(23).SetText(TimeUtil_1.TimeUtil.GetTimeString(t));
  }
  RefreshWeeklyRogueTag() {
    if (ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen()) {
      this.GetItem(32).SetUIActive(ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(this.Mne));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(33), "WeeklyRogueTag");
    }
  }
  RefreshTowerCost(t) {
    if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
      var i = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(t, ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties);
      var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor)?.Cost;
      const s = i < e;
      const o = ModelManager_1.ModelManager.TowerModel.GetFloorIncludeRole(t, ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor);
      t = s && !o;
      this.GetItem(18).SetUIActive(true);
      if (!this.O5t) {
        this.O5t = new TowerCostItem_1.TowerCostItem();
        this.O5t.CreateThenShowByActorAsync(this.GetItem(21).GetOwner()).finally(() => {
          this.O5t.SetUiActive(!s && !o);
        });
      }
      if (!this.k5t) {
        this.k5t = new TowerCostItem_1.TowerCostItem();
        this.k5t.CreateThenShowByActorAsync(this.GetItem(22).GetOwner()).finally(() => {
          this.k5t.SetUiActive(!s || o);
        });
      }
      this.GetItem(19).SetUIActive(t);
      this.GetItem(20).SetUIActive(!t);
      this.O5t.SetUiActive(!s && !o);
      this.k5t.SetUiActive(!s || o);
      if (s || o) {
        if (o) {
          this.k5t.Update(i);
        }
      } else {
        this.O5t.Update(i);
        this.k5t.Update(i - e);
      }
    } else {
      this.GetItem(18).SetUIActive(false);
    }
  }
  async xSc() {
    var t;
    var i = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
    if (i && i.InstSubType === 33) {
      i = this.GetItem(5);
      await (t = new UiPanelFormationRoleDangoExtension_1.UiPanelFormationRoleDangoExtension()).CreateThenShowByActorAsync(i.GetOwner());
      t.SetRelativeUiActive(true);
      this.PSc = t;
      this.VRc = new RoleFormationLikeItem_1.RoleFormationLikeItem();
      await this.VRc.CreateThenShowByActorAsync(this.GetItem(34).GetOwner());
      this.VRc.SetActive(false);
    }
  }
  DSc() {
    var t;
    if (this.PSc && (t = ModelManager_1.ModelManager.PlayerInfoModel.GetId(), t = this.q5t !== undefined && this.q5t <= 0 ? t : this.q5t, this.PSc.Refresh(this.cC, this.Mne ?? 0, t), ModelManager_1.ModelManager.DangoAbyssModel.CheckIsInMatch())) {
      this.VRc?.SetActive(true);
      this.VRc?.Refresh(t);
    }
  }
  async Vzs() {
    var t;
    var i;
    if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()) {
      t = this.GetItem(5);
      await (i = new UiPanelFormationRolePhantomExtension_1.UiPanelFormationRolePhantomExtension(this.RootItem)).CreateThenShowByActorAsync(t.GetOwner());
      i.SetRelativeUiActive(true);
      this.Nzs = i;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseOnShowPhantomInFormation);
    }
  }
  Fzs() {
    var t;
    var i;
    var e;
    if (this.Nzs) {
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      i = this.q5t !== undefined && this.q5t <= 0 ? t : this.q5t;
      e = this.Mne;
      this.Nzs.PlayerId = i;
      this.Nzs.RoleCfgId = e;
      e = TowerDefenceController_1.TowerDefenseController.BuildTeamPhantomIconData(i, e);
      this.Nzs.SetIcon(e, TowerDefenceController_1.TowerDefenseController.CheckIsSelf(i));
      this.Nzs.SetRedDotActive(t === i && !e);
    }
  }
  async UOf() {
    this.DOf = new RoleTrialLabelItem_1.RoleTrialLabelItem();
    await this.DOf.CreateThenShowByActorAsync(this.GetItem(35).GetOwner());
    this.DOf.SetActive(false);
  }
  xOf(t) {
    if (!RoleUtils_1.RoleUtils.IsTrialRole(t) || RoleUtils_1.RoleUtils.GetTrialRoleType(t) === 0) {
      this.DOf?.SetUiActive(false);
    } else {
      this.DOf?.SetUiActive(true);
      this.DOf?.Refresh(t);
    }
  }
  CZf(t, i) {
    var e = this.GetItem(36);
    if (RoleUtils_1.RoleUtils.IsSpecialTrialRole(t)) {
      if (i) {
        e.SetUIActive(false);
        if ((i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
          ParamType: 0,
          OnlyMyRole: true
        })) && i.EntityHandle && i.EntityHandle.Entity) {
          this.j5t = ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(t);
        } else {
          i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)?.GetAttributeData()?.GetAttrValueById(HEALTH_ID) ?? 0;
          this.j5t = i <= 0;
        }
        this.GetItem(24).SetUIActive(this.j5t);
      } else {
        e.SetUIActive(true);
      }
    } else {
      e.SetUIActive(false);
    }
  }
}
exports.FormationRoleView = FormationRoleView;
//# sourceMappingURL=FormationRoleView.js.map