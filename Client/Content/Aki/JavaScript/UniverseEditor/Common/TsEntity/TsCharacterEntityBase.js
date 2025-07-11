"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsCharacterEntityBase = undefined;
const ue_1 = require("ue");
class TsCharacterEntityBase extends ue_1.KuroEffectActor {
  constructor() {
    super(...arguments);
    this.bEditorTickBySelected = false;
    this.bSetActorComponentTickEnabledByFocus = false;
    this.Id = 0;
  }
  Constructor() {}
  EditorFocusIn() {}
  EditorFocusOut() {}
  EditorInit() {}
  EditorSetActorComponentsTickEnabled(t) {}
  EditorTick(t) {}
}
exports.TsCharacterEntityBase = TsCharacterEntityBase;
exports.default = TsCharacterEntityBase; //# sourceMappingURL=TsCharacterEntityBase.js.map