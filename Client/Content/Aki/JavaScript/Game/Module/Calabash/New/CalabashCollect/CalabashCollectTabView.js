"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashCollectTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MeshStreamDefine_1 = require("../../../MeshStream/MeshStreamDefine");
const MeshStreamTaskContext_1 = require("../../../MeshStream/MeshStreamTaskContext");
const VisionCameraInputItem_1 = require("../../../Phantom/Vision/View/VisionCameraInputItem");
const RoleModelLoadingItem_1 = require("../../../RoleUi/Component/RoleModelLoadingItem");
const UiCameraControlRotationComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../../../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CalabashCollectDetailItem_1 = require("./CalabashCollectDetailItem");
const CalabashCollectGridItem_1 = require("./CalabashCollectGridItem");
class CalabashCollectTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.vpt = undefined;
    this.Mpt = undefined;
    this.Ept = undefined;
    this.Spt = undefined;
    this.ypt = undefined;
    this.Ipt = undefined;
    this.Tpt = undefined;
    this.Dpt = 0;
    this.Rpt = 0;
    this.Upt = ResourceSystem_1.ResourceSystem.InvalidId;
    this.qpd = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    this.Apt = false;
    this.SPe = undefined;
    this.Ppt = () => {
      if (ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState()) {
        this.Ept.PlayDetailShowSequence();
      } else {
        this.Ept.PlayDetailHideSequence();
      }
    };
    this.xpt = () => {
      this.wpt();
    };
    this.w7 = () => {
      var e = new CalabashCollectGridItem_1.CalabashCollectGridItem();
      e.OnToggleClick = this.N8e;
      e.CanToggleChange = this.Bpt;
      return e;
    };
    this.N8e = e => {
      this.Spt.SelectGridProxy(e);
      this.bpt();
    };
    this.Bpt = e => this.Spt?.GetSelectedGridIndex() !== e;
    this.qpt = (e, i, t) => {
      this.ypt = e;
      this.Spt.RefreshByData(this.ypt, false, this.Gpt, true);
      if (!(this.ypt.length <= 0)) {
        if (t === 1) {
          this.Rpt = this.ypt[0].DevelopRewardData.MonsterId;
        }
      }
    };
    this.Gpt = () => {
      let i = 0;
      if (this.Dpt > 0) {
        i = this.Dpt;
        this.Dpt = 0;
      } else if (this.Rpt > 0) {
        i = this.Rpt;
      }
      let e = 0;
      if (i > 0) {
        e = this.ypt.findIndex(e => e.DevelopRewardData.MonsterId === i);
      }
      e = Math.max(0, e);
      this.Spt.SelectGridProxy(e);
      this.Spt.ScrollToGridIndex(e);
      this.bpt();
    };
    this.Npt = () => {
      if (this.Apt) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Calabash", 43, "重复进入声骸图鉴的内部界面");
        }
      } else {
        this.Apt = true;
        this.SPe?.PlayLevelSequenceByName("Enter", true);
        const i = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
        var e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.Rpt);
        const t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBodyTypeConfig(e.MonsterBodyType);
        ResourceSystem_1.ResourceSystem.LoadAsync(t.MoveForwardCurvePath, UE.CurveFloat, e => {
          if (e) {
            i.DoMoveForward(t.MoveForwardDistance, t.MoveForwardDuration, e);
          }
        }, 100, this.MemoryTag);
        this.Ipt.CanPitchInput = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashEnterInternalView);
      }
    };
    this.Opt = (e, i) => {
      this.Ept.UpdateSkinInfo(e);
      this.Rpt = e;
      this.kpt();
      this.U$l(true, i);
      if (!i) {
        this.Fpt();
      }
    };
    this.wpt = () => {
      if (this.Apt) {
        this.Apt = false;
        this.SPe?.PlayLevelSequenceByName("Back", true);
        const t = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
        var e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.Rpt);
        const a = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBodyTypeConfig(e.MonsterBodyType);
        ResourceSystem_1.ResourceSystem.LoadAsync(a.MoveForwardCurvePath, UE.CurveFloat, e => {
          var i;
          if (e && (i = UiSceneManager_1.UiSceneManager.GetHandBookVision()) && i.IsValid()) {
            t.SetArmLength(i.CameraArmLength);
            t.SetArmRotationByDefaultCamera();
            t.StartFade(a.MoveForwardDuration, e, true, true, true, true);
          }
        }, 100, this.MemoryTag);
        this.Ipt.CanPitchInput = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 43, "重复退出声骸图鉴的内部界面");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[9, this.xpt]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeCalabashCollectSimplyState, this.Ppt);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeCalabashCollectSimplyState, this.Ppt);
  }
  async OnBeforeStartAsync() {
    this.Apt = false;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.Ipt = new VisionCameraInputItem_1.VisionCameraInputItem();
    await this.Ipt.OnlyCreateByActorAsync(this.GetItem(7).GetOwner());
    this.AddChild(this.Ipt);
    this.Spt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.w7, true);
    this.Tpt = new RoleModelLoadingItem_1.RoleModelLoadingItem();
    await this.Tpt.CreateThenShowByResourceIdAsync("UiItem_Loading_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop)).finally(() => {
      this.Tpt.SetLoadingActive(false);
    });
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(2), this.qpt);
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(3), this.qpt);
    var e = this.ExtraParams;
    if (e > 0) {
      this.Dpt = e;
    }
    this.Vpt();
    this.Ept = new CalabashCollectDetailItem_1.CalabashCollectDetailItem();
    this.Ept.OnLookOverBtnClick = this.Npt;
    this.Ept.OnMonsterSkinBtnClickCallBack = this.Opt;
    await this.Ept.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnBeforeShow() {
    this.vpt.UpdateData(15, ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardSortData());
    var e = this.vpt.GetUniqueIdByGroupId(15);
    this.Mpt.SetFilterUniqueId(e);
    this.Mpt.UpdateData(15, ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardSortData());
    var e = this.Mpt.GetUniqueIdByGroupId(15);
    this.vpt.SetSortUniqueId(e);
    this.Ept.RefreshDetailState();
    this.GetButton(9).RootUIComp.SetActive(this.Apt);
  }
  OnBeforeHide() {
    this.Dpt = this.Rpt;
    this.Tpt.SetLoadingActive(false);
    this.Hpt();
  }
  OnBeforeDestroy() {
    this.kpt();
    this.Tpt.Destroy();
  }
  bpt() {
    var e = this.Spt.GetSelectedGridIndex();
    var e = this.ypt[e];
    this.Ept.Update(e);
    this.Rpt = e.DevelopRewardData.MonsterId;
    this.kpt();
    this.U$l(false, !e.UnlockData);
    if (e.UnlockData) {
      this.Fpt();
    }
  }
  Fpt() {
    if (this.Upt !== ResourceSystem_1.ResourceSystem.InvalidId || UiSceneManager_1.UiSceneManager.GetHandBookVision() !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 43, "声骸模型重复加载");
      }
    } else {
      this.Tpt.SetLoadingActive(true);
      const i = this.Rpt;
      var e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(i);
      this.Upt = ResourceSystem_1.ResourceSystem.LoadAsync(e.HandBookBp + "_C", UE.Class, e => {
        this.jpt(i, e);
      }, 100, this.MemoryTag);
    }
  }
  jpt(e, i) {
    UiSceneManager_1.UiSceneManager.CreateHandBookVision(i);
    var i = UiSceneManager_1.UiSceneManager.GetHandBookVision();
    i.SetActorHiddenInGame(true);
    var t = UE.NewArray(UE.SkeletalMesh);
    var a = UE.NewArray(UE.StaticMesh);
    var s = i.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    var r = i.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
    if (s) {
      for (let e = 0; e < s.Num(); e++) {
        var n = s.Get(e);
        n.SetForcedLOD(1);
        t.Add(n.SkeletalMesh);
      }
    }
    if (r) {
      for (let e = 0; e < r.Num(); e++) {
        var o = r.Get(e);
        o.SetForcedLodModel(1);
        a.Add(o.StaticMesh);
      }
    }
    i = new MeshStreamTaskContext_1.MeshStreamTaskContext();
    i.SkeletalMeshes = t;
    i.StaticMeshes = a;
    i.OnTaskFinish = () => {
      this.Kpt(e);
    };
    this.qpd = ControllerHolder_1.ControllerHolder.MeshStreamController.AddMeshStreamTask(i);
  }
  Kpt(e) {
    var i = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    var t = UiSceneManager_1.UiSceneManager.GetHandBookVision();
    if (t) {
      if (t.CameraArmLength <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Calabash", 43, "相机臂长配置为空");
        }
      } else {
        e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(e);
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e.HandBookCamera, false, false);
        i.SetArmLength(t.CameraArmLength);
        t?.SetActorHiddenInGame(false);
        t?.PlayStart();
        this.Tpt?.SetLoadingActive(false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 43, "声骸模型为空");
    }
  }
  kpt() {
    if (this.Upt !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Upt);
      this.Upt = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (this.qpd !== MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID) {
      ControllerHolder_1.ControllerHolder.MeshStreamController.RemoveMeshStreamTask(this.qpd);
      this.qpd = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    }
    if (UiSceneManager_1.UiSceneManager.GetHandBookVision()) {
      UiSceneManager_1.UiSceneManager.DestroyHandBookVision();
    }
  }
  Vpt() {
    var e = ModelManager_1.ModelManager.CalabashModel.GetCalabashAllSchedule();
    var i = ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
    this.GetText(5)?.SetText(i + "/" + e);
  }
  Hpt() {
    this.Rpt = 0;
    this.Spt?.DeselectCurrentGridProxy();
    this.kpt();
  }
  U$l(e, i) {
    this.GetItem(6)?.SetUIActive(!e && i);
    this.GetItem(10)?.SetUIActive(e && i);
  }
}
exports.CalabashCollectTabView = CalabashCollectTabView;
//# sourceMappingURL=CalabashCollectTabView.js.map