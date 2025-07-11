"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuYingXiongKaiView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const GuYingXiongKaiSkillItem_1 = require("./GuYingXiongKaiSkillItem");
const SECTOR_ANGLE_SIZE = 1 / 45;
const HALF_SECTOR_ANGLE_SIZE = 22.5;
const SECTOR_NUM = 8;
class GuYingXiongKaiView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.det = [];
    this.au1 = undefined;
    this.I5t = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChallengeAgain, InputMappingsDefine_1.actionMappings.玩法放弃);
    };
    this.hu1 = () => {
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.攻击, true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 20, "攻击按下");
      }
    };
    this.lu1 = () => {
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.攻击, false);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 20, "攻击取消");
      }
    };
    this._u1 = () => {
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.攻击, false);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 20, "攻击释放");
      }
    };
    this.AO1 = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.I5t]];
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems();
  }
  async NewAllSkillItems() {
    if (!Info_1.Info.IsInTouch()) {
      this.GetItem(0).SetUIActive(false);
    }
    var t = [this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner(), this.GetItem(4).GetOwner()];
    await Promise.all(t.map(async (t, e) => this.fet(t, e)));
  }
  async fet(t, e) {
    var n = new GuYingXiongKaiSkillItem_1.GuYingXiongKaiSkillItem();
    await n.CreateThenShowByActorAsync(t, e);
    this.det.push(n);
    n.SetUiActive(false);
    return n;
  }
  OnAddEventListener() {
    this.au1 = this.GetButton(5);
    if (this.au1) {
      this.au1.OnPointDownCallBack.Bind(this.hu1);
      this.au1.OnPointUpCallBack.Bind(this._u1);
      this.au1.OnPointCancelCallBack.Bind(this.lu1);
    }
  }
  OnRemoveEventListener() {
    if (this.au1) {
      this.au1.OnPointDownCallBack.Unbind();
      this.au1.OnPointUpCallBack.Unbind();
      this.au1.OnPointCancelCallBack.Unbind();
    }
  }
  OnBeforeDestroy() {
    for (const t of this.det) {
      t.Destroy();
    }
    this.det.length = 0;
    this.au1 = undefined;
  }
  OnTick(t) {
    for (const e of this.det) {
      e.Tick(t);
    }
    this.PO1();
  }
  PO1() {
    if (Info_1.Info.IsInKeyBoard()) {
      var e = Global_1.Global.CharacterController;
      var n = e.GetCursorPosition();
      if (n) {
        var i = (0, puerts_1.$ref)(undefined);
        var r = (0, puerts_1.$ref)(undefined);
        e.GetViewportSize(i, r);
        var e = (0, puerts_1.$unref)(i);
        var i = e * 0.5;
        var e = (0, puerts_1.$unref)(r) * 0.5;
        var r = i * 0.4;
        var s = e * 0.4;
        var i = n.X - i;
        var e = e - n.Y;
        if (!(Math.abs(i) < r) || !(Math.abs(e) < s)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Activity", 20, "坐标", ["dx, dy", i + ", " + e], ["sX, sY", r + ", " + s]);
          }
          let t = Math.atan2(e, i) * MathUtils_1.MathUtils.RadToDeg;
          if (t < 0) {
            t += 360;
          }
          n = Math.floor((t + HALF_SECTOR_ANGLE_SIZE) * SECTOR_ANGLE_SIZE) % SECTOR_NUM;
          if (n !== this.AO1) {
            switch (this.AO1 = n) {
              case 0:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
                break;
              case 1:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
                break;
              case 2:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
                break;
              case 3:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
                break;
              case 4:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
                break;
              case 5:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
                break;
              case 6:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
                break;
              case 7:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
            }
          }
        }
      }
    }
  }
}
exports.GuYingXiongKaiView = GuYingXiongKaiView;
//# sourceMappingURL=GuYingXiongKaiView.js.map