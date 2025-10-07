"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterHandBookView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const MeshStreamDefine_1 = require("../MeshStream/MeshStreamDefine");
const MeshStreamTaskContext_1 = require("../MeshStream/MeshStreamTaskContext");
const VisionCameraInputItem_1 = require("../Phantom/Vision/View/VisionCameraInputItem");
const RoleModelLoadingItem_1 = require("../RoleUi/Component/RoleModelLoadingItem");
const UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const HandBookDefine_1 = require("./HandBookDefine");
const MonsterHandBookDynamicItem_1 = require("./MonsterHandBookDynamicItem");
const MonsterHandBookItem_1 = require("./MonsterHandBookItem");
class MonsterHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.asd = undefined;
    this.zji = undefined;
    this.V6e = undefined;
    this.hsd = undefined;
    this.Upt = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Tpt = undefined;
    this.C0d = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    this.Ipt = undefined;
    this.Apt = false;
    this.lsd = 0;
    this.Rjt = true;
    this.upt = undefined;
    this.cpt = 0;
    this._sd = false;
    this.NPn = (e, i, t) => {
      var s = new MonsterHandBookItem_1.MonsterHandBookItem();
      s.OnClickCallBack = this.usd;
      return s;
    };
    this.usd = (e, i, t) => {
      this.zji?.SetToggleStateForce(0);
      this.zji = e;
      if (i !== this.lsd) {
        this._sd = false;
        this.lsd = i;
        ModelManager_1.ModelManager.HandBookModel.CurrentSelectMonsterHandBookId = this.lsd;
        this.kpt();
        this.Rjt = t;
        if (!this.Rjt) {
          this.Fpt();
        }
        this.csd();
        this.dsd(i);
      }
    };
    this.Z6e = e => {
      if (!e || e.length <= 0) {
        this.GetUIDynScrollViewComponent(4).RootUIComp.SetUIActive(false);
      } else {
        this.GetUIDynScrollViewComponent(4).RootUIComp.SetUIActive(true);
        var i = new Map();
        for (const n of e) {
          var t = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(n);
          if (t) {
            let e = i.get(t.Type);
            (e = e || []).push(t.Id);
            i.set(t.Type, e);
          }
        }
        var s;
        var o;
        var r = [];
        for ([s, o] of i) {
          var a = new HandBookDefine_1.MonsterHandBookDynamicData();
          a.TitleId = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookTypeConfigById(s)?.Descrtption ?? "";
          r.push(a);
          var a = new HandBookDefine_1.MonsterHandBookDynamicData();
          a.MonsterList = o;
          r.push(a);
        }
        if (r.length <= 0) {
          this.csd();
        } else {
          ModelManager_1.ModelManager.HandBookModel.CurrentSelectMonsterHandBookId = e[0];
          this.asd?.RefreshByData(r);
        }
      }
    };
    this.Npt = () => {
      if (!this.Apt) {
        this.UiViewSequence?.PlaySequence("On");
        this.GetButton(21).RootUIComp.SetUIActive(true);
        this.GetButton(12).RootUIComp.SetUIActive(false);
        this.GetButton(13).RootUIComp.SetUIActive(false);
        this.lqe?.SetCloseBtnActive(false);
        this.Apt = true;
        const i = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
        var e = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(this.lsd);
        if (e) {
          const t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBodyTypeConfig(e.MonsterBodyType);
          ResourceSystem_1.ResourceSystem.LoadAsync(t.MoveForwardCurvePath, UE.CurveFloat, e => {
            if (e) {
              i.DoMoveForward(t.MoveForwardDistance, t.MoveForwardDuration, e);
            }
          });
          this.Ipt.CanPitchInput = true;
          this.SAt();
        }
      }
    };
    this.wpt = () => {
      if (this.Apt) {
        this.UiViewSequence?.PlaySequence("Off");
        this.GetButton(21).RootUIComp.SetUIActive(false);
        this.GetButton(12).RootUIComp.SetUIActive(true);
        this.lqe?.SetCloseBtnActive(true);
        this.GetButton(13).RootUIComp.SetUIActive(!this.Rjt && (this.upt?.length ?? 0) > 1);
        this.Apt = false;
        const t = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
        var e = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(this.lsd);
        if (e) {
          const s = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBodyTypeConfig(e.MonsterBodyType);
          ResourceSystem_1.ResourceSystem.LoadAsync(s.MoveForwardCurvePath, UE.CurveFloat, e => {
            var i;
            if (e && (i = UiSceneManager_1.UiSceneManager.GetHandBookVision()) && i.IsValid()) {
              t.SetArmLength(i.CameraArmLength);
              t.SetArmRotationByDefaultCamera();
              t.StartFade(s.MoveForwardDuration, e, true, true, true, true);
            }
          });
          this.Ipt.CanPitchInput = false;
          this.SAt();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HandBook", 5, "重复退出声骸图鉴的内部界面");
      }
    };
    this.Cpt = () => {
      var e;
      var i;
      if (this.upt) {
        this.cpt++;
        if (this.cpt >= this.upt.length) {
          this.cpt = 0;
        }
        this._sd = this.cpt > 0;
        e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(this.upt[this.cpt]).MonsterId;
        e = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigByMonsterId(e);
        this.lsd = e?.Id ?? 0;
        if (this.cpt === 0) {
          i = ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(this.lsd);
          this.Rjt = !e?.DefaultUnlock && (i?.IsLock ?? true);
        } else {
          this.Rjt = this.cpt > 0 && !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(this.upt[this.cpt]);
        }
        this.kpt();
        this.Tpt.SetLoadingActive(false);
        if (!this.Rjt) {
          this.Fpt();
        }
        this.csd();
      }
    };
    this.I8d = () => {
      this.wpt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIDynScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIHorizontalLayout], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIText], [21, UE.UIButtonComponent]];
    this.BtnBindInfo = [[12, this.Npt], [13, this.Cpt], [21, this.I8d]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetTitleByTextIdAndArgNew("HandBookEntrance_0_Name");
    this.lqe.SetHelpBtnActive(false);
    this.hsd = new MonsterHandBookDynamicItem_1.MonsterHandBookDynamicItem();
    this.asd = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(4), this.GetItem(5), this.hsd, this.NPn);
    await this.asd.Init();
    this.Ipt = new VisionCameraInputItem_1.VisionCameraInputItem();
    await this.Ipt.OnlyCreateByActorAsync(this.GetItem(1).GetOwner());
    this.AddChild(this.Ipt);
    this.Tpt = new RoleModelLoadingItem_1.RoleModelLoadingItem();
    await this.Tpt.CreateThenShowByResourceIdAsync("UiItem_Loading_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop)).finally(() => {
      this.Tpt.SetLoadingActive(false);
    });
    this.V6e = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(6), this.Z6e);
    this.GetButton(21).RootUIComp.SetUIActive(false);
  }
  OnBeforeShow() {
    this.msd();
    this.V6e.UpdateData(44, ModelManager_1.ModelManager.HandBookModel.GetAllHandBookMonsterIdList());
  }
  csd() {
    var e;
    var i;
    if (!this.wke()) {
      if (e = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(this.lsd)) {
        i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(this.lsd);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.Name);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookTypeConfigById(e.Type)?.Descrtption ?? "");
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i.DiscoveredDes);
        this.lpl(e.MonsterId);
      }
    }
  }
  wke() {
    this.GetButton(12).RootUIComp.SetUIActive(!this.Rjt);
    if (this.Rjt || !this.lsd) {
      this.GetItem(17).SetUIActive(true);
      this.GetItem(16).SetUIActive(false);
      this.Ipt?.SetUiActive(false);
      if (this._sd) {
        this.GetText(20).SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "MonsterHandBookMonsterSkinNotHave");
      } else {
        this.GetText(20).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "MonsterHandBookMonsterNotHave");
        this.GetButton(13).RootUIComp.SetUIActive(false);
      }
      return true;
    } else {
      this.GetItem(17).SetUIActive(false);
      this.GetItem(16).SetUIActive(true);
      this.Ipt?.SetUiActive(true);
      return false;
    }
  }
  msd() {
    var e = ControllerHolder_1.ControllerHolder.HandBookController.GetCollectProgress(0);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleExp", e[0], e[1]);
  }
  Fpt() {
    if (this.Upt !== ResourceSystem_1.ResourceSystem.InvalidId || UiSceneManager_1.UiSceneManager.GetHandBookVision() !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HandBook", 5, "怪物模型重复加载");
      }
    } else {
      this.Tpt.SetLoadingActive(true);
      const i = this.lsd;
      var e = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(i);
      if (e) {
        this.Upt = ResourceSystem_1.ResourceSystem.LoadAsync(e.HandBookBp + "_C", UE.Class, e => {
          this.jpt(i, e);
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HandBook", 5, "怪物图鉴配置不存在", ["monsterId", i]);
      }
    }
  }
  jpt(e, i) {
    UiSceneManager_1.UiSceneManager.CreateHandBookVision(i);
    var i = UiSceneManager_1.UiSceneManager.GetHandBookVision();
    i.SetActorHiddenInGame(true);
    var t = UE.NewArray(UE.SkeletalMesh);
    var s = UE.NewArray(UE.StaticMesh);
    var o = i.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    var r = i.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
    if (o) {
      for (let e = 0; e < o.Num(); e++) {
        var a = o.Get(e);
        a.SetForcedLOD(1);
        t.Add(a.SkeletalMesh);
      }
    }
    if (r) {
      for (let e = 0; e < r.Num(); e++) {
        var n = r.Get(e);
        n.SetForcedLodModel(1);
        s.Add(n.StaticMesh);
      }
    }
    i = new MeshStreamTaskContext_1.MeshStreamTaskContext();
    i.SkeletalMeshes = t;
    i.StaticMeshes = s;
    i.OnTaskFinish = () => {
      this.Kpt(e);
    };
    this.C0d = ControllerHolder_1.ControllerHolder.MeshStreamController.AddMeshStreamTask(i);
  }
  Kpt(e) {
    var i = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    var t = UiSceneManager_1.UiSceneManager.GetHandBookVision();
    if (t) {
      if (t.CameraArmLength <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HandBook", 5, "相机臂长配置为空");
        }
      } else if (e = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(e)) {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e.HandBookCamera, false, false);
        i.SetArmLength(t.CameraArmLength);
        t?.SetActorHiddenInGame(false);
        t?.PlayStart();
        this.Tpt?.SetLoadingActive(false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HandBook", 5, "声骸模型为空");
    }
  }
  kpt() {
    if (this.Upt !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Upt);
      this.Upt = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (this.C0d !== MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID) {
      ControllerHolder_1.ControllerHolder.MeshStreamController.RemoveMeshStreamTask(this.C0d);
      this.C0d = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    }
    if (UiSceneManager_1.UiSceneManager.GetHandBookVision()) {
      UiSceneManager_1.UiSceneManager.DestroyHandBookVision();
    }
  }
  OnBeforeDestroy() {
    this.kpt();
    this.Tpt.Destroy();
  }
  SAt() {
    this.GetItem(18).SetUIActive(!this.Apt);
    this.GetItem(16).SetUIActive(!this.Apt);
    this.lqe?.SetUiActive(!this.Apt);
  }
  lpl(e) {
    if (!this._sd) {
      this.upt = undefined;
      if (!e || !(e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(e)) || e.length <= 0) {
        this.GetButton(13).RootUIComp.SetUIActive(false);
      } else {
        this.GetButton(13).RootUIComp.SetUIActive(!this.Rjt && e.length > 1);
        this.upt = e;
        this.cpt = 0;
      }
    }
  }
  dsd(e) {
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(0, e);
    if (i && !i.IsRead) {
      ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedReadRequest(0, e);
    }
  }
}
exports.MonsterHandBookView = MonsterHandBookView;
//# sourceMappingURL=MonsterHandBookView.js.map