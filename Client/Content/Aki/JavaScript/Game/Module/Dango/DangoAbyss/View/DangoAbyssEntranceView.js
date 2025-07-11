"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssEntranceView = exports.DangoAbyssEntraceViewData = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../../Render/Manager/RenderModuleController");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const AbyssButtonItem_1 = require("./AbyssButtonItem");
const DangoWorldQuestItem_1 = require("./DangoWorldQuestItem");
const STARTCAMERAPOS = "DangoAbyssStart";
const ENTRANCELOOP = "DangoAbyssLoop";
class DangoAbyssEntraceViewData {
  constructor() {
    this.ActivityId = 0;
  }
}
exports.DangoAbyssEntraceViewData = DangoAbyssEntraceViewData;
class DangoAbyssEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.Syc = undefined;
    this.Myc = undefined;
    this.Eyc = undefined;
    this.Iyc = undefined;
    this.$pt = undefined;
    this.b2t = undefined;
    this.pp1 = undefined;
    this.AMo = () => {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      if (ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSmallWorldInsIdList()?.includes(e)) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(317)).FunctionMap.set(2, () => {
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 5, true);
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 7, true);
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 8, true);
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.CloseMe();
      }
    };
    this.uwc = () => {
      var e;
      if (ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()) {
        this.CloseMe();
      } else if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        this.CloseMe();
      } else {
        const t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetWorldTeleportId();
        if (t !== 0) {
          if (ModelManager_1.ModelManager.QuestNewModel.IsInFocusMode()) {
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(341)).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.TeleportController.SendTeleportTransferRequest(t);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          } else {
            ControllerHolder_1.ControllerHolder.TeleportController.SendTeleportTransferRequest(t);
          }
        }
      }
    };
    this.Tyc = () => {
      var e = this.$8i.ActivityId;
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssSelectViewByActivityId(e);
    };
    this._y1 = () => {
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable()) {
        ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController.OpenCurrentRoleUpView();
      }
    };
    this.iyi = () => {
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable()) {
        UiManager_1.UiManager.OpenView("DangoAbyssShopView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIText], [6, UE.UIItem], [5, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIScrollViewWithScrollbarComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Tyc], [1, this.uwc], [0, this.AMo]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    this.$8i = this.OpenParam;
    var e = [];
    this.Syc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Syc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.Syc.BindClickCallBack(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssLimitRewardView();
    });
    this.Myc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Myc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.Myc.BindClickCallBack(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRewardView();
    });
    this.Eyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Eyc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Eyc.BindClickCallBack(this._y1);
    this.Iyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Iyc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.Iyc.BindClickCallBack(this.iyi);
    await Promise.all(e);
    this.pp1 = new DangoWorldQuestItem_1.DangoWorldQuestItem();
    this.pp1.Init(this.GetScrollViewWithScrollbar(9), this.GetItem(10));
  }
  PushCameraHandle(e, t, i) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(STARTCAMERAPOS, t, i);
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(ENTRANCELOOP, true, true, "1001");
  }
  PopCameraHandle(e, t, i, r) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(STARTCAMERAPOS, t, i, r);
  }
  OnHandleLoadScene() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_Tuanzi_Start0");
    this.Y2c(e, false, () => {
      var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_Tuanzi_Loop");
      this.Y2c(e, true);
    });
  }
  OnBeforeShow() {
    this.PushCameraHandle(ENTRANCELOOP, this.GetViewId(), true);
    var e = this.RSc();
    this.St1(e);
    this.Og();
    this.RefreshRedDot();
    this.Zd1(e);
    this.cy1();
  }
  cy1() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable();
    this.Eyc.SetUiActive(e);
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable();
    this.Iyc.SetUiActive(e);
  }
  RefreshRedDot() {
    this.Syc?.BindRedDot("RedDotDangoLimitReward", this.$8i?.ActivityId);
    this.Myc?.BindRedDot("RedDotDangoCommonReward", this.$8i?.ActivityId);
    this.Iyc?.BindRedDot("RedDotDangoPayShop");
    this.Eyc?.BindRedDot("RedDotDangoDevelop");
  }
  W8e() {
    this.Syc?.UnBindRedDot();
    this.Myc?.UnBindRedDot();
    this.Iyc?.UnBindRedDot();
    this.Eyc?.UnBindRedDot();
  }
  Y2c(e, i, r) {
    const s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssActivityData(this.$8i.ActivityId).SceneActor.split(",");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, e => {
      var t;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        if (!this.b2t) {
          t = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined);
          this.b2t = t;
        }
        this.b2t.SetSequence(e);
        s.forEach(e => {
          var e = FNameUtil_1.FNameUtil.GetDynamicFName(e);
          var t = UE.KuroCollectActorComponent.GetActorWithTag(e, 1);
          if (t) {
            this.b2t?.AddBindingByTag(e, t);
          }
        });
        (t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = true;
        t.bPauseAtEnd = true;
        this.b2t.PlaybackSettings = t;
        this.b2t.SetTickableWhenPaused(true);
        UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, true);
        this.$pt = this.b2t.SequencePlayer;
        this.b2t.bOverrideInstanceData = true;
        t = this.b2t.DefaultInstanceData;
        e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
        t.TransformOrigin = e;
        this.$pt.OnFinished.Add(() => {
          r?.();
        });
        if (i) {
          this.$pt.PlayLooping();
        } else {
          this.$pt.Play();
        }
      }
    });
  }
  OnBeforeHide() {
    this.W8e();
  }
  OnBeforeDestroy() {
    if (this.$pt?.IsValid()) {
      this.$pt?.Stop();
      this.$pt = undefined;
    }
    if (this.b2t?.IsValid()) {
      this.b2t?.K2_DestroyActor();
      this.b2t = undefined;
    }
    this.pp1?.Clear();
  }
  Og() {
    this.pp1?.Refresh();
    var e = this.RSc();
    this.byc(e);
    this.Lyc(e);
    this.wyc(e);
    this.jNc(e);
    this.d8c(e);
  }
  Zd1(e) {
    e = e.GetCurrentLastFinishChallengeId();
    if (e !== 0) {
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e).AbyssShowCake.split(",").forEach(e => {
        e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e), 1);
        if (e?.IsValid()) {
          e.SetActorHiddenInGame(false);
        }
      });
    }
  }
  RSc() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.$8i.ActivityId);
  }
  St1(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("shenyuan"), 1);
    if (t?.IsValid() && (e = e.GetFirstUnlockChallengeId()) !== 0) {
      e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e).AbyssColor;
      e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(e));
      t.GetComponentByClass(UE.NiagaraComponent.StaticClass()).SetNiagaraVariableLinearColor("Color", e);
    }
  }
  jNc(e) {
    var t = e.CheckInLimitTime();
    this.GetItem(5).SetUIActive(t);
    if (t) {
      t = e.GetRemainTimeText();
      this.Syc?.SetNumText(t);
    }
  }
  byc(e) {}
  Lyc(e) {
    e = e.GetAbyssWorldProgressText();
    this.GetText(2).SetText(e);
  }
  wyc(e) {
    e = e.GetAbyssProgressText();
    this.GetText(4).SetText(e);
  }
  d8c(e) {
    e = e.GetRewardFinishProgressText();
    this.Myc?.SetNumText(e);
  }
  OnTick(e) {
    this.pp1?.Tick();
  }
}
exports.DangoAbyssEntranceView = DangoAbyssEntranceView;
//# sourceMappingURL=DangoAbyssEntranceView.js.map