"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattlePhantomAffix = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleUtils_1 = require("../RogueBattleUtils");
const RogueBattleTokenElementWithCount_1 = require("./RogueBattleTokenElementWithCount");
const COMPLETE = "Complete";
class RogueBattlePhantomAffix extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.ElementLayout = undefined;
    this.AdaptationElementLayout = undefined;
    this.LevelSequencePlayer = undefined;
    this.jli = () => new RogueBattleTokenElementWithCount_1.RogueBattleTokenElementWithCount();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIHorizontalLayout]];
  }
  async OnBeforeStartAsync() {
    this.ElementLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.jli);
    this.AdaptationElementLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.jli);
    return Promise.resolve();
  }
  Refresh(t, e, i) {
    this.Data = t;
    this.RefreshLayout();
    this.RefreshElement();
    this.RefreshUnlock();
    this.RefreshAttrText();
  }
  RefreshAttrText() {
    var t;
    var e;
    var i;
    var s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResAffix(this.Data.v9n);
    if (s) {
      t = ModelManager_1.ModelManager.RogueBattleModel.DescMode;
      e = this.GetText(0);
      (i = this.GetText(7))?.SetColor(this.Data?.t5c ? UE.Color.FromHex("BEFE58FF") : UE.Color.FromHex("ECE5D8FF"));
      e?.SetColor(this.Data?.t5c ? UE.Color.FromHex("BEFE58FF") : UE.Color.FromHex("ECE5D8FF"));
      if (t === 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, s.AffixDescSimple);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, s.AffixDescSimple);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, s.AffixDesc, ...s.AffixDescParam);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, s.AffixDesc, ...s.AffixDescParam);
      }
    }
  }
  RefreshUnlock() {
    this.GetSprite(3).SetUIActive(this.Data.t5c);
    this.GetSprite(4).SetUIActive(!this.Data.t5c);
  }
  RefreshLayout() {
    var t = this.GetText(0);
    var t = t.GetTextRenderSize().X < t.Width;
    var e = this.GetHorizontalLayout(1).GetRootComponent().GetParentAsUIItem();
    var i = this.GetItem(6);
    var s = this.GetItem(5).GetOwner().GetComponentByClass(UE.UISizeControlByOther.StaticClass());
    var r = (t ? e : i).GetOwner();
    s.SetTargetActor(r);
    e.SetUIActive(t);
    i.SetUIActive(!t);
  }
  RefreshElement() {
    const t = RogueBattleUtils_1.RogueBattleUtils.ConvertElementUnitsToElementInfo(this.Data.ZVc);
    this.ElementLayout.RefreshByData(t);
    this.AdaptationElementLayout.RefreshByData(t);
    var e = new UiAsyncTask_1.UiAsyncTask("RogueBattlePhantomAffix.RefreshElement", async () => {
      await Promise.all([this.ElementLayout.RefreshByDataAsync(t), this.AdaptationElementLayout.RefreshByDataAsync(t)]);
    });
    this.RunAsyncTask(e);
  }
  PlayComplete() {
    this.LevelSequencePlayer.PlayLevelSequenceByName(COMPLETE);
  }
}
exports.RogueBattlePhantomAffix = RogueBattlePhantomAffix;
//# sourceMappingURL=RogueBattlePhantomAffix.js.map