"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMobileSkillPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const TrapDefenseRecyclePriceItem_1 = require("../ChildItem/TrapDefenseRecyclePriceItem");
const TrapDefenseSkillPanelBase_1 = require("./TrapDefenseSkillPanelBase");
const actionNameList = [InputMappingsDefine_1.actionMappings.塔防射击, InputMappingsDefine_1.actionMappings.塔防旋转, InputMappingsDefine_1.actionMappings.塔防道具, InputMappingsDefine_1.actionMappings.塔防冲刺, InputMappingsDefine_1.actionMappings.塔防跳跃, InputMappingsDefine_1.actionMappings.塔防射击, InputMappingsDefine_1.actionMappings.塔防回收机关];
const BUILD_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Atlas/SkillIcon/SkillIconNor/SP_IconT62.SP_IconT62";
class TrapDefenseMobileSkillPanel extends TrapDefenseSkillPanelBase_1.TrapDefenseSkillPanelBase {
  constructor() {
    super(...arguments);
    this.IsInBuild = false;
    this.Type = 0;
    this.uMd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async InitializeAsync() {
    this.uMd = new TrapDefenseRecyclePriceItem_1.TrapDefenseRecyclePriceItem();
    var e = this.GetItem(6);
    await Promise.all([this._Wc(), this.uMd.CreateByResourceIdAsync("UiItem_CoinItem", e)]);
    this.uMd.SetUiActive(true);
  }
  OnChildStart() {
    var e = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(false);
    var i = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelDataHasShop();
    this.uWc(2, e && i);
    this.BattleSkillItemList[5].SetIsBanLongPress(true);
  }
  async _Wc() {
    var e = new Map([[0, this.GetItem(0).GetOwner()], [1, this.GetItem(1).GetOwner()], [2, this.GetItem(2).GetOwner()], [3, this.GetItem(3).GetOwner()], [4, this.GetItem(4).GetOwner()], [5, this.GetItem(5).GetOwner()], [6, this.GetItem(6).GetOwner()]]);
    await Promise.all(Array.from(e.entries()).map(async ([e, i]) => this.NewBattleSkillItem(i, e, e === 2)));
  }
  uWc(e, i) {
    var t = this.DataMap.get(e);
    if (t) {
      t.SetVisible(i);
    }
    this.BattleSkillItemList[e].RefreshVisible();
  }
  TQc(e, i) {
    var t = this.DataMap.get(e);
    if (t) {
      t.SetEnable(i);
    }
    this.BattleSkillItemList[e].RefreshEnable();
  }
  SetRecyclePrice(e) {
    this.uMd.UpdatePrice(e);
  }
  RefreshButtonByTipsType(e) {
    this.Type = e;
    e = (this.Type & 4) > 0;
    this.uWc(6, e);
    this.dEd();
  }
  dEd() {
    var e = !this.IsInBuild;
    var i = (this.Type & 1) > 0 && this.IsInBuild;
    var t = (this.Type & 2) > 0 && this.IsInBuild;
    this.uWc(1, t);
    this.uWc(5, e);
    this.uWc(0, true);
    this.TQc(0, e || i);
  }
  SetIsInBuild(e) {
    this.IsInBuild = e;
    this.$Md();
    this.lhd();
    this.LEd();
    this.RefreshMachineCdState();
    this.dEd();
  }
  $Md() {
    var e = this.DataMap.get(0);
    var i = this.DataMap.get(5);
    e?.SetIsBuilding(this.IsInBuild);
    i?.SetIsBuilding(this.IsInBuild);
  }
  lhd() {
    var e = this.BattleSkillItemList[0];
    var i = this.BattleSkillItemList[5];
    if (this.IsInBuild) {
      e?.SetSkillIcon(BUILD_ICON_PATH);
    } else {
      e?.RefreshSkillIcon();
      i?.RefreshSkillIcon();
    }
  }
  LEd() {
    var e = this.BattleSkillItemList[0];
    var i = this.BattleSkillItemList[5];
    e?.RefreshSkillName();
    i?.RefreshSkillName();
  }
  GetActionNameList() {
    return actionNameList;
  }
  RefreshMachineCdState() {
    var e = this.BattleSkillItemList[0];
    var i = this.BattleSkillItemList[5];
    if (e && i) {
      if (this.IsInBuild) {
        e.ResetSkillCoolDown();
        i.ResetSkillCoolDown();
      } else {
        e.RefreshTrapDefenseSkillCoolDown();
        i.RefreshTrapDefenseSkillCoolDown();
      }
    }
  }
}
exports.TrapDefenseMobileSkillPanel = TrapDefenseMobileSkillPanel;
//# sourceMappingURL=TrapDefenseMobileSkillPanel.js.map