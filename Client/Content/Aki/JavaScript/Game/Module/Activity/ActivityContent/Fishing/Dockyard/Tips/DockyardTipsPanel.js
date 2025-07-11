"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardTipsPanel = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const SimpleGenericLayout_1 = require("../../../../../Util/Layout/SimpleGenericLayout");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const FishingDefine_1 = require("../../FishingDefine");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardTipsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Id = 0;
    this.StarLayout = undefined;
    this.$pt = undefined;
    this.SellClick = undefined;
    this.LockState = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [6, UE.UIItem], [10, UE.UIItem], [11, UE.UIText], [12, UE.UITexture], [13, UE.UIText]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.StarLayout = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetLayoutBase(5));
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(0)?.SetUIActive(true);
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  BGt(e, i) {
    this.GetLayoutBase(5).RootUIComp.SetUIActive(e);
    if (e) {
      this.StarLayout.RebuildLayout(i);
    }
  }
  YYl(e, i, t) {
    this.GetItem(7).SetUIActive(e);
    if (e) {
      this.GetText(9).SetText(i + "cm");
      i = this.GetTexture(8);
      t = DockyardPanelUtil_1.DockyardPanelUtil.GetTexturePathByCup(t);
      const e = !StringUtils_1.StringUtils.IsBlank(t);
      i.SetUIActive(e);
      if (e) {
        this.SetTextureByPath(t, i);
      }
    }
  }
  iFi(e) {
    var i = e > 0;
    this.GetItem(10).SetUIActive(i);
    if (i) {
      this.GetText(11).SetText(e.toString());
    }
    this.SetItemIcon(this.GetTexture(12), FishingDefine_1.FISHING_CURRENCY_ITEMID);
  }
  Refresh(e) {
    this.Id = e.IncId;
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e.ItemId);
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTagConfig(i.Tech[0]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), i.Desc);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Name);
    var t = UE.Color.FromHex(t.Color);
    this.GetSprite(4).SetColor(t);
    var t = i.Type === 1;
    this.BGt(t, e.Quality);
    this.YYl(t, e.Size, e.Cup);
    this.iFi(e.Price);
  }
  SetPanelVisible(e, i = true) {
    if (!this.LockState) {
      if (e) {
        this.yQ_(i);
      } else {
        this.SQ_(i);
      }
    }
  }
  yQ_(e = true) {
    if (e) {
      this.$pt.StopCurrentSequenceByName("Hide", false, true);
      this.$pt.PlaySequencePurely("Show");
    }
    this.GetItem(0).SetUIActive(true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingDockyardItemTipsShown, true);
  }
  SQ_(e = true) {
    if (e) {
      this.$pt.StopCurrentSequenceByName("Show", false, true);
      this.$pt.PlaySequencePurely("Hide");
    }
    this.GetItem(0).SetUIActive(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingDockyardItemTipsShown, false);
  }
}
exports.DockyardTipsPanel = DockyardTipsPanel;
//# sourceMappingURL=DockyardTipsPanel.js.map