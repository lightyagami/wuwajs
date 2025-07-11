"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomAttrItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const ElementItem_1 = require("./ElementItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhantomAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.AffixEntry = undefined;
    this.Mli = undefined;
    this.rho = undefined;
    this.SPe = undefined;
    this.jli = () => {
      return new ElementItem_1.ElementItem();
    };
  }
  Update(e) {
    this.AffixEntry = e;
    this.PKt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  PKt() {
    this.nho();
    this.sho();
    this.v4e();
    this.Hxt();
  }
  nho() {
    var e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.GetIsUnlock(this.AffixEntry);
    this.GetSprite(3).SetUIActive(e);
    this.GetSprite(4).SetUIActive(!e);
  }
  sho() {
    var e;
    var t;
    var i;
    var r = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueAffixConfig(this.AffixEntry.Id);
    if (r) {
      e = ModelManager_1.ModelManager.RoguelikeModel.GetDescModel();
      t = this.GetText(0);
      (i = this.GetText(7)).SetColor(this.AffixEntry?.IsUnlock ? UE.Color.FromHex("BEFE58FF") : UE.Color.FromHex("ECE5D8FF"));
      t.SetColor(this.AffixEntry?.IsUnlock ? UE.Color.FromHex("BEFE58FF") : UE.Color.FromHex("ECE5D8FF"));
      if (e === 0) {
        t.ShowTextNew(r.AffixDescSimple);
        i.ShowTextNew(r.AffixDescSimple);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, r.AffixDesc, ...r.AffixDescParam);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, r.AffixDesc, ...r.AffixDescParam);
      }
    }
  }
  v4e() {
    var e = this.GetText(0);
    var e = e.GetTextRenderSize().X < e.Width;
    var t = this.GetHorizontalLayout(1).GetRootComponent().GetParentAsUIItem();
    var i = this.GetItem(6);
    var r = this.GetItem(5).GetOwner().GetComponentByClass(UE.UISizeControlByOther.StaticClass());
    var s = (e ? t : i).GetOwner();
    r.SetTargetActor(s);
    t.SetUIActive(e);
    i.SetUIActive(!e);
    if (this.Mli === undefined) {
      this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.jli, undefined);
    }
    if (this.rho === undefined) {
      this.rho = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.jli, this.GetItem(2)?.GetOwner());
    }
  }
  Hxt() {
    var e = this.AffixEntry.GetSortElementInfoArrayByCount();
    this.Mli?.RefreshByData(e);
    this.rho?.RefreshByData(e);
  }
  PlayComplete() {
    this.SPe.PlayLevelSequenceByName(RoguelikeDefine_1.COMPLETE);
  }
}
exports.PhantomAttrItem = PhantomAttrItem;
//# sourceMappingURL=PhantomAttrItem.js.map