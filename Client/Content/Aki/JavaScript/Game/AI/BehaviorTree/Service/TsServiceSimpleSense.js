"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../Controller/TsAiController");
const NRARER_PLAYER_INT_ID = "NearerPlayerIntId";
class TsServiceSimpleSense extends UE.BTService_BlueprintBase {
  constructor() {
    super(...arguments);
    this.SenseRadius = undefined;
    this.IsEnter = false;
    this.IsInit = false;
    this.MinRangeSquared = 0;
    this.MaxRangeSquared = 0;
    this.IsSetNearerPlayerId = false;
  }
  Constructor() {
    this.IsEnter = false;
    this.IsInit = false;
    this.MinRangeSquared = 0;
    this.MaxRangeSquared = 0;
    this.IsSetNearerPlayerId = false;
  }
  ReceiveTickAI(r, e, t) {
    if (r instanceof TsAiController_1.default) {
      var i = Global_1.Global.BaseCharacter;
      if (i) {
        r = r.AiController;
        if (r) {
          r = r.CharActorComp;
          if (r) {
            var r = r.Entity;
            var s = r.GetComponent(125);
            if (s) {
              if (!this.IsInit) {
                this.IsInit = true;
                o = this.SenseRadius.LowerBound.Value;
                l = this.SenseRadius.UpperBound.Value;
                this.MinRangeSquared = o * o;
                this.MaxRangeSquared = l * l;
                s.SetLogicRange(l);
              }
              var l;
              var o = s.PlayerDistSquared;
              let e = 0;
              if (o > this.MaxRangeSquared) {
                e = 0;
                this.IsEnter &&= false;
              } else if (o > this.MinRangeSquared) {
                e = this.IsEnter ? i.CharacterActorComponent.Entity.Id : 0;
              } else {
                e = i.CharacterActorComponent.Entity.Id;
                this.IsEnter ||= true;
              }
              if (e === 0) {
                if (this.IsSetNearerPlayerId) {
                  this.IsSetNearerPlayerId = false;
                  ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(r.Id, "NearerPlayerId");
                }
              } else {
                ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(r.Id, "NearerPlayerId", e);
                this.IsSetNearerPlayerId = true;
              }
              ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(r.Id, NRARER_PLAYER_INT_ID, e);
            }
          }
        }
      }
    }
  }
}
exports.default = TsServiceSimpleSense;
//# sourceMappingURL=TsServiceSimpleSense.js.map