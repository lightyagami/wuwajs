"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GuYingXiongKaiView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  InputController_1 = require("../../../Input/InputController"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  GuYingXiongKaiSkillItem_1 = require("./GuYingXiongKaiSkillItem"),
  SECTOR_ANGLE_SIZE = 1 / 45,
  HALF_SECTOR_ANGLE_SIZE = 22.5,
  SECTOR_NUM = 8;
class GuYingXiongKaiView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.det = [], this.qc1 = void 0, this.I5t = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChallengeAgain, InputMappingsDefine_1.actionMappings.玩法放弃)
    }, this.Gc1 = () => {
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.攻击, !0), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Input", 20, "攻击按下")
    }, this.Fc1 = () => {
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.攻击, !1), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Input", 20, "攻击取消")
    }, this.Nc1 = () => {
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(InputMappingsDefine_1.actionMappings.攻击, !1), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Input", 20, "攻击释放")
    }, this.Zk1 = 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [6, this.I5t]
    ]
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems()
  }
  async NewAllSkillItems() {
    Info_1.Info.IsInTouch() || this.GetItem(0).SetUIActive(!1);
    var t = [this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner(), this.GetItem(4).GetOwner()];
    await Promise.all(t.map(async (t, e) => this.fet(t, e)))
  }
  async fet(t, e) {
    var n = new GuYingXiongKaiSkillItem_1.GuYingXiongKaiSkillItem;
    return await n.CreateThenShowByActorAsync(t, e), this.det.push(n), n.SetUiActive(!1), n
  }
  OnAddEventListener() {
    this.qc1 = this.GetButton(5), this.qc1 && (this.qc1.OnPointDownCallBack.Bind(this.Gc1), this.qc1.OnPointUpCallBack.Bind(this.Nc1), this.qc1.OnPointCancelCallBack.Bind(this.Fc1))
  }
  OnRemoveEventListener() {
    this.qc1 && (this.qc1.OnPointDownCallBack.Unbind(), this.qc1.OnPointUpCallBack.Unbind(), this.qc1.OnPointCancelCallBack.Unbind())
  }
  OnBeforeDestroy() {
    for (const t of this.det) t.Destroy();
    this.det.length = 0, this.qc1 = void 0
  }
  OnTick(t) {
    for (const e of this.det) e.Tick(t);
    this.eO1()
  }
  eO1() {
    if (Info_1.Info.IsInKeyBoard()) {
      var e = Global_1.Global.CharacterController,
        n = e.GetCursorPosition();
      if (n) {
        var i = (0, puerts_1.$ref)(void 0),
          r = (0, puerts_1.$ref)(void 0),
          e = (e.GetViewportSize(i, r), (0, puerts_1.$unref)(i)),
          i = .5 * e,
          e = .5 * (0, puerts_1.$unref)(r),
          r = .4 * i,
          s = .4 * e,
          i = n.X - i,
          e = e - n.Y;
        if (!(Math.abs(i) < r && Math.abs(e) < s)) {
          Log_1.Log.CheckDebug() && Log_1.Log.Debug("Activity", 20, "坐标", ["dx, dy", i + ", " + e], ["sX, sY", r + ", " + s]);
          let t = Math.atan2(e, i) * MathUtils_1.MathUtils.RadToDeg;
          t < 0 && (t += 360);
          n = Math.floor((t + HALF_SECTOR_ANGLE_SIZE) * SECTOR_ANGLE_SIZE) % SECTOR_NUM;
          if (n !== this.Zk1) switch (this.Zk1 = n) {
            case 0:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
              break;
            case 1:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
              break;
            case 2:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
              break;
            case 3:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
              break;
            case 4:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
              break;
            case 5:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
              break;
            case 6:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
              break;
            case 7:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1)
          }
        }
      }
    }
  }
}
exports.GuYingXiongKaiView = GuYingXiongKaiView;
//# sourceMappingURL=GuYingXiongKaiView.js.map