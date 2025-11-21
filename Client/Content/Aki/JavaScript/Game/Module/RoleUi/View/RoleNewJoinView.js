"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleNewJoinView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiBehaviorGachaSequence_1 = require("../../../Ui/Base/UiBehaviorGachaSequence");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const GachaDefine_1 = require("../../Gacha/GachaDefine");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
const RoleController_1 = require("../RoleController");
class RoleNewJoinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.UiCameraHandleData = undefined;
    this.eKt = undefined;
    this.tKt = undefined;
    this.iKt = undefined;
    this.oKt = undefined;
    this.exe = undefined;
    this.hKt = undefined;
    this.$be = undefined;
    this.FQc = undefined;
    this.lKt = 0;
    this.l0o = false;
    this.OnSequenceEventByStringParam = i => {
      switch (i) {
        case "Flash1":
          this.eKt.NiagaraComponent.ReinitializeSystem();
          break;
        case "Flash2":
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
      }
    };
    this.CloseViewEvent = () => {
      this.wKt();
    };
    this.wKt = () => {
      this.BKt(true);
    };
    this.BKt = i => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Gacha", 27, "GachaScene被关闭");
      }
      if (i) {
        if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
          this.CloseMe();
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterCloseGachaScene);
      }
    };
    this._0o = () => {
      this.$ne();
    };
    this.Cho = () => {
      if (!this.l0o) {
        this.l0o = true;
        this.u0o();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIHorizontalLayout], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.Cho], [7, this._0o]];
  }
  OnBeforeCreate() {
    this.dFe = this.OpenParam;
    this.lKt = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.dFe).QualityId;
    this.FQc = new UiBehaviorGachaSequence_1.UiBehaviorGachaSequence();
    this.AddUiBehavior(this.FQc);
  }
  async OnCreateAsync() {
    await Promise.all([BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "RoleNewJoinView")]);
  }
  async OnBeforeStartAsync() {
    await this.FQc.PreLoadLevelSequence(this.dFe);
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(4));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.OnSequenceEventByStringParam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseGachaSceneView, this.CloseViewEvent);
  }
  OnHandleLoadScene() {
    this.exe = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"), 0);
    this.FQc.BindSceneSequenceCamera(this.exe);
    this.eKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Flash1"), 0);
    this.tKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstGold"), 0);
    this.iKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstPurple"), 0);
    this.oKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstWhite"), 0);
    this.hKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"), 0);
    this.hKt.SetTickableWhenPaused(true);
    this.FQc.BindUpdateInteractBp(this.hKt);
    this.eKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.tKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.iKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.oKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    var i = new UE.VectorDouble(200, 0, 0);
    var e = new UE.VectorDouble(60, 0, 0);
    var t = new UE.Rotator(0, 90, 0);
    this.eKt.D_K2_SetActorRelativeLocation(e, false, undefined, false);
    this.tKt.D_K2_SetActorRelativeLocation(i, false, undefined, false);
    this.iKt.D_K2_SetActorRelativeLocation(i, false, undefined, false);
    this.oKt.D_K2_SetActorRelativeLocation(i, false, undefined, false);
    this.eKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.tKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.iKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.oKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.UiCameraHandleData = UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(GachaDefine_1.GACHA_WEAPON_CAMERA, true, true, GachaDefine_1.GACHA_BLEND_CAMERA);
  }
  OnAfterShow() {
    this.l0o = false;
    this.bl();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.OnSequenceEventByStringParam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseGachaSceneView, this.CloseViewEvent);
  }
  OnBeforeDestroy() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.UiCameraHandleData, GachaDefine_1.GACHA_BLEND_CAMERA);
  }
  bl() {
    this.yKt();
    this.Og();
    this.PlayGachaSequence();
    this.UiViewSequence.StopPrevSequence(false);
    this.UiViewSequence.PlaySequence("Show", true);
  }
  Og() {
    var i;
    var e = this.dFe;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
    var t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e.ElementId);
    if (t) {
      this.GetTexture(3).SetColor(UE.Color.FromHex(t.ElementColor));
      i = this.GetTexture(2);
      this.SetTextureByPath(t.Icon, i);
      t = UE.Color.FromHex(t.ElementColor);
      i.SetColor(t);
    }
    this.GetText(0).ShowTextNew(e.Name);
    this.GetText(5).ShowTextNew(e.Introduction);
    this.$be.RebuildLayout(this.lKt);
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "RoleNewJoinView");
  }
  PlayGachaSequence() {
    var i = new UE.MovieSceneSequencePlaybackSettings();
    i.bRestoreState = true;
    i.bPauseAtEnd = true;
    this.FQc.SetSequencePlayBackSetting(this.dFe, i);
    this.FQc.PlayRoleSequence(this.dFe);
    this.RKt();
  }
  RKt() {
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.dFe);
    if (i.Id === 1302) {
      this.hKt?.Yinlin();
    } else if (i.Id === 1404) {
      this.hKt?.Jiyan();
    } else if (i.Id === 1203) {
      this.hKt?.Anke();
    } else if (i.Id === 1503) {
      this.hKt?.Jueyuan();
    } else if (i.Id === 1301) {
      this.hKt?.Kakaluo();
    } else if (i.Id === 1603) {
      this.hKt?.Chun();
    } else if (i.Id === 1104) {
      this.hKt?.Awu();
    } else if (i.QualityId === 5) {
      this.hKt?.CharacterGolden();
    } else if (i.QualityId === 4) {
      this.hKt?.CharacterPurple();
    }
  }
  yKt() {
    this.tKt.SetActorHiddenInGame(true);
    this.iKt.SetActorHiddenInGame(true);
    this.oKt.SetActorHiddenInGame(true);
    this.tKt.NiagaraComponent?.Deactivate();
    this.iKt.NiagaraComponent?.Deactivate();
    this.oKt.NiagaraComponent?.Deactivate();
  }
  $ne() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseGachaSceneView);
  }
  async u0o() {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "RoleNewJoinView");
    var i = [this.dFe];
    RoleController_1.RoleController.CloseAndOpenRoleMainView(this.Info.Name, 0, this.dFe, i, undefined, () => {
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "RoleNewJoinView");
      this.$ne();
    });
  }
}
exports.RoleNewJoinView = RoleNewJoinView;
//# sourceMappingURL=RoleNewJoinView.js.map