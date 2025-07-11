"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedDollController = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class BigStuffedDollController extends ControllerBase_1.ControllerBase {
  static Open(e, t, a) {
    var r = ModelManager_1.ModelManager.BigStuffedDollModel;
    r.GameplayStart(e, t);
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r.BrokenRockEntityPbDataId);
    if (e) {
      r.BrokenRockEntityCreatureDataId = e.CreatureDataId;
    }
    UiManager_1.UiManager.OpenView("BigStuffedDollView", undefined, () => {
      a();
    });
  }
  static SetBooleanValueThenSendEvent(e, t, a) {
    ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByEntity(e, t, a);
    BigStuffedDollController.kLe(e);
  }
  static SetIntValueThenSendEvent(e, t, a) {
    ModelManager_1.ModelManager.BlackboardModel.SetIntValueByEntity(e, t, a);
    BigStuffedDollController.kLe(e);
  }
  static kLe(e) {
    var t;
    var e = EntitySystem_1.EntitySystem.Get(e);
    if (e?.Valid && (e = e.GetComponent(18))?.Valid && (t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(394204955))) {
      e.SendGameplayEventToActor(t);
    }
  }
}
exports.BigStuffedDollController = BigStuffedDollController;
//# sourceMappingURL=BigStuffedDollController.js.map