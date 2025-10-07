"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraPhotographerStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraPhotographerStructure");
const PhotographController_1 = require("./PhotographController");
const PhotographDefine_1 = require("./PhotographDefine");
class PhotographModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.OWi = undefined;
    this.PlayMontageEntity = undefined;
    this.MontageId = 0;
    this.FilterId = 0;
    this.kWi = new Map();
    this.j2_ = new Map();
    this.H2_ = new Map();
    this.FWi = new UE.TransformDouble();
    this.RightValue = 0;
    this.UpValue = 0;
    this.VWi = 0;
    this.HWi = undefined;
    this.IsOpenPhotograph = false;
    this.SavePath = "";
    this.IsSaveButtonVisible = false;
    this.IsFilterToggleOpen = true;
    this.SelectedFightPhotoOptionId = 0;
  }
  OnInit() {
    this.SavePath = CommonParamById_1.configCommonParamById.GetStringConfig("ScreenShotSavePath");
    return true;
  }
  OnClear() {
    this.DestroyUiCamera();
    return true;
  }
  OnLeaveLevel() {
    this.DestroyUiCamera();
    return true;
  }
  SpawnPhotographerStructure(t, e, r, o) {
    this.FWi.SetLocation(t);
    this.FWi.SetRotation(e);
    this.FWi.SetScale3D(r);
    t = UiCameraManager_1.UiCameraManager.Get();
    this.OWi = t.PushStructure(UiCameraPhotographerStructure_1.UiCameraPhotographerStructure);
    this.OWi.SetActorTransform(this.FWi);
    if (ControllerHolder_1.ControllerHolder.PhotographController.CheckIfInFightPhotographCamera()) {
      this.OWi.SetCameraArmTargetOffset(o, true);
    }
    t.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent).SetCameraFocalDistance(PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE);
    return this.OWi;
  }
  DestroyUiCamera() {
    UiCameraManager_1.UiCameraManager.Destroy(PhotographDefine_1.PHOTOGRAPH_CAMERA_BLEND_OUT);
    this.OWi = undefined;
  }
  GetPhotographerStructure() {
    return this.OWi;
  }
  SetPhotographOption(t, e) {
    this.kWi.set(t, e);
  }
  ClearPhotographOption() {
    this.kWi.clear();
  }
  GetPhotographOption(t) {
    return this.kWi.get(t);
  }
  GetAllPhotographOption() {
    return this.kWi;
  }
  SetEntityEnable(t, e) {
    if (t?.Valid && t.Entity?.Valid && t.Entity.Active !== e) {
      if (e) {
        if (this.HWi && t.Id === this.HWi.Id) {
          t.Entity.Enable(this.VWi, "PhotographModel.SetEntityEnable");
          this.VWi = undefined;
          this.HWi = undefined;
        } else {
          this.ResetEntityEnable();
        }
      } else {
        if (this.HWi) {
          this.ResetEntityEnable();
        }
        this.MontageId = 0;
        this.HWi = t;
        this.VWi = t.Entity.Disable("[PhotographModel.SetEntityEnable] bEnable为false");
      }
    }
  }
  ResetEntityEnable() {
    if (this.HWi) {
      this.HWi.Entity?.Enable(this.VWi, "PhotographModel.ResetEntityEnable");
    }
    this.VWi = undefined;
    this.HWi = undefined;
  }
  SetPhotographFilter(t) {
    this.FilterId = t;
  }
  ClearPhotographFilter() {
    this.ClearSelectedPhotographFilter();
    this.H2_.clear();
    this.IsFilterToggleOpen = true;
  }
  ClearSelectedPhotographFilter() {
    this.FilterId = 0;
    PhotographController_1.PhotographController.InitPostProcessVolBlendWeight();
  }
  GetPhotographFilter() {
    return this.FilterId;
  }
  InitFilterPostProcessVolume() {
    var e = UE.NewArray(UE.Actor);
    var t = (0, puerts_1.$ref)(e);
    UE.GameplayStatics.GetAllActorsOfClassWithTag(GlobalData_1.GlobalData.World, UE.PostProcessVolume.StaticClass(), FNameUtil_1.FNameUtil.GetDynamicFName("Filter"), t);
    if (e = (0, puerts_1.$unref)(t)) {
      for (let t = 0; t < e.Num(); t++) {
        var r;
        var o = e.Get(t);
        o.BlendWeight = 0;
        if (!(o.Tags.Num() < 2)) {
          r = o.Tags.Get(1).toString();
          this.j2_.set(r, o);
        }
      }
    }
  }
  GetFilterPostProcessVolumeMap() {
    return this.j2_;
  }
  GetFilterStrengthByFilterId(t) {
    t = this.H2_.get(t);
    if (t === undefined) {
      return PhotographDefine_1.FILTER_DEFAULT_STRENGTH / PhotographDefine_1.FILTER_MAX_STREGNTH;
    } else {
      return t;
    }
  }
  SetFilterStrength(t, e) {
    this.H2_.set(t, e);
  }
  SetFilterToggleState(t) {
    this.IsFilterToggleOpen = t;
  }
  GetFilterToggleState() {
    return this.IsFilterToggleOpen;
  }
  SetPhotographTimeDilation(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Photograph", 57, "SetPhotographTimeDilation", ["timeDilation", t]);
    }
    if (t !== 1) {
      AudioSystem_1.AudioSystem.SetState("game_sys_fightphoto", "slow");
      AudioSystem_1.AudioSystem.PostEvent("play_ui_battlephoto_timestop");
    }
    ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(t, 4);
  }
  SetFightPhotoOption(t) {
    this.SelectedFightPhotoOptionId = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeFightPhotoOption);
  }
}
exports.PhotographModel = PhotographModel;
//# sourceMappingURL=PhotographModel.js.map