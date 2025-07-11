"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSystemComponent = undefined;
const SetUtility_1 = require("../../Core/Container/SetUtility");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const InputFilter_1 = require("./InputFilter");
const InputFilterManager_1 = require("./InputFilterManager");
class InputSystemComponent {
  constructor() {
    this.XMe = undefined;
    this.$Me = new Map();
    this.YMe = () => {
      this.XMe = new InputFilter_1.InputFilter(undefined, undefined, undefined, undefined);
    };
    this.JMe = () => {
      this.SetCurrentSystemAction();
    };
    this.zMe = () => {
      this.SetNormalAction();
    };
    this.SetNormalAction();
  }
  ReceiveBeginPlay() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnBlockCharacterAction, this.YMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetSystemAction, this.JMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetNormalAction, this.zMe);
  }
  ReceiveEndPlay() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnBlockCharacterAction, this.YMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetSystemAction, this.JMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetNormalAction, this.zMe);
  }
  SetInputActionList(e, t) {
    var n = new Set();
    if (e) {
      n.add(e);
    }
    var e = InputFilterManager_1.InputFilterManager.CharacterSystemViewActions.get(t);
    if (e) {
      SetUtility_1.SetUtility.AddToSet(n, e);
    }
    this.$Me.set(t, n);
  }
  SetCurrentSystemAction() {
    var e = new Set();
    for (const t of this.$Me.values()) {
      SetUtility_1.SetUtility.AddToSet(e, t);
    }
    this.XMe = new InputFilter_1.InputFilter(e, InputFilterManager_1.InputFilterManager.CharacterActions, undefined, InputFilterManager_1.InputFilterManager.CharacterAxes);
  }
  SetNormalAction() {
    this.XMe = new InputFilter_1.InputFilter(InputFilterManager_1.InputFilterManager.CharacterSystemActions.keys(), undefined, undefined, undefined);
  }
  GetPriority() {
    return 1;
  }
  GetInputFilter() {
    return this.XMe;
  }
  HandlePressEvent(e, t) {
    var n = InputFilterManager_1.InputFilterManager.CharacterSystemActions.get(e);
    if (n) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HotKeyInput, n);
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ViewHotKeyInputPress, e);
    }
  }
  HandleReleaseEvent(e, t) {
    if (!InputFilterManager_1.InputFilterManager.CharacterSystemActions.get(e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ViewHotKeyInputRelease, e);
    }
  }
  HandleHoldEvent(e, t) {}
  HandleInputAxis(e, t) {}
  ClearInputAxis(e) {}
  ClearSingleAxisInput(e, t) {}
  PreProcessInput(e, t) {}
  PostProcessInput(e, t) {}
}
exports.InputSystemComponent = InputSystemComponent;
//# sourceMappingURL=InputSystemComponent.js.map