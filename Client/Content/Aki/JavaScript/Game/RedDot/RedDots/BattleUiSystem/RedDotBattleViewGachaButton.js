"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotBattleViewGachaButton = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotBattleViewGachaButton extends RedDotBase_1.RedDotBase {
  OnCheck() {
    return ModelManager_1.ModelManager.GachaModel.CheckNewGachaPool();
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnOpenGachaChanged];
  }
}
exports.RedDotBattleViewGachaButton = RedDotBattleViewGachaButton;
//# sourceMappingURL=RedDotBattleViewGachaButton.js.map