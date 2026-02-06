"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureDetailTipItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurnitureDetailTipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FurnitureId = 0;
    this.SPe = undefined;
    this.TipViewCloseDelegate = undefined;
    this.i9i = () => {
      var e;
      var i = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(this.FurnitureId);
      if (i) {
        if ((e = i.SourceType) === 1) {
          ControllerHolder_1.ControllerHolder.FurnitureController.OpenFurnitureShopViewAsync(i.GetWayId);
        } else if (e === 2) {
          if (UiManager_1.UiManager.IsViewOpen("Spring26QuestView")) {
            this.TipViewCloseDelegate?.();
          } else {
            ControllerHolder_1.ControllerHolder.FurnitureController.TryJumpToFurnitureGift(i);
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UISprite], [11, UE.UIText], [12, UE.UISprite], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[7, this.i9i]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  Refresh(e) {
    if (e) {
      this.RefreshByFurnitureId(e.ConfigId, false);
    }
  }
  RefreshByFurnitureId(a, n) {
    this.FurnitureId = a;
    var o = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(a);
    if (o) {
      this.SetTextureByPath(o.Icon, this.GetTexture(2));
      var a = o.TagId;
      var a = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureTagConfig(a);
      if (a) {
        this.SetSpriteByPath(a.OccupiedIcon, this.GetSprite(3), false);
      }
      this.GetText(4).SetText(o.Atmosphere.toString());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), o.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), o.AttributesDescription);
      var a = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureQualityConfig(o.QualityId);
      if (a) {
        this.GetSprite(0).SetColor(UE.Color.FromHex(a.TipBgColor));
        this.GetSprite(1).SetColor(UE.Color.FromHex(a.TipLineColor));
      }
      var a = o.SourceType;
      var u = ModelManager_1.ModelManager.FurnitureModel.GetIsFurnitureUnlockById(o.Id);
      this.GetButton(7).RootUIComp.SetUIActive(!u);
      this.GetItem(13).SetUIActive(!u);
      this.GetItem(14).SetUIActive(u && n);
      this.GetTexture(2).SetAlpha(u ? 1 : 0.5);
      if (!u) {
        this.GetItem(8).SetUIActive(a === 2);
        n = this.GetSprite(10);
        let e = "";
        let i = undefined;
        let t = "";
        let r = false;
        let s = false;
        switch (a) {
          case 2:
            e = "DIY_Furniture_Obtain_PresentState";
            this.SetTextureByPath(o.RoleIconPath, this.GetTexture(9));
            s = true;
            break;
          case 1:
            e = "DIY_Furniture_Obtain_ShopState";
            r = true;
            t = "SP_FuncIconShop";
            s = true;
            break;
          case 3:
            e = "DIY_Dic_AtmoLockedState";
            r = true;
            t = "SP_FurnitureInfoIconEmpty";
            i = [o.GetWayId.toString()];
        }
        n.SetUIActive(r);
        this.GetButton(7)?.RootUIComp.SetRaycastTarget(s);
        this.GetSprite(12)?.SetUIActive(s);
        if (r) {
          u = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
          this.SetSpriteByPath(u, n, false);
        }
        if (i) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), e, ...i);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), e);
        }
      }
    }
  }
}
exports.FurnitureDetailTipItem = FurnitureDetailTipItem;
//# sourceMappingURL=FurnitureDetailTipItem.js.map