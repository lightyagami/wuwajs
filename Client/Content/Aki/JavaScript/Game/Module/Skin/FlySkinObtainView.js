"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinObtainView = exports.FlySkinObtainViewData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class FlySkinObtainViewData {
  constructor() {
    this.ObtainFlySkinData = undefined;
    this.OtherRewardData = undefined;
  }
}
exports.FlySkinObtainViewData = FlySkinObtainViewData;
class FlySkinObtainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.T31 = undefined;
    this.Hyl = undefined;
    this.s4e = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.L3e = () => {
      BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "OpenRoleSkinView");
      this.CloseMe(() => {
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList()[0];
        ControllerHolder_1.ControllerHolder.SkinController.SkipToSkinView(e, "FlySkinTabView", true, -1, () => {
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "OpenRoleSkinView");
        }, this.T31?.GetItemId());
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.SpineSkeletonAnimationComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIText]];
    this.BtnBindInfo = [[0, this.Awe], [6, this.L3e]];
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.W2e);
    var e = this.OpenParam;
    for (const s of e.ObtainFlySkinData) {
      var i = ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(s.ConfigId);
      if (i?.GetFlySkinConfig().SkinType === 1) {
        this.T31 = i;
        break;
      }
    }
    e = e.OtherRewardData;
    if (e) {
      this.Hyl = [];
      for (const o of e) {
        var t = {
          IncId: 0,
          ItemId: o.ConfigId
        };
        let e = 0;
        var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(o.ConfigId);
        var t = [t, e = r === 5 ? o.Count : e];
        this.Hyl.push(t);
      }
    }
  }
  OnBeforeShow() {
    var e;
    if (this.T31) {
      this.GetSpine(1).SetActive(false);
      this.GetButton(7)?.RootUIComp.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.T31.GetTitleName());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.T31.GetSubTitle());
      this.SetTextureByPath(this.T31.GetTextureInSkinObtainView(), this.GetTexture(10));
      e = this.T31.GetObtainFrameColor1();
      this.GetTexture(8).SetColor(UE.Color.FromHex(e));
      e = this.T31.GetObtainFrameColor2();
      this.GetTexture(9).SetColor(UE.Color.FromHex(e));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "ObtainFlySkin");
      this.v4e();
    }
  }
  v4e() {
    var e;
    if (this.Hyl) {
      e = this.Hyl;
      this.GetItem(11)?.SetUIActive(e.length !== 0);
      this.s4e?.RefreshByData(e);
    } else {
      this.GetItem(11)?.SetUIActive(false);
    }
  }
}
exports.FlySkinObtainView = FlySkinObtainView;
//# sourceMappingURL=FlySkinObtainView.js.map