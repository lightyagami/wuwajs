"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryRoleInfoPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryEquipItemInfoItem_1 = require("./HonamiStoryEquipItemInfoItem");
class HonamiStoryRoleInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this._1m = undefined;
    this.u1m = () => new HonamiStoryEquipItemInfoItem_1.HonamiStoryEquipItemInfoItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this._1m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.u1m);
  }
  SetData(e) {
    this.dFe = e;
    this.c1m();
  }
  c1m() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleEquipDataByRoleId(this.dFe);
    if (e) {
      var i;
      var t = [];
      for (const o of e.GetEquipRoleItemList()) {
        if (HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(this.dFe, o.GetRoleId()) && (i = o.GetBuffTempIdList(true)).length > 0) {
          t.push(i[0]);
        }
      }
      e = t.length > 0;
      if (e) {
        this._1m?.RefreshByData(t);
      }
      this._1m?.SetActive(e);
      this.GetItem(5).SetUIActive(e);
    } else {
      this._1m?.SetActive(false);
      this.GetItem(5).SetUIActive(false);
    }
  }
  RefreshSkillInfo(e, i, t, o) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i, ...o);
    this.GetText(0)?.SetText(t);
    this._1m?.RefreshWithoutDataSync();
  }
}
exports.HonamiStoryRoleInfoPanel = HonamiStoryRoleInfoPanel;
//# sourceMappingURL=HonamiStoryRoleInfoPanel.js.map