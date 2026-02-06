"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleControlPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItemGroup_1 = require("../../../Common/InputKey/InputMultiKeyItemGroup");
const MotorcycleControlPanelBase_1 = require("./MotorcycleControlPanelBase");
class MotorcycleControlPanel extends MotorcycleControlPanelBase_1.MotorcycleControlPanelBase {
  constructor() {
    super(...arguments);
    this.dJs = [];
    this.Yef = () => {
      this.etf();
    };
    this.uZe = () => {
      this.etf();
    };
    this.gZe = (e, t) => {
      this.rdg(e);
    };
    this.TZe = e => {
      this.rdg(e);
    };
    this.jMg = () => {
      this.SetVisible(1, ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(9));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.InitChildType(43);
    await this.NewAllKeyItems();
    this.etf();
    this.SetVisible(1, ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(9));
    this.Ore();
  }
  async NewAllKeyItems() {
    var e = [this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner()];
    await Promise.all(e.map(async (e, t) => this.ttf(e, t)));
  }
  async ttf(e, t) {
    var i = new InputMultiKeyItemGroup_1.InputMultiKeyItemGroup();
    await i.CreateByActorAsync(e);
    this.dJs.push(i);
    return i;
  }
  etf() {
    this.odg();
    this.zef();
    this.ndg();
  }
  odg() {
    this.eht(0, 1, InputMappingsDefine_1.actionMappings.载具漂移, "HotKeyText_MotorDrift_Name");
  }
  zef() {
    this.eht(1, 6, InputMappingsDefine_1.actionMappings.载具子弹跳, undefined, InputMappingsDefine_1.actionMappings.载具子弹跳1, "HotKeyText_MotorJump_Name");
  }
  ndg() {
    this.eht(2, 8, InputMappingsDefine_1.actionMappings.载具退场技和下车, "HotKeyText_MotorOff_Name");
  }
  eht(e, t, i, n, s, r) {
    this.dJs[e].Refresh({
      SingleActionOrAxisKeyItem: {
        ActionOrAxisName: i,
        DescriptionId: n,
        Index: 0
      },
      DoubleActionOrAxisKeyItem: s ? {
        ActionOrAxisName: s,
        DescriptionId: r,
        Index: 0
      } : undefined,
      LinkString: "/"
    });
    this.sdg(t, e);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    for (const e of this.dJs) {
      e.Destroy();
    }
    this.dJs.length = 0;
    this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleBulletJumpChanged, this.Yef);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.uZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonEnableRefresh, this.gZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonPanelVisibleChange, this.jMg);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleBulletJumpChanged, this.Yef);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.uZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonEnableRefresh, this.gZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonPanelVisibleChange, this.jMg);
  }
  rdg(e) {
    if (e === 1) {
      this.sdg(e, 0);
    } else if (e === 6) {
      this.sdg(e, 1);
    } else if (e === 8) {
      this.sdg(e, 2);
    }
  }
  sdg(e, t) {
    let i = true;
    i = !!ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsShowBulletJumpLeftClick && (ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(e)?.IsEnable() ?? false);
    this.dJs[t].SetActive(i);
  }
}
exports.MotorcycleControlPanel = MotorcycleControlPanel;
//# sourceMappingURL=MotorcycleControlPanel.js.map