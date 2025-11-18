"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiModel = undefined;
const puerts_1 = require("puerts");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const BattleUiAudioData_1 = require("./BattleUiAudioData");
const BattleUiChildViewData_1 = require("./BattleUiChildViewData");
const BattleUiEnvironmentKeyData_1 = require("./BattleUiEnvironmentKeyData");
const BattleUiExploreModeData_1 = require("./BattleUiExploreModeData");
const BattleUiFloatTipsData_1 = require("./BattleUiFloatTipsData");
const BattleUiFormationData_1 = require("./BattleUiFormationData");
const BattleUiFormationPanelData_1 = require("./BattleUiFormationPanelData");
const BattleUiMergeHeadStateData_1 = require("./BattleUiMergeHeadStateData");
const BattleUiPureModeData_1 = require("./BattleUiPureModeData");
const BattleUiRoleData_1 = require("./BattleUiRoleData");
const BattleUiSpecialEnergyBarData_1 = require("./BattleUiSpecialEnergyBarData");
const FullScreenEffectHandle_1 = require("./FullScreenEffectHandle");
const LevelUpCacheData_1 = require("./LevelUpCacheData");
const MissionViewRuleConfig_1 = require("./Views/BattleChildViewPanel/MissionViewRuleConfig");
const HeadStateCommonParam_1 = require("./Views/HeadState/HeadStateCommonParam");
class BattleUiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.pXe = new Map();
    this.vXe = undefined;
    this.FormationData = undefined;
    this.SpecialEnergyBarData = undefined;
    this.ChildViewData = undefined;
    this.FloatTipsData = undefined;
    this.AudioData = undefined;
    this.ExploreModeData = undefined;
    this.MergeHeadStateData = undefined;
    this.EnvironmentKeyData = undefined;
    this.FormationPanelData = undefined;
    this.PureModeData = undefined;
    this.MXe = [];
    this.EXe = [];
    this.SXe = true;
    this.IsMissionPanelVisible = true;
    this.yXe = undefined;
    this.IXe = new Map();
    this.HeadStateCommonParam = undefined;
    this.TXe = undefined;
    this.ThreatLevel1 = 0;
    this.ThreatLevel3 = 0;
    this.ThreatLevelColor1 = "";
    this.ThreatLevelColor2 = "";
    this.ThreatLevelColor3 = "";
    this.IsOpenJoystickLog = false;
    this.ConcertoChangeEffectDelay = 0;
    this.LXe = undefined;
    this.CursorCameraRotatorOffset = Rotator_1.Rotator.Create(0, 0, 0);
    this.ResetAddRotator = Rotator_1.Rotator.Create(0, 0, 0);
    this.CursorCameraRotationTime = 0;
    this.DXe = (0, puerts_1.$ref)(0);
    this.RXe = (0, puerts_1.$ref)(0);
    this.ViewportSize = Vector2D_1.Vector2D.Create();
    this.ScreenPositionScale = 0;
    this.ScreenPositionOffset = Vector2D_1.Vector2D.Create();
    this.IsLongPressExploreButton = false;
    this.IsPressJoyStick = false;
    this.UXe = false;
    this.AXe = false;
    this.PXe = false;
    this.IsInBattleSettlement = false;
    this.xXe = false;
    this.VKa = false;
    this.IsShowingMissionViewItems = undefined;
    this._$1 = undefined;
    this.TrackDatas = new Map();
    this.TreeIncIdHandle = undefined;
    this.TreeHandle = undefined;
    this.o2d = false;
    this.TimeDilationSkillMaxTime = 0;
    this.TimeDilationSkillCdTime = 0;
    this.TimeDilationSkillRatio = 0;
    this.TimeDilationCoolDownStartTime = 0;
    this.n2d = undefined;
    this.CurrentTimeDilationSkillState = 0;
    this.Hn1 = new Map();
    this.wXe = undefined;
    this.vMm = false;
    this.BXe = false;
    this.bXe = undefined;
    this.qXe = undefined;
    this.GXe = () => {
      if (this.vMm) {
        this.vMm = false;
        this.wXe = TimerSystem_1.TimerSystem.Next(this.GXe, BattleUiModel.jXe);
      } else {
        this.wXe = undefined;
        if (this.BXe) {
          this.NXe();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.bXe, this.qXe);
          this.BXe = false;
          this.bXe = undefined;
          this.qXe = undefined;
        }
      }
    };
    this.WHa = 1;
    this.JZe = (t, e) => {
      if (this.TreeIncIdHandle === t) {
        this.TreeIncIdHandle = undefined;
        this.TreeHandle = undefined;
      }
    };
    this.eet = t => {
      var e;
      if (t.DataSource === 0 && (e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.Id)) && e.GetSilentAreaShowInfo()) {
        this.TreeIncIdHandle = t.Id;
        this.TreeHandle = e;
      }
    };
    this.HQe = t => {
      if (this._$1) {
        var e;
        var i;
        var s = [];
        for ([e, i] of this._$1) {
          if (i && i.DataSource === 0 && i.Id === t) {
            s.push(e);
          }
        }
        for (const a of s) {
          this.SetMissionViewData(a, undefined);
        }
      }
    };
    this.Idm = new MissionViewRuleConfig_1.DefaultTrackingRule();
    this.Tdm = new MissionViewRuleConfig_1.DefaultTrackingRule();
    this.GuestId = 0;
    this.GuestEffect = false;
    this.gH1 = undefined;
    this.CH1 = undefined;
    this.pJ1 = new Map();
  }
  OnInit() {
    this.HeadStateCommonParam = new HeadStateCommonParam_1.HeadStateCommonParam();
    this.HeadStateCommonParam.Init();
    this.TXe = new Array();
    for (let t = 0; t <= 6; t++) {
      this.TXe[t] = CommonParamById_1.configCommonParamById.GetStringConfig("MonsterBarColor" + t);
    }
    this.ThreatLevel1 = CommonParamById_1.configCommonParamById.GetIntConfig("ThreatLevel1");
    this.ThreatLevel3 = CommonParamById_1.configCommonParamById.GetIntConfig("ThreatLevel3");
    this.ThreatLevelColor1 = CommonParamById_1.configCommonParamById.GetStringConfig("ThreatLevelColor1");
    this.ThreatLevelColor2 = CommonParamById_1.configCommonParamById.GetStringConfig("ThreatLevelColor2");
    this.ThreatLevelColor3 = CommonParamById_1.configCommonParamById.GetStringConfig("ThreatLevelColor3");
    this.ConcertoChangeEffectDelay = CommonParamById_1.configCommonParamById.GetIntConfig("ConcertoChangeEffectDelay");
    this.LXe = new Map([[0, CommonParamById_1.configCommonParamById.GetStringConfig("PlayerHeadStateHpColor")], [1, CommonParamById_1.configCommonParamById.GetStringConfig("MonsterHeadStateHpColor")], [2, CommonParamById_1.configCommonParamById.GetStringConfig("CommonFriendHeadStateHpColor")], [3, CommonParamById_1.configCommonParamById.GetStringConfig("LiuFangZheEnemyHeadStateHpColor")], [4, CommonParamById_1.configCommonParamById.GetStringConfig("LiuFangZheFriendHeadStateHpColor")], [5, CommonParamById_1.configCommonParamById.GetStringConfig("AttackAnimyHeadStateHpColor")], [6, CommonParamById_1.configCommonParamById.GetStringConfig("UnAttackAnimyHeadStateHpColor")], [7, CommonParamById_1.configCommonParamById.GetStringConfig("CommonEnemyHeadStateHpColor")], [14, CommonParamById_1.configCommonParamById.GetStringConfig("YeguiHeadStateHpColor")], [16, CommonParamById_1.configCommonParamById.GetStringConfig("MonsterHeadStateHpColor")]]);
    this.CursorCameraRotatorOffset.Yaw = CommonParamById_1.configCommonParamById.GetIntConfig("YawOffset");
    this.CursorCameraRotatorOffset.Pitch = CommonParamById_1.configCommonParamById.GetIntConfig("PitchOffset");
    this.CursorCameraRotatorOffset.Roll = CommonParamById_1.configCommonParamById.GetIntConfig("RollOffset");
    this.CursorCameraRotationTime = CommonParamById_1.configCommonParamById.GetIntConfig("RotationTime") / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.TimeDilationSkillMaxTime = CommonParamById_1.configCommonParamById.GetFloatConfig("PhotoFightTimeSlowMaxLast");
    this.TimeDilationSkillCdTime = CommonParamById_1.configCommonParamById.GetFloatConfig("PhotoFightTimeSlowCooldownTime");
    this.TimeDilationSkillRatio = CommonParamById_1.configCommonParamById.GetFloatConfig("PhotoFightTimeSlowEffectRatio");
    this.yXe = BigInt(0);
    this.InitHeadIconEnergyBarConfig();
    this.FormationData = new BattleUiFormationData_1.BattleUiFormationData();
    this.FormationData.Init();
    this.SpecialEnergyBarData = new BattleUiSpecialEnergyBarData_1.BattleUiSpecialEnergyBarData();
    this.SpecialEnergyBarData.Init();
    this.ChildViewData = new BattleUiChildViewData_1.BattleUiChildViewData();
    this.ChildViewData.Init();
    this.FloatTipsData = new BattleUiFloatTipsData_1.BattleUiFloatTipsData();
    this.FloatTipsData.Init();
    this.AudioData = new BattleUiAudioData_1.BattleUiAudioData();
    this.AudioData.Init();
    this.ExploreModeData = new BattleUiExploreModeData_1.BattleUiExploreModeData();
    this.ExploreModeData.Init();
    this.MergeHeadStateData = new BattleUiMergeHeadStateData_1.BattleUiMergeHeadStateData();
    this.MergeHeadStateData.Init();
    this.EnvironmentKeyData = new BattleUiEnvironmentKeyData_1.BattleUiEnvironmentKeyData();
    this.EnvironmentKeyData.Init();
    this.FormationPanelData = new BattleUiFormationPanelData_1.BattleUiFormationPanelData();
    this.FormationPanelData.Init();
    this.PureModeData = new BattleUiPureModeData_1.BattleUiPureModeData();
    this.PureModeData.Init();
    this.IsShowingMissionViewItems = new Map();
    this._$1 = new Map();
    this.CurrentTimeDilationSkillState = 0;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.eet);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.HQe);
    return true;
  }
  async Preload() {
    if (!this.UXe) {
      await this.SpecialEnergyBarData.Preload();
      this.UXe = true;
    }
    return true;
  }
  GetHeadStateHpColor(t) {
    return this.LXe.get(t);
  }
  GetPropertyColor(t) {
    return this.TXe[t];
  }
  OnLeaveLevel() {
    this.UXe = false;
    this.FormationData.OnLeaveLevel();
    this.SpecialEnergyBarData.OnLeaveLevel();
    this.ChildViewData.OnLeaveLevel();
    this.FloatTipsData.OnLeaveLevel();
    this.AudioData.OnLeaveLevel();
    this.ExploreModeData.OnLeaveLevel();
    this.MergeHeadStateData.OnLeaveLevel();
    this.EnvironmentKeyData.OnLeaveLevel();
    this.UXe = false;
    this.IsInBattleSettlement = false;
    return !(this.xXe = false);
  }
  OnClear() {
    this.OXe();
    this.kXe();
    this.ClearAllLevelUpCacheData();
    this.IXe.clear();
    this.HeadStateCommonParam = undefined;
    this.TXe = undefined;
    this.FormationData.Clear();
    this.FormationData = undefined;
    this.SpecialEnergyBarData.Clear();
    this.SpecialEnergyBarData = undefined;
    this.ChildViewData.Clear();
    this.ChildViewData = undefined;
    this.FloatTipsData.Clear();
    this.FloatTipsData = undefined;
    this.AudioData.Clear();
    this.AudioData = undefined;
    this.ExploreModeData.Clear();
    this.ExploreModeData = undefined;
    this.MergeHeadStateData.Clear();
    this.MergeHeadStateData = undefined;
    this.EnvironmentKeyData.Clear();
    this.EnvironmentKeyData = undefined;
    this.FormationPanelData.Clear();
    this.FormationPanelData = undefined;
    this.PureModeData.Clear();
    this.PureModeData = undefined;
    this.IsShowingMissionViewItems?.clear();
    this.ClearMissionViewData();
    this.TrackDatas?.clear();
    this.Hn1.clear();
    this.pJ1.clear();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.eet);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.HQe);
    return true;
  }
  OnWorldDone() {
    this.ExploreModeData?.UpdateDungeonState();
  }
  TryBroadcastRoleLevelUpData(t, e, i) {
    if (UiManager_1.UiManager.IsViewShow("BattleView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFormationPlayLevelUp, t, e, i);
    } else {
      this.AddLevelUpCacheData(t, e, i);
    }
  }
  TryBroadcastCacheRoleLevelUpData() {
    if (UiManager_1.UiManager.IsViewShow("BattleView")) {
      for (const s of this.MXe) {
        var t = s.ConfigId;
        var e = s.Exp;
        var i = s.Level;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFormationPlayLevelUp, t, e, i);
      }
      this.ClearAllLevelUpCacheData();
    }
  }
  AddLevelUpCacheData(t, e, i) {
    t = new LevelUpCacheData_1.LevelUpCacheData(t, e, i);
    this.MXe.push(t);
  }
  ClearAllLevelUpCacheData() {
    this.MXe.length = 0;
  }
  TryBroadcastRevive(t) {
    if (UiManager_1.UiManager.IsViewShow("BattleView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFormationPlayRevive, [t]);
    } else {
      this.AddReviveEntityIdList(t);
    }
  }
  TryBroadcastCacheRevive() {
    if (UiManager_1.UiManager.IsViewShow("BattleView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFormationPlayRevive, this.EXe);
      this.ClearReviveEntityIdList();
    }
  }
  AddReviveEntityIdList(t) {
    this.EXe.push(t);
  }
  ClearReviveEntityIdList() {
    this.EXe.length = 0;
  }
  GetIsBossStateVisible() {
    return this.SXe;
  }
  GetFullScreenEffect(t) {
    return this.IXe.get(t);
  }
  AddFullScreenEffect(t, e) {
    let i = undefined;
    i = e === undefined ? this.yXe-- : e;
    e = this.GetFullScreenEffect(i);
    if (!e) {
      e = new FullScreenEffectHandle_1.FullScreenEffectHandle(i, t);
      this.IXe.set(i, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddFullScreenEffect, e);
    }
    return e;
  }
  RemoveFullScreenEffect(t) {
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveFullScreenEffect, t);
      t = t.UniqueId;
      this.IXe.delete(t);
    }
  }
  RemoveFullScreenEffectByUniqueId(t) {
    t = this.IXe.get(t);
    this.RemoveFullScreenEffect(t);
  }
  ClearFullScreenEffect() {
    this.IXe.clear();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClearFullScreenEffect);
  }
  UpdateViewPortSize() {
    Global_1.Global.CharacterController.GetViewportSize(this.DXe, this.RXe);
    var t = (0, puerts_1.$unref)(this.DXe);
    var e = (0, puerts_1.$unref)(this.RXe);
    this.ViewportSize.Set(t, e);
    var e = UiLayer_1.UiLayer.UiRootItem;
    if (e) {
      this.ScreenPositionScale = e.GetWidth() / t;
      this.ScreenPositionOffset.Set(-e.GetWidth() * 0.5, -e.GetHeight() * 0.5);
    }
  }
  GetRoleData(t) {
    return this.pXe.get(t);
  }
  GetCurRoleData() {
    return this.vXe;
  }
  OnChangeRole(t, e) {
    let i = false;
    for (const s of this.pXe.values()) {
      if (t === s.EntityHandle) {
        s.OnChangeRole(true);
        this.vXe = s;
        i = true;
      } else {
        s.OnChangeRole(false);
      }
    }
    if (!i) {
      this.vXe = this.FXe(t, true);
    }
    this.BXe = true;
    this.bXe = t?.Id;
    this.qXe = e?.Id;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.bXe, this.qXe ?? 0);
    this.vMm = true;
    this.VXe();
    this.RefreshAllRoleSpecialState();
  }
  OnFormationLoaded() {
    this.FormationPanelData.UpdateFormationPanelData();
    this.HXe();
    this.ClearFullScreenEffect();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiAllRoleDataChanged);
  }
  OnAddEntity(t) {
    this.MergeHeadStateData.OnAddEntity(t);
  }
  OnRemoveEntity(t) {
    var e = this.pXe.get(t.Id);
    if (e) {
      this.pXe.delete(t.Id);
      e.Clear();
      if (this.vXe === e) {
        this.vXe = undefined;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiRemoveRoleData, t.Entity);
    }
    this.MergeHeadStateData.OnRemoveEntity(t);
  }
  HXe() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      if (s === t) {
        this.vXe = this.FXe(s, true);
      } else {
        this.FXe(s, false);
      }
    }
    var e = this.FormationPanelData?.PositionItemMap?.values();
    if (e) {
      for (const a of e) {
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(a.CreatureDataId);
        if (i?.Valid) {
          this.FXe(i, false, false);
        }
      }
    }
  }
  FXe(t, e, i = true) {
    let s = this.pXe.get(t.Id);
    if (s) {
      if (i && s.IsCurEntity !== e) {
        s.OnChangeRole(e);
      }
    } else {
      (s = new BattleUiRoleData_1.BattleUiRoleData()).Init(t, e);
      this.pXe.set(t.Id, s);
    }
    return s;
  }
  kXe() {
    for (const t of this.pXe.values()) {
      t.Clear();
    }
    this.pXe.clear();
  }
  VXe() {
    this.wXe ||= TimerSystem_1.TimerSystem.Next(this.GXe, BattleUiModel.jXe);
  }
  OXe() {
    if (!this.wXe) {
      if (TimerSystem_1.TimerSystem.Has(this.wXe)) {
        TimerSystem_1.TimerSystem.Remove(this.wXe);
      }
      this.wXe = undefined;
      this.vMm = false;
      this.BXe = false;
      this.bXe = undefined;
      this.qXe = undefined;
    }
  }
  NXe() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t?.RoleBattleViewInfo) {
      this.ChildViewData.SetChildVisible(3, 4, t.RoleBattleViewInfo.MiniMapVisible);
      this.ChildViewData.SetChildVisible(3, 3, t.RoleBattleViewInfo.TopButtonVisible);
      this.ChildViewData.SetChildVisible(3, 2, t.RoleBattleViewInfo.HomeButtonVisible);
      this.ChildViewData.SetChildVisible(3, 11, t.RoleBattleViewInfo.RoleStateVisible);
      this.ChildViewData.SetChildVisible(3, 6, t.RoleBattleViewInfo.ChatVisible);
      this.ChildViewData.SetChildVisible(3, 7, t.RoleBattleViewInfo.FormationVisible);
      this.ChildViewData.SetChildVisible(3, 8, t.RoleBattleViewInfo.FormationVisible);
      this.ChildViewData.SetChildVisible(3, 10, t.RoleBattleViewInfo.JoystickType !== 1);
    } else {
      this.ChildViewData.SetChildVisible(3, 4, true);
      this.ChildViewData.SetChildVisible(3, 3, true);
      this.ChildViewData.SetChildVisible(3, 2, true);
      this.ChildViewData.SetChildVisible(3, 11, true);
      this.ChildViewData.SetChildVisible(3, 6, true);
      this.ChildViewData.SetChildVisible(3, 7, true);
      this.ChildViewData.SetChildVisible(3, 8, true);
      this.ChildViewData.SetChildVisible(3, 10, true);
    }
  }
  SetIsDynamicJoystick(t) {
    this.AXe = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetJoystickMode, t);
  }
  GetIsDynamicJoystick() {
    return this.AXe;
  }
  SetIsAutoSwitchSkillButtonMode(t) {
    this.PXe = t;
    this.ExploreModeData?.SetAutoSwitch(t);
  }
  GetIsAutoSwitchSkillButtonMode() {
    return this.PXe;
  }
  SetExecutionInteractEnable(t) {
    this.xXe = t;
    ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.SetInteractExist(t, 1);
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  ExistBattleInteract() {
    return this.xXe;
  }
  get ChatScrollViewVisible() {
    return this.VKa;
  }
  set ChatScrollViewVisible(t) {
    if (this.VKa !== t) {
      this.VKa = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiChatScrollViewVisibleChanged);
    }
  }
  IsEnableChangeInputControllerOnMobile() {
    return !ModelManager_1.ModelManager.PanelQteModel.IsInQte;
  }
  SetBattleUiAlpha(t) {
    if (this.WHa !== t) {
      this.WHa = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiAlphaChanged, t);
    }
  }
  GetBattleUiAlpha() {
    return this.WHa;
  }
  ShowTypeChange(t, e) {
    this.PureModeData?.ShowTypeChange(t, e);
  }
  GetAllMissionViewData() {
    return this._$1;
  }
  GetMissionViewData(t) {
    return this._$1?.get(t);
  }
  ClearMissionViewData() {
    if (this._$1) {
      for (var [t] of this._$1) {
        this.SetMissionViewData(t, undefined);
      }
    }
  }
  SetMissionViewData(t, e) {
    var i;
    var s;
    if (this._$1) {
      if (e) {
        this._$1.set(t, e);
        if (e.DataSource === 0 && (i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.Id))) {
          i.IsPendingDestroy = true;
        }
      } else {
        if ((i = this._$1.get(t)) && i.DataSource === 0 && (s = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(i.Id))) {
          s.IsPendingDestroy = false;
          ModelManager_1.ModelManager.GeneralLogicTreeModel.TryToRemovePendingDestroy(i.Id);
        }
        this._$1.delete(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BattleUiSet", 18, "BattleUiModel.SetMissionViewData 失败, MissionViewData还未初始化", ["viewType", t], ["showData", e]);
    }
  }
  bdm(t) {
    var e;
    if (t === undefined) {
      this.Idm = this.Rdm();
    } else if (e = this.GetRuleById(t)) {
      this.Idm = e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BattleUiSet", 78, "设置追踪显示规则失败，规则id不存在", ["ruleId", t]);
      }
      this.Idm = this.Rdm();
    }
  }
  Rdm() {
    let t = this.Tdm;
    let e = this.Tdm.Priority;
    for (const i of MissionViewRuleConfig_1.specialDungeonRules) {
      if (i.Enabled && i.Priority > e) {
        e = i.Priority;
        t = i;
      }
    }
    return t;
  }
  GetRuleById(t) {
    for (const e of this.GetAllRule()) {
      if (e.Id === t) {
        if (e.Enabled) {
          return e;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BattleUiSet", 78, "追踪显示规则未激活", ["ruleId", t]);
        }
      }
    }
  }
  GetAllRule() {
    return [this.Tdm, ...MissionViewRuleConfig_1.specialDungeonRules];
  }
  CheckAndUpdateRule() {
    this.Idm = this.Rdm();
  }
  SafeSwitchMissionRule(t, e = false) {
    var i;
    var s = t ? this.GetRuleById(t) : this.Rdm();
    if (s) {
      if (s.Id === this.Idm.Id) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BattleUiSet", 78, "追踪显示规则相同，无需更新", ["ruleId", t]);
        }
      } else {
        i = this.GetAllMissionViewData();
        this.bdm(s.Id);
        if (e) {
          this.wdm(i);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BattleUiSet", 78, "追踪显示规则不存在", ["ruleId", t]);
    }
  }
  wdm(t) {
    if (t && t.size !== 0) {
      var e;
      var i;
      var s;
      var a = new Map();
      var o = new Map();
      for ([e, i] of t) {
        if (i) {
          if ((s = this.CheckMissionViewItem(i)) !== undefined) {
            a.set(s, i);
            o.set(s, true);
          } else {
            a.set(e, i);
            o.set(e, false);
          }
        }
      }
      this._$1 = a;
      this.IsShowingMissionViewItems = o;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MissionTrackRuleChange);
    }
  }
  CheckMissionViewItem(t, e) {
    return this.Idm.CustomTypeCheck(t, e);
  }
  SortMissionViewItem(t) {
    this.Idm.SortShowData(t);
  }
  AddGuest(t) {
    this.GuestId = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGuest);
  }
  RemoveGuest(t) {
    if (this.GuestId !== 0) {
      if (this.GuestId !== t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Plot", 26, "GuestId不匹配，移除失败", ["guestId", t], ["curGuestId", this.GuestId]);
        }
      } else {
        this.GuestId = 0;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGuest);
      }
    }
  }
  InitHeadIconEnergyBarConfig() {
    var t = ConfigManager_1.ConfigManager.BattleUiConfig.GetAllHeadIconEnergyBarConfig();
    if (t) {
      for (const e of t) {
        this.Hn1.set(e.Id, e);
      }
    }
  }
  GetHeadIconEnergyBarConfig(t) {
    return this.Hn1.get(t);
  }
  GetTagIdJoystickStaticVisible() {
    return this.gH1;
  }
  SetTagIdJoystickStaticVisible(t) {
    this.gH1 = t;
  }
  GetTagIdMoveCursorVisible() {
    return this.CH1;
  }
  SetTagIdMoveCursorVisible(t) {
    this.CH1 = t;
  }
  GetRoleSpecialState(t) {
    return this.pJ1.get(t) ?? false;
  }
  RefreshRoleSpecialState(t) {
    var e = this.vXe?.SpecialStateMap.get(t) ?? false;
    var i = this.pJ1.get(t) ?? false;
    if (e !== i) {
      this.pJ1.set(t, e);
      switch (t) {
        case 0:
          if (e) {
            UiManager_1.UiManager.OpenView("RailSlideView");
          } else {
            UiManager_1.UiManager.CloseView("RailSlideView");
          }
          break;
        case 1:
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiRoleSpecialStateChanged, t, e);
      }
    }
  }
  RefreshAllRoleSpecialState() {
    for (var [t, e] of this.pJ1) {
      if (e) {
        this.RefreshRoleSpecialState(t);
      }
    }
    var i = this.vXe?.SpecialStateMap;
    if (i) {
      for (var [s, a] of i) {
        if (a) {
          this.RefreshRoleSpecialState(s);
        }
      }
    }
  }
  SetTimeDilationSkillButtonEnable(t) {
    this.o2d = t;
    ControllerHolder_1.ControllerHolder.BattleUiControl?.UpdateTimeDilationSkillButtonState();
  }
  IsTimeDilationSkillButtonEnable() {
    return this.o2d;
  }
  SetTimeDilationState(t) {
    this.CurrentTimeDilationSkillState = t;
    switch (this.CurrentTimeDilationSkillState) {
      case 0:
        ModelManager_1.ModelManager.PhotographModel.SetPhotographTimeDilation(1);
        break;
      case 1:
        ModelManager_1.ModelManager.PhotographModel.SetPhotographTimeDilation(ModelManager_1.ModelManager.BattleUiModel.TimeDilationSkillRatio);
        if (TimerSystem_1.TimerSystem.Has(this.n2d)) {
          TimerSystem_1.TimerSystem.Remove(this.n2d);
        }
        this.n2d = TimerSystem_1.TimerSystem.Delay(() => {
          this.SetTimeDilationState(2);
        }, this.TimeDilationSkillMaxTime * TimeUtil_1.TimeUtil.InverseMillisecond, undefined, undefined, false);
        break;
      case 2:
        ModelManager_1.ModelManager.PhotographModel.SetPhotographTimeDilation(1);
        AudioSystem_1.AudioSystem.SetState("game_sys_fightphoto", "none");
        if (TimerSystem_1.TimerSystem.Has(this.n2d)) {
          TimerSystem_1.TimerSystem.Remove(this.n2d);
        }
        this.TimeDilationCoolDownStartTime = Time_1.Time.WorldTime * TimeUtil_1.TimeUtil.Millisecond;
        this.n2d = TimerSystem_1.TimerSystem.Delay(() => {
          this.SetTimeDilationState(0);
        }, this.TimeDilationSkillCdTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiTimeDilationStateChanged);
  }
  Test() {
    this.ChildViewData = new BattleUiChildViewData_1.BattleUiChildViewData();
    this.ChildViewData.Init();
  }
}
(exports.BattleUiModel = BattleUiModel).jXe = Stats_1.Stat.Create("BattleUiModelNextTick");
//# sourceMappingURL=BattleUiModel.js.map