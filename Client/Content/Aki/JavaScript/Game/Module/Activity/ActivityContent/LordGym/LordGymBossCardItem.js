"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymBossCardItem = undefined;
const UE = require("ue");
const MonsterInfoById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterInfoById");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const LordGymLordStarItem_1 = require("../../../LordGym/View/LordGymLordStarItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class LordGymBossCardItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.$be = undefined;
    this.Vnd = [];
    this.q6e = undefined;
    this.zbe = () => new LordGymLordStarItem_1.LordGymLordStarItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem]];
  }
  BindOnSelected(e) {
    this.q6e = e;
  }
  OnSelect() {
    if (this.q6e) {
      this.q6e(this.GetCurrentShowItemIndex());
    }
  }
  OnUnSelect() {}
  OnMoveItem() {}
  OnRefreshItem(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (e) {
      var t = e.LordGymList;
      if (t && t.length !== 0) {
        e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(t[0]);
        if (e) {
          e = e.MonsterList;
          if (e && e.length !== 0) {
            e = MonsterInfoById_1.configMonsterInfoById.GetConfig(e[0]);
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
            this.SetTextureByPath(e.BigIcon, this.GetTexture(1));
            this.Vnd.length = t.length;
            for (let e = 0; e < this.Vnd.length; e++) {
              this.Vnd[e] = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(t[e]);
            }
            this.$be ||= new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.zbe);
            this.$be.RefreshByData(this.Vnd);
          }
        }
      }
    }
  }
}
exports.LordGymBossCardItem = LordGymBossCardItem;
//# sourceMappingURL=LordGymBossCardItem.js.map