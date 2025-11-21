"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterCameraComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTimeDilation_1 = require("../../../../Ui/Base/UiTimeDilation");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const TouchFingerManager_1 = require("../../../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const PhotographDefine_1 = require("../../../Photograph/PhotographDefine");
const UiCameraPostEffectComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraManager_1 = require("../../../UiCamera/UiCameraManager");
const UiCameraPhotographerStructure_1 = require("../../../UiCamera/UiCameraStructure/UiCameraPhotographerStructure");
class FilterCameraComponent {
  constructor(e, t) {
    this.LastMoveVector = undefined;
    this.EWi = undefined;
    this.IWi = undefined;
    this.TWi = undefined;
    this.WDe = undefined;
    this.UiCameraPhotographerStructure = undefined;
    this.PhotographOptionMap = new Map();
    this.EntityDisableId = 0;
    this.SetDisableEntity = undefined;
    this.AWi = [];
    this.CameraRotationLock = false;
    this.Ycu = undefined;
    this.UWi = (e, t) => {
      if (t && UiManager_1.UiManager.IsViewOpen(this.WDe)) {
        UiManager_1.UiManager.CloseView(this.WDe);
      }
    };
    this.OnDragMoved = e => {
      var t;
      var i;
      if (!(TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1)) {
        e = e.pointerPosition;
        if (this.LastMoveVector) {
          t = (e.Y - this.LastMoveVector.Y) * this.ControlCameraRate;
          i = (this.LastMoveVector.X - e.X) * this.ControlCameraRate;
          this.UiCameraPhotographerStructure?.AddCameraArmPitchInput(-t);
          this.UiCameraPhotographerStructure?.AddCameraArmYawInput(-i);
        }
        this.LastMoveVector = e;
      }
    };
    this.OnOpenView = undefined;
    this.OnDragBegin = () => {
      this.CameraRotationLock = true;
    };
    this.OnDragEnded = () => {
      this.LastMoveVector = undefined;
      this.CameraRotationLock = false;
    };
    this.OnInputUiLookUp = (e, t) => {
      if (!!Info_1.Info.IsInGamepad() && !UiManager_1.UiManager.IsViewOpen("HelpView")) {
        if (t !== 0) {
          this.UiCameraPhotographerStructure?.AddCameraArmPitchInput(-t);
        }
      }
    };
    this.OnInputUiTurn = (e, t) => {
      if (!!Info_1.Info.IsInGamepad() && !UiManager_1.UiManager.IsViewOpen("HelpView")) {
        if (t !== 0) {
          this.UiCameraPhotographerStructure?.AddCameraArmYawInput(t);
        }
      }
    };
    this.OnOpenView = e;
    this.WDe = t;
  }
  get ControlCameraRate() {
    if (this.Ycu === undefined) {
      this.Ycu = CommonParamById_1.configCommonParamById.GetIntConfig("ControlCameraRate") / CommonDefine_1.PERCENTAGE_FACTOR;
    }
    return this.Ycu;
  }
  async TryOpenPhotograph() {
    if (!this.$ha()) {
      return false;
    }
    this.EWi = this.yWi();
    if (!this.EWi) {
      return false;
    }
    this.IWi = this.GetFightCameraActor();
    if (!this.IWi) {
      return false;
    }
    this.js1();
    this.c$e();
    await this.OMa();
    this.Vcu();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroScreenFilterFrame 5");
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, false);
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("FilterCameraComponent");
    var e = await this.OnOpenView?.();
    await this.Wcu();
    return e !== undefined;
  }
  ClosePhotograph() {
    this.x5_();
    this.U5_();
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("FilterCameraComponent");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroScreenFilterFrame 60");
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, true);
  }
  ResetPhotograph() {
    this.x5_();
    this.U5_();
  }
  x5_() {
    this.IWi = undefined;
    this.EWi = undefined;
    this.TWi = undefined;
  }
  U5_() {
    UiCameraManager_1.UiCameraManager.Destroy(PhotographDefine_1.PHOTOGRAPH_CAMERA_BLEND_OUT);
    this.UiCameraPhotographerStructure = undefined;
    this.Xgu();
    this.PhotographOptionMap.clear();
    this.RemoveEntityEvents();
    this.DWi().SetIsDitherEffectEnable(true);
    var e = Global_1.Global.BaseCharacter;
    if (e !== undefined && !ControllerHolder_1.ControllerHolder.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(e.CharacterActorComponent?.Entity)) {
      e?.SetDitherEffect(0, 1);
    }
  }
  RemoveEntityEvents() {
    for (const e of this.AWi) {
      e.EndTask();
    }
    this.AWi.length = 0;
  }
  async OMa() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(11, 3, 0.5);
  }
  async Wcu() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(11, 0.5);
    ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
  }
  js1() {
    if (Global_1.Global.BaseCharacter) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(62)?.InterruptAutoMoving("打开眼保护界面");
    }
  }
  c$e() {
    this.RWi(1996802261, this.UWi);
    this.RWi(40422668, this.UWi);
    this.RWi(855966206, this.UWi);
  }
  RWi(e, t) {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (i?.Valid && i.Entity?.Valid) {
      i = i.Entity.GetComponent(209).ListenForTagAddOrRemove(e, t);
      this.AWi.push(i);
    }
  }
  $ha() {
    var e;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!t?.Valid && !(ModelManager_1.ModelManager.PlotModel.IsInPlot ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在剧情中"), 1) : !(e = t.Entity.GetComponent(209)) || (e.HasTag(40422668) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在空中"), 1) : e.HasTag(855966206) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在水中"), 1) : e.HasTag(504239013) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在攀爬"), 1) : e.HasTag(1996802261) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在战斗中"), 1) : e.HasTag(-1371021686) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在技能中"), 1) : e.HasTag(525255941) ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在驾驶载具"), 1) : UiManager_1.UiManager.IsViewOpen("FilterSettingView") || UiManager_1.UiManager.IsViewOpen("EyeProtectView") ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:已经在滤镜界面"), 1) : ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:在声骸编队"), 1) : !t.Entity.GetComponent(181)?.MainAnimInstance && (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("GlobalFliterOpenTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法设置滤镜:实体状态机找不到"), 1)));
  }
  Vcu() {
    var e;
    var t;
    var i;
    this.EWi = this.yWi();
    if (this.EWi && (this.IWi = this.GetFightCameraActor(), this.IWi)) {
      this.TWi = this.LWi();
      this.DWi().SetIsDitherEffectEnable(false);
      (e = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1);
      e = e?.Mesh.D_GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME);
      t = this.IWi.D_GetTransform();
      i = this.Kgu(e, t.GetRotation(), t.GetScale3D());
      this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE;
      i?.SetPlayerSourceLocation(e);
      i?.SetCameraInitializeTransform(t);
      i?.SetFov(PhotographDefine_1.DEFAULT_FOV);
      this.UiCameraPhotographerStructure = i;
      UiCameraManager_1.UiCameraManager.Get().Enter(0.5);
      this.jcu();
    }
  }
  jcu() {
    for (const i of ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig()) {
      let e = -1;
      var t = i.Type;
      if (t === 0) {
        e = i.DefaultOptionIndex;
      } else if (t === 1) {
        e = i.ValueRange[2];
      }
      this.Hcu(i.ValueType, e);
    }
  }
  Hcu(e, t) {
    this.PhotographOptionMap.set(e, t);
    switch (e) {
      case 3:
        var i;
        if (t === 1) {
          r = this.PhotographOptionMap.get(4);
          i = this.PhotographOptionMap.get(5);
          this.TWi.FocusSettings.ManualFocusDistance = r;
          this.TWi.CurrentAperture = i;
        } else {
          this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_FOCAL_LENTGH;
          this.TWi.CurrentAperture = PhotographDefine_1.DEFAULT_APERTURE;
        }
        break;
      case 4:
        if (this.PhotographOptionMap.get(3) === 1) {
          this.TWi.FocusSettings.ManualFocusDistance = t;
        }
        break;
      case 5:
        if (this.PhotographOptionMap.get(3) === 1) {
          this.TWi.CurrentAperture = t;
        }
        break;
      case 0:
        var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (t === 1) {
          this.wvl(r, true);
        } else {
          this.wvl(r, false);
        }
    }
  }
  yWi() {
    var e = ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera;
    if (e) {
      e = e.GetComponent(12);
      if (e.Valid) {
        return e.CineCamera;
      }
    }
  }
  GetFightCameraActor() {
    var e = ControllerHolder_1.ControllerHolder.CameraController.FightCamera;
    if (e) {
      e = e.GetComponent(4);
      if (e.Valid) {
        return e.CameraActor;
      }
    }
  }
  LWi() {
    var e = this.EWi;
    if (e?.IsValid()) {
      return e.GetCineCameraComponent();
    }
  }
  DWi() {
    var e = ControllerHolder_1.ControllerHolder.CameraController.FightCamera;
    if (e) {
      return e.GetComponent(5);
    }
  }
  Kgu(e, t, i) {
    var r = new UE.TransformDouble();
    r.SetLocation(e);
    r.SetRotation(t);
    r.SetScale3D(i);
    var e = UiCameraManager_1.UiCameraManager.Get();
    var t = e.PushStructure(UiCameraPhotographerStructure_1.UiCameraPhotographerStructure);
    t.SetActorTransform(r);
    e.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent).SetCameraFocalDistance(PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE);
    return t;
  }
  wvl(e, t) {
    if (e?.Valid && e.Entity?.Valid && e.Entity.Active !== t) {
      if (t) {
        if (this.SetDisableEntity && e.Id === this.SetDisableEntity.Id) {
          e.Entity.Enable(this.EntityDisableId, "FilterCameraComponent.SetEntityEnable");
          this.EntityDisableId = undefined;
          this.SetDisableEntity = undefined;
        } else {
          this.Xgu();
        }
      } else {
        if (this.SetDisableEntity) {
          this.Xgu();
        }
        this.SetDisableEntity = e;
        this.EntityDisableId = e.Entity.Disable("[FilterCameraComponent.SetEntityEnable] bEnable为false");
      }
    }
  }
  Xgu() {
    if (this.SetDisableEntity) {
      this.SetDisableEntity.Entity?.Enable(this.EntityDisableId, "FilterCameraComponent.ResetEntityEnable");
    }
    this.EntityDisableId = undefined;
    this.SetDisableEntity = undefined;
  }
}
exports.FilterCameraComponent = FilterCameraComponent;
//# sourceMappingURL=FilterCameraComponent.js.map