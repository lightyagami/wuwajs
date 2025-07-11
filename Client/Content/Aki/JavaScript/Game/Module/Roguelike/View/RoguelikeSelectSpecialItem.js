"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeSelectSpecialItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeSelectSpecialStarItem_1 = require("./RoguelikeSelectSpecialStarItem");
class RoguelikeSelectSpecialItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super();
    this.mho = undefined;
    this.alo = undefined;
    this.$be = undefined;
    this.zbe = () => new RoguelikeSelectSpecialStarItem_1.RoguelikeSelectSpecialStarItem();
    this.hlo = e => {
      if (this.alo) {
        this.alo(this, this.mho);
      }
    };
    this.alo = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIHorizontalLayout], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UINiagara], [11, UE.UINiagara], [12, UE.UIItem]];
    this.BtnBindInfo = [[9, this.hlo]];
  }
  OnBeforeShow() {
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.zbe);
  }
  Refresh(e, i, t) {
    this.mho = e;
    var r = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRoguelikeSpecialConfig(e.ConfigId);
    if (r !== undefined) {
      const o = this.GetTexture(1);
      o.SetUIActive(false);
      this.SetTextureByPath(r.Icon, o, undefined, () => {
        o.SetUIActive(true);
      });
      var s = ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0 ? r.BriefDescribe : r.Describe;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), s);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), r.Name);
      var s = this.GetText(7);
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "RogueSpecialRemainTime", e.RestCount);
      s.SetUIActive(e.RestCount !== 0);
      this.GetItem(12).SetUIActive(e.IsNew);
      if (r.Level > 0) {
        this.GetItem(2).SetUIActive(true);
        this.GetItem(3).SetUIActive(false);
        this.Zbe(r.Level, r.MaxLevel);
      } else {
        this.GetItem(2).SetUIActive(false);
        this.GetItem(3).SetUIActive(true);
      }
      if (e.IsValid) {
        this.GetItem(8).SetUIActive(false);
        this.GetTexture(0).SetAlpha(RoguelikeDefine_1.ROGUELIKE_SPECIAL_ITEM_UNLOCK_ALPHA);
      } else {
        this.GetItem(8).SetUIActive(true);
        this.GetTexture(0).SetAlpha(RoguelikeDefine_1.ROGUELIKE_SPECIAL_ITEM_LOCK_ALPHA);
      }
      var s = r.Category === 1 ? "FFFFFF" : "FFC3CC";
      var e = r.Category === 1 ? "FFFFFF" : "FFEEF4";
      this.GetUiNiagara(10).SetColor(UE.Color.FromHex(s));
      this.GetUiNiagara(11).SetColor(UE.Color.FromHex(e));
    }
  }
  Zbe(i, t) {
    var r = [];
    for (let e = 0; e < t; e++) {
      var s = i > e;
      r.push(s);
    }
    this.$be.RefreshByData(r);
  }
  SetSelect(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(9).SetToggleState(e);
  }
}
exports.RoguelikeSelectSpecialItem = RoguelikeSelectSpecialItem;
//# sourceMappingURL=RoguelikeSelectSpecialItem.js.map