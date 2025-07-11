"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalOptionItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PersonalTipsById_1 = require("../../../../Core/Define/ConfigQuery/PersonalTipsById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const PersonalOptionController_1 = require("../Model/PersonalOptionController");
class PersonalOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super();
    this.LVi = 0;
    this.Tbt = undefined;
    this.jbe = e => {
      this.Tbt = PersonalOptionController_1.PersonalOptionController.GetOptionFunc(this.LVi);
      this.Tbt();
    };
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISpriteTransition], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  Refresh(e, r, o) {
    this.LVi = e;
    e = PersonalTipsById_1.configPersonalTipsById.GetConfig(this.LVi);
    if (e) {
      this.GetText(1).ShowTextNew(e.Description);
      const t = this.GetUiSpriteTransition(2);
      ResourceSystem_1.ResourceSystem.LoadAsync(e.IconPath, UE.LGUISpriteData_BaseObject, (e, r) => {
        if (e.IsValid() && t.IsValid()) {
          t.SetAllTransitionSprite(e);
        }
      });
      if (e.RedDotName !== StringUtils_1.EMPTY_STRING) {
        RedDotController_1.RedDotController.BindRedDot(e.RedDotName, this.GetItem(3));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "个性化弹窗配置找不到,id为", ["config!.Id", e.Id]);
    }
  }
  OnBeforeDestroy() {
    var e = PersonalTipsById_1.configPersonalTipsById.GetConfig(this.LVi);
    if (e) {
      if (e.RedDotName !== StringUtils_1.EMPTY_STRING) {
        RedDotController_1.RedDotController.UnBindGivenUi(e.RedDotName, this.GetItem(3));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "个性化弹窗配置找不到,id为", ["config!.Id", e.Id]);
    }
  }
}
exports.PersonalOptionItem = PersonalOptionItem;
//# sourceMappingURL=PersonalOptionItem.js.map