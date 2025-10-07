"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiTimeDilation_1 = require("../../../Ui/Base/UiTimeDilation");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const UiCameraManager_1 = require("../../UiCamera/UiCameraManager");
const PhotographController_1 = require("../PhotographController");
const PhotographDefine_1 = require("../PhotographDefine");
const FightPhotoOptionPanel_1 = require("./Item/FightPhotoOptionPanel");
const PhotographEntityPanel_1 = require("./PhotographEntityPanel");
const CHANGE_FOV_INTERVAL = 100;
class PhotographView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.vQi = undefined;
    this.SQi = undefined;
    this.yQi = 0;
    this.IQi = undefined;
    this.PYe = new UE.Vector2D(0, 0);
    this.TQi = new UE.Vector2D(0, 0);
    this.A$e = new UE.Vector2D(1, -1);
    this.LQi = new UE.Vector2D(0, 0);
    this.DQi = new UE.Vector2D(0, 0);
    this.RQi = new UE.Vector2D(0, 0);
    this.cSl = false;
    this.mSl = true;
    this.b5d = PhotographDefine_1.MIN_FOV;
    this.R5d = PhotographDefine_1.MAX_FOV;
    this.fWd = 1;
    this.$2_ = undefined;
    this.eSd = undefined;
    this.N8i = t => {
      if (t.scrollAxisValue !== 0) {
        this.AQi(t.scrollAxisValue * this.fWd);
      }
    };
    this.O8i = (t, e) => {
      if (e !== 0 && Info_1.Info.IsInGamepad()) {
        this.AQi(-e);
      }
    };
    this.k8i = (t, e) => {
      if (e !== 0 && Info_1.Info.IsInGamepad()) {
        this.AQi(-e);
      }
    };
    this.Eqt = (t, e) => {
      e = e.TouchType;
      t = Number(t);
      if (e === 2) {
        this.Egt(t);
      }
    };
    this.xQi = t => {
      this.wQi(!t);
    };
    this.NEl = () => {
      this.dSl(true);
    };
    this.Igt = () => {
      if (PhotographController_1.PhotographController.CheckIfInEntityCamera()) {
        ModelManager_1.ModelManager.PhotographModel.UpValue = -1;
      } else {
        ModelManager_1.ModelManager.PhotographModel.UpValue = 1;
      }
    };
    this.Tgt = () => {
      ModelManager_1.ModelManager.PhotographModel.UpValue = 0;
      PhotographController_1.PhotographController.SetIsLineTraceBlock(false);
    };
    this.Sgt = () => {
      if (PhotographController_1.PhotographController.CheckIfInEntityCamera()) {
        ModelManager_1.ModelManager.PhotographModel.UpValue = 1;
      } else {
        ModelManager_1.ModelManager.PhotographModel.UpValue = -1;
      }
    };
    this.ygt = () => {
      ModelManager_1.ModelManager.PhotographModel.UpValue = 0;
      PhotographController_1.PhotographController.SetIsLineTraceBlock(false);
    };
    this.Lgt = () => {
      if (PhotographController_1.PhotographController.CheckIfInEntityCamera()) {
        ModelManager_1.ModelManager.PhotographModel.RightValue = 1;
      } else {
        ModelManager_1.ModelManager.PhotographModel.RightValue = -1;
      }
    };
    this.Dgt = () => {
      ModelManager_1.ModelManager.PhotographModel.RightValue = 0;
      PhotographController_1.PhotographController.SetIsLineTraceBlock(false);
    };
    this.Rgt = () => {
      if (PhotographController_1.PhotographController.CheckIfInEntityCamera()) {
        ModelManager_1.ModelManager.PhotographModel.RightValue = -1;
      } else {
        ModelManager_1.ModelManager.PhotographModel.RightValue = 1;
      }
    };
    this.Ugt = () => {
      ModelManager_1.ModelManager.PhotographModel.RightValue = 0;
      PhotographController_1.PhotographController.SetIsLineTraceBlock(false);
    };
    this.BQi = (t, e = 0) => {
      var o;
      if (PhotographController_1.PhotographController.CheckIfInEntityCamera()) {
        if (PhotographController_1.PhotographController.MinFov && PhotographController_1.PhotographController.MaxFov) {
          o = MathUtils_1.MathUtils.RangeClamp(t, PhotographController_1.PhotographController.MinFov.Value, PhotographController_1.PhotographController.MaxFov.Value, PhotographController_1.PhotographController.MaxFov.Value, PhotographController_1.PhotographController.MinFov.Value);
          PhotographController_1.PhotographController.SetFov(o);
        }
      } else {
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()?.GetFov();
        o = MathUtils_1.MathUtils.RangeClamp(t, this.b5d, this.R5d, this.R5d, this.b5d);
        PhotographController_1.PhotographController.SetFov(o);
      }
    };
    this.bQi = t => {
      this.cSl = true;
      if (!(TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1)) {
        t = t.pointerPosition;
        if (this.SQi) {
          var e = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
          if (!e) {
            return;
          }
          var o = (t.Y - this.SQi.Y) * this.yQi;
          var i = (this.SQi.X - t.X) * this.yQi;
          e.AddCameraArmPitchInput(-o);
          e.AddCameraArmYawInput(-i);
        }
        this.SQi = t;
      }
    };
    this.Pgt = () => {
      this.cSl = false;
    };
    this.xgt = () => {
      this.SQi = undefined;
      PhotographController_1.PhotographController.SetIsLineTraceBlock(false);
      if (!this.cSl) {
        this.dSl(true);
      }
    };
    this.qQi = () => {
      this.GQi();
      this.vQi = TimerSystem_1.GameplayTimerSystem.Forever(this.NQi, CHANGE_FOV_INTERVAL);
    };
    this.OQi = () => {
      this.GQi();
    };
    this.kQi = () => {
      this.GQi();
      this.vQi = TimerSystem_1.GameplayTimerSystem.Forever(this.FQi, CHANGE_FOV_INTERVAL);
    };
    this.VQi = () => {
      this.GQi();
    };
    this.NQi = () => {
      this.AQi(1);
    };
    this.FQi = () => {
      this.AQi(-1);
    };
    this.HQi = () => {
      this.AQi(1);
    };
    this.jQi = () => {
      this.AQi(-1);
    };
    this.WQi = () => {
      UiManager_1.UiManager.OpenView("PhotographSetupView", 1);
    };
    this.Ixi = () => {
      PhotographController_1.PhotographController.ResetCamera();
      this.SetCameraFov();
    };
    this.KQi = () => {
      if (UiManager_1.UiManager.IsViewOpen("PhotographSetupView")) {
        UiManager_1.UiManager.CloseView("PhotographSetupView");
      }
      Net_1.Net.Send(21981, Protocol_1.Aki.Protocol._Zn.create());
      PhotographController_1.PhotographController.ScreenShot({
        ScreenShot: true,
        PrepareFullScreenShot: true,
        IsHiddenBattleView: false,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined
      });
    };
    this.OnBackButtonClicked = () => {
      PhotographController_1.PhotographController.ClosePhotograph();
    };
    this.CSl = () => {
      this.dSl(false);
    };
    this.XQi = () => {
      this.UiViewSequence.PlaySequence("ShowChanging");
      this.UiViewSequence.PlaySequence("Loop");
      AudioSystem_1.AudioSystem.PostEvent("play_ui_camera_task");
    };
    this.$Qi = (t, e, o) => {
      t = this.IQi.GetInfoItemByDesc(t);
      if (t) {
        this.YQi(t, e);
      }
    };
    this.Bh1 = () => {
      if (PhotographController_1.PhotographController.IsLastChecked) {
        this.UiViewSequence.StopSequenceByKey("Loop");
        this.UiViewSequence.SequencePlayReverseByKey("ShowChanging", false);
      }
    };
    this.Thl = t => {
      var e = this.IQi.GetInfoItemByDesc(t);
      if (e) {
        this.Lhl(e, t);
      }
    };
    this.tSd = t => {
      this.SetCameraFov(t);
    };
    this.oGd = () => {
      this.eSd?.RefreshTip();
    };
    this.$Ge = t => {
      if (t === "FightPhotoResultView") {
        this.eSd?.SetTipVisible(false);
      }
    };
    this.xQe = () => {
      var t = Global_1.Global.CharacterController;
      var e = (0, puerts_1.$ref)(undefined);
      var o = (0, puerts_1.$ref)(undefined);
      t.GetViewportSize(e, o);
      var t = (0, puerts_1.$unref)(e);
      var e = (0, puerts_1.$unref)(o);
      this.PYe.Set(t, e);
      var o = UiLayer_1.UiLayer.UiRootItem;
      if (o) {
        this.DQi.Set(o.GetWidth(), o.GetHeight());
        this.TQi.Set(-o.GetWidth() * 0.5, -o.GetHeight() * 0.5);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UISprite], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UISliderComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIDraggableComponent], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIButtonComponent], [19, UE.UIItem], [20, UE.UIItem]];
    this.BtnBindInfo = [[4, this.HQi], [5, this.jQi], [7, this.Ixi], [8, this.KQi], [9, this.OnBackButtonClicked], [14, this.WQi], [18, this.CSl]];
  }
  OnStart() {
    GlobalData_1.GlobalData.BpEventManager.OnEnterPhotograph.Broadcast();
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    if (t?.Valid) {
      t.GetComponent(115)?.SetLodBias(PhotographDefine_1.MAX_LOD_BIAS);
    }
  }
  OnAfterDestroy() {
    GlobalData_1.GlobalData.BpEventManager.OnExitPhotograph.Broadcast();
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    if (t?.Valid) {
      t.GetComponent(115)?.SetLodBias(PhotographDefine_1.DEFAULT_LOD_BIAS);
    }
  }
  OnAddEventListener() {
    var t = this.GetButton(0);
    var e = this.GetButton(1);
    var o = this.GetButton(2);
    var i = this.GetButton(3);
    var r = this.GetSlider(10);
    var h = this.GetButton(4);
    var n = this.GetButton(5);
    var s = this.GetDraggable(13);
    t.OnPointDownCallBack.Bind(this.Igt);
    t.OnPointUpCallBack.Bind(this.Tgt);
    t.OnPointCancelCallBack.Bind(this.Tgt);
    e.OnPointDownCallBack.Bind(this.Sgt);
    e.OnPointUpCallBack.Bind(this.ygt);
    e.OnPointCancelCallBack.Bind(this.ygt);
    o.OnPointDownCallBack.Bind(this.Lgt);
    o.OnPointUpCallBack.Bind(this.Dgt);
    o.OnPointCancelCallBack.Bind(this.Dgt);
    i.OnPointDownCallBack.Bind(this.Rgt);
    i.OnPointUpCallBack.Bind(this.Ugt);
    i.OnPointCancelCallBack.Bind(this.Ugt);
    h.OnPointDownCallBack.Bind(this.qQi);
    h.OnPointUpCallBack.Bind(this.OQi);
    h.OnPointCancelCallBack.Bind(this.OQi);
    n.OnPointDownCallBack.Bind(this.kQi);
    n.OnPointUpCallBack.Bind(this.VQi);
    n.OnPointCancelCallBack.Bind(this.VQi);
    r.OnValueChangeCb.Bind(this.BQi);
    s.OnPointerDragCallBack.Bind(this.bQi);
    s.OnPointerBeginDragCallBack.Bind(this.Pgt);
    s.OnPointerEndDragCallBack.Bind(this.xgt);
    s.OnPointerDownCallBack.Bind(this.Pgt);
    s.OnPointerUpCallBack.Bind(this.xgt);
    s.OnPointerScrollCallBack.Bind(this.N8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiIncrease, this.O8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiReduce, this.k8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged, this.xQi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEntityCameraSearchGreat, this.XQi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEntityCameraOneSituationChanged, this.$Qi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEntityCameraOptionalSituationChanged, this.Thl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEntityCameraMissTarget, this.Bh1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetImageQuality, this.xQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetResolution, this.xQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetDisplayMode, this.xQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhotographSetVisible, this.NEl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeFovByOption, this.tSd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NotifyBtFightPhotoTaskFinish, this.oGd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    var t = this.GetButton(0);
    var e = this.GetButton(1);
    var o = this.GetButton(2);
    var i = this.GetButton(3);
    var r = this.GetSlider(10);
    var h = this.GetButton(4);
    var n = this.GetButton(5);
    var s = this.GetDraggable(13);
    t.OnPointDownCallBack.Unbind();
    t.OnPointUpCallBack.Unbind();
    e.OnPointDownCallBack.Unbind();
    e.OnPointUpCallBack.Unbind();
    o.OnPointDownCallBack.Unbind();
    o.OnPointUpCallBack.Unbind();
    i.OnPointDownCallBack.Unbind();
    i.OnPointUpCallBack.Unbind();
    h.OnPointDownCallBack.Unbind();
    h.OnPointUpCallBack.Unbind();
    n.OnPointDownCallBack.Unbind();
    n.OnPointUpCallBack.Unbind();
    r.OnValueChangeCb.Unbind();
    s.OnPointerDragCallBack.Unbind();
    s.OnPointerBeginDragCallBack.Unbind();
    s.OnPointerEndDragCallBack.Unbind();
    s.OnPointerDownCallBack.Unbind();
    s.OnPointerUpCallBack.Unbind();
    s.OnPointerScrollCallBack.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiIncrease, this.O8i);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiReduce, this.k8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged, this.xQi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEntityCameraSearchGreat, this.XQi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEntityCameraOneSituationChanged, this.$Qi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEntityCameraOptionalSituationChanged, this.Thl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEntityCameraMissTarget, this.Bh1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetImageQuality, this.xQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetResolution, this.xQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetDisplayMode, this.xQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhotographSetVisible, this.NEl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeFovByOption, this.tSd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NotifyBtFightPhotoTaskFinish, this.oGd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnAfterTick(t) {
    super.OnAfterTick(t);
    if (!!PhotographController_1.PhotographController.CheckIfInEntityCamera() && !!(t = PhotographController_1.PhotographController.GetNowBehaviorNodes()) && !(t.length <= 0)) {
      t.forEach(t => {
        this.ehi(t);
      });
    }
  }
  OnBeforeCreate() {
    PhotographController_1.PhotographController.InitPhotographRelativeContent();
  }
  OnBeforeShow() {
    var t;
    var e;
    var o;
    var i = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    if (i) {
      this.gSl();
      if ((t = Global_1.Global.BaseCharacter) && PhotographController_1.PhotographController.GetFightCameraActor() && PhotographController_1.PhotographController.CheckIfInEntityCamera()) {
        t = new UE.VectorDouble(t?.D_K2_GetActorLocation().X, t?.D_K2_GetActorLocation().Y, PhotographController_1.PhotographController.GetFightCameraActor().D_K2_GetActorLocation().Z);
        e = PhotographController_1.PhotographController.GetFightCameraActor().K2_GetActorRotation();
        o = PhotographController_1.PhotographController.GetFightCameraActor().D_GetActorScale3D();
        i.SetSpringArmLength(0);
        i.SetCameraInitializeTransform(new UE.TransformDouble(e, t, o));
      }
      InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
      if (PhotographController_1.PhotographController.CheckIfInFightPhotographCamera()) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.KuroEnableScreenFilter 1");
        this.b5d = CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraMinFov");
        this.R5d = CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraMaxFov");
        this.fWd = CommonParamById_1.configCommonParamById.GetFloatConfig("PhotoFightCameraZoomSpeed") ?? 1;
      } else {
        UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag(this.Info.Name);
        this.fWd = CommonParamById_1.configCommonParamById.GetFloatConfig("CommonCameraZoomSpeed") ?? 1;
        ControllerHolder_1.ControllerHolder.FilterSettingController.SwitchFilter(false);
      }
      ControllerHolder_1.ControllerHolder.EyeProtectController.SwitchFilter(false);
      this.ZQi();
      this.JQi();
      RedDotController_1.RedDotController.BindRedDot("FunctionPhotograph", this.GetItem(19));
    }
  }
  OnAfterHide() {
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    RedDotController_1.RedDotController.UnBindGivenUi("FunctionPhotograph", this.GetItem(19));
    if (!PhotographController_1.PhotographController.CheckIfInFightPhotographCamera()) {
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag(this.Info.Name);
    }
    ControllerHolder_1.ControllerHolder.MenuController.OpenAllFilter();
  }
  JQi() {
    var t;
    if (PhotographController_1.PhotographController.CheckIfInEntityCamera()) {
      this.SetEntityCameraVisibility(true);
      t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      ModelManager_1.ModelManager.PhotographModel.SetEntityEnable(t, false);
    }
  }
  Egt(t) {
    if (ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) {
      var e = TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount();
      if (!(e <= 1)) {
        let t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.One);
        if ((t?.IsTouchEmpty() || t?.IsTouchComponentContainTag(PhotographDefine_1.ignoreTouchTag)) && ((t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.Two))?.IsTouchEmpty() || t?.IsTouchComponentContainTag(PhotographDefine_1.ignoreTouchTag))) {
          e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two);
          e = MathUtils_1.MathUtils.RangeClamp(e, PhotographDefine_1.MIN_TOUCH_MOVE_DIFFERENCE, PhotographDefine_1.MAX_TOUCH_MOVE_DIFFERENCE, -1, 1);
          this.AQi(e);
        }
      }
    }
  }
  dSl(t) {
    var e;
    if (this.mSl !== t) {
      this.GetItem(11).SetUIActive(t);
      if ((e = UiManager_1.UiManager.GetViewByName("PhotographSetupView")) && e.IsShowOrShowing) {
        e.SetPanelVisible(t);
      }
      this.eSd?.SetUiActive(t);
      this.mSl = t;
      ModelManager_1.ModelManager.LoadingModel.IsShowUidView = this.mSl;
    }
  }
  wQi(t) {
    this.GetItem(12).SetUIActive(t);
    this.GetButton(9).RootUIComp.SetUIActive(t);
  }
  GQi() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.vQi)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.vQi);
    }
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.IQi = new PhotographEntityPanel_1.PhotographEntityPanel();
    t.push(this.IQi.CreateByActorAsync(this.GetItem(15).GetOwner()));
    if (ControllerHolder_1.ControllerHolder.PhotographController.CheckIfInFightPhotographCamera()) {
      this.GetButton(14).RootUIComp.SetUIActive(false);
      this.eSd = new FightPhotoOptionPanel_1.FightPhotoOptionPanel();
      e = this.GetItem(16);
      t.push(this.eSd.CreateThenShowByResourceIdAsync("UiItem_BattlePhoto", e));
    }
    await Promise.all(t);
    this.zQi();
    this.IQi.SetActive(false);
    this.yQi = CommonParamById_1.configCommonParamById.GetIntConfig("ControlCameraRate") / CommonDefine_1.PERCENTAGE_FACTOR;
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, false);
    this.xQe();
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("PhotographDAPath");
    if (e?.length !== 0) {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.KuroSequenceConsoleCommandDataAsset, t => {
        UE.KuroSequencePerformanceManager.OpenKuroPerformanceModeInPhotographModel(t);
      });
    }
    var t = GlobalData_1.GlobalData.World;
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("PhotographPPVLevelPath");
    var o = (0, puerts_1.$ref)(false);
    this.$2_ = UE.LevelStreamingDynamic.LoadLevelInstance(t, e, Vector_1.Vector.ZeroVector, Rotator_1.Rotator.ZeroRotator, o);
    if ((0, puerts_1.$unref)(o)) {
      const i = new CustomPromise_1.CustomPromise();
      this.$2_.OnLevelShown.Add(() => {
        ModelManager_1.ModelManager.PhotographModel.InitFilterPostProcessVolume();
        PhotographController_1.PhotographController.InitPostProcessVolBlendWeight();
        i.SetResult(undefined);
      });
      await i.Promise;
    }
  }
  OnBeforeDestroy() {
    this.GQi();
    this.IQi.Destroy();
    this.IQi = undefined;
    this.LQi.Set(0, 0);
    UiCameraManager_1.UiCameraManager.Clear();
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, true);
    ModelManager_1.ModelManager.LoadingModel.IsShowUidView = true;
    UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    if (this.$2_) {
      this.$2_.OnLevelShown.Clear();
      this.$2_.SetShouldBeLoaded(false);
    }
  }
  ZQi() {
    var t;
    var e;
    var o;
    var i = this.GetSlider(10);
    if (PhotographController_1.PhotographController.CheckIfInNormalCamera() || PhotographController_1.PhotographController.CheckIfInFightPhotographCamera()) {
      i.SetMinValue(this.b5d, false, false);
      i.SetMaxValue(this.R5d, false, false);
      this.SetCameraFov();
    } else {
      t = parseInt(PhotographController_1.PhotographController.MaxFov.Value);
      e = parseInt(PhotographController_1.PhotographController.MinFov.Value);
      i.SetMinValue(e, false, false);
      i.SetMaxValue(t, false, false);
      i.SetValue(o = (t - e) / 2 + e, true);
      this.BQi(o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Photo", 45, "实体拍照RefreshFov：", ["MaxValue:", i.GetMaxValue()], ["MinValue:", i.GetMinValue()], ["NowValue:", i.GetValue()], ["max:", t], ["min", e]);
      }
    }
  }
  SetCameraFov(t) {
    var e;
    var o = this.GetSlider(10);
    if (t) {
      o.SetValue(t);
    } else {
      t = ControllerHolder_1.ControllerHolder.PhotographController.GetCameraInitialFov();
      e = MathUtils_1.MathUtils.RangeClamp(t, this.b5d, this.R5d, this.R5d, this.b5d);
      o.SetValue(e);
      PhotographController_1.PhotographController.SetFov(t);
    }
  }
  AQi(t) {
    var e = this.GetSlider(10);
    var t = e.GetValue() + t;
    e.SetValue(t, true);
  }
  SetEntityCameraVisibility(t) {
    this.GetItem(15).SetUIActive(t);
    if (PhotographController_1.PhotographController.CheckIfInMission()) {
      this.GetItem(17).SetUIActive(true);
    } else {
      this.GetItem(17).SetUIActive(false);
    }
  }
  zQi() {
    var t = PhotographController_1.PhotographController.CheckIfInEntityCamera();
    this.IQi.SetActive(t);
    this.GetItem(20)?.SetUIActive(!t);
    if (t) {
      this.eXi();
    }
  }
  eXi() {
    var t = PhotographController_1.PhotographController.Missions?.length;
    if (!t || t <= 0) {
      this.IQi.SetInfoPanelVisible(false);
    } else {
      this.IQi.SetInfoPanelVisible(true);
      var e = [];
      for (const i of PhotographController_1.PhotographController.Missions) {
        var o = {
          Text: i.Description,
          IsFinish: i.IsFinished,
          IsOptionFinished: i.IsOptionalFinished ?? false
        };
        e.push(o);
      }
      this.IQi.Refresh(e);
    }
  }
  YQi(t, e) {
    t.RefreshFinishState(e);
    if (!e && this.UiViewSequence?.HasSequenceNameInPlaying("Loop")) {
      this.UiViewSequence.StopSequenceByKey("Loop", false, true);
    }
  }
  Lhl(t, e) {
    t.SetTextLine(e);
  }
  tXi(t) {
    return t.op_Multiply(this.DQi).op_Division(this.PYe).op_Addition(this.TQi).op_Multiply(this.A$e);
  }
  ehi(t) {
    var r = [];
    if (t) {
      var h = t.TakeTargetArray;
      if (!h || h.length <= 0) {
        this.IQi.UpdateIcons(r, undefined);
      } else {
        for (const P of h) {
          var n = PhotographController_1.PhotographController.GetAllCheckPoints(P.EntityId);
          if (n && !(n.length <= 0)) {
            let e = "RequiredPointsCenter";
            var s = PhotographController_1.PhotographController.GetPointType(P.EntityId);
            switch (e = s ? s.Type : e) {
              case "EntityZero":
                var a = PhotographController_1.PhotographController.GetCheckEntityPosition(P.EntityId);
                if (!a) {
                  continue;
                }
                a = PhotographController_1.PhotographController.GetPosition2D(a);
                if (!a || !PhotographController_1.PhotographController.GetEntityFinishSituation(P.EntityId)) {
                  r.push({
                    Id: P.EntityId.toString(),
                    Vector: this.RQi,
                    NotShow: true,
                    IsOptional: P.IsOptionalTarget ?? false,
                    IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
                  });
                  continue;
                }
                a = this.tXi(a);
                r.push({
                  Id: P.EntityId.toString(),
                  Vector: a,
                  NotShow: false,
                  IsOptional: P.IsOptionalTarget ?? false,
                  IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
                });
                continue;
              case "CustomPoints":
                var _ = s.Points;
                var l = PhotographController_1.PhotographController.GetCheckEntityPosition(P.EntityId);
                if (!l) {
                  continue;
                }
                for (let t = 0; t < _.length; t++) {
                  var p = (_[t].X ?? 0) + (l.X ?? 0);
                  var g = (_[t].Y ?? 0) + (l.Y ?? 0);
                  var C = (_[t].Z ?? 0) + (l.Z ?? 0);
                  var p = Vector_1.Vector.Create(p, g, C);
                  var g = PhotographController_1.PhotographController.GetPosition2D(p);
                  if (g && PhotographController_1.PhotographController.GetEntityFinishSituation(P.EntityId)) {
                    C = this.tXi(g);
                    r.push({
                      Id: P.EntityId.toString() + t.toString(),
                      Vector: C,
                      NotShow: false,
                      IsOptional: P.IsOptionalTarget ?? false,
                      IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
                    });
                  } else {
                    r.push({
                      Id: P.EntityId.toString() + t.toString(),
                      Vector: this.RQi,
                      NotShow: true,
                      IsOptional: P.IsOptionalTarget ?? false,
                      IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
                    });
                  }
                }
                continue;
            }
            var u = n.length;
            let o = true;
            let i = false;
            this.LQi.Set(0, 0);
            for (let t = 0; t < n.length; t++) {
              var m = n[t];
              if (!PhotographController_1.PhotographController.GetEntityFinishSituation(P.EntityId)) {
                i = true;
              }
              var v = PhotographController_1.PhotographController.GetPosition2D(m);
              if (v) {
                v = this.tXi(v);
                if (e === "RequiredPoints") {
                  r.push({
                    Id: P.EntityId.toString() + t.toString(),
                    Vector: v,
                    NotShow: !PhotographController_1.PhotographController.CheckInUi(m) || !PhotographController_1.PhotographController.CheckLineTrace(m.ToUeVectorOld(), h),
                    IsOptional: P.IsOptionalTarget ?? false,
                    IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
                  });
                  o = false;
                } else {
                  this.LQi = this.LQi.op_Addition(v);
                }
              } else if (e === "RequiredPoints") {
                r.push({
                  Id: P.EntityId.toString() + t.toString(),
                  Vector: this.RQi,
                  NotShow: true,
                  IsOptional: P.IsOptionalTarget ?? false,
                  IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
                });
              } else {
                r.push({
                  Id: P.EntityId.toString(),
                  Vector: this.RQi,
                  NotShow: true,
                  IsOptional: P.IsOptionalTarget ?? false,
                  IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
                });
              }
            }
            if (o) {
              this.LQi.X = this.LQi.X / u;
              this.LQi.Y = this.LQi.Y / u;
              u = {
                Id: P.EntityId.toString(),
                Vector: new UE.Vector2D(this.LQi.X, this.LQi.Y),
                NotShow: i,
                IsOptional: P.IsOptionalTarget ?? false,
                IsOptionalFinished: PhotographController_1.PhotographController.GetPhotoMissionById(P.EntityId)?.IsOptionalFinished ?? false
              };
              r.push(u);
            }
          }
        }
        this.IQi.UpdateIcons(r, t);
      }
    } else {
      this.IQi.UpdateIcons(r, undefined);
    }
  }
  gSl() {
    if (PhotographController_1.PhotographController.CameraCaptureType === 1) {
      this.pSl();
    } else {
      this.fSl();
    }
  }
  pSl() {
    this.GetItem(11).SetUIActive(true);
    this.GetButton(14).RootUIComp.SetUIActive(false);
    this.GetButton(18).RootUIComp.SetUIActive(false);
    this.GetButton(7).RootUIComp.SetUIActive(false);
  }
  fSl() {
    this.GetItem(11).SetUIActive(true);
  }
}
exports.PhotographView = PhotographView;
//# sourceMappingURL=PhotographView.js.map