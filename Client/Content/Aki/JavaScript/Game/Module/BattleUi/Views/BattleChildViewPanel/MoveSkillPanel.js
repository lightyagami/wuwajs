"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveSkillPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const InputEnums_1 = require("../../../../Input/InputEnums");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const MoveSkillItem_1 = require("../MoveSkillItem");
const actionNameList = [InputMappingsDefine_1.actionMappings.向前移动, InputMappingsDefine_1.actionMappings.向后移动];
class MoveSkillPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.det = [];
    this.bMe = (i, t) => {
      if (t === 0) {
        if (i === InputMappingsDefine_1.actionMappings.向前移动) {
          this.det[0].OnInputAction();
        } else if (i === InputMappingsDefine_1.actionMappings.向后移动) {
          this.det[1].OnInputAction();
        }
      }
    };
  }
  CreateDynamic(i) {
    this.CreateThenShowByResourceIdAsync("UiItem_SkillVisionB", i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems();
    this.Cet();
    this.Ore();
  }
  async NewAllSkillItems() {
    var i = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner()];
    await Promise.all(i.map(async (i, t) => this.fet(i, t)));
  }
  async fet(i, t) {
    var e = new MoveSkillItem_1.MoveSkillItem();
    await e.NewByRootActorAsync(i, t);
    this.det.push(e);
    return e;
  }
  Cet() {
    this.det[0].RefreshByMoveType(InputEnums_1.EInputAxis.MoveForward, 1);
    this.det[1].RefreshByMoveType(InputEnums_1.EInputAxis.MoveForward, -1);
    this.det[0].RefreshKeyByActionName(InputMappingsDefine_1.actionMappings.向前移动);
    this.det[1].RefreshKeyByActionName(InputMappingsDefine_1.actionMappings.向后移动);
    this.det[0].RefreshSkillIconByResId("SP_IconVision01A");
    this.det[1].RefreshSkillIconByResId("SP_IconVision01B");
  }
  Tick(i) {
    for (const t of this.det) {
      t.Tick(i);
    }
  }
  OnBeforeDestroy() {
    for (const i of this.det) {
      i.Destroy();
    }
    this.det.length = 0;
    this.kre();
  }
  Ore() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.BindActions(actionNameList, this.bMe);
    }
  }
  kre() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.UnBindActions(actionNameList, this.bMe);
    }
  }
}
exports.MoveSkillPanel = MoveSkillPanel;
//# sourceMappingURL=MoveSkillPanel.js.map