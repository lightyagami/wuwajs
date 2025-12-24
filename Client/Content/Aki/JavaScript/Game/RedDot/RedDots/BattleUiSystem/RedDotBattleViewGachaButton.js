"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotBattleViewGachaButton = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotBattleViewGachaButton extends RedDotBase_1.RedDotBase {
  OnCheck() {
    var e = ModelManager_1.ModelManager.GachaModel.CheckNewGachaPool();
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenCommonWeaponSelect, false) ?? false;
    return e || !t;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnOpenGachaChanged, EventDefine_1.EEventName.OnOpenCommonWeaponSelect];
  }
}
exports.RedDotBattleViewGachaButton = RedDotBattleViewGachaButton;
//# sourceMappingURL=RedDotBattleViewGachaButton.js.map