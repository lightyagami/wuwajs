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
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputDistributeDefine_1 = require("../../../Ui/InputDistribute/InputDistributeDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RouletteComponentMain_1 = require("../RouletteComponent/RouletteComponentMain");
const RouletteInputManager_1 = require("../RouletteInputManager");
class RouletteMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ffo = 0;
    this.RO = 1;
    this.mpo = false;
    this.vfo = undefined;
    this.dpo = undefined;
    this.Cpo = undefined;
    this.gpo = undefined;
    this.Wfo = (e = true) => {
      if (e) {
        this.pfo.TryEmitCurrentGridSelectOn();
      }
      this.CloseMe();
    };
    this.fpo = () => {
      var e;
      var t;
      if (Info_1.Info.IsInGamepad() && this.mpo) {
        [e, t] = this.pfo.GetCurrentIndexAndAngle();
        this.ppo();
        this.vpo();
        ModelManager_1.ModelManager.RouletteModel.SaveRouletteActionOpenConfig(this.RO, this.ffo);
        this.pfo.Refresh(e, t);
        this.Mpo();
      }
    };
    this.cEa = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "检测到轮盘输入变化,关闭自身", ["新输入类型", Info_1.Info.InputControllerType]);
      }
      this.Wfo(false);
    };
    this.Epo = e => {
      if (!ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag)) {
        this.Wfo(false);
      }
    };
    this.jXa = (e, t) => {
      if (t === 1) {
        this.Wfo();
      }
    };
    this.WXa = () => {
      ControllerHolder_1.ControllerHolder.RouletteController.OpenAssemblyView(this.ffo);
      this.Wfo(false);
    };
  }
  get pfo() {
    switch (this.ffo) {
      case 0:
        if (!this.Cpo) {
          this.Cpo = new RouletteComponentMain_1.RouletteComponentMainExplore();
          this.Cpo.SetRootActor(this.dpo.GetOwner(), true);
        }
        return this.Cpo;
      case 1:
        if (!this.gpo) {
          this.gpo = new RouletteComponentMain_1.RouletteComponentMainFunction();
          this.gpo.SetRootActor(this.dpo.GetOwner(), true);
        }
        return this.gpo;
    }
  }
  OnRegisterComponent() {
    switch (Info_1.Info.OperationType) {
      case 2:
        this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIText], [5, UE.UIItem]];
        this.BtnBindInfo = [[2, this.fpo], [3, this.fpo]];
        break;
      case 1:
        this.ComponentRegisterInfos = [[0, UE.UIItem]];
    }
  }
  OnStart() {
    if (!this.OpenParam) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 37, "[Roulette] 轮盘打开时未获取到参数");
      }
    }
    var e = this.OpenParam ?? [];
    this.RO = e.length > 0 ? Number(e[0]) : 1;
    var e = e.length > 1 ? Number(e[1]) : undefined;
    this.ffo = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(this.RO);
    this.pB_();
    var t = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen();
    var i = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    this.mpo = Info_1.Info.IsInGamepad() && t && i;
    this.dpo = this.GetItem(0);
    if (this.ffo === 1 && !i || this.ffo === 0 && !t) {
      this.ppo();
    }
    if (Info_1.Info.OperationType === 2) {
      t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10026);
      this.GetItem(1).SetUIActive(Info_1.Info.IsInGamepad() && t && i);
      this.Mpo();
      this.QXa();
    }
    this.vpo();
    var t = CommonParamById_1.configCommonParamById.GetFloatConfig("Roulette_Main_Gamepad_DeadLimit");
    var i = Info_1.Info.IsInKeyBoard() ? Vector2D_1.Vector2D.Create(this.GetRootItem().GetPositionInScreen(true)) : undefined;
    this.vfo = new RouletteInputManager_1.rouletteInputManager[Info_1.Info.InputControllerMainType](i, undefined, e, t);
    this.vfo.BindEvent();
    this.vfo.OnInit();
    this.vfo.RouletteViewType = 1;
    this.vfo.SetEndInputEvent(this.Wfo);
    this.Spo();
    this.vfo.ActivateInput(true);
  }
  Spo() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(10, [19], false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, true);
  }
  OnBeforeDestroy() {
    this.dpo = undefined;
    if (this.pfo) {
      this.pfo.Destroy();
    }
    this.Cpo = undefined;
    this.gpo = undefined;
    if (this.vfo) {
      this.vfo.Destroy();
      this.vfo = undefined;
    }
  }
  OnAfterDestroy() {
    this.Ipo();
  }
  Ipo() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(10, [19], true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.Epo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenRouletteSetView, this.WXa);
    var e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[this.RO];
    var e = ModelManager_1.ModelManager.RouletteModel.GetRouletteMainAction(e);
    InputDistributeController_1.InputDistributeController.BindAction(e, this.jXa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.Epo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenRouletteSetView, this.WXa);
    var e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[this.RO];
    var e = ModelManager_1.ModelManager.RouletteModel.GetRouletteMainAction(e);
    InputDistributeController_1.InputDistributeController.UnBindAction(e, this.jXa);
  }
  OnTick(e) {
    var t;
    super.OnTick(e);
    if (!this.IsHideOrHiding) {
      [e, t] = this.vfo.Tick(e);
      this.pfo.Refresh(e, t);
    }
  }
  Mpo() {
    var e = this.ffo === 0;
    var t = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen();
    var i = this.GetExtendToggle(2);
    if (t) {
      i.SetToggleState(e ? 1 : 0, false);
    } else {
      i.SetToggleState(2, false);
    }
    this.GetExtendToggle(3).SetToggleState(e ? 0 : 1, false);
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
  ppo() {
    var e = this.ffo === 0;
    this.ffo = e ? 1 : 0;
    this.pB_();
  }
  pB_() {
    if (Info_1.Info.OperationType === 2) {
      let e = true;
      if (this.ffo === 0 && ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteReplace() || this.ffo === 1 && ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteReplace()) {
        e = false;
      }
      this.GetItem(5).SetUIActive(e);
    }
  }
  QXa() {
    var e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[this.RO];
    var t = this.GetText(4);
    t.SetUIActive(Info_1.Info.IsInGamepad());
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_ToolsClosePC_Text", ModelManager_1.ModelManager.RouletteModel.GetRouletteKeyRichText(e));
  }
}
exports.RouletteMainView = RouletteMainView;
//# sourceMappingURL=RouletteMainView.js.map