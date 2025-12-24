"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeNewRoleTabView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AdvanceNoticeNewRoleDetailItem_1 = require("./AdvanceNoticeNewRoleDetailItem");
const AdvanceNoticeTabViewBase_1 = require("./AdvanceNoticeTabViewBase");
class AdvanceNoticeNewRoleTabView extends AdvanceNoticeTabViewBase_1.AdvanceNoticeTabViewBase {
  constructor() {
    super(...arguments);
    this.Ept = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UINiagara], [10, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    this.Ept = new AdvanceNoticeNewRoleDetailItem_1.AdvanceNoticeNewRoleDetailItem();
    await this.Ept.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  RefreshView() {
    var e = this.ViewModel.CurrentSubTabId;
    var i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabCharacterById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.GetWayTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.GetWayDescription);
    var t = this.GetTexture(0);
    var s = this.GetTexture(7);
    var a = this.GetTexture(8);
    var r = this.GetUiNiagara(9);
    var o = this.GetUiNiagara(10);
    if (i.Type === 1) {
      s.SetUIActive(false);
      a.SetUIActive(false);
      t.SetUIActive(true);
      r.SetUIActive(false);
      o.SetUIActive(false);
      this.ftg(i.MainBgPic, t);
    } else {
      s.SetUIActive(true);
      a.SetUIActive(true);
      t.SetUIActive(true);
      this.ftg(i.MainPic, s);
      this.ftg(i.MainBgPic, t);
      this.ftg(i.MainPic, a);
      s = i.QualityId;
      r.SetUIActive(s === 4);
      o.SetUIActive(s === 5);
    }
    this.Ept.Refresh(e);
  }
  ftg(e, i) {
    if (!StringUtils_1.StringUtils.IsBlank(e)) {
      this.SetTextureByPath(e, i);
    }
  }
}
exports.AdvanceNoticeNewRoleTabView = AdvanceNoticeNewRoleTabView;
//# sourceMappingURL=AdvanceNoticeNewRoleTabView.js.map