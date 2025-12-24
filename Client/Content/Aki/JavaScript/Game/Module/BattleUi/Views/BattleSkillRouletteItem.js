"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillRouletteItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
class BattleSkillRouletteItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.Aah = () => {
      this.RefreshKeyItem();
      this.RefreshVisible();
    };
    this.XBo = () => {
      this.RefreshKeyItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem();
    await this.Qtt.CreateThenShowByActorAsync(e.GetOwner());
    this.RefreshKeyItem();
    this.RefreshVisible();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRouletteKeyChanged, this.Aah);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRouletteKeyChanged, this.Aah);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  RefreshKeyItem() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
    if (e.RouletteKey === "Gamepad_LeftShoulder") {
      this.Qtt.RefreshByKeyList({
        KeyName: "Gamepad_Right2D"
      });
    } else if (!e.RouletteKey) {
      if (e.RouletteSecondKey) {
        e = {
          KeyName: e.RouletteSecondKey
        };
        this.Qtt.RefreshByKeyList(e);
      }
    }
  }
  RefreshVisible() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
    if (e.GetIsPressCombineButton()) {
      e = e.RouletteKey === "Gamepad_LeftShoulder" || e.RouletteKey === undefined && e.RouletteSecondKey !== undefined;
      this.SetActive(e);
    } else {
      this.SetActive(false);
    }
  }
}
exports.BattleSkillRouletteItem = BattleSkillRouletteItem;
//# sourceMappingURL=BattleSkillRouletteItem.js.map