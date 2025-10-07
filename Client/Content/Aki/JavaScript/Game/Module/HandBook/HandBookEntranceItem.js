"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookEntranceItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
const HandBookController_1 = require("./HandBookController");
class HandBookEntranceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Bei = undefined;
    this.Lxt = () => {
      switch (this.Bei.Id) {
        case 0:
          UiManager_1.UiManager.OpenView("MonsterHandBookView");
          break;
        case 1:
          UiManager_1.UiManager.OpenView("PhantomHandBookView");
          break;
        case 2:
          UiManager_1.UiManager.OpenView("GeographyHandBookView");
          break;
        case 3:
          UiManager_1.UiManager.OpenView("WeaponHandBookView");
          break;
        case 4:
          UiManager_1.UiManager.OpenView("AnimalHandBookView");
          break;
        case 5:
          UiManager_1.UiManager.OpenView("ItemHandBookView");
          break;
        case 6:
          UiManager_1.UiManager.OpenView("ChipHandBookView");
          break;
        case 7:
          UiManager_1.UiManager.OpenView("QuestHandBookView");
          break;
        case 10:
          UiManager_1.UiManager.OpenView("HandBookRoleView");
          break;
        case 11:
          UiManager_1.UiManager.OpenView("NounHandBookView");
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("HandBook", 5, "没有找到图鉴入口类型，请检查", ["this.HandBookEntrance.Id", this.Bei.Id]);
          }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[3, this.Lxt]];
  }
  OnStart() {}
  Refresh(e, a, r) {
    this.Bei = e;
    this.GetText(0).ShowTextNew(this.Bei.Name);
    this.SetTextureByPath(e.Texture, this.GetTexture(1));
    this.RefreshRedDot();
    this.RefreshCollectProgress();
  }
  RefreshRedDot() {
    var e;
    var a;
    if (this.Bei && (e = ModelManager_1.ModelManager.HandBookModel.IsShowRedDot(this.Bei.Id), a = this.GetItem(4))) {
      a.SetUIActive(e);
    }
  }
  RefreshCollectProgress() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(this.Bei.Id);
    if (this.Bei.Id === 3) {
      this.GetText(5)?.SetText(e[0].toString());
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "CollectProgress", e[0], e[1]);
    }
  }
}
exports.HandBookEntranceItem = HandBookEntranceItem;
//# sourceMappingURL=HandBookEntranceItem.js.map