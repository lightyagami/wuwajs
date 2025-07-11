"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRoleBuffItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleRoleBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnSelectCallback = undefined;
    this.OnClickBtnDetailCallback = undefined;
    this.BBl = () => {
      this.OnSelectCallback?.(this.GridIndex);
    };
    this.PS1 = () => {
      this.OnClickBtnDetailCallback?.(this.GridIndex);
    };
    this.Iwn = () => {
      var e;
      if (this.Pe && (e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResCharacterBuff(this.Pe.cIc.v9n))) {
        if (ModelManager_1.ModelManager.RogueBattleModel.DescMode === 0) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.AffixDescSimple);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.AffixDesc, ...e.AffixDescParam);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.BBl], [5, this.PS1]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueBattleDescModeChange, this.Iwn);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueBattleDescModeChange, this.Iwn);
  }
  Refresh(e, t, i) {
    this.Pe = e;
    var s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResCharacterBuff(e.cIc.v9n);
    if (s) {
      this.Iwn();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), s.AffixTitle);
      this.GetSprite(2).SetUIActive(false);
      this.SetSpriteByPath(s.AffixIcon, this.GetSprite(2), false, undefined, e => {
        if (e) {
          this.GetSprite(2).SetUIActive(true);
        }
      });
      this.GetItem(4).SetUIActive(e.cIc.dws);
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1, false);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "FirstBuffDetail" && (e = this.GetItem(5))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.RogueBattleRoleBuffItem = RogueBattleRoleBuffItem;
//# sourceMappingURL=RogueBattleRoleBuffItem.js.map