"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponSuitInfoItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const HonamiStoryWeaponSuitActiveItem_1 = require("./HonamiStoryWeaponSuitActiveItem");
class HonamiStoryWeaponSuitInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.nzd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIText]];
  }
  OnStart() {
    var t = {
      UiText: this.GetText(1),
      ViewType: 0,
      ReportType: 11
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  async OnBeforeStartAsync() {
    this.nzd = new HonamiStoryWeaponSuitActiveItem_1.HonamiStoryWeaponSuitActiveItem();
    await this.nzd.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
  }
  Refresh(t, e, i) {
    var r = t.SuitId;
    var o = t.EquipData?.IsSuitActivate(r);
    var r = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponSuitData(r);
    var s = !!o && o.IsActive;
    this.GetText(6).SetText(`(${o?.CurCount}/${o?.NeedCount})`);
    this.GetText(6).SetChangeColor(s, this.GetText(6).changeColor);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r.Name);
    this.GetText(0).SetChangeColor(s, this.GetText(0).changeColor);
    var o = ModelManager_1.ModelManager.HonamiStoryModel.GetSkillDescMode();
    var a = o ? r.DescSimple : r.Desc;
    var o = o ? r.ArgsSimple : r.Args;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), a, ...o);
    this.GetText(1).SetChangeColor(s, this.GetText(1).changeColor);
    this.GetSprite(2).SetUIActive(s);
    this.GetSprite(3).SetUIActive(!s);
    this.GetSprite(4).SetUIActive(false);
    this.nzd.Refresh(t);
  }
}
exports.HonamiStoryWeaponSuitInfoItem = HonamiStoryWeaponSuitInfoItem;
//# sourceMappingURL=HonamiStoryWeaponSuitInfoItem.js.map