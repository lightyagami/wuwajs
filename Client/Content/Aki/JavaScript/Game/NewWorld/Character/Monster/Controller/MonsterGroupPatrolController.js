"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterGroupPatrolController = undefined;
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const INTERVAL_TIME = 1000;
class MonsterGroupPatrolController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return true;
  }
  static OnTick(r) {
    this.mie += r;
    if (!(this.mie < INTERVAL_TIME)) {
      this.mie = 0;
      r = ModelManager_1.ModelManager.MonsterGroupPatrolModel?.MonsterGroups;
      if (r && r.size !== 0) {
        let e = undefined;
        for (const a of r) {
          var o = a[1];
          var t = o.CheckMonsterValid();
          if (t) {
            switch (o.GetAllMonsterInState()) {
              case 0:
                break;
              case 1:
                o.ReadyToStartPatrol();
                break;
              case 2:
                o.CheckMonsterMoveSpeed();
                break;
              case 3:
                (e = e || []).push(a[0]);
            }
          } else {
            (e = e || []).push(a[0]);
          }
        }
        if (e && e.length > 0) {
          for (const s of e) {
            ModelManager_1.ModelManager.MonsterGroupPatrolModel?.RemoveMonsterGroup(s);
          }
        }
      }
    }
  }
  static OnClear() {
    return true;
  }
}
(exports.MonsterGroupPatrolController = MonsterGroupPatrolController).mie = -0;
//# sourceMappingURL=MonsterGroupPatrolController.js.map