"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatchGymItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const PhantomArenaGymStarItem_1 = require("./PhantomArenaGymStarItem");
class MatchGymItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Level = -1;
    this.CallbackOnClick = undefined;
    this.i_u = undefined;
    this.zbe = () => {
      return new PhantomArenaGymStarItem_1.GymStarItem();
    };
    this.kqe = () => {
      var t;
      if (this.CallbackOnClick && this.Level) {
        t = this.GetExtendToggle(0).GetToggleState();
        this.CallbackOnClick(this.Level, this.GridIndex, t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UISprite], [10, UE.UISprite], [9, UE.UISprite], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetItem(11).SetUIActive(false);
    this.i_u = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.zbe);
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.kqe);
  }
  Refresh(t, e, i) {
    this.Level = t;
    var s;
    var h;
    var r;
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomBattleGymConfigByLevel(t);
    if (t) {
      r = (s = ModelManager_1.ModelManager.PhantomArenaModel.IsGymLock(this.Level)) ? t.IconLock : t.Icon;
      h = this.GetSprite(4);
      this.SetSpriteByPath(r, h, false);
      h.SetChangeColor(s, h.changeColor);
      this.SetSpriteByPath(t.IconRoman, this.GetSprite(1), false);
      this.SetSpriteByPath(t.IconRoman, this.GetSprite(2), false);
      this.SetSpriteByPath(t.IconBg, this.GetSprite(3), false);
      this.Oei(e);
      r = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateListByGymLevel(this.Level);
      this.i_u.RefreshByData(r);
      this.i_u.SetActive(!s);
      this.RefreshRedDot();
    }
  }
  RefreshRedDot() {
    var t = this.Level > 0 && ModelManager_1.ModelManager.PhantomArenaModel.GetGymRedDotById(this.Level);
    this.GetItem(11).SetUIActive(t);
  }
  Oei(t) {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.IsGymLock(this.Level);
    var i = e ? 2 : !e && t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(i, false);
    this.GetSprite(1).SetUIActive(!t);
    this.GetSprite(2).SetUIActive(t);
    this.GetSprite(3).SetUIActive(!e && !t);
    this.GetSprite(7).SetUIActive(e);
    this.GetSprite(8).SetUIActive(e);
    this.GetSprite(1).SetIsGray(true);
  }
  OnSelected(t) {
    this.Oei(true);
  }
  OnDeselected(t) {
    this.Oei(false);
  }
}
exports.MatchGymItem = MatchGymItem;
//# sourceMappingURL=PhantomArenaMatchGymItem.js.map