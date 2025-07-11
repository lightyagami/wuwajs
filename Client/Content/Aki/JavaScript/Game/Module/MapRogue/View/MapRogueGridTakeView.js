"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGridTakeView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MapRoguePopupBase_1 = require("./Components/MapRoguePopupBase");
class MapRogueGridTakeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpIncId = 0;
    this.BgItem = undefined;
    this.RewardLayout = undefined;
    this.d2t = () => {
      return new RewardItem();
    };
    this.XTt = () => {
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.OpIncId, e => {
        if (e) {
          this.CloseMe();
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIArtText], [3, UE.UIArtText], [4, UE.UIVerticalLayout], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.BgItem = new MapRoguePopupBase_1.MapRoguePopupBase();
    await this.BgItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.BgItem.OnMaskClick = this.XTt;
    this.BgItem.SetMaskButtonVisible(true);
  }
  OnStart() {
    this.RewardLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.d2t);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    if (e) {
      this.OpIncId = e;
      e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(e);
      if (e) {
        e = e.Data.FEc?.XEc;
        if (e) {
          this.GetArtText(2).SetText(e.no1.toString());
          this.GetArtText(3).SetText(e.so1.toString());
          var i = [];
          for (const s of e.ao1) {
            var t;
            var r = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEffectById(s);
            if (r && (t = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEffectTagById(r.Tag))) {
              r = t.IsRatio ? r.DescIntParam + "%" : r.DescIntParam.toString();
              t = {
                TitleId: t.Text,
                Value: r
              };
              i.push(t);
            }
          }
          this.RewardLayout?.RefreshByData(i);
        }
      }
    }
  }
  OnAfterShow() {
    var e;
    var i = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpIncId);
    if (i &&= i.Data.FEc?.XEc) {
      e = ModelManager_1.ModelManager.MapRogueModel.GameInfo.Mood;
      i = i.vxu;
      this.BgItem?.MoodBar?.SetCurrentValue(e - i);
      this.BgItem?.MoodBar?.ShowPreviewValue(i, e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      return this.BgItem?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
exports.MapRogueGridTakeView = MapRogueGridTakeView;
class RewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, i, t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TitleId);
    this.GetText(2).SetText(e.Value);
  }
}
//# sourceMappingURL=MapRogueGridTakeView.js.map