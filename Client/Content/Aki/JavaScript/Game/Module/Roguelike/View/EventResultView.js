"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventResultViewAll = exports.EventResultViewOneByOne = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiActorPool_1 = require("../../../Ui/UiActorPool");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const CommonSelectItem_1 = require("./CommonSelectItem");
const RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class EventResultViewOneByOne extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments);
    this.oho = undefined;
    this.Kei = 0;
    this.Wao = undefined;
    this.CommonSelectItemLayout = undefined;
    this.CloseBtn = () => {
      if (this.Kei + 1 >= this.oho.RogueGainEntryArray.length) {
        this.CloseMe(this.oho?.Callback);
      } else {
        this.PlaySequence("Start");
        this.Kei += 1;
        this.Refresh();
      }
    };
    this.CreateCommonSelectItem = () => {
      return new CommonSelectItem_1.CommonSelectItem();
    };
    this.OnDescModelChange = () => {
      this.Refresh();
    };
  }
  async OnBeforeStartAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(RoguelikeDefine_1.COMMON_SELECT_ITEM);
    this.Wao = await UiActorPool_1.UiActorPool.GetAsync(e);
    this.CommonSelectItemLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.CreateCommonSelectItem, this.Wao?.UiItem.GetOwner());
  }
  OnStart() {
    super.OnStart();
    this.oho = this.OpenParam;
    var e = this.GetHorizontalLayout(3).GetRootComponent();
    this.Wao.UiItem.SetUIParent(e);
    this.Refresh();
  }
  OnBeforeDestroy() {
    this.CommonSelectItemLayout?.ClearChildren();
    if (this.Wao) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Wao, RoguelikeDefine_1.COMMON_SELECT_ITEM);
    }
  }
  Refresh() {
    this.CommonSelectItemLayout.RefreshByDataAsync([this.oho.RogueGainEntryArray[this.Kei]]).then(() => {
      this.CommonSelectItemLayout.GetLayoutItemList().forEach(e => {
        e.SetToggleUnDetermined();
      });
    }, () => {});
    this.RefreshTitleText();
  }
  RefreshTitleText() {
    this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_20_TEXT);
  }
}
exports.EventResultViewOneByOne = EventResultViewOneByOne;
class EventResultViewAll extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
  constructor() {
    super(...arguments);
    this.oho = undefined;
    this.Wao = undefined;
    this.CommonSelectItemLayout = undefined;
    this.CloseBtn = () => {
      this.CloseMe(this.oho?.Callback);
    };
    this.CreateCommonSelectItem = () => {
      return new CommonSelectItem_1.CommonSelectItem();
    };
    this.OnDescModelChange = () => {
      this.Refresh();
    };
  }
  async OnBeforeStartAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(RoguelikeDefine_1.COMMON_SELECT_ITEM);
    this.Wao = await UiActorPool_1.UiActorPool.GetAsync(e);
    this.CommonSelectItemLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.CreateCommonSelectItem, this.Wao?.UiItem.GetOwner());
  }
  OnStart() {
    super.OnStart();
    this.oho = this.OpenParam;
    var e = this.GetHorizontalLayout(3).GetRootComponent();
    this.Wao.UiItem.SetUIParent(e);
    this.Refresh();
  }
  OnBeforeDestroy() {
    this.CommonSelectItemLayout?.ClearChildren();
    if (this.Wao) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Wao, RoguelikeDefine_1.COMMON_SELECT_ITEM);
    }
  }
  Refresh() {
    this.CommonSelectItemLayout.RefreshByDataAsync(this.oho.RogueGainEntryArray).then(() => {
      this.CommonSelectItemLayout.GetLayoutItemList().forEach(e => {
        e.SetToggleUnDetermined();
      });
    }, () => {});
    this.RefreshTitleText();
  }
  RefreshTitleText() {
    this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_20_TEXT);
  }
}
exports.EventResultViewAll = EventResultViewAll;
//# sourceMappingURL=EventResultView.js.map