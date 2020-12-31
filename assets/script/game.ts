const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component 
{
    @property({ type:cc.Sprite,tooltip:"当前背景Sprite" })
    bg_sprite: cc.Sprite = null;
    
    @property({ type: [cc.SpriteFrame], tooltip:"所有的背景资源"})
    bg_res: cc.SpriteFrame[] = Array<cc.SpriteFrame>();

    @property({ type: [cc.Node], tooltip: "所有的背景修饰资源" })
    bg_decorator: cc.Node[] = Array<cc.Node>();

    @property({ type: cc.Node, tooltip: "水波纹节点" })
    ripple_node: cc.Node = null;

    @property
    cur_ripple_time: number = 0;

    @property
    random_ripple_time: number = Math.random() * 120 + 180;

    onLoad()
    {
        this.changeScene(5);
        this.playRipple();
        cc.log(this.random_ripple_time/60);
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
                this.changeScene(7);
                break;
            case "Setting":
                cc.log("Setting!");
                this.changeScene(8);
                break;
            case "Skin":
                cc.log("SKin!");
                this.changeScene(9);
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
        if (num > this.bg_res.length || num > this.bg_decorator.length)
        {
            cc.log("切换场景时数组越界");
            return;
        }
        else
        {
            //设置背景
            for (var i = 0; i < this.bg_res.length; i++)
            {
                if (i == num)
                {
                    this.bg_sprite.spriteFrame = this.bg_res[i];
                    break;
                }
            }
            //设置风格元素
            for (var i = 0; i < this.bg_decorator.length; i++)
            {
                if (i == num)
                {
                    this.bg_decorator[i].active = true;
                }
                else
                {
                    this.bg_decorator[i].active = false;
                }
            }
        }
    }

    /**
     * 在主页随机位置播放水波纹
     */
    playRipple()
    {
        let posx: number = Math.random() * 720 - 360;
        let posy: number = Math.random() * 1280 - 640;
        this.ripple_node.setPosition(posx, posy);
        this.ripple_node.getComponent(cc.Animation).play("ripple");
    }

    update(dt)
    {
        if (this.cur_ripple_time > this.random_ripple_time)
        {
            this.playRipple();
            this.cur_ripple_time = 0;
            this.random_ripple_time = Math.random() * 120 + 180;
            cc.log(this.random_ripple_time/60);
        }
        else
        {
            this.cur_ripple_time++;
        }
    }
}
