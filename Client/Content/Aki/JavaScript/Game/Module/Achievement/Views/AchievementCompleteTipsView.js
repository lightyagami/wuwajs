"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementCompleteTipsView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const AchievementCompleteTipsStarItem_1 = require("./AchievementCompleteTipsStarItem");
const CLOSE_TIME = 4000;
class AchievementCompleteTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.$be = undefined;
    this.Ybe = 0;
    this.vNi = false;
    this.zbe = () => new AchievementCompleteTipsStarItem_1.AchievementCompleteTipsStarItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem]];
  }
  OnStart() {
    var e;
    var i = this.OpenParam;
    if (i !== undefined) {
      this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.zbe);
      e = i.GetGroupId();
      e = ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(e);
      if (!StringUtils_1.StringUtils.IsEmpty(e.GetTexture())) {
        this.SetTextureByPath(e.GetTexture(), this.GetTexture(0));
      }
      this.GetText(1).SetText(i.GetTitle());
      this.Zbe(i);
    }
  }
  OnTick(e) {
    if (!this.vNi) {
      this.Ybe += e;
      if (this.Ybe >= CLOSE_TIME) {
        this.vNi = true;
        this.CloseMe();
      }
    }
  }
  Zbe(e) {
    var i = [];
    var t = e.GetMaxStar();
    var s = e.GetAchievementConfigStar();
    for (let e = 0; e < t; e++) {
      var r = s > e;
      i.push(r);
    }
    this.$be.RefreshByData(i);
  }
}
exports.AchievementCompleteTipsView = AchievementCompleteTipsView;
//# sourceMappingURL=AchievementCompleteTipsView.js.map