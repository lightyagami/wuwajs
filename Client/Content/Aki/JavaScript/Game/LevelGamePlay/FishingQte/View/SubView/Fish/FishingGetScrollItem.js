"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingGetScrollItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer");
const ListSliderControl_1 = require("../../../../../Module/ItemHint/Views/ListSliderControl");
const LguiUtil_1 = require("../../../../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const MAX_LIST_COUNT = 7;
const ITEM_INTERVAL_TIME = 200;
const ITEM_SILDER_TIME = 200;
const SPECIAL_QUALITY_ID = 5;
class FishingGetScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ListSlideControl = undefined;
    this.d_d = () => {
      return new FishingGetItem();
    };
    this.r0i = () => !ModelManager_1.ModelManager.FishingQteModel.IsTempGetDataEmpty();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetItem(1);
    this.ListSlideControl = new ListSliderControl_1.ListSliderControl({
      CreateProxyFunction: this.d_d,
      ParentUi: e.GetParentAsUIItem(),
      CheckNext: this.r0i,
      ChildTemplate: e,
      MaxShowCount: MAX_LIST_COUNT,
      AddItemTime: ITEM_INTERVAL_TIME,
      ItemShowTime: CommonParamById_1.configCommonParamById.GetIntConfig("FishingQteGetListItemShowTime"),
      ItemSliderTime: ITEM_SILDER_TIME,
      TickMode: 1
    });
    this.ListSlideControl.DisEnableParentLayout();
  }
  OnTick(e) {
    this.ListSlideControl?.Tick(e);
  }
}
exports.FishingGetScrollItem = FishingGetScrollItem;
class FishingGetItem extends ListSliderControl_1.SliderItem {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.Data = undefined;
    this.TagItem = undefined;
    this.K3t = e => {
      if (e === "Start") {
        this.FinishPlayStart();
      } else if (e === "Close") {
        this.FinishPlayEnd();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(3);
    this.TagItem = new FishingGetTagItem();
    await this.TagItem.CreateByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.K3t);
  }
  OnBeforeDestroy() {
    if (this.LevelSequencePlayer) {
      this.LevelSequencePlayer.Clear();
      this.LevelSequencePlayer = undefined;
    }
  }
  PlayStart() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  PlayEnd() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
  }
  OnActiveStatusChange(e) {}
  async AsyncLoadUiResource() {
    this.Data = ModelManager_1.ModelManager.FishingQteModel.ShiftTempGetData();
    if (this.Data) {
      await this.Refresh(this.Data);
    }
  }
  async Refresh(e) {
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e.ItemId);
    this.BGt(e.Quality);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name);
    await this.SetTextureAsync(i.Icon, this.GetTexture(1));
    var i = ModelManager_1.ModelManager.FishingQteModel.GetTempGetDataTag(e.IncId);
    var e = i !== 0;
    this.TagItem.SetActive(e);
    if (e) {
      this.TagItem.RefreshTag(i);
    }
  }
  BGt(e) {
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingQualityConfig(e);
    const t = this.GetSprite(0);
    t.SetUIActive(false);
    this.SetSpriteByPath(i.TexBg, t, false, undefined, e => {
      t.SetUIActive(true);
    });
    i = UE.Color.FromHex(i.TxtColor);
    this.GetText(2).SetColor(i);
    i = e === SPECIAL_QUALITY_ID;
    this.GetItem(4).SetUIActive(i);
    this.GetItem(5).SetUIActive(!i);
  }
}
class FishingGetTagItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  RefreshTag(e) {
    let i = undefined;
    let t = undefined;
    let a = undefined;
    switch (e) {
      case 2:
        i = "Reward_Tag_Extra";
        t = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Extra_Bg_Color");
        a = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Extra_Text_Color");
        break;
      case 1:
        i = "Reward_Tag_Magnification";
        t = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Magnification_Bg_Color");
        a = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Magnification_Text_Color");
    }
    if (i) {
      this.GetText(1).ShowTextNew(i);
    }
    if (a) {
      this.GetText(1).SetColor(UE.Color.FromHex(a));
    }
    if (t) {
      this.GetSprite(0).SetColor(UE.Color.FromHex(t));
    }
  }
}
//# sourceMappingURL=FishingGetScrollItem.js.map