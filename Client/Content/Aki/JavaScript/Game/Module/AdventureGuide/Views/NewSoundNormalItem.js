"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundNormalItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const NewSoundNormaPhantomItem_1 = require("./NewSoundNormaPhantomItem");
class NewSoundNormalItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.B8e = undefined;
    this.b8e = () => new NewSoundNormaPhantomItem_1.NewSoundNormaPhantomItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.B8e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.b8e);
  }
  Update(e) {
    var t = e.DetectRecordData;
    var i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Conf.Name);
    var i = this.GetTexture(1);
    var r = this.GetText(2);
    this.Co_(e);
    if (t.Conf.Secondary === 63) {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetNightMareTarget(t.SilentAreaDetectionRecord?.Conf?.MapId, t.SilentAreaDetectionRecord?.Conf?.LevelPlayList?.[0]);
      if (e[1] < 0) {
        r?.SetText("");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, "NightMareLeftTimes", e[0], e[1]);
      }
      this.SetTextureShowUntilLoaded(t.Conf.BigIcon, i);
    } else {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByData(t);
      if (t.IsLock && !e) {
        this.SetTextureShowUntilLoaded(t.Conf.LockBigIcon, i);
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, t.Conf.AttributesDescriptionUnlock);
        this.B8e?.SetActive(false);
        return;
      }
      this.SetTextureShowUntilLoaded(t.Conf.BigIcon, i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, t.Conf.InstanceSubTypeDescription);
    }
    if (t.Conf.Secondary === 22 && t.Conf.PhantomId && t.Conf.PhantomId.length !== 0) {
      this.B8e?.SetActive(true);
      this.B8e?.RefreshByData(t.Conf.PhantomId);
    } else {
      this.B8e?.SetActive(false);
    }
  }
  Co_(e) {
    e = e.TracingList?.includes(e.DetectRecordData.Conf.Id) ?? false;
    this.GetItem(5)?.SetUIActive(e);
  }
}
exports.NewSoundNormalItem = NewSoundNormalItem;
//# sourceMappingURL=NewSoundNormalItem.js.map