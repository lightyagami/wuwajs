"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceResetItemComponent = exports.SeekTraceSelectItemComponent = exports.SeekTraceMoveRightComponent = exports.SeekTraceMoveLeftComponent = exports.SeekTraceMoveDownComponent = exports.SeekTraceMoveUpComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HotKeyComponent_1 = require("./HotKeyComponent");
class SeekTraceBaseMoveComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
  OnPress(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeekTraceMoveActionInput, this.GetMoveDirection(), true);
  }
  OnRelease(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeekTraceMoveActionInput, this.GetMoveDirection(), false);
  }
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeekTraceMoveAxisInput, this.GetMoveDirection(), t);
  }
}
class SeekTraceMoveUpComponent extends SeekTraceBaseMoveComponent {
  GetMoveDirection() {
    return 1;
  }
}
exports.SeekTraceMoveUpComponent = SeekTraceMoveUpComponent;
class SeekTraceMoveDownComponent extends SeekTraceBaseMoveComponent {
  GetMoveDirection() {
    return 2;
  }
}
exports.SeekTraceMoveDownComponent = SeekTraceMoveDownComponent;
class SeekTraceMoveLeftComponent extends SeekTraceBaseMoveComponent {
  GetMoveDirection() {
    return 3;
  }
}
exports.SeekTraceMoveLeftComponent = SeekTraceMoveLeftComponent;
class SeekTraceMoveRightComponent extends SeekTraceBaseMoveComponent {
  GetMoveDirection() {
    return 4;
  }
}
exports.SeekTraceMoveRightComponent = SeekTraceMoveRightComponent;
class SeekTraceSelectItemComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
  OnPress(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeekTraceSelectItemInput);
  }
}
exports.SeekTraceSelectItemComponent = SeekTraceSelectItemComponent;
class SeekTraceResetItemComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, ModelManager_1.ModelManager.SeekTraceModel.SelectedItem !== undefined);
  }
  OnPress(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeekTraceResetItemInput);
  }
}
exports.SeekTraceResetItemComponent = SeekTraceResetItemComponent;
//# sourceMappingURL=SeekTraceInteractComponent.js.map