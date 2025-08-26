"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectViewBase = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
class ItemInspectViewBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.pWu = Vector2D_1.Vector2D.Create();
    this.YCo = undefined;
    this.aot = false;
    this.vWu = false;
    this.yWu = false;
    this.H_i = 0;
    this.SWu = 0;
    this.aod = t => {
      if (t) {
        this.pWu.X = 0;
        this.pWu.Y = 0;
        this.MWu(this.pWu, false);
        t = t.GetLocalPointInPlane();
        this.pWu.X = t.X;
        this.pWu.Y = t.Y;
      }
    };
    this.B8i = t => {
      if (t) {
        t = t.GetLocalPointInPlane();
        this.pWu.X -= t.X;
        this.pWu.Y = t.Y - this.pWu.Y;
        this.MWu(this.pWu, false);
        this.pWu.X = t.X;
        this.pWu.Y = t.Y;
      }
    };
    this.hod = t => {
      this.EWu();
    };
    this.lqt = () => {
      this.EWu();
      this.IWu(Info_1.Info.IsInGamepad());
    };
    this.q8i = (t, i) => {
      if (Info_1.Info.IsInGamepad() && i !== this.H_i) {
        this.H_i = -i;
        this.TWu();
      }
    };
    this.G8i = (t, i) => {
      if (Info_1.Info.IsInGamepad() && i !== this.SWu) {
        this.SWu = -i;
        this.TWu();
      }
    };
  }
  ExecuteModifyTipText(t, i) {
    i();
  }
  ExecuteTriggerDialogues(t, i) {
    i();
  }
  OnTick(t) {
    ControllerHolder_1.ControllerHolder.ItemInspectController.UpdateItemInspect(t);
  }
  InitDrag(t) {
    this.YCo = t;
    this.bWu();
    this.aot = true;
  }
  ClearDrag() {
    this.RWu();
    this.YCo = undefined;
    this.aot = false;
    this.vWu = false;
    this.H_i = 0;
    this.SWu = 0;
  }
  SetInputEnable(t) {
    if (!(this.aot = t)) {
      this.EWu();
    }
  }
  IsInteractingItem() {
    return this.vWu;
  }
  bWu() {
    var t = this.YCo;
    if (t?.IsValid()) {
      t.OnPointerBeginDragCallBack.Bind(this.aod);
      t.OnPointerDragCallBack.Bind(this.B8i);
      t.OnPointerEndDragCallBack.Bind(this.hod);
      t.OnPointerDownCallBack.Bind(this.aod);
      t.OnPointerCancelCallBack.Bind(this.hod);
      t.OnPointerUpCallBack.Bind(this.hod);
    }
    this.IWu(Info_1.Info.IsInGamepad());
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  RWu() {
    var t = this.YCo;
    if (t?.IsValid()) {
      t.OnPointerBeginDragCallBack.Unbind();
      t.OnPointerDragCallBack.Unbind();
      t.OnPointerEndDragCallBack.Unbind();
      t.OnPointerDownCallBack.Unbind();
      t.OnPointerCancelCallBack.Unbind();
      t.OnPointerUpCallBack.Unbind();
    }
    this.IWu(false);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  IWu(t) {
    if (t) {
      if (!this.yWu) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 48, "ItemInspect 绑定手柄输入");
        }
        InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
        InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
        this.yWu = true;
      }
    } else if (this.yWu) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "ItemInspect 解绑手柄输入");
      }
      InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
      InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
      this.yWu = false;
    }
  }
  TWu() {
    this.pWu.X = this.SWu;
    this.pWu.Y = this.H_i;
    if (this.pWu.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) {
      this.EWu();
    } else {
      this.MWu(this.pWu, true);
    }
  }
  MWu(t, i) {
    if (this.aot) {
      this.vWu = true;
      ControllerHolder_1.ControllerHolder.ItemInspectController.ReceiveRotateInput(t, i);
    }
  }
  EWu() {
    this.vWu = false;
    ControllerHolder_1.ControllerHolder.ItemInspectController.ResetRotateInput();
  }
}
exports.ItemInspectViewBase = ItemInspectViewBase;
//# sourceMappingURL=ItemInspectViewBase.js.map