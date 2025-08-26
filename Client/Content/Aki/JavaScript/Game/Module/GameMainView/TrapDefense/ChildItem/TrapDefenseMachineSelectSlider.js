"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMachineSelectSlider = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const INTERVAL = 0.025;
class TrapDefenseMachineSelectSlider extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Index = 0;
    this.LCa = Vector2D_1.Vector2D.Create();
    this.xi1 = Vector2D_1.Vector2D.Create();
    this.Q_t = Vector2D_1.Vector2D.Create();
    this.dXu = false;
    this.Hwt = undefined;
    this.SliderPointerDownNotify = undefined;
    this.SliderValueChangeNotify = undefined;
    this.SliderEndDragNotify = undefined;
    this.mXu = i => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseBattle", 10, "触屏选择机关", ["Index", i]);
      }
      this.SliderValueChangeNotify?.(i);
    };
    this.fXu = i => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseBattle", 10, "触屏选择机关按下");
      }
      this.Sequence?.StopSequenceByKey("ClickOut", false, true);
      this.Sequence?.PlaySequence("Click");
      this.Index = Math.floor(this.Hwt.Value);
      this.dXu = true;
      i = i.pointerPosition;
      LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(i, this.LCa);
      this.SliderPointerDownNotify?.();
    };
    this.gXu = i => {
      var i = i.pointerPosition;
      LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(i, this.xi1);
      this.xi1.Subtraction(this.LCa, this.Q_t);
      if (this.Q_t.X !== 0) {
        i = this.Q_t.X * INTERVAL + this.Index;
        this.LCa.DeepCopy(this.xi1);
        if (Math.floor(i) === this.Index) {
          this.Index = i;
        } else {
          this.Index = i;
          i = Math.floor(this.Index);
          this.SetSliderValue(i, true);
        }
      }
    };
    this.CXu = i => {
      if (this.dXu) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("TowerDefenseBattle", 10, "触屏选择机关抬起");
        }
        this.dXu = false;
        this.Sequence?.StopSequenceByKey("Click", false, true);
        this.Sequence?.PlaySequence("ClickOut");
        this.SliderEndDragNotify?.();
      }
    };
    this.pXu = i => {
      if (this.dXu) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("TowerDefenseBattle", 10, "触屏选择机关结束拖拽");
        }
        this.dXu = false;
        this.Sequence?.PlaySequence("ClickOut");
        this.SliderEndDragNotify?.();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISliderComponent], [1, UE.UIDraggableComponent]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Hwt = this.GetSlider(0);
    this.Hwt.OnValueChangeCb.Bind(this.mXu);
    var i = this.GetDraggable(1);
    i.OnPointerDownCallBack.Bind(this.fXu);
    i.OnPointerDragCallBack.Bind(this.gXu);
    i.OnPointerUpCallBack.Bind(this.CXu);
    i.OnPointerEndDragCallBack.Bind(this.pXu);
  }
  OnBeforeDestroy() {
    if (this.Sequence) {
      this.Sequence.Clear();
      this.Sequence = undefined;
    }
  }
  SetSliderValue(i, t) {
    this.Hwt.SetValue(i, t);
  }
  RefreshSliderMaxValue(i) {
    this.Hwt.SetMaxValue(i, true, false);
  }
}
exports.TrapDefenseMachineSelectSlider = TrapDefenseMachineSelectSlider;
//# sourceMappingURL=TrapDefenseMachineSelectSlider.js.map