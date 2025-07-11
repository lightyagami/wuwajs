"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = exports.TouchData = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class TouchData {
  constructor(t, n, e) {
    this.IsPress = t;
    this.TouchId = n;
    this.TouchPosition = e;
  }
}
exports.TouchData = TouchData;
class Input {
  static Initialize(t) {
    if (t) {
      t.OnClickKey.Add(Input.emr);
      t.OnMiddleMouseScroll.Add(Input.tmr);
      t.OnTouch.Add(Input.Eqt);
      t.OnTouchMove.Add(Input.imr);
    }
  }
  static IsKeyPress(t) {
    t = Input.uEe.get(t);
    return t !== undefined && t;
  }
  static GetAxisValue() {
    return Input.omr;
  }
  static GetTouchMap() {
    return Input.wFo;
  }
}
(exports.Input = Input).uEe = new Map();
Input.wFo = new Map();
Input.omr = 0;
Input.OnlyRespondToKey = "";
Input.Enable = true;
Input.emr = (t, n) => {
  var e = t.KeyName.toString();
  Input.uEe.set(e, n);
  if ((StringUtils_1.StringUtils.IsEmpty(Input.OnlyRespondToKey) || e === Input.OnlyRespondToKey || e.includes("Mouse")) && Input.Enable) {
    Input.uEe.set(e, n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.KeyClick, n, t);
  }
};
Input.tmr = t => {
  if (Input.Enable) {
    Input.omr = t;
  }
};
Input.Eqt = (t, n, e) => {
  if (Input.Enable && Input.wFo.get(n) === undefined) {
    new TouchData(t, n, e);
  }
};
Input.imr = (t, n) => {
  if (Input.Enable && (t = Input.wFo.get(t))) {
    t.TouchPosition = n;
  }
}; //# sourceMappingURL=Input.js.map