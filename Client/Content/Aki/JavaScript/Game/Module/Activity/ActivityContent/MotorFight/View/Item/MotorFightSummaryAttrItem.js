"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightSummaryAttrItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const KscSubControllerBase_1 = require("../../../../../../KuroSimpleCombat/KscSubControllerBase");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const RoleDefine_1 = require("../../../../../RoleUi/RoleDefine");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const MotorFightDefine_1 = require("../../MotorFightDefine");
const WINGMAN_ATTACK_SPEED_ID = 1019;
class MotorFightSummaryAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText]];
  }
  Refresh(e, r, t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), MotorFightDefine_1.motorFightAttrShowTypeToName[e]);
    let o = undefined;
    var i;
    var l;
    var s;
    if (e === 0) {
      o = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel?.KscPlayerEntity;
    } else if (e === 1) {
      s = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
      o = s.MotorcycleKscEntity;
    }
    if (o) {
      if (s = o.GetSkillComp()?.AttrSet_?.Attrs_) {
        this.BLg(s);
        if (e === 0) {
          l = s.Get(220) ?? 1;
          i = s.Get(221) ?? 0;
          l = Math.ceil(l * (1 + i * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND));
          this.GetText(2)?.SetText(l.toString());
        } else {
          i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightAttrShowById(WINGMAN_ATTACK_SPEED_ID);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.Name);
          l = (s.Get(i.AttriId) ?? 0) * i.Ratio * RoleDefine_1.MUL_RATIO;
          s = i.IsNeedPercentSign ? "%" : "";
          this.GetText(2)?.SetText(l + s);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorFightActivity", 71, "实体属性不存在", ["type", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "实体不存在", ["type", e]);
    }
  }
  BLg(e) {
    var r = e.Get(7) ?? 1;
    var t = e.Get(11) ?? 0;
    var r = Math.ceil(r * (1 + t * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND));
    this.GetText(1)?.SetText(r.toString());
    var t = e.Get(8) ?? 0;
    var r = e.Get(14) ?? 0;
    var t = Math.ceil(t * (1 + r * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND) / 100);
    this.GetText(3)?.SetText(t + "%");
    var r = e.Get(9) ?? 0;
    this.GetText(4)?.SetText(r / 100 + "%");
  }
}
exports.MotorFightSummaryAttrItem = MotorFightSummaryAttrItem;
//# sourceMappingURL=MotorFightSummaryAttrItem.js.map