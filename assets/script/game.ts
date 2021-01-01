const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Node, tooltip: "开始界面的修饰按钮" })
    main_decorator: cc.Node = null;    
    @property({ type: cc.Node, tooltip: "游戏界面的修饰按钮" })
    game_decorator: cc.Node = null;  

    @property({ type: cc.Node, tooltip: "菜单按钮" })
    menu_btn: cc.Node = null;  
    @property({ type: cc.SpriteFrame, tooltip: "打开菜单栏nor" })
    menu_open_nor: cc.SpriteFrame = null;
    @property({ type: cc.SpriteFrame, tooltip: "打开菜单栏click" })
    menu_open_click: cc.SpriteFrame = null;
    @property({ type: cc.SpriteFrame, tooltip: "关闭菜单栏nor" })
    menu_close_nor: cc.SpriteFrame = null;
    @property({ type: cc.SpriteFrame, tooltip: "关闭菜单栏click" })
    menu_close_click: cc.SpriteFrame = null;
    @property({ type: cc.Node, tooltip: "主界面按钮" })
    main_btn: cc.Node = null;  
    @property({ type: cc.Node, tooltip: "关卡按钮" })
    level_btn: cc.Node= null;  
    @property({ type: cc.Node, tooltip: "皮肤按钮" })
    skin_btn: cc.Node = null;  
    @property({ type: cc.Node, tooltip: "设置按钮" })
    setting_btn: cc.Node = null;  
    @property({ type: cc.Node, tooltip: "提示按钮" })
    idea_btn: cc.Node = null; 
    @property({ type: cc.Node, tooltip: "重玩按钮" })
    replay_btn: cc.Node = null; 

    @property({ visible: false })
    close_menu: boolean = false;

    onLoad()
    {
        this.resetBtnPos();
    }

    start() 
    {

    }

    btnAction(event: Event, type: String)
    {
        switch (type)
        {
            case "Play":
                cc.log("play!")
                this.main_decorator.active = false;
                this.game_decorator.active = true;
                this.idea_btn.active = true;
                this.replay_btn.active = true;
                break;
            case "Main":
                cc.log("return main!")
                this.main_decorator.active = true;
                this.game_decorator.active = false;
                this.showBtn(this.close_menu);
                break;
            case "Menu":
                cc.log("Menu");
                this.showBtn(this.close_menu);
                break;
            default:
                break;
        }
    }

    /**
     * 重置4个子按钮的位置，应该在菜单按钮位置
     */
    resetBtnPos()
    {
        this.main_btn.setPosition(this.menu_btn.position.x, this.menu_btn.position.y);
        this.main_btn.active = false;
        
        this.level_btn.setPosition(this.menu_btn.position.x, this.menu_btn.position.y);
        this.level_btn.active = false;

        this.skin_btn.setPosition(this.menu_btn.position.x, this.menu_btn.position.y);
        this.skin_btn.active = false;

        this.setting_btn.setPosition(this.menu_btn.position.x, this.menu_btn.position.y);
        this.setting_btn.active = false;
    }

    /**
     * 负责打开和收起菜单栏，点一次是打开，再点一次是收起
     * @param close 是否收起菜单栏
     */
    showBtn(close_menu:boolean)
    {
        //如果是打开
        if (!close_menu)
        {
            let interval: number = (360 - this.menu_btn.position.x) / 5;
            cc.tween(this.main_btn)
                .call(() =>
                {
                    this.menu_btn.getComponent(cc.Button).normalSprite = this.menu_close_nor;
                    this.menu_btn.getComponent(cc.Button).pressedSprite = this.menu_close_click;
                    this.activeBtn(true);
                })
                .to(0.1, { opacity: 255, position: cc.v3(this.menu_btn.x + interval, this.menu_btn.y, 0) })
                .start();

            cc.tween(this.level_btn)
                .to(0.2, { opacity: 255, position: cc.v3(this.menu_btn.x + interval * 2, this.menu_btn.y, 0) })
                .start();

            cc.tween(this.skin_btn)
                .to(0.3, { opacity: 255, position: cc.v3(this.menu_btn.x + interval * 3, this.menu_btn.y, 0) })
                .start();

            cc.tween(this.setting_btn)
                .to(0.4, { opacity: 255, position: cc.v3(this.menu_btn.x + interval * 4, this.menu_btn.y, 0) })
                .start();
            
            cc.tween(this.idea_btn)
                .to(0.2, { opacity: 0, position: cc.v3(this.menu_btn.position.x, -540, 0) })
                .start();

            cc.tween(this.replay_btn)
                .to(0.4, { opacity: 0, position: cc.v3(this.menu_btn.position.x, -540, 0) })
                .call(() =>
                {
                    this.idea_btn.active = false;
                    this.replay_btn.active = false;
                })
                .start();
            
            this.close_menu = true;
        }
        //否则就是收起
        else
        {
            cc.tween(this.main_btn)
                .to(0.1, { opacity: 0, position: cc.v3(this.menu_btn.x, this.menu_btn.y, 0) })
                .start();

            cc.tween(this.level_btn)
                .to(0.2, { opacity: 0, position: cc.v3(this.menu_btn.x, this.menu_btn.y, 0) })
                .start();

            cc.tween(this.skin_btn)
                .to(0.3, { opacity: 0, position: cc.v3(this.menu_btn.x, this.menu_btn.y, 0) })
                .start();

            cc.tween(this.setting_btn)
                .to(0.4, { opacity: 0, position: cc.v3(this.menu_btn.x, this.menu_btn.y, 0) })
                .call(() =>
                {
                    this.menu_btn.getComponent(cc.Button).normalSprite = this.menu_open_nor;
                    this.menu_btn.getComponent(cc.Button).pressedSprite = this.menu_open_click;
                    this.activeBtn(false);
                })
                .start();
            
            cc.tween(this.idea_btn)
                .call(() =>
                {
                    this.idea_btn.active = true;
                    this.replay_btn.active = true;
                })
                .to(0.2, { opacity: 255, position: cc.v3(0, -540, 0) })
                .start();
            
            cc.tween(this.replay_btn)
                .to(0.2, { opacity: 255, position: cc.v3(-this.menu_btn.position.x, -540, 0) })
                .start();

            this.close_menu = false;
        }
    }

    /**
     * 设置菜单栏按钮状态
     * @param active 目标状态
     */
    activeBtn(active: boolean)
    {
        this.main_btn.active = active;
        this.level_btn.active = active;
        this.skin_btn.active = active;
        this.setting_btn.active = active;
    }

    // update (dt) {}
}
