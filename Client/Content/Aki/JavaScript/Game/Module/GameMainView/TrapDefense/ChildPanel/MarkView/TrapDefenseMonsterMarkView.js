"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterMarkView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const TrapDefenseDefine_1 = require("../../../../TrapDefense/TrapDefenseDefine");
const TrapDefenseMarkView_1 = require("./TrapDefenseMarkView");
class TrapDefenseMonsterMarkView extends TrapDefenseMarkView_1.TrapDefenseMarkView {
  constructor(e) {
    super(e);
    this.Ydd = 0;
    this.NeedUpdatePositionInner = true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.GetRootItem().SetAlpha(0);
    this.Kbe();
  }
  Kbe() {
    var e = this.GetMarkData();
    if (e && e.EnemyType !== this.Ydd) {
      this.Ydd = e.EnemyType;
      const r = this.GetSprite(0);
      if (ControllerHolder_1.ControllerHolder.TowerDefenseEventController.ProcessStatus === 1) {
        this.SetSpriteByPath(TrapDefenseDefine_1.enemyResourcePreviewRecord[e.EnemyType], r, true, undefined, () => {
          r.SetUIActive(true);
        });
      } else {
        this.SetSpriteByPath(TrapDefenseDefine_1.enemyResourceBattleRecord[e.EnemyType], r, true, undefined, () => {
          r.SetUIActive(true);
        });
      }
    }
  }
  UpdatePosition(e, r) {
    this.Kbe();
    super.UpdatePosition(e, r);
  }
}
exports.TrapDefenseMonsterMarkView = TrapDefenseMonsterMarkView;
//# sourceMappingURL=TrapDefenseMonsterMarkView.js.map