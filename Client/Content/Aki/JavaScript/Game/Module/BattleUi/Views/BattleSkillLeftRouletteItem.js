"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillLeftRouletteItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
class BattleSkillLeftRouletteItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this._Ze = undefined;
    this.Aah = () => {
      this.RefreshKeyItem();
      this.RefreshVisible();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem();
    await this.Qtt.CreateThenShowByActorAsync(e.GetOwner());
    this._Ze = ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData;
    this.RefreshKeyItem();
    this.RefreshVisible();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRouletteKeyChanged, this.Aah);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRouletteKeyChanged, this.Aah);
  }
  RefreshKeyItem() {
    var e = this._Ze;
    if (e.RouletteKey !== "Gamepad_LeftShoulder" && e.RouletteKey) {
      e = {
        KeyName: e.RouletteKey
      };
      this.Qtt.RefreshByKeyList(e);
    }
  }
  RefreshVisible() {
    var e;
    if (!this.IsDestroyOrDestroying) {
      if (ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance() || !Info_1.Info.IsInGamepad() || (e = this._Ze).GetIsPressCombineButton()) {
        this.SetActive(false);
      } else {
        e = e.RouletteKey !== "Gamepad_LeftShoulder" && e.RouletteKey !== undefined;
        this.SetActive(e);
      }
    }
  }
}
exports.BattleSkillLeftRouletteItem = BattleSkillLeftRouletteItem;
//# sourceMappingURL=BattleSkillLeftRouletteItem.js.map