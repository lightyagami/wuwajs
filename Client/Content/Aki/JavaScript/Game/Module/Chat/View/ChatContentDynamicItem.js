"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatContentDynamicItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SPACING = 60;
const NOTIME_SPACING = 40;
class ChatContentDynamicItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UIItem], [0, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText]];
  }
  GetItemSize(t) {
    switch (t.Type) {
      case 0:
      case 1:
        {
          var a = this.GetItem(6).GetHeight();
          let e = 0;
          var r = t.ChatContentData.TimeStamp;
          var s = t.ChatContentData.LastTimeStamp;
          e = r - s < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && s !== 0 ? 0 : this.GetItem(5).GetHeight();
          if (t.ChatContentData.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
            r = this.GetItem(4).GetHeight();
            return new UE.Vector2D(this.GetItem(1).GetWidth(), a + (e > 0 ? e + SPACING : NOTIME_SPACING) + r);
          } else {
            (s = this.GetText(7)).SetText(t.ChatContentData.Content);
            r = s.GetTextRenderSize().Y;
            s = this.GetItem(3).GetHeight();
            return new UE.Vector2D(this.GetItem(1).GetWidth(), a + (e > 0 ? e + SPACING : NOTIME_SPACING) + r + s);
          }
        }
      case 2:
        a = this.GetItem(0);
        return new UE.Vector2D(a.GetWidth(), a.GetHeight());
      default:
        return new UE.Vector2D(0, 0);
    }
  }
  ClearItem() {}
}
exports.ChatContentDynamicItem = ChatContentDynamicItem;
//# sourceMappingURL=ChatContentDynamicItem.js.map