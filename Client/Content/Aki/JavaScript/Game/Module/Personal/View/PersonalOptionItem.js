"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalOptionItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PersonalTipsById_1 = require("../../../../Core/Define/ConfigQuery/PersonalTipsById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const PersonalOptionController_1 = require("../Model/PersonalOptionController");
class PersonalOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(r) {
    super();
    this.LVi = 0;
    this.Tbt = undefined;
    this.jbe = r => {
      this.Tbt = PersonalOptionController_1.PersonalOptionController.GetOptionFunc(this.LVi);
      this.Tbt();
    };
    if (r) {
      this.CreateThenShowByActor(r.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISpriteTransition], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  Refresh(r, e, o) {
    this.LVi = r;
    var t;
    var r = PersonalTipsById_1.configPersonalTipsById.GetConfig(this.LVi);
    if (r) {
      this.GetText(1).ShowTextNew(r.Description);
      t = this.GetUiSpriteTransition(2);
      this.SetSpriteTransitionByPath(r.IconPath, t);
      if (r.RedDotName !== StringUtils_1.EMPTY_STRING) {
        RedDotController_1.RedDotController.BindRedDot(r.RedDotName, this.GetItem(3));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "个性化弹窗配置找不到,id为", ["config!.Id", r.Id]);
    }
  }
  OnBeforeDestroy() {
    var r = PersonalTipsById_1.configPersonalTipsById.GetConfig(this.LVi);
    if (r) {
      if (r.RedDotName !== StringUtils_1.EMPTY_STRING) {
        RedDotController_1.RedDotController.UnBindGivenUi(r.RedDotName, this.GetItem(3));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "个性化弹窗配置找不到,id为", ["config!.Id", r.Id]);
    }
  }
}
exports.PersonalOptionItem = PersonalOptionItem;
//# sourceMappingURL=PersonalOptionItem.js.map