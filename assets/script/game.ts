const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component 
{
    @property({ type:cc.Sprite,displayName:"当前背景Sprite" })
    bg_sprite: cc.Sprite = null;
    
    @property({ type:[cc.SpriteFrame],displayName:"所有的背景资源"})
    bg_res: cc.SpriteFrame[] = Array<cc.SpriteFrame>();

    @property({ type: cc.Button, displayName: "开始游戏" })
    btnPlay: cc.Button = null;

    onLoad()
    {
        cc.log("onLoad");
        this.bg_sprite.spriteFrame = this.bg_res[0];
    }

    start() 
    {
        cc.log("start");
    }

    btnAction(event:Event,type:String)
    {
        switch (type)
        {
            case "Play":
                cc.log("play!");
                break;
            case "Setting":
                cc.log("Setting!");
                break;
            case "Skin":
                cc.log("SKin!");
                break;
            default:
                cc.log("default");
                break;
        }
    }
    // update (dt) {}
}
