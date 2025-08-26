"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaScanView = exports.SCENE_ROLE_TAG = exports.SCENE_CAMERA_TAG = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiManager_1 = require("../../../Ui/UiManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const ChannelController_1 = require("../../Channel/ChannelController");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const ShareRewardInfo_1 = require("../../Photograph/View/ShareRewardInfo");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaDefine_1 = require("../GachaDefine");
const GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView");
exports.SCENE_CAMERA_TAG = new UE.FName("SequenceCamera");
exports.SCENE_ROLE_TAG = new UE.FName("Role");
class GachaScanView extends GachaSceneView_1.GachaSceneView {
  constructor() {
    super(...arguments);
    this.GachaResult = undefined;
    this.CurIndex = 0;
    this.LastIndex = -1;
    this.xWt = undefined;
    this.JWt = undefined;
    this.SPe = undefined;
    this.zWt = undefined;
    this.ZWt = undefined;
    this.b2t = undefined;
    this.eKt = undefined;
    this.tKt = undefined;
    this.iKt = undefined;
    this.oKt = undefined;
    this.exe = undefined;
    this.$be = undefined;
    this.NWt = undefined;
    this.rKt = 0;
    this.nKt = 0;
    this.sKt = 0;
    this.aKt = 0;
    this.hKt = undefined;
    this.lKt = 0;
    this._Kt = false;
    this.uKt = undefined;
    this.cKt = undefined;
    this.mKt = 190;
    this.dKt = 190;
    this.CKt = false;
    this.gKt = undefined;
    this.C4_ = false;
    this.oXu = 0;
    this.OWt = () => {
      var e;
      var i = this.lKt >= 5 && ChannelController_1.ChannelController.CouldShare();
      this.GetItem(18)?.SetUIActive(i);
      if (i && (i = ShareRewardById_1.configShareRewardById.GetConfig(ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(this.fKt().e9n.L8n) === 2 ? 4 : 3), e = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(i.Id), this.GetItem(20)?.SetUIActive(e), e)) {
        e = [...i.Reward][0];
        this.NWt?.SetItemInfo(e[0], e[1]);
      }
    };
    this.pKt = () => {
      ChannelController_1.ChannelController.ShareGacha([this.fKt()]);
    };
    this.vKt = () => {
      this._Kt = true;
      this.AddIndex();
    };
    this.kWt = () => {
      if (this.CKt) {
        this.AddIndex();
      }
    };
    this.MKt = undefined;
    this.EKt = undefined;
    this.OnSequenceEventByStringParam = e => {
      var i = this.MKt;
      var t = this.EKt;
      var s = i.Model;
      var r = t.Model;
      switch (e) {
        case "Flash1":
          this.eKt.NiagaraComponent.ReinitializeSystem();
          break;
        case "Flash2":
          AudioSystem_1.AudioSystem.PostEvent("ui_gacha_scan_burst");
          if (this.lKt === 5) {
            this.tKt.SetActorHiddenInGame(false);
            this.tKt?.NiagaraComponent.ReinitializeSystem();
          } else if (this.lKt === 4) {
            this.iKt.SetActorHiddenInGame(false);
            this.iKt?.NiagaraComponent.ReinitializeSystem();
          } else if (this.lKt === 3) {
            this.oKt.SetActorHiddenInGame(false);
            this.oKt?.NiagaraComponent.ReinitializeSystem();
          }
          break;
        case "WeaponDA":
          this.rKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(s, "GachaMaterialController");
          this.nKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(r, "GachaMaterialController");
          break;
        case "WeaponEffect":
          if (this.lKt === 5) {
            this.sKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(s, "GachaBurstGoldController");
            this.aKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(r, "GachaBurstGoldController");
          } else if (this.lKt === 4) {
            this.sKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(s, "GachaBurstPurpleController");
            this.aKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(r, "GachaBurstPurpleController");
          } else if (this.lKt === 3) {
            this.sKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(s, "GachaBurstWhiteController");
            this.aKt = UiModelUtil_1.UiModelUtil.SetRenderingMaterial(r, "GachaBurstWhiteController");
          }
          break;
        case "RemoveWeaponDA":
          UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(s, this.rKt);
          UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(r, this.nKt);
          UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(s, this.sKt);
          UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(r, this.aKt);
      }
    };
    this.$An = e => {
      if (this.$be && e === "GachaStart") {
        this.GetHorizontalLayout(6).GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass()).Play("", this.$be.GetDisplayCount());
      }
    };
  }
  fKt() {
    return this.GachaResult[this.CurIndex];
  }
  SKt() {
    if (!(this.LastIndex < 0)) {
      return this.GachaResult[this.LastIndex];
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UIText], [18, UE.UIItem], [19, UE.UIButtonComponent], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem]];
    this.BtnBindInfo = [[0, this.vKt], [1, this.kWt], [19, this.pKt]];
  }
  async OnBeforeStartAsync() {
    this.C4_ = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.SkyBlending.AllowSettingLerpPerFrame") === 0;
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 1");
    }
    if (Info_1.Info.IsLowMemoryDevice && (this.oXu = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.DepthOfFieldQuality"), this.oXu !== 0)) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality 0");
    }
    var e = this.OpenParam;
    if (e !== undefined && e.SkipOnLoadResourceFinish) {
      var i = [];
      for (const t of ModelManager_1.ModelManager.GachaModel.CurGachaResult) {
        i.push(t.e9n.L8n);
      }
      await ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence(i);
    }
    this.NWt = new ShareRewardInfo_1.ShareRewardInfo();
    await this.NWt.OnlyCreateByActorAsync(this.GetItem(21).GetOwner());
    this.AddChild(this.NWt);
    this.GachaResult = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
    this.GachaResult ||= [];
    this.GetItem(12).SetUIActive(false);
    if (this.GachaResult.find(e => {
      e = e.e9n?.L8n ?? 0;
      return ModelManager_1.ModelManager.GachaModel.GetGachaQuality(e) === 5;
    }) !== undefined) {
      e = (await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_FiveStar", this.GetItem(12))).GetComponentByClass(UE.UIItem.StaticClass());
      this.zWt = new LevelSequencePlayer_1.LevelSequencePlayer(e);
      this.zWt.BindSequenceCloseEvent(() => {
        this.GetItem(12).SetUIActive(false);
        this.AfterFiveStarAnimation();
      });
    }
    this.gKt = CameraController_1.CameraController.Model.CurrentCameraActor;
  }
  OnAfterOpenUiScene() {
    this.exe = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"), 0);
    this.eKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Flash1"), 0);
    this.tKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstGold"), 0);
    this.iKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstPurple"), 0);
    this.oKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstWhite"), 0);
    this.hKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"), 0);
    this.hKt.SetTickableWhenPaused(true);
    this.eKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.tKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.iKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.oKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    var e = new UE.VectorDouble(200, 0, 0);
    var i = new UE.VectorDouble(60, 0, 0);
    var t = new UE.Rotator(0, 90, 0);
    this.eKt.D_K2_SetActorRelativeLocation(i, false, undefined, false);
    this.tKt.D_K2_SetActorRelativeLocation(e, false, undefined, false);
    this.iKt.D_K2_SetActorRelativeLocation(e, false, undefined, false);
    this.oKt.D_K2_SetActorRelativeLocation(e, false, undefined, false);
    this.eKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.tKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.iKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.oKt.K2_SetActorRelativeRotation(t, false, undefined, false);
  }
  yKt() {
    this.tKt?.SetActorHiddenInGame(true);
    this.iKt?.SetActorHiddenInGame(true);
    this.oKt?.SetActorHiddenInGame(true);
    this.tKt?.NiagaraComponent?.Deactivate();
    this.iKt?.NiagaraComponent?.Deactivate();
    this.oKt?.NiagaraComponent?.Deactivate();
  }
  IKt() {
    this.xWt = new SmallItemGrid_1.SmallItemGrid();
    this.xWt.Initialize(this.GetItem(8).GetOwner());
    this.JWt = new SmallItemGrid_1.SmallItemGrid();
    this.JWt.Initialize(this.GetItem(10).GetOwner());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.OnSequenceEventByStringParam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFirstShare, this.OWt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.OnSequenceEventByStringParam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFirstShare, this.OWt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  Refresh() {
    this.yKt();
    var e = this.fKt().e9n?.L8n ?? 0;
    if (e <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Gacha", 43, "抽卡获得物品为空");
      }
    } else {
      if ((e = ModelManager_1.ModelManager.GachaModel.GetGachaQuality(e)) === 3) {
        AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "normal");
      } else if (e === 4) {
        AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "purple");
      } else if (e === 5) {
        AudioSystem_1.AudioSystem.SetState("ui_gacha_quality", "golden");
      }
      AudioSystem_1.AudioSystem.PostEvent("ui_gacha_scan_next");
      if (e === 5) {
        this.GetItem(12).SetUIActive(true);
        this.zWt?.PlayLevelSequenceByName("Start", true);
      } else {
        this.AfterFiveStarAnimation();
      }
    }
  }
  AfterFiveStarAnimation() {
    this.RefreshModel();
    this.RefreshView();
    this.OWt();
  }
  RefreshView() {
    var e = this.fKt();
    var i = e.e9n.L8n;
    var t = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.e9n.L8n);
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
    let r = 0;
    this.ZWt?.StopSequenceByKey("Show");
    this.ZWt?.StopSequenceByKey("ConvertShow");
    this.GetItem(13).SetAlpha(0);
    this.GetItem(22).SetAlpha(0);
    this.GetItem(18).GetParentAsUIItem().SetUIActive(false);
    if (t === 1) {
      this.GetItem(3).SetUIActive(true);
      t = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i);
      r = t.QualityId;
      h = t.ElementId;
      if (h = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(h)) {
        this.GetTexture(5).SetColor(UE.Color.FromHex(h.ElementColor));
        a = this.GetTexture(4);
        this.SetTextureByPath(h.Icon, a);
        h = UE.Color.FromHex(h.ElementColor);
        a.SetColor(h);
      }
      this.GetText(2).ShowTextNew(t.Name);
    } else {
      this.GetItem(3).SetUIActive(true);
      a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(i);
      if (h = ConfigManager_1.ConfigManager.GachaConfig.GetGachaWeaponTransformConfig(a.WeaponType)) {
        this.SetTextureByPath(h.WeaponTypeTexture, this.GetTexture(4));
      }
      t = new UE.Vector(0.8, 0.8, 0.8);
      this.GetTexture(4).SetUIItemScale(t);
      this.GetTexture(4).SetColor(ColorUtils_1.ColorUtils.ColorWhile);
      r = s.QualityId;
      this.GetText(2).ShowTextNew(s.Name);
    }
    var i = r === 5 || r === 4 && e.IsNew;
    this.GetButton(0).RootUIComp.SetUIActive(!i);
    this.$be.RebuildLayout(r);
    var a = e.h9n;
    this.GetItem(11)?.SetUIActive(e.IsNew);
    this.GetItem(7).SetUIActive(!!a && a?.length > 0);
    if (e.h9n && e.h9n?.length > 0) {
      this.xWt.SetActive(true);
      const o = e.h9n[0];
      var h = {
        Type: 4,
        ItemConfigId: o.L8n,
        BottomText: o.n9n.toString(),
        Data: undefined
      };
      this.xWt.Apply(h);
      this.xWt.BindOnCanExecuteChange(() => false);
      this.xWt.BindOnExtendToggleRelease(() => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(o.L8n);
      });
    } else {
      this.xWt.SetActive(false);
    }
    t = e.a9n;
    this.GetItem(9).SetUIActive((t?.length ?? 0) > 0);
    if (t && t?.length > 0) {
      this.JWt.SetActive(true);
      const n = t[0];
      s = {
        Type: 4,
        ItemConfigId: n.L8n,
        BottomText: n.n9n.toString(),
        Data: undefined
      };
      this.JWt.Apply(s);
      this.JWt.BindOnCanExecuteChange(() => false);
      this.JWt.BindOnExtendToggleRelease(() => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(n.L8n);
      });
    } else {
      this.JWt.SetActive(false);
    }
    if ((t?.length ?? 0) > 1 && (i = t[1], Log_1.Log.CheckError())) {
      Log_1.Log.Error("Gacha", 8, "转换奖励只能有一个!, 请检查配置表", ["itemId", i.L8n], ["itemCount", i.n9n]);
    }
    a = e.l9n;
    this.GetItem(14).GetParentAsUIItem().SetUIActive(false);
    if (a && a.L8n > 0 && a.n9n > 0) {
      this.SetItemIcon(this.GetTexture(15), a.L8n);
      this.GetText(16)?.SetText(a.n9n.toString());
      this.GetItem(14).SetUIActive(true);
    } else {
      this.GetItem(14).SetUIActive(false);
    }
  }
  RefreshModel() {
    var e = this.SKt();
    if (e) {
      e = e.e9n.L8n;
      switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e)) {
        case 1:
          this.TKt();
          break;
        case 2:
          this.LKt();
      }
    }
    e = this.fKt();
    if (e) {
      var t = e.e9n.L8n;
      var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(t);
      var s = ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(e.ShowSequence);
      var r = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(t);
      var s = ModelManager_1.ModelManager.GachaModel.GetLoadedSequence(s.SequencePath);
      UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(s);
      this.DKt();
      CameraController_1.CameraController.SetViewTarget(this.exe, "GachaScanView.RefreshModel");
      var a = new UE.MovieSceneSequencePlaybackSettings();
      a.bRestoreState = true;
      a.bPauseAtEnd = true;
      this.b2t = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
      this.b2t.PlaybackSettings = a;
      this.SPe = this.b2t.SequencePlayer;
      this.b2t.SetSequence(s);
      UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(s, true);
      this.b2t.SetTickableWhenPaused(true);
      this.b2t.AddBindingByTag(exports.SCENE_CAMERA_TAG, this.exe, false, true);
      if (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow) {
        if (e.BindPoint?.length > 0) {
          this.b2t.bOverrideInstanceData = true;
          this.b2t.DefaultInstanceData.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e.BindPoint), 1);
        } else {
          this.b2t.bOverrideInstanceData = true;
          a = this.b2t.DefaultInstanceData;
          s = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
          s = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(s.D_GetTransform());
          a.TransformOrigin = s;
        }
      } else if (e.BindPoint?.length > 0) {
        this.b2t.bOverrideInstanceData = true;
        this.b2t.DefaultInstanceData.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e.BindPoint), 1);
      }
      var h = this.b2t.GetBindingByTagInTemplate(exports.SCENE_ROLE_TAG, true);
      var o = h.Num();
      for (let e = 0; e < o; e++) {
        var n = h.Get(e);
        if (n) {
          var l = n.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
          var _ = l.Num();
          for (let e = 0; e < _; e++) {
            var d = l.Get(e);
            if (d) {
              d.SetTickableWhenPaused(true);
            }
          }
          if (n instanceof UE.BP_BaseRole_Seq_V2_C) {
            n.SetTickableWhenPaused(true);
          }
        }
      }
      this.CKt = false;
      if (r === 1) {
        this.SPe.OnPause.Add(() => {
          this.CKt = true;
        });
        a = this.SPe.GetStartTime().Time;
        this.SPe.PlayTo(new UE.MovieSceneSequencePlaybackParams(a, 0, "A", 2, 0));
      } else {
        this.SPe.OnFinished.Add(() => {
          this.CKt = true;
        });
        this.SPe.Play();
      }
      if (this.cKt) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.cKt);
        this.cKt = undefined;
      }
      let i = 120;
      switch (r) {
        case 1:
          this.lKt = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(t).QualityId;
          i = this.mKt;
          this.RKt();
          break;
        case 2:
          this.UKt(t);
          this.lKt = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t)?.QualityId;
          i = this.dKt;
      }
      this.ZWt.StopSequenceByKey("Show");
      this.cKt = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        var e = this.SPe.GetCurrentTime().Time.FrameNumber.Value;
        if (this.SPe.GetEndTime().Time.FrameNumber.Value - e < i) {
          this.ZWt.PlayLevelSequenceByName("Show", false);
          TimerSystem_1.GameplayTimerSystem.Remove(this.cKt);
          this.cKt = undefined;
        }
      }, 100);
    }
  }
  LKt() {
    var e = this.MKt?.Model;
    var i = this.EKt?.Model;
    if (e) {
      UiModelUtil_1.UiModelUtil.SetVisible(e, false);
    }
    if (i) {
      UiModelUtil_1.UiModelUtil.SetVisible(i, false);
    }
  }
  RKt() {
    var e = this.fKt().e9n.L8n;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
    if (e.QualityId === 5) {
      this.hKt?.UpdateGachaShowItem(e.Id, 4);
    } else {
      this.hKt?.UpdateGachaShowItem(e.Id, 3);
    }
  }
  TKt() {
    this.DKt();
  }
  DKt() {
    if (this.SPe) {
      this.SPe.OnStop.Clear();
      this.SPe.Stop();
      this.SPe = undefined;
    }
    if (this.b2t?.IsValid()) {
      this.b2t.ResetBindings();
      this.b2t.SetSequence(undefined);
      this.b2t.K2_DestroyActor();
      this.b2t = undefined;
    }
  }
  UKt(e) {
    if (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e) === 2) {
      this.Yjt(e);
    }
  }
  Yjt(e) {
    var i = this.MKt;
    if (i) {
      var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e);
      let s = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.uKt, e.toString());
      s = s || ConfigManager_1.ConfigManager.GachaConfig.GetGachaWeaponTransformConfig(t.WeaponType);
      const r = i.Model;
      e = r.CheckGetComponent(2);
      const a = r.CheckGetComponent(1);
      e?.LoadModelByModelId(t.ModelId, false, () => {
        if (!s.ShowScabbard) {
          UiModelUtil_1.UiModelUtil.SetVisible(r, true);
        }
        var e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(GachaDefine_1.GACHA_WEAPON_CASE), 1);
        a.Actor?.K2_AttachToActor(e, undefined, 2, 2, 2, false);
        var e = Transform_1.Transform.Create();
        var i = s.Rotation;
        var i = Rotator_1.Rotator.Create(i.Y, i.Z, i.X);
        var t = s.Size;
        var t = Vector_1.Vector.Create(t, t, t);
        e.SetLocation(s.Location);
        e.SetRotation(i.Quaternion());
        e.SetScale3D(t.ToUeVector());
        a.MainMeshComponent?.D_K2_SetRelativeTransform(e.ToUeTransform(), false, undefined, false);
        var i = r.CheckGetComponent(9);
        i?.SetRotateParam(s.RotateTime, 1, true);
        var t = new UE.Rotator(s.AxisRotate.Y, s.AxisRotate.Z, s.AxisRotate.X);
        a?.Actor?.K2_SetActorRotation(t, false);
        i?.StartRotate();
      });
      if (t.QualityId === 5) {
        this.hKt?.WeaponGolden();
      } else if (t.QualityId === 4) {
        this.hKt?.WeaponPurple();
      } else if (t.QualityId === 3) {
        this.hKt?.WeaponNormal();
      }
      const h = this.EKt.Model;
      i = t.Models;
      if (s.ShowScabbard && i.length > 1) {
        e = i[1];
        h.CheckGetComponent(2)?.LoadModelByModelId(e, false, () => {
          var e = h.CheckGetComponent(1);
          e.Actor.K2_AttachToActor(a?.Actor, undefined, 2, 1, 1, false);
          var i = Transform_1.Transform.Create();
          i.SetLocation(s.ScabbardOffset);
          e?.MainMeshComponent?.D_K2_SetRelativeTransform(i.ToUeTransform(), false, undefined, false);
          UiModelUtil_1.UiModelUtil.SetVisible(h, true);
        });
      } else {
        UiModelUtil_1.UiModelUtil.SetVisible(h, false);
      }
    }
  }
  AddIndex() {
    if (this.CurIndex >= this.GachaResult.length - 1) {
      this.Finish();
    } else {
      if (this._Kt) {
        var e = this.AKt();
        if (!(e > 0)) {
          this.Finish();
          return;
        }
        this.LastIndex = this.CurIndex;
        this.CurIndex = e;
      } else {
        this.LastIndex = this.CurIndex;
        this.CurIndex++;
      }
      this.Refresh();
    }
  }
  AKt() {
    for (let e = this.CurIndex + 1; e < this.GachaResult.length; e++) {
      var i = this.GachaResult[e];
      var t = i.e9n.L8n;
      var t = ModelManager_1.ModelManager.GachaModel.GetGachaQuality(t);
      if (t === 5 || t >= 4 && i.IsNew) {
        return e;
      }
    }
    return -1;
  }
  Finish() {
    ModelManager_1.ModelManager.GachaModel.CanCloseView = true;
    BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "GachaSkip").then(() => {
      CameraController_1.CameraController.SetViewTarget(this.gKt, "GachaScanView.Finish");
      UiManager_1.UiManager.OpenView("GachaResultView", this.OpenParam, () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      });
    }).finally(undefined);
    ModelManager_1.ModelManager.GachaModel.CanCloseView = false;
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "GachaSkip");
    UiSceneManager_1.UiSceneManager.InitGachaItemObserver();
    this.MKt = UiSceneManager_1.UiSceneManager.GetGachaItemObserver();
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(5);
    this.EKt = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver();
    var e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"), 0);
    if (!e?.IsSkip) {
      e.WhiteScreenOff();
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroBloomEnable 1");
    this.uKt = ResourceSystem_1.ResourceSystem.Load("/Game/Aki/Data/GaCha/GachaWeaponTransform.GachaWeaponTransform", UE.DataTable);
    this.IKt();
    var e = this.OpenParam;
    this._Kt = e && e.IsOnlyShowGold;
    if (this._Kt) {
      this.CurIndex = -1;
      e = this.AKt();
      this.CurIndex = e > 0 ? e : 0;
    } else {
      this.CurIndex = 0;
    }
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(6));
    this.ZWt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.mKt = CommonParamById_1.configCommonParamById.GetIntConfig("GachaRoleBeforeEndFrame") ?? this.mKt;
    this.dKt = CommonParamById_1.configCommonParamById.GetIntConfig("GachaWeaponBeforeEndFrame") ?? this.dKt;
    this.Refresh();
  }
  OnBeforeHideImplement() {
    GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.BLOOM);
    if (this.hKt?.IsValid()) {
      this.hKt?.EndGachaScene();
    }
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0);
  }
  OnBeforeDestroyImplementImplement() {
    this.uKt = undefined;
    this.zWt?.Clear();
    this.ZWt?.Clear();
    UiSceneManager_1.UiSceneManager.DestroyGachaItemObserver();
    UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.EKt);
    if (this.cKt) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.cKt);
      this.cKt = undefined;
    }
  }
  OnBeforeDestroy() {
    this.AddChild(this.xWt);
    this.AddChild(this.JWt);
    this.TKt();
    ModelManager_1.ModelManager.GachaModel.ReleaseLoadGachaSequence();
    UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 0");
    }
    if (Info_1.Info.IsLowMemoryDevice && this.oXu !== 0) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality " + this.oXu);
    }
    if (Info_1.Info.IsMacPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.AllowHardwareOcclusion 1");
    }
  }
}
exports.GachaScanView = GachaScanView;
//# sourceMappingURL=GachaScanView.js.map