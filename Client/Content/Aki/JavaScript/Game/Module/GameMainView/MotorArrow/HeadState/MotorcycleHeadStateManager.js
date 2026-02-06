"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleHeadStateManager = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const MotorcycleBuffGateHeadState_1 = require("./MotorcycleBuffGateHeadState");
const MotorcycleBuffItem_1 = require("./MotorcycleBuffItem");
const MotorcycleDropBuffGateHeadState_1 = require("./MotorcycleDropBuffGateHeadState");
const NEXT_BUFF_DURATION = 500;
class MotorcycleHeadStateManager {
  constructor() {
    this.rlt = new Map();
    this.O7g = undefined;
    this.o$g = 0;
    this.MotorcycleBattleBuff = undefined;
    this.MotorcycleBattleBuffUp = undefined;
    this.WaitToShowBattleBuff = [];
  }
  Init() {
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("MotorArrowDropHeadScaleCurvePath");
    this.O7g = ResourceSystem_1.ResourceSystem.Load(t, UE.CurveFloat);
  }
  UpdateHeadState(e, i, r) {
    if (i.ActionType === 0 || i.ActionType === 1) {
      let t = this.rlt.get(i.EntityId);
      if (!t) {
        if ((t = new e()) instanceof MotorcycleBuffGateHeadState_1.MotorcycleBuffGateHeadState) {
          t.CreateHeadStateView(UiLayer_1.UiLayer.WorldSpaceUiRootItem, r);
        } else if (t instanceof MotorcycleDropBuffGateHeadState_1.MotorcycleDropBuffGateHeadState) {
          t.CreateHeadStateView(UiLayer_1.UiLayer.WorldSpaceUiRootItem, r, this.O7g);
        } else {
          t.CreateHeadStateView(UiLayer_1.UiLayer.WorldSpaceUiRootItem, i);
        }
        this.rlt.set(i.EntityId, t);
      }
      t.UpdateByHeadInfo(i);
    } else if (i.ActionType === 2 && (e = this.rlt.get(i.EntityId))) {
      e.DestroyAsync();
      this.rlt.delete(i.EntityId);
    }
  }
  O8g() {
    var t = this.MotorcycleBattleBuff;
    this.MotorcycleBattleBuff = this.MotorcycleBattleBuffUp;
    this.MotorcycleBattleBuffUp = t;
  }
  G8g(t) {
    return !(Time_1.Time.WorldTime < this.o$g) && !(this.MotorcycleBattleBuff?.IsFree ? (this.MotorcycleBattleBuff.UpdateBuffInfo(t), this.MotorcycleBattleBuff.SetActive(true), this.o$g = Time_1.Time.WorldTime + NEXT_BUFF_DURATION, 0) : !this.MotorcycleBattleBuffUp?.IsFree || (this.MotorcycleBattleBuffUp.UpdateBuffInfo(t), this.MotorcycleBattleBuffUp.SetActive(true), this.MotorcycleBattleBuff.SetUp(), this.O8g(), this.o$g = Time_1.Time.WorldTime + NEXT_BUFF_DURATION, 0));
  }
  CreateMotorcycleBuffItem(t) {
    if (!this.MotorcycleBattleBuff) {
      this.MotorcycleBattleBuff = new MotorcycleBuffItem_1.MotorcycleBattleBuff();
      this.MotorcycleBattleBuff.CreateHeadStateView(UiLayer_1.UiLayer.WorldSpaceUiRootItem, t);
      this.MotorcycleBattleBuffUp = new MotorcycleBuffItem_1.MotorcycleBattleBuff();
      this.MotorcycleBattleBuffUp.CreateHeadStateView(UiLayer_1.UiLayer.WorldSpaceUiRootItem, t);
    }
    if (!this.G8g(t)) {
      this.WaitToShowBattleBuff.push(t);
    }
  }
  Tick() {
    if (this.MotorcycleBattleBuff) {
      if (this.WaitToShowBattleBuff.length > 0 && this.G8g(this.WaitToShowBattleBuff[0])) {
        this.WaitToShowBattleBuff.shift();
      }
      this.MotorcycleBattleBuff.Tick();
      this.MotorcycleBattleBuffUp.Tick();
    }
  }
  Clear() {
    for (const t of this.rlt.values()) {
      t.DestroyAsync();
    }
    this.rlt.clear();
    this.MotorcycleBattleBuff?.DestroyAsync();
    this.MotorcycleBattleBuff = undefined;
    this.MotorcycleBattleBuffUp?.DestroyAsync();
    this.MotorcycleBattleBuffUp = undefined;
    this.WaitToShowBattleBuff.length = 0;
    this.O7g = undefined;
  }
}
exports.MotorcycleHeadStateManager = MotorcycleHeadStateManager;
//# sourceMappingURL=MotorcycleHeadStateManager.js.map