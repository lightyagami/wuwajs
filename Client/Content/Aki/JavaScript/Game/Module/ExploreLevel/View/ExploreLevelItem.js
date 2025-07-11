"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreLevelItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.cVt = undefined;
    this.mVt = undefined;
    this.dVt = () => {
      var e = this.cVt.GetAreaConfig();
      var i = e.DeliveryMarkType;
      var e = e.DeliveryMarkId;
      if (i === 1 && !(e <= 0)) {
        SkipTaskManager_1.SkipTaskManager.Run(0, i.toString(), e.toString());
      }
    };
    this.CVt = () => {
      if (this.mVt) {
        this.mVt(this.cVt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UISprite]];
    this.BtnBindInfo = [[4, this.dVt], [5, this.CVt]];
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  OnBeforeDestroy() {
    this.cVt = undefined;
    this.mVt = undefined;
  }
  Refresh(e, i, t) {
    this.cVt = e;
    this.SetTextureByPath(ModelManager_1.ModelManager.ExploreLevelModel.ExploreScoreItemTexturePath, this.GetTexture(0));
    var s = e.GetAreaNameTextId();
    var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s);
    var r = e.Progress;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "AreaExploreProgress", s, r);
    var s = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e.AreaId);
    if (s) {
      r = s.GetProgress();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CurrentAreaExploreProgress", r);
      this.GetText(3).SetText(e.Score.toString());
      s = e.GetIsReceived();
      r = e.CanReceive();
      if (s) {
        this.GetSprite(6).SetUIActive(true);
        this.SetButtonUiActive(4, false);
        this.SetButtonUiActive(5, false);
      } else if (r) {
        this.GetSprite(6).SetUIActive(false);
        this.SetButtonUiActive(4, false);
        this.SetButtonUiActive(5, true);
      } else {
        this.GetSprite(6).SetUIActive(false);
        this.SetButtonUiActive(4, true);
        this.SetButtonUiActive(5, false);
      }
    }
  }
  BindOnClickedReceiveButton(e) {
    this.mVt = e;
  }
  GetKey(e, i) {
    return this.GridIndex;
  }
}
exports.ExploreLevelItem = ExploreLevelItem;
//# sourceMappingURL=ExploreLevelItem.js.map