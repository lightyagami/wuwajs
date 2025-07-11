"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCaptureRequest = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const BattleNetController_1 = require("../../World/Controller/BattleNetController");
const LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventCaptureRequest extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.NLe = "";
    this.E0 = 0;
  }
  ExecuteNew(t, e) {
    if (e.Type === 1 && EntitySystem_1.EntitySystem.Get(e.EntityId)?.Valid) {
      this.E0 = e.EntityId;
      BattleNetController_1.BattleNetController.RequestCaptureEntity(this.E0).then(e => {
        if (e) {
          this.kLe(t);
          this.OLe();
          this.FinishExecute(true);
        } else {
          this.FinishExecute(false);
        }
      });
    } else {
      this.FinishExecute(false);
    }
  }
  kLe(e) {
    var t = new LevelGameplayActionsDefine_1.CommonActionInfo();
    t.Params = e.SuccessEvent;
    var e = new Array();
    e.push(t);
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e, LevelGeneralContextDefine_1.EntityContext.Create(this.E0));
  }
  OLe() {
    var e = EntitySystem_1.EntitySystem.Get(this.E0);
    if (e &&= e.GetComponent(146)) {
      e.ExecuteCapture(this.NLe);
    }
  }
  OnReset() {
    this.NLe = undefined;
    this.E0 = 0;
  }
}
exports.LevelEventCaptureRequest = LevelEventCaptureRequest;
//# sourceMappingURL=LevelEventCaptureRequest.js.map