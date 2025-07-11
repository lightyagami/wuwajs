"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTagDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleTagDetailItem_1 = require("./RoleTagDetailItem");
class RoleTagDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Klo = undefined;
    this.bdo = undefined;
    this.qdo = () => new RoleTagDetailItem_1.RoleTagDetailItem();
    this.Obt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIVerticalLayout], [3, UE.UIItem]];
  }
  OnStart() {
    var e = this.OpenParam;
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleTagDetailView无效tagList");
      }
    } else {
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.lqe.SetCloseCallBack(this.Obt);
      this.Klo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.qdo, this.GetItem(3).GetOwner());
      this.bdo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.qdo, this.GetItem(3).GetOwner());
      this.Klo.RefreshByData(e);
      e = ConfigManager_1.ConfigManager.RoleConfig.GetAllRoleTagList();
      this.bdo.RefreshByData(e);
    }
  }
}
exports.RoleTagDetailView = RoleTagDetailView;
//# sourceMappingURL=RoleTagDetailView.js.map