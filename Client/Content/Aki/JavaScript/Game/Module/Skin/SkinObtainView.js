"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinObtainView = exports.SkinObtainViewData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class SkinObtainViewData {
  constructor() {
    this.ObtainSkinData = undefined;
    this.OtherRewardData = undefined;
  }
}
exports.SkinObtainViewData = SkinObtainViewData;
class SkinObtainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Vyl = undefined;
    this.Hyl = undefined;
    this.s4e = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.L3e = () => {
      let e = this.Vyl.GetRoleId();
      let i = this.Vyl.GetIfHaveRole();
      var t;
      if (ModelManager_1.ModelManager.RoleModel.IsMainRole(e)) {
        e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
        i = true;
      }
      if (i) {
        BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "OpenRoleSkinView");
        this.CloseMe(() => {
          ControllerHolder_1.ControllerHolder.SkinController.SkipToSkinView(e, "RoleSkinTabView", true, this.Vyl.GetItemId(), () => {
            BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "OpenRoleSkinView");
          });
        });
      } else {
        t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(233);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(t);
      }
    };
    this.JWi = () => {
      var e = {
        ScreenShot: false,
        IsHiddenBattleView: false,
        HandBookPhotoData: undefined,
        RoleSkinData: this.Vyl
      };
      UiManager_1.UiManager.OpenView("PhotoSaveView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.SpineSkeletonAnimationComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UITexture], [11, UE.UIItem], [12, UE.UIText]];
    this.BtnBindInfo = [[0, this.Awe], [6, this.L3e], [7, this.JWi]];
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.W2e);
    var e = this.OpenParam;
    var i = e.ObtainSkinData[0].ConfigId;
    this.Vyl = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i);
    var i = e.OtherRewardData;
    if (i) {
      this.Hyl = [];
      for (const r of i) {
        var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(r.ConfigId);
        if (t !== 10) {
          let e = 0;
          t = [{
            IncId: 0,
            ItemId: r.ConfigId
          }, e = t === 5 ? r.Count : e];
          this.Hyl.push(t);
        }
      }
    }
  }
  OnBeforeShow() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "ObtainRoleSkin");
    this.Og();
  }
  OnBeforeHide() {}
  Og() {
    this.P5e(this.Vyl);
    this.jyl(this.Vyl);
    this.v4e(this.Vyl);
    this.P3l(this.Vyl);
    this.Wyl(this.Vyl);
    this.Qyl(this.Vyl);
  }
  P5e(e) {
    if (e) {
      e = e.GetTitleName();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
    } else {
      this.GetText(2).SetText("");
    }
  }
  jyl(e) {
    if (e) {
      e = e.GetSubTitle();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
    } else {
      this.GetText(3).SetText("");
    }
  }
  v4e(e) {
    var i;
    if (this.Hyl) {
      i = this.Hyl;
      this.s4e?.SetActive(i.length !== 0);
      this.s4e?.RefreshByData(i);
    } else {
      this.s4e?.SetActive(false);
    }
  }
  async P3l(e) {
    var i;
    if (e) {
      i = e.GetSmallSpineAtlas();
      e = e.GetSpineSkeletonData();
      await this.SetSpineAssetByPath(i, e, this.GetSpine(1));
      this.GetSpine(1).SetAnimation(0, "idle", true);
    }
  }
  Wyl(e) {
    if (e) {
      this.GetTexture(8).SetUIActive(true);
      e = e.GetObtainFrameColor1();
      e = UE.Color.FromHex(e);
      this.GetTexture(8).SetColor(e);
    } else {
      this.GetTexture(8).SetUIActive(false);
    }
  }
  Qyl(e) {
    if (e) {
      this.GetTexture(9).SetUIActive(true);
      e = e.GetObtainFrameColor2();
      e = UE.Color.FromHex(e);
      this.GetTexture(9).SetColor(e);
    } else {
      this.GetTexture(9).SetUIActive(false);
    }
  }
}
exports.SkinObtainView = SkinObtainView;
//# sourceMappingURL=SkinObtainView.js.map