"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSlideControlData = undefined;
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class BattleUiSlideControlData {
  constructor() {
    this.yne = false;
    this.Position = Vector2D_1.Vector2D.Create(0, 0);
    this.ckm = undefined;
    this.Cqg = Vector2D_1.Vector2D.Create(0, 0);
    this.TouchMoveDir = Vector2D_1.Vector2D.Create(0, 0);
    this.TouchId = -1;
  }
  OnPress(t, e, i) {
    this.ckm = t;
    this.Position.Set(e, i);
    this.SetVisible(true);
    this.Cqg.Set(0, 0);
    this.TouchMoveDir.Set(0, 0);
  }
  OnRelease(t) {
    if (this.ckm === t) {
      this.ckm = undefined;
      this.SetVisible(false);
      this.Cqg.Set(0, 0);
      this.TouchMoveDir.Set(0, 0);
    }
  }
  OnTouch(t) {
    if (t.TouchType === 0) {
      this.Cqg.Set(t.TouchPosition.X, t.TouchPosition.Y);
      this.TouchMoveDir.Set(0, 0);
      this.TouchId = t.TouchId;
    } else if (t.TouchType === 2) {
      this.TouchMoveDir.Set(t.TouchPosition.X - this.Cqg.X, t.TouchPosition.Y - this.Cqg.Y);
    }
  }
  Preload() {}
  ForceStop() {
    this.SetVisible(false);
    this.ckm = undefined;
  }
  GetVisible() {
    return this.yne;
  }
  SetVisible(t) {
    this.yne = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSlideControlVisibleChanged, t);
  }
}
exports.BattleUiSlideControlData = BattleUiSlideControlData;
//# sourceMappingURL=BattleUiSlideControlData.js.map