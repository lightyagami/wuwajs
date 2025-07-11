"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XiaKongQteSkillItem = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleSkillItem_1 = require("../BattleSkillItem");
class XiaKongQteSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.hqa = 0;
    this.rTt = undefined;
    this.WI = false;
  }
  SetPressCallback(e) {
    this.rTt = e;
  }
  RefreshType(e) {
    this.hqa = e;
    this.RefreshOnInputControllerMainTypeChange();
  }
  RefreshOnInputControllerMainTypeChange() {
    var e = this.Fwc(this.hqa);
    if (e) {
      this.Nwc(e);
    }
  }
  Fwc(e) {
    if (!Info_1.Info.IsInTouch()) {
      if (e === 1) {
        return InputMappingsDefine_1.actionMappings.向右移动;
      } else if (e === 2) {
        return InputMappingsDefine_1.actionMappings.向左移动;
      } else if (e === 4) {
        return InputMappingsDefine_1.actionMappings.大招;
      } else {
        return undefined;
      }
    }
  }
  Nwc(e) {
    if (Info_1.Info.OperationType === 2 && this.KeyActionName !== e) {
      if (this.KeyItem) {
        this.KeyItem.RefreshByActionOrAxis({
          ActionOrAxisName: e
        });
        this.KeyItem.SetActive(true);
      }
      this.KeyActionName = e;
    }
  }
  RefreshSkillIconByResId(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSkillIcon(e);
  }
  OnSkillButtonPressed() {
    this.ClickEffect?.Play();
    this.rTt?.(this.hqa);
  }
  SetEnable(e) {
    this.WI = e;
    this.RefreshEnable();
    this.RefreshDynamicEffect();
  }
  RefreshEnable(e = false) {
    this.SetSkillItemEnable(this.WI, e);
  }
  RefreshDynamicEffect() {
    this.SetDynamicEffectVisible(this.WI);
  }
  SetSkillIconName(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.SkillNameText, e);
    this.SkillNameText.SetUIActive(true);
  }
  RefreshSkillName() {}
}
exports.XiaKongQteSkillItem = XiaKongQteSkillItem;
//# sourceMappingURL=XiaKongQteSkillItem.js.map