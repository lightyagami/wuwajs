"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring25UiContext = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
class Spring25UiContext {
  constructor(e) {
    this.i5l = undefined;
    this.$Gl = undefined;
    this.XGl = undefined;
    this.i5l = e;
  }
  get CurrentSignId() {
    return this.$Gl;
  }
  set CurrentSignId(e) {
    this.$Gl = e;
  }
  get CurrentLetterSignId() {
    if (this.XGl === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Spring25", 64, "打开面板之前，未能获得TaskId，请确认Letter TaskId 是否已赋值");
    }
    return this.XGl;
  }
  set CurrentLetterSignId(e) {
    if ((this.XGl = e) !== undefined) {
      this.i5l.SetLetterClickedBySignId(e, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25SelectLetter, e);
    }
  }
  Dispose() {
    this.$Gl = undefined;
  }
}
exports.Spring25UiContext = Spring25UiContext;
//# sourceMappingURL=Spring25UiContext.js.map