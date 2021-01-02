const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //页面管理
    @property({ type: cc.Node, tooltip: "主页" })
    main_page: cc.Node = null;    
    @property({ type: cc.Node, tooltip: "游戏页面" })
    game_page: cc.Node = null;  

    //菜单栏
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


    //提示、重玩
    @property({ type: cc.Node, tooltip: "提示按钮" })
    idea_btn: cc.Node = null; 
    @property({ type: cc.Node, tooltip: "重玩按钮" })
    replay_btn: cc.Node = null; 
    
    //游戏主逻辑
    @property({ type: cc.Node, tooltip: "方块父节点" })
    item_bg: cc.Node = null;
    @property({ type: cc.Prefab, tooltip: "测试方块体" })
    item_test: cc.Prefab = null;

    //局部变量
    close_menu: boolean = false;//描述当前菜单栏的状态（收起/打开）

    onLoad()
    {
        this.resetBtnPos();
        this.addTestItem();
    }

    start() 
    {

    }

    btnAction(event: Event, type: String)
    {
        switch (type)
        {
            case "Play":
                this.main_page.active = false;
                this.game_page.active = true;
                this.idea_btn.active = true;
                this.replay_btn.active = true;
                break;
            case "Main":
                this.main_page.active = true;
                this.game_page.active = false;
                this.showBtn(this.close_menu);
                break;
            case "Menu":
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

    /**
     * 添加测试方块，用于位置判断
     */
    addTestItem()
    {
        for (let i: number = 0; i < 6; i++)
        {
            for (let j: number = 0; j < 6; j++)
            {
                let cur_node: cc.Node = cc.instantiate(this.item_test);
                cur_node.getComponentInChildren(cc.Label).string = "("+i+","+j+")";
                cur_node.setParent(this.item_bg);
                cur_node.setPosition(this.getItemPos(i,j));
            }
        }
    }


    /**
     * 输入数组坐标，获得对应屏幕坐标，左下角是(0,0)，右上角是(5,5)，行列都是从左下角开始算起
     * @param x 行
     * @param y 列
     */
    getItemPos(x: number, y: number): cc.Vec2
    {
        return cc.v2(-338 + (x + 1) * 4 + x * 108 + 54, -338 + (y + 1) * 4 + y * 108 + 54);
    }

    // update (dt) {}
}
