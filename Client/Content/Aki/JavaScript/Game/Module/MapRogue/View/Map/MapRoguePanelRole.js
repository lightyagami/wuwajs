"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRoguePanelRole = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ListSliderControl_1 = require("../../../ItemHint/Views/ListSliderControl");
const RogueGetListItem_1 = require("../Components/RogueGetListItem");
const MALE_L_SPINE_ATLAS = "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroL/Avatar_HeroL.Avatar_HeroL-atlas";
const MALE_L_SPINE_SKELETON = "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroL/Avatar_HeroL.Avatar_HeroL-data";
const MALE_R_SPINE_ATLAS = "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroR/Avatar_HeroR.Avatar_HeroR-atlas";
const MALE_R_SPINE_SKELETON = "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroR/Avatar_HeroR.Avatar_HeroR-data";
class MapRoguePanelRole extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.GameInfo = e;
    this.ListSliderControl = undefined;
    this._v1 = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueGetListMaxCount") ?? 1;
    this.cv1 = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueGetListIntervalTime") ?? 0;
    this.DirectionRight = true;
    this.d_d = () => {
      return new RogueGetListItem_1.RogueGetListItem();
    };
    this.r0i = () => !this.GameInfo.IsGetItemDataEmpty();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [3, UE.SpineSkeletonAnimationComponent], [4, UE.UIItem], [5, UE.SpineSkeletonAnimationComponent], [6, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.OKs();
    this.WE1();
  }
  OnTick(e) {
    if (this.IsShow) {
      this.ListSliderControl?.Tick(e);
    }
  }
  async OKs() {
    var e = this.GetSpine(3);
    var t = this.GetSpine(5);
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1) {
      await Promise.all([this.SetSpineAssetByPath(MALE_L_SPINE_ATLAS, MALE_L_SPINE_SKELETON, e), this.SetSpineAssetByPath(MALE_R_SPINE_ATLAS, MALE_R_SPINE_SKELETON, t)]);
    }
    this.GetItem(4).SetUIActive(false);
    this.GetItem(6).SetUIActive(true);
    e.SetAnimation(0, "Idle", true);
    t.SetAnimation(0, "Idle", true);
    this.SetRolePosItemVisible(true);
  }
  SetRoleDirection(e) {
    this.DirectionRight = e;
    this.GetItem(4).SetUIActive(!e);
    this.GetItem(6).SetUIActive(e);
  }
  SetRoleAnim(e, t = true) {
    const i = this.GetSpine(3).SetAnimation(0, e, t);
    const o = this.GetSpine(5).SetAnimation(0, e, t);
    if (!t) {
      const a = () => {
        this.GetSpine(3).SetAnimation(0, "Idle", true);
        this.GetSpine(5).SetAnimation(0, "Idle", true);
        i.AnimationComplete.Remove(a);
        o.AnimationComplete.Remove(a);
      };
      i.AnimationComplete.Add(a);
      o.AnimationComplete.Add(a);
    }
  }
  SetRolePosItemVisible(e) {
    this.GetItem(0).SetUIActive(e);
  }
  SetListRootItem(e) {
    this.GetVerticalLayout(1).RootUIComp.SetUIItemScale(e.ToUeVectorOld());
  }
  WE1() {
    this.ListSliderControl = new ListSliderControl_1.ListSliderControl({
      CreateProxyFunction: this.d_d,
      ParentUi: this.GetItem(2).GetParentAsUIItem(),
      CheckNext: this.r0i,
      ChildTemplate: this.GetItem(2),
      MaxShowCount: this._v1,
      AddItemTime: this.cv1,
      TickMode: 1,
      ItemShowTime: CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueGetListShowTime"),
      ItemSliderTime: CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueGetListSilderTime")
    });
    this.ListSliderControl.DisEnableParentLayout();
  }
}
exports.MapRoguePanelRole = MapRoguePanelRole;
//# sourceMappingURL=MapRoguePanelRole.js.map