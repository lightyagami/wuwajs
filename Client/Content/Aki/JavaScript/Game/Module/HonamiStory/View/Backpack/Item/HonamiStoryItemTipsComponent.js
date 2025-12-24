"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemTipsComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const HonamiStoryTipsPropertyItem_1 = require("./HonamiStoryTipsPropertyItem");
class HonamiStoryItemTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Ihm = undefined;
    this.jlo = undefined;
    this.vId = () => new HonamiStoryTipsPropertyItem_1.HonamiStoryTipsPropertyItem();
    this.yId = () => new HonamiStoryTipsPropertyItem_1.HonamiStoryTipsTextItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIExtendToggle], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIVerticalLayout], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UITexture], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(14).SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
    this.GetItem(17).SetUIActive(false);
    this.GetItem(18).SetUIActive(false);
    this.GetItem(20).SetUIActive(false);
    this.GetItem(21).SetUIActive(false);
    this.GetExtendToggle(6).RootUIComp.SetUIActive(false);
    this.GetItem(24)?.SetUIActive(false);
    this.GetItem(23)?.SetUIActive(false);
    this.Ihm = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.vId);
    this.jlo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(11), this.yId);
    this.GetRootItem().SetPivot(new UE.Vector2D(0.5, 0.5));
    this.GetRootItem().SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  OnBeforeShow() {
    this.bco();
  }
  bco() {
    this.SPe?.PlaySequencePurely("Start");
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  Refresh(e) {
    var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryItem(e.ConfigId);
    if (i) {
      var t = i.Name;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
      var t = i.AttributesDescription;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), t);
      this.GetItem(7).SetUIActive(false);
      var t = i.ItemType === 1 ? "SP_TipsTypeIcon1" : "SP_TipsTypeIcon2";
      var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetSpriteByPath(t, this.GetSprite(2), false);
      var t = HonamiStoryDefine_1.honamiItemTypeMap.get(i.ItemType) ?? "";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t);
      var t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryQuality(i.QualityId);
      this.SetSpriteByPath(t.Bg, this.GetSprite(1), false);
      this.GetText(5).SetText("" + i.SellPrice);
      this.SetItemIcon(this.GetTexture(22), i.Id);
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(e.IncId);
      if (t && t.GetItemType() !== 2) {
        i = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(e.IncId);
        if (i) {
          var r = [];
          for (const s of i.GetMainPropList()) {
            r.push({
              PropId: s
            });
          }
          this.Ihm.RefreshByData(r, undefined, true);
          t = i.GetBuffTempIdList();
          this.jlo.RefreshByData(t, undefined, true);
        }
      }
    }
  }
}
exports.HonamiStoryItemTipsComponent = HonamiStoryItemTipsComponent;
//# sourceMappingURL=HonamiStoryItemTipsComponent.js.map