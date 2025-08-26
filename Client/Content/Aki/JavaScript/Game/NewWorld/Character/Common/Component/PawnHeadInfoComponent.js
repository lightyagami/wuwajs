"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var o = arguments.length;
  var h = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (n = t[r]) {
        h = (o < 3 ? n(h) : o > 3 ? n(e, i, h) : n(e, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnHeadInfoComponent = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../../../Module/GeneralLogicTree/GeneralLogicTreeUtil");
const NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent");
const UiModel_1 = require("../../../../Ui/UiModel");
const EnvironmentalPerceptionController_1 = require("../../../../World/Enviroment/EnvironmentalPerceptionController");
const CharacterActorComponent_1 = require("./CharacterActorComponent");
const CHECK_QUEST_ICON_INTERVAL = 1000;
const DESTROY_ICON_COMP_TIME = 6000;
const MAX_ICON_COMP_DISTANCE = 3000;
const PLAYER_INFO_DECORATOR_KEY = "PrefabTextItem_PlayerName_Text";
const playerInfoIconPaths = ["/Game/Aki/UI/UIResources/Common/Atlas/SP_Common1P.SP_Common1P", "/Game/Aki/UI/UIResources/Common/Atlas/SP_Common2P.SP_Common2P", "/Game/Aki/UI/UIResources/Common/Atlas/SP_Common3P.SP_Common3P"];
let PawnHeadInfoComponent = class PawnHeadInfoComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.xJr = undefined;
    this.wJr = undefined;
    this.BJr = undefined;
    this.bJr = undefined;
    this.hor = undefined;
    this.jMl = undefined;
    this.WMl = undefined;
    this.QMl = true;
    this.KMl = 0;
    this.$Ml = false;
    this.XMl = false;
    this.YMl = false;
    this.IsDialogIconInUse = false;
    this.zMl = false;
    this.rF1 = false;
    this.qJr = false;
    this.GJr = false;
    this.cna = true;
    this.e8 = 0;
    this.mJa = false;
    this.T91 = false;
    this.NYs = () => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs);
      this.$Ml = true;
      this.FYs();
    };
    this.DestroyPlayerNearbyEvent = () => {
      if (this.WMl) {
        EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(this.WMl);
        this.WMl = undefined;
      }
    };
    this.OnEntityWasRecentlyRenderedOnScreenChange = t => {
      if (this.VJr() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
        var e = this.Hte;
        if (!e || e.PrefabRadius === 0 || e.CurLevelPrefabShowActor?.IsA(UE.TsEffectActor_C.StaticClass()) || e.CurLevelPrefabShowActor?.IsA(UE.EffectSystemActor.StaticClass())) {
          this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(true);
          return;
        }
      }
      this.hor?.OnNpcWasRecentlyRenderedOnScreenChange(t);
    };
    this.Bm1 = () => {
      this.xJr?.UpdateNameAndHeadInfo();
      this.HJr();
      this.SetCharacterSecondName();
      this.SetCharacterFunctionIcon();
    };
    this.iZe = (t, e) => {
      this.HJr();
      this.SetCharacterSecondName();
    };
    this.jJr = () => {
      this.hor?.SetRootItemState(false);
    };
    this.WJr = () => {
      var e = this.BJr?.GetInteractController();
      if (e && e.QuestOptionList.length) {
        let t = false;
        for (const s of e.QuestOptionList) {
          if (s.Context) {
            var i = this.dJa(s.Context);
            if (i !== undefined) {
              if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(s.Condition, this.Hte.Owner)) {
                this.km1(i);
                this.mJa = false;
                return;
              }
              t = true;
            }
          }
        }
        if (t) {
          this.mJa = true;
        }
      } else {
        this.km1();
      }
    };
    this.L21 = t => {
      if (this.hor) {
        this.hor.SetInteractionSpotVisible(t);
      } else {
        this.T91 = t;
      }
    };
    this.RefreshPlayerInfoState = () => {
      var t = !!GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.ShowOtherName) && this.CanShowPlayerInfo();
      if (this.rF1 !== t) {
        this.rF1 = t;
        this.UpdatePlayerInfoIcon(t);
      }
    };
    this._7_ = (t, e, i) => {
      this.SetCharacterIconLocation();
    };
  }
  static get Dependencies() {
    return [1, 0];
  }
  OnStart() {
    this.xJr = this.Entity.GetComponent(118);
    this.Hte = this.Entity.GetComponent(1);
    this.wJr = this.Entity.GetComponent(120);
    this.BJr = this.Entity.GetComponent(198);
    this.bJr = Vector_1.Vector.Create();
    this.pie();
    if (this.Hte instanceof CharacterActorComponent_1.CharacterActorComponent) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs);
      if (this.Hte.CreatureData.IsRole() && !this.Hte.IsRoleAndCtrlByMe) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshPlayerInfoVisible, this.RefreshPlayerInfoState);
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
      }
    } else {
      this.$Ml = true;
      this.FYs();
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.WJr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.WJr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.WJr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.L21);
    return true;
  }
  pie() {
    var t = this.Hte.CreatureData;
    if (t) {
      t = t.GetBaseInfo();
      this.GJr = t?.IsShowNameOnHead ?? false;
    }
  }
  FYs() {
    var t;
    var e;
    var i = this.XMl;
    this.XMl = false;
    this.RefreshPlayerInfoState();
    var s = this.Entity.GetComponent(0);
    if (s?.GetBaseInfo()?.HeadInfo) {
      this.QMl = false;
      this.ZMl();
    } else if ((s = s?.GetEntityTidName()) && PublicUtil_1.PublicUtil.GetConfigTextByKey(s) !== "" && this.GJr) {
      t = (s = Math.max(ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconHeadInfoLimitMaxDistance(), MAX_ICON_COMP_DISTANCE)) + 500;
      e = this.Entity.GameBudgetManagedToken;
      this.WMl = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent();
      this.WMl.Init(s, e, () => {
        this.zMl = true;
        this.ZMl();
      }, () => {
        this.zMl = false;
      }, this.DestroyPlayerNearbyEvent, undefined, t, undefined);
      if (e) {
        cpp_1.FKuroPerceptionInterface.MarkElementDisable(e, !this.Entity.Active);
      }
    } else if (i) {
      this.ZMl();
    }
  }
  ZMl() {
    if (!this.jMl) {
      this.jMl = new CustomPromise_1.CustomPromise();
      if (this.$Ml) {
        this.eSl();
      } else {
        this.XMl = true;
      }
    }
  }
  TryDestroyIconComponent(t) {
    if (this.QMl) {
      if (!this.hor || this.zMl || this.YMl || this.hor.IsHeadIconActive() || this.rF1 || this.hor.IsDialogueTextActive()) {
        this.KMl = 0;
      } else {
        this.KMl += t;
        if (this.KMl >= DESTROY_ICON_COMP_TIME) {
          this.DestroyIconComponent();
        }
      }
    }
  }
  DestroyIconComponent() {
    var t;
    if (this.jMl) {
      if (this.jMl.IsPending()) {
        this.jMl.SetResult();
      }
      this.jMl = undefined;
      this.hor?.Destroy();
      this.hor = undefined;
      t = this.Entity.GetComponent(0)?.GetPbDataId();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("HudUnit", 50, "头顶组件销毁", ["PbDataId", t]);
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.iZe);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.jJr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityNameChanged, this.Bm1);
    }
  }
  async eSl() {
    await this.tSl();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.iZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.jJr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityNameChanged, this.Bm1);
  }
  async tSl() {
    var t = this.Entity.GetComponent(0).GetPbDataId();
    var e = new NpcIconComponent_1.NpcIconComponent(this);
    e.SetEntityPbDataId(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 50, "等待头顶组件创建(开始)", ["PbDataId", t]);
    }
    await e.AddNpcIconAsync();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 50, "等待头顶组件创建(完成)", ["PbDataId", t]);
    }
    if (!this.jMl || this.hor) {
      e.Destroy();
    } else {
      this.hor = e;
      this.KJr();
      this.jMl.SetResult();
    }
  }
  OnEnd() {
    this.DestroyIconComponent();
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.NYs);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.WJr)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.WJr);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.WJr)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.WJr);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RefreshPlayerInfoVisible, this.RefreshPlayerInfoState)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshPlayerInfoVisible, this.RefreshPlayerInfoState);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.WJr);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.L21)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.L21);
    }
    return true;
  }
  KJr() {
    this.SetCharacterIconLocation();
    this.WJr();
    this.Bm1();
    this.hor?.SetInteractionSpotVisible(this.T91);
  }
  SetCharacterIconLocation() {
    this.hor?.SetCharacterIconLocation();
  }
  HJr() {
    this.hor?.SetCharacterName(this.xJr?.PawnName);
  }
  SetCharacterSecondName() {
    this.hor?.SetCharacterSecondName(this.xJr?.SecondName);
  }
  SetCharacterFunctionIcon() {
    if (!this.YMl) {
      this.hor?.SetCharacterFunctionIcon(this.xJr?.FunctionIcon);
    }
  }
  SetCharacterQuestIcon(t) {
    if (this.YMl) {
      this.hor.SetNpcQuest(t.NpcTaskIcon);
      this.hor.MaxShowQuestDisSquared = t.IconDistant;
    }
  }
  SetPlayerInfoIcon(t) {
    this.hor.SetPlayerInfoIcon(t);
  }
  OnEnable() {
    this.hor?.SetHeadItemState(true);
  }
  OnDisable() {
    this.hor?.SetHeadItemState(false);
  }
  VJr() {
    return this.Entity.GetComponent(0).GetEntityType();
  }
  OnTick(t) {
    super.OnTick(t);
    if (this.mJa && (this.e8 += t, this.e8 > CHECK_QUEST_ICON_INTERVAL)) {
      this.e8 -= CHECK_QUEST_ICON_INTERVAL;
      this.WJr();
    }
    this.TryDestroyIconComponent(t);
  }
  async km1(t) {
    if (t) {
      t = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(t);
      if (!StringUtils_1.StringUtils.IsEmpty(t?.NpcTaskIcon)) {
        this.YMl = true;
        if (!this.hor) {
          this.ZMl();
          await this.jMl.Promise;
        }
        this.SetCharacterQuestIcon(t);
        return;
      }
    }
    this.YMl = false;
    this.SetCharacterFunctionIcon();
  }
  dJa(t) {
    let e = undefined;
    switch (t.Type) {
      case 2:
        var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId);
        if (i && !i.HideAcceptQuestMark) {
          e = i.QuestMarkId;
        }
        break;
      case 6:
        var s;
        var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeIncId);
        if (i && i.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.TreeConfigId)) && s.Type === 4 && (s = i.GetNode(t.NodeId)) && s.ContainTag(0)) {
          e = i.GetTrackIconId();
        }
    }
    return e;
  }
  async SetDialogueText(t, e = -1, i = false) {
    if (!this.hor) {
      this.ZMl();
      await this.jMl.Promise;
    }
    t = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, true) ?? "";
    this.hor?.SetDialogueText(t, e, i);
  }
  UpdateDialogUseState(t) {
    this.IsDialogIconInUse = t;
  }
  HideDialogueText() {
    this.hor?.HideDialogueText();
  }
  GetSelfLocation() {
    return this.Hte.ActorLocationProxy;
  }
  GetAttachToMeshComponent() {
    if (this.VJr() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
      return this.Hte.GetStaticMeshComponent();
    } else {
      return this.Hte.SkeletalMesh;
    }
  }
  GetAttachToSocketName() {
    return this.xJr?.GetHeadStateSocketName() ?? ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName();
  }
  GetAttachToLocation(t) {
    var e;
    var i = this.Hte;
    if (i) {
      e = i.SkeletalMesh.D_K2_GetComponentLocation();
      t.Set(e.X, e.Y, e.Z + i.HalfHeight * 2);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("HudUnit", 50, "获取根头顶组件位置", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["RootLocation", t], ["ActorLocation", i.ActorLocationProxy], ["MeshLocation", e]);
      }
    } else {
      t.FromUeVector(this.Hte.SkeletalMesh.D_K2_GetComponentLocation());
    }
  }
  GetAddOffsetZ() {
    return this.xJr?.GetHeadStateOffset() ?? 0;
  }
  IsShowNameInfo() {
    return this.GJr;
  }
  IsShowPlayerInfo() {
    return this.rF1;
  }
  IsShowQuestInfo() {
    return this.qJr;
  }
  IsDialogTextActive() {
    return this.hor?.IsDialogueTextActive() ?? false;
  }
  CanTick() {
    return !!this.hor && (!!this.Hte?.CreatureData.IsRole() || !!this.wJr) && !(this.CanShowHeadItem() ? (this.hor.SetRootItemState(true), 0) : (this.hor.SetRootItemState(false), 1));
  }
  CanShowHeadItem() {
    return !!this.cna && !ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() && !!UiModel_1.UiModel.IsInMainView && !!this.Entity.Active;
  }
  IsInHeadItemShowRange(t, e, i) {
    var s = this.Entity.GetComponent(0)?.GetPbDataId();
    var s = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(s);
    if (s && s.TrackSource !== 1) {
      var n = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (n) {
        this.bJr.DeepCopy(this.GetSelfLocation());
        return Vector_1.Vector.DistSquared(n, this.bJr) < s.TrackHideDis * s.TrackHideDis * 100 * 100;
      }
    }
    return t < e && i < t;
  }
  GetRootItemState() {
    return !!this.hor?.GetRootItemState();
  }
  EnableHeadInfo(t) {
    if (this.cna !== t) {
      this.cna = t;
    }
  }
  CanShowPlayerInfo() {
    var t;
    return !!this.Hte?.CreatureData.IsRole() && !!ModelManager_1.ModelManager.GameModeModel.IsMulti && (t = this.Hte.CreatureData.GetPlayerId(), ModelManager_1.ModelManager.PlayerInfoModel.GetId() !== t) && !!ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t);
  }
  async UpdatePlayerInfoIcon(t) {
    var e;
    if (t) {
      this.ZMl();
      await this.jMl.Promise;
      t = this.Hte.CreatureData.GetPlayerId();
      t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t);
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(PLAYER_INFO_DECORATOR_KEY);
      e = StringUtils_1.StringUtils.Format(e, t.Name);
      t = playerInfoIconPaths[t.PlayerNumber - 1];
      this.hor.SetPlayerInfoIcon(t);
      this.hor.SetCharacterName(e);
    } else {
      this.hor?.SetPlayerInfoIconState(false);
      this.hor?.SetHeadInfoNameState(this.IsShowNameInfo());
    }
  }
};
PawnHeadInfoComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(82)], PawnHeadInfoComponent);
exports.PawnHeadInfoComponent = PawnHeadInfoComponent; //# sourceMappingURL=PawnHeadInfoComponent.js.map