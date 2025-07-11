"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviveSmallItemGrid = undefined;
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
class ReviveSmallItemGrid extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments);
    this.ItemId = undefined;
    this.j3 = undefined;
    this.GFt = -1;
    this.k0t = 1;
    this.VFt = () => {
      if (this.GFt <= 0) {
        if (this.j3 !== undefined) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
        }
        this.j3 = undefined;
      } else {
        this.RefreshCoolDown();
        this.GFt -= TimerSystem_1.MIN_TIME / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      }
    };
  }
  Refresh(e, i) {
    this.ItemId = e;
    var t = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e);
    this.Apply({
      Data: e,
      Type: 4,
      ItemConfigId: e,
      BottomText: i > 0 ? "" + i : "",
      CoolDownTime: t
    });
    this.GFt = t;
    this.k0t = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(this.ItemId);
    if (this.j3 !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
    }
    this.j3 = TimerSystem_1.GameplayTimerSystem.Forever(this.VFt, TimerSystem_1.MIN_TIME);
  }
  RefreshCoolDown() {
    var e = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(this.ItemId);
    this.SetCoolDown(e, this.k0t);
  }
  OnDestroyed() {
    if ((this.ItemId = undefined) !== this.j3) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
    }
    this.j3 = undefined;
    this.GFt = -1;
    this.k0t = 1;
  }
}
exports.ReviveSmallItemGrid = ReviveSmallItemGrid;
//# sourceMappingURL=ReviveSmallItemGrid.js.map