"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAttributeItemTwo = exports.VisionAttributeVariantTwoData = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class VisionAttributeVariantTwoData {
  constructor() {
    this.FetterId = 0;
    this.State = 0;
  }
}
exports.VisionAttributeVariantTwoData = VisionAttributeVariantTwoData;
class VisionAttributeItemTwo extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Layout = undefined;
    this.LoadingPromise = new CustomPromise_1.CustomPromise();
    this.sGe = (e, t, i) => {
      t = new AttributeItem(t);
      t.Update(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.CreateThenShowByResourceIdAsync("UiItem_VisionIAttriItemB", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    this.Layout = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.sGe);
  }
  Update(e) {
    this.Layout.RefreshByData(e);
  }
  OnBeforeDestroy() {
    this.Layout.ClearChildren();
  }
}
exports.VisionAttributeItemTwo = VisionAttributeItemTwo;
class AttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Layout = undefined;
    this.R8i = undefined;
    this.sGe = (e, t, i) => {
      t = new AttributePhantomItem(t);
      t.Update(e, this.R8i);
      return {
        Key: i,
        Value: t
      };
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILayoutBase], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    this.Layout = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(1), this.sGe);
  }
  OnBeforeDestroy() {
    this.Layout.ClearChildren();
  }
  Update(e) {
    this.GetItem(3).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(e.FetterId);
    this.R8i = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.EffectDescription, ...t.EffectDescriptionParam);
    let i = "AEAEABFF";
    (e.State === 1 ? (i = "D05656FF", this.GetItem(6)) : e.State === 2 ? (i = "87C583FF", this.GetItem(5)) : (t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId(), ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckFetterActivate(e.FetterId, t) ? (i = "87C583FF", this.GetItem(4)) : this.GetItem(3))).SetUIActive(true);
    e = UE.Color.FromHex(i);
    this.GetText(0).SetColor(e);
    this.GetText(2).SetColor(e);
  }
}
class AttributePhantomItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.R8i = undefined;
    this.c8i = () => {
      UiManager_1.UiManager.OpenView("PhantomBattleFettersObtainView", this.R8i);
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, () => {
      this.c8i();
    }]];
  }
  Update(e, t) {
    this.R8i = t;
    if (ModelManager_1.ModelManager.PhantomBattleModel.GetIfHasMonsterInInventory(e)) {
      this.GetTexture(1).SetUIActive(true);
      t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(e);
      t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(t.MonsterInfoId);
      this.SetTextureByPath(t, this.GetTexture(1), "VisionEquipmentView");
      t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
      this.GetSprite(2).useChangeColor = false;
      this.GetSprite(3).SetUIActive(ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquipByMonsterId(e, t.GetRoleId()));
    } else {
      this.GetTexture(1).SetUIActive(false);
      this.GetSprite(2).useChangeColor = true;
    }
  }
}
//# sourceMappingURL=VisionAttributeItemTwo.js.map