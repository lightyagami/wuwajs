"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDayProgressItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchDayProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Tot = undefined;
    this.blu = () => {
      return new PointItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIHorizontalLayout], [3, UE.UIItem]];
  }
  OnStart() {
    this.Tot = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.blu, this.GetItem(3).GetOwner());
  }
  RefreshDay(t, s) {
    var i = [];
    for (let e = 1; e <= s; e++) {
      i.push({
        DayIndex: e,
        IsPassed: e < s - t + 1
      });
    }
    this.Tot?.RefreshByData(i, () => {
      var e = 100 / (s - 1) * (t - 1) / 100;
      this.GetSprite(1)?.SetFillAmount(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Farm_DayLast", t);
    });
  }
}
exports.FloroRanchDayProgressItem = FloroRanchDayProgressItem;
class PointItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.xjc = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, t, s) {
    this.GetSprite(0)?.SetUIActive(!e.IsPassed);
    if (!this.xjc && e.IsPassed) {
      this.ShowPassAnim();
    }
    this.xjc = e.IsPassed;
  }
  ShowPassAnim() {
    this.SPe ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SPe.PlayLevelSequenceByName("DayGone");
  }
}
//# sourceMappingURL=FloroRanchDayProgressItem.js.map