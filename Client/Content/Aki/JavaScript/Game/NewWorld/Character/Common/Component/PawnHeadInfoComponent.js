"use strict";
var __decorate = this && this.__decorate || function(t, e, i, s) {
  var n, o = arguments.length,
    h = o < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) h = Reflect.decorate(t, e, i, s);
  else
    for (var r = t.length - 1; 0 <= r; r--)(n = t[r]) && (h = (o < 3 ? n(h) : 3 < o ? n(e, i, h) : n(e, i)) || h);
  return 3 < o && h && Object.defineProperty(e, i, h), h
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PawnHeadInfoComponent = void 0;
const cpp_1 = require("cpp"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
  NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent"),
  UiModel_1 = require("../../../../Ui/UiModel"),
  EnvironmentalPerceptionController_1 = require("../../../../World/Enviroment/EnvironmentalPerceptionController"),
  CharacterActorComponent_1 = require("./CharacterActorComponent"),
  CHECK_QUEST_ICON_INTERVAL = 1e3,
  DESTROY_ICON_COMP_TIME = 6e3,
  MAX_ICON_COMP_DISTANCE = 3e3,
  PLAYER_INFO_DECORATOR_KEY = "PrefabTextItem_PlayerName_Text",
  playerInfoIconPaths = ["/Game/Aki/UI/UIResources/Common/Atlas/SP_Common1P.SP_Common1P", "/Game/Aki/UI/UIResources/Common/Atlas/SP_Common2P.SP_Common2P", "/Game/Aki/UI/UIResources/Common/Atlas/SP_Common3P.SP_Common3P"];
let PawnHeadInfoComponent = class PawnHeadInfoComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Hte = void 0, this.xJr = void 0, this.wJr = void 0, this.BJr = void 0, this.bJr = void 0, this.hor = void 0, this.jMl = void 0, this.WMl = void 0, this.QMl = !0, this.KMl = 0, this.$Ml = !1, this.XMl = !1, this.YMl = !1, this.IsDialogIconInUse = !1, this.zMl = !1, this.bG1 = !1, this.qJr = !1, this.GJr = !1, this.cna = !0, this.e8 = 0, this.mJa = !1, this.V71 = !1, this.NYs = () => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs), this.$Ml = !0, this.FYs()
    }, this.DestroyPlayerNearbyEvent = () => {
      this.WMl && (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(this.WMl), this.WMl = void 0)
    }, this.OnEntityWasRecentlyRenderedOnScreenChange = t => {
      if (this.VJr() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
        var e = this.Hte;
        if (!e || 0 === e.PrefabRadius || e.CurLevelPrefabShowActor?.IsA(UE.TsEffectActor_C.StaticClass()) || e.CurLevelPrefabShowActor?.IsA(UE.EffectSystemActor.StaticClass())) return void this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(!0)
      }
      this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(t)
    }, this.um1 = () => {
      this.xJr?.UpdateNameAndHeadInfo(), this.HJr(), this.SetCharacterSecondName(), this.SetCharacterFunctionIcon()
    }, this.iZe = (t, e) => {
      this.HJr(), this.SetCharacterSecondName()
    }, this.jJr = () => {
      this.hor?.SetRootItemState(!1)
    }, this.WJr = () => {
      var e = this.BJr?.GetInteractController();
      if (e && e.QuestOptionList.length) {
        let t = !1;
        for (const s of e.QuestOptionList)
          if (s.Context) {
            var i = this.dJa(s.Context);
            if (void 0 !== i) {
              if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(s.Condition, this.Hte.Owner)) return this.dm1(i), void(this.mJa = !1);
              t = !0
            }
          } t && (this.mJa = !0)
      } else this.dm1()
    }, this.Yq1 = t => {
      this.hor ? this.hor.SetInteractionSpotVisible(t) : this.V71 = t
    }, this.RefreshPlayerInfoState = () => {
      var t = !!GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.ShowOtherName) && this.CanShowPlayerInfo();
      this.bG1 !== t && (this.bG1 = t, this.UpdatePlayerInfoIcon(t))
    }, this._7_ = (t, e, i) => {
      this.SetCharacterIconLocation()
    }
  }
  static get Dependencies() {
    return [1, 0]
  }
  OnStart() {
    return this.xJr = this.Entity.GetComponent(117), this.Hte = this.Entity.GetComponent(1), this.wJr = this.Entity.GetComponent(119), this.BJr = this.Entity.GetComponent(197), this.bJr = Vector_1.Vector.Create(), this.pie(), this.Hte instanceof CharacterActorComponent_1.CharacterActorComponent ? (EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs), this.Hte.CreatureData.IsRole() && !this.Hte.IsRoleAndCtrlByMe && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshPlayerInfoVisible, this.RefreshPlayerInfoState), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_))) : (this.$Ml = !0, this.FYs()), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.WJr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.WJr), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.WJr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.Yq1), !0
  }
  pie() {
    var t = this.Hte.CreatureData;
    t && (t = t.GetBaseInfo(), this.GJr = t?.IsShowNameOnHead ?? !1)
  }
  FYs() {
    var t, e, i = this.XMl,
      s = (this.XMl = !1, this.RefreshPlayerInfoState(), this.Entity.GetComponent(0));
    (s?.GetBaseInfo())?.HeadInfo ? (this.QMl = !1, this.ZMl()) : (s = s?.GetEntityTidName()) && "" !== PublicUtil_1.PublicUtil.GetConfigTextByKey(s) && this.GJr ? (t = (s = Math.max(ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconHeadInfoLimitMaxDistance(), MAX_ICON_COMP_DISTANCE)) + 500, e = this.Entity.GameBudgetManagedToken, this.WMl = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent(), this.WMl.Init(s, e, () => {
      this.zMl = !0, this.ZMl()
    }, () => {
      this.zMl = !1
    }, this.DestroyPlayerNearbyEvent, void 0, t, void 0), e && cpp_1.FKuroPerceptionInterface.MarkElementDisable(e, !this.Entity.Active)) : i && this.ZMl()
  }
  ZMl() {
    this.jMl || (this.jMl = new CustomPromise_1.CustomPromise, this.$Ml ? this.eSl() : this.XMl = !0)
  }
  TryDestroyIconComponent(t) {
    this.QMl && (!this.hor || this.zMl || this.YMl || this.hor.IsHeadIconActive() || this.bG1 || this.hor.IsDialogueTextActive() ? this.KMl = 0 : (this.KMl += t, this.KMl >= DESTROY_ICON_COMP_TIME && this.DestroyIconComponent()))
  }
  DestroyIconComponent() {
    var t;
    this.jMl && (this.jMl.IsPending() && this.jMl.SetResult(), this.jMl = void 0, this.hor?.Destroy(), this.hor = void 0, t = this.Entity.GetComponent(0)?.GetPbDataId(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("HudUnit", 50, "头顶组件销毁", ["PbDataId", t]), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.iZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.jJr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityNameChanged, this.um1))
  }
  async eSl() {
    await this.tSl(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.iZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.jJr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityNameChanged, this.um1)
  }
  async tSl() {
    var t = this.Entity.GetComponent(0).GetPbDataId(),
      e = new NpcIconComponent_1.NpcIconComponent(this);
    e.SetEntityPbDataId(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("HudUnit", 50, "等待头顶组件创建(开始)", ["PbDataId", t]), await e.AddNpcIconAsync(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("HudUnit", 50, "等待头顶组件创建(完成)", ["PbDataId", t]), !this.jMl || this.hor ? e.Destroy() : (this.hor = e, this.KJr(), this.jMl.SetResult())
  }
  OnEnd() {
    return this.DestroyIconComponent(), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.WJr) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.WJr), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.WJr) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.WJr), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RefreshPlayerInfoVisible, this.RefreshPlayerInfoState) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshPlayerInfoVisible, this.RefreshPlayerInfoState), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.WJr), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.Yq1) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.Yq1), !0
  }
  KJr() {
    this.SetCharacterIconLocation(), this.WJr(), this.um1(), this.hor?.SetInteractionSpotVisible(this.V71)
  }
  SetCharacterIconLocation() {
    this.hor?.SetCharacterIconLocation()
  }
  HJr() {
    this.hor?.SetCharacterName(this.xJr?.PawnName)
  }
  SetCharacterSecondName() {
    this.hor?.SetCharacterSecondName(this.xJr?.SecondName)
  }
  SetCharacterFunctionIcon() {
    this.YMl || this.hor?.SetCharacterFunctionIcon(this.xJr?.FunctionIcon)
  }
  SetCharacterQuestIcon(t) {
    this.YMl && (this.hor.SetNpcQuest(t.NpcTaskIcon), this.hor.MaxShowQuestDisSquared = t.IconDistant)
  }
  SetPlayerInfoIcon(t) {
    this.hor.SetPlayerInfoIcon(t)
  }
  OnEnable() {
    this.hor?.SetHeadItemState(!0)
  }
  OnDisable() {
    this.hor?.SetHeadItemState(!1)
  }
  VJr() {
    return this.Entity.GetComponent(0).GetEntityType()
  }
  OnTick(t) {
    super.OnTick(t), this.mJa && (this.e8 += t, this.e8 > CHECK_QUEST_ICON_INTERVAL) && (this.e8 -= CHECK_QUEST_ICON_INTERVAL, this.WJr()), this.TryDestroyIconComponent(t)
  }
  async dm1(t) {
    if (t) {
      t = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(t);
      if (!StringUtils_1.StringUtils.IsEmpty(t?.NpcTaskIcon)) return this.YMl = !0, this.hor || (this.ZMl(), await this.jMl.Promise), void this.SetCharacterQuestIcon(t)
    }
    this.YMl = !1, this.SetCharacterFunctionIcon()
  }
  dJa(t) {
    let e = void 0;
    switch (t.Type) {
      case 2:
        var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId);
        i && !i.HideAcceptQuestMark && (e = i.QuestMarkId);
        break;
      case 6:
        var s, i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeIncId);
        i && i.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.TreeConfigId)) && 4 === s.Type && (s = i.GetNode(t.NodeId)) && s.ContainTag(0) && (e = i.GetTrackIconId())
    }
    return e
  }
  async SetDialogueText(t, e = -1, i = !1) {
    this.hor || (this.ZMl(), await this.jMl.Promise);
    t = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, !0) ?? "";
    this.hor?.SetDialogueText(t, e, i)
  }
  UpdateDialogUseState(t) {
    this.IsDialogIconInUse = t
  }
  HideDialogueText() {
    this.hor?.HideDialogueText()
  }
  GetSelfLocation() {
    return this.Hte.ActorLocationProxy
  }
  GetAttachToMeshComponent() {
    return this.VJr() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem ? this.Hte.GetStaticMeshComponent() : this.Hte.SkeletalMesh
  }
  GetAttachToSocketName() {
    return this.xJr?.GetHeadStateSocketName() ?? ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName()
  }
  GetAttachToLocation(t) {
    var e, i = this.Hte;
    i ? (e = i.SkeletalMesh.D_K2_GetComponentLocation(), t.Set(e.X, e.Y, e.Z + 2 * i.HalfHeight), Log_1.Log.CheckInfo() && Log_1.Log.Info("HudUnit", 50, "获取根头顶组件位置", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["RootLocation", t], ["ActorLocation", i.ActorLocationProxy], ["MeshLocation", e])) : t.FromUeVector(this.Hte.SkeletalMesh.D_K2_GetComponentLocation())
  }
  GetAddOffsetZ() {
    return this.xJr?.GetHeadStateOffset() ?? 0
  }
  IsShowNameInfo() {
    return this.GJr
  }
  IsShowPlayerInfo() {
    return this.bG1
  }
  IsShowQuestInfo() {
    return this.qJr
  }
  IsDialogTextActive() {
    return this.hor?.IsDialogueTextActive() ?? !1
  }
  CanTick() {
    return !!this.hor && !(!this.Hte?.CreatureData.IsRole() && !this.wJr || (this.CanShowHeadItem() ? (this.hor.SetRootItemState(!0), 0) : (this.hor.SetRootItemState(!1), 1)))
  }
  CanShowHeadItem() {
    return !(!this.cna || ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() || !UiModel_1.UiModel.IsInMainView || !this.Entity.Active)
  }
  IsInHeadItemShowRange(t, e, i) {
    var s = this.Entity.GetComponent(0)?.GetPbDataId(),
      s = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(s);
    if (s && 1 !== s.TrackSource) {
      var n = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (n) return this.bJr.DeepCopy(this.GetSelfLocation()), Vector_1.Vector.DistSquared(n, this.bJr) < s.TrackHideDis * s.TrackHideDis * 100 * 100
    }
    return t < e && i < t
  }
  GetRootItemState() {
    return !!this.hor?.GetRootItemState()
  }
  EnableHeadInfo(t) {
    this.cna !== t && (this.cna = t)
  }
  CanShowPlayerInfo() {
    var t;
    return !!this.Hte?.CreatureData.IsRole() && !!ModelManager_1.ModelManager.GameModeModel.IsMulti && (t = this.Hte.CreatureData.GetPlayerId(), ModelManager_1.ModelManager.PlayerInfoModel.GetId() !== t) && !!ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t)
  }
  async UpdatePlayerInfoIcon(t) {
    var e;
    t ? (this.ZMl(), await this.jMl.Promise, t = this.Hte.CreatureData.GetPlayerId(), t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t), e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(PLAYER_INFO_DECORATOR_KEY), e = StringUtils_1.StringUtils.Format(e, t.Name), t = playerInfoIconPaths[t.PlayerNumber - 1], this.hor.SetPlayerInfoIcon(t), this.hor.SetCharacterName(e)) : (this.hor?.SetPlayerInfoIconState(!1), this.hor?.SetHeadInfoNameState(this.IsShowNameInfo()))
  }
};
PawnHeadInfoComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(82)], PawnHeadInfoComponent), exports.PawnHeadInfoComponent = PawnHeadInfoComponent;
//# sourceMappingURL=PawnHeadInfoComponent.js.map