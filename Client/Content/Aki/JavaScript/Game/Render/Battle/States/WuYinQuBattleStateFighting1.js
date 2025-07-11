"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const WuYinQuBattleConfig_1 = require("../WuYinQuBattleConfig");
const WuYinQuBattleNameDefines_1 = require("../WuYinQuBattleNameDefines");
const WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateFighting1 extends WuYinQuBattleStateBase_1.default {
  constructor() {
    super(...arguments);
    this.Timer = -0;
  }
  GetFightingData() {
    return this.Owner.WuYinQuFightingData.WuYinQuFightingData1;
  }
  OnEnter(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "进入战斗阶段");
    }
    this.Owner.当前状态 = "战斗阶段1";
    var t;
    var i = this.GetFightingData();
    this.Timer = 0;
    if (UE.KismetSystemLibrary.IsValid(i)) {
      i = this.Owner.WuYinQuFightingData.GlobalMPC;
      t = this.Owner.WuYinQuFightingData;
      if (i) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalLandscapeRadiusAndHardness, new UE.LinearColor(t.LandscapeShowingRadiusCurve.GetFloatValue(1), WuYinQuBattleConfig_1.default.LandscapeHardness, 0, 0));
      }
      if (i) {
        UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalBlackStoneErosion, 1);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderBattle", 11, "没有配置有效的战斗氛围数据");
    }
  }
  OnUpdate(e) {}
  OnExit(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "退出战斗阶段");
    }
  }
}
exports.default = WuYinQuBattleStateFighting1;
//# sourceMappingURL=WuYinQuBattleStateFighting1.js.map