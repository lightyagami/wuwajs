"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleFetterLvUpItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleFetterLvUpItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.pvu = undefined;
    this.vvu = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.pvu = new FetterItem();
    t.push(this.pvu.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.vvu = new FetterItem();
    t.push(this.vvu.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    await Promise.all(t);
  }
  Refresh(t, e, r) {
    var i = t.OldRoleBondInfo;
    var s = t.NewRoleBondInfo;
    var a = t.NewRoleBondInfo.v9n;
    var o = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBond(a);
    if (o) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o.Name);
    }
    var o = {
      Id: a,
      Lv: i.F6n,
      Star: i.Whc,
      IsLevelUp: false
    };
    this.pvu.Refresh(o);
    var o = {
      Id: a,
      Lv: s.F6n,
      Star: i.Whc + t.AddStar,
      IsLevelUp: s.F6n > i.F6n
    };
    this.vvu.Refresh(o);
  }
}
exports.RogueBattleFetterLvUpItem = RogueBattleFetterLvUpItem;
class FetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText]];
  }
  Refresh(t) {
    var e;
    var r = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBond(t.Id);
    var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(t.Lv);
    if (r && i) {
      (e = this.GetTexture(1)).SetChangeColor(t.Lv === 0, e.changeColor);
      this.SetTextureShowUntilLoaded(r.Icon, e);
      r = this.GetSprite(0);
      e = UE.Color.FromHex(i.LvColor);
      r.SetColor(e);
      r.SetUIActive(t.Lv > 0);
      this.GetText(2).SetText(t.Star.toString());
    }
  }
}
//# sourceMappingURL=RogueBattleFetterLvUpItem.js.map