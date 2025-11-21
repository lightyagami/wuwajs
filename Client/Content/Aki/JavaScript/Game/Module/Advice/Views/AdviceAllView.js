"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceAllView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView");
const RoleController_1 = require("../../RoleUi/RoleController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AdviceController_1 = require("../AdviceController");
const AdivceSelectItem_1 = require("./AdivceSelectItem");
const AdviceAllViewShowContent_1 = require("./AdviceAllViewShowContent");
const AdviceSelectMotionItem_1 = require("./AdviceSelectMotionItem");
const CHECKTIMEER = 1000;
const ANIMATIONGAP = 5000;
class AdviceAllView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.c7e = 0;
    this.m7e = undefined;
    this.d7e = undefined;
    this.C7e = undefined;
    this.g7e = undefined;
    this.K9e = undefined;
    this.j3 = undefined;
    this.Uqe = -0;
    this.f7e = undefined;
    this.p7e = false;
    this.v7e = (e, t) => {
      if (this.p7e = t) {
        this.CloseMe();
      }
    };
    this.M7e = () => {
      AdviceController_1.AdviceController.OpenAdviceView();
    };
    this.E7e = () => {
      var e;
      var t;
      var i;
      if (ModelManager_1.ModelManager.AdviceModel.GetIfCanCreateAdvice(ModelManager_1.ModelManager.AdviceModel.CurrentLineModel)) {
        e = Vector_1.Vector.Create();
        t = Rotator_1.Rotator.Create();
        e.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy);
        e.Z = e.Z - Global_1.Global.BaseCharacter.CharacterActorComponent.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight();
        t.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorRotationProxy);
        i = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor;
        t.Yaw = i.D_GetTransform().Rotator().Yaw + 90;
        AdviceController_1.AdviceController.RequestCreateAdvice(e, t, ModelManager_1.ModelManager.AdviceModel.GetCreateAdviceContent(), () => {
          this.CloseMe();
        });
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("AdviceNeedFull");
      }
    };
    this.S7e = e => {
      this.y7e(e);
    };
    this.I7e = () => {
      var e = ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId;
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleList();
      var e = new TeamRoleSelectView_1.TeamRoleSelectViewData(1, e.GetRoleId(), t, this.S7e, undefined);
      RoleController_1.RoleController.OpenTeamRoleSelectView(e);
    };
    this.T7e = () => {
      var e = ModelManager_1.ModelManager.AdviceModel.PreSelectAdviceItemId;
      if (e === 0) {
        this.L7e(0);
      } else if (e === 1) {
        this.D7e();
      } else if (e === 2) {
        this.L7e(1);
      } else if (e === 3) {
        this.R7e();
      } else if (e === 5) {
        this.U7e();
      } else if (e === 6) {
        this.A7e();
      }
      this.P7e();
    };
    this.R7e = () => {
      AdviceController_1.AdviceController.OpenAdviceExpressionView();
    };
    this.x7e = () => {
      this.Uqe = 0;
      if (ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId === ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()) {
        this.K9e.HideAnimation();
      } else {
        this.K9e.PlayAnimation(ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId);
      }
    };
    this.w7e = () => {
      this.Og();
      this.B7e();
      this.P7e();
    };
    this.y7e = e => {
      ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId = e;
      ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId();
      ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId();
      this.C7e.RefreshView(ModelManager_1.ModelManager.AdviceModel.GetMotionSelectData());
      this.x7e();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeAdviceRole);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceMotion);
    };
    this.b7e = () => {
      if (this.m7e === 0) {
        this.m7e = 1;
      } else {
        this.m7e = 0;
      }
      if (this.m7e === 0) {
        this.K9e.HideAnimation();
      } else {
        this.x7e();
      }
      this.Og();
    };
    this.P7e = () => {
      var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
      var t = CommonParamById_1.configCommonParamById.GetIntConfig("AdviceCreateLimit") ?? 0;
      var e = e.length >= t;
      var t = ModelManager_1.ModelManager.AdviceModel.GetIfCanCreateAdvice(ModelManager_1.ModelManager.AdviceModel.CurrentLineModel);
      if (e || !t) {
        this.GetButton(4).SetSelfInteractive(false);
      } else {
        this.GetButton(4).SetSelfInteractive(true);
      }
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "Advice_Max");
      } else if (t) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "Advice_Publish");
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "AdviceNotFull");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem]];
    this.BtnBindInfo = [[1, this.b7e], [2, this.b7e], [5, this.M7e], [4, this.E7e]];
  }
  OnStart() {
    this.d7e = new AdivceSelectItem_1.AdviceSelectItem(this.GetItem(6));
    this.C7e = new AdviceSelectMotionItem_1.AdviceSelectMotionItem(this.GetItem(7));
    this.C7e.SetClickChangeRoleCall(this.I7e);
    this.g7e = new AdviceAllViewShowContent_1.AdviceAllViewShowContent(this.GetItem(8));
    this.j3 = TimerSystem_1.TimerSystem.Forever(() => {
      this.q7e();
    }, CHECKTIMEER);
    this.G7e();
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem.SetHelpButtonActive(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceSelectItem, this.T7e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceMotion, this.x7e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDeleteAdviceSuccess, this.w7e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectAdviceWord, this.P7e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeAdviceWord, this.P7e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceSelectItem, this.T7e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceMotion, this.x7e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDeleteAdviceSuccess, this.w7e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectAdviceWord, this.P7e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeAdviceWord, this.P7e);
  }
  G7e() {
    var e;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t.Valid) {
      e = t.Entity.GetComponent(209);
      this.p7e = e.HasTag(1996802261);
      this.N7e();
      if (this.p7e) {
        this.CloseMe();
      } else {
        this.O7e(t);
      }
    }
  }
  N7e() {
    this.f7e?.EndTask();
    this.f7e = undefined;
  }
  O7e(e) {
    e = e.Entity.GetComponent(209);
    this.f7e = e.ListenForTagAddOrRemove(1996802261, this.v7e);
  }
  L7e(e) {
    AdviceController_1.AdviceController.OpenAdviceWordSelectView(e);
  }
  U7e() {
    AdviceController_1.AdviceController.OpenAdviceSentenceSelectView();
  }
  D7e() {
    AdviceController_1.AdviceController.OpenAdviceConjunctionSelectView();
  }
  A7e() {
    if (ModelManager_1.ModelManager.AdviceModel.CurrentLineModel === 0) {
      ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 1;
    } else {
      ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 0;
      ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(1);
      ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId = 0;
    }
    this.Og();
  }
  OnAfterShow() {
    this.m7e = 0;
    ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 0;
    this.Og();
    this.k7e();
    this.mGe();
  }
  mGe() {
    this.ChildPopView?.SetTitleByTextIdAndArg("AdviceName");
  }
  q7e() {
    this.Uqe += CHECKTIMEER;
    if (this.Uqe >= ANIMATIONGAP && this.m7e !== 0) {
      this.x7e();
    }
  }
  k7e() {
    this.F7e();
    this.c7e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.Disable("[AdviceCreate DisableCharacter]");
    this.K9e = ModelManager_1.ModelManager.AdviceModel.GetAdviceCreateActor();
  }
  F7e() {
    if (this.c7e > 0) {
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.Enable(this.c7e, "AdviceAllView.TryEnableEntity");
      this.c7e = 0;
    }
  }
  Og() {
    this.V7e();
    this.H7e();
    this.B7e();
    this.P7e();
    this.g7e.RefreshView();
  }
  H7e() {
    if (this.m7e === 1) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "Motion");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "TextAndExpression");
    }
  }
  V7e() {
    let e = false;
    var t;
    if (!ModelManager_1.ModelManager.AdviceModel.GetCreateConditionState()) {
      t = ModelManager_1.ModelManager.AdviceModel.CheckIfMaxAdvice();
      e = !t && (this.GetItem(0).SetUIActive(true), this.GetItem(9).SetUIActive(false), this.GetItem(12).SetUIActive(false), this.GetButton(4).RootUIComp.SetUIActive(false), this.g7e.SetActive(false), this.j7e(), true);
    }
    if (!e) {
      this.GetItem(12).SetUIActive(true);
      this.GetItem(0).SetUIActive(false);
      this.GetItem(9).SetUIActive(true);
      this.GetButton(4).RootUIComp.SetUIActive(true);
      this.g7e.SetActive(true);
      if (this.m7e === 1) {
        this.d7e.SetActive(false);
        this.C7e.SetActive(true);
        this.GetItem(13).SetUIActive(true);
        this.C7e.RefreshView(ModelManager_1.ModelManager.AdviceModel.GetMotionSelectData());
      } else {
        this.GetItem(13).SetUIActive(false);
        this.C7e.SetActive(false);
        this.d7e.SetActive(true);
        this.d7e.RefreshView(ModelManager_1.ModelManager.AdviceModel.GetAdviceSelectData(ModelManager_1.ModelManager.AdviceModel.CurrentLineModel));
      }
    }
  }
  j7e() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), ModelManager_1.ModelManager.AdviceModel.GetCreateConditionFailText());
  }
  B7e() {
    var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("AdviceCreateLimit") ?? 0;
    this.GetItem(10).SetUIActive(e.length >= t);
  }
  OnBeforeDestroy() {
    this.K9e.Destroy();
    this.F7e();
    if (this.j3 !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
    }
  }
}
exports.AdviceAllView = AdviceAllView;
//# sourceMappingURL=AdviceAllView.js.map