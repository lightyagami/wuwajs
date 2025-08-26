"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRoleSelectFetterItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleRoleSelectFetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnToggleClick = undefined;
    this.ALu = undefined;
    this.XA1 = t => {
      if (t) {
        this.OnToggleClick?.(this.ALu);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.XA1]];
  }
  Refresh(t, e, i) {
    var r;
    var s;
    var o;
    var h = t.v9n;
    var h = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(h);
    var t = (this.ALu = t).F6n;
    var a = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(t);
    if (h && a) {
      o = this.GetTexture(2);
      r = this.GetText(3);
      s = this.GetText(4);
      o.SetChangeColor(t === 0 && !e, o.changeColor);
      this.SetTextureShowUntilLoaded(h.Icon, o);
      o = this.GetSprite(1);
      a = UE.Color.FromHex(a.LvColor);
      o.SetColor(a);
      o.SetUIActive(t > 0 && !e);
      r.SetColor(a);
      s.SetColor(a);
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, "RogueResSynergyLV", t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, h.Name);
    }
  }
  OnSelected(t) {
    var e = this.GetSprite(1);
    var i = this.GetTexture(2);
    i.SetChangeColor(false, i.changeColor);
    e.SetUIActive(false);
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    var e = this.ALu?.F6n;
    var i = this.GetSprite(1);
    var r = this.GetTexture(2);
    i.SetUIActive(e > 0);
    r.SetChangeColor(e === 0, r.changeColor);
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, e) {
    return t.v9n;
  }
}
exports.RogueBattleRoleSelectFetterItem = RogueBattleRoleSelectFetterItem;
//# sourceMappingURL=RogueBattleRoleSelectFetterItem.js.map