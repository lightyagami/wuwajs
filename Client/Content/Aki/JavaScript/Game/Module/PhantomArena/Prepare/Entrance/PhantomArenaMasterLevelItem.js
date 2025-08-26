"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterLevelItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class MasterLevelItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.CallbackOnSelect = undefined;
    this.SPe = undefined;
    this.Ynu = () => {
      if (this.CallbackOnSelect && this.Pe) {
        this.CallbackOnSelect(this.Pe.Level, this);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIButtonComponent], [6, UE.UITexture], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UITexture], [13, UE.UITexture], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UIItem]];
    this.BtnBindInfo = [[5, this.Ynu]];
  }
  OnRefreshItem(e) {
    if (e) {
      this.Pe = e;
      this.SPe ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.bl(e);
    }
  }
  bl(e) {
    var t = e.Level;
    var s = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelMax();
    this.GetText(10).SetText(t.toString());
    this.GetText(11).SetText(t.toString());
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevel();
    var i = i < t;
    this.GetSprite(3).SetUIActive(!i);
    this.GetText(10).SetUIActive(!i);
    this.GetText(11).SetUIActive(i);
    this.GetTexture(15).SetUIActive(!i);
    this.GetTexture(8).SetUIActive(!i);
    this.GetTexture(7).SetIsGray(i);
    this.GetItem(14).SetUIActive(!i);
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardList(t);
    var i = i.length === 0;
    var h = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardIfTaken(t);
    var r = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardCanTake(t);
    this.GetItem(16).SetUIActive(!h && r && !i);
    this.GetSprite(1).SetUIActive(t < s);
    this.GetSprite(2).SetUIActive(t < s);
    if (!e.IsMax) {
      h = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterExpNow();
      this.GetSprite(2).SetFillAmount((h - e.ExpLevel) / e.ExpNext);
    }
  }
  OnSelect() {
    this.Ynu();
  }
  OnUnSelect() {}
  OnMoveItem() {
    var e = this.GetCurrentMovePercentage();
    var t = MasterLevelItem.ScaleCurve.GetFloatValue(e);
    this.GetItem(0).SetUIItemScale(new UE.Vector(t, t, 1));
    this.GetItem(16)?.SetUIItemScale(new UE.Vector(1 / t, 1 / t, 1));
    var t = MasterLevelItem.AlphaCurve.GetFloatValue(e);
    this.GetItem(14).SetAlpha(t);
  }
}
(exports.MasterLevelItem = MasterLevelItem).ScaleCurve = undefined;
MasterLevelItem.AlphaCurve = undefined; //# sourceMappingURL=PhantomArenaMasterLevelItem.js.map