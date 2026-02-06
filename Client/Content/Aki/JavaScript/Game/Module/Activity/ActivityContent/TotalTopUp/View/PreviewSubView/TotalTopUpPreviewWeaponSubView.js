"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPreviewWeaponSubView = undefined;
const UE = require("ue");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const WeaponTrialData_1 = require("../../../../../Weapon/Data/WeaponTrialData");
const TotalTopUpDefine_1 = require("../../TotalTopUpDefine");
const TotalTopUpPreviewSubViewBase_1 = require("./TotalTopUpPreviewSubViewBase");
class TotalTopUpPreviewWeaponSubView extends TotalTopUpPreviewSubViewBase_1.TotalTopUpPreviewSubViewBase {
  constructor() {
    super(...arguments);
    this.hkg = [];
    this._nd = () => {
      var e = [];
      for (const o of this.hkg) {
        var a = new WeaponTrialData_1.WeaponTrialData();
        a.SetTrialId(o);
        e.push(a);
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("预览武器试用ID", ["TrialId", o]);
      }
      var i = {
        WeaponDataList: e,
        SelectedIndex: 0
      };
      UiManager_1.UiManager.OpenView("WeaponPreviewView", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this._nd]];
  }
  ShowPreview(e) {
    if (e && e.RewardData?.TotalTopUpWeaponPackageData) {
      this.hkg = [...e.RewardData.TotalTopUpWeaponPackageData.WeaponTrialIdList];
    }
  }
}
exports.TotalTopUpPreviewWeaponSubView = TotalTopUpPreviewWeaponSubView;
//# sourceMappingURL=TotalTopUpPreviewWeaponSubView.js.map