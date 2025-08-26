"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBtnTagTips = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TrapDefenseBtnTagTips extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateQuality(e) {
    var t = this.GetSprite(2);
    switch (e) {
      case 4:
        this.XHc(1);
        t.SetChangeColor(true, t.changeColor);
        break;
      case 5:
        this.XHc(0);
        t.SetChangeColor(false, t.changeColor);
        break;
      default:
        this.XHc(1);
        t.SetChangeColor(true, t.changeColor);
    }
  }
  UpdateDescForBuffSelect(e) {
    switch (e) {
      case 4:
        this.SetDesc("TrapDefense_BdBuffSelect_PurpleBuffToPool");
        break;
      case 5:
        this.SetDesc("TrapDefense_BdBuffSelect_GoldBuffToPool");
        break;
      default:
        this.SetDesc("TrapDefense_BdBuffSelect_PurpleBuffToPool");
    }
  }
  XHc(t) {
    [1, 0].forEach(e => {
      this.GetItem(e)?.SetUIActive(e === t);
    });
  }
  SetDesc(e, ...t) {
    var s = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, e, ...t);
  }
}
exports.TrapDefenseBtnTagTips = TrapDefenseBtnTagTips;
//# sourceMappingURL=TrapDefenseBtnTagTips.js.map