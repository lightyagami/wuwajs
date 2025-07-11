"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymLordEntranceItem = undefined;
const UE = require("ue");
const MonsterInfoById_1 = require("../../../../Core/Define/ConfigQuery/MonsterInfoById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LordGymLordStarItem_1 = require("./LordGymLordStarItem");
class LordGymLordEntranceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.jSi = 0;
    this.OnToggleClick = undefined;
    this.CanExecuteChangeCallBack = undefined;
    this.$be = undefined;
    this.zbe = () => new LordGymLordStarItem_1.LordGymLordStarItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UITexture], [3, UE.UIExtendToggle]];
    if (this.OnToggleClick) {
      this.BtnBindInfo = [[3, () => {
        this.OnToggleClick?.(this.GridIndex);
      }]];
    }
  }
  OnStart() {
    if (this.CanExecuteChangeCallBack) {
      this.GetExtendToggle(3)?.CanExecuteChange.Bind(() => this.CanExecuteChangeCallBack?.(this.GridIndex) ?? true);
    }
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.zbe);
  }
  Refresh(e, r, t) {
    this.jSi = e;
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(this.jSi);
    if (e) {
      var i = e.LordGymList;
      if (i.length !== 0) {
        e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i[0]);
        if (e) {
          e = e.MonsterList;
          if (e && e.length !== 0) {
            var e = MonsterInfoById_1.configMonsterInfoById.GetConfig(e[0]);
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
            this.SetTextureByPath(e.BigIcon, this.GetTexture(2));
            var s = new Array(i.length);
            for (let e = 0; e < s.length; e++) {
              s[e] = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(i[e]);
            }
            this.$be?.RefreshByData(s);
            e = r ? 1 : 0;
            this.GetExtendToggle(3)?.SetToggleState(e);
          }
        }
      }
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(3)?.SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(3)?.SetToggleState(0);
  }
  GetLordEntranceId() {
    return this.jSi;
  }
}
exports.LordGymLordEntranceItem = LordGymLordEntranceItem;
//# sourceMappingURL=LordGymLordEntranceItem.js.map