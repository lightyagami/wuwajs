"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkDungeonView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HelpController_1 = require("../../Help/HelpController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DreamLinkController_1 = require("../DreamLinkController");
const DreamLinkDungeonRolePanel_1 = require("./DreamLinkDungeonRolePanel");
const DreamLinkScoreRewardItem_1 = require("./DreamLinkScoreRewardItem");
const DreamLinkCatProgressItem_1 = require("./SubView/DreamLinkCatProgressItem");
const PER_PAGE_COUNT = 3;
const MAX_PAGE_COUNT = 2;
const DOOR_OPEN_SEQUENCE_PATH = "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_Door.Ani_Door";
const DOOR_CLOSE_SEQUENCE_PATH = "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_Door_close.Ani_Door_close";
const RED_WEATHER_SEQUENCE_PATH = "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_rad.Ani_UIMap_Roguelike_rad";
const BLUE_WEATHER_SEQUENCE_PATH = "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike.Ani_UIMap_Roguelike";
const SELECT_WAVE_EFFECT_PATH = "/Game/Aki/Render/Shaders/PostProcess/WaterWave/M_WaterWave.M_WaterWave";
const SHAKE_CAMERA_SEQUENCE = "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_loop.Ani_UIMap_Roguelike_loop";
const SWITCH_SEQUENCE = "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_l.Ani_UIMap_Roguelike_l";
const UNLICK_SEQUNECE = "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_CamA.Ani_UIMap_Roguelike_CamA";
const DREAMLINK_DUNGEON_HELP_ID = 135;
class DreamLinkDungeonView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.teh = undefined;
    this.ieh = undefined;
    this.RHt = undefined;
    this.gTl = undefined;
    this.xtl = undefined;
    this.wcl = undefined;
    this.aPl = undefined;
    this.reh = 0;
    this.eBo = 0;
    this.AHt = undefined;
    this.oeh = undefined;
    this.neh = undefined;
    this.seh = 0;
    this._ih = undefined;
    this.Ptl = [];
    this.wtl = undefined;
    this.qsi = undefined;
    this.Ell = undefined;
    this.Ill = undefined;
    this.H3e = undefined;
    this.lPl = true;
    this.Bcl = undefined;
    this.bcl = undefined;
    this.qcl = undefined;
    this.z2l = undefined;
    this.Gcl = new UE.FrameTime();
    this.OnSelectRoleDungeon = e => {
      var i;
      var t;
      if (this._ih !== 1 && (i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData())) {
        this.reh = i.GetRoleInstDataIndex(e);
        t = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetDreamLinkRoleDungeonConfig(e);
        this.LoadModel(t.RoleId, t.AnimationPath, e);
        this.PlaySelectWaveEffect();
        this.RefreshReward();
        this.RefreshEnterButton();
        (i.GetRoleInstDataByIndex(this.reh)?.CM_ ? (this.wcl?.SequencePlayer?.Stop(), this.aPl) : (this.aPl?.SequencePlayer?.Stop(), this.wcl))?.SequencePlayer?.Play();
      }
    };
    this.Qll = () => {
      this.GetExtendToggle(7)?.SetToggleState(0, true);
    };
    this.Tll = () => {
      var e = this.GetExtendToggle(7)?.GetToggleState() === 1;
      this.GetItem(11)?.SetUIActive(e);
      if (e) {
        this.RefreshReward();
      }
      this.GetButton(12)?.RootUIComp.SetUIActive(e);
    };
    this.heh = () => {
      this.eBo--;
      this.eBo = Math.max(0, this.eBo);
      this.reh = this.eBo * PER_PAGE_COUNT;
      this.RefreshView();
      this.RefreshEnvironment();
    };
    this.leh = () => {
      this.eBo++;
      this.eBo = Math.min(MAX_PAGE_COUNT, this.eBo);
      this.reh = this.eBo * PER_PAGE_COUNT;
      this.RefreshView();
      this.RefreshEnvironment();
    };
    this._eh = () => {
      var e;
      var i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
      if (i) {
        if (this._ih === 1) {
          if ((e = i.GetActivityConfig()) && !i.IsDreamLinkFunctionUnlock(3)) {
            UiManager_1.UiManager.OpenView("QuestView", e.FirstWhiteCatQuestId);
          }
        } else if (e = i.GetRoleInstDataByIndex(this.reh)) {
          if (e.K6n) {
            if (e.CM_) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("DreamLinkDungeonFinishedTips");
            } else {
              this.UiViewSequence?.PlaySequencePurely("FadeOut", true);
              DreamLinkController_1.DreamLinkController.RoguelikeRoleInstStartRequest(this.reh);
            }
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("DreamLinkDungeonUnlockTips");
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [9, UE.UIItem], [8, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [7, UE.UIExtendToggle], [12, UE.UIButtonComponent], [13, UE.UINiagara], [14, UE.UINiagara], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[4, this.heh], [5, this.leh], [6, this._eh], [7, this.Tll], [12, this.Qll]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectRoleDreamDungeon, this.OnSelectRoleDungeon);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectRoleDreamDungeon, this.OnSelectRoleDungeon);
  }
  async OnBeforeStartAsync() {
    var e;
    var i;
    var t;
    var s = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (s) {
      this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
      this.Ill = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(6).RootUIComp);
      this.Ell = new DreamLinkCatProgressItem_1.DreamLinkCatProgressItem();
      e = this.Ell.CreateByActorAsync(this.GetItem(8).GetOwner());
      this.AddChild(this.Ell);
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.lqe.SetHelpCallBack(() => {
        HelpController_1.HelpController.OpenHelpById(DREAMLINK_DUNGEON_HELP_ID);
      });
      i = this.lqe.CreateByActorAsync(this.GetItem(0).GetOwner());
      this.AddChild(this.lqe);
      this.ieh = new DreamLinkDungeonRolePanel_1.DreamLinkRoleInstancePanel();
      this.AHt = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor;
      t = this.ieh.CreateByActorAsync(this.GetItem(3).GetOwner());
      this.AddChild(this.ieh);
      this.qsi = new DreamLinkScoreRewardItem_1.DreamLinkScoreRewardItem(s);
      s = this.qsi.CreateByActorAsync(this.GetItem(9).GetOwner());
      this.AddChild(this.qsi);
      if (!UiSceneManager_1.UiSceneManager.HasDreamLinkRoleSkeletalHandle()) {
        UiSceneManager_1.UiSceneManager.InitDreamLinkRoleSkeletalHandle();
      }
      this.teh = UiSceneManager_1.UiSceneManager.GetDreamLinkRoleSkeletalHandle();
      await Promise.all([s, t, i, e]);
      this.InitDefaultSelectIndex();
      this.Gcl.FrameNumber.Value = 10;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("DreamLink", 34, "DreamLinkDungeonView.OnBeforeStartAsync data is null");
    }
  }
  async OnBeforeShowAsyncImplementImplement() {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(SELECT_WAVE_EFFECT_PATH, UE.MaterialInterface, e => {
      if (e) {
        this.neh = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this.RootActor, e);
        this.seh = UE.KuroRenderingRuntimeBPPluginBPLibrary.AddPostprocessMaterial(this.RootActor, this.neh, 1, true);
        i.SetResult(true);
      }
    });
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(SHAKE_CAMERA_SEQUENCE, UE.LevelSequence, e => {
      var i;
      var t;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        e = e;
        i = (0, puerts_1.$ref)(undefined);
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), i);
        i = (0, puerts_1.$unref)(i);
        (t = new UE.MovieSceneSequencePlaybackSettings()).bAutoPlay = false;
        i.PlaybackSettings = t;
        i.SetTickableWhenPaused(true);
        i.SetSequence(e);
        UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, true);
        this.xtl = i;
        s.SetResult(true);
      }
    });
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(SWITCH_SEQUENCE, UE.LevelSequence, e => {
      var i;
      var t;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        e = e;
        UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(e);
        i = (0, puerts_1.$ref)(undefined);
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), i);
        i = (0, puerts_1.$unref)(i);
        (t = new UE.MovieSceneSequencePlaybackSettings()).bAutoPlay = false;
        t.bPauseAtEnd = true;
        i.PlaybackSettings = t;
        i.SetTickableWhenPaused(true);
        i.SetSequence(e);
        UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, true);
        this.wcl = i;
        r.SetResult(true);
      }
    });
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(UNLICK_SEQUNECE, UE.LevelSequence, e => {
      var i;
      var t;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        e = e;
        UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(e);
        i = (0, puerts_1.$ref)(undefined);
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), i);
        i = (0, puerts_1.$unref)(i);
        (t = new UE.MovieSceneSequencePlaybackSettings()).bAutoPlay = false;
        t.bPauseAtEnd = true;
        i.PlaybackSettings = t;
        i.SetTickableWhenPaused(true);
        i.SetSequence(e);
        UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, true);
        this.aPl = i;
        o.SetResult(true);
      }
    });
    const t = new CustomPromise_1.CustomPromise();
    var e = EffectUtil_1.EffectUtil.GetEffectPath("DreamLinkLockMaterialController");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PD_CharacterControllerData_C, e => {
      if (e) {
        t.SetResult(true);
      }
    });
    await Promise.all([r.Promise, t.Promise, o.Promise, i.Promise, s.Promise]);
  }
  OnBeforeShow() {
    this.xtl.bOverrideInstanceData = true;
    var e = this.xtl.DefaultInstanceData;
    var i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
    this.wcl.bOverrideInstanceData = true;
    var t = this.wcl.DefaultInstanceData;
    this.aPl.bOverrideInstanceData = true;
    var s = this.aPl.DefaultInstanceData;
    var i = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(i.D_GetTransform());
    t.TransformOrigin = i;
    e.TransformOrigin = i;
    s.TransformOrigin = i;
    this.wtl = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("SequenceCamera"), 1);
    this.oeh = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DoorCamera"), 1);
    this.RefreshView();
    this.RefreshEnvironment(true);
    this.RefreshRoleList();
    var t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (t) {
      if (t.GetRoleInstDataByIndex(this.reh)?.CM_) {
        this.aPl?.SequencePlayer?.Play();
        if (!this.lPl) {
          this.aPl?.SequencePlayer?.JumpToFrame(this.aPl.SequencePlayer.GetEndTime().Time);
        }
      } else {
        this.wcl?.SequencePlayer?.Play();
        if (!this.lPl) {
          this.wcl?.SequencePlayer?.JumpToFrame(this.wcl.SequencePlayer.GetEndTime().Time);
        }
      }
      this.lPl = false;
    }
  }
  OnAfterShow() {
    this.InitProgressAnim();
  }
  OnAfterHide() {
    if (this.RHt?.IsValid()) {
      this.RHt.Stop();
      this.RHt = undefined;
    }
    if (this.qcl?.IsValid()) {
      this.qcl.Kill();
      this.qcl = undefined;
    }
    if (this.wcl?.IsValid()) {
      this.wcl.SequencePlayer.Stop();
      this.wcl.K2_DestroyActor();
      this.wcl = undefined;
    }
    if (this.xtl?.IsValid()) {
      this.xtl.SequencePlayer.Stop();
      this.xtl.K2_DestroyActor();
      this.xtl = undefined;
    }
    if (this.gTl?.IsValid()) {
      this.gTl.K2_DestroyActor();
      this.gTl = undefined;
    }
    this.ClearWaveEffect();
    UE.KuroRenderingRuntimeBPPluginBPLibrary.RemovePostprocessMaterial(this.RootActor, this.seh);
    this.neh = undefined;
    CameraController_1.CameraController.SetViewTarget(this.AHt, "DreamLinkDungeonView.OnBeforeDestroy");
  }
  OnBeforeDestroy() {
    var e = this.teh?.Model?.CheckGetComponent(1);
    if (e?.MainMeshComponent?.IsValid()) {
      e.MainMeshComponent.ForcedLodModel = 0;
    }
    this.Ptl.forEach(e => {
      e = e.Model?.CheckGetComponent(1);
      if (e?.MainMeshComponent?.IsValid()) {
        e.MainMeshComponent.ForcedLodModel = 0;
      }
    });
    UiSceneManager_1.UiSceneManager.DestroyDreamLinkRoleSkeletalHandle();
    this.teh = undefined;
    this.Ptl = [];
    UiSceneManager_1.UiSceneManager.DestroyAllDreamLinkWeaponSkeletalHandle();
    CameraController_1.CameraController.SetViewTarget(this.AHt, "DreamLinkDungeonView.OnBeforeDestroy");
    UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
  }
  InitProgressAnim() {
    var e;
    var i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (i && i.DungeonProgressRecord !== i.GetCurrentCatProgress()) {
      i = i.GetLastFinishInst() % PER_PAGE_COUNT;
      e = this.GetItem(8);
      this.Bcl = this.ieh.GetLocationByIndex(i);
      this.GetUiNiagara(13).D_K2_SetWorldLocation(this.Bcl, false, undefined, false);
      this.bcl = e?.D_GetRelativeTransform().GetLocation().op_Addition(new UE.VectorDouble(e?.Width / 2, -e?.Height / 2, 0));
      this.GetUiNiagara(13)?.SetUIActive(true);
      i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(this.bcl);
      this.qcl = UE.LTweenBPLibrary.LocalPositionTo(this.GetUiNiagara(13), i, 1, 0, 4);
      this.qcl?.OnCompleteCallBack.Bind(() => {
        this.GetUiNiagara(13)?.SetUIActive(false);
        this.GetUiNiagara(14)?.SetUIActive(true);
        this.Ell?.PlayAddProgressAnim();
      });
    }
  }
  InitDefaultSelectIndex() {
    var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (e) {
      e = e.DungeonProgressRecord === e.GetCurrentCatProgress() ? e.GetLastUnlockInst() : e.GetLastFinishInst();
      this.eBo = Math.floor(e / PER_PAGE_COUNT);
      this.reh = e;
      if (this.eBo === MAX_PAGE_COUNT) {
        this._ih = 1;
      } else {
        this._ih = 0;
        this.reh = e;
      }
      if (this.eBo === MAX_PAGE_COUNT) {
        this._ih = 1;
      } else {
        this._ih = 0;
      }
    }
  }
  RefreshView() {
    this.RefreshPreNextButton();
    this.RefreshDoorState();
    this.RefreshEnterButton();
    this.RefreshReward();
  }
  RefreshReward() {
    var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (e) {
      const i = e.GetRoleInstDataByIndex(this.reh);
      if (i && (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(i.r6n))) {
        e = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(e.FirstRewardId ?? 0);
        this.H3e?.RefreshByData(e, () => {
          this.H3e?.GetLayoutItemMap().forEach(e => {
            e.SetReceivedVisible(i.CM_);
          });
        });
      }
    }
  }
  RefreshEnterButton() {
    var e;
    var i;
    var t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (t) {
      e = t.GetInstStage() === 0 ? 0 : 1;
      if (this.z2l !== e) {
        if (e == 0) {
          this.z2l = 0;
          this.Ill?.PlayLevelSequenceByName("Blue");
        } else {
          this.z2l = 1;
          this.Ill?.PlayLevelSequenceByName("Red");
        }
      }
      if (this._ih === 1) {
        this.GetButton(6)?.RootUIComp.SetUIActive(!t.IsDreamLinkFunctionUnlock(8));
        this.GetItem(16).SetUIActive(false);
        this.GetText(15).SetText("");
      } else if ((e = t.GetRoleInstDataByIndex(this.reh)) && (i = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(e.r6n))) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i.MapName);
        this.GetButton(6)?.RootUIComp.SetUIActive(!e.CM_);
        this.GetItem(16).SetUIActive(false);
        this.GetItem(18).SetUIActive(t.CheckDungeonRedDotStateByPage(this.eBo - 1, PER_PAGE_COUNT));
        this.GetItem(19).SetUIActive(t.CheckDungeonRedDotStateByPage(this.eBo + 1, PER_PAGE_COUNT));
      }
    }
  }
  RefreshEnvironment(e = false) {
    if (this._ih !== 0 || e) {
      const t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
      var i;
      if (!!t && !(this.eBo >= MAX_PAGE_COUNT)) {
        e = this._ih === 1;
        this._ih = 0;
        i = () => {
          if (this.RHt) {
            this.RHt.Stop();
            this.RHt = undefined;
          }
          if (t.GetFinishInstCount() >= PER_PAGE_COUNT) {
            this.PlaySceneLevelSequence(RED_WEATHER_SEQUENCE_PATH);
          } else {
            this.PlaySceneLevelSequence(BLUE_WEATHER_SEQUENCE_PATH);
          }
          this.RefreshRoleList();
          this.GetItem(17)?.SetAlpha(1);
          CameraController_1.CameraController.SetViewTarget(this.wtl, "DreamLinkDungeonView.RefreshEnvironment");
        };
        if (e) {
          this.PlayBlackScreen(i, "DreamLinkDungeonView.RefreshEnvironment");
        } else {
          i();
        }
      }
    } else {
      this.RefreshRoleList();
    }
  }
  RefreshPreNextButton() {
    this.GetButton(4)?.RootUIComp.SetUIActive(this.eBo > 0);
    var e;
    var i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (this.eBo === MAX_PAGE_COUNT - 1) {
      this.GetButton(5)?.RootUIComp.SetUIActive(i.IsAllInstFinished());
    } else {
      e = i.GetFinishInstCount();
      i = i.GetLastUnlockInst();
      this.GetButton(5)?.RootUIComp.SetUIActive((this.eBo + 1) * PER_PAGE_COUNT <= e && this.eBo * PER_PAGE_COUNT <= i && this.eBo !== MAX_PAGE_COUNT);
    }
  }
  RefreshRoleList(e = true) {
    var i;
    if (this._ih === 1) {
      this.GetItem(2)?.SetUIActive(false);
    } else if (i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData()) {
      if ((i = i.GetInstListByPages(this.eBo, PER_PAGE_COUNT)).length > 0) {
        this.ieh.Refresh(i, e ? this.reh % PER_PAGE_COUNT : 0);
        this.PlaySelectWaveEffect();
        this.GetItem(2)?.SetUIActive(true);
      } else {
        this.GetItem(2)?.SetUIActive(false);
      }
    }
  }
  RefreshDoorState() {
    if (!(this.eBo < MAX_PAGE_COUNT)) {
      if (DreamLinkController_1.DreamLinkController.GetCurrentActivityData()) {
        this.GetItem(17)?.SetAlpha(0);
        this.RefreshRoleList();
        this._ih = 1;
        this.ClearWaveEffect();
        this.PlayDoorSequence();
      }
    }
  }
  async PlayDoorSequence() {
    await this.PlayBlackScreen(() => {
      CameraController_1.CameraController.SetViewTarget(this.oeh, "DreamLinkDungeonView.PlayDoorSequence");
    }, "DreamLinkDungeonView.PlayDoorSequence");
    var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (e &&= e.GetActivityConfig()) {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel?.CheckInstanceFinished(e.FirstWhiteCatDungeonId)) {
        this.PlaySceneLevelSequence(DOOR_CLOSE_SEQUENCE_PATH, true, true);
      } else {
        this.PlaySceneLevelSequence(DOOR_OPEN_SEQUENCE_PATH, true, true);
      }
    }
  }
  async PlayBlackScreen(e, i) {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", i);
    e();
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", i);
  }
  LoadModel(i, e, s) {
    const r = this.teh.Model?.CheckGetComponent(13);
    if (!r || r.RoleConfigId !== i) {
      this.Ptl.forEach(e => {
        e = e.Model?.CheckGetComponent(0);
        if (e) {
          e.SetVisible(false);
        }
      });
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimationAsset, t => {
        var e;
        if (!!t && (!r || r.RoleConfigId !== i)) {
          if (e = this.teh.Model?.CheckGetComponent(14)) {
            e.LoadModelByRoleConfigId(i, -1, true, () => {
              var e = this.teh.Model?.CheckGetComponent(10);
              if (e) {
                e.PlayAnimation(t, true);
              }
              var e = this.teh.Model?.CheckGetComponent(1);
              if (e && (e.SetTransformByTag("RoleCase"), e.MainMeshComponent?.IsValid())) {
                e.MainMeshComponent.ForcedLodModel = 1;
              }
              var e = this.teh.Model?.CheckGetComponent(5);
              var i = EffectUtil_1.EffectUtil.GetEffectPath("ChangeRoleMaterialController");
              var i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(i, UE.PD_CharacterControllerData_C);
              if (e && i) {
                e.AddRenderingMaterialByData(i);
              }
              UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(this.teh.Model, "ChangeRoleEffect");
              var i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
              if (i) {
                if (!i.GetRoleInstDataByIndex(this.reh).CM_) {
                  i = EffectUtil_1.EffectUtil.GetEffectPath("DreamLinkLockMaterialController");
                  i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(i, UE.PD_CharacterControllerData_C);
                  if (e && i) {
                    e.AddRenderingMaterialByData(i);
                  }
                }
                this.LoadItemModel(s);
              }
            });
          }
        }
      });
    }
  }
  LoadItemModel(e) {
    const o = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetDreamLinkRoleDungeonConfig(e);
    if (o) {
      let i = 0;
      o.WeaponShowConfig.forEach((e, s) => {
        if (this.Ptl.length <= i) {
          this.Ptl.push(UiSceneManager_1.UiSceneManager.InitDreamLinkWeaponSkeletalHandle());
        }
        const r = this.Ptl[i];
        i++;
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimationAsset, t => {
          var e;
          if (t && (e = r.Model?.CheckGetComponent(2))) {
            e.LoadModelByModelId(parseInt(s), true, () => {
              var e = r.Model?.CheckGetComponent(10);
              if (e) {
                e.PlayAnimation(t, true);
              }
              var e = r.Model?.CheckGetComponent(1);
              var i = this.teh?.Model?.CheckGetComponent(1);
              if (e?.MainMeshComponent?.IsValid()) {
                e.MainMeshComponent.ForcedLodModel = 1;
              }
              if (e && i) {
                if (o.WeaponShowCase.has(s)) {
                  e.Actor?.K2_AttachToComponent(i.MainMeshComponent, new UE.FName(o.WeaponShowCase.get(s)), 0, 0, 0, false);
                  e.Actor?.K2_SetActorRelativeTransform(MathUtils_1.MathUtils.DefaultTransform, false, undefined, false);
                } else {
                  e.SetTransformByTag("RoleCase");
                }
              }
              var i = r.Model?.CheckGetComponent(0);
              if (i) {
                i.SetVisible(true);
              }
              UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(r.Model, "ChangeRoleEffect");
              var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
              if (e) {
                i = r.Model?.CheckGetComponent(5);
                if (!e.GetRoleInstDataByIndex(this.reh).CM_) {
                  e = EffectUtil_1.EffectUtil.GetEffectPath("DreamLinkLockMaterialController");
                  e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.PD_CharacterControllerData_C);
                  if (i && e) {
                    i.AddRenderingMaterialByData(e);
                  }
                }
              }
            });
          }
        });
      });
    }
  }
  PlaySceneLevelSequence(e, r = false, o = false, n = true) {
    if (this.RHt) {
      this.RHt.Stop();
      this.RHt = undefined;
    }
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, e => {
      var i;
      var t;
      var s;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        e = e;
        s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroSceneInteractionActorSystem.StaticClass());
        i = (0, puerts_1.$ref)(undefined);
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), i);
        i = (0, puerts_1.$unref)(i);
        (t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = o;
        t.bPauseAtEnd = r;
        i.PlaybackSettings = t;
        i.SetTickableWhenPaused(true);
        i.SetSequence(e);
        s.SetSequenceWithTargetLevelActor(i, e, this.oeh);
        UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, true);
        this.xtl?.SequencePlayer?.PlayLooping(-1);
        i.SequencePlayer?.Play();
        if (n) {
          i.bOverrideInstanceData = true;
          t = i.DefaultInstanceData;
          s = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
          e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(s.D_GetTransform());
          t.TransformOrigin = e;
        }
        this.RHt = i.SequencePlayer;
        this.gTl = i;
      }
    });
  }
  PlaySelectWaveEffect() {
    var e;
    var i;
    var t;
    var s = this.ieh.GetScreenPositionByIndex(this.reh % 3);
    if (s) {
      t = Global_1.Global.CharacterController;
      e = (0, puerts_1.$ref)(undefined);
      i = (0, puerts_1.$ref)(undefined);
      t.GetViewportSize(e, i);
      t = (0, puerts_1.$unref)(e);
      e = (0, puerts_1.$unref)(i);
      i = Vector2D_1.Vector2D.Create(t, e);
      t = UE.KismetMathLibrary.Divide_Vector2DVector2D(s, i.ToUeVector2D());
      this.neh?.SetScalarParameterValue(FNameUtil_1.FNameUtil.GetDynamicFName("Center1X"), t?.X);
      this.neh?.SetScalarParameterValue(FNameUtil_1.FNameUtil.GetDynamicFName("Center1Y"), t?.Y);
      this.neh?.SetScalarParameterValue(FNameUtil_1.FNameUtil.GetDynamicFName("CommonStrength"), 0.05);
    }
  }
  ClearWaveEffect() {
    this.neh?.SetScalarParameterValue(FNameUtil_1.FNameUtil.GetDynamicFName("CommonStrength"), 0);
    this.neh?.SetScalarParameterValue(FNameUtil_1.FNameUtil.GetDynamicFName("ClickStrength"), 0);
  }
}
exports.DreamLinkDungeonView = DreamLinkDungeonView;
//# sourceMappingURL=DreamLinkDungeonView.js.map