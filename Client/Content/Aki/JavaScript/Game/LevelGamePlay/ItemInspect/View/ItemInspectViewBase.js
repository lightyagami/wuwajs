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
    this.Bzu = Vector2D_1.Vector2D.Create();
    this.YCo = undefined;
    this.aot = false;
    this.tQc = false;
    this.iQc = false;
    this.H_i = 0;
    this.rQc = 0;
    this.Rod = t => {
      if (t) {
        this.Bzu.X = 0;
        this.Bzu.Y = 0;
        this.oQc(this.Bzu, false);
        t = t.GetLocalPointInPlane();
        this.Bzu.X = t.X;
        this.Bzu.Y = t.Y;
      }
    };
    this.B8i = t => {
      if (t) {
        t = t.GetLocalPointInPlane();
        this.Bzu.X -= t.X;
        this.Bzu.Y = t.Y - this.Bzu.Y;
        this.oQc(this.Bzu, false);
        this.Bzu.X = t.X;
        this.Bzu.Y = t.Y;
      }
    };
    this.wod = t => {
      this.nQc();
    };
    this.lqt = () => {
      this.nQc();
      this.sQc(Info_1.Info.IsInGamepad());
    };
    this.q8i = (t, i) => {
      if (Info_1.Info.IsInGamepad() && i !== this.H_i) {
        this.H_i = -i;
        this.aQc();
      }
    };
    this.G8i = (t, i) => {
      if (Info_1.Info.IsInGamepad() && i !== this.rQc) {
        this.rQc = -i;
        this.aQc();
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
    this.kzu();
    this.aot = true;
  }
  ClearDrag() {
    this.Ozu();
    this.YCo = undefined;
    this.aot = false;
    this.tQc = false;
    this.H_i = 0;
    this.rQc = 0;
  }
  SetInputEnable(t) {
    if (!(this.aot = t)) {
      this.nQc();
    }
  }
  IsInteractingItem() {
    return this.tQc;
  }
  kzu() {
    var t = this.YCo;
    if (t?.IsValid()) {
      t.OnPointerBeginDragCallBack.Bind(this.Rod);
      t.OnPointerDragCallBack.Bind(this.B8i);
      t.OnPointerEndDragCallBack.Bind(this.wod);
      t.OnPointerDownCallBack.Bind(this.Rod);
      t.OnPointerCancelCallBack.Bind(this.wod);
      t.OnPointerUpCallBack.Bind(this.wod);
    }
    this.sQc(Info_1.Info.IsInGamepad());
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  Ozu() {
    var t = this.YCo;
    if (t?.IsValid()) {
      t.OnPointerBeginDragCallBack.Unbind();
      t.OnPointerDragCallBack.Unbind();
      t.OnPointerEndDragCallBack.Unbind();
      t.OnPointerDownCallBack.Unbind();
      t.OnPointerCancelCallBack.Unbind();
      t.OnPointerUpCallBack.Unbind();
    }
    this.sQc(false);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  sQc(t) {
    if (t) {
      if (!this.iQc) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 48, "ItemInspect 绑定手柄输入");
        }
        InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
        InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
        this.iQc = true;
      }
    } else if (this.iQc) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "ItemInspect 解绑手柄输入");
      }
      InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
      InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
      this.iQc = false;
    }
  }
  aQc() {
    this.Bzu.X = this.rQc;
    this.Bzu.Y = this.H_i;
    if (this.Bzu.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) {
      this.nQc();
    } else {
      this.oQc(this.Bzu, true);
    }
  }
  oQc(t, i) {
    if (this.aot) {
      this.tQc = true;
      ControllerHolder_1.ControllerHolder.ItemInspectController.ReceiveRotateInput(t, i);
    }
  }
  nQc() {
    this.tQc = false;
    ControllerHolder_1.ControllerHolder.ItemInspectController.ResetRotateInput();
  }
}
exports.ItemInspectViewBase = ItemInspectViewBase;
//# sourceMappingURL=ItemInspectViewBase.js.map