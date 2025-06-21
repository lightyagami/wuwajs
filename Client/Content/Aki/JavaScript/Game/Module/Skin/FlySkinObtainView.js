"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FlySkinObtainView = exports.FlySkinObtainViewData = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil");
class FlySkinObtainViewData {
  constructor() {
    this.ObtainFlySkinData = void 0, this.OtherRewardData = void 0
  }
}
exports.FlySkinObtainViewData = FlySkinObtainViewData;
class FlySkinObtainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.QN1 = void 0, this.Hyl = void 0, this.s4e = void 0, this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid
    }, this.Awe = () => {
      this.CloseMe()
    }, this.L3e = () => {
      BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "OpenRoleSkinView"), this.CloseMe(() => {
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList()[0];
        ControllerHolder_1.ControllerHolder.SkinController.SkipToSkinView(e, "FlySkinTabView", !0, -1, () => {
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "OpenRoleSkinView")
        }, this.QN1?.GetItemId())
      })
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.SpineSkeletonAnimationComponent],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UITexture],
      [11, UE.UIItem],
      [12, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.Awe],
      [6, this.L3e]
    ]
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.W2e);
    var e = this.OpenParam;
    for (const s of e.ObtainFlySkinData) {
      var i = ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(s.ConfigId);
      if (1 === i?.GetFlySkinConfig().SkinType) {
        this.QN1 = i;
        break
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
        var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(o.ConfigId),
          t = [t, e = 5 === r ? o.Count : e];
        this.Hyl.push(t)
      }
    }
  }
  OnBeforeShow() {
    var e;
    this.QN1 && (this.GetSpine(1).SetActive(!1), this.GetButton(7)?.RootUIComp.SetUIActive(!1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.QN1.GetTitleName()), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.QN1.GetSubTitle()), this.SetTextureByPath(this.QN1.GetTextureInSkinObtainView(), this.GetTexture(10)), e = this.QN1.GetObtainFrameColor1(), this.GetTexture(8).SetColor(UE.Color.FromHex(e)), e = this.QN1.GetObtainFrameColor2(), this.GetTexture(9).SetColor(UE.Color.FromHex(e)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "ObtainFlySkin"), this.v4e())
  }
  v4e() {
    var e;
    this.Hyl ? (e = this.Hyl, this.GetItem(11)?.SetUIActive(0 !== e.length), this.s4e?.RefreshByData(e)) : this.GetItem(11)?.SetUIActive(!1)
  }
}
exports.FlySkinObtainView = FlySkinObtainView;
//# sourceMappingURL=FlySkinObtainView.js.map