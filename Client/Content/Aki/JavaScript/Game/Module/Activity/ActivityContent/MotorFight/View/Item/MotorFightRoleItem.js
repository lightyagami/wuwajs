"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRoleItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const numberList = ["/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity31/MotorcycleBattle/SelectRole/SP_SelectRoleNum01.SP_SelectRoleNum01", "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity31/MotorcycleBattle/SelectRole/SP_SelectRoleNum02.SP_SelectRoleNum02", "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity31/MotorcycleBattle/SelectRole/SP_SelectRoleNum03.SP_SelectRoleNum03", "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity31/MotorcycleBattle/SelectRole/SP_SelectRoleNum04.SP_SelectRoleNum04"];
class MotorFightRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.RecommendRoleIds = [];
    this.OnToggleClickCallback = t => {};
    this.IsSelected = t => false;
    this.N8e = () => {
      this.OnToggleClickCallback(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UISprite], [7, UE.UITexture], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.GetItem(1)?.SetUIActive(!t.IsUnLock);
    this.GetItem(2)?.SetUIActive(!t.IsUnLock);
    this.GetTexture(7)?.SetUIActive(!t.IsUnLock);
    this.GetItem(3)?.SetUIActive(t.IsUnLock);
    this.GetItem(4)?.SetUIActive(t.IsUnLock);
    var s = t.IsUnLock ? "ffffffff" : "2e403c7f";
    this.GetTexture(5)?.SetColor(UE.Color.FromHex(s));
    this.SetTextureByPath(t.RoleTexture, this.GetTexture(5));
    this.GetSprite(6)?.SetUIActive(this.IsSelected(t.Id));
    let o = false;
    for (const c of this.RecommendRoleIds) {
      if (c === t.Id) {
        o = true;
        break;
      }
    }
    this.GetSprite(8)?.SetUIActive(o);
    this.SetSpriteByPath(numberList[i], this.GetSprite(9), false);
    this.GetItem(10)?.SetUIActive(t.HasRedDot);
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  OnSelected(t) {
    this.Pe.ReadRedDot();
    this.GetItem(10)?.SetUIActive(false);
    var e = this.Pe.IsUnLock ? "ffffffff" : "2e403cff";
    this.GetTexture(5)?.SetColor(UE.Color.FromHex(e));
    this.SetToggleState(true);
  }
  OnDeselected(t) {
    var e = this.Pe.IsUnLock ? "ffffffff" : "2e403c7f";
    this.GetTexture(5)?.SetColor(UE.Color.FromHex(e));
    this.SetToggleState(false);
  }
  GetKey(t, e) {
    return t.Id;
  }
}
exports.MotorFightRoleItem = MotorFightRoleItem;
//# sourceMappingURL=MotorFightRoleItem.js.map