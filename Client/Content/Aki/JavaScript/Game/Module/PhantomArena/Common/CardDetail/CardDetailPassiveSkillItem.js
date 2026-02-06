"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailPassiveSkillItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CardDetailPassiveSkillItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [4, UE.UISprite], [3, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
  }
  _Fe(t) {
    var i;
    if (!t || StringUtils_1.StringUtils.IsBlank(t.ConditionDesc)) {
      this.GetItem(1).SetUIActive(false);
    } else {
      this.GetItem(1).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.ConditionDesc, t.CurrentProgress, t.MaxProgress);
      i = this.GetText(5);
      if (!StringUtils_1.StringUtils.IsBlank(t.Title)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Title);
      }
      i.SetChangeColor(!!t.TitleChangeColor, i.changeColor);
    }
  }
  Nqe(t) {
    var i;
    var e = this.GetText(3);
    if (t && t.MaxProgress !== 0) {
      e.SetUIActive(true);
      if (!StringUtils_1.StringUtils.IsBlank(t.Icon)) {
        this.SetSpriteByPath(t.Icon, this.GetSprite(4), true);
      }
      i = t.CurrentProgress >= t.MaxProgress ? "PhantomBattle_1163" : "PhantomBattle_1162";
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i, t.CurrentProgress, t.MaxProgress);
    } else {
      e.SetUIActive(false);
    }
  }
  lXm(t) {
    if (t) {
      this.GetItem(1).SetUIActive(false);
      this.GetSprite(4).SetUIActive(false);
      this.GetText(3).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TextArg.TextKey, ...t.TextArg.Params);
    }
  }
  _Xm(t) {
    this._Fe(t);
    this.Nqe(t);
  }
  XNm(t) {
    this.GetItem(6).SetUIActive(t !== undefined);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "PhantomBattle_1161", t.CurrentEffectCount, t.TotalEffectCount);
    }
  }
  Refresh(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Desc, ...t.Params);
    this._Xm(t.FieldData?.OutData);
    this.lXm(t.FieldData?.InData);
    this.XNm(t.EffectCountData);
  }
}
exports.CardDetailPassiveSkillItem = CardDetailPassiveSkillItem;
//# sourceMappingURL=CardDetailPassiveSkillItem.js.map