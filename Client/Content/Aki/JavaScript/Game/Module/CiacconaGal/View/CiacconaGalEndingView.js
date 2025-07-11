"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalEndingView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const CommonRewardPopup_1 = require("../../Common/CommonRewardPopup");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CiacconaGalDefine_1 = require("../CiacconaGalDefine");
const CiacconaGalTextConfig_1 = require("../CiacconaGalTextConfig");
const CiacconaGalEndingItem_1 = require("./CiacconaGalEndingItem");
class CiacconaGalEndingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Axc = undefined;
    this.Pxc = undefined;
    this.xxc = undefined;
    this.Qyi = undefined;
    this.FP1 = undefined;
    this.m7s = e => {
      this.FP1?.SetUiActive(true);
      this.FP1?.Refresh(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetAllEndingDataList();
    this.Axc = new CiacconaGalEndingItem_1.CiacconaGalEndingItem(e[0], "XKAVG_SystemTitle_12");
    this.Pxc = new CiacconaGalEndingItem_1.CiacconaGalEndingItem(e[1], "XKAVG_SystemTitle_13");
    this.xxc = new CiacconaGalEndingItem_1.CiacconaGalEndingItem(e[2], "XKAVG_SystemTitle_14");
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.FP1 = new CommonRewardPopup_1.CommonRewardPopup(this.GetRootItem());
    var e = [];
    e.push(this.Axc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    e.push(this.Pxc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    e.push(this.xxc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(e);
    var e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_TITLE);
    this.Qyi.SetTitleByTextIdAndArgNew(e);
    var e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_INTERNAL_TITLE);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
  }
}
exports.CiacconaGalEndingView = CiacconaGalEndingView;
//# sourceMappingURL=CiacconaGalEndingView.js.map