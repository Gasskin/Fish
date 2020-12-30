const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component 
{
    @property({ type:cc.Sprite,displayName:"当前背景Sprite" })
    bg_sprite: cc.Sprite = null;
    
    @property({ type:[cc.SpriteFrame],displayName:"所有的背景资源"})
    bg_res: cc.SpriteFrame[] = Array<cc.SpriteFrame>();

    @property({ type: [cc.Node], displayName: "所有的背景修饰资源" })
    bg_decorator: cc.Node[] = Array<cc.Node>();

    onLoad()
    {
        cc.log("onLoad");
        this.bg_sprite.spriteFrame = this.bg_res[0];
        this.bg_decorator[0].active = true;
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
                this.bg_sprite.spriteFrame = this.bg_res[0];
                this.bg_decorator[0].active = true;
                this.bg_decorator[1].active = false;
                break;
            case "Skin":
                cc.log("SKin!");
                this.bg_sprite.spriteFrame = this.bg_res[1];
                this.bg_decorator[0].active = false;
                this.bg_decorator[1].active = true;
                break;
            default:
                cc.log("default");
                break;
        }
    }
    // update (dt) {}
}
