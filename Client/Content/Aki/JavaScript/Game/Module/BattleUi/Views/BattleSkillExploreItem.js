"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillExploreItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const RouletteMainViewProxy_1 = require("../../Roulette/ViewProxy/RouletteMainViewProxy");
const BattleSkillItem_1 = require("./BattleSkillItem");
class BattleSkillExploreItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.Jtt = undefined;
    this.ztt = undefined;
    this.Ztt = (e, t) => {
      if (!this.IsLongPress) {
        if (this.Jtt.GetOwner() === t) {
          this.ztt = e;
        }
      }
    };
    this.OnTouch = (e, t) => {
      var i;
      if (!this.IsLongPress) {
        e = Number(e);
        if ((i = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e)?.GetPointerEventData()?.pressComponent) && i.GetOwner() === this.Jtt.GetOwner()) {
          this.ztt = e;
        }
      }
    };
  }
  GetPointEventButton() {
    return this.Jtt;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([13, UE.UIButtonComponent]);
  }
  Initialize(e) {
    this.Jtt = this.GetButton(13);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideTouchIdInject, this.Ztt);
    super.Initialize(e);
  }
  Reset() {
    this.Jtt = undefined;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideTouchIdInject, this.Ztt);
    super.Reset();
  }
  IsNeedLongPress() {
    return this.SkillButtonData.IsEnableLongPress();
  }
  OnSkillButtonPressed() {
    ModelManager_1.ModelManager.BattleUiModel.IsLongPressExploreButton = false;
    super.OnSkillButtonPressed();
  }
  OnSkillButtonReleased() {
    super.OnSkillButtonReleased();
  }
  OnSkillButtonCancel() {
    this.OnSkillButtonReleased();
  }
  OnLongPressButton() {
    super.OnLongPressButton();
    ModelManager_1.ModelManager.BattleUiModel.IsLongPressExploreButton = true;
    if (this.ztt !== undefined) {
      this.OpenRouletteMainView(this.ztt);
      this.ztt = undefined;
    }
  }
  OpenRouletteMainView(e) {
    var t = new RouletteMainViewProxy_1.RouletteMainViewProxy();
    t.TouchId = e;
    ControllerHolder_1.ControllerHolder.RouletteController.OpenRouletteMainView(t);
  }
}
exports.BattleSkillExploreItem = BattleSkillExploreItem;
//# sourceMappingURL=BattleSkillExploreItem.js.map