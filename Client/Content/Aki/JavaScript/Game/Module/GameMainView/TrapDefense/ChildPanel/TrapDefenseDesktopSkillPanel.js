"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseDesktopSkillPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const TrapDefenseSkillPanelBase_1 = require("./TrapDefenseSkillPanelBase");
const actionNameList = [InputMappingsDefine_1.actionMappings.塔防射击, InputMappingsDefine_1.actionMappings.塔防道具];
class TrapDefenseDesktopSkillPanel extends TrapDefenseSkillPanelBase_1.TrapDefenseSkillPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async InitializeAsync() {
    await Promise.all([this._Wc()]);
  }
  OnChildStart() {
    this.Xlh();
  }
  async _Wc() {
    var e = new Map([[0, this.GetItem(0).GetOwner()], [1, this.GetItem(1).GetOwner()]]);
    await Promise.all(Array.from(e.entries()).map(async ([e, i]) => this.NewBattleSkillItem(i, e, false)));
  }
  Xlh() {
    var e;
    var i;
    var a = this.DataMap.get(1);
    if (a) {
      e = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(false);
      i = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelDataHasShop();
      a.SetVisible(e && i);
    }
    this.BattleSkillItemList[1].RefreshVisible();
  }
  RefreshButtonByIsInBuild(e) {
    var e = !e;
    var i = this.DataMap.get(0);
    if (i) {
      i.SetVisible(e);
    }
    this.BattleSkillItemList[0].RefreshVisible();
  }
  GetActionNameList() {
    return actionNameList;
  }
}
exports.TrapDefenseDesktopSkillPanel = TrapDefenseDesktopSkillPanel;
//# sourceMappingURL=TrapDefenseDesktopSkillPanel.js.map