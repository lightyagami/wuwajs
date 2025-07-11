"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalCardBaseItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalCardBaseItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.CardData = undefined;
    this.CardConfig = undefined;
    this.NeedShowRedDot = true;
    this.OnToggleCallBack = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.CardData);
      }
    };
    this.$5i = e => {
      if (e === this.CardData.CardId) {
        this.BNe(this.CardData);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIExtendToggle]];
    this.BtnBindInfo = [[2, this.kqe]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPersonalCardRead, this.$5i);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPersonalCardRead, this.$5i);
  }
  Refresh(e, t, s) {
    this.CardData = e;
    this.GridIndex = s;
    this.CardConfig = ConfigManager_1.ConfigManager.InventoryConfig.GetCardItemConfig(e.CardId);
    this.BNe(e);
    this.SetToggleState(t);
    this.SetTextureByPath(this.CardConfig.CardPath, this.GetTexture(0));
  }
  BNe(e) {
    this.GetItem(1).SetUIActive(e.IsUnLock && !e.IsRead && this.NeedShowRedDot);
  }
  SetNeedShowRedDot(e) {
    this.NeedShowRedDot = e;
  }
  SetToggleCallBack(e) {
    this.OnToggleCallBack = e;
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(2).SetToggleState(e);
  }
  OnSelected(e) {
    this.SetToggleState(true);
  }
  OnDeselected(e) {
    this.SetToggleState(false);
  }
  GetConfig() {
    return this.CardConfig;
  }
}
exports.PersonalCardBaseItem = PersonalCardBaseItem;
//# sourceMappingURL=PersonalCardBaseItem.js.map