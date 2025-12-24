"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLimitTaskProItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const HonamiStoryLimitTaskScoreItem_1 = require("./HonamiStoryLimitTaskScoreItem");
const FIRST_OFFSET = 410;
class HonamiStoryLimitTaskProItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ZGl = undefined;
    this.OnClickToGet = undefined;
    this.kim = () => {
      var e = new HonamiStoryLimitTaskScoreItem_1.HonamiStoryLimitTaskScoreItem();
      e.OnClickToGet = this.OnClickToGet;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIHorizontalLayout], [3, UE.UIItem]];
  }
  OnStart() {
    this.ZGl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.kim, this.GetItem(3).GetOwner());
  }
  async RefreshAsync(i, s) {
    this.GetText(0).SetText(i.toString());
    var r = s.length;
    var e = this.GetSprite(1).GetWidth();
    var e = FIRST_OFFSET / e;
    var o = (1 - e) / r;
    var e = e + o;
    var a = s[0].Score;
    let n = 0;
    if (i <= a) {
      n = i / a * e;
    } else {
      n = e;
      let t = a;
      for (let e = 1; e < r; e++) {
        if (!(i >= s[e].Score)) {
          var m = s[e].Score;
          var m = (i - t) / (m - t);
          n += o * m;
          break;
        }
        n += o;
        t = s[e].Score;
      }
    }
    this.GetSprite(1).SetFillAmount(n);
    await this.ZGl.RefreshByDataAsync(s);
  }
}
exports.HonamiStoryLimitTaskProItem = HonamiStoryLimitTaskProItem;
//# sourceMappingURL=HonamiStoryLimitTaskProItem.js.map