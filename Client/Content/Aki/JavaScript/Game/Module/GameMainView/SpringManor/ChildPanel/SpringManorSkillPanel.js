"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorSkillPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const InputMultiKeyItem_1 = require("../../../Common/InputKey/InputMultiKeyItem");
class SpringManorSkillPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.V3g = undefined;
    this.H3g = undefined;
    this.Ipg = () => {
      ControllerHolder_1.ControllerHolder.InputController.InputAction(InputEnums_1.EInputAction.跳跃, 1);
    };
    this.Tpg = () => {
      ControllerHolder_1.ControllerHolder.InputController.InputAction(InputEnums_1.EInputAction.跳跃, 2);
    };
    this.bpg = () => {
      ControllerHolder_1.ControllerHolder.InputController.InputAction(InputEnums_1.EInputAction.跳跃, 2);
    };
    this.Rpg = () => {
      ControllerHolder_1.ControllerHolder.InputController.InputAction(InputEnums_1.EInputAction.闪避, 1);
    };
    this.Lpg = () => {
      ControllerHolder_1.ControllerHolder.InputController.InputAction(InputEnums_1.EInputAction.闪避, 2);
    };
    this.wpg = () => {
      ControllerHolder_1.ControllerHolder.InputController.InputAction(InputEnums_1.EInputAction.闪避, 2);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([2, UE.UIItem]);
      this.ComponentRegisterInfos.push([3, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    await super.OnBeforeStartAsync();
    if (!Info_1.Info.IsInTouch()) {
      t = [];
      this.V3g = new InputMultiKeyItem_1.InputMultiKeyItem(true);
      t.push(this.V3g.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
      this.H3g = new InputMultiKeyItem_1.InputMultiKeyItem(true);
      t.push(this.H3g.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
      await Promise.all(t);
    }
  }
  OnStart() {
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Bind(this.Ipg);
    t.OnPointUpCallBack.Bind(this.bpg);
    t.OnPointCancelCallBack.Bind(this.Tpg);
    var t = this.GetButton(1);
    t.OnPointDownCallBack.Bind(this.Rpg);
    t.OnPointUpCallBack.Bind(this.wpg);
    t.OnPointCancelCallBack.Bind(this.Lpg);
    this.V3g?.RefreshByActionOrAxis({
      ActionOrAxisName: InputMappingsDefine_1.actionMappings.跳跃
    });
    this.V3g?.SetUiActive(true);
    this.H3g?.RefreshByActionOrAxis({
      ActionOrAxisName: InputMappingsDefine_1.actionMappings.闪避
    });
    this.H3g?.SetUiActive(true);
  }
}
exports.SpringManorSkillPanel = SpringManorSkillPanel;
//# sourceMappingURL=SpringManorSkillPanel.js.map