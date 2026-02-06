"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcIconComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiActorPool_1 = require("../../Ui/UiActorPool");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator");
const MarkItemUtil_1 = require("../Map/Marks/MarkItemUtil");
const TrackController_1 = require("../Track/TrackController");
const NpcIconComponentView_1 = require("./NpcIconComponentView");
class NpcIconComponent {
  constructor(t) {
    this.Eqi = undefined;
    this.n8 = "";
    this.HeadView = undefined;
    this.Pe = undefined;
    this.Sqi = -1;
    this.yqi = 0;
    this.MaxShowQuestDisSquared = 0;
    this.Tqi = 0;
    this.Lqi = undefined;
    this.Dqi = undefined;
    this.Rqi = 0;
    this.Kr = false;
    this.yW = undefined;
    this.Uqi = 0;
    this.Aqi = false;
    this.tF1 = false;
    this.Lz = Vector_1.Vector.Create();
    this.G1l = false;
    this.k1l = true;
    this.R21 = false;
    this.LocationProxyFunction = undefined;
    this.Pe = t;
    this.yqi = ConfigManager_1.ConfigManager.NpcIconConfig.NpcIconHeadInfoLimitMaxDistanceSquared;
  }
  RegisterTick() {
    if (this.yW) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HudUnit", 36, "NpcIconComponent RegisterTick: 重复注册Tick", ["NpcIconComponent", this.constructor.name], ["Path", this.n8]);
      }
      this.UnregisterTick();
    }
    var t = GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsHUDTickConfig;
    this.yW = GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(t.GroupName, t.SignificanceGroup, this, this.Eqi?.Actor);
  }
  UnregisterTick() {
    if (this.yW) {
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
      this.yW = undefined;
    }
  }
  ScheduledTick(t, e, i) {}
  ScheduledAfterTick(t, e, i) {
    this.Tick(t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  OnEnabledChange(t, e) {
    this.SetRootItemState(t);
  }
  get Pqi() {
    return this.G1l;
  }
  set Pqi(t) {
    this.G1l = t;
  }
  get xqi() {
    return this.k1l;
  }
  set xqi(t) {
    this.k1l = t;
  }
  get Lrt() {
    return this.Pqi || this.xqi;
  }
  SetInteractionSpotVisible(t) {
    this.R21 = t;
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    this.Pqi = t;
  }
  OnNpcWasRecentlyRenderedOnScreenChange(t) {
    this.xqi = t;
  }
  SetupCheckRange(t) {
    this.yqi = t;
  }
  async AddNpcIconAsync() {
    if (!UiManager_1.UiManager.IsInited) {
      this.Lqi = new CustomPromise_1.CustomPromise();
      this.Dqi = () => {
        this.Lqi.SetResult(undefined);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, this.Dqi);
      };
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.Dqi);
      await this.Lqi.Promise;
    }
    return this.CreateNpcIcon();
  }
  async CreateNpcIcon() {
    var t;
    this.n8 = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_NPCIcon_Prefab");
    this.Eqi = await UiActorPool_1.UiActorPool.GetAsync(this.n8, UiLayer_1.UiLayer.WorldSpaceUiRootItem);
    if (this.Kr) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8);
      return false;
    } else {
      t = this.Pe.GetAttachToMeshComponent();
      this.Eqi.Actor.K2_AttachToComponent(t, undefined, 2, 0, 1, false);
      this.Eqi.Actor.SetActorHiddenInGame(false);
      this.HeadView = new NpcIconComponentView_1.NpcIconComponentView();
      UiModel_1.UiModel.AddNpcIconViewUnit(this.HeadView);
      await this.HeadView.CreateByActorAsync(this.Eqi.Actor);
      return !this.Kr && (this.HeadView.SetHeadInfoNameState(false), this.HeadView.SetDialogueActive(false), this.HeadView.SetDialogWorldScale3D(this.Pe.GetDialogWorldScale3D()), this.RegisterTick(), this.Tick(Time_1.Time.DeltaTime * CommonDefine_1.MILLIONSECOND_PER_SECOND, true), true);
    }
  }
  SetCharacterIconLocation() {
    var t = this.Pe.GetAttachToMeshComponent();
    if (t.IsA(UE.StaticMeshComponent.StaticClass())) {
      this.Lz.FromUeVector(t.D_K2_GetComponentLocation());
    } else {
      this.Pe.GetAttachToLocation(this.Lz);
    }
    var t = this.Pe.GetAddOffsetZ();
    var t = (this.Pe.IsShowPlayerInfo() ? ConfigManager_1.ConfigManager.NpcIconConfig.GetPlayerInfoIconLocationOffsetZ() : ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconLocationOffsetZ()) + t;
    this.HeadView.InitItemLocation(this.Lz.ToUeVector(), t);
  }
  SetCharacterName(t) {
    this.HeadView?.SetNpcName(t);
  }
  SetCharacterSecondName(t) {
    this.HeadView?.SetNpcSecondName(t);
  }
  SetCharacterFunctionIcon(t) {
    this.HeadView?.SetFunctionIcon(t);
  }
  SetNpcQuest(t) {
    this.HeadView?.SetNpcQuestIcon(t);
  }
  SetHeadItemState(t) {
    this.HeadView?.SetHeadItemState(t);
  }
  SetQuestTrackCellState(t) {
    this.HeadView?.SetQuestTrackCellState(t);
  }
  SetRootItemState(t) {
    this.HeadView?.SetRootItemState(t);
  }
  GetRootItemState() {
    return !!this.HeadView?.GetRootItemState();
  }
  SetHeadInfoNameState(t) {
    this.HeadView?.SetHeadInfoNameState(t);
  }
  SetQuestInfoState(t) {
    this.HeadView?.SetNpcQuestIconState(t);
  }
  SetQuestTrackEffectState(t) {
    this.HeadView?.SetTrackEffectState(t);
  }
  SetEntityPbDataId(t) {
    this.Uqi = t;
  }
  SetDialogueText(t, e = -1, i = false) {
    this.Sqi = e * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.HeadView?.SetDialogueActive(true, i);
    this.HeadView?.SetDialogueText(t);
    if (i) {
      this.wqi(true);
    }
  }
  HideDialogueText() {
    this.Sqi = -1;
    this.HeadView?.SetDialogueActive(false);
    this.wqi(false);
  }
  UpdateDialogWorldScale() {
    this.HeadView?.SetDialogWorldScale3D(this.Pe.GetDialogWorldScale3D());
  }
  IsDialogueTextActive() {
    return this.HeadView?.GetDialogueActive() ?? false;
  }
  IsHeadIconActive() {
    return this.HeadView?.GetHeadIconActive() ?? false;
  }
  IsHeadItemActive() {
    return this.HeadView?.GetHeadItemState() ?? false;
  }
  wqi(t) {
    var e = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.Uqi);
    if (e && this.Aqi) {
      TrackController_1.TrackController.SetTrackMarkOccupied(5, e.Id, t);
      this.Aqi = t;
    }
  }
  TickDialogueText(t) {
    if (!(this.Sqi < 0)) {
      this.Sqi -= t;
      if (this.Sqi <= 0) {
        this.HideDialogueText();
      }
    }
  }
  Tick(t, e = false) {
    if (this.Pe.CanTick(t) && (e || this.Lrt)) {
      this.Bqi();
      this.TickDialogueText(t);
    }
  }
  Bqi() {
    var t;
    if (ModelManager_1.ModelManager.CameraModel) {
      t = Vector_1.Vector.DistSquared(ModelManager_1.ModelManager.CameraModel.CameraLocation, this.Pe.GetSelfLocation());
      this.bqi(t);
      this.qqi();
    }
  }
  qqi() {
    var t;
    if (this.HeadView && (t = CameraController_1.CameraController.CameraRotator)) {
      this.HeadView.UpdateRotation(t.Yaw, t.Pitch);
    }
  }
  Gqi(t) {
    var e = this.Pe.IsInHeadItemShowRange(t, this.yqi, ConfigManager_1.ConfigManager.NpcIconConfig.NpcIconHeadInfoLimitMinDistanceSquared) && !this.R21;
    this.SetHeadItemState(e);
    this.$1l();
    if (this.Sqi > 0 && (this.Rqi < ConfigManager_1.ConfigManager.NpcIconConfig.NpcIconHeadInfoLimitMinDistanceSquared || this.Rqi > this.yqi)) {
      this.HideDialogueText();
    }
    if (e) {
      this.Nqi(t);
    }
  }
  $1l() {
    var t;
    var e;
    if (this.R21) {
      this.SetQuestTrackCellState(true);
    } else {
      e = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.Uqi);
      t = MarkItemUtil_1.MarkItemUtil.CanShowTrackMark(e);
      e = !!e && e.TrackSource === 5;
      this.SetQuestTrackCellState(e);
      if (!e) {
        if (this.HeadView) {
          this.HeadView.ForceHideDialog = t;
          this.HeadView.ForceHideRootItem = t;
        }
      }
    }
  }
  Oqi(t) {
    var e = ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconHeadInfoNameLimitDistance();
    return t <= e * e;
  }
  xOg(t) {
    var e = ConfigManager_1.ConfigManager.NpcIconConfig.GetPlayerInfoNameLimitDistance();
    return t <= e * e;
  }
  BOg(t) {
    var e = ConfigManager_1.ConfigManager.NpcIconConfig.GetPlayerInfoIconLimitDistance();
    return t < e * e;
  }
  kqi(t) {
    var e;
    var i;
    if (this.Pe.IsShowPlayerInfo()) {
      i = this.xOg(t);
      e = this.BOg(t);
      this.SetNameTextState(i);
      this.SetPlayerInfoIconState(e);
      this.SetHeadInfoNameState(true);
    } else if (this.Pe.IsShowNameInfo()) {
      i = this.Oqi(t);
      this.SetHeadInfoNameState(i);
    }
  }
  Fqi(t) {
    return this.MaxShowQuestDisSquared === 0 || t <= this.MaxShowQuestDisSquared * this.MaxShowQuestDisSquared;
  }
  Vqi(t) {
    return this.Tqi === 0 || t <= this.Tqi * this.Tqi;
  }
  Hqi(t) {
    var e;
    if (this.Pe.IsShowQuestInfo()) {
      e = this.Fqi(t);
      this.SetQuestInfoState(e);
      e = this.Vqi(t);
      this.SetQuestTrackEffectState(e);
    }
  }
  bqi(t) {
    if (this.Rqi !== t) {
      this.Rqi = t;
      this.Gqi(t);
      this.kqi(t);
      this.Hqi(t);
    }
  }
  Nqi(t) {
    t = ConfigManager_1.ConfigManager.NpcIconConfig.GetHeadStateScaleValue(t);
    this.HeadView?.SetHeadWorldScale3D(t);
  }
  SetPlayerInfoIcon(t) {
    this.tF1 = false;
    this.HeadView?.SetPlayerInfoIcon(t, t => {
      this.tF1 = t;
    });
  }
  SetPlayerInfoIconState(t) {
    if (this.tF1) {
      this.HeadView?.SetPlayerInfoItemState(t);
    }
  }
  SetNameTextState(t) {
    this.HeadView?.SetNameTextItemState(t);
  }
  Destroy() {
    this.Kr = true;
    if (this.HeadView) {
      UiModel_1.UiModel.RemoveNpcIconViewUnit(this.HeadView);
      this.HeadView.Destroy();
      this.HeadView = undefined;
    }
    if (this.Eqi) {
      this.Eqi.Actor?.DetachRootComponentFromParent();
      UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8);
      this.Eqi = undefined;
      this.Pe = undefined;
    }
    this.UnregisterTick();
  }
}
exports.NpcIconComponent = NpcIconComponent;
//# sourceMappingURL=NpcIconComponent.js.map