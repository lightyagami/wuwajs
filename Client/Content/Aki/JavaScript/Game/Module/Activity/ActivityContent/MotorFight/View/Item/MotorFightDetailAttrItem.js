"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightDetailAttrItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const RoleDefine_1 = require("../../../../../RoleUi/RoleDefine");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MotorFightDetailAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.SPe = undefined;
    this.xLg = () => !!this.Lo.Desc;
    this.OnToggleClick = e => {
      e = e === 1;
      this.GetItem(5).SetUIActive(e);
      e = e ? "Show" : "Hide";
      if (this.SPe) {
        this.SPe.StopCurrentSequence();
        this.SPe.PlayLevelSequenceByName(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnToggleClick]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.xLg);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(5).SetUIActive(false);
  }
  Refresh(e, t, i) {
    this.Lo = e.Config;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Config.Name);
    this.GetSprite(4)?.SetUIActive(e.Config.Desc.length > 0);
    if (e.Config.Desc) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Config.Desc);
    }
    var r = this.GetSprite(1);
    r.SetChangeColor(i % 2 != 0, r.changeColor);
    var i = e.Type;
    let o = undefined;
    if (o = i === 1 ? ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.MotorcycleKscEntity : ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel?.KscPlayerEntity) {
      if (r = o.GetSkillComp()?.AttrSet_?.Attrs_) {
        r = (r.Get(e.Config.AttriId) ?? 0) * e.Config.Ratio * RoleDefine_1.MUL_RATIO;
        e = e.Config.IsNeedPercentSign ? "%" : "";
        this.GetText(3)?.SetText(r + e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorFightActivity", 71, "实体属性不存在", ["type", i]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "实体不存在", ["type", i]);
    }
  }
  OnBeforeDestroy() {
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
  }
}
exports.MotorFightDetailAttrItem = MotorFightDetailAttrItem;
//# sourceMappingURL=MotorFightDetailAttrItem.js.map