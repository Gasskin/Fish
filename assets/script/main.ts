const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component 
{
    @property({ type:cc.Sprite,tooltip:"当前背景Sprite" })
    bg_sprite: cc.Sprite = null;   
    @property({ type: [cc.SpriteFrame], tooltip:"所有的背景资源"})
    bg_res: cc.SpriteFrame[] = Array<cc.SpriteFrame>();
    @property({ type: [cc.SpriteAtlas], tooltip: "图集资源，用于切换方块样式" })
    block_atlas: cc.SpriteAtlas[] = new Array<cc.SpriteAtlas>();
    @property({ type: [cc.SpriteFrame], tooltip: "小鱼的皮肤资源" })
    fish_skin: cc.SpriteFrame[] = Array<cc.SpriteFrame>();
    @property({ type: [cc.Node], tooltip: "所有的背景修饰资源" })
    bg_decorator: cc.Node[] = Array<cc.Node>();
    @property({ type: [cc.Node], tooltip: "粒子资源数组" })
    particle_res: cc.Node[] = Array<cc.Node>();
    

    //内部属性
    cur_atlas: cc.SpriteAtlas = null;
    cur_fish_skin: cc.SpriteFrame = null;


    //临时
    cur: number = 0;

    onLoad()
    {
        this.changeScene(this.cur);

        this.cur_fish_skin = this.fish_skin[0];
    }

    start() 
    {
    }
    
    /**
     * 游戏主界面所注册的按钮注册
     * @param event 默认的消息集合
     * @param type 传递的参数，用以区别不同的点击事件
     */
    btnAction(event:Event,type:String)
    {
        switch (type)
        {
            case "Play":
                cc.log("play!");
                break;
            case "Setting":
                this.cur = (this.cur + 1) % 10;
                this.changeScene(this.cur);
                break;
            case "Skin":
                this.cur = (this.cur + 1) % 10;
                this.changeScene(this.cur);
                break;
            default:
                cc.log("default");
                break;
        }
    }

    /**
     * 用于切换不同风格的场景元素
     * @param num 切换场景的编号，本游戏中共10个场景，即编号[0,9]
     */
    changeScene(num: number)
    {
        if (num > this.bg_res.length || num > this.bg_decorator.length || num > this.particle_res.length)
        {
            cc.log("切换场景时数组越界");
            return;
        }
        else
        {
            //设置图集
            this.cur_atlas = this.block_atlas[num];
            //设置背景
            for (var i = 0; i < this.bg_res.length; i++)
            {
                if (i == num)
                {
                    this.bg_sprite.spriteFrame = this.bg_res[i];
                    break;
                }
            }
            //设置风格元素与粒子特效
            for (var i = 0; i < this.bg_decorator.length; i++)
            {
                if (i == num)
                {
                    this.bg_decorator[i].active = true;
                    //因为有部分场景是没有粒子特效的，是null，所以要判断
                    if (this.particle_res[i] != null)
                    {
                        this.particle_res[i].active = true;
                    }
                }
                else
                {
                    this.bg_decorator[i].active = false;
                    if (this.particle_res[i] != null)
                    {
                        this.particle_res[i].active = false;
                    }
                }
            }
        }
    }
}
