"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteMainView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputDistributeDefine_1 = require("../../../Ui/InputDistribute/InputDistributeDefine");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RouletteInputManager_1 = require("../RouletteInputManager");
class RouletteMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.vfo = undefined;
    this.RouletteUiItem = undefined;
    this.ts1 = undefined;
    this.CloseSelf = (e = true) => {
      if (e) {
        this.pfo.TryEmitCurrentGridSelectOn();
      }
      this.CloseMe();
    };
    this.fpo = () => {
      var e;
      var t;
      if (this.ts1.CanSwitchType) {
        [e, t] = this.pfo.GetCurrentIndexAndAngle();
        this.ts1.RouletteTypeSwitch();
        this.pB_();
        this.vpo();
        this.pfo.Refresh(e, t);
      }
    };
    this.cEa = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "检测到轮盘输入变化,关闭自身", ["新输入类型", Info_1.Info.InputControllerType]);
      }
      this.CloseSelf(false);
    };
    this.Epo = e => {
      if (!ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag)) {
        this.CloseSelf(false);
      }
    };
    this.jXa = (e, t) => {
      if (t === 1) {
        this.CloseSelf();
      }
    };
    this.WXa = () => {
      ControllerHolder_1.ControllerHolder.RouletteController.OpenAssemblyView(this.ts1.RouletteType);
      this.CloseSelf(false);
    };
  }
  get pfo() {
    return this.ts1.GetRouletteComponent();
  }
  OnRegisterComponent() {
    if (this.OpenParam) {
      this.ts1 = this.OpenParam;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Phantom", 37, "[Roulette] 轮盘打开时未获取到参数");
    }
    this.ts1.RegisterView(this);
    switch (Info_1.Info.OperationType) {
      case 2:
        this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIText], [5, UE.UIItem]];
        this.BtnBindInfo = [[2, this.fpo], [3, this.fpo]];
        break;
      case 1:
        this.ComponentRegisterInfos = [[0, UE.UIItem]];
    }
  }
  OnBeforeCreate() {
    UiInteractLogReport_1.UiInteractLogReport.RecordRouletteOpen();
  }
  async OnBeforeStartAsync() {
    this.RouletteUiItem = this.GetItem(0);
    await this.ts1.BeforeStartAsync();
  }
  OnStart() {
    this.ts1.Start();
    this.pB_();
    if (Info_1.Info.OperationType === 2) {
      e = this.ts1.GetPanelSwitchOpen();
      this.GetItem(1).SetUIActive(e);
      this.QXa();
    }
    this.vpo();
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("Roulette_Main_Gamepad_DeadLimit");
    var t = Info_1.Info.IsInKeyBoard() ? Vector2D_1.Vector2D.Create(this.GetRootItem().GetPositionInScreen(true)) : undefined;
    this.vfo = new RouletteInputManager_1.rouletteInputManager[Info_1.Info.InputControllerMainType](t, undefined, this.ts1.TouchId, e);
    this.vfo.BindEvent();
    this.vfo.OnInit();
    this.vfo.RouletteViewType = 1;
    this.vfo.SetEndInputEvent(this.CloseSelf);
    this.Spo();
    this.vfo.ActivateInput(true);
    this.ts1.AddEventListenerByStart();
  }
  OnBeforeShow() {
    this.ts1.BeforeShow();
    RenderModuleController_1.RenderModuleController.GlobalTimeDilation = 0.1;
  }
  Spo() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(10, [19], false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, true);
  }
  OnBeforeDestroy() {
    this.ts1.RemoveEventListenerByStart();
    this.RouletteUiItem = undefined;
    this.ts1.Destroy();
    if (this.vfo) {
      this.vfo.Destroy();
      this.vfo = undefined;
    }
  }
  OnAfterDestroy() {
    RenderModuleController_1.RenderModuleController.GlobalTimeDilation = 1;
    this.Ipo();
    UiInteractLogReport_1.UiInteractLogReport.RecordRouletteClose();
  }
  Ipo() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(10, [19], true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.Epo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenRouletteSetView, this.WXa);
    var e = this.ts1.GetActionName();
    InputDistributeController_1.InputDistributeController.BindAction(e, this.jXa);
    this.ts1.AddEventListener();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.Epo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenRouletteSetView, this.WXa);
    var e = this.ts1.GetActionName();
    InputDistributeController_1.InputDistributeController.UnBindAction(e, this.jXa);
    this.ts1.RemoveEventListener();
  }
  OnTick(e) {
    var t;
    super.OnTick(e);
    if (!this.IsHideOrHiding) {
      [e, t] = this.vfo.Tick(e);
      this.pfo.Refresh(e, t);
    }
  }
  vpo() {
    this.zfo();
    this.Zfo();
    this.epo();
    this.pfo.SetAllGridToggleSelfInteractive(false);
  }
  epo() {
    this.pfo.RefreshRouletteType();
  }
  Zfo() {
    this.pfo.RefreshRoulettePlatformType();
  }
  zfo() {
    this.pfo.RefreshRouletteInputType();
  }
  pB_() {
    var e;
    if (Info_1.Info.OperationType === 2) {
      e = this.ts1.GetCanOpenAssembly(this.ts1.RouletteType);
      this.GetItem(5).SetUIActive(e);
      this.GetExtendToggle(2).SetToggleState(this.ts1.GetToggle1State() ?? 0, false);
      this.GetExtendToggle(3).SetToggleState(this.ts1.GetToggle2State() ?? 0, false);
    }
  }
  QXa() {
    var e = this.ts1.GetActionName();
    var t = this.GetText(4);
    t.SetUIActive(Info_1.Info.IsInGamepad());
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_ToolsClosePC_Text", ModelManager_1.ModelManager.RouletteModel.GetRouletteKeyRichText(e));
  }
}
exports.RouletteMainView = RouletteMainView;
//# sourceMappingURL=RouletteMainView.js.map